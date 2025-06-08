
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Activity, 
  Utensils, 
  BarChart, 
  Moon, 
  Brain, 
  Ruler, 
  Menu, 
  X,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { UltraCard } from '@/components/ui/card';
import { UserAvatar } from '@/components/common';
import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';
import OptionsMenu from '@/components/common/OptionsMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile } = useHealth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [scrollPosition, setScrollPosition] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');

  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    setActiveCategory(currentPath);
  }, [location.pathname]);

  useEffect(() => {
    const checkForScrollButtons = () => {
      if (!navRef.current || !navContainerRef.current) return;
      const { scrollWidth, clientWidth } = navRef.current;
      setShowScrollButtons(scrollWidth > clientWidth);
    };
    
    checkForScrollButtons();
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

  const navItems = [
    { path: "/dashboard", icon: <BarChart className="w-5 h-5" />, label: "Dashboard" },
    { path: "/food", icon: <Utensils className="w-5 h-5" />, label: "Nutrition" },
    { path: "/exercise", icon: <Activity className="w-5 h-5" />, label: "Fitness" },
    { path: "/sleep", icon: <Moon className="w-5 h-5" />, label: "Sleep" },
    { path: "/mental", icon: <Brain className="w-5 h-5" />, label: "Mental" },
    { path: "/body", icon: <Ruler className="w-5 h-5" />, label: "Body" },
    { path: "/achievements", icon: <Award className="w-5 h-5" />, label: "Achievements" },
  ];

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    const targetPath = path === '/' ? '/' : path;
    return currentPath === targetPath;
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (!navRef.current) return;
    const scrollAmount = navRef.current.clientWidth / 2;
    const newPosition = direction === 'left' 
      ? Math.max(0, navRef.current.scrollLeft - scrollAmount)
      : navRef.current.scrollLeft + scrollAmount;
      
    navRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    setScrollPosition(newPosition);
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'py-4 bg-gradient-to-r from-white/90 to-gray-50/90 dark:from-slate-900/90 dark:to-slate-800/90 backdrop-blur-lg'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                VitalitySync
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Health & Wellness</span>
            </div>
          </Link>

          <div 
            ref={navContainerRef}
            className="hidden md:flex items-center justify-center flex-grow mx-6 relative"
          >
            {showScrollButtons && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                onClick={() => scrollNav('left')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            
            <div className="w-full overflow-hidden relative">
              <nav 
                ref={navRef}
                className="flex items-center space-x-1 overflow-x-auto scrollbar-none px-12 py-3 max-w-full scroll-smooth"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 whitespace-nowrap relative group",
                      isActive(item.path) 
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-blue-600 dark:text-blue-400 font-medium shadow-lg backdrop-blur-sm" 
                        : "text-gray-600 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-slate-800/70 hover:shadow-md backdrop-blur-sm"
                    )}
                  >
                    <span className={cn("transition-transform duration-300", isActive(item.path) ? "scale-110" : "group-hover:scale-105")}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.path) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    )}
                  </Link>
                ))}
              </nav>
              
              <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
            </div>
            
            {showScrollButtons && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 z-10 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                onClick={() => scrollNav('right')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            <OptionsMenu userLoggedIn={!!userProfile} />

            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition-all duration-300"></div>
                <div className="relative">
                  <UserAvatar userProfile={userProfile} />
                </div>
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className={cn(
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-105",
                    isMobile ? "px-3 py-2 text-sm" : "px-6 py-2.5"
                  )}
                  size={isMobile ? "sm" : "default"}
                >
                  {isMobile ? "Start" : "Get Started"}
                </Button>
              </Link>
            )}

            <Button 
              variant="outline"
              size="icon"
              className="md:hidden border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        <div className="md:hidden mt-3 relative">
          <div className="overflow-x-auto scrollbar-none py-2 px-1 flex gap-2">
            {navItems.map((item) => {
              const isItemActive = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 flex-shrink-0 whitespace-nowrap",
                    isItemActive 
                      ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-blue-600 dark:text-blue-400 font-medium shadow-lg" 
                      : "bg-white/70 dark:bg-slate-800/70 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 backdrop-blur-sm shadow-md"
                  )}
                >
                  <span className={cn("transition-transform", isItemActive ? "scale-110" : "")}>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 md:hidden`}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col border-l border-gray-200/50 dark:border-gray-700/50">
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
            <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Navigation</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 p-4 rounded-xl transition-all duration-300",
                  location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path 
                    ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-blue-600 dark:text-blue-400 font-medium shadow-lg' 
                    : 'hover:bg-gray-100/70 dark:hover:bg-slate-800/70 hover:shadow-md'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-6 mt-6 space-y-2">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-4 rounded-xl hover:bg-gray-100/70 dark:hover:bg-slate-800/70 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <div className="p-4">
                <NotificationsMenu />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
