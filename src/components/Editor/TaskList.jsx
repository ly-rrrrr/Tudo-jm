import { useState } from 'preact/hooks';
import { useApp } from '../../context/AppContext.jsx';
import TaskItem from './TaskItem.jsx';
import { formatDateShort } from '../../utils/dateUtils.js';
import './TaskList.css';

export default function TaskList() {
  const { state, dispatch, getTasksForDate, getOverdueTasks } = useApp();
  const [showCompleted, setShowCompleted] = useState(false);

  const tasks = getTasksForDate(state.selectedDate);
  const overdue = getOverdueTasks(state.selectedDate);

  const incomplete = tasks.filter(t => !t.completed);
  const complete = tasks.filter(t => t.completed);

  if (tasks.length === 0 && overdue.length === 0) {
    return (
      <div class="task-list-empty">
        <p>No tasks for this day.</p>
        <button
          class="task-add-first"
          onClick={() => dispatch({ type: 'OPEN_MODAL', taskId: null })}
        >
          + Add your first task
        </button>
      </div>
    );
  }

  return (
    <div class="task-list">
      {/* Overdue section */}
      {overdue.length > 0 && (
        <div class="task-overdue-section">
          <div class="task-overdue-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span class="task-overdue-title">{overdue.length} overdue from earlier days</span>
          </div>
          <div class="task-overdue-items">
            {overdue.map(task => (
              <div key={task.id} class="task-overdue-item" onClick={() => dispatch({ type: 'OPEN_MODAL', taskId: task.id })}>
                <span class="task-overdue-date">{formatDateShort(task.date)}</span>
                <span class="task-overdue-name">{task.title}</span>
                <span class={`task-overdue-priority priority-${task.priority}`} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Today's incomplete tasks */}
      <div class="task-list-header">
        <span class="task-count">{incomplete.length} remaining</span>
        {complete.length > 0 && (
          <button
            class={`task-toggle-completed ${showCompleted ? 'open' : ''}`}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? 'Hide' : 'Show'} {complete.length} completed
          </button>
        )}
      </div>
      <div class="task-items">
        {incomplete.map((task, idx) => (
          <TaskItem key={task.id} task={task} index={idx} />
        ))}
        {showCompleted && complete.length > 0 && (
          <div class="task-completed-section">
            {complete.map((task, idx) => (
              <TaskItem key={task.id} task={task} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
