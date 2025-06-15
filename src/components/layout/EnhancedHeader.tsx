
import React, { useState, useEffect, useCallback } from 'react';
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
  Users,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { UserAvatar } from '@/components/common';
import { useIsMobile, useViewport } from '@/hooks';
import { cn } from '@/lib/utils';
import AdvancedOptionsMenu from './AdvancedOptionsMenu';
import ModernNavigation from './ModernNavigation';
import GlassCard from '@/components/ui/glass-card';

const EnhancedHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { userProfile } = useHealth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { width } = useViewport();

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 10;
    setIsScrolled(scrolled);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/dashboard", icon: <TrendingUp className="w-4 h-4" />, name: "Dashboard", category: 'dashboard' as const },
    { path: "/food", icon: <Utensils className="w-4 h-4" />, name: "Nutrition", category: 'tracking' as const },
    { path: "/exercise", icon: <Activity className="w-4 h-4" />, name: "Fitness", category: 'tracking' as const },
    { path: "/sleep", icon: <Moon className="w-4 h-4" />, name: "Sleep", category: 'tracking' as const },
    { path: "/body", icon: <Ruler className="w-4 h-4" />, name: "Body", category: 'tracking' as const },
    { path: "/mental", icon: <Brain className="w-4 h-4" />, name: "Mental", category: 'wellness' as const },
    { path: "/community", icon: <Users className="w-4 h-4" />, name: "Community", category: 'social' as const },
    { path: "/achievements", icon: <Award className="w-4 h-4" />, name: "Achievements", category: 'social' as const },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        isScrolled 
          ? "py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl shadow-2xl border-b border-white/20 dark:border-slate-700/20" 
          : "py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Enhanced Logo with Dynamic Sizing */}
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0 group min-w-fit"
          >
            <div className="relative">
              <div className={cn(
                "rounded-2xl bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                isMobile ? "w-8 h-8" : "w-10 h-10 lg:w-12 lg:h-12"
              )}>
                <Zap className={cn(
                  "text-white drop-shadow-lg",
                  isMobile ? "w-4 h-4" : "w-5 h-5 lg:w-6 lg:h-6"
                )} />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-all duration-500 -z-10"></div>
            </div>
            <div className="hidden xs:flex flex-col">
              <span className={cn(
                "font-black bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight",
                isMobile ? "text-base" : "text-lg lg:text-xl"
              )}>
                VitalitySync
              </span>
              <span className={cn(
                "text-gray-500 dark:text-gray-400 font-medium tracking-wide leading-tight",
                isMobile ? "text-xs" : "text-xs lg:text-sm"
              )}>
                Health Intelligence
              </span>
            </div>
          </Link>

          {/* Modern Navigation - Hidden on very small screens */}
          <div className="hidden sm:flex items-center justify-center flex-1 max-w-4xl mx-2 lg:mx-6">
            <ModernNavigation items={navItems} />
          </div>

          {/* Advanced Action Bar with Dynamic Sizing */}
          <div className={cn(
            "flex items-center gap-1 sm:gap-2 flex-shrink-0",
            isMobile ? "min-w-fit" : ""
          )}>
            {/* Notifications - Conditional Display */}
            {!isMobile && (
              <div className="hidden md:block">
                <NotificationsMenu />
              </div>
            )}

            {/* Advanced Options Menu */}
            <AdvancedOptionsMenu userLoggedIn={!!userProfile} />

            {/* Enhanced User Profile Button */}
            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-60 blur-md transition-all duration-500 -z-10"></div>
                <div className="relative transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <UserAvatar 
                    userProfile={userProfile} 
                    size={isMobile ? "sm" : "md"} 
                    className="ring-2 ring-white/30 dark:ring-slate-700/30 group-hover:ring-emerald-400/50"
                  />
                </div>
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className={cn(
                    "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white border-0 rounded-xl font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95",
                    isMobile ? "px-2 py-1.5 text-xs h-8" : "px-4 py-2 text-sm h-9 lg:px-6 lg:text-base lg:h-10"
                  )}
                >
                  {isMobile ? (
                    <User className="w-3 h-3" />
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              className={cn(
                "sm:hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95",
                isMobile ? "h-8 w-8" : "h-9 w-9"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 
                <X className="w-4 h-4" /> : 
                <Menu className="w-4 h-4" />
              }
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation Bar */}
        <div className="sm:hidden mt-2">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-1 px-1 py-2 min-w-max">
              {navItems.slice(0, 6).map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-2 rounded-xl transition-all duration-300 flex-shrink-0 whitespace-nowrap text-xs font-medium border relative overflow-hidden group min-w-fit",
                      isActive 
                        ? "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white shadow-lg border-white/20 scale-105" 
                        : "bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-gray-200/40 dark:border-gray-700/40 hover:scale-105"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                    <span className={cn("transition-transform duration-300 relative z-10", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <span className="relative z-10 truncate">{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-white/80 rounded-full animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 transform transition-all duration-500 sm:hidden",
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 bottom-0 w-72 max-w-[85vw]">
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-2xl border-r-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Navigation
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 bg-white/20 dark:bg-slate-800/20 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 border border-white/20 dark:border-slate-700/20 hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group",
                      isActive 
                        ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 scale-105' 
                        : 'hover:bg-white/20 dark:hover:bg-slate-800/20 hover:scale-105 border border-transparent'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-105")}>{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="border-t border-white/20 dark:border-slate-700/20 pt-4 mt-6 space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-300 hover:scale-105 border border-transparent group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4 group-hover:scale-105 transition-transform" />
                <span className="font-medium">Profile</span>
              </Link>
              <div className="px-3">
                <NotificationsMenu />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;
