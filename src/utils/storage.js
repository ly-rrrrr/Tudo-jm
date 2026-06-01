const STORAGE_VERSION = 1;

function read(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data;
  } catch {
    return null;
  }
}

function write(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function loadTasks() {
  const data = read('tudo_tasks');
  if (!data || data.version !== STORAGE_VERSION) return {};
  return data.items || {};
}

export function saveTasks(tasks) {
  write('tudo_tasks', { version: STORAGE_VERSION, items: tasks });
}

export function loadDayPlans() {
  const data = read('tudo_dayplans');
  if (!data || data.version !== STORAGE_VERSION) return {};
  return data.items || {};
}

export function saveDayPlans(plans) {
  write('tudo_dayplans', { version: STORAGE_VERSION, items: plans });
}

export function loadSettings() {
  const data = read('tudo_settings');
  if (!data || data.version !== STORAGE_VERSION) return null;
  return data.settings || null;
}

export function saveSettings(settings) {
  write('tudo_settings', { version: STORAGE_VERSION, settings });
}
