
import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  label: string;
}

interface HeaderNavigationProps {
  navItems: NavItem[];
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ navItems }) => {
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isMobile, isTablet } = useViewport();

  // Check if we need scroll buttons
  useEffect(() => {
    const checkForScrollButtons = () => {
      if (!navRef.current || !navContainerRef.current) return;
      
      const { scrollWidth, clientWidth } = navRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
    };
    
    // Initial check
    checkForScrollButtons();
    
    // Setup resize observer for responsive updates
    const resizeObserver = new ResizeObserver(checkForScrollButtons);
    if (navContainerRef.current) {
      resizeObserver.observe(navContainerRef.current);
    }
    
    return () => {
      if (navContainerRef.current) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navRef.current) return;
    
    const scrollAmount = navRef.current.clientWidth / 2; // Half the visible width
    const newPosition = direction === 'left' 
      ? Math.max(0, navRef.current.scrollLeft - scrollAmount)
      : navRef.current.scrollLeft + scrollAmount;
      
    navRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };

  const isActive = (path: string) => {
    // Adjust for GitHub Pages base path
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    const targetPath = path === '/' ? '/' : path;
    
    return currentPath === targetPath;
  };

  return (
    <div className="relative flex-grow">
      {/* Desktop Navigation with scroll buttons */}
      <div 
        ref={navContainerRef}
        className="hidden md:flex items-center justify-center mx-4 relative"
      >
        {/* Left scroll button */}
        {showScrollButtons && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md opacity-90 hover:opacity-100"
            onClick={() => scrollNav('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        {/* Navigation bar with visual indicator */}
        <div className="w-full overflow-hidden relative">
          <nav 
            ref={navRef}
            className="flex items-center space-x-2 overflow-x-auto scrollbar-none px-10 py-2 max-w-full scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap relative",
                  isActive(item.path) 
                    ? "bg-gradient-to-r from-health-primary/20 to-health-secondary/20 text-health-primary font-medium shadow-sm" 
                    : "text-gray-600 hover:bg-health-primary/10 dark:text-gray-300 dark:hover:text-health-primary"
                )}
              >
                <span className="z-10">{item.icon}</span>
                <span className="z-10">{item.label}</span>
                {isActive(item.path) && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-health-primary/10 to-health-secondary/10 animate-pulse-slow"></span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Elegant fade gradients at the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Right scroll button */}
        {showScrollButtons && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md opacity-90 hover:opacity-100"
            onClick={() => scrollNav('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Mobile Navigation - Horizontal scrolling tabs */}
      <div className="md:hidden w-full overflow-x-auto scrollbar-none py-2 px-1 snap-mandatory snap-x flex gap-1.5">
        {navItems.map((item) => {
          const isItemActive = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-1.5 px-3 py-2 rounded-full transition-all duration-300 flex-shrink-0 snap-center whitespace-nowrap",
                isItemActive 
                  ? "bg-gradient-to-r from-health-primary/20 to-health-secondary/20 text-health-primary font-medium shadow-sm" 
                  : "bg-white/10 dark:bg-gray-800/30 hover:bg-health-primary/10"
              )}
            >
              <span className={cn("transition-transform", isItemActive ? "scale-110" : "")}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HeaderNavigation;
