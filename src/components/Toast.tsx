import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  message: string | null;
  type?: 'success' | 'error';
}

export const Toast: React.FC<Props> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-in fade-in-0 slide-in-from-bottom-2 duration-150">
      <div className="flex items-center gap-2.5 px-4.5 py-2.5 shadow-xl border backdrop-blur-md bg-slate-900/95 text-slate-100 border-slate-700 text-xs sm:text-sm font-semibold tracking-tight">
        {type === 'success' ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};
