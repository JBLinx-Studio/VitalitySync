
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks';
import { motion } from '@/utils/animation';
import { useNavigation, NavigationItem } from '@/hooks/use-navigation';

interface MainNavigationProps {
  navItems: NavigationItem[];
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ navItems, className = '' }) => {
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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

  return (
    <nav className={cn(
      "relative flex-grow z-10 backdrop-blur-md rounded-full shadow-md bg-white/15 dark:bg-black/15 border border-white/20 dark:border-gray-800/50",
      className
    )}>
      <div className="relative flex items-center justify-center px-1 py-1 h-12">
        {/* Left scroll button */}
        {showScrollButtons && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-1 z-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full shadow-md opacity-90 hover:opacity-100"
            onClick={() => scrollNav('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        
        {/* Navigation items */}
        <div 
          ref={navRef}
          className="flex items-center space-x-2 overflow-x-auto scrollbar-none scroll-smooth max-w-full px-10 py-1"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
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
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-health-primary/20 to-health-secondary/20"></span>
                    <motion.span 
                      className="absolute inset-0 bg-white/30 dark:bg-white/10 rounded-full"
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
            className="absolute right-1 z-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full shadow-md opacity-90 hover:opacity-100"
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
