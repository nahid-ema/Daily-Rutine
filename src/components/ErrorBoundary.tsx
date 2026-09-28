import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { resetLocalStorage } from '../utils/storage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React error:', error, errorInfo);
  }

  private handleReset = () => {
    resetLocalStorage();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#f8fafd] dark:bg-[#0c0e12] flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#13161c] border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-center shadow-xl space-y-4">
            <div className="w-14 h-14 bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                রুটিন লোড করতে সমস্যা হয়েছে
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                পুরোনো বা অসঙ্গতিপূর্ণ ডেটার কারণে পৃষ্ঠা লোড হতে পারেনি। নিচের বাটনে চাপ দিয়ে রুটিন রিসেট করুন।
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <RotateCcw size={15} />
                <span>রুটিন রিসেট ও রিলোড করুন</span>
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-2 px-4 border border-slate-200 dark:border-slate-700 font-semibold text-slate-600 dark:text-slate-300 text-xs hover:bg-slate-50 cursor-pointer"
              >
                শুধুমাত্র রিলোড করুন
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
