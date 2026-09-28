import React from 'react';
import { Task, CATEGORIES } from '../types';
import { ORDER_DAYS, formatTime, toBengaliDigits } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';
import { Plus, ChevronRight } from 'lucide-react';

interface Props {
  daysData: Record<number, Task[]>;
  todayDay: number;
  doneRecord: Record<string, boolean>;
  weekStartKey: string;
  isBengali: boolean;
  format12h: boolean;
  onSelectDay: (day: number) => void;
  onAddTaskToDay: (day: number) => void;
  onEditTask: (task: Task, day: number) => void;
}

export const WeekMatrixView: React.FC<Props> = ({
  daysData,
  todayDay,
  doneRecord,
  weekStartKey,
  isBengali,
  format12h,
  onSelectDay,
  onAddTaskToDay,
  onEditTask,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  return (
    <div className="border bg-white dark:bg-[#13161c] border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 shadow-2xs overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            {t.viewWeekMatrix}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isBengali ? 'সপ্তাহের ৭ দিনের সম্পূর্ণ রুটিন এক নজরে' : 'Full 7-day routine overview'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 min-w-[760px] md:min-w-0">
        {ORDER_DAYS.map((dayIndex) => {
          const tasks = daysData[dayIndex] || [];
          const isToday = todayDay === dayIndex;

          return (
            <div
              key={dayIndex}
              className={`flex flex-col border p-3 min-h-[340px] transition-all ${
                isToday
                  ? 'border-blue-500/50 bg-blue-50/20 dark:bg-blue-950/20 shadow-xs'
                  : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30'
              }`}
            >
              {/* Day column header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 dark:border-slate-800/80 mb-2.5">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {t.daysOfWeekShort[dayIndex]}
                    </span>
                    {isToday && (
                      <span className="w-2 h-2 bg-blue-600" title={t.today} />
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
                    {isBengali ? toBengaliDigits(tasks.length) : tasks.length} {t.category.toLowerCase()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddTaskToDay(dayIndex)}
                  title={t.addTask}
                  className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Tasks list in day column with Square Edges */}
              <div className="flex-1 space-y-2 overflow-y-auto max-h-[380px] scrollbar-none">
                {tasks.length > 0 ? (
                  tasks.map((task) => {
                    const isDone = Boolean(doneRecord[`${weekStartKey}:${dayIndex}:${task.id}`]);
                    const meta = (task && task.cat && CATEGORIES[task.cat]) || CATEGORIES.other;

                    return (
                      <div
                        key={task.id}
                        onClick={() => onEditTask(task, dayIndex)}
                        className={`p-2.5 border text-left cursor-pointer transition-all hover:border-blue-400 dark:hover:border-blue-600 ${
                          isDone
                            ? 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/80 opacity-60'
                            : 'bg-white dark:bg-slate-800/90 border-slate-200/90 dark:border-slate-700/80 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 font-semibold tabular-nums mb-1">
                          <span
                            className="w-1.5 h-1.5 shrink-0"
                            style={{ backgroundColor: meta.color }}
                          />
                          <span>{formatTime(task.start, isBengali, format12h)}</span>
                        </div>
                        <div
                          className={`text-xs font-semibold leading-tight truncate ${
                            isDone
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {task.title}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-28 flex flex-col items-center justify-center text-center p-2">
                    <span className="text-xs text-slate-400 font-medium">
                      {isBengali ? 'কোনো কাজ নেই' : 'No tasks'}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer jump to day */}
              <button
                type="button"
                onClick={() => onSelectDay(dayIndex)}
                className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 w-full text-center text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{isBengali ? 'এই দিনে যান' : 'Open Day'}</span>
                <ChevronRight size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
