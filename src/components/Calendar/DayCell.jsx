import { useApp } from '../../context/AppContext.jsx';
import { today, toDateStr } from '../../utils/dateUtils.js';
import './DayCell.css';

export default function DayCell({ cell }) {
  const { state, dispatch, getTasksForDate } = useApp();
  const tasks = getTasksForDate(cell.dateStr);
  const isSelected = cell.dateStr === state.selectedDate;
  const hasTasks = tasks.length > 0;
  const completedCount = tasks.filter(t => t.completed).length;
  const allComplete = hasTasks && completedCount === tasks.length;
  const isPast = cell.dateStr < toDateStr(today());
  const hasOverdue = isPast && hasTasks && completedCount < tasks.length;

  const cellClass = [
    'day-cell',
    !cell.isCurrentMonth && 'other-month',
    cell.isToday && 'today',
    isSelected && 'selected',
    hasOverdue && 'has-overdue',
  ].filter(Boolean).join(' ');

  return (
    <button
      class={cellClass}
      onClick={() => { dispatch({ type: 'SET_DATE', date: cell.date }); dispatch({ type: 'SELECT_DATE', dateStr: cell.dateStr }); }}
      onDblClick={() => dispatch({ type: 'OPEN_MODAL_FOR_DATE', date: cell.date, dateStr: cell.dateStr })}
    >
      <span class="day-cell-num">{cell.day}</span>
      {hasTasks && (
        <div class="day-cell-dots">
          {allComplete && <span class="dot all-complete" />}
          {hasOverdue && <span class="dot overdue" />}
          {!allComplete && !hasOverdue && tasks.slice(0, 3).map((t) => (
            <span key={t.id} class={`dot priority-${t.priority} ${t.completed ? 'done' : ''}`} />
          ))}
          {tasks.length > 3 && <span class="dot-more">+{tasks.length - 3}</span>}
        </div>
      )}
    </button>
  );
}
