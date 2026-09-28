import React from 'react';
import { Task, CATEGORIES } from '../types';
import {
  getTaskSpan,
  getCurrentMinutesOfDay,
  formatTime,
  toBengaliDigits,
} from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  tasks: Task[];
  isToday: boolean;
  doneTaskIds: Set<string>;
  isBengali: boolean;
  format12h: boolean;
  onEditTask: (task: Task) => void;
  onToggleDone: (taskId: string) => void;
}

export const Schedule24hView: React.FC<Props> = ({
  tasks,
  isToday,
  doneTaskIds,
  isBengali,
  format12h,
  onEditTask,
  onToggleDone,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const nowMin = getCurrentMinutesOfDay();

  // 24 hours (0 to 23), each hour is 54px height
  const HOUR_HEIGHT = 54;
  const TOTAL_HEIGHT = 24 * HOUR_HEIGHT;

  return (
    <div className="border bg-white dark:bg-[#13161c] border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 overflow-hidden shadow-2xs">
      <div className="flex items-center justify-between mb-3 text-xs text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-slate-700 dark:text-slate-300">{t.viewSchedule24h}</span>
        <span className="tabular-nums font-medium">
          {isBengali ? toBengaliDigits(tasks.length) : tasks.length} {t.category.toLowerCase()}
        </span>
      </div>

      <div className="relative overflow-y-auto max-h-[640px] pr-2 scrollbar-thin">
        <div className="relative" style={{ height: `${TOTAL_HEIGHT}px` }}>
          {/* Hour markers grid */}
          {Array.from({ length: 24 }).map((_, hour) => {
            const timeStr = `${String(hour).padStart(2, '0')}:00`;
            return (
              <div
                key={hour}
                className="absolute left-0 right-0 border-t border-slate-100 dark:border-slate-800/70 flex items-start"
                style={{ top: `${hour * HOUR_HEIGHT}px`, height: `${HOUR_HEIGHT}px` }}
              >
                <span className="w-14 sm:w-16 text-[11px] font-semibold text-slate-400 dark:text-slate-500 tabular-nums -mt-2.5">
                  {formatTime(timeStr, isBengali, format12h)}
                </span>
                <div className="flex-1 border-t border-slate-100 dark:border-slate-800/50" />
              </div>
            );
          })}

          {/* Current Live Time Indicator Line (if today) */}
          {isToday && (
            <div
              className="absolute left-14 sm:left-16 right-0 z-20 pointer-events-none flex items-center"
              style={{ top: `${(nowMin / 60) * HOUR_HEIGHT}px` }}
            >
              <div className="w-2.5 h-2.5 bg-rose-500 -ml-1.5 shadow-sm" />
              <div className="flex-1 h-0.5 bg-rose-500 shadow-sm" />
            </div>
          )}

          {/* Task Time Blocks with Square Edges */}
          <div className="absolute left-16 sm:left-20 right-0 top-0 bottom-0 pointer-events-auto">
            {tasks.map((task) => {
              const [startMin, rawEndMin] = getTaskSpan(task);
              const durationMin = rawEndMin - startMin;

              const topPx = (startMin / 60) * HOUR_HEIGHT;
              const heightPx = Math.max(36, (durationMin / 60) * HOUR_HEIGHT - 3);

              const catMeta = (task && task.cat && CATEGORIES[task.cat]) || CATEGORIES.other;
              const isDone = doneTaskIds.has(task.id);

              return (
                <div
                  key={task.id}
                  onClick={() => onEditTask(task)}
                  className={`absolute left-1 right-2 p-2.5 cursor-pointer transition-all duration-150 overflow-hidden border shadow-2xs hover:shadow-xs group ${
                    isDone ? 'opacity-65' : ''
                  }`}
                  style={{
                    top: `${topPx}px`,
                    height: `${heightPx}px`,
                    backgroundColor: catMeta.bgLight,
                    borderColor: catMeta.color + '40',
                  }}
                >
                  <div className="flex items-start justify-between gap-2 h-full">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                        <span
                          className="w-2 h-2 shrink-0"
                          style={{ backgroundColor: catMeta.color }}
                        />
                        <span className={`truncate ${isDone ? 'line-through opacity-60' : ''}`}>
                          {task.title}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-semibold tabular-nums truncate mt-0.5">
                        {formatTime(task.start, isBengali, format12h)} -{' '}
                        {formatTime(task.end, isBengali, format12h)}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleDone(task.id);
                      }}
                      className={`w-6 h-6 border flex items-center justify-center text-xs shrink-0 transition-colors cursor-pointer ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white/90 text-transparent hover:text-slate-500'
                      }`}
                    >
                      ✓
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
