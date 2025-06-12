
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
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

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

const MobileEnhancedNav: React.FC = React.memo(() => {
  const location = useLocation();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

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

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <ScrollArea className="h-[80vh] w-full rounded-2xl bg-white/10 dark:bg-slate-900/10 backdrop-blur-2xl border border-white/20 dark:border-slate-700/20">
        <div className="p-4 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <Button
                variant="ghost"
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "w-full justify-between p-4 rounded-xl transition-all duration-300",
                  "hover:bg-white/20 dark:hover:bg-slate-800/20 group"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shadow-lg",
                    category.gradient
                  )}>
                    <category.icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {category.items.length} items
                    </div>
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  expandedCategory === category.id ? "rotate-90" : ""
                )} />
              </Button>

              {expandedCategory === category.id && (
                <div className="space-y-1 pl-4 animate-in slide-in-from-top-2 duration-300">
                  {category.items.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                        isActive(item.path)
                          ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg scale-105`
                          : "hover:bg-white/10 dark:hover:bg-slate-800/20 hover:scale-105"
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className={cn(
                        "w-6 h-6 rounded-md flex items-center justify-center relative z-10",
                        isActive(item.path)
                          ? "bg-white/20 text-white"
                          : `text-${category.color}-600 dark:text-${category.color}-400`
                      )}>
                        <item.icon className="w-3 h-3" />
                      </div>
                      
                      <div className="flex-1 relative z-10">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className={cn(
                          "text-xs opacity-80",
                          isActive(item.path) ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                        )}>
                          {item.description}
                        </div>
                      </div>
                      
                      {isActive(item.path) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse relative z-10" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
});

MobileEnhancedNav.displayName = 'MobileEnhancedNav';

export default MobileEnhancedNav;
