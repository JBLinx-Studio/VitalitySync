
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickStatsCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color: string;
  className?: string;
}

const QuickStatsCard: React.FC<QuickStatsCardProps> = ({
  icon,
  value,
  label,
  color,
  className = ''
}) => {
  const colorMap: { [key: string]: string } = {
    'blue': 'from-blue-500 to-blue-600',
    'emerald': 'from-emerald-500 to-emerald-600',
    'purple': 'from-purple-500 to-purple-600',
    'orange': 'from-orange-500 to-orange-600',
    'cyan': 'from-cyan-500 to-cyan-600',
    'pink': 'from-pink-500 to-pink-600',
    'teal': 'from-teal-500 to-teal-600',
    'indigo': 'from-indigo-500 to-indigo-600'
  };

  const gradientClass = colorMap[color] || 'from-gray-500 to-gray-600';

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group",
      className
    )}>
      {/* Single gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}></div>
      
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl"></div>
      
      {/* Content */}
      <div className="relative p-6 text-center">
        <div className="flex justify-center mb-4 text-white">
          {icon}
        </div>
        <p className="text-3xl font-black text-white mb-2">
          {value}
        </p>
        <p className="text-sm text-white/80 font-medium">
          {label}
        </p>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
    </div>
  );
};

export default QuickStatsCard;
