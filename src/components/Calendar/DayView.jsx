import { useApp } from '../../context/AppContext.jsx';
import { HOURS, formatHour } from '../../utils/timeUtils.js';
import './DayView.css';

export default function DayView() {
  const { state, dispatch, getTasksForDate } = useApp();
  const dateStr = state.selectedDate;
  const allTasks = getTasksForDate(dateStr);
  const timedTasks = allTasks.filter(t => t.startTime);
  const allDayTasks = allTasks.filter(t => !t.startTime);

  const dayName = state.currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const dateFormatted = state.currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div class="day-view animate-fade-in-up">
      <div class="day-header-banner">
        <span class="day-name">{dayName}</span>
        <span class="day-date">{dateFormatted}</span>
      </div>
      {allDayTasks.length > 0 && (
        <div class="day-all-day">
          <span class="day-all-day-label">All Day</span>
          <div class="day-all-day-tasks">
            {allDayTasks.map(t => (
              <button
                key={t.id}
                class={`day-all-day-task priority-${t.priority} ${t.completed ? 'completed' : ''}`}
                onClick={() => dispatch({ type: 'OPEN_MODAL', taskId: t.id })}
              >
                <span class="day-task-check" onClick={(e) => {
                  e.stopPropagation();
                  dispatch({ type: 'TOGGLE_COMPLETE', taskId: t.id });
                }}>
                  {t.completed ? '✓' : ''}
                </span>
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}
      <div class="day-body">
        <div class="day-time-column">
          {HOURS.map(h => (
            <div key={h} class="day-hour-label">
              <span>{formatHour(h)}</span>
            </div>
          ))}
        </div>
        <div class="day-slots">
          {HOURS.map(h => (
            <div
              key={h}
              class="day-hour-slot"
              onClick={() => dispatch({ type: 'OPEN_MODAL_FOR_DATE', date: state.currentDate, dateStr })}
            />
          ))}
          {timedTasks.map(task => {
            const startH = parseInt(task.startTime?.split(':')[0]) || 0;
            const startM = parseInt(task.startTime?.split(':')[1]) || 0;
            const endH = parseInt(task.endTime?.split(':')[0]) || startH + 1;
            const endM = parseInt(task.endTime?.split(':')[1]) || 0;
            const top = (startH + startM / 60) * 64;
            const height = Math.max(((endH + endM / 60) - (startH + startM / 60)) * 64, 24);

            return (
              <div
                key={task.id}
                class={`day-task-block priority-${task.priority} ${task.completed ? 'completed' : ''}`}
                style={{ top: `${top}px`, height: `${height}px` }}
                onClick={() => dispatch({ type: 'OPEN_MODAL', taskId: task.id })}
              >
                <span class="day-task-time">{task.startTime} - {task.endTime}</span>
                <span class="day-task-title">{task.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
