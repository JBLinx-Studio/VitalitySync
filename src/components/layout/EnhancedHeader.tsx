
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
  Zap,
  TrendingUp,
  Sparkles
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

  // Memoized navigation items for better performance
  const navItems = useMemo(() => [
    { path: "/dashboard", icon: <TrendingUp className="w-5 h-5" />, name: "Dashboard", category: 'dashboard' as const },
    { path: "/food", icon: <Utensils className="w-5 h-5" />, name: "Nutrition", category: 'tracking' as const },
    { path: "/exercise", icon: <Activity className="w-5 h-5" />, name: "Fitness", category: 'tracking' as const },
    { path: "/sleep", icon: <Moon className="w-5 h-5" />, name: "Sleep", category: 'tracking' as const },
    { path: "/body", icon: <Ruler className="w-5 h-5" />, name: "Body", category: 'tracking' as const },
    { path: "/mental", icon: <Brain className="w-5 h-5" />, name: "Mental", category: 'wellness' as const },
    { path: "/community", icon: <Users className="w-5 h-5" />, name: "Community", category: 'social' as const },
    { path: "/achievements", icon: <Award className="w-5 h-5" />, name: "Achievements", category: 'social' as const },
  ], []);

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
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-4 flex-shrink-0 group"
          >
            <div className="relative">
              {/* Enhanced glow effects */}
              <div className="absolute -inset-3 bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-60 blur-2xl transition-all duration-700 animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-br from-emerald-400/50 via-blue-500/50 to-purple-600/50 rounded-3xl opacity-0 group-hover:opacity-80 blur-xl transition-all duration-500"></div>
              
              {/* Main logo container */}
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-3xl bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative z-10">
                <Zap className="text-white w-6 h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Floating sparkles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" />
              </div>
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

          {/* Advanced Navigation Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-5xl mx-8">
            <AdvancedNavigationMenu items={navItems} />
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
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
              className="md:hidden bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm border-2 border-white/40 dark:border-slate-700/40 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-2xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-500/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden mt-4">
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
          className="absolute inset-0 bg-black/70 backdrop-blur-md" 
          onClick={closeMobileMenu}
        />
        <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw]">
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-3xl border-r-0 overflow-hidden">
            {/* Enhanced header */}
            <div className="relative p-6 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border-b border-white/20 dark:border-slate-700/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Navigation
                  </span>
                </div>
                <button 
                  onClick={closeMobileMenu}
                  className="rounded-xl p-2 bg-white/20 dark:bg-slate-800/20 hover:bg-white/30 dark:hover:bg-slate-800/30 transition-all duration-300 border border-white/30 dark:border-slate-700/30 hover:scale-105"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6 overflow-y-auto">
              {/* Navigation items */}
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                        isActive 
                          ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 text-emerald-600 dark:text-emerald-400 font-semibold shadow-lg border border-emerald-200/50 dark:border-emerald-700/50 scale-105' 
                          : 'hover:bg-white/20 dark:hover:bg-slate-800/20 hover:scale-[1.02] border border-transparent'
                      )}
                      onClick={closeMobileMenu}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                      <span className={cn(
                        "transition-all duration-300 relative z-10",
                        isActive ? "scale-110 drop-shadow-lg" : "group-hover:scale-110"
                      )}>
                        {item.icon}
                      </span>
                      <span className="font-medium relative z-10">{item.name}</span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse relative z-10 ml-auto"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Additional menu items */}
              <div className="border-t border-white/20 dark:border-slate-700/20 pt-4 space-y-2">
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
