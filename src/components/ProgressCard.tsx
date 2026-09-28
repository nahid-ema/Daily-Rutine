import React from 'react';
import { Task, CATEGORIES, CategoryKey } from '../types';
import { getTaskDurationMinutes, formatDuration, toBengaliDigits } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';
import { CategoryIcon } from './CategoryIcon';

interface Props {
  tasks: Task[];
  doneTaskIds: Set<string>;
  isBengali: boolean;
}

export const ProgressCard: React.FC<Props> = ({ tasks, doneTaskIds, isBengali }) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  const totalCount = tasks.length;
  const completedCount = tasks.filter((task) => doneTaskIds.has(task.id)).length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Calculate total scheduled time
  const totalMinutes = tasks.reduce((sum, task) => sum + getTaskDurationMinutes(task), 0);
  const completedMinutes = tasks
    .filter((task) => doneTaskIds.has(task.id))
    .reduce((sum, task) => sum + getTaskDurationMinutes(task), 0);

  // SVG ring math
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Category distribution
  const catMinutes: Partial<Record<CategoryKey, number>> = {};
  tasks.forEach((task) => {
    catMinutes[task.cat] = (catMinutes[task.cat] || 0) + getTaskDurationMinutes(task);
  });

  const sortedCategories = (Object.keys(catMinutes) as CategoryKey[]).sort(
    (a, b) => (catMinutes[b] || 0) - (catMinutes[a] || 0)
  );

  return (
    <div className="border p-4 sm:p-5 bg-white dark:bg-[#13161c] border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
      {/* Top stats block */}
      <div className="flex items-center gap-4">
        {/* Modern Circular Ring */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
            {/* Background track */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              className="text-slate-100 dark:text-slate-800"
            />
            {/* Active progress */}
            <circle
              cx="40"
              cy="40"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="text-blue-600 dark:text-blue-400 transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-base font-bold tabular-nums text-slate-900 dark:text-white leading-none">
              {isBengali ? toBengaliDigits(percentage) : percentage}%
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5">{t.completionRate}</span>
          </div>
        </div>

        {/* Text metrics */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
              {isBengali ? toBengaliDigits(completedCount) : completedCount}
            </span>
            <span className="text-slate-400 font-medium">/</span>
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
              {isBengali ? toBengaliDigits(totalCount) : totalCount} {t.completed}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>{t.totalScheduled}:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
              {formatDuration(totalMinutes, isBengali)}
            </span>
          </div>
        </div>
      </div>

      {/* Category breakdown bar with sharp square edges */}
      {totalMinutes > 0 && sortedCategories.length > 0 && (
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium">{t.categoryBreakdown}</span>
            <span className="tabular-nums font-semibold">
              {isBengali ? toBengaliDigits(sortedCategories.length) : sortedCategories.length} {t.category.toLowerCase()}
            </span>
          </div>

          {/* Stacked multi-colored bar with square edges */}
          <div className="h-2 w-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 gap-0.5">
            {sortedCategories.map((cat) => {
              const mins = catMinutes[cat] || 0;
              const pct = (mins / totalMinutes) * 100;
              const meta = CATEGORIES[cat];
              return (
                <div
                  key={cat}
                  style={{ width: `${pct}%`, backgroundColor: meta?.color || '#2563eb' }}
                  title={`${t.categories[cat]}: ${formatDuration(mins, isBengali)} (${Math.round(pct)}%)`}
                  className="h-full transition-all"
                />
              );
            })}
          </div>

          {/* Category badges list */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {sortedCategories.slice(0, 4).map((cat) => {
              const mins = catMinutes[cat] || 0;
              const meta = CATEGORIES[cat];
              return (
                <div key={cat} className="flex items-center justify-between text-xs py-0.5">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 truncate">
                    <span
                      className="w-2 h-2 shrink-0"
                      style={{ backgroundColor: meta?.color }}
                    />
                    <span className="truncate font-medium">{t.categories[cat]}</span>
                  </span>
                  <span className="tabular-nums text-slate-500 dark:text-slate-400 text-[11px] font-semibold shrink-0 pl-1">
                    {formatDuration(mins, isBengali)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
