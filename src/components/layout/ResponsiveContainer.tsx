
import React from 'react';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className = '',
  maxWidth = 'xl',
  padding = 'md'
}) => {
  const { isMobile, isTablet } = useViewport();

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };

  const paddings = {
    none: '',
    sm: isMobile ? 'px-4 py-2' : 'px-6 py-3',
    md: isMobile ? 'px-4 py-4' : isTablet ? 'px-6 py-6' : 'px-8 py-8',
    lg: isMobile ? 'px-6 py-6' : isTablet ? 'px-8 py-8' : 'px-12 py-12',
    xl: isMobile ? 'px-6 py-8' : isTablet ? 'px-12 py-12' : 'px-16 py-16'
  };

  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidths[maxWidth],
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
