
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
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  category: 'dashboard' | 'tracking' | 'wellness' | 'social';
}

interface CompactNavigationProps {
  items: NavigationItem[];
  className?: string;
}

const CompactNavigation: React.FC<CompactNavigationProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const { isMobile, isTablet, width } = useViewport();
  
  // Enhanced responsive item limits
  const getVisibleItemCount = () => {
    if (width < 480) return 2;
    if (width < 640) return 3;
    if (width < 768) return 4;
    if (width < 1024) return 5;
    if (width < 1280) return 6;
    if (width < 1536) return 7;
    return 8;
  };

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavigationItem[]>);

  const visibleCount = getVisibleItemCount();
  const visibleItems = items.slice(0, visibleCount);
  const overflowItems = items.slice(visibleCount);

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  };

  const getItemClass = (isActive: boolean, category: string) => {
    const categoryColors = {
      dashboard: 'from-blue-500 to-indigo-600',
      tracking: 'from-emerald-500 to-teal-600', 
      wellness: 'from-purple-500 to-pink-600',
      social: 'from-orange-500 to-red-600'
    };

    return cn(
      "flex items-center gap-2 px-3 py-2.5 rounded-2xl transition-all duration-500 font-semibold text-sm whitespace-nowrap border-2 relative overflow-hidden group backdrop-blur-lg",
      "hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500/30 transform-gpu will-change-transform",
      "shadow-lg hover:shadow-xl",
      isActive 
        ? `bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} text-white border-white/40 scale-[1.03] shadow-2xl` 
        : "text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white/95 dark:hover:bg-slate-700/95 border-gray-200/70 dark:border-gray-700/70 hover:border-gray-300/80 dark:hover:border-gray-600/80"
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      dashboard: 'Overview',
      tracking: 'Health Tracking',
      wellness: 'Mental Wellness', 
      social: 'Community'
    };
    return labels[category as keyof typeof labels] || category;
  };

  return (
    <div className={cn(
      "flex items-center gap-2 p-3 bg-gradient-to-r from-white/40 via-white/30 to-white/40 dark:from-slate-900/40 dark:via-slate-900/30 dark:to-slate-900/40 backdrop-blur-3xl rounded-3xl border-2 border-white/50 dark:border-slate-700/50 shadow-2xl transition-all duration-500 hover:shadow-3xl",
      "ring-1 ring-white/30 dark:ring-slate-700/30",
      className
    )}>
      {/* Visible navigation items */}
      <div className="flex items-center gap-2">
        {visibleItems.map((item, index) => {
          const itemIsActive = isActive(item.path);
          return (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                className={getItemClass(itemIsActive, item.category)}
              >
                {/* Enhanced shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_ease-in-out] transition-opacity duration-300 -skew-x-12"></div>
                
                <span className={cn(
                  "transition-all duration-500 relative z-10 flex-shrink-0",
                  itemIsActive ? "scale-110 drop-shadow-lg" : "group-hover:scale-110",
                  isMobile ? "text-base" : "text-lg"
                )}>
                  {item.icon}
                </span>
                {(!isMobile || itemIsActive) && (
                  <span className="hidden sm:inline relative z-10 font-bold">
                    {item.name}
                  </span>
                )}
                
                {/* Enhanced active indicator */}
                {itemIsActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1.5 bg-white/90 rounded-full animate-pulse shadow-lg"></div>
                )}
              </Link>
              
              {/* Category separator */}
              {index < visibleItems.length - 1 && 
               visibleItems[index + 1] && 
               item.category !== visibleItems[index + 1].category && 
               !isMobile && (
                <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-300/60 to-transparent dark:via-gray-600/60"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Enhanced overflow menu */}
      {overflowItems.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "px-3 py-2.5 rounded-2xl border-2 transition-all duration-500 backdrop-blur-lg group relative overflow-hidden shadow-lg hover:shadow-xl",
                "text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-slate-800/80 hover:bg-white/95 dark:hover:bg-slate-700/95 border-gray-200/70 dark:border-gray-700/70 hover:scale-[1.03]"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
              <MoreHorizontal className="h-5 w-5 relative z-10" />
              {!isMobile && <ChevronDown className="h-4 w-4 ml-1 relative z-10" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-2 border-white/50 dark:border-gray-700/50 rounded-2xl shadow-2xl p-2" 
            align="end"
            sideOffset={12}
          >
            {Object.entries(groupedItems).map(([category, categoryItems]) => {
              const overflowCategoryItems = categoryItems.filter(item => 
                overflowItems.some(overflowItem => overflowItem.path === item.path)
              );
              
              if (overflowCategoryItems.length === 0) return null;
              
              return (
                <div key={category}>
                  <DropdownMenuLabel className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
                    {getCategoryLabel(category)}
                  </DropdownMenuLabel>
                  {overflowCategoryItems.map(item => (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300 font-medium",
                          isActive(item.path) && "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold"
                        )}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator className="my-2" />
                </div>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {/* Enhanced ambient glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10"></div>
    </div>
  );
};

export default CompactNavigation;
