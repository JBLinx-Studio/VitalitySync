
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Activity, 
  Utensils, 
  BarChart3, 
  Moon, 
  Brain, 
  Ruler, 
  Menu, 
  X,
  Award,
  Users,
  Zap,
  TrendingUp,
  Heart,
  Target
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { useIsMobile, useViewport } from '@/hooks';
import { cn } from '@/lib/utils';
import OptionsMenu from '@/components/ui/options-menu';
import GlassCard from '@/components/ui/glass-card';
import ModernNavigationMenu from '@/components/navigation/ModernNavigationMenu';
import ProfessionalUserMenu from '@/components/navigation/ProfessionalUserMenu';

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
    { 
      path: "/dashboard", 
      icon: <TrendingUp className="w-5 h-5" />, 
      name: "Dashboard", 
      category: 'overview' as const,
      description: "Overview and analytics"
    },
    { 
      path: "/food", 
      icon: <Utensils className="w-5 h-5" />, 
      name: "Nutrition", 
      category: 'tracking' as const,
      description: "Food and diet tracking"
    },
    { 
      path: "/exercise", 
      icon: <Activity className="w-5 h-5" />, 
      name: "Fitness", 
      category: 'tracking' as const,
      description: "Exercise and workouts"
    },
    { 
      path: "/sleep", 
      icon: <Moon className="w-5 h-5" />, 
      name: "Sleep", 
      category: 'tracking' as const,
      description: "Sleep quality monitoring"
    },
    { 
      path: "/body", 
      icon: <Ruler className="w-5 h-5" />, 
      name: "Body", 
      category: 'tracking' as const,
      description: "Body measurements"
    },
    { 
      path: "/mental", 
      icon: <Brain className="w-5 h-5" />, 
      name: "Mental", 
      category: 'wellness' as const,
      description: "Mental health and mood"
    },
    { 
      path: "/community", 
      icon: <Users className="w-5 h-5" />, 
      name: "Community", 
      category: 'social' as const,
      description: "Connect with others"
    },
    { 
      path: "/achievements", 
      icon: <Award className="w-5 h-5" />, 
      name: "Achievements", 
      category: 'social' as const,
      description: "Goals and rewards"
    },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 border-b backdrop-blur-2xl",
        scrolled 
          ? "py-2 bg-white/95 dark:bg-slate-900/95 shadow-lg border-gray-200/60 dark:border-slate-700/60" 
          : "py-4 bg-white/90 dark:bg-slate-900/90 border-gray-200/40 dark:border-slate-700/40"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <div className="relative">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Heart className="text-white w-6 h-6 lg:w-7 lg:h-7 drop-shadow-lg" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-40 blur-lg transition-all duration-500"></div>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                VitalitySync
              </span>
              <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-semibold tracking-wide">
                Health Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Modern Navigation Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <ModernNavigationMenu items={navItems} />
          </div>

          {/* Enhanced Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Notifications - Hidden on small screens */}
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            {/* Options Menu */}
            <OptionsMenu userLoggedIn={!!userProfile} />

            {/* Professional User Profile Menu */}
            <ProfessionalUserMenu />

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/60 dark:border-slate-700/60 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all duration-300 hover:scale-105"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation */}
        <div className="md:hidden mt-4">
          <ModernNavigationMenu items={navItems} className="w-full" />
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          onClick={() => setMobileMenuOpen(false)}
        />
        <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw]">
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-2xl border-r-0">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Navigation
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl p-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700"
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
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 font-semibold shadow-lg border border-blue-200/50 dark:border-blue-700/50' 
                        : 'hover:bg-gray-100 dark:hover:bg-slate-800/60 hover:scale-[1.02] border border-transparent'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className={cn("transition-transform duration-300", isActive ? "scale-110" : "")}>{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
            
            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 mt-6 space-y-3">
              <div className="px-3">
                <NotificationsMenu />
              </div>
              <div className="px-3">
                <OptionsMenu userLoggedIn={!!userProfile} />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </header>
  );
};

export default EnhancedHeader;
