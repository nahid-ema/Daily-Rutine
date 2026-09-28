import React from 'react';
import { Check, Edit2, Trash2, Copy, AlertTriangle, Clock } from 'lucide-react';
import { Task, CATEGORIES } from '../types';
import { formatTime, formatDuration, getTaskDurationMinutes } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';
import { CategoryIcon } from './CategoryIcon';

interface Props {
  task: Task;
  index: number;
  isDone: boolean;
  isCurrent: boolean;
  isOverlapping: boolean;
  isBengali: boolean;
  format12h: boolean;
  onToggleDone: (taskId: string) => void;
  onEdit: (task: Task) => void;
  onDuplicate: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskCard: React.FC<Props> = ({
  task,
  isDone,
  isCurrent,
  isOverlapping,
  isBengali,
  format12h,
  onToggleDone,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const catMeta = CATEGORIES[task.cat] || CATEGORIES.other;
  const durationMins = getTaskDurationMinutes(task);

  const priorityColor =
    task.prio === 'high'
      ? 'bg-rose-500'
      : task.prio === 'medium'
      ? 'bg-amber-500'
      : 'bg-emerald-500';

  const priorityLabel =
    task.prio === 'high' ? t.high : task.prio === 'medium' ? t.medium : t.low;

  return (
    <div
      className={`group relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 ${
        isCurrent
          ? 'bg-blue-50/60 dark:bg-blue-950/20 border-blue-500 shadow-sm ring-1 ring-blue-500/30'
          : isDone
          ? 'bg-slate-50/70 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-75'
          : 'bg-white dark:bg-[#13161c] border-slate-200/90 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
      }`}
    >
      {/* Category colored left accent line */}
      <div
        className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full transition-all"
        style={{ backgroundColor: catMeta.color }}
      />

      {/* Main task content */}
      <div className="flex items-start gap-3.5 pl-3 sm:pl-3.5 flex-1 min-w-0">
        {/* Rounded Checkbox */}
        <button
          type="button"
          onClick={() => onToggleDone(task.id)}
          aria-label={isDone ? t.completed : t.pending}
          className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 mt-0.5 rounded-full border flex items-center justify-center transition-all ${
            isDone
              ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs scale-95'
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 bg-slate-50 dark:bg-slate-800/80 text-transparent hover:text-slate-400'
          }`}
        >
          <Check size={18} strokeWidth={3} className={isDone ? 'opacity-100' : 'opacity-0'} />
        </button>

        {/* Task Details */}
        <div className="flex-1 min-w-0 pr-2">
          {/* Header row: time badge & tags */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs mb-1">
            {/* Time display in Google Sans */}
            <div className="inline-flex items-center gap-1 font-semibold tabular-nums text-slate-800 dark:text-slate-200">
              <Clock size={12} className="text-slate-400" />
              <span>{formatTime(task.start, isBengali, format12h)}</span>
              <span className="text-slate-400">—</span>
              <span>{formatTime(task.end, isBengali, format12h)}</span>
            </div>

            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>

            {/* Duration */}
            <span className="text-slate-500 dark:text-slate-400 tabular-nums font-medium">
              {formatDuration(durationMins, isBengali)}
            </span>

            {/* Overlap warning */}
            {isOverlapping && (
              <>
                <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                  <AlertTriangle size={12} />
                  <span>{t.overlapWarning}</span>
                </span>
              </>
            )}

            {isCurrent && (
              <>
                <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  {t.now}
                </span>
              </>
            )}
          </div>

          {/* Task Title */}
          <h3
            className={`text-base sm:text-lg font-bold tracking-tight leading-snug break-words transition-all ${
              isDone
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {task.title}
          </h3>

          {/* Notes if provided */}
          {task.notes && (
            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 font-normal">
              {task.notes}
            </p>
          )}

          {/* Category & Priority unboxed text metadata */}
          <div className="flex items-center gap-2.5 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <span
              className="inline-flex items-center gap-1 font-semibold"
              style={{ color: catMeta.color }}
            >
              <CategoryIcon cat={task.cat} size={13} />
              <span>{t.categories[task.cat]}</span>
            </span>

            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>

            <span className="inline-flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${priorityColor}`} />
              <span className="font-medium">{priorityLabel}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons (optimized for touch targets >= 44px) */}
      <div className="flex items-center justify-end gap-1 mt-3 sm:mt-0 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800 shrink-0">
        <button
          type="button"
          onClick={() => onDuplicate(task)}
          title={t.duplicate}
          aria-label={t.duplicate}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Copy size={16} />
        </button>

        <button
          type="button"
          onClick={() => onEdit(task)}
          title={t.editTask}
          aria-label={t.editTask}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Edit2 size={16} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          title={t.delete}
          aria-label={t.delete}
          className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};
