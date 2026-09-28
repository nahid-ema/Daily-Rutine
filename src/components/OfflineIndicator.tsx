import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

interface Props {
  isBengali: boolean;
}

export const OfflineIndicator: React.FC<Props> = ({ isBengali }) => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-50 flex items-center gap-2 bg-amber-600/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg border border-amber-500 animate-in fade-in-0 duration-150">
      <span className="h-2 w-2 bg-white animate-pulse" />
      <WifiOff size={14} className="shrink-0" />
      <span>
        {isBengali ? 'অফলাইন মোড — ক্যাশ ডাটা ব্যবহৃত হচ্ছে' : 'Offline Mode — Cached data is in use'}
      </span>
    </div>
  );
};
