export interface Translations {
  appName: string;
  appSubtitle: string;
  greetings: [string, string, string, string]; // Night, Morning, Afternoon, Evening
  today: string;
  now: string;
  next: string;
  upNext: string;
  timeRemaining: string;
  freeTime: string;
  allDoneForToday: string;
  noMoreTasksToday: string;
  addTask: string;
  editTask: string;
  title: string;
  titlePlaceholder: string;
  start: string;
  end: string;
  category: string;
  priority: string;
  notes: string;
  notesPlaceholder: string;
  duration: string;
  save: string;
  cancel: string;
  delete: string;
  duplicate: string;
  low: string;
  medium: string;
  high: string;
  done: string;
  completed: string;
  pending: string;
  totalScheduled: string;
  totalTasks: string;
  completionRate: string;
  overlapWarning: string;
  copyRoutine: string;
  copyToDays: string;
  copyToAll: string;
  exportJson: string;
  importJson: string;
  enableAlerts: string;
  alertsActive: string;
  soundAlert: string;
  timeFormatToggle: string;
  darkMode: string;
  lightMode: string;
  print: string;
  presets: string;
  emptyDay: string;
  emptyDaySub: string;
  searchPlaceholder: string;
  allCategories: string;
  allPriorities: string;
  viewTimeline: string;
  viewSchedule24h: string;
  viewWeekMatrix: string;
  copiedSuccess: string;
  importedSuccess: string;
  invalidFile: string;
  confirmDelete: string;
  confirmCopyAll: string;
  presetStudent: string;
  presetStudentDesc: string;
  presetFreelancer: string;
  presetFreelancerDesc: string;
  presetRamadan: string;
  presetRamadanDesc: string;
  presetDefault: string;
  presetDefaultDesc: string;
  applyPreset: string;
  presetApplied: string;
  errTitleRequired: string;
  errSameTime: string;
  quickDurationAdd: string;
  activeNowBanner: string;
  categoryBreakdown: string;
  daysOfWeek: string[];
  daysOfWeekShort: string[];
  categories: {
    prayer: string;
    study: string;
    work: string;
    exercise: string;
    meal: string;
    rest: string;
    family: string;
    other: string;
  };
}

export const TRANSLATIONS: Record<'bn' | 'en', Translations> = {
  bn: {
    appName: 'আমার রুটিন',
    appSubtitle: 'দৈনন্দিন সময়সূচী ও লক্ষ্য ট্র্যাকার',
    greetings: ['শুভ রাত্রি', 'সুপ্রভাত', 'শুভ অপরাহ্ন', 'শুভ সন্ধ্যা'],
    today: 'আজ',
    now: 'এখন চলছে',
    next: 'এরপর',
    upNext: 'পরবর্তী কাজ',
    timeRemaining: 'বাকি আছে',
    freeTime: 'এই মুহূর্তে কোনো নির্ধারিত কাজ নেই',
    allDoneForToday: 'আজকের সব কাজ সম্পন্ন হয়েছে!',
    noMoreTasksToday: 'আজকের আর কোনো কাজ বাকি নেই',
    addTask: 'কাজ যোগ করো',
    editTask: 'কাজ সম্পাদনা',
    title: 'কাজের শিরোনাম',
    titlePlaceholder: 'যেমন: কুরআন তিলাওয়াত, গণিত অনুশীলন...',
    start: 'শুরুর সময়',
    end: 'শেষের সময়',
    category: 'বিভাগ',
    priority: 'গুরুত্ব',
    notes: 'অতিরিক্ত নোট (ঐচ্ছিক)',
    notesPlaceholder: 'যেমন: বইয়ের পৃষ্ঠা ১০-১৫, জুম মিটিং লিংক ইত্যাদি',
    duration: 'সময়কাল',
    save: 'সংরক্ষণ করো',
    cancel: 'বাতিল',
    delete: 'মুছে ফেলুন',
    duplicate: 'অনুলিপি',
    low: 'সাধারণ',
    medium: 'মাঝারি',
    high: 'জরুরি',
    done: 'সম্পন্ন',
    completed: 'সম্পন্ন',
    pending: 'বাকি',
    totalScheduled: 'মোট নির্ধারিত সময়',
    totalTasks: 'মোট কাজ',
    completionRate: 'অগ্রগতি',
    overlapWarning: 'অন্য কাজের সাথে সময় মিলছে',
    copyRoutine: 'রুটিন কপি',
    copyToDays: 'অন্যান্য দিনে কপি করো',
    copyToAll: 'সপ্তাহের সব দিনে কপি করো',
    exportJson: 'ব্যাকআপ ডাউনলোড',
    importJson: 'রুটিন রিস্টোর',
    enableAlerts: 'নোটিফিকেশন',
    alertsActive: 'নোটিফিকেশন চালু',
    soundAlert: 'সাউন্ড এলার্ট',
    timeFormatToggle: 'সময় ফরম্যাট',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    print: 'প্রিন্ট রুটিন',
    presets: 'রেডিমেড রুটিন',
    emptyDay: 'এই দিনে এখনও কোনো কাজ যুক্ত করা হয়নি',
    emptyDaySub: 'নিচের বাটনে চাপ দিয়ে আপনার প্রথম কাজটি তৈরি করুন।',
    searchPlaceholder: 'কাজ বা নোট খুঁজুন...',
    allCategories: 'সব বিভাগ',
    allPriorities: 'সব গুরুত্ব',
    viewTimeline: 'টাইমলাইন ভিউ',
    viewSchedule24h: '২৪ ঘণ্টার ছক',
    viewWeekMatrix: 'পুরো সপ্তাহ',
    copiedSuccess: 'রুটিন সফলভাবে কপি হয়েছে',
    importedSuccess: 'রুটিন ফাইল সফলভাবে ইমপোর্ট হয়েছে',
    invalidFile: 'ফাইলটি সঠিক নয়। দয়া করে একটি সঠিক JSON ফাইল দিন।',
    confirmDelete: 'আপনি কি নিশ্চিত এই কাজটি মুছে ফেলতে চান?',
    confirmCopyAll: 'এই দিনের রুটিন কি পুরো সপ্তাহের সব দিনে কপি করতে চান?',
    presetStudent: 'শিক্ষার্থী / পরীক্ষার প্রস্তুতি',
    presetStudentDesc: 'পড়ালেখা, ক্লাস, রিভিশন ও বিশ্রামের চমৎকার ভারসাম্য',
    presetFreelancer: 'ফ্রিল্যান্সার / রিমোট ওয়ার্ক',
    presetFreelancerDesc: 'ডিপ ফোকাস ওয়ার্ক ব্লক, ক্লায়েন্ট কমিউনিকেশন ও বিশ্রাম',
    presetRamadan: 'মাহে রমজান রুটিন',
    presetRamadanDesc: 'সেহরি, তারাবীহ, ইফতার, তিলাওয়াত ও কাজের নিখুঁত সমন্বয়',
    presetDefault: 'সুষম দৈনন্দিন রুটিন',
    presetDefaultDesc: 'ইবাদত, ব্যায়াম, খাবার, কাজ ও পারিবারিক সময়ের রুটিন',
    applyPreset: 'এই রুটিন সেট করো',
    presetApplied: 'নতুন রুটিন যুক্ত করা হয়েছে',
    errTitleRequired: 'কাজের শিরোনাম আবশ্যক।',
    errSameTime: 'শুরু ও শেষের সময় এক হতে পারবে না।',
    quickDurationAdd: 'সময়কাল বৃদ্ধি:',
    activeNowBanner: 'বর্তমান রুটিন সক্রিয়',
    categoryBreakdown: 'ক্যাটাগরি অনুযায়ী সময়',
    daysOfWeek: ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'],
    daysOfWeekShort: ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'],
    categories: {
      prayer: 'ইবাদত',
      study: 'পড়াশোনা',
      work: 'কাজ / প্রজেক্ট',
      exercise: 'ব্যায়াম ও স্বাস্থ্য',
      meal: 'খাবার',
      rest: 'বিশ্রাম ও ঘুম',
      family: 'পরিবার ও সমাজ',
      other: 'অন্যান্য',
    },
  },
  en: {
    appName: 'Daily Routine',
    appSubtitle: 'Smart Schedule & Habit Tracker',
    greetings: ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
    today: 'Today',
    now: 'Happening Now',
    next: 'Next Up',
    upNext: 'Upcoming Task',
    timeRemaining: 'Remaining',
    freeTime: 'Nothing scheduled right now',
    allDoneForToday: 'All tasks completed for today!',
    noMoreTasksToday: 'No more tasks remaining today',
    addTask: 'Add Task',
    editTask: 'Edit Task',
    title: 'Task Title',
    titlePlaceholder: 'e.g. Morning Quran, Math Study, Client Sync...',
    start: 'Start Time',
    end: 'End Time',
    category: 'Category',
    priority: 'Priority',
    notes: 'Notes (optional)',
    notesPlaceholder: 'e.g. Chapter 4 review, meeting link, gym goals...',
    duration: 'Duration',
    save: 'Save Task',
    cancel: 'Cancel',
    delete: 'Delete',
    duplicate: 'Duplicate',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    done: 'Done',
    completed: 'Completed',
    pending: 'Pending',
    totalScheduled: 'Total Scheduled',
    totalTasks: 'Total Tasks',
    completionRate: 'Completion Rate',
    overlapWarning: 'Time overlaps another task',
    copyRoutine: 'Copy Routine',
    copyToDays: 'Copy to Other Days',
    copyToAll: 'Copy to All 7 Days',
    exportJson: 'Export Backup',
    importJson: 'Restore Routine',
    enableAlerts: 'Notifications',
    alertsActive: 'Alerts Active',
    soundAlert: 'Sound Chime',
    timeFormatToggle: 'Time Format',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    print: 'Print Schedule',
    presets: 'Routine Presets',
    emptyDay: 'No tasks scheduled for this day yet',
    emptyDaySub: 'Click the button below to add your first time block.',
    searchPlaceholder: 'Search tasks, tags, notes...',
    allCategories: 'All Categories',
    allPriorities: 'All Priorities',
    viewTimeline: 'Timeline Cards',
    viewSchedule24h: '24h Schedule Grid',
    viewWeekMatrix: 'Full Week Matrix',
    copiedSuccess: 'Routine successfully copied to selected days',
    importedSuccess: 'Routine successfully imported from JSON',
    invalidFile: 'Invalid file format. Please upload a valid routine JSON.',
    confirmDelete: 'Are you sure you want to delete this task?',
    confirmCopyAll: 'Do you want to overwrite all 7 days with this routine?',
    presetStudent: 'Student & Exam Prep',
    presetStudentDesc: 'Balanced schedule with lectures, revision, prayers & breaks',
    presetFreelancer: 'Remote Work & Freelance',
    presetFreelancerDesc: 'Deep work focus blocks, meetings, family and rest',
    presetRamadan: 'Ramadan Routine',
    presetRamadanDesc: 'Sehri, Taraweeh, Quran recitation, work and family harmony',
    presetDefault: 'Balanced Daily Lifestyle',
    presetDefaultDesc: 'Wholesome routine covering spiritual, career, fitness & rest',
    applyPreset: 'Apply Routine',
    presetApplied: 'Preset routine applied successfully',
    errTitleRequired: 'Task title is required.',
    errSameTime: 'Start and end time cannot be identical.',
    quickDurationAdd: 'Quick duration:',
    activeNowBanner: 'Current Routine In Progress',
    categoryBreakdown: 'Time Distribution',
    daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysOfWeekShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    categories: {
      prayer: 'Prayer & Spiritual',
      study: 'Study & Learning',
      work: 'Work & Projects',
      exercise: 'Fitness & Health',
      meal: 'Meals & Nutrition',
      rest: 'Rest & Sleep',
      family: 'Family & Social',
      other: 'Other',
    },
  },
};
