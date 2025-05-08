
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
  
  // Determine if scroll arrows should be shown
  const checkForArrows = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setShowLeftArrow(container.scrollLeft > 20);
    setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth - 20);
  };
  
  // Scroll active tab into view
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const activeTab = container.querySelector('.active-tab');
    if (activeTab) {
      const tabRect = activeTab.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Check if the active tab is not fully visible
      if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
    
    // Check arrows after scroll
    setTimeout(checkForArrows, 300);
  }, [location.pathname]);
  
  // Monitor scroll to show/hide scroll arrows
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = throttle(() => {
      checkForArrows();
    }, 100);
    
    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    // Initial check
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
    <div className={cn("flex items-center", className)}>
      {showLeftArrow && !isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 bg-background/50 backdrop-blur-sm rounded-full p-2"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}
      
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-none scroll-smooth gap-1 px-1 py-2"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => 
              cn(
                "flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full transition-colors text-sm font-medium",
                isActive 
                  ? "bg-health-primary text-white shadow-glow active-tab"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10",
                isMobile ? "flex-grow justify-center" : ""
              )
            }
          >
            {tab.icon}
            <span>{tab.name}</span>
          </NavLink>
        ))}
      </div>
      
      {showRightArrow && !isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0 bg-background/50 backdrop-blur-sm rounded-full p-2"
          onClick={scrollRight}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default NavigationTabs;
