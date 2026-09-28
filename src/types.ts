export type CategoryKey =
  | 'prayer'
  | 'study'
  | 'work'
  | 'exercise'
  | 'meal'
  | 'rest'
  | 'family'
  | 'other';

export type PriorityKey = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  start: string; // "HH:MM" 24h format
  end: string;   // "HH:MM" 24h format
  cat: CategoryKey;
  prio: PriorityKey;
  notes?: string;
}

export type ViewMode = 'timeline' | 'schedule24h' | 'weekmatrix';

export interface RoutineState {
  days: Record<number, Task[]>; // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  lang: 'bn' | 'en';
  dark: boolean;
  done: Record<string, boolean>; // key: `${weekStartString}:${dayOfWeek}:${taskId}`
  notified: Record<string, number>;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  timeFormat: '12h' | '24h';
}

export interface CategoryMeta {
  key: CategoryKey;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  icon: string;
}

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  prayer: {
    key: 'prayer',
    color: '#0f766e', // Teal
    bgLight: '#f0fdfa',
    bgDark: '#134e4a26',
    borderLight: '#ccfbf1',
    icon: 'Moon',
  },
  study: {
    key: 'study',
    color: '#4f46e5', // Indigo
    bgLight: '#eef2ff',
    bgDark: '#3730a326',
    borderLight: '#e0e7ff',
    icon: 'BookOpen',
  },
  work: {
    key: 'work',
    color: '#ea580c', // Orange/Amber
    bgLight: '#fff7ed',
    bgDark: '#9a341226',
    borderLight: '#ffedd5',
    icon: 'Briefcase',
  },
  exercise: {
    key: 'exercise',
    color: '#dc2626', // Red
    bgLight: '#fef2f2',
    bgDark: '#991b1b26',
    borderLight: '#fee2e2',
    icon: 'Activity',
  },
  meal: {
    key: 'meal',
    color: '#16a34a', // Green
    bgLight: '#f0fdf4',
    bgDark: '#16653426',
    borderLight: '#dcfce7',
    icon: 'Utensils',
  },
  rest: {
    key: 'rest',
    color: '#7c3aed', // Purple
    bgLight: '#faf5ff',
    bgDark: '#581c8726',
    borderLight: '#f3e8ff',
    icon: 'BedDouble',
  },
  family: {
    key: 'family',
    color: '#db2777', // Pink
    bgLight: '#fdf2f8',
    bgDark: '#9d174d26',
    borderLight: '#fce7f3',
    icon: 'Heart',
  },
  other: {
    key: 'other',
    color: '#475569', // Slate
    bgLight: '#f8fafc',
    bgDark: '#33415526',
    borderLight: '#e2e8f0',
    icon: 'Compass',
  },
};
