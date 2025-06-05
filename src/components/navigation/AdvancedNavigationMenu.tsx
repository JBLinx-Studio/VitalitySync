
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';
import { debounce } from '@/utils/performance';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  category: 'core' | 'wellness' | 'social';
  description?: string;
}

interface AdvancedNavigationMenuProps {
  items: NavigationItem[];
  className?: string;
}

const AdvancedNavigationMenu: React.FC<AdvancedNavigationMenuProps> = ({ 
  items, 
  className = '' 
}) => {
  const location = useLocation();
  const { isMobile, isTablet } = useViewport();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Organize items by category with better grouping
  const organizedItems = useMemo(() => ({
    core: items.filter(item => ['dashboard'].includes(item.name.toLowerCase())),
    tracking: items.filter(item => ['nutrition', 'fitness', 'sleep', 'body'].includes(item.name.toLowerCase())),
    wellness: items.filter(item => ['mental'].includes(item.name.toLowerCase())),
    social: items.filter(item => ['community', 'achievements'].includes(item.name.toLowerCase()))
  }), [items]);

  // Check if item is active
  const isActive = useCallback((path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  }, [location.pathname]);

  // Mobile navigation for smaller screens
  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        <div className="bg-slate-900/5 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-2">
          <div className="grid grid-cols-4 gap-1">
            {items.slice(0, 8).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 group",
                  isActive(item.path)
                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300"
                )}
              >
                <div className={cn(
                  "text-lg transition-transform group-hover:scale-110",
                  isActive(item.path) ? "scale-110" : ""
                )}>
                  {item.icon}
                </div>
                <span className="text-xs font-medium text-center leading-tight">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="space-x-1">
        {/* Core Dashboard */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/dashboard"
              className={cn(
                "group inline-flex h-12 w-max items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 relative overflow-hidden",
                isActive("/dashboard")
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-xl scale-105"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105"
              )}
            >
              <div className="flex items-center gap-2">
                {organizedItems.core[0]?.icon}
                <span className="font-semibold">Overview</span>
              </div>
              {isActive("/dashboard") && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              )}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Health Tracking */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "group h-12 px-6 rounded-full font-medium transition-all duration-300 relative overflow-hidden",
              organizedItems.tracking.some(item => isActive(item.path))
                ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-xl scale-105"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
              <span className="font-semibold">Health Tracking</span>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </div>
          </NavigationMenuTrigger>
          
          <NavigationMenuContent className="min-w-[400px] p-0">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-600/50">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Track Your Health
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Monitor every aspect of your wellness journey
                </p>
              </div>
              
              <div className="p-4 grid grid-cols-2 gap-3">
                {organizedItems.tracking.map((item) => (
                  <NavigationMenuLink key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105",
                        isActive(item.path)
                          ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300 shadow-lg border border-blue-200 dark:border-blue-700"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-md"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all",
                        isActive(item.path) 
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 scale-110" 
                          : "bg-slate-100 dark:bg-slate-700 group-hover:scale-110"
                      )}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.name === 'Nutrition' && 'Food & calorie tracking'}
                          {item.name === 'Fitness' && 'Workouts & activity'}
                          {item.name === 'Sleep' && 'Rest & recovery'}
                          {item.name === 'Body' && 'Measurements & progress'}
                        </div>
                      </div>
                      
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Wellness & Social */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "group h-12 px-6 rounded-full font-medium transition-all duration-300 relative overflow-hidden",
              [...organizedItems.wellness, ...organizedItems.social].some(item => isActive(item.path))
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-xl scale-105"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 hover:scale-105"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-current opacity-60"></div>
              <span className="font-semibold">Wellness & Social</span>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </div>
          </NavigationMenuTrigger>
          
          <NavigationMenuContent className="min-w-[350px] p-0">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-600/50">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Mind & Community
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Mental wellness and social connections
                </p>
              </div>
              
              <div className="p-4 space-y-2">
                {[...organizedItems.wellness, ...organizedItems.social].map((item) => (
                  <NavigationMenuLink key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 w-full",
                        isActive(item.path)
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 shadow-lg border border-purple-200 dark:border-purple-700"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:shadow-md"
                      )}
                    >
                      <div className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all",
                        isActive(item.path) 
                          ? "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 scale-110" 
                          : "bg-slate-100 dark:bg-slate-700 group-hover:scale-110"
                      )}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{item.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.name === 'Mental' && 'Mood & mindfulness'}
                          {item.name === 'Community' && 'Connect with others'}
                          {item.name === 'Achievements' && 'Goals & rewards'}
                        </div>
                      </div>
                      
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AdvancedNavigationMenu;
