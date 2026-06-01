import { useApp } from '../../context/AppContext.jsx';
import { getMonthGrid } from '../../utils/dateUtils.js';
import DayCell from './DayCell.jsx';
import './MonthView.css';

export default function MonthView() {
  const { state } = useApp();
  const cells = getMonthGrid(
    state.currentDate.getFullYear(),
    state.currentDate.getMonth(),
    state.settings.firstDayOfWeek
  );
  const weekDays = state.settings.firstDayOfWeek === 0
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div class="month-view animate-fade-in-up">
      <div class="month-grid-header">
        {weekDays.map(d => (
          <div key={d} class="month-dow">{d}</div>
        ))}
      </div>
      <div class="month-grid">
        {cells.map((cell, i) => (
          <DayCell key={i} cell={cell} />
        ))}
      </div>
    </div>
  );
}
