
import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';
import { throttle } from '@/utils/performance';

interface NavigationTab {
  name: string;
  path: string;
  icon?: React.ReactNode;
}

interface NavigationTabsProps {
  tabs: NavigationTab[];
  className?: string;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs, className = '' }) => {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const { isMobile, isTablet } = useViewport();
  
  const checkForArrows = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftArrow(container.scrollLeft > 20);
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20);
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const activeTab = container.querySelector('.active-tab');
    if (activeTab) {
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    
    setTimeout(checkForArrows, 300);
  }, [location.pathname]);
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = throttle(() => {
      checkForArrows();
    }, 100);
    
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    checkForArrows();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn(
      "relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 p-3 mx-auto max-w-fit",
      "ring-1 ring-white/20 dark:ring-slate-700/20",
      className
    )}>
      <div className="flex items-center relative">
        {showLeftArrow && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/60 dark:border-gray-700/60 h-9 w-9"
            onClick={scrollLeft}
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none scroll-smooth gap-2 px-12 py-2"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold group relative overflow-hidden min-w-fit",
                  "hover:scale-[1.02] active:scale-[0.98] border",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 active-tab transform scale-[1.02] border-blue-400/50" 
                    : "text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-md border-gray-200/50 dark:border-gray-700/50",
                  isMobile ? "flex-grow justify-center min-w-[140px]" : "min-w-fit"
                )
              }
              role="tab"
              aria-selected={location.pathname === tab.path}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                {tab.icon}
              </span>
              <span className="relative z-10 font-semibold text-base leading-tight">{tab.name}</span>
              {location.pathname === tab.path && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/90 rounded-full shadow-lg"></div>
              )}
            </NavLink>
          ))}
        </div>
        
        {showRightArrow && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 z-20 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/60 dark:border-gray-700/60 h-9 w-9"
            onClick={scrollRight}
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationTabs;
