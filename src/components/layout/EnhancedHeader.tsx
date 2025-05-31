
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
  Sparkles
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { UserAvatar } from '@/components/common';
import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';
import OptionsMenu from '@/components/common/OptionsMenu';
import ModernNavigation from './modern-navigation';
import GlassCard from '@/components/ui/glass-card';

const EnhancedHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile } = useHealth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/dashboard", icon: <BarChart className="w-5 h-5" />, name: "Dashboard" },
    { path: "/food", icon: <Utensils className="w-5 h-5" />, name: "Nutrition" },
    { path: "/exercise", icon: <Activity className="w-5 h-5" />, name: "Fitness" },
    { path: "/sleep", icon: <Moon className="w-5 h-5" />, name: "Sleep" },
    { path: "/mental", icon: <Brain className="w-5 h-5" />, name: "Mental" },
    { path: "/body", icon: <Ruler className="w-5 h-5" />, name: "Body" },
    { path: "/achievements", icon: <Award className="w-5 h-5" />, name: "Achievements" },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-700",
        scrolled 
          ? "py-2 bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl shadow-2xl border-b border-white/20 dark:border-slate-700/20" 
          : "py-4 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Sparkles className="text-white w-8 h-8 animate-pulse" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                VitalitySync
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium opacity-80">
                Health Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-grow mx-8">
            <ModernNavigation items={navItems} />
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            <OptionsMenu userLoggedIn={!!userProfile} />

            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-lg transition-all duration-300"></div>
                <div className="relative ring-2 ring-white/20 dark:ring-slate-700/20 rounded-full group-hover:ring-blue-500/50 transition-all duration-300">
                  <UserAvatar userProfile={userProfile} />
                </div>
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className={cn(
                    "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl transition-all duration-500 text-white border-0 hover:scale-110 rounded-2xl",
                    isMobile ? "px-4 py-2 text-sm" : "px-8 py-3 text-base font-semibold"
                  )}
                  size={isMobile ? "sm" : "default"}
                >
                  {isMobile ? "Start" : "Get Started"}
                </Button>
              </Link>
            )}

            <Button 
              variant="ghost"
              size="icon"
              className="lg:hidden bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 hover:bg-white/20 dark:hover:bg-slate-800/20 rounded-2xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation Bar */}
        <div className="lg:hidden mt-4">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-2 px-1 py-2 min-w-max">
              {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-4 py-3 rounded-2xl transition-all duration-300 flex-shrink-0 whitespace-nowrap",
                      isActive 
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-blue-600 dark:text-blue-400 font-semibold shadow-lg border border-blue-200/50 dark:border-blue-700/50" 
                        : "bg-white/10 dark:bg-slate-800/10 hover:bg-white/20 dark:hover:bg-slate-700/20 backdrop-blur-sm border border-white/10 dark:border-slate-700/10"
                    )}
                  >
                    <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 transform transition-transform duration-500 lg:hidden",
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md" 
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw]">
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-3xl border-r-0">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Navigation
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl p-3 bg-white/10 dark:bg-slate-800/10 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-colors border border-white/20 dark:border-slate-700/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300",
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-blue-600 dark:text-blue-400 font-semibold shadow-lg border border-blue-200/50 dark:border-blue-700/50 scale-105' 
                        : 'hover:bg-white/10 dark:hover:bg-slate-800/10 hover:scale-105 border border-transparent'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="border-t border-white/10 dark:border-slate-700/10 pt-6 mt-8 space-y-3">
              <Link
                to="/profile"
                className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-white/10 dark:hover:bg-slate-800/10 transition-all duration-300 hover:scale-105 border border-transparent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <div className="px-4">
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
