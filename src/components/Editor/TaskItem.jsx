import { useApp } from '../../context/AppContext.jsx';
import './TaskItem.css';

export default function TaskItem({ task, index }) {
  const { dispatch } = useApp();

  return (
    <div class={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <button
        class="task-checkbox"
        onClick={() => dispatch({ type: 'TOGGLE_COMPLETE', taskId: task.id })}
      >
        {task.completed && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </button>
      <div class="task-content" onClick={() => dispatch({ type: 'OPEN_MODAL', taskId: task.id })}>
        <span class="task-title">{task.title}</span>
        <span class="task-meta">
          {task.startTime && (
            <span class="task-time">{task.startTime}{task.endTime ? ` - ${task.endTime}` : ''}</span>
          )}
          {task.category && (
            <span class="task-category">{task.category}</span>
          )}
        </span>
      </div>
      <div class="task-actions">
        <span class={`task-priority-dot priority-${task.priority}`} title={`${task.priority} priority`} />
        <button
          class="task-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm('Delete this task?')) {
              dispatch({ type: 'DELETE_TASK', taskId: task.id });
            }
          }}
          title="Delete task"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
