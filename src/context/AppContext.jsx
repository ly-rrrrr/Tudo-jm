import { createContext } from 'preact';
import { useContext, useReducer, useEffect, useCallback, useRef } from 'preact/hooks';
import { today, toDateStr, addMonths, addWeeks, addDays } from '../utils/dateUtils.js';
import { generateId } from '../utils/id.js';
import { loadTasks, saveTasks, loadDayPlans, saveDayPlans, loadSettings, saveSettings } from '../utils/storage.js';

export const AppContext = createContext(null);

const defaultSettings = {
  defaultView: 'month',
  editorMode: 'markdown',
  firstDayOfWeek: 0,
  starfieldIntensity: 'medium',
};

function getInitialDate() {
  const params = new URLSearchParams(window.location.search);
  const dateStr = params.get('date');
  if (dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    if (y && m && d) return new Date(y, m - 1, d);
  }
  return today();
}

function getInitialView() {
  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  if (['month', 'week', 'day'].includes(view)) return view;
  return defaultSettings.defaultView;
}

const initialState = {
  currentDate: getInitialDate(),
  currentView: getInitialView(),
  selectedDate: toDateStr(getInitialDate()),
  tasks: {},
  dayPlans: {},
  settings: defaultSettings,
  modalState: { open: false, taskId: null },
  showSettings: false,
  showCalendar: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE': {
      let settings = { ...defaultSettings, ...action.settings };
      return {
        ...state,
        tasks: action.tasks || {},
        dayPlans: action.dayPlans || {},
        settings,
        currentView: action.initialView || settings.defaultView || 'month',
        currentDate: action.initialDate ? new Date(action.initialDate) : state.currentDate,
        selectedDate: action.initialDate || toDateStr(today()),
      };
    }
    case 'SET_VIEW':
      return { ...state, currentView: action.view };
    case 'SET_DATE':
      return { ...state, currentDate: action.date };
    case 'SELECT_DATE':
      return { ...state, selectedDate: action.dateStr };
    case 'ADD_TASK': {
      const task = {
        ...action.task,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const tasks = { ...state.tasks, [task.id]: task };
      const plan = state.dayPlans[task.date];
      const dayPlans = {
        ...state.dayPlans,
        [task.date]: {
          ...plan,
          id: plan?.id || generateId(),
          date: task.date,
          tasks: [...(plan?.tasks || []), task.id],
          updatedAt: new Date().toISOString(),
          createdAt: plan?.createdAt || new Date().toISOString(),
        },
      };
      return { ...state, tasks, dayPlans };
    }
    case 'UPDATE_TASK': {
      const task = { ...state.tasks[action.taskId], ...action.updates, updatedAt: new Date().toISOString() };
      const tasks = { ...state.tasks, [action.taskId]: task };
      return { ...state, tasks };
    }
    case 'DELETE_TASK': {
      const task = state.tasks[action.taskId];
      if (!task) return state;
      const newTasks = { ...state.tasks };
      delete newTasks[action.taskId];
      const plan = state.dayPlans[task.date];
      const dayPlans = { ...state.dayPlans };
      if (plan) {
        dayPlans[task.date] = {
          ...plan,
          tasks: plan.tasks.filter(id => id !== action.taskId),
          updatedAt: new Date().toISOString(),
        };
      }
      return { ...state, tasks: newTasks, dayPlans };
    }
    case 'TOGGLE_COMPLETE': {
      const task = state.tasks[action.taskId];
      if (!task) return state;
      return reducer(state, {
        type: 'UPDATE_TASK',
        taskId: action.taskId,
        updates: { completed: !task.completed },
      });
    }
    case 'REORDER_TASKS': {
      const plan = state.dayPlans[action.dateStr];
      if (!plan) return state;
      const dayPlans = {
        ...state.dayPlans,
        [action.dateStr]: { ...plan, tasks: action.taskIds, updatedAt: new Date().toISOString() },
      };
      return { ...state, dayPlans };
    }
    case 'SAVE_PLAN': {
      const plan = state.dayPlans[action.dateStr];
      const dayPlans = {
        ...state.dayPlans,
        [action.dateStr]: {
          ...plan,
          id: plan?.id || generateId(),
          date: action.dateStr,
          notes: action.notes !== undefined ? action.notes : plan?.notes || '',
          tasks: plan?.tasks || [],
          updatedAt: new Date().toISOString(),
          createdAt: plan?.createdAt || new Date().toISOString(),
        },
      };
      return { ...state, dayPlans };
    }
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case 'OPEN_MODAL':
      return { ...state, modalState: { open: true, taskId: action.taskId || null } };
    case 'CLOSE_MODAL':
      return { ...state, modalState: { open: false, taskId: null } };
    case 'OPEN_MODAL_FOR_DATE':
      return { ...state, currentDate: action.date, selectedDate: action.dateStr, modalState: { open: true, taskId: null } };
    case 'OPEN_SETTINGS':
      return { ...state, showSettings: true };
    case 'CLOSE_SETTINGS':
      return { ...state, showSettings: false };
    case 'TOGGLE_CALENDAR':
      return { ...state, showCalendar: !state.showCalendar };
    case 'CLOSE_CALENDAR':
      return { ...state, showCalendar: false };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debounceRef = useRef(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const tasks = loadTasks();
    const dayPlans = loadDayPlans();
    const savedSettings = loadSettings();
    const params = new URLSearchParams(window.location.search);
    dispatch({
      type: 'HYDRATE',
      tasks,
      dayPlans,
      settings: savedSettings,
      initialView: params.get('view'),
      initialDate: params.get('date'),
    });
  }, []);

  // Persist to localStorage (debounced)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveTasks(state.tasks);
      saveDayPlans(state.dayPlans);
      saveSettings(state.settings);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [state.tasks, state.dayPlans, state.settings]);

  // Sync URL params
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('view', state.currentView);
    params.set('date', toDateStr(state.currentDate));
    const url = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', url);
  }, [state.currentView, state.currentDate]);

  // Navigation helpers
  const navigateForward = useCallback(() => {
    const d = state.currentDate;
    if (state.currentView === 'month') dispatch({ type: 'SET_DATE', date: addMonths(d, 1) });
    else if (state.currentView === 'week') dispatch({ type: 'SET_DATE', date: addWeeks(d, 1) });
    else dispatch({ type: 'SET_DATE', date: addDays(d, 1) });
  }, [state.currentView, state.currentDate]);

  const navigateBack = useCallback(() => {
    const d = state.currentDate;
    if (state.currentView === 'month') dispatch({ type: 'SET_DATE', date: addMonths(d, -1) });
    else if (state.currentView === 'week') dispatch({ type: 'SET_DATE', date: addWeeks(d, -1) });
    else dispatch({ type: 'SET_DATE', date: addDays(d, -1) });
  }, [state.currentView, state.currentDate]);

  const goToday = useCallback(() => {
    dispatch({ type: 'SET_DATE', date: today() });
  }, []);

  // Task helpers
  const getTasksForDate = useCallback((dateStr) => {
    const plan = state.dayPlans[dateStr];
    if (!plan || !plan.tasks) return [];
    return plan.tasks.map(id => state.tasks[id]).filter(Boolean);
  }, [state.dayPlans, state.tasks]);

  const getOverdueTasks = useCallback((dateStr) => {
    const overdue = [];
    const todayStr = dateStr || toDateStr(today());
    for (const [d, plan] of Object.entries(state.dayPlans)) {
      if (d >= todayStr) continue;
      if (!plan.tasks) continue;
      const incomplete = plan.tasks
        .map(id => state.tasks[id])
        .filter(t => t && !t.completed);
      overdue.push(...incomplete);
    }
    return overdue.sort((a, b) => a.date.localeCompare(b.date));
  }, [state.dayPlans, state.tasks]);

  const value = {
    state,
    dispatch,
    navigateForward,
    navigateBack,
    goToday,
    getTasksForDate,
    getOverdueTasks,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
