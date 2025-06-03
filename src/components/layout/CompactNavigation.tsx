
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  category?: 'health' | 'tracking' | 'social';
}

interface CompactNavigationProps {
  items: NavigationItem[];
  className?: string;
}

const CompactNavigation: React.FC<CompactNavigationProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const { isMobile, isTablet, width } = useViewport();
  
  // Responsive item limits
  const getVisibleItemCount = () => {
    if (width < 640) return 2; // mobile
    if (width < 768) return 3; // small tablet
    if (width < 1024) return 4; // tablet
    if (width < 1280) return 5; // laptop
    return 6; // desktop
  };

  const visibleCount = getVisibleItemCount();
  const visibleItems = items.slice(0, visibleCount);
  const overflowItems = items.slice(visibleCount);

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  };

  const getItemClass = (isActive: boolean) => cn(
    "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap border",
    "hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/50",
    isActive 
      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg border-blue-400/50 scale-[1.02]" 
      : "text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 border-gray-200/50 dark:border-gray-700/50"
  );

  return (
    <div className={cn(
      "flex items-center gap-1 p-2 bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl",
      className
    )}>
      {/* Visible navigation items */}
      <div className="flex items-center gap-1">
        {visibleItems.map(item => {
          const itemIsActive = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={getItemClass(itemIsActive)}
            >
              <span className={cn(
                "transition-transform duration-300",
                itemIsActive ? "scale-110" : "group-hover:scale-105",
                isMobile ? "text-base" : "text-sm"
              )}>
                {item.icon}
              </span>
              {(!isMobile || itemIsActive) && (
                <span className="hidden sm:inline">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Overflow menu */}
      {overflowItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "px-3 py-2 rounded-xl border transition-all duration-300",
                "text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 border-gray-200/50 dark:border-gray-700/50"
              )}
            >
              <MoreHorizontal className="h-4 w-4" />
              {!isMobile && <ChevronDown className="h-3 w-3 ml-1" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60" 
            align="end"
            sideOffset={8}
          >
            {overflowItems.map(item => (
              <DropdownMenuItem key={item.path} asChild>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg",
                    isActive(item.path) && "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default CompactNavigation;
