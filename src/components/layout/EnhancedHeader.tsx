
import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Heart,
  TrendingUp,
  Waves
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { useIsMobile, useViewport } from '@/hooks';
import { cn } from '@/lib/utils';
import { debounce, throttle } from '@/utils/performance';
import OptionsMenu from '@/components/ui/options-menu';
import GlassCard from '@/components/ui/glass-card';
import AdvancedNavigationMenu from '@/components/navigation/AdvancedNavigationMenu';
import EnhancedUserMenu from '@/components/navigation/EnhancedUserMenu';

const EnhancedHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile } = useHealth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { width } = useViewport();

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(
    throttle(() => {
      setScrolled(window.scrollY > 20);
    }, 100),
    []
  );

  // Optimized mobile menu close handler
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  // Memoized navigation items for better performance with updated categories
  const navItems = useMemo(() => [
    { path: "/dashboard", icon: <TrendingUp className="w-5 h-5" />, name: "Dashboard", category: 'core' as const },
    { path: "/food", icon: <Utensils className="w-5 h-5" />, name: "Nutrition", category: 'health' as const },
    { path: "/exercise", icon: <Activity className="w-5 h-5" />, name: "Fitness", category: 'health' as const },
    { path: "/sleep", icon: <Moon className="w-5 h-5" />, name: "Sleep", category: 'health' as const },
    { path: "/body", icon: <Ruler className="w-5 h-5" />, name: "Body", category: 'health' as const },
    { path: "/mental", icon: <Brain className="w-5 h-5" />, name: "Mental", category: 'wellness' as const },
    { path: "/community", icon: <Users className="w-5 h-5" />, name: "Community", category: 'social' as const },
    { path: "/achievements", icon: <Award className="w-5 h-5" />, name: "Achievements", category: 'social' as const },
  ], []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled 
          ? "py-2 bg-white/98 dark:bg-slate-900/98 backdrop-blur-3xl shadow-xl border-b border-slate-200/50 dark:border-slate-700/50" 
          : "py-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl"
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between gap-6">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-400 via-teal-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700"></div>
              
              <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-105 relative z-10">
                <Heart className="text-white w-5 h-5 lg:w-6 lg:h-6 drop-shadow-sm" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            <div className="hidden sm:flex flex-col">
              <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                VitalitySync
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Health Intelligence
              </span>
            </div>
          </Link>

          {/* Advanced Navigation Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-4xl mx-6">
            <AdvancedNavigationMenu items={navItems} />
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Notifications - Hidden on small screens */}
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            {/* Options Menu */}
            <OptionsMenu userLoggedIn={!!userProfile} />

            {/* Enhanced User Profile Menu */}
            <EnhancedUserMenu />

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 rounded-xl transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden mt-3">
          <AdvancedNavigationMenu items={navItems} className="w-full" />
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
          className="absolute inset-0 bg-black/60 backdrop-blur-md" 
          onClick={closeMobileMenu}
        />
        <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw]">
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-2xl border-r-0 overflow-hidden">
            {/* Enhanced header */}
            <div className="relative p-4 bg-gradient-to-r from-slate-50/90 to-blue-50/90 dark:from-slate-800/90 dark:to-slate-700/90 border-b border-slate-200/50 dark:border-slate-600/50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-md">
                    <Waves className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Navigation
                  </span>
                </div>
                <button 
                  onClick={closeMobileMenu}
                  className="rounded-lg p-2 bg-slate-100/50 dark:bg-slate-700/50 hover:bg-slate-200/50 dark:hover:bg-slate-600/50 transition-all duration-300 border border-slate-200/50 dark:border-slate-600/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4 overflow-y-auto">
              {/* Navigation items */}
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-blue-700 dark:text-blue-300 font-semibold shadow-md border border-blue-200/50 dark:border-blue-700/50' 
                          : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] border border-transparent'
                      )}
                      onClick={closeMobileMenu}
                    >
                      <span className={cn(
                        "transition-all duration-300 relative z-10",
                        isActive ? "scale-110" : "group-hover:scale-105"
                      )}>
                        {item.icon}
                      </span>
                      <span className="font-medium relative z-10">{item.name}</span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse relative z-10 ml-auto"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Additional menu items */}
              <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-4 space-y-2">
                <div className="px-3">
                  <NotificationsMenu />
                </div>
                <div className="px-3">
                  <OptionsMenu userLoggedIn={!!userProfile} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;
