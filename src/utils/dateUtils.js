export function today() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDateStr(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function firstDayOfMonth(year, month, firstDayOfWeek = 0) {
  let dow = new Date(year, month, 1).getDay();
  dow = (dow - firstDayOfWeek + 7) % 7;
  return dow;
}

let _gridCache = null;

export function getMonthGrid(year, month, firstDayOfWeek = 0) {
  const cacheKey = `${year}-${month}-${firstDayOfWeek}`;
  if (_gridCache && _gridCache.key === cacheKey) return _gridCache.grid;
  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfMonth(year, month, firstDayOfWeek);
  const todayStr = toDateStr(today());
  const cells = [];

  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevDays = daysInMonth(prevYear, prevMonth);

  for (let i = startOffset - 1; i >= 0; i--) {
    const day = prevDays - i;
    const date = new Date(prevYear, prevMonth, day);
    cells.push({
      date,
      dateStr: toDateStr(date),
      day,
      isCurrentMonth: false,
      isToday: toDateStr(date) === todayStr,
    });
  }

  for (let day = 1; day <= totalDays; day++) {
    const date = new Date(year, month, day);
    cells.push({
      date,
      dateStr: toDateStr(date),
      day,
      isCurrentMonth: true,
      isToday: toDateStr(date) === todayStr,
    });
  }

  const remaining = 42 - cells.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(nextYear, nextMonth, day);
    cells.push({
      date,
      dateStr: toDateStr(date),
      day,
      isCurrentMonth: false,
      isToday: toDateStr(date) === todayStr,
    });
  }

  _gridCache = { key: cacheKey, grid: cells };
  return cells;
}

export function getWeekRange(date, firstDayOfWeek = 0) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day - firstDayOfWeek + 7) % 7;
  const start = new Date(d);
  start.setDate(d.getDate() - diff);
  start.setHours(0, 0, 0, 0);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const cur = new Date(start);
    cur.setDate(start.getDate() + i);
    days.push({
      date: cur,
      dateStr: toDateStr(cur),
      day: cur.getDate(),
      dayName: cur.toLocaleDateString('en-US', { weekday: 'short' }),
      isToday: toDateStr(cur) === toDateStr(today()),
    });
  }
  return days;
}

export function formatMonthYear(date) {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function formatDateShort(dateStr) {
  const d = parseDateStr(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
}

export function addMonths(date, n) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export function addWeeks(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n * 7);
  return d;
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function isSameDay(d1, d2) {
  return toDateStr(d1) === toDateStr(d2);
}
