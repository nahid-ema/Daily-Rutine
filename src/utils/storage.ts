import { RoutineState } from '../types';
import { PRESET_DEFAULT_TASKS, buildDayTasksFromTemplate } from './presets';

const STORAGE_KEY = 'amr_routine_v2';
const OLD_STORAGE_KEY = 'rt';

export function getInitialState(): RoutineState {
  // Try loading saved data
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.days) {
        return {
          days: parsed.days,
          lang: parsed.lang || 'bn',
          dark: Boolean(parsed.dark),
          done: parsed.done || {},
          notified: parsed.notified || {},
          notificationsEnabled: Boolean(parsed.notificationsEnabled),
          soundEnabled: parsed.soundEnabled !== false, // default true
          timeFormat: parsed.timeFormat || '12h',
        };
      }
    }

    // Attempt migration from user's original HTML localStorage key ('rt')
    const oldRaw = localStorage.getItem(OLD_STORAGE_KEY);
    if (oldRaw) {
      const oldParsed = JSON.parse(oldRaw);
      if (oldParsed && oldParsed.days) {
        return {
          days: oldParsed.days,
          lang: oldParsed.lang || 'bn',
          dark: Boolean(oldParsed.dark),
          done: oldParsed.done || {},
          notified: oldParsed.notified || {},
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
  const days: Record<number, ReturnType<typeof buildDayTasksFromTemplate>> = {};
  for (let d = 0; d < 7; d++) {
    days[d] = buildDayTasksFromTemplate(PRESET_DEFAULT_TASKS);
  }

  return {
    days,
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
