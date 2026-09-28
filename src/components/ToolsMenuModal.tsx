import React, { useState } from 'react';
import {
  X,
  Sliders,
  Moon,
  Sun,
  Globe,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  Download,
  Upload,
  Printer,
  Copy,
  Smartphone,
} from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  isOpen: boolean;
  isDark: boolean;
  isBengali: boolean;
  notificationsEnabled: boolean;
  soundEnabled: boolean;
  format12h: boolean;
  currentTimeString: string;
  currentDateString: string;
  greetingText: string;
  onClose: () => void;
  onToggleDark: () => void;
  onToggleLang: () => void;
  onToggleSound: () => void;
  onToggleNotification: () => void;
  onToggleTimeFormat: () => void;
  onOpenPresets: () => void;
  onOpenCopyModal?: () => void;
  onExport: () => void;
  onTriggerImport: () => void;
  onPrint: () => void;
}

export const ToolsMenuModal: React.FC<Props> = ({
  isOpen,
  isDark,
  isBengali,
  notificationsEnabled,
  soundEnabled,
  format12h,
  currentTimeString,
  currentDateString,
  greetingText,
  onClose,
  onToggleDark,
  onToggleLang,
  onToggleSound,
  onToggleNotification,
  onToggleTimeFormat,
  onOpenPresets,
  onOpenCopyModal,
  onExport,
  onTriggerImport,
  onPrint,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0 duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full sm:max-w-md bg-white dark:bg-[#13161c] border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Mobile Drag Bar with Square Edges */}
        <div className="w-12 h-1 bg-slate-300 dark:bg-slate-700 mx-auto my-3 sm:hidden" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {isBengali ? 'মেনু ও সেটিংস' : 'Menu & Tools'}
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {greetingText} · {currentTimeString}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body with Square Edges */}
        <div className="p-5 sm:p-6 space-y-4.5 overflow-y-auto flex-1 text-xs">
          {/* Section 1: PWA Install Card if installable */}
          {!isInstalled && (
            <div className="p-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xs flex items-center justify-between gap-3 border border-blue-500">
              <div className="flex items-center gap-2.5 min-w-0">
                <Smartphone size={22} className="shrink-0 text-blue-200" />
                <div className="min-w-0">
                  <div className="font-bold text-sm truncate">
                    {isBengali ? 'হোম স্ক্রিনে ইনস্টল করুন' : 'Install as Native App'}
                  </div>
                  <div className="text-[11px] text-blue-100 truncate">
                    {isBengali ? 'সহজে দ্রুত রুটিন দেখতে সরাসরি ইনস্টল করুন' : 'Fast, offline access on any device'}
                  </div>
                </div>
              </div>

              {isIOS ? (
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(true)}
                  className="px-3.5 py-1.5 bg-white text-blue-700 font-bold text-xs shrink-0 shadow-xs hover:bg-blue-50 active:scale-95 transition-all cursor-pointer"
                >
                  {isBengali ? 'গাইড' : 'Guide'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    await install();
                    onClose();
                  }}
                  className="px-3.5 py-1.5 bg-white text-blue-700 font-bold text-xs shrink-0 shadow-xs hover:bg-blue-50 active:scale-95 transition-all cursor-pointer"
                >
                  {isBengali ? 'ইনস্টল' : 'Install'}
                </button>
              )}
            </div>
          )}

          {/* Section 2: Preferences & Toggles */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {isBengali ? 'পছন্দসমূহ ও প্রদর্শন' : 'Display & Preferences'}
            </span>

            <div className="border border-slate-200/90 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 overflow-hidden">
              {/* Language Switch */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  <Globe size={16} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {isBengali ? 'ভাষা নির্বাচন' : 'Language'}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {isBengali ? 'বাংলা অথবা English' : 'Bengali or English'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleLang}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-xs text-blue-600 dark:text-blue-400 hover:border-blue-500 transition-colors shadow-2xs cursor-pointer"
                >
                  {isBengali ? 'English' : 'বাংলা'}
                </button>
              </div>

              {/* Dark Mode Switch */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  {isDark ? (
                    <Sun size={16} className="text-amber-500" />
                  ) : (
                    <Moon size={16} className="text-indigo-600" />
                  )}
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {isBengali ? 'থিম মোড' : 'Theme Mode'}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {isDark ? t.darkMode : t.lightMode}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleDark}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors shadow-2xs cursor-pointer"
                >
                  {isDark ? t.lightMode : t.darkMode}
                </button>
              </div>

              {/* Time Format Switch */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  <Clock size={16} className="text-teal-600" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {t.timeFormatToggle}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {format12h ? '12-Hour (AM/PM)' : '24-Hour (00:00 - 23:59)'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleTimeFormat}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-xs text-slate-700 dark:text-slate-200 hover:border-blue-500 transition-colors shadow-2xs cursor-pointer"
                >
                  {format12h ? '12h' : '24h'}
                </button>
              </div>

              {/* Sound Chime Toggle */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  {soundEnabled ? (
                    <Volume2 size={16} className="text-emerald-600" />
                  ) : (
                    <VolumeX size={16} className="text-slate-400" />
                  )}
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {t.soundAlert}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {soundEnabled ? (isBengali ? 'সাউন্ড চালু আছে' : 'Sound enabled') : (isBengali ? 'মিউট করা' : 'Muted')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleSound}
                  className={`px-3 py-1.5 border text-xs font-bold transition-colors shadow-2xs cursor-pointer ${
                    soundEnabled
                      ? 'border-emerald-500/50 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {soundEnabled ? (isBengali ? 'চালু' : 'On') : (isBengali ? 'বন্ধ' : 'Off')}
                </button>
              </div>

              {/* Notifications Alert Toggle */}
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2.5">
                  {notificationsEnabled ? (
                    <Bell size={16} className="text-blue-600" />
                  ) : (
                    <BellOff size={16} className="text-slate-400" />
                  )}
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {t.enableAlerts}
                    </span>
                    <p className="text-[10px] text-slate-500">
                      {notificationsEnabled ? t.alertsActive : (isBengali ? 'নোটিফিকেশন বন্ধ' : 'Disabled')}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleNotification}
                  className={`px-3 py-1.5 border text-xs font-bold transition-colors shadow-2xs cursor-pointer ${
                    notificationsEnabled
                      ? 'border-blue-500/50 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500'
                  }`}
                >
                  {notificationsEnabled ? (isBengali ? 'চালু' : 'On') : (isBengali ? 'বন্ধ' : 'Off')}
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Routine Tools & Presets */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {isBengali ? 'রুটিন ম্যানেজমেন্ট' : 'Routine Management'}
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onOpenPresets();
                  onClose();
                }}
                className="flex items-center gap-2 p-3 border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 text-left transition-colors shadow-2xs cursor-pointer"
              >
                <div className="w-8 h-8 bg-amber-500/15 text-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    {t.presets}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {isBengali ? '৪টি তৈরি রুটিন' : 'Starter templates'}
                  </div>
                </div>
              </button>

              {onOpenCopyModal && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenCopyModal();
                    onClose();
                  }}
                  className="flex items-center gap-2 p-3 border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 text-left transition-colors shadow-2xs cursor-pointer"
                >
                  <div className="w-8 h-8 bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Copy size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                      {t.copyRoutine}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {isBengali ? 'অন্য দিনে কপি' : 'Copy to other days'}
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Section 4: Data & Backup */}
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              {isBengali ? 'ব্যাকআপ ও ফাইল' : 'Data & Export'}
            </span>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onExport();
                  onClose();
                }}
                className="flex flex-col items-center justify-center p-3 border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 transition-colors shadow-2xs text-center cursor-pointer"
              >
                <Download size={16} className="text-blue-600 mb-1" />
                <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                  {t.exportJson}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onTriggerImport();
                  onClose();
                }}
                className="flex flex-col items-center justify-center p-3 border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 transition-colors shadow-2xs text-center cursor-pointer"
              >
                <Upload size={16} className="text-indigo-600 mb-1" />
                <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                  {t.importJson}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onPrint();
                  onClose();
                }}
                className="flex flex-col items-center justify-center p-3 border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 transition-colors shadow-2xs text-center cursor-pointer"
              >
                <Printer size={16} className="text-teal-600 mb-1" />
                <span className="font-bold text-slate-800 dark:text-slate-200 text-[11px]">
                  {t.print}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Square Edges */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span className="tabular-nums font-semibold">{currentDateString}</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
          >
            {t.cancel}
          </button>
        </div>
      </div>

      {/* iOS Safari Guide Modal with Square Edges */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
          onClick={() => setShowIOSGuide(false)}
        >
          <div className="w-full max-w-sm bg-white dark:bg-[#13161c] p-6 shadow-2xl border border-slate-200/90 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              {isBengali ? 'iPhone / iPad এ ইনস্টল' : 'Install on iOS Safari'}
            </h3>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <p>১. Safari ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> আইকনে চাপ দিন।</p>
              <p>২. মেনু স্ক্রল করে <strong>Add to Home Screen</strong> নির্বাচন করুন।</p>
              <p>৩. উপরে <strong>Add</strong> চাপলেই আপনার ফোনে ইনস্টল হয়ে যাবে!</p>
            </div>
            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-4 w-full bg-blue-600 py-2.5 text-xs font-bold text-white cursor-pointer"
            >
              {isBengali ? 'বুঝেছি' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
