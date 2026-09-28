import React from 'react';
import { Plus, BarChart3, LayoutGrid, ListTodo, Sliders } from 'lucide-react';
import { ViewMode } from '../types';
import { TRANSLATIONS } from '../utils/translations';

interface Props {
  viewMode: ViewMode;
  isBengali: boolean;
  onChangeViewMode: (mode: ViewMode) => void;
  onOpenAddTask: () => void;
  onOpenToolsMenu: () => void;
}

export const MobileBottomNav: React.FC<Props> = ({
  viewMode,
  isBengali,
  onChangeViewMode,
  onOpenAddTask,
  onOpenToolsMenu,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];

  const handleTabClick = (mode: ViewMode) => {
    onChangeViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-auto bg-white/95 dark:bg-[#13161c]/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 px-3 py-1 shadow-lg shadow-black/10 no-print"
    >
      <div className="flex items-center justify-between max-w-md mx-auto relative">
        {/* Tab 1: Timeline List */}
        <button
          type="button"
          onClick={() => handleTabClick('timeline')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[50px] py-1 text-center transition-all duration-150 cursor-pointer ${
            viewMode === 'timeline'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div
            className={`px-3 py-1 transition-all ${
              viewMode === 'timeline'
                ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400'
                : ''
            }`}
          >
            <ListTodo size={20} />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-semibold">
            {isBengali ? 'রুটিন' : 'Routine'}
          </span>
        </button>

        {/* Tab 2: 24h Schedule */}
        <button
          type="button"
          onClick={() => handleTabClick('schedule24h')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[50px] py-1 text-center transition-all duration-150 cursor-pointer ${
            viewMode === 'schedule24h'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div
            className={`px-3 py-1 transition-all ${
              viewMode === 'schedule24h'
                ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400'
                : ''
            }`}
          >
            <BarChart3 size={20} />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-semibold">
            {isBengali ? '২৪ ঘণ্টা' : '24 Hours'}
          </span>
        </button>

        {/* Center Floating Square Add Button */}
        <div className="flex-1 flex justify-center -mt-6 shrink-0">
          <button
            type="button"
            onClick={onOpenAddTask}
            aria-label={t.addTask}
            title={t.addTask}
            className="w-13 h-13 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-lg shadow-blue-600/35 border-2 border-white dark:border-[#13161c] transition-all cursor-pointer"
          >
            <Plus size={26} strokeWidth={2.6} />
          </button>
        </div>

        {/* Tab 3: Full Week Matrix */}
        <button
          type="button"
          onClick={() => handleTabClick('weekmatrix')}
          className={`flex flex-col items-center justify-center flex-1 min-h-[50px] py-1 text-center transition-all duration-150 cursor-pointer ${
            viewMode === 'weekmatrix'
              ? 'text-blue-600 dark:text-blue-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <div
            className={`px-3 py-1 transition-all ${
              viewMode === 'weekmatrix'
                ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400'
                : ''
            }`}
          >
            <LayoutGrid size={20} />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-semibold">
            {isBengali ? 'সপ্তাহ' : 'Week'}
          </span>
        </button>

        {/* Tab 4: Settings & Tools Menu */}
        <button
          type="button"
          onClick={onOpenToolsMenu}
          className="flex flex-col items-center justify-center flex-1 min-h-[50px] py-1 text-center transition-all duration-150 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
        >
          <div className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Sliders size={20} />
          </div>
          <span className="text-[11px] mt-0.5 tracking-tight font-semibold">
            {isBengali ? 'মেনু' : 'Menu'}
          </span>
        </button>
      </div>
    </nav>
  );
};
