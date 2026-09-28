import { Task } from '../types';

export const ORDER_DAYS = [6, 0, 1, 2, 3, 4, 5]; // Saturday to Friday or standard: Sat(6), Sun(0), Mon(1), Tue(2), Wed(3), Thu(4), Fri(5)

export function toBengaliDigits(input: string | number): string {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/\d/g, (digit) => bnDigits[Number(digit)] || digit);
}

export function parseMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToTimeStr(minutes: number): string {
  const norm = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(norm / 60);
  const m = norm % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatTime(timeStr: string, isBengali: boolean, format12h: boolean = true): string {
  if (!timeStr) return '';
  const totalMins = parseMinutes(timeStr);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;

  if (!format12h) {
    const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    return isBengali ? toBengaliDigits(formatted) : formatted;
  }

  const h12 = h % 12 || 12;
  const minutePart = String(m).padStart(2, '0');
  
  if (isBengali) {
    let period = 'সকাল';
    if (h >= 12 && h < 15) period = 'দুপুর';
    else if (h >= 15 && h < 18) period = 'বিকাল';
    else if (h >= 18 && h < 20) period = 'সন্ধ্যা';
    else if (h >= 20 || h < 4) period = 'রাত';
    else if (h >= 4 && h < 6) period = 'ভোর';

    return `${period} ${toBengaliDigits(h12)}:${toBengaliDigits(minutePart)}`;
  } else {
    const ampm = h < 12 ? 'AM' : 'PM';
    return `${h12}:${minutePart} ${ampm}`;
  }
}

/**
 * Calculates start and end minutes, handling overnight spans (e.g. 23:00 to 05:00)
 */
export function getTaskSpan(task: Task): [number, number] {
  const a = parseMinutes(task.start);
  let b = parseMinutes(task.end);
  if (b <= a) {
    b += 1440; // Overnight task
  }
  return [a, b];
}

export function getTaskDurationMinutes(task: Task): number {
  const [a, b] = getTaskSpan(task);
  return b - a;
}

export function formatDuration(minutes: number, isBengali: boolean): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (isBengali) {
    if (hrs > 0 && mins > 0) {
      return `${toBengaliDigits(hrs)} ঘণ্টা ${toBengaliDigits(mins)} মিনিট`;
    }
    if (hrs > 0) {
      return `${toBengaliDigits(hrs)} ঘণ্টা`;
    }
    return `${toBengaliDigits(mins)} মিনিট`;
  }

  if (hrs > 0 && mins > 0) {
    return `${hrs}h ${mins}m`;
  }
  if (hrs > 0) {
    return `${hrs}h`;
  }
  return `${mins}m`;
}

export function doesTaskOverlap(task: Task, allTasks: Task[]): boolean {
  const [startA, endA] = getTaskSpan(task);
  return allTasks.some((other) => {
    if (other.id === task.id) return false;
    const [startB, endB] = getTaskSpan(other);
    return startA < endB && startB < endA;
  });
}

export function getCurrentMinutesOfDay(): number {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

export function getWeekStartKey(): string {
  const d = new Date();
  // Saturday as week start or Sunday
  const day = d.getDay();
  const diff = d.getDate() - day; // Sunday start
  const startOfWeek = new Date(d.setDate(diff));
  return startOfWeek.toISOString().slice(0, 10);
}

export function findActiveAndNextTask(tasks: Task[]): {
  currentTask: Task | null;
  nextTask: Task | null;
  progressPercent: number;
  remainingMinutes: number;
} {
  const nowMin = getCurrentMinutesOfDay();
  let currentTask: Task | null = null;
  let nextTask: Task | null = null;
  let progressPercent = 0;
  let remainingMinutes = 0;

  for (const task of tasks) {
    const [start, end] = getTaskSpan(task);
    const duration = end - start;

    // Check same-day or overnight window
    if ((nowMin >= start && nowMin < end) || (nowMin + 1440 >= start && nowMin + 1440 < end)) {
      currentTask = task;
      const effectiveNow = nowMin < start ? nowMin + 1440 : nowMin;
      const elapsed = Math.max(0, effectiveNow - start);
      progressPercent = Math.min(100, Math.round((elapsed / duration) * 100));
      remainingMinutes = Math.max(0, end - effectiveNow);
      break;
    }
  }

  // Find next upcoming task
  const upcoming = tasks
    .filter((t) => parseMinutes(t.start) > nowMin)
    .sort((a, b) => parseMinutes(a.start) - parseMinutes(b.start));

  if (upcoming.length > 0) {
    nextTask = upcoming[0];
  } else if (tasks.length > 0 && !currentTask) {
    // Wrap around to first task tomorrow/tonight
    const sorted = [...tasks].sort((a, b) => parseMinutes(a.start) - parseMinutes(b.start));
    nextTask = sorted[0];
  }

  return { currentTask, nextTask, progressPercent, remainingMinutes };
}
