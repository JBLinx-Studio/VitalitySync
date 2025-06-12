
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
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
    
    // Set active category based on current route
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    setActiveCategory(currentPath);
  }, [location.pathname]);

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
    // Adjust for GitHub Pages base path
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    const targetPath = path === '/' ? '/' : path;
    
    return currentPath === targetPath;
  };

  // Handle scroll navigation for categories navbar
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

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <UltraCard className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-health-primary to-health-secondary shadow-glow">
              <span className="text-white font-bold text-xl">V</span>
            </UltraCard>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
              VitalitySync
            </span>
          </Link>

          {/* Desktop Navigation with scroll buttons */}
          <div 
            ref={navContainerRef}
            className="hidden md:flex items-center justify-center flex-grow mx-4 relative"
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

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Notifications */}
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            {/* Options Menu (includes Theme Toggle) */}
            <OptionsMenu userLoggedIn={!!userProfile} />

            {/* Profile */}
            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-health-primary to-health-secondary rounded-full opacity-25 group-hover:opacity-50 blur transition duration-300"></div>
                <UserAvatar userProfile={userProfile} />
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className={cn(
                    "bg-gradient-to-r from-health-primary to-health-secondary hover:shadow-glow transition-all text-white",
                    isMobile ? "px-2 py-1 text-xs" : "px-4 py-2"
                  )}
                  size={isMobile ? "sm" : "default"}
                >
                  {isMobile ? "Start" : "Get Started"}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="outline"
              size="icon"
              className="md:hidden border-health-primary/20 hover:border-health-primary/40 hover:bg-health-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Tabs Navigation - Always visible on mobile */}
        <div className="md:hidden mt-2 relative">
          <div className="overflow-x-auto scrollbar-none py-2 px-1 snap-mandatory snap-x flex gap-1.5">
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
          {/* Improved fade gradients at ends to indicate scrollable content */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
        </div>
      </div>

      {/* Enhanced Mobile Menu with blur backdrop */}
      <div
        className={`fixed inset-0 z-40 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 md:hidden`}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-md" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-950/95 backdrop-blur-lg shadow-xl flex flex-col">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <span className="text-lg font-medium bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">Menu</span>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-5 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-xl ${
                  location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path 
                    ? 'bg-gradient-to-r from-health-primary/20 to-health-secondary/20 text-health-primary font-medium shadow-inner' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5 mt-5 space-y-2">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Settings</span>
              </Link>

              {/* Mobile Notifications access */}
              <div className="p-3">
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
