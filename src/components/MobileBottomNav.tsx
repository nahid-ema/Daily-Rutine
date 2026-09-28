import React from 'react';
import { Calendar, Plus, BarChart3, LayoutGrid, ListTodo } from 'lucide-react';
import { ViewMode } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  viewMode: ViewMode;
  isTodaySelected: boolean;
  isBengali: boolean;
  onChangeViewMode: (mode: ViewMode) => void;
  onGoToToday: () => void;
  onOpenAddTask: () => void;
}

export const MobileBottomNav: React.FC<Props> = ({
  viewMode,
  isTodaySelected,
  isBengali,
  onChangeViewMode,
  onGoToToday,
  onOpenAddTask,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 px-4 py-2 pb-safe no-print">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Today Tab */}
        <button
          type="button"
          onClick={() => {
            onGoToToday();
            onChangeViewMode('timeline');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors ${
            isTodaySelected && viewMode === 'timeline'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div
            className={`px-3 py-1 rounded-full transition-all ${
              isTodaySelected && viewMode === 'timeline'
                ? 'bg-blue-50 dark:bg-blue-950/60'
                : ''
            }`}
          >
            <Calendar size={18} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{t.today}</span>
        </button>

        {/* 24h Schedule Tab */}
        <button
          type="button"
          onClick={() => onChangeViewMode('schedule24h')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors ${
            viewMode === 'schedule24h'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div
            className={`px-3 py-1 rounded-full transition-all ${
              viewMode === 'schedule24h' ? 'bg-blue-50 dark:bg-blue-950/60' : ''
            }`}
          >
            <BarChart3 size={18} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{isBengali ? '২৪ ঘণ্টা' : '24h'}</span>
        </button>

        {/* Floating Center Add Button in Material 3 style */}
        <div className="flex-1 flex justify-center -mt-6">
          <button
            type="button"
            onClick={onOpenAddTask}
            aria-label={t.addTask}
            className="w-13 h-13 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 active:scale-95 transition-transform"
          >
            <Plus size={26} strokeWidth={2.5} />
          </button>
        </div>

        {/* Timeline Tab */}
        <button
          type="button"
          onClick={() => onChangeViewMode('timeline')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors ${
            viewMode === 'timeline' && !isTodaySelected
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div
            className={`px-3 py-1 rounded-full transition-all ${
              viewMode === 'timeline' && !isTodaySelected
                ? 'bg-blue-50 dark:bg-blue-950/60'
                : ''
            }`}
          >
            <ListTodo size={18} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{isBengali ? 'তালিকা' : 'Tasks'}</span>
        </button>

        {/* Week Matrix Tab */}
        <button
          type="button"
          onClick={() => onChangeViewMode('weekmatrix')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-center transition-colors ${
            viewMode === 'weekmatrix'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <div
            className={`px-3 py-1 rounded-full transition-all ${
              viewMode === 'weekmatrix' ? 'bg-blue-50 dark:bg-blue-950/60' : ''
            }`}
          >
            <LayoutGrid size={18} />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">{isBengali ? 'সপ্তাহ' : 'Week'}</span>
        </button>
      </div>
    </div>
  );
};
