import React from 'react';
import {
  Moon,
  BookOpen,
  Briefcase,
  Activity,
  Utensils,
  BedDouble,
  Heart,
  Compass,
} from 'lucide-react';
import { CategoryKey } from '../types';

interface Props {
  cat: CategoryKey;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<Props> = ({ cat, className = 'w-4 h-4', size = 16 }) => {
  switch (cat) {
    case 'prayer':
      return <Moon size={size} className={className} />;
    case 'study':
      return <BookOpen size={size} className={className} />;
    case 'work':
      return <Briefcase size={size} className={className} />;
    case 'exercise':
      return <Activity size={size} className={className} />;
    case 'meal':
      return <Utensils size={size} className={className} />;
    case 'rest':
      return <BedDouble size={size} className={className} />;
    case 'family':
      return <Heart size={size} className={className} />;
    case 'other':
    default:
      return <Compass size={size} className={className} />;
  }
};
