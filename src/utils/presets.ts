import { Task } from '../types';

export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

export const PRESET_DEFAULT_TASKS: Omit<Task, 'id'>[] = [
  { title: 'ফজর ও কুরআন তিলাওয়াত', start: '05:00', end: '05:45', cat: 'prayer', prio: 'high', notes: 'সূরা ইয়াসীন ও সকালের দুআ' },
  { title: 'সকালের ব্যায়াম ও স্ট্রেচিং', start: '06:00', end: '06:45', cat: 'exercise', prio: 'medium', notes: 'হালকা জগিং বা শরীরচর্চা' },
  { title: 'স্বাস্থ্যকর নাস্তা ও প্রস্তুতি', start: '07:00', end: '07:30', cat: 'meal', prio: 'low', notes: 'পুষ্টিকর প্রাতরাশ' },
  { title: 'মূল পড়াশোনা / স্কিল শেখা', start: '08:00', end: '11:00', cat: 'study', prio: 'high', notes: 'মোবাইল দূরে রেখে ডিপ ফোকাস স্টাডি' },
  { title: 'যোহরের নামাজ ও দুপুরের খাবার', start: '13:00', end: '14:00', cat: 'meal', prio: 'medium', notes: 'নামাজ ও পরিবারসহ মধ্যাহ্নভোজ' },
  { title: 'মূল প্রজেক্ট / অফিসিয়াল কাজ', start: '14:30', end: '18:00', cat: 'work', prio: 'high', notes: 'গুরুত্বপূর্ণ ক্লায়েন্ট বা একাডেমিক কাজ' },
  { title: 'মাগরিব ও হাঁটাহাঁটি', start: '18:15', end: '19:00', cat: 'prayer', prio: 'medium', notes: 'মুক্ত বাতাসে একটু ঘোরাঘুরি' },
  { title: 'পরিবারের সাথে সময় ও রাতের খাবার', start: '20:00', end: '21:30', cat: 'family', prio: 'medium', notes: 'স্ক্রিন ছাড়া আড্ডা' },
  { title: 'ঘুম ও বিশ্রাম', start: '22:30', end: '04:45', cat: 'rest', prio: 'high', notes: 'পর্যাপ্ত গভীর ঘুম' },
];

export const PRESET_STUDENT_TASKS: Omit<Task, 'id'>[] = [
  { title: 'ফজর ও সকালের জিকির', start: '05:00', end: '05:40', cat: 'prayer', prio: 'high', notes: 'দিনের সুন্দর শুরু' },
  { title: 'কঠিন বিষয়ের মুখস্থ ও রিভিশন', start: '05:50', end: '07:30', cat: 'study', prio: 'high', notes: 'সকালে স্মৃতিশক্তি সবচেয়ে প্রখর থাকে' },
  { title: 'নাস্তা ও কলেজ/ক্লাস প্রস্তুতি', start: '07:30', end: '08:15', cat: 'meal', prio: 'low', notes: 'ব্যাগ গুছিয়ে প্রস্তুত হওয়া' },
  { title: 'ক্লাস / লেকচার সেশন', start: '08:30', end: '13:00', cat: 'work', prio: 'high', notes: 'মনোযোগ দিয়ে নোট নেওয়া' },
  { title: 'যোহর ও লাঞ্চ বিরতি', start: '13:15', end: '14:15', cat: 'meal', prio: 'medium', notes: 'খাবার ও রিল্যাক্স' },
  { title: 'পাওয়ার ন্যাপ / বিশ্রাম', start: '14:30', end: '15:15', cat: 'rest', prio: 'low', notes: 'মস্তিস্ক সতেজ করার জন্য সংক্ষিপ্ত ঘুম' },
  { title: 'অ্যাসাইনমেন্ট ও গণিত প্র্যাকটিস', start: '15:30', end: '17:30', cat: 'study', prio: 'high', notes: 'সমস্যা সমাধান ও হোমওয়ার্ক' },
  { title: 'আসর ও আউটডোর খেলাধুলা', start: '17:35', end: '18:15', cat: 'exercise', prio: 'medium', notes: 'শরীরে রক্ত সঞ্চালন বৃদ্ধি' },
  { title: 'মাগরিব ও বই পড়া', start: '18:30', end: '19:15', cat: 'study', prio: 'low', notes: 'সাধারণ জ্ঞান বা পছন্দের বই' },
  { title: 'রাতের মূল স্টাডি সেশন', start: '19:30', end: '21:30', cat: 'study', prio: 'high', notes: 'মক টেস্ট বা অধ্যায় শেষ করা' },
  { title: 'ডিনার ও প্রস্তুতি', start: '21:30', end: '22:15', cat: 'meal', prio: 'low', notes: 'পরের দিনের সূচী দেখে নেওয়া' },
  { title: 'পরিমিত ঘুম', start: '22:30', end: '04:50', cat: 'rest', prio: 'high', notes: '৭ ঘণ্টার চমৎকার ঘুম' },
];

export const PRESET_FREELANCER_TASKS: Omit<Task, 'id'>[] = [
  { title: 'ঘুম থেকে ওঠা ও ফজর', start: '05:30', end: '06:15', cat: 'prayer', prio: 'high', notes: 'শান্তিময় সকাল' },
  { title: 'জগিং / কার্ডিও এক্সারসাইজ', start: '06:30', end: '07:15', cat: 'exercise', prio: 'medium', notes: 'শারীরিক ফিটনেস' },
  { title: 'নাস্তা ও দৈনিক প্ল্যানিং', start: '07:30', end: '08:15', cat: 'meal', prio: 'low', notes: 'আজকের প্রধান ৩টি কাজের তালিকা' },
  { title: 'ডিপ ওয়ার্ক ১ (কোডিং/ডিজাইন)', start: '08:30', end: '11:30', cat: 'work', prio: 'high', notes: 'কোনো সোশ্যাল মিডিয়া বা ডিস্ট্র্যাকশন ছাড়া' },
  { title: 'ইমেইল, ক্লায়েন্ট রিপ্লাই ও আপডেট', start: '11:45', end: '12:45', cat: 'work', prio: 'medium', notes: 'কমিউনিকেশন ও ডেলিভারি' },
  { title: 'যোহর ও লাঞ্চ বিরতি', start: '13:00', end: '14:15', cat: 'meal', prio: 'medium', notes: 'একটু চোখ বন্ধ করে বিশ্রাম' },
  { title: 'ডিপ ওয়ার্ক ২ (দ্বিতীয় প্রধান টাস্ক)', start: '14:30', end: '17:30', cat: 'work', prio: 'high', notes: 'প্রজেক্ট ফিনিশিং ও টেস্ট' },
  { title: 'আসর, হাঁটা ও চা বিরতি', start: '17:35', end: '18:20', cat: 'exercise', prio: 'low', notes: 'স্ক্রিন থেকে দূরে থাকা' },
  { title: 'নতুন স্কিল লার্নিং ও টেক রিসার্চ', start: '19:00', end: '20:30', cat: 'study', prio: 'medium', notes: 'নতুন প্রযুক্তি বা ফ্রেমওয়ার্ক শেখা' },
  { title: 'পরিবারের সাথে রাতের খাবার ও সময়', start: '20:45', end: '22:00', cat: 'family', prio: 'medium', notes: 'মন খুলে কথা বলা' },
  { title: 'পর্যাপ্ত গভীর ঘুম', start: '22:45', end: '05:20', cat: 'rest', prio: 'high', notes: 'পরের দিনের জন্য রিচার্জ' },
];

export const PRESET_RAMADAN_TASKS: Omit<Task, 'id'>[] = [
  { title: 'সেহরি ও তাহাজ্জুদ', start: '04:00', end: '04:50', cat: 'meal', prio: 'high', notes: 'বরকতময় সেহরি খাওয়া' },
  { title: 'ফজরের নামাজ ও কুরআন তিলাওয়াত', start: '05:00', end: '06:00', cat: 'prayer', prio: 'high', notes: '১ পারা তিলাওয়াত' },
  { title: 'সকালের ঘুম / বিশ্রাম', start: '06:15', end: '08:30', cat: 'rest', prio: 'medium', notes: 'শরীরকে শক্তি দেওয়া' },
  { title: 'সকালের কর্মঘণ্টা (ফোকাস কাজ)', start: '09:00', end: '12:30', cat: 'work', prio: 'high', notes: 'অফিস বা একাডেমিক কাজ' },
  { title: 'যোহর ও ছোট বিশ্রাম', start: '13:00', end: '14:00', cat: 'prayer', prio: 'medium', notes: 'নামাজ ও কায়লুলাহ' },
  { title: 'বিকেলের লাইট ওয়ার্ক / স্টাডি', start: '14:30', end: '16:30', cat: 'study', prio: 'medium', notes: 'সহজ টাস্কগুলো শেষ করা' },
  { title: 'আসর, জিকির ও ইফতার প্রস্তুতি', start: '16:45', end: '18:15', cat: 'prayer', prio: 'high', notes: 'ইফতারের আগের দোয়া কবুল হয়' },
  { title: 'ইফতার ও মাগরিবের নামাজ', start: '18:20', end: '19:15', cat: 'meal', prio: 'high', notes: 'খেজুর ও স্বাস্থ্যকর ইফতার' },
  { title: 'এশা ও সালাতুত তারাবীহ', start: '19:45', end: '21:30', cat: 'prayer', prio: 'high', notes: 'মসজিদে তারাবীহ আদায়' },
  { title: 'পরিবারের সাথে খাবার ও সময়', start: '21:45', end: '22:45', cat: 'family', prio: 'low', notes: 'হালকা ডিনার ও পানি পান' },
  { title: 'রাতের মূল ঘুম', start: '23:00', end: '03:50', cat: 'rest', prio: 'high', notes: 'সেহরির আগে ফ্রেশ ঘুম' },
];

export function buildDayTasksFromTemplate(template: Omit<Task, 'id'>[]): Task[] {
  return template.map((t) => ({
    ...t,
    id: uid(),
  }));
}
