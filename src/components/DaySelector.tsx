import React from 'react';
import { Task } from '../types';
import { ORDER_DAYS, toBengaliDigits } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  selectedDay: number;
  todayDay: number;
  daysData: Record<number, Task[]>;
  doneRecord: Record<string, boolean>;
  weekStartKey: string;
  isBengali: boolean;
  onSelectDay: (dayIndex: number) => void;
}

export const DaySelector: React.FC<Props> = ({
  selectedDay,
  todayDay,
  daysData,
  doneRecord,
  weekStartKey,
  isBengali,
  onSelectDay,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  return (
    <div className="w-full">
      {/* Scrollable track for mobile, responsive flex row for desktop */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none no-scrollbar">
        {ORDER_DAYS.map((dayIndex) => {
          const isSelected = selectedDay === dayIndex;
          const isCurrentToday = todayDay === dayIndex;
          const dayTasks = daysData[dayIndex] || [];
          const count = dayTasks.length;

          // Check how many are completed for this day
          const completedCount = dayTasks.filter(
            (task) => doneRecord[`${weekStartKey}:${dayIndex}:${task.id}`]
          ).length;

          const isAllDone = count > 0 && completedCount === count;

          return (
            <button
              key={dayIndex}
              type="button"
              onClick={() => onSelectDay(dayIndex)}
              className={`relative flex-1 min-w-[68px] sm:min-w-0 py-2.5 px-2 rounded-2xl border text-center transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-blue-600 dark:bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700/60 hover:bg-slate-100/80'
              }`}
            >
              {/* Today indicator dot */}
              {isCurrentToday && (
                <div
                  className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${
                    isSelected ? 'bg-amber-300 ring-2 ring-blue-600' : 'bg-blue-600 dark:bg-blue-400'
                  }`}
                  title={t.today}
                />
              )}

              {/* Day Name in Google Sans */}
              <div className="text-xs sm:text-sm font-bold tracking-tight">
                {t.daysOfWeekShort[dayIndex]}
              </div>

              {/* Task count & indicator */}
              <div
                className={`text-[11px] mt-0.5 tabular-nums font-semibold ${
                  isSelected
                    ? 'text-blue-100'
                    : isAllDone
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {isBengali ? toBengaliDigits(count) : count}{' '}
                {isBengali ? 'টি' : 'tasks'}
              </div>

              {/* Micro progress line */}
              {count > 0 && (
                <div className="mt-1.5 w-full h-1 bg-slate-200/60 dark:bg-slate-700/60 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isSelected ? 'bg-white' : 'bg-blue-600 dark:bg-blue-500'
                    }`}
                    style={{ width: `${Math.round((completedCount / count) * 100)}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
