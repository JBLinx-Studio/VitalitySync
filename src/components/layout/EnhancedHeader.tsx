
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Apple, 
  Dumbbell, 
  Moon, 
  Brain, 
  Target, 
  Trophy,
  Settings,
  Sparkles,
  Zap,
  Flame,
  Heart,
  Activity,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useHealth } from '@/contexts/HealthContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';
import EnhancedUserMenu from '@/components/navigation/EnhancedUserMenu';

const EnhancedHeader: React.FC = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { getUnreadNotificationsCount } = useHealth();
  const { isMobile, isTablet } = useViewport();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: Home,
      color: 'from-orange-500 to-amber-500',
      description: 'Your health overview'
    },
    {
      path: '/food',
      label: 'Nutrition',
      icon: Apple,
      color: 'from-green-500 to-emerald-500',
      description: 'Track your meals'
    },
    {
      path: '/exercise',
      label: 'Fitness',
      icon: Dumbbell,
      color: 'from-blue-500 to-cyan-500',
      description: 'Workout tracking'
    },
    {
      path: '/sleep',
      label: 'Sleep',
      icon: Moon,
      color: 'from-indigo-500 to-purple-500',
      description: 'Rest & recovery'
    },
    {
      path: '/mental',
      label: 'Wellness',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: 'Mental health'
    },
    {
      path: '/achievements',
      label: 'Goals',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      description: 'Your achievements'
    }
  ];

  const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-700",
      scrolled 
        ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl border-b border-orange-200/30 dark:border-orange-700/30 shadow-vibrant" 
        : "bg-transparent"
    )}>
      <div className="relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-amber-500/5 to-orange-600/5 dark:from-orange-400/5 dark:via-amber-400/5 dark:to-orange-500/5 animate-gradient-shift"></div>
        
        <div className="relative container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <Link to="/" className="group flex items-center gap-3 hover:scale-105 transition-all duration-500">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-vibrant transition-shadow duration-500 group-hover:shadow-vibrant-glow">
                  <TrendingUp className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                  VitalitySync
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Premium Health Intelligence
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="hidden lg:flex items-center gap-2">
                <div className="flex items-center gap-1 p-2 bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-3xl border border-orange-200/30 dark:border-orange-700/30 shadow-lg">
                  {navigationItems.map((item) => {
                    const isActive = currentPath === item.path || (item.path === '/' && (currentPath === '/' || currentPath === ''));
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={cn(
                          "group relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 font-semibold text-sm overflow-hidden",
                          isActive 
                            ? `bg-gradient-to-r ${item.color} text-white shadow-vibrant scale-105` 
                            : "text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:scale-105"
                        )}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-energy-flow"></div>
                        
                        <item.icon className={cn("w-4 h-4 relative z-10")} />
                        <span className="relative z-10">{item.label}</span>
                        
                        {isActive && (
                          <>
                            <Zap className="w-3 h-3 text-white/80 animate-pulse relative z-10" />
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Premium Badge */}
              <Badge className="hidden sm:flex bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1 shadow-lg animate-pulse">
                <Heart className="w-3 h-3 mr-1" />
                Premium
              </Badge>

              {/* Enhanced User Menu */}
              <EnhancedUserMenu />

              {/* Mobile Menu Button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-orange-200/30 dark:border-orange-700/30 shadow-lg hover:shadow-vibrant transition-all duration-300"
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  ) : (
                    <Menu className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMobile && isMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-orange-200/30 dark:border-orange-700/30 shadow-2xl animate-fade-in z-50 overflow-hidden">
              <div className="p-6 space-y-2">
                {navigationItems.map((item, index) => {
                  const isActive = currentPath === item.path || (item.path === '/' && (currentPath === '/' || currentPath === ''));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 font-semibold relative overflow-hidden",
                        isActive 
                          ? `bg-gradient-to-r ${item.color} text-white shadow-vibrant` 
                          : "text-gray-700 dark:text-gray-300 hover:bg-orange-50/80 dark:hover:bg-slate-800/80"
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Background glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12"></div>
                      
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center relative z-10",
                        isActive 
                          ? "bg-white/20 shadow-lg" 
                          : "bg-orange-100/80 dark:bg-orange-900/80"
                      )}>
                        <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-orange-600 dark:text-orange-400")} />
                      </div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{item.label}</span>
                          {isActive && <Activity className="w-4 h-4 animate-pulse" />}
                        </div>
                        <p className={cn(
                          "text-sm opacity-80",
                          isActive ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                        )}>
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;
