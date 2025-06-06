
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
  Target,
  Sparkles
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
      description: "Analytics & insights dashboard"
    },
    { 
      path: "/food", 
      icon: <Utensils className="w-5 h-5" />, 
      name: "Nutrition", 
      category: 'tracking' as const,
      description: "Food tracking & meal planning"
    },
    { 
      path: "/exercise", 
      icon: <Activity className="w-5 h-5" />, 
      name: "Fitness", 
      category: 'tracking' as const,
      description: "Exercise & workout tracking"
    },
    { 
      path: "/sleep", 
      icon: <Moon className="w-5 h-5" />, 
      name: "Sleep", 
      category: 'tracking' as const,
      description: "Sleep quality & patterns"
    },
    { 
      path: "/body", 
      icon: <Ruler className="w-5 h-5" />, 
      name: "Body", 
      category: 'tracking' as const,
      description: "Body measurements & stats"
    },
    { 
      path: "/mental", 
      icon: <Brain className="w-5 h-5" />, 
      name: "Mental", 
      category: 'wellness' as const,
      description: "Mental health & mindfulness"
    },
    { 
      path: "/community", 
      icon: <Users className="w-5 h-5" />, 
      name: "Community", 
      category: 'social' as const,
      description: "Connect & share progress"
    },
    { 
      path: "/achievements", 
      icon: <Award className="w-5 h-5" />, 
      name: "Achievements", 
      category: 'social' as const,
      description: "Goals, badges & rewards"
    },
  ];

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-700 border-b backdrop-blur-3xl",
        scrolled 
          ? "py-2 bg-white/98 dark:bg-slate-900/98 shadow-xl border-gray-200/40 dark:border-slate-700/40" 
          : "py-4 bg-white/95 dark:bg-slate-900/95 border-gray-200/30 dark:border-slate-700/30 shadow-lg"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Premium Logo Design */}
          <Link 
            to="/" 
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <div className="relative">
              {/* Animated glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-700 animate-pulse-soft"></div>
              
              {/* Main logo container */}
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl group-hover:shadow-cosmic transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 border border-white/20">
                <Heart className="text-white w-6 h-6 lg:w-7 lg:h-7 drop-shadow-2xl" />
                
                {/* Sparkle effect */}
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
              </div>
            </div>
            
            <div className="hidden sm:flex flex-col">
              <span className="text-xl lg:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                VitalitySync
              </span>
              <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-semibold tracking-wider opacity-80">
                Health Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Sophisticated Navigation Menu */}
          <div className="hidden md:flex items-center justify-center flex-1 max-w-5xl mx-8">
            <ModernNavigationMenu items={navItems} />
          </div>

          {/* Premium Action Controls */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Enhanced Notifications */}
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            {/* Sophisticated Options Menu */}
            <OptionsMenu userLoggedIn={!!userProfile} />

            {/* Professional User Profile */}
            <ProfessionalUserMenu />

            {/* Premium Mobile Menu Toggle */}
            <Button 
              variant="ghost"
              size="icon"
              className={cn(
                "md:hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-lg group",
                mobileMenuOpen && "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative">
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                )}
              </div>
            </Button>
          </div>
        </div>
        
        {/* Enhanced Mobile Navigation Panel */}
        <div className="md:hidden mt-4">
          <ModernNavigationMenu items={navItems} className="w-full" />
        </div>
      </div>

      {/* Sophisticated Mobile Overlay Menu */}
      <div
        className={cn(
          "fixed inset-0 z-50 transform transition-all duration-700 md:hidden",
          mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        )}
      >
        {/* Enhanced backdrop with blur */}
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-md" 
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Premium sliding panel */}
        <div className={cn(
          "absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] transform transition-transform duration-700",
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <GlassCard variant="premium" className="h-full rounded-none rounded-l-3xl border-r-0 shadow-2xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl">
            {/* Header with sophisticated styling */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200/50 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Menu className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Navigation
                </span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl p-3 bg-gray-100/80 dark:bg-slate-800/80 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 border border-gray-200/50 dark:border-slate-700/50 hover:scale-105"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Enhanced navigation items */}
            <nav className="space-y-3">
              {navItems.map((item) => {
                const isActive = location.pathname.replace('/Health-and-Fitness-Webapp', '') === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group border",
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 text-blue-600 dark:text-blue-400 font-semibold shadow-xl border-blue-200/50 dark:border-blue-700/50 scale-105' 
                        : 'hover:bg-gray-50/80 dark:hover:bg-slate-800/60 hover:scale-[1.02] border-transparent hover:border-gray-200/50 dark:hover:border-slate-700/50 hover:shadow-lg'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500",
                      isActive 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 scale-110" 
                        : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 group-hover:scale-110 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30"
                    )}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-base">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 opacity-80">{item.description}</div>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
            
            {/* Enhanced footer section */}
            <div className="border-t border-gray-200/50 dark:border-slate-700/50 pt-6 mt-8 space-y-4">
              <div className="px-2">
                <NotificationsMenu />
              </div>
              <div className="px-2">
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
