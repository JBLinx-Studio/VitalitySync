
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';
import { useNavigation, NavigationItem } from '@/hooks/use-navigation';
import { animations } from '@/utils/animation';

interface HeaderNavigationProps {
  navItems: NavigationItem[];
}

const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ navItems }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isTablet } = useViewport();
  
  const { 
    showScrollButtons, 
    setContainerElement, 
    scrollNav,
    isActive 
  } = useNavigation(navItems);

  // Set container element for navigation hook
  React.useEffect(() => {
    if (navRef.current) {
      setContainerElement(navRef.current);
    }
  }, [setContainerElement]);
  
  // Add hover effects to items
  React.useEffect(() => {
    if (!navRef.current) return;
    
    const items = navRef.current.querySelectorAll('.nav-item');
    
    const hoverListeners = Array.from(items).map(item => {
      const handleMouseEnter = () => {
        const indicator = item.querySelector('.nav-indicator');
        if (indicator instanceof HTMLElement) {
          animations.scaleIn(indicator, 150);
        }
      };
      
      const handleMouseLeave = () => {
        const indicator = item.querySelector('.nav-indicator');
        if (!item.classList.contains('active') && indicator instanceof HTMLElement) {
          animations.fadeOut(indicator, 150);
        }
      };
      
      item.addEventListener('mouseenter', handleMouseEnter);
      item.addEventListener('mouseleave', handleMouseLeave);
      
      return { item, handleMouseEnter, handleMouseLeave };
    });
    
    // Cleanup
    return () => {
      hoverListeners.forEach(({ item, handleMouseEnter, handleMouseLeave }) => {
        item.removeEventListener('mouseenter', handleMouseEnter);
        item.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [navItems]);

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
            className="absolute left-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-md opacity-90 hover:opacity-100 transition-opacity"
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
            className="flex items-center space-x-3 overflow-x-auto scrollbar-none px-8 py-2 max-w-full scroll-smooth"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "nav-item flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all duration-300 whitespace-nowrap relative",
                    active 
                      ? "active bg-gradient-to-r from-health-primary/20 to-health-secondary/20 text-health-primary font-medium shadow-sm" 
                      : "text-gray-600 hover:bg-health-primary/10 dark:text-gray-300 dark:hover:text-health-primary"
                  )}
                >
                  <span className="z-10">{item.icon}</span>
                  <span className="z-10">{item.label}</span>
                  {active && (
                    <span className="nav-indicator absolute inset-0 rounded-full bg-gradient-to-r from-health-primary/10 to-health-secondary/10 animate-pulse-slow"></span>
                  )}
                </Link>
              );
            })}
          </nav>
          
          {/* Elegant fade gradients at the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Right scroll button */}
        {showScrollButtons && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-md opacity-90 hover:opacity-100 transition-opacity"
            onClick={() => scrollNav('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Mobile Navigation - Horizontal scrolling tabs */}
      <div className="md:hidden w-full overflow-x-auto scrollbar-none py-2 px-1 snap-mandatory snap-x flex gap-2">
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
                  : "bg-white/20 dark:bg-gray-800/40 hover:bg-health-primary/10"
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
