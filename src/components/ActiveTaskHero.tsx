import React from 'react';
import { Check, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Task, CATEGORIES } from '../types';
import { formatTime, formatDuration } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';
import { CategoryIcon } from './CategoryIcon';

interface Props {
  currentTask: Task | null;
  nextTask: Task | null;
  progressPercent: number;
  remainingMinutes: number;
  isToday: boolean;
  isDone: boolean;
  isBengali: boolean;
  format12h: boolean;
  onToggleDone: (taskId: string) => void;
}

export const ActiveTaskHero: React.FC<Props> = ({
  currentTask,
  nextTask,
  progressPercent,
  remainingMinutes,
  isToday,
  isDone,
  isBengali,
  format12h,
  onToggleDone,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  if (!isToday) {
    return null;
  }

  return (
    <div className="rounded-3xl border p-4 sm:p-5 bg-gradient-to-br from-blue-500/10 via-slate-50 to-indigo-500/10 dark:from-blue-950/40 dark:via-[#151922] dark:to-indigo-950/25 border-blue-500/25 dark:border-blue-500/20 shadow-sm relative overflow-hidden">
      {/* Decorative ambient blurred orb */}
      <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />

      {currentTask ? (
        <div className="relative">
          {/* Top header row: pulsating indicator & remaining time */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600" />
              </span>
              <span className="uppercase tracking-wider text-[11px]">{t.now}</span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="tabular-nums font-medium text-slate-600 dark:text-slate-400">
                {t.timeRemaining}: {formatDuration(remainingMinutes, isBengali)}
              </span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 tabular-nums font-medium">
              {formatTime(currentTask.start, isBengali, format12h)} — {formatTime(currentTask.end, isBengali, format12h)}
            </div>
          </div>

          {/* Current Task Title & Quick Done Button */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2
                className={`text-lg sm:text-xl font-bold tracking-tight leading-snug break-words ${
                  isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                }`}
              >
                {currentTask.title}
              </h2>
              {currentTask.notes && (
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-1 font-normal">
                  {currentTask.notes}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => onToggleDone(currentTask.id)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs ${
                isDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Check size={14} strokeWidth={2.5} />
              <span>{isDone ? t.completed : t.done}</span>
            </button>
          </div>

          {/* Smooth progress bar */}
          <div className="mt-3.5">
            <div className="h-2 w-full bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Up Next Preview */}
          {nextTask && (
            <div className="mt-3 pt-2.5 border-t border-blue-500/15 dark:border-blue-500/15 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 truncate">
                <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0">{t.next}:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                  {nextTask.title}
                </span>
              </span>
              <span className="tabular-nums shrink-0 font-semibold text-blue-600 dark:text-blue-400">
                {formatTime(nextTask.start, isBengali, format12h)}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* No active task right now */
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {t.freeTime}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {nextTask
                  ? `${t.next}: ${nextTask.title} (${formatTime(nextTask.start, isBengali, format12h)})`
                  : t.noMoreTasksToday}
              </p>
            </div>
          </div>

          {nextTask && (
            <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 self-end sm:self-auto tabular-nums bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-full border border-blue-200/80 dark:border-blue-800/60">
              {t.start}: {formatTime(nextTask.start, isBengali, format12h)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
