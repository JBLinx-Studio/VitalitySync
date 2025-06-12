
import React from 'react';
import GlassCard from '@/components/ui/glass-card';
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
  return (
    <GlassCard variant="premium" className={`hover:shadow-xl transition-all duration-300 ${className}`}>
      <div className="p-4 md:p-6 text-center">
        <div className={`flex justify-center mb-3 text-${color}-500`}>
          {icon}
        </div>
        <p className={`text-2xl md:text-3xl font-bold text-${color}-500 mb-1`}>
          {value}
        </p>
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
          {label}
        </p>
      </div>
    </GlassCard>
  );
};

export default QuickStatsCard;
