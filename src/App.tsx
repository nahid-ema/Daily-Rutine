import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Plus,
  Search,
  Copy,
  Sparkles,
  ListTodo,
} from 'lucide-react';
import { Task, CategoryKey, PriorityKey, ViewMode, RoutineState, CATEGORIES } from './types';
import {
  parseMinutes,
  getWeekStartKey,
  doesTaskOverlap,
  findActiveAndNextTask,
  toBengaliDigits,
} from './utils/time';
import { TRANSLATIONS } from './utils/translations';
import { uid, buildDayTasksFromTemplate } from './utils/presets';
import { getInitialState, saveState, exportRoutineAsJson } from './utils/storage';
import { playNotificationChime, playSuccessChime } from './utils/audio';

import { Header } from './components/Header';
import { DaySelector } from './components/DaySelector';
import { ActiveTaskHero } from './components/ActiveTaskHero';
import { ProgressCard } from './components/ProgressCard';
import { TaskCard } from './components/TaskCard';
import { Schedule24hView } from './components/Schedule24hView';
import { WeekMatrixView } from './components/WeekMatrixView';
import { TaskModal } from './components/TaskModal';
import { PresetsModal } from './components/PresetsModal';
import { CopyDayModal } from './components/CopyDayModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ToolsMenuModal } from './components/ToolsMenuModal';

export default function App() {
  const [state, setState] = useState<RoutineState>(getInitialState);
  const [selectedDay, setSelectedDay] = useState<number>(() => new Date().getDay());
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState<CategoryKey | 'all'>('all');
  const [filterPrio, setFilterPrio] = useState<PriorityKey | 'all'>('all');

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Time ticker state
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isBengali = state.lang === 'bn';
  const t = TRANSLATIONS[isBengali ? 'bn' : 'en'];
  const weekStartKey = useMemo(() => getWeekStartKey(), []);
  const todayDay = currentTime.getDay();
  const isSelectedToday = selectedDay === todayDay;

  // Sync dark class and language to <html> and <body>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.dark);
    document.documentElement.classList.toggle('lang-en', state.lang === 'en');
    document.documentElement.lang = state.lang;
  }, [state.dark, state.lang]);

  // Persist state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Clock ticker and notification alert loop
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      const hm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const day = now.getDay();
      const currentDayTasks = state.days[day] || [];

      currentDayTasks.forEach((task) => {
        const notifKey = `${now.toDateString()}_${task.id}_${task.start}`;
        if (task.start === hm && !state.notified[notifKey]) {
          // Play sound if enabled
          if (state.soundEnabled) {
            playNotificationChime();
          }

          // Trigger native notification if permission granted
          if (
            state.notificationsEnabled &&
            'Notification' in window &&
            Notification.permission === 'granted'
          ) {
            new Notification(task.title, {
              body: `${task.start} – ${task.end} (${task.notes || t.appName})`,
              icon: '/favicon.ico',
            });
          }

          setState((prev) => ({
            ...prev,
            notified: { ...prev.notified, [notifKey]: Date.now() },
          }));
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.days, state.notificationsEnabled, state.soundEnabled, state.notified, t.appName]);

  // Dynamic greetings
  const greetingText = useMemo(() => {
    const h = currentTime.getHours();
    const gIndex = h < 5 ? 0 : h < 12 ? 1 : h < 17 ? 2 : h < 20 ? 3 : 0;
    return t.greetings[gIndex];
  }, [currentTime, t.greetings]);

  // Formatted date and time strings
  const currentDateString = useMemo(() => {
    return currentTime.toLocaleDateString(isBengali ? 'bn-BD' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [currentTime, isBengali]);

  const currentTimeString = useMemo(() => {
    const raw = currentTime.toLocaleTimeString(isBengali ? 'bn-BD' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: state.timeFormat === '12h',
    });
    return isBengali ? toBengaliDigits(raw) : raw;
  }, [currentTime, isBengali, state.timeFormat]);

  // Selected Day tasks
  const selectedDayTasks = useMemo(() => {
    const tasks = state.days[selectedDay] || [];
    return [...tasks].sort((a, b) => parseMinutes(a.start) - parseMinutes(b.start));
  }, [state.days, selectedDay]);

  // Filtered tasks for timeline view
  const filteredTasks = useMemo(() => {
    return selectedDayTasks.filter((task) => {
      if (filterCat !== 'all' && task.cat !== filterCat) return false;
      if (filterPrio !== 'all' && task.prio !== filterPrio) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = task.title.toLowerCase().includes(q);
        const matchesNotes = task.notes ? task.notes.toLowerCase().includes(q) : false;
        return matchesTitle || matchesNotes;
      }
      return true;
    });
  }, [selectedDayTasks, filterCat, filterPrio, searchQuery]);

  // Done tasks set for selected day
  const doneTaskIds = useMemo(() => {
    const set = new Set<string>();
    selectedDayTasks.forEach((task) => {
      const key = `${weekStartKey}:${selectedDay}:${task.id}`;
      if (state.done[key]) {
        set.add(task.id);
      }
    });
    return set;
  }, [selectedDayTasks, selectedDay, state.done, weekStartKey]);

  // Today active & next task info
  const todayActiveInfo = useMemo(() => {
    const todayTasks = (state.days[todayDay] || []).sort(
      (a, b) => parseMinutes(a.start) - parseMinutes(b.start)
    );
    return findActiveAndNextTask(todayTasks);
  }, [state.days, todayDay, currentTime]);

  // Handlers
  const handleToggleDone = (taskId: string) => {
    const key = `${weekStartKey}:${selectedDay}:${taskId}`;
    const willBeDone = !state.done[key];

    if (willBeDone && state.soundEnabled) {
      playSuccessChime();
    }

    setState((prev) => ({
      ...prev,
      done: {
        ...prev.done,
        [key]: willBeDone,
      },
    }));
  };

  const handleOpenAddTask = (targetDay?: number) => {
    if (typeof targetDay === 'number') {
      setSelectedDay(targetDay);
    }
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task, targetDay?: number) => {
    if (typeof targetDay === 'number') {
      setSelectedDay(targetDay);
    }
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDuplicateTask = (task: Task) => {
    const newTask: Task = {
      ...task,
      id: uid(),
      title: `${task.title} (${isBengali ? 'অনুলিপি' : 'Copy'})`,
    };
    setState((prev) => ({
      ...prev,
      days: {
        ...prev.days,
        [selectedDay]: [...(prev.days[selectedDay] || []), newTask],
      },
    }));
    showToast(isBengali ? 'কাজের অনুলিপি তৈরি হয়েছে' : 'Task duplicated');
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm(t.confirmDelete)) {
      setState((prev) => ({
        ...prev,
        days: {
          ...prev.days,
          [selectedDay]: (prev.days[selectedDay] || []).filter((y) => y.id !== taskId),
        },
      }));
      showToast(isBengali ? 'কাজ মুছে ফেলা হয়েছে' : 'Task deleted');
    }
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'>, taskId?: string) => {
    setState((prev) => {
      const currentList = prev.days[selectedDay] || [];
      let updatedList: Task[];

      if (taskId) {
        // Edit existing
        updatedList = currentList.map((y) => (y.id === taskId ? { ...taskData, id: taskId } : y));
      } else {
        // Add new
        updatedList = [...currentList, { ...taskData, id: uid() }];
      }

      return {
        ...prev,
        days: {
          ...prev.days,
          [selectedDay]: updatedList,
        },
      };
    });

    setIsTaskModalOpen(false);
    showToast(taskId ? (isBengali ? 'কাজ আপডেট হয়েছে' : 'Task updated') : (isBengali ? 'কাজ যোগ করা হয়েছে' : 'Task added'));
  };

  const handleApplyPreset = (tasksTemplate: Omit<Task, 'id'>[], target: 'current' | 'all') => {
    setState((prev) => {
      const updatedDays = { ...prev.days };
      if (target === 'current') {
        updatedDays[selectedDay] = buildDayTasksFromTemplate(tasksTemplate);
      } else {
        for (let d = 0; d < 7; d++) {
          updatedDays[d] = buildDayTasksFromTemplate(tasksTemplate);
        }
      }
      return {
        ...prev,
        days: updatedDays,
      };
    });
    showToast(t.presetApplied);
  };

  const handleConfirmCopyDays = (targetDays: number[]) => {
    const sourceTasks = state.days[selectedDay] || [];
    setState((prev) => {
      const updatedDays = { ...prev.days };
      targetDays.forEach((dayIdx) => {
        updatedDays[dayIdx] = sourceTasks.map((task) => ({ ...task, id: uid() }));
      });
      return {
        ...prev,
        days: updatedDays,
      };
    });
    showToast(t.copiedSuccess);
  };

  const handleTriggerImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed || typeof parsed !== 'object' || !parsed.days) {
          throw new Error('Invalid schema');
        }

        setState((prev) => ({
          ...prev,
          days: parsed.days,
          lang: parsed.lang || prev.lang,
          dark: typeof parsed.dark === 'boolean' ? parsed.dark : prev.dark,
        }));
        showToast(t.importedSuccess);
      } catch (err) {
        showToast(t.invalidFile);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleToggleNotifications = async () => {
    if (!('Notification' in window)) {
      showToast(isBengali ? 'আপনার ব্রাউজারে নোটিফিকেশন সাপোর্ট নেই' : 'Notifications not supported in this browser');
      return;
    }

    if (!state.notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setState((prev) => ({ ...prev, notificationsEnabled: true }));
        showToast(isBengali ? 'নোটিফিকেশন সক্রিয় হয়েছে' : 'Alert notifications enabled');
      } else {
        showToast(isBengali ? 'নোটিফিকেশন পারমিশন দেওয়া হয়নি' : 'Notification permission was denied');
      }
    } else {
      setState((prev) => ({ ...prev, notificationsEnabled: false }));
      showToast(isBengali ? 'নোটিফিকেশন বন্ধ করা হয়েছে' : 'Notifications disabled');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafd] dark:bg-[#0c0e12] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors pb-24 md:pb-12">
      {/* Toast Alert */}
      <Toast message={toastMessage} />

      {/* Offline Mode Indicator */}
      <OfflineIndicator isBengali={isBengali} />

      {/* Top Bar Navigation */}
      <Header
        viewMode={viewMode}
        isBengali={isBengali}
        currentTimeString={currentTimeString}
        currentDateString={currentDateString}
        greetingText={greetingText}
        onChangeViewMode={setViewMode}
        onOpenToolsMenu={() => setIsToolsMenuOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Responsive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* LEFT COLUMN: Sidebar Summary & Day Selector (Desktop: 4 cols) */}
          <aside className="lg:col-span-4 space-y-4 no-print">
            {/* Active Task Live Hero Banner */}
            <ActiveTaskHero
              currentTask={todayActiveInfo.currentTask}
              nextTask={todayActiveInfo.nextTask}
              progressPercent={todayActiveInfo.progressPercent}
              remainingMinutes={todayActiveInfo.remainingMinutes}
              isToday={isSelectedToday}
              isDone={
                todayActiveInfo.currentTask
                  ? doneTaskIds.has(todayActiveInfo.currentTask.id)
                  : false
              }
              isBengali={isBengali}
              format12h={state.timeFormat === '12h'}
              onToggleDone={handleToggleDone}
            />

            {/* Circular Progress & Category Distribution */}
            <ProgressCard
              tasks={selectedDayTasks}
              doneTaskIds={doneTaskIds}
              isBengali={isBengali}
            />

            {/* Days Calendar Strip */}
            <div className="rounded-3xl border p-4 bg-white dark:bg-[#13161c] border-slate-200/80 dark:border-slate-800/80 shadow-xs">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {isBengali ? 'সপ্তাহের দিন নির্বাচন' : 'Select Day'}
                </span>
                {!isSelectedToday && (
                  <button
                    type="button"
                    onClick={() => setSelectedDay(todayDay)}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-xs"
                  >
                    {t.today}
                  </button>
                )}
              </div>
              <DaySelector
                selectedDay={selectedDay}
                todayDay={todayDay}
                daysData={state.days}
                doneRecord={state.done}
                weekStartKey={weekStartKey}
                isBengali={isBengali}
                onSelectDay={setSelectedDay}
              />
            </div>

            {/* Quick Actions (Desktop) */}
            <div className="hidden lg:grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsCopyModalOpen(true)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#13161c] hover:border-blue-500 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
              >
                <Copy size={15} className="text-blue-600 dark:text-blue-400" />
                <span>{t.copyRoutine}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPresetsModalOpen(true)}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#13161c] hover:border-blue-500 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
              >
                <Sparkles size={15} className="text-amber-500" />
                <span>{t.presets}</span>
              </button>
            </div>
          </aside>

          {/* RIGHT COLUMN: Tasks & Detailed Views (Desktop: 8 cols) */}
          <section className="lg:col-span-8 space-y-4">
            {/* View Mode Header & Action Bar */}
            <div className="rounded-3xl border p-4 sm:p-5 bg-white dark:bg-[#13161c] border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {t.daysOfWeek[selectedDay]}
                  </h2>
                  {isSelectedToday && (
                    <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800/60">
                      {t.today}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                  {isBengali ? toBengaliDigits(selectedDayTasks.length) : selectedDayTasks.length}{' '}
                  {isBengali ? 'টি নির্ধারিত সময়সূচী' : 'scheduled blocks'}
                </p>
              </div>

              {/* Action Buttons: Add Task & Copy */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCopyModalOpen(true)}
                  className="sm:hidden flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  <Copy size={14} />
                  <span>{t.copyRoutine}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenAddTask()}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-500/20"
                >
                  <Plus size={18} strokeWidth={2.5} />
                  <span>{t.addTask}</span>
                </button>
              </div>
            </div>

            {/* Google Search Bar & Filter Chips (Only shown in timeline mode) */}
            {viewMode === 'timeline' && (
              <div className="space-y-3">
                {/* Google Keep style search input */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-10 py-2.5 rounded-full border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#13161c] text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filter chips bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  <button
                    type="button"
                    onClick={() => setFilterCat('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      filterCat === 'all'
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                        : 'bg-white dark:bg-[#13161c] border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {t.allCategories}
                  </button>

                  {(Object.keys(CATEGORIES) as CategoryKey[]).map((catKey) => {
                    const isSelected = filterCat === catKey;
                    const meta = CATEGORIES[catKey];
                    return (
                      <button
                        key={catKey}
                        type="button"
                        onClick={() => setFilterCat(isSelected ? 'all' : catKey)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                          isSelected
                            ? 'text-white shadow-xs'
                            : 'bg-white dark:bg-[#13161c] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                        style={{
                          backgroundColor: isSelected ? meta.color : undefined,
                        }}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: isSelected ? '#ffffff' : meta.color }}
                        />
                        <span>{t.categories[catKey]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MAIN CONTENT AREA BY VIEW MODE */}
            {viewMode === 'timeline' && (
              <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task, idx) => {
                    const isDone = doneTaskIds.has(task.id);
                    const isCurrent =
                      isSelectedToday &&
                      todayActiveInfo.currentTask?.id === task.id;
                    const isOverlapping = doesTaskOverlap(task, selectedDayTasks);

                    return (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={idx}
                        isDone={isDone}
                        isCurrent={isCurrent}
                        isOverlapping={isOverlapping}
                        isBengali={isBengali}
                        format12h={state.timeFormat === '12h'}
                        onToggleDone={handleToggleDone}
                        onEdit={(taskItem) => handleEditTask(taskItem)}
                        onDuplicate={handleDuplicateTask}
                        onDelete={handleDeleteTask}
                      />
                    );
                  })
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 sm:p-12 text-center bg-white/50 dark:bg-[#13161c]/40">
                    <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <ListTodo size={26} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200">
                      {searchQuery ? (isBengali ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No matching tasks') : t.emptyDay}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto font-normal">
                      {searchQuery
                        ? (isBengali ? 'ভিন্ন শব্দ দিয়ে অনুসন্ধান করে দেখুন।' : 'Try searching with different keywords.')
                        : t.emptyDaySub}
                    </p>
                    {!searchQuery && (
                      <button
                        type="button"
                        onClick={() => handleOpenAddTask()}
                        className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                      >
                        <Plus size={16} />
                        <span>{t.addTask}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {viewMode === 'schedule24h' && (
              <Schedule24hView
                tasks={selectedDayTasks}
                isToday={isSelectedToday}
                doneTaskIds={doneTaskIds}
                isBengali={isBengali}
                format12h={state.timeFormat === '12h'}
                onEditTask={(taskItem) => handleEditTask(taskItem)}
                onToggleDone={handleToggleDone}
              />
            )}

            {viewMode === 'weekmatrix' && (
              <WeekMatrixView
                daysData={state.days}
                todayDay={todayDay}
                doneRecord={state.done}
                weekStartKey={weekStartKey}
                isBengali={isBengali}
                format12h={state.timeFormat === '12h'}
                onSelectDay={(dayNum) => {
                  setSelectedDay(dayNum);
                  setViewMode('timeline');
                }}
                onAddTaskToDay={(dayNum) => handleOpenAddTask(dayNum)}
                onEditTask={(taskItem, dayNum) => handleEditTask(taskItem, dayNum)}
              />
            )}
          </section>
        </div>
      </main>

      {/* Responsive Bottom Navigation Bar */}
      <MobileBottomNav
        viewMode={viewMode}
        isBengali={isBengali}
        onChangeViewMode={setViewMode}
        onOpenAddTask={() => handleOpenAddTask()}
        onOpenToolsMenu={() => setIsToolsMenuOpen(true)}
      />

      {/* Unified Tools & Settings Menu Modal */}
      <ToolsMenuModal
        isOpen={isToolsMenuOpen}
        isDark={state.dark}
        isBengali={isBengali}
        notificationsEnabled={state.notificationsEnabled}
        soundEnabled={state.soundEnabled}
        format12h={state.timeFormat === '12h'}
        currentTimeString={currentTimeString}
        currentDateString={currentDateString}
        greetingText={greetingText}
        onClose={() => setIsToolsMenuOpen(false)}
        onToggleDark={() => setState((prev) => ({ ...prev, dark: !prev.dark }))}
        onToggleLang={() => setState((prev) => ({ ...prev, lang: prev.lang === 'bn' ? 'en' : 'bn' }))}
        onToggleSound={() => {
          const next = !state.soundEnabled;
          setState((prev) => ({ ...prev, soundEnabled: next }));
          showToast(next ? (isBengali ? 'সাউন্ড চালু হয়েছে' : 'Sound chime enabled') : (isBengali ? 'সাউন্ড বন্ধ করা হয়েছে' : 'Sound muted'));
        }}
        onToggleNotification={handleToggleNotifications}
        onToggleTimeFormat={() =>
          setState((prev) => ({ ...prev, timeFormat: prev.timeFormat === '12h' ? '24h' : '12h' }))
        }
        onOpenPresets={() => setIsPresetsModalOpen(true)}
        onOpenCopyModal={() => setIsCopyModalOpen(true)}
        onExport={() => exportRoutineAsJson(state)}
        onTriggerImport={handleTriggerImport}
        onPrint={() => window.print()}
      />

      {/* Task Add / Edit Modal Sheet */}
      <TaskModal
        isOpen={isTaskModalOpen}
        editingTask={editingTask}
        isBengali={isBengali}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
      />

      {/* Presets Modal */}
      <PresetsModal
        isOpen={isPresetsModalOpen}
        selectedDay={selectedDay}
        isBengali={isBengali}
        onClose={() => setIsPresetsModalOpen(false)}
        onApplyPreset={handleApplyPreset}
      />

      {/* Copy Day Modal */}
      <CopyDayModal
        isOpen={isCopyModalOpen}
        sourceDay={selectedDay}
        isBengali={isBengali}
        onClose={() => setIsCopyModalOpen(false)}
        onConfirmCopy={handleConfirmCopyDays}
      />

      {/* Hidden file input for JSON import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileImport}
        className="hidden"
      />
    </div>
  );
}
