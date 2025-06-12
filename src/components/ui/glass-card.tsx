
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'premium' | 'cosmic' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  hover = true
}) => {
  const variants = {
    default: 'bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/20',
    premium: 'bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-slate-900/20 dark:via-slate-900/10 dark:to-slate-900/5 backdrop-blur-2xl border border-white/30 dark:border-slate-600/30',
    cosmic: 'bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 backdrop-blur-xl border border-blue-300/20 dark:border-purple-500/20',
    minimal: 'bg-white/5 dark:bg-slate-900/5 backdrop-blur-lg border border-white/10 dark:border-slate-700/10'
  };

  const sizes = {
    sm: 'p-4 rounded-xl',
    md: 'p-6 rounded-2xl',
    lg: 'p-8 rounded-3xl',
    xl: 'p-12 rounded-3xl'
  };

  const hoverEffect = hover ? 'hover:shadow-2xl hover:scale-[1.02] transition-all duration-300' : '';

  return (
    <div className={cn(
      variants[variant],
      sizes[size],
      hoverEffect,
      'relative overflow-hidden shadow-xl',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
