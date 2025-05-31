
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  color?: string;
}

interface ModernNavigationProps {
  items: NavItem[];
  className?: string;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftScroll(scrollLeft > 10);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const currentIndex = items.findIndex(item => 
      location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, items]);

  useEffect(() => {
    checkScrollButtons();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollButtons);
      return () => scrollElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className={cn("relative bg-white/5 dark:bg-slate-900/5 backdrop-blur-2xl rounded-3xl border border-white/10 dark:border-slate-700/10 p-2 shadow-2xl", className)}>
      <div className="relative flex items-center">
        {showLeftScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 z-20 h-8 w-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-white/20 dark:border-slate-600/20"
            onClick={() => scrollToDirection('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none gap-1 px-12 py-2 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.map((item, index) => {
            const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 whitespace-nowrap relative overflow-hidden group",
                  "min-w-fit hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-blue-500/25 scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-white/10 dark:hover:bg-slate-800/10 hover:scale-105"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className={cn(
                  "transition-all duration-300 relative z-10",
                  isActive ? "scale-110 drop-shadow-lg" : "group-hover:scale-110"
                )}>
                  {item.icon}
                </span>
                <span className="font-semibold relative z-10">{item.name}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/80 rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </div>

        {showRightScroll && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 z-20 h-8 w-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-white/20 dark:border-slate-600/20"
            onClick={() => scrollToDirection('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active indicator line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full"></div>
    </div>
  );
};

export default ModernNavigation;
