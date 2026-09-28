import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { ORDER_DAYS } from '../utils/time';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  isOpen: boolean;
  sourceDay: number;
  isBengali: boolean;
  onClose: () => void;
  onConfirmCopy: (targetDays: number[]) => void;
}

export const CopyDayModal: React.FC<Props> = ({
  isOpen,
  sourceDay,
  isBengali,
  onClose,
  onConfirmCopy,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const [selectedTargetDays, setSelectedTargetDays] = useState<number[]>([]);

  if (!isOpen) return null;

  const toggleDay = (dayIndex: number) => {
    if (selectedTargetDays.includes(dayIndex)) {
      setSelectedTargetDays(selectedTargetDays.filter((d) => d !== dayIndex));
    } else {
      setSelectedTargetDays([...selectedTargetDays, dayIndex]);
    }
  };

  const selectAll = () => {
    const allOtherDays = ORDER_DAYS.filter((d) => d !== sourceDay);
    setSelectedTargetDays(allOtherDays);
  };

  const selectNone = () => {
    setSelectedTargetDays([]);
  };

  const handleCopy = () => {
    if (selectedTargetDays.length === 0) return;
    onConfirmCopy(selectedTargetDays);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white dark:bg-[#13161c] border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Copy size={18} />
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              {t.copyRoutine}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content with Square Edges */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isBengali
              ? `"${t.daysOfWeek[sourceDay]}"-এর রুটিন কোন কোন দিনে কপি করতে চান?`
              : `Select which days should receive the routine from "${t.daysOfWeek[sourceDay]}":`}
          </p>

          {/* Quick Select Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={selectAll}
              className="text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
            >
              {isBengali ? 'সব দিন নির্বাচন' : 'Select all'}
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              onClick={selectNone}
              className="text-slate-500 hover:underline font-medium cursor-pointer"
            >
              {isBengali ? 'মুছে ফেলুন' : 'Deselect all'}
            </button>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-2 gap-2">
            {ORDER_DAYS.map((dayIndex) => {
              if (dayIndex === sourceDay) return null;
              const isChecked = selectedTargetDays.includes(dayIndex);

              return (
                <button
                  key={dayIndex}
                  type="button"
                  onClick={() => toggleDay(dayIndex)}
                  className={`flex items-center justify-between p-3 border text-xs font-semibold transition-all cursor-pointer ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200 font-bold'
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{t.daysOfWeek[dayIndex]}</span>
                  <div
                    className={`w-5 h-5 border flex items-center justify-center text-[10px] ${
                      isChecked
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {isChecked && <Check size={12} strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {selectedTargetDays.length} {isBengali ? 'দিন নির্বাচিত' : 'days selected'}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="button"
              disabled={selectedTargetDays.length === 0}
              onClick={handleCopy}
              className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            >
              {isBengali ? 'কপি নিশ্চিত করুন' : 'Confirm Copy'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
