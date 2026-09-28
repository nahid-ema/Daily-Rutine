import React, { useState } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  isBengali: boolean;
  compact?: boolean;
}

export const PWAInstallButton: React.FC<Props> = ({ isBengali, compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already installed in standalone mode, hide
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      await install();
    } finally {
      setIsInstalling(false);
    }
  };

  // Chromium / Android / Desktop flow with beforeinstallprompt
  if (isInstallable) {
    return (
      <button
        type="button"
        onClick={handleInstallClick}
        disabled={isInstalling}
        title={isBengali ? 'হোম স্ক্রিনে অ্যাপ ইনস্টল করুন' : 'Install app to Home Screen'}
        className={`flex items-center gap-1.5 font-bold text-xs transition-all shadow-2xs active:scale-98 cursor-pointer ${
          compact
            ? 'px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white'
            : 'px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        <Download size={14} className="shrink-0" />
        <span>{isBengali ? 'ইনস্টল' : 'Install'}</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          title={isBengali ? 'আইফোনে ইনস্টল করুন' : 'Install on iPhone / iPad'}
          className={`flex items-center gap-1.5 font-bold text-xs transition-all border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 cursor-pointer ${
            compact ? 'px-2.5 py-1.5' : 'px-3.5 py-1.5'
          }`}
        >
          <Smartphone size={14} className="shrink-0" />
          <span>{isBengali ? 'ইনস্টল' : 'Install'}</span>
        </button>

        {showIOSGuide && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowIOSGuide(false);
            }}
          >
            <div className="w-full max-w-sm bg-white dark:bg-[#13161c] p-6 shadow-2xl border border-slate-200/90 dark:border-slate-800 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Smartphone size={18} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {isBengali ? 'iPhone / iPad এ ইনস্টল' : 'Install on iOS Safari'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="py-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold">
                    ১
                  </div>
                  <div>
                    {isBengali ? (
                      <>Safari ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> আইকনে চাপ দিন।</>
                    ) : (
                      <>Tap the <strong>Share</strong> button in Safari bottom bar.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold">
                    ২
                  </div>
                  <div>
                    {isBengali ? (
                      <>মেনু স্ক্রল করে <strong>Add to Home Screen (হোম স্ক্রিনে যোগ করুন)</strong> নির্বাচন করুন।</>
                    ) : (
                      <>Scroll down and tap <strong>Add to Home Screen</strong>.</>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold">
                    ৩
                  </div>
                  <div>
                    {isBengali ? (
                      <>উপরে <strong>Add</strong> চাপুন। অ্যাপটি সরাসরি আপনার ফোনে ইনস্টল হয়ে যাবে!</>
                    ) : (
                      <>Tap <strong>Add</strong> in top right. You can now launch it like a native app!</>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition shadow-xs cursor-pointer"
              >
                {isBengali ? 'বুঝেছি' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers before prompt fires
  return (
    <button
      type="button"
      onClick={handleInstallClick}
      title={isBengali ? 'হোম স্ক্রিনে অ্যাপ ইনস্টল করুন' : 'Install to Home Screen'}
      className="flex items-center gap-1.5 px-3 py-1.5 font-bold text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/80 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-all shadow-2xs cursor-pointer"
    >
      <Download size={14} className="shrink-0" />
      <span>{isBengali ? 'ইনস্টল' : 'Install'}</span>
    </button>
  );
};
