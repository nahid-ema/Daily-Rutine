import React, { useState } from 'react';
import { X, Sparkles, GraduationCap, Briefcase, Moon, Coffee } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';
import {
  PRESET_DEFAULT_TASKS,
  PRESET_STUDENT_TASKS,
  PRESET_FREELANCER_TASKS,
  PRESET_RAMADAN_TASKS,
} from '../utils/presets';
import { Task } from '../types';

interface Props {
  isOpen: boolean;
  selectedDay: number;
  isBengali: boolean;
  onClose: () => void;
  onApplyPreset: (tasks: Omit<Task, 'id'>[], target: 'current' | 'all') => void;
}

export const PresetsModal: React.FC<Props> = ({
  isOpen,
  selectedDay,
  isBengali,
  onClose,
  onApplyPreset,
}) => {
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const [selectedPresetKey, setSelectedPresetKey] = useState<'default' | 'student' | 'freelancer' | 'ramadan'>('default');
  const [targetScope, setTargetScope] = useState<'current' | 'all'>('current');

  if (!isOpen) return null;

  const presets = [
    {
      key: 'default' as const,
      icon: Coffee,
      title: t.presetDefault,
      desc: t.presetDefaultDesc,
      tasks: PRESET_DEFAULT_TASKS,
    },
    {
      key: 'student' as const,
      icon: GraduationCap,
      title: t.presetStudent,
      desc: t.presetStudentDesc,
      tasks: PRESET_STUDENT_TASKS,
    },
    {
      key: 'freelancer' as const,
      icon: Briefcase,
      title: t.presetFreelancer,
      desc: t.presetFreelancerDesc,
      tasks: PRESET_FREELANCER_TASKS,
    },
    {
      key: 'ramadan' as const,
      icon: Moon,
      title: t.presetRamadan,
      desc: t.presetRamadanDesc,
      tasks: PRESET_RAMADAN_TASKS,
    },
  ];

  const currentPreset = presets.find((p) => p.key === selectedPresetKey) || presets[0];

  const handleApply = () => {
    onApplyPreset(currentPreset.tasks, targetScope);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-white dark:bg-[#13161c] border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t.presets}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Presets List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isBengali
              ? 'আপনার প্রয়োজন অনুযায়ী যেকোনো তৈরি রুটিন বেছে নিন:'
              : 'Choose a tailored starter schedule to boost productivity:'}
          </p>

          <div className="space-y-2.5">
            {presets.map((preset) => {
              const isSelected = selectedPresetKey === preset.key;
              const Icon = preset.icon;

              return (
                <div
                  key={preset.key}
                  onClick={() => setSelectedPresetKey(preset.key)}
                  className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                      : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {preset.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                      {preset.desc}
                    </p>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-1 inline-block">
                      {preset.tasks.length} {isBengali ? 'টি কাজ অন্তর্ভুক্ত' : 'tasks included'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Target Scope Selection */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              {isBengali ? 'কোথায় প্রয়োগ করবেন?' : 'Where to apply?'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTargetScope('current')}
                className={`py-2 px-3 rounded-full border text-xs font-bold transition-all ${
                  targetScope === 'current'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {isBengali ? `শুধু ${t.daysOfWeekShort[selectedDay]}` : `Only ${t.daysOfWeekShort[selectedDay]}`}
              </button>
              <button
                type="button"
                onClick={() => setTargetScope('all')}
                className={`py-2 px-3 rounded-full border text-xs font-bold transition-all ${
                  targetScope === 'all'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.copyToAll}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
          >
            {t.cancel}
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/25"
          >
            {t.applyPreset}
          </button>
        </div>
      </div>
    </div>
  );
};
