
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';

interface EnhancedQuickStatsCardProps {
  title: string;
  value: number;
  goal?: number;
  unit?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'yellow' | 'red';
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  subtitle?: string;
}

const EnhancedQuickStatsCard: React.FC<EnhancedQuickStatsCardProps> = ({
  title,
  value,
  goal,
  unit = '',
  icon,
  color,
  trend,
  onClick,
  className,
  size = 'md',
  subtitle
}) => {
  const { isMobile } = useViewport();
  
  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40',
    green: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40',
    orange: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/40',
    purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40',
    pink: 'text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/40',
    yellow: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/40',
    red: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40'
  };

  const sizeClasses = {
    sm: isMobile ? 'p-3' : 'p-4',
    md: isMobile ? 'p-4' : 'p-6',
    lg: isMobile ? 'p-5' : 'p-8'
  };

  const textSizes = {
    sm: isMobile ? 'text-lg' : 'text-xl',
    md: isMobile ? 'text-xl' : 'text-2xl',
    lg: isMobile ? 'text-2xl' : 'text-3xl'
  };

  const percentage = goal ? Math.min((value / goal) * 100, 100) : 0;
  const completionStatus = goal ? (value >= goal ? 'complete' : value >= goal * 0.8 ? 'near' : 'progress') : 'none';

  return (
    <Card 
      className={cn(
        "bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20 hover:shadow-xl transition-all duration-300",
        onClick && "cursor-pointer hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <CardContent className={sizeClasses[size]}>
        <div className="space-y-3">
          {/* Header with icon and trend */}
          <div className="flex items-center justify-between">
            <div className={cn("p-2 rounded-xl", colorClasses[color].split(' ').slice(2).join(' '))}>
              <div className={colorClasses[color].split(' ').slice(0, 2).join(' ')}>
                {icon}
              </div>
            </div>
            
            {trend && (
              <Badge 
                variant={trend.direction === 'up' ? 'default' : trend.direction === 'down' ? 'destructive' : 'secondary'}
                className="text-xs"
              >
                {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'} {Math.abs(trend.value)}%
              </Badge>
            )}
            
            {goal && !trend && (
              <Badge 
                variant={completionStatus === 'complete' ? 'default' : completionStatus === 'near' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {Math.round(percentage)}%
              </Badge>
            )}
          </div>

          {/* Title */}
          <div>
            <h3 className={cn(
              "font-semibold text-gray-700 dark:text-gray-300",
              size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'
            )}>
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Value */}
          <div>
            <div className={cn(
              "font-bold",
              colorClasses[color].split(' ').slice(0, 2).join(' '),
              textSizes[size]
            )}>
              {typeof value === 'number' ? value.toLocaleString() : value}{unit}
            </div>
            
            {goal && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Goal: {goal.toLocaleString()}{unit}
              </div>
            )}
          </div>

          {/* Progress Bar */}
          {goal && (
            <div className="space-y-1">
              <Progress 
                value={percentage} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{value.toLocaleString()}</span>
                <span>{goal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Status Indicator */}
          {completionStatus === 'complete' && (
            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
              <span>✅</span>
              <span>Goal achieved!</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedQuickStatsCard;
