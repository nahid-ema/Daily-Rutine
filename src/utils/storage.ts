import { RoutineState, Task, CategoryKey, PriorityKey, CATEGORIES } from '../types';
import { PRESET_DEFAULT_TASKS, buildDayTasksFromTemplate, uid } from './presets';

const STORAGE_KEY = 'amr_routine_v2';
const OLD_STORAGE_KEY = 'rt';

export function normalizeTask(raw: any): Task {
  if (!raw || typeof raw !== 'object') {
    return {
      id: uid(),
      title: 'নতুন কাজ',
      start: '08:00',
      end: '09:00',
      cat: 'work',
      prio: 'medium',
      notes: '',
    };
  }

  const title = String(raw.title || raw.t || 'নতুন কাজ');
  const start = String(raw.start || raw.s || '08:00');
  const end = String(raw.end || raw.e || '09:00');

  // Handle old short or unrecognized category codes
  let cat: CategoryKey = (raw.cat || raw.c || 'work') as CategoryKey;
  if (!CATEGORIES[cat]) {
    cat = 'other';
  }

  // Handle old single letter priority codes ('h', 'm', 'l')
  let prio: PriorityKey = (raw.prio || raw.p || 'medium') as PriorityKey;
  if ((prio as string) === 'h') prio = 'high';
  else if ((prio as string) === 'm') prio = 'medium';
  else if ((prio as string) === 'l') prio = 'low';
  else if (!['low', 'medium', 'high'].includes(prio)) {
    prio = 'medium';
  }

  const notes = String(raw.notes || raw.n || '');

  return {
    id: String(raw.id || uid()),
    title,
    start,
    end,
    cat,
    prio,
    notes,
  };
}

export function getInitialState(): RoutineState {
  try {
    // 1. Try reading the current v2 storage key
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && parsed.days) {
        const days: Record<number, Task[]> = {};
        for (let d = 0; d < 7; d++) {
          const arr = parsed.days[d];
          days[d] = Array.isArray(arr) ? arr.map(normalizeTask) : [];
        }

        return {
          days,
          lang: parsed.lang === 'en' ? 'en' : 'bn',
          dark: Boolean(parsed.dark),
          done: typeof parsed.done === 'object' && parsed.done ? parsed.done : {},
          notified: typeof parsed.notified === 'object' && parsed.notified ? parsed.notified : {},
          notificationsEnabled: Boolean(parsed.notificationsEnabled),
          soundEnabled: parsed.soundEnabled !== false,
          timeFormat: parsed.timeFormat === '24h' ? '24h' : '12h',
        };
      }
    }

    // 2. Migrate from user's original HTML code key ('rt')
    const oldRaw = localStorage.getItem(OLD_STORAGE_KEY);
    if (oldRaw) {
      const oldParsed = JSON.parse(oldRaw);
      if (oldParsed && typeof oldParsed === 'object' && oldParsed.days) {
        const days: Record<number, Task[]> = {};
        for (let d = 0; d < 7; d++) {
          const arr = oldParsed.days[d];
          days[d] = Array.isArray(arr) && arr.length > 0 ? arr.map(normalizeTask) : buildDayTasksFromTemplate(PRESET_DEFAULT_TASKS);
        }

        return {
          days,
          lang: 'bn',
          dark: Boolean(oldParsed.dark),
          done: typeof oldParsed.done === 'object' && oldParsed.done ? oldParsed.done : {},
          notified: {},
          notificationsEnabled: false,
          soundEnabled: true,
          timeFormat: '12h',
        };
      }
    }
  } catch (err) {
    console.error('Error reading localStorage routine:', err);
  }

  // Fallback initial default routine populated across all 7 days
  const defaultDays: Record<number, Task[]> = {};
  for (let d = 0; d < 7; d++) {
    defaultDays[d] = buildDayTasksFromTemplate(PRESET_DEFAULT_TASKS);
  }

  return {
    days: defaultDays,
    lang: 'bn',
    dark: false,
    done: {},
    notified: {},
    notificationsEnabled: false,
    soundEnabled: true,
    timeFormat: '12h',
  };
}

export function saveState(state: RoutineState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving routine to localStorage:', err);
  }
}

export function resetLocalStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(OLD_STORAGE_KEY);
  } catch (e) {
    console.warn(e);
  }
}

export function exportRoutineAsJson(state: RoutineState): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  const dateStr = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute('download', `amr_routine_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
