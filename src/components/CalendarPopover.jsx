import { useEffect, useRef, useState } from 'preact/hooks';
import { useApp } from '../context/AppContext.jsx';
import { getMonthGrid, formatMonthYear, addMonths, formatDateShort, parseDateStr } from '../utils/dateUtils.js';
import MonthView from './Calendar/MonthView.jsx';
import WeekView from './Calendar/WeekView.jsx';
import DayView from './Calendar/DayView.jsx';
import './CalendarPopover.css';

function CalendarView() {
  const { state } = useApp();
  switch (state.currentView) {
    case 'week': return <WeekView />;
    case 'day': return <DayView />;
    default: return <MonthView />;
  }
}

export default function CalendarPopover() {
  const { state, dispatch } = useApp();
  const popoverRef = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!state.showCalendar) { setClosing(false); return; }
    setClosing(false);

    function handleClick(e) {
      if (popoverRef.current && !popoverRef.current.contains(e.target) && !e.target.closest('.header-icon-btn')) {
        setClosing(true);
        setTimeout(() => dispatch({ type: 'CLOSE_CALENDAR' }), 150);
      }
    }

    function handleKey(e) {
      if (e.key === 'Escape') {
        setClosing(true);
        setTimeout(() => dispatch({ type: 'CLOSE_CALENDAR' }), 150);
      }
    }

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [state.showCalendar]);

  if (!state.showCalendar && !closing) return null;

  const handleDateSelect = (date, dateStr) => {
    dispatch({ type: 'SET_DATE', date });
    dispatch({ type: 'SELECT_DATE', dateStr });
    setClosing(true);
    setTimeout(() => dispatch({ type: 'CLOSE_CALENDAR' }), 150);
  };

  const views = ['month', 'week', 'day'];

  // MiniCalendar data
  const miniDate = state.currentDate;
  const miniCells = getMonthGrid(miniDate.getFullYear(), miniDate.getMonth(), state.settings.firstDayOfWeek);
  const weekDays = state.settings.firstDayOfWeek === 0
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  // Plan list entries
  const planEntries = Object.values(state.dayPlans)
    .filter(plan => plan && plan.tasks && plan.tasks.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 10);

  return (
    <div class={`cal-popover ${closing ? 'animate-scale-out' : 'animate-scale-in'}`} ref={popoverRef}>
      {/* View Switcher */}
      <div class="cal-pop-view-switcher">
        {views.map(v => (
          <button
            key={v}
            class={`cal-pop-view-btn ${state.currentView === v ? 'active' : ''}`}
            onClick={() => dispatch({ type: 'SET_VIEW', view: v })}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      {/* Calendar */}
      <div class="cal-pop-calendar">
        <CalendarView />
      </div>

      {/* Mini Calendar */}
      <div class="cal-pop-minical">
        <div class="cal-pop-minical-header">
          <button class="cal-pop-minical-nav" onClick={() => dispatch({ type: 'SET_DATE', date: addMonths(miniDate, -1) })}>
            &lsaquo;
          </button>
          <span class="cal-pop-minical-title">{formatMonthYear(miniDate)}</span>
          <button class="cal-pop-minical-nav" onClick={() => dispatch({ type: 'SET_DATE', date: addMonths(miniDate, 1) })}>
            &rsaquo;
          </button>
        </div>
        <div class="cal-pop-minical-grid">
          {weekDays.map(d => <div key={d} class="cal-pop-minical-dow">{d}</div>)}
          {miniCells.map((cell, i) => {
            const hasTasks = state.dayPlans[cell.dateStr] && state.dayPlans[cell.dateStr].tasks?.length > 0;
            return (
              <button
                key={i}
                class={`cal-pop-minical-cell ${cell.isCurrentMonth ? '' : 'other-month'} ${cell.dateStr === state.selectedDate ? 'selected' : ''} ${cell.isToday ? 'today' : ''}`}
                onClick={() => handleDateSelect(cell.date, cell.dateStr)}
              >
                <span class="cal-pop-minical-day">{cell.day}</span>
                {hasTasks && <span class="cal-pop-minical-dot" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan List */}
      <div class="cal-pop-plans">
        <h4 class="cal-pop-plans-title">Recent Plans</h4>
        {planEntries.length === 0 ? (
          <p class="cal-pop-plans-empty">No plans yet</p>
        ) : (
          planEntries.map(plan => {
            const tasks = plan.tasks.map(id => state.tasks[id]).filter(Boolean);
            return (
              <button
                key={plan.date}
                class={`cal-pop-plan-item ${plan.date === state.selectedDate ? 'active' : ''}`}
                onClick={() => handleDateSelect(parseDateStr(plan.date), plan.date)}
              >
                <span class="cal-pop-plan-date">{formatDateShort(plan.date)}</span>
                <span class="cal-pop-plan-count">{tasks.length} task{tasks.length !== 1 ? 's' : ''}</span>
                <span class="cal-pop-plan-preview">{tasks.slice(0, 2).map(t => t.title).join(', ')}</span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
