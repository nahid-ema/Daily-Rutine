import React from 'react';
import {
  CalendarDays,
  Sliders,
  Layers,
  LayoutGrid,
  ListTodo,
} from 'lucide-react';
import { ViewMode } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  viewMode: ViewMode;
  isBengali: boolean;
  currentTimeString: string;
  currentDateString: string;
  greetingText: string;
  onChangeViewMode: (mode: ViewMode) => void;
  onOpenToolsMenu: () => void;
}

export const Header: React.FC<Props> = ({
  viewMode,
  isBengali,
  currentTimeString,
  currentDateString,
  greetingText,
  onChangeViewMode,
  onOpenToolsMenu,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Zone 1: Wordmark & Brand with sharp edges */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <CalendarDays size={20} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 truncate leading-tight">
                {t.appName}
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {greetingText} · {currentDateString}
            </p>
          </div>
        </div>

        {/* Zone 2: Segmented Square Selector (Desktop/Tablet) */}
        <nav className="hidden md:flex items-center p-0.5 bg-slate-100/90 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-700">
          <button
            type="button"
            onClick={() => onChangeViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListTodo size={14} />
            <span>{t.viewTimeline}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('schedule24h')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
              viewMode === 'schedule24h'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>{t.viewSchedule24h}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('weekmatrix')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
              viewMode === 'weekmatrix'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span>{t.viewWeekMatrix}</span>
          </button>
        </nav>

        {/* Zone 3: Single Unified Square Action Button */}
        <div className="flex items-center gap-2">
          {/* Live digital time box on desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-slate-100/90 dark:bg-slate-800/80 text-xs font-semibold tabular-nums text-blue-700 dark:text-blue-300 border border-slate-200/90 dark:border-slate-700 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 bg-blue-600" />
            </span>
            <span>{currentTimeString}</span>
          </div>

          {/* Unified Menu & Tools Button with crisp square edges */}
          <button
            type="button"
            onClick={onOpenToolsMenu}
            title={isBengali ? 'মেনু, সেটিংস ও টুলস' : 'Menu, Settings & Tools'}
            className="flex items-center gap-2 px-3.5 py-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <div className="w-5 h-5 bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sliders size={13} />
            </div>
            <span>{isBengali ? 'মেনু ও সেটিংস' : 'Menu & Tools'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
