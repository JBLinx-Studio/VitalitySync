
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { motion } from '@/utils/animation';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

interface MainNavigationProps {
  navItems: NavItem[];
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ navItems, className = '' }) => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // Find active index based on current location
  useEffect(() => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    const index = navItems.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location.pathname, navItems]);

  // Check if we need scroll buttons and scroll active item into view
  useEffect(() => {
    const checkForScrollButtons = () => {
      if (!navRef.current) return;
      
      const { scrollWidth, clientWidth } = navRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
      
      // Scroll active item into view
      const activeItem = navRef.current.children[activeIndex] as HTMLElement;
      if (activeItem) {
        const containerWidth = navRef.current.offsetWidth;
        const itemLeft = activeItem.offsetLeft;
        const itemWidth = activeItem.offsetWidth;
        
        // Center the active item
        navRef.current.scrollTo({
          left: itemLeft - (containerWidth / 2) + (itemWidth / 2),
          behavior: 'smooth'
        });
      }
    };
    
    // Initial check
    checkForScrollButtons();
    
    // Setup resize observer for responsive updates
    const resizeObserver = new ResizeObserver(checkForScrollButtons);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }
    
    return () => {
      if (navRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, [activeIndex]);

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navRef.current) return;
    
    const scrollAmount = navRef.current.offsetWidth * 0.75;
    const newPosition = direction === 'left' 
      ? navRef.current.scrollLeft - scrollAmount
      : navRef.current.scrollLeft + scrollAmount;
      
    navRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const isActive = (path: string, index: number) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  };

  return (
    <nav className={cn(
      "relative flex-grow z-10 backdrop-blur-sm rounded-full shadow-sm bg-white/10 dark:bg-black/10 border border-white/10 dark:border-gray-800/50",
      className
    )}>
      {/* Desktop Navigation */}
      <div className="relative flex items-center justify-center px-1 py-1 h-12">
        {/* Left scroll button */}
        {showScrollButtons && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-1 z-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-sm opacity-80 hover:opacity-100"
            onClick={() => scrollNav('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        {/* Navigation items */}
        <div 
          ref={navRef}
          className="flex items-center space-x-1 overflow-x-auto scrollbar-none scroll-smooth max-w-full px-10 py-1"
        >
          {navItems.map((item, index) => {
            const active = isActive(item.path, index);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full transition-all whitespace-nowrap relative",
                  active 
                    ? "text-health-primary font-medium" 
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                )}
              >
                <span className={cn("transition-transform", active ? "scale-110" : "")}>{item.icon}</span>
                <span>{item.label}</span>
                {active && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-health-primary/10 to-health-secondary/10"></span>
                    <motion.span 
                      className="absolute inset-0 bg-white/20 dark:bg-white/5 rounded-full"
                      layoutId="nav-highlight"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  </>
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Right scroll button */}
        {showScrollButtons && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 z-10 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full shadow-sm opacity-80 hover:opacity-100"
            onClick={() => scrollNav('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
