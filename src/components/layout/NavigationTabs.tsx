
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
    <div className={cn("relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-2", className)}>
      <div className="flex items-center relative">
        {showLeftArrow && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-1 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
            onClick={scrollLeft}
            aria-label="Scroll tabs left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-none scroll-smooth gap-2 px-10 py-2"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {tabs.map(tab => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 whitespace-nowrap px-5 py-3 rounded-xl transition-all duration-300 text-sm font-medium group relative overflow-hidden",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 active-tab transform scale-[1.02]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-slate-800 dark:hover:to-slate-700 hover:shadow-md",
                  isMobile ? "flex-grow justify-center min-w-[120px]" : "min-w-fit"
                )
              }
              role="tab"
              aria-selected={location.pathname === tab.path}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                {tab.icon}
              </span>
              <span className="relative z-10 font-semibold">{tab.name}</span>
              {location.pathname === tab.path && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-80"></div>
              )}
            </NavLink>
          ))}
        </div>
        
        {showRightArrow && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
            onClick={scrollRight}
            aria-label="Scroll tabs right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavigationTabs;
