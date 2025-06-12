
import React, { useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Activity, 
  Apple, 
  Moon, 
  Brain, 
  Ruler,
  Users,
  Award,
  Settings,
  Home,
  TrendingUp,
  Heart,
  Target,
  Calendar,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface NavCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  items: NavItem[];
}

const EnhancedCategorizedNav: React.FC = React.memo(() => {
  const location = useLocation();
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const categories: NavCategory[] = useMemo(() => [
    {
      id: 'overview',
      name: 'Overview',
      icon: BarChart3,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      items: [
        { name: 'Dashboard', path: '/dashboard', icon: Home, description: 'Your health overview' },
        { name: 'Analytics', path: '/analytics', icon: TrendingUp, description: 'Detailed insights' }
      ]
    },
    {
      id: 'tracking',
      name: 'Health Tracking',
      icon: Activity,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      items: [
        { name: 'Exercise', path: '/exercise', icon: Activity, description: 'Track workouts' },
        { name: 'Nutrition', path: '/food', icon: Apple, description: 'Monitor meals' },
        { name: 'Sleep', path: '/sleep', icon: Moon, description: 'Rest tracking' },
        { name: 'Body', path: '/body', icon: Ruler, description: 'Measurements' }
      ]
    },
    {
      id: 'wellness',
      name: 'Wellness',
      icon: Heart,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      items: [
        { name: 'Mental Health', path: '/mental', icon: Brain, description: 'Mood & wellness' },
        { name: 'Goals', path: '/goals', icon: Target, description: 'Set targets' },
        { name: 'Habits', path: '/habits', icon: Calendar, description: 'Daily routines' }
      ]
    },
    {
      id: 'social',
      name: 'Community',
      icon: Users,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      items: [
        { name: 'Community', path: '/community', icon: Users, description: 'Connect with others' },
        { name: 'Achievements', path: '/achievements', icon: Award, description: 'Your rewards' },
        { name: 'Settings', path: '/settings', icon: Settings, description: 'Preferences' }
      ]
    }
  ], []);

  const isActive = useCallback((path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path || (path === '/dashboard' && currentPath === '/');
  }, [location.pathname]);

  const getActiveCategory = useCallback(() => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    for (const category of categories) {
      if (category.items.some(item => isActive(item.path))) {
        return category.id;
      }
    }
    return null;
  }, [categories, isActive]);

  const activeCategory = getActiveCategory();

  return (
    <nav className="flex items-center justify-center">
      {/* Single gradient background with glossy overlay */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800 rounded-3xl p-1 shadow-2xl">
        <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10"></div>
        
        <div className="relative flex items-center gap-2 p-2">
          {categories.map((category) => {
            const isCurrentActive = activeCategory === category.id;
            
            return (
              <DropdownMenu 
                key={category.id}
                open={openCategory === category.id}
                onOpenChange={(open) => setOpenCategory(open ? category.id : null)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 relative",
                      "hover:scale-105 focus:outline-none",
                      isCurrentActive
                        ? `bg-gradient-to-r ${category.gradient} text-white shadow-xl scale-105`
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-semibold text-sm">
                      {category.name}
                    </span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      openCategory === category.id ? "rotate-180" : ""
                    )} />
                    {isCurrentActive && (
                      <Sparkles className="w-3 h-3 text-white/80 animate-pulse absolute -top-1 -right-1" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  className="w-72 p-0 border-0 shadow-2xl"
                  sideOffset={8}
                >
                  {/* Single gradient background with glossy overlay for dropdown */}
                  <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-800 dark:via-purple-800 dark:to-slate-800 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl"></div>
                    
                    <div className="relative p-4">
                      <DropdownMenuLabel className="flex items-center gap-3 px-2 py-3 mb-2">
                        <div className={cn(
                          "w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl",
                          category.gradient
                        )}>
                          <category.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-white">{category.name}</div>
                          <div className="text-xs text-white/60">
                            {category.items.length} features
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      
                      <DropdownMenuSeparator className="my-3 bg-white/20" />
                      
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          <DropdownMenuItem key={item.path} asChild className="p-0">
                            <Link
                              to={item.path}
                              onClick={() => setOpenCategory(null)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group",
                                isActive(item.path)
                                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                                  : "text-white/80 hover:text-white hover:bg-white/10 hover:scale-105"
                              )}
                            >
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                                <item.icon className="w-4 h-4" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="font-semibold text-sm">{item.name}</div>
                                <div className="text-xs opacity-80">
                                  {item.description}
                                </div>
                              </div>
                              
                              {isActive(item.path) && (
                                <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse" />
                              )}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </div>
      </div>
    </nav>
  );
});

EnhancedCategorizedNav.displayName = 'EnhancedCategorizedNav';

export default EnhancedCategorizedNav;
