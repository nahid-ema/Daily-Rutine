import React, { useState, useEffect } from 'react';
import { X, Clock, AlertCircle } from 'lucide-react';
import { Task, CategoryKey, PriorityKey, CATEGORIES } from '../types';
import { parseMinutes, minutesToTimeStr } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';
import { CategoryIcon } from './CategoryIcon';

interface Props {
  isOpen: boolean;
  editingTask: Task | null;
  isBengali: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id'>, taskId?: string) => void;
}

export const TaskModal: React.FC<Props> = ({
  isOpen,
  editingTask,
  isBengali,
  onClose,
  onSave,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  const [title, setTitle] = useState('');
  const [start, setStart] = useState('08:00');
  const [end, setEnd] = useState('09:00');
  const [cat, setCat] = useState<CategoryKey>('work');
  const [prio, setPrio] = useState<PriorityKey>('medium');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStart(editingTask.start);
      setEnd(editingTask.end);
      setCat(editingTask.cat);
      setPrio(editingTask.prio);
      setNotes(editingTask.notes || '');
    } else {
      // Default new task
      setTitle('');
      setStart('08:00');
      setEnd('09:00');
      setCat('work');
      setPrio('medium');
      setNotes('');
    }
    setError(null);
  }, [editingTask, isOpen]);

  if (!isOpen) return null;

  const handleAddDuration = (addedMinutes: number) => {
    const startMins = parseMinutes(start);
    const newEndMins = startMins + addedMinutes;
    setEnd(minutesToTimeStr(newEndMins));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError(t.errTitleRequired);
      return;
    }
    if (start === end) {
      setError(t.errSameTime);
      return;
    }

    onSave(
      {
        title: cleanTitle,
        start,
        end,
        cat,
        prio,
        notes: notes.trim(),
      },
      editingTask?.id
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:max-w-lg bg-white dark:bg-[#13161c] border border-slate-200/90 dark:border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Mobile drag handle */}
        <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto my-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {editingTask ? t.editTask : t.addTask}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4.5 overflow-y-auto flex-1">
          {/* Title input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.title} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              autoFocus
              maxLength={80}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder={t.titlePlaceholder}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            />
          </div>

          {/* Time range */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.start}
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.end}
              </label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 text-sm font-semibold tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Quick duration presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">
              {t.quickDurationAdd}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[15, 30, 45, 60, 90, 120].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => handleAddDuration(mins)}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/60 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition-colors"
                >
                  +{mins >= 60 ? `${mins / 60}h` : `${mins}m`}
                </button>
              ))}
            </div>
          </div>

          {/* Category selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.category}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(CATEGORIES) as CategoryKey[]).map((cKey) => {
                const isSelected = cat === cKey;
                const meta = CATEGORIES[cKey];
                return (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => setCat(cKey)}
                    className={`flex items-center gap-2 p-2.5 rounded-2xl border text-xs font-semibold text-left transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: meta.color + '20',
                        color: meta.color,
                      }}
                    >
                      <CategoryIcon cat={cKey} size={14} />
                    </span>
                    <span className="truncate">{t.categories[cKey]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Priority selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.priority}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'medium', 'high'] as PriorityKey[]).map((pKey) => {
                const isSelected = prio === pKey;
                const dotColor =
                  pKey === 'high'
                    ? 'bg-rose-500'
                    : pKey === 'medium'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500';
                return (
                  <button
                    key={pKey}
                    type="button"
                    onClick={() => setPrio(pKey)}
                    className={`flex items-center justify-center gap-2 py-2 rounded-2xl border text-xs font-bold transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 ring-2 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span>{t[pKey]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.notes}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.notesPlaceholder}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none font-medium"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-3 rounded-2xl border border-rose-200 dark:border-rose-900/50 font-semibold">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 transition-all"
            >
              {editingTask ? t.save : t.addTask}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
