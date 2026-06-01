import { useApp } from '../../context/AppContext.jsx';
import { getWeekRange, toDateStr } from '../../utils/dateUtils.js';
import './WeekView.css';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

function formatHour(h) {
  if (h === 0) return '12 AM';
  if (h < 12) return `${h} AM`;
  if (h === 12) return '12 PM';
  return `${h - 12} PM`;
}

export default function WeekView() {
  const { state, dispatch, getTasksForDate } = useApp();
  const days = getWeekRange(state.currentDate, state.settings.firstDayOfWeek);

  return (
    <div class="week-view animate-fade-in-up">
      <div class="week-header">
        <div class="week-time-gutter" />
        {days.map(d => (
          <div key={d.dateStr} class={`week-day-header ${d.isToday ? 'today' : ''}`}>
            <span class="week-day-name">{d.dayName}</span>
            <span class="week-day-num">{d.day}</span>
          </div>
        ))}
      </div>
      <div class="week-body">
        <div class="week-time-column">
          {HOURS.map(h => (
            <div key={h} class="week-hour-label">
              <span>{formatHour(h)}</span>
            </div>
          ))}
        </div>
        <div class="week-grid">
          {HOURS.map(h => (
            days.map(d => (
              <div
                key={`${d.dateStr}-${h}`}
                class="week-hour-slot"
                onClick={() => {
                  dispatch({ type: 'SET_DATE', date: d.date });
                  dispatch({ type: 'SELECT_DATE', dateStr: d.dateStr });
                  dispatch({
                    type: 'OPEN_MODAL',
                    taskId: null,
                  });
                }}
              />
            ))
          ))}
          {days.map(d => {
            const tasks = getTasksForDate(d.dateStr).filter(t => t.startTime);
            return tasks.map(task => {
              const startH = parseInt(task.startTime?.split(':')[0]) || 0;
              const startM = parseInt(task.startTime?.split(':')[1]) || 0;
              const endH = parseInt(task.endTime?.split(':')[0]) || startH + 1;
              const endM = parseInt(task.endTime?.split(':')[1]) || 0;
              const top = (startH + startM / 60) * 48; // 48px per hour
              const height = Math.max(((endH + endM / 60) - (startH + startM / 60)) * 48, 20);
              const colIdx = days.findIndex(dd => dd.dateStr === d.dateStr);

              return (
                <div
                  key={task.id}
                  class={`week-task-block priority-${task.priority}`}
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `calc(${colIdx * (100 / 7)}% + 4px)`,
                    width: `calc(${100 / 7}% - 8px)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: 'OPEN_MODAL', taskId: task.id });
                  }}
                >
                  <span class="week-task-title">{task.title}</span>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
