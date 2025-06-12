
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
  Heart
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { UserAvatar } from '@/components/common';
import { useIsMobile, useViewport } from '@/hooks';
import { cn } from '@/lib/utils';
import OptionsMenu from '@/components/common/OptionsMenu';
import CompactNavigation from './CompactNavigation';
import GlassCard from '@/components/ui/glass-card';

const EnhancedHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile } = useHealth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { width } = useViewport();

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
    { path: "/dashboard", icon: <BarChart className="w-4 h-4" />, name: "Dashboard", category: 'health' as const },
    { path: "/food", icon: <Utensils className="w-4 h-4" />, name: "Nutrition", category: 'tracking' as const },
    { path: "/exercise", icon: <Activity className="w-4 h-4" />, name: "Fitness", category: 'tracking' as const },
    { path: "/sleep", icon: <Moon className="w-4 h-4" />, name: "Sleep", category: 'tracking' as const },
    { path: "/mental", icon: <Brain className="w-4 h-4" />, name: "Mental", category: 'health' as const },
    { path: "/body", icon: <Ruler className="w-4 h-4" />, name: "Body", category: 'tracking' as const },
    { path: "/community", icon: <Users className="w-4 h-4" />, name: "Community", category: 'social' as const },
    { path: "/achievements", icon: <Award className="w-4 h-4" />, name: "Achievements", category: 'social' as const },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled 
          ? "py-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl shadow-2xl border-b border-white/20 dark:border-slate-700/20" 
          : "py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl"
      )}
    >
      <div className="container mx-auto px-3 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Heart className="text-white w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-300"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                VitalitySync
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                Health Intelligence
              </span>
            </div>
          </Link>

          {/* Compact Navigation - Only show on larger screens */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-4xl mx-4">
            <CompactNavigation items={navItems} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            <OptionsMenu userLoggedIn={!!userProfile} />

            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-70 blur transition-all duration-300"></div>
                <div className="relative">
                  <UserAvatar userProfile={userProfile} />
                </div>
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className={cn(
                    "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-105 rounded-xl",
                    isMobile ? "px-3 py-2 text-sm" : "px-6 py-2.5 text-sm font-semibold"
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
              className="md:hidden bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm border border-white/30 dark:border-slate-700/30 hover:bg-white/30 dark:hover:bg-slate-800/30 rounded-xl transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Bar */}
        <div className="md:hidden mt-3">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-1 px-1 py-2 min-w-max">
              {navItems.slice(0, 5).map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 flex-shrink-0 whitespace-nowrap text-sm font-medium border",
                      isActive 
                        ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg border-emerald-400/50" 
                        : "bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-gray-200/50 dark:border-gray-700/50"
                    )}
                  >
                    <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <span>{item.name}</span>
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
          "fixed inset-0 z-50 transform transition-transform duration-500 md:hidden",
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div 
          className="absolute inset-0 bg-black/70 backdrop-blur-md" 
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw]">
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-3xl border-r-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Navigation
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 bg-white/20 dark:bg-slate-800/20 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-colors border border-white/30 dark:border-slate-700/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                      isActive 
                        ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-lg border border-emerald-200/50 dark:border-emerald-700/50' 
                        : 'hover:bg-white/20 dark:hover:bg-slate-800/20 hover:scale-[1.02] border border-transparent'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="border-t border-white/20 dark:border-slate-700/20 pt-4 mt-6 space-y-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-300 hover:scale-[1.02] border border-transparent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-4 h-4" />
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
