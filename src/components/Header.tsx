import React, { useState, useRef, useEffect } from 'react';
import {
  CalendarDays,
  Clock,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Sun,
  Moon,
  Sparkles,
  Download,
  Upload,
  Printer,
  MoreVertical,
  Layers,
  LayoutGrid,
  ListTodo,
} from 'lucide-react';
import { ViewMode } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  viewMode: ViewMode;
  isDark: boolean;
  isBengali: boolean;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  format12h: boolean;
  currentTimeString: string;
  currentDateString: string;
  greetingText: string;
  onChangeViewMode: (mode: ViewMode) => void;
  onToggleDark: () => void;
  onToggleLang: () => void;
  onToggleSound: () => void;
  onToggleNotification: () => void;
  onToggleTimeFormat: () => void;
  onOpenPresets: () => void;
  onExport: () => void;
  onTriggerImport: () => void;
  onPrint: () => void;
}

export const Header: React.FC<Props> = ({
  viewMode,
  isDark,
  isBengali,
  notificationsEnabled,
  soundEnabled,
  format12h,
  currentTimeString,
  currentDateString,
  greetingText,
  onChangeViewMode,
  onToggleDark,
  onToggleLang,
  onToggleSound,
  onToggleNotification,
  onToggleTimeFormat,
  onOpenPresets,
  onExport,
  onTriggerImport,
  onPrint,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close more menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Wordmark & Google Calendar Style Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
            <CalendarDays size={20} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 truncate leading-tight">
                {t.appName}
              </h1>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate hidden sm:block">
              {greetingText} · {currentDateString}
            </p>
          </div>
        </div>

        {/* Zone 2: Material 3 Segmented Pill Selector (Desktop) */}
        <nav className="hidden md:flex items-center p-1 bg-slate-100/90 dark:bg-slate-800/60 rounded-full border border-slate-200/80 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => onChangeViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListTodo size={14} />
            <span>{t.viewTimeline}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('schedule24h')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
              viewMode === 'schedule24h'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers size={14} />
            <span>{t.viewSchedule24h}</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeViewMode('weekmatrix')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-150 ${
              viewMode === 'weekmatrix'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid size={14} />
            <span>{t.viewWeekMatrix}</span>
          </button>
        </nav>

        {/* Zone 3: Quick Action Tools & Live Clock */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Live digital time readout on desktop */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 dark:bg-slate-800/80 text-xs font-semibold tabular-nums text-blue-700 dark:text-blue-300 border border-slate-200/80 dark:border-slate-700/60 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            <span>{currentTimeString}</span>
          </div>

          {/* Routine Presets Button */}
          <button
            type="button"
            onClick={onOpenPresets}
            title={t.presets}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 bg-white dark:bg-slate-800 transition-colors shadow-2xs"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span className="hidden sm:inline">{t.presets}</span>
          </button>

          {/* Sound alert chime toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            title={t.soundAlert}
            aria-label={t.soundAlert}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
              soundEnabled
                ? 'text-blue-600 dark:text-blue-400 border-blue-500/40 bg-blue-50/70 dark:bg-blue-950/40'
                : 'text-slate-400 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:text-slate-600'
            }`}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Notifications toggle */}
          <button
            type="button"
            onClick={onToggleNotification}
            title={notificationsEnabled ? t.alertsActive : t.enableAlerts}
            aria-label={t.enableAlerts}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
              notificationsEnabled
                ? 'text-blue-600 dark:text-blue-400 border-blue-500/40 bg-blue-50/70 dark:bg-blue-950/40'
                : 'text-slate-400 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 hover:text-slate-600'
            }`}
          >
            {notificationsEnabled ? <Bell size={16} /> : <BellOff size={16} />}
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={onToggleLang}
            title={isBengali ? 'Switch to English' : 'বাংলায় পরিবর্তন করুন'}
            className="h-9 px-3 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-2xs"
          >
            {isBengali ? 'EN' : 'বাং'}
          </button>

          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={onToggleDark}
            title={isDark ? t.lightMode : t.darkMode}
            aria-label={isDark ? t.lightMode : t.darkMode}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors shadow-2xs"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* More Dropdown Menu */}
          <div className="relative" ref={moreRef}>
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-400 transition-colors shadow-2xs"
            >
              <MoreVertical size={16} />
            </button>

            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-1.5 z-50 text-xs animate-in fade-in-0 zoom-in-95">
                <button
                  type="button"
                  onClick={() => {
                    onToggleTimeFormat();
                    setIsMoreOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Clock size={14} />
                    <span>{t.timeFormatToggle}</span>
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 tabular-nums">
                    {format12h ? '12h' : '24h'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onExport();
                    setIsMoreOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                >
                  <Download size={14} />
                  <span>{t.exportJson}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onTriggerImport();
                    setIsMoreOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                >
                  <Upload size={14} />
                  <span>{t.importJson}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onPrint();
                    setIsMoreOpen(false);
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors"
                >
                  <Printer size={14} />
                  <span>{t.print}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
