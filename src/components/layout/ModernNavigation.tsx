
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
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

interface ModernNavigationProps {
  items: NavigationItem[];
  className?: string;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const { isMobile, isTablet, width } = useViewport();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  // Optimized responsive item limits with better breakpoints
  const visibleCount = useMemo(() => {
    if (width < 640) return 3;
    if (width < 768) return 4; 
    if (width < 1024) return 5;
    if (width < 1280) return 6;
    if (width < 1536) return 7;
    return 8;
  }, [width]);

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const overflowItems = useMemo(() => items.slice(visibleCount), [items, visibleCount]);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => checkScrollButtons();
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Check on mount and resize
    checkScrollButtons();
    const resizeObserver = new ResizeObserver(checkScrollButtons);
    resizeObserver.observe(container);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.6;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  };

  const getCategoryColor = (category: string, isActive: boolean) => {
    const colors = {
      dashboard: isActive ? 'from-blue-500 to-indigo-600' : 'hover:from-blue-500/20 hover:to-indigo-600/20',
      tracking: isActive ? 'from-emerald-500 to-teal-600' : 'hover:from-emerald-500/20 hover:to-teal-600/20',
      wellness: isActive ? 'from-purple-500 to-pink-600' : 'hover:from-purple-500/20 hover:to-pink-600/20',
      social: isActive ? 'from-orange-500 to-red-600' : 'hover:from-orange-500/20 hover:to-red-600/20'
    };
    return colors[category as keyof typeof colors] || '';
  };

  return (
    <nav 
      className={cn(
        "relative max-w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-slate-700/30 shadow-xl hover:shadow-2xl transition-all duration-500",
        "ring-1 ring-white/20 dark:ring-slate-700/20",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="relative flex items-center">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-1 z-10 h-8 w-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-white/40 dark:border-slate-700/40 transition-all duration-300 hover:scale-110"
            aria-label="Scroll navigation left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Navigation Items Container */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-none scroll-smooth px-3 py-2 max-w-full"
          style={{ scrollBehavior: 'smooth' }}
        >
          {visibleItems.map((item, index) => {
            const itemIsActive = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 font-medium text-sm whitespace-nowrap border relative overflow-hidden group backdrop-blur-sm min-w-fit",
                  "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/30 active:scale-95",
                  itemIsActive 
                    ? `bg-gradient-to-r ${getCategoryColor(item.category, true)} text-white border-white/20 shadow-lg scale-105` 
                    : `text-gray-700 dark:text-gray-200 bg-white/40 dark:bg-slate-800/40 hover:bg-gradient-to-r ${getCategoryColor(item.category, false)} border-gray-200/40 dark:border-gray-700/40 hover:border-gray-300/60 dark:hover:border-gray-600/60`
                )}
                aria-current={itemIsActive ? 'page' : undefined}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 animate-shimmer"></div>
                
                <span className={cn(
                  "transition-all duration-300 relative z-10 flex-shrink-0",
                  itemIsActive ? "scale-110 drop-shadow-sm" : "group-hover:scale-110"
                )}>
                  {item.icon}
                </span>
                
                <span className="relative z-10 font-semibold tracking-wide">
                  {item.name}
                </span>
                
                {/* Active Indicator */}
                {itemIsActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/80 rounded-full animate-pulse shadow-sm"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-1 z-10 h-8 w-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-white/40 dark:border-slate-700/40 transition-all duration-300 hover:scale-110"
            aria-label="Scroll navigation right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Overflow Menu */}
      {overflowItems.length > 0 && (
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-white/40 dark:border-slate-700/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="More navigation options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/40 dark:border-gray-700/40 rounded-xl shadow-2xl" 
              align="end"
              sideOffset={8}
            >
              {overflowItems.map(item => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-lg transition-all duration-300 font-medium cursor-pointer",
                      isActive(item.path) && "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-semibold"
                    )}
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      
      {/* Enhanced Glow Effects */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10"></div>
    </nav>
  );
};

export default ModernNavigation;
