
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
import OptionsMenu from '@/components/ui/options-menu';
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
    { path: "/dashboard", icon: <TrendingUp className="w-5 h-5" />, name: "Dashboard", category: 'dashboard' as const },
    { path: "/food", icon: <Utensils className="w-5 h-5" />, name: "Nutrition", category: 'tracking' as const },
    { path: "/exercise", icon: <Activity className="w-5 h-5" />, name: "Fitness", category: 'tracking' as const },
    { path: "/sleep", icon: <Moon className="w-5 h-5" />, name: "Sleep", category: 'tracking' as const },
    { path: "/body", icon: <Ruler className="w-5 h-5" />, name: "Body", category: 'tracking' as const },
    { path: "/mental", icon: <Brain className="w-5 h-5" />, name: "Mental", category: 'wellness' as const },
    { path: "/community", icon: <Users className="w-5 h-5" />, name: "Community", category: 'social' as const },
    { path: "/achievements", icon: <Award className="w-5 h-5" />, name: "Achievements", category: 'social' as const },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-700",
        scrolled 
          ? "py-2 bg-white/98 dark:bg-slate-900/98 backdrop-blur-3xl shadow-2xl border-b-2 border-white/30 dark:border-slate-700/30" 
          : "py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Enhanced Logo with better icon */}
          <Link 
            to="/" 
            className="flex items-center gap-4 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-3xl bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Zap className="text-white w-6 h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500"></div>
              {/* Pulsing ring effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400/30 via-blue-500/30 to-purple-600/30 rounded-3xl opacity-0 group-hover:opacity-100 animate-ping"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                VitalitySync
              </span>
              <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-bold tracking-wide">
                Health Intelligence
              </span>
            </div>
          </Link>

          {/* Compact Navigation - Enhanced spacing */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-5xl mx-8">
            <CompactNavigation items={navItems} />
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            <OptionsMenu userLoggedIn={!!userProfile} />

            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-lg transition-all duration-500"></div>
                <div className="relative transform transition-transform duration-300 group-hover:scale-110">
                  <UserAvatar userProfile={userProfile} />
                </div>
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className={cn(
                    "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 hover:shadow-2xl transition-all duration-500 text-white border-0 hover:scale-110 rounded-2xl font-bold tracking-wide",
                    isMobile ? "px-4 py-2.5 text-sm" : "px-8 py-3 text-base"
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
              className="md:hidden bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-2 border-white/40 dark:border-slate-700/40 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation Bar */}
        <div className="md:hidden mt-4">
          <div className="overflow-x-auto scrollbar-none">
            <div className="flex gap-2 px-2 py-3 min-w-max">
              {navItems.slice(0, 6).map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-500 flex-shrink-0 whitespace-nowrap text-sm font-bold border-2 relative overflow-hidden group",
                      isActive 
                        ? "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white shadow-2xl border-white/30 scale-105" 
                        : "bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-700/90 border-gray-200/60 dark:border-gray-700/60 hover:scale-105"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                    <span className={cn("transition-transform duration-300 relative z-10", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1.5 bg-white/90 rounded-full animate-pulse"></div>
                    )}
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
