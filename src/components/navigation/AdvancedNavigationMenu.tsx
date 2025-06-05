
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Plus, Sparkles, Target, Activity } from 'lucide-react';
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
  category: 'core' | 'health' | 'wellness' | 'social';
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
    health: items.filter(item => ['nutrition', 'fitness', 'sleep', 'body'].includes(item.name.toLowerCase())),
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
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl border border-white/30 dark:border-slate-700/30 rounded-3xl p-3 shadow-2xl">
          <div className="grid grid-cols-4 gap-2">
            {items.slice(0, 8).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden",
                  isActive(item.path)
                    ? "bg-gradient-to-br from-emerald-500/90 via-blue-500/90 to-purple-500/90 text-white shadow-2xl scale-110 transform"
                    : "hover:bg-white/60 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:scale-105 hover:shadow-xl"
                )}
              >
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 rounded-2xl"></div>
                )}
                
                <div className={cn(
                  "text-xl transition-all duration-500 relative z-10",
                  isActive(item.path) ? "scale-125 drop-shadow-lg" : "group-hover:scale-110"
                )}>
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-center leading-tight relative z-10">
                  {item.name}
                </span>
                
                {isActive(item.path) && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg">
                    <Sparkles className="w-2 h-2 text-yellow-800 m-0.5" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="space-x-2">
        {/* Core Dashboard */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              to="/dashboard"
              className={cn(
                "group inline-flex h-14 w-max items-center justify-center rounded-2xl px-8 py-3 text-sm font-bold transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl",
                isActive("/dashboard")
                  ? "bg-gradient-to-r from-emerald-500 via-teal-600 to-blue-600 text-white shadow-2xl scale-110 transform"
                  : "hover:bg-white/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:scale-105 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/30 dark:border-slate-700/30"
              )}
            >
              <div className="flex items-center gap-3 relative z-10">
                <div className={cn(
                  "transition-all duration-500",
                  isActive("/dashboard") ? "scale-125" : "group-hover:scale-110"
                )}>
                  {organizedItems.core[0]?.icon}
                </div>
                <span className="font-bold">Overview</span>
                <Target className={cn(
                  "w-4 h-4 transition-all duration-500",
                  isActive("/dashboard") ? "text-yellow-300" : "text-emerald-500"
                )} />
              </div>
              {isActive("/dashboard") && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/10 rounded-2xl"></div>
              )}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Health Tracking */}
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className={cn(
              "group h-14 px-8 rounded-2xl font-bold transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl backdrop-blur-xl",
              organizedItems.health.some(item => isActive(item.path))
                ? "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-white shadow-2xl scale-110 transform"
                : "hover:bg-white/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:scale-105 bg-white/40 dark:bg-slate-900/40 border border-white/30 dark:border-slate-700/30"
            )}
          >
            <div className="flex items-center gap-3 relative z-10">
              <Activity className={cn(
                "w-5 h-5 transition-all duration-500",
                organizedItems.health.some(item => isActive(item.path)) ? "scale-125 text-yellow-300" : "text-blue-500 group-hover:scale-110"
              )} />
              <span className="font-bold">Health Tracking</span>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </div>
            {organizedItems.health.some(item => isActive(item.path)) && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/10 rounded-2xl"></div>
            )}
          </NavigationMenuTrigger>
          
          <NavigationMenuContent className="min-w-[450px] p-0">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-2 border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 bg-gradient-to-br from-blue-50/90 via-indigo-50/90 to-purple-50/90 dark:from-slate-800/90 dark:to-slate-700/90 border-b-2 border-white/30 dark:border-slate-600/30">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                      Track Your Health
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Monitor every aspect of your wellness journey with precision
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-2 gap-4">
                {organizedItems.health.map((item) => (
                  <NavigationMenuLink key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden",
                        isActive(item.path)
                          ? "bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 text-blue-700 dark:text-blue-300 shadow-2xl border-2 border-blue-300/50 dark:border-blue-600/50 scale-105"
                          : "hover:bg-white/60 dark:hover:bg-slate-800/60 hover:shadow-xl border-2 border-transparent hover:border-white/40 dark:hover:border-slate-600/40"
                      )}
                    >
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-500 shadow-lg",
                        isActive(item.path) 
                          ? "bg-gradient-to-br from-blue-400 to-purple-600 text-white scale-110 shadow-2xl" 
                          : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 group-hover:scale-110 group-hover:shadow-xl"
                      )}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-base mb-1">{item.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.name === 'Nutrition' && 'Smart food tracking & meal planning'}
                          {item.name === 'Fitness' && 'Workouts, exercises & activity monitoring'}
                          {item.name === 'Sleep' && 'Rest patterns & recovery analysis'}
                          {item.name === 'Body' && 'Body measurements & progress tracking'}
                        </div>
                      </div>
                      
                      <ArrowRight className={cn(
                        "w-5 h-5 transition-all duration-500",
                        isActive(item.path) ? "text-blue-600 scale-125" : "opacity-0 group-hover:opacity-100 group-hover:scale-110"
                      )} />
                      
                      {isActive(item.path) && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                          <Sparkles className="w-3 h-3 text-yellow-800 m-0.5" />
                        </div>
                      )}
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
              "group h-14 px-8 rounded-2xl font-bold transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl backdrop-blur-xl",
              [...organizedItems.wellness, ...organizedItems.social].some(item => isActive(item.path))
                ? "bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 text-white shadow-2xl scale-110 transform"
                : "hover:bg-white/70 dark:hover:bg-slate-800/70 text-slate-700 dark:text-slate-200 hover:scale-105 bg-white/40 dark:bg-slate-900/40 border border-white/30 dark:border-slate-700/30"
            )}
          >
            <div className="flex items-center gap-3 relative z-10">
              <Sparkles className={cn(
                "w-5 h-5 transition-all duration-500",
                [...organizedItems.wellness, ...organizedItems.social].some(item => isActive(item.path)) ? "scale-125 text-yellow-300" : "text-purple-500 group-hover:scale-110"
              )} />
              <span className="font-bold">Wellness & Social</span>
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </div>
            {[...organizedItems.wellness, ...organizedItems.social].some(item => isActive(item.path)) && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/10 rounded-2xl"></div>
            )}
          </NavigationMenuTrigger>
          
          <NavigationMenuContent className="min-w-[400px] p-0">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-2 border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 bg-gradient-to-br from-purple-50/90 via-pink-50/90 to-rose-50/90 dark:from-slate-800/90 dark:to-slate-700/90 border-b-2 border-white/30 dark:border-slate-600/30">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                      Mind & Community
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      Mental wellness and meaningful social connections
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                {[...organizedItems.wellness, ...organizedItems.social].map((item) => (
                  <NavigationMenuLink key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={cn(
                        "group flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 hover:scale-105 w-full relative overflow-hidden",
                        isActive(item.path)
                          ? "bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 text-purple-700 dark:text-purple-300 shadow-2xl border-2 border-purple-300/50 dark:border-purple-600/50 scale-105"
                          : "hover:bg-white/60 dark:hover:bg-slate-800/60 hover:shadow-xl border-2 border-transparent hover:border-white/40 dark:hover:border-slate-600/40"
                      )}
                    >
                      <div className={cn(
                        "w-11 h-11 rounded-xl flex items-center justify-center text-lg transition-all duration-500 shadow-lg",
                        isActive(item.path) 
                          ? "bg-gradient-to-br from-purple-400 to-pink-600 text-white scale-110 shadow-2xl" 
                          : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 group-hover:scale-110 group-hover:shadow-xl"
                      )}>
                        {item.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-base mb-1">{item.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.name === 'Mental' && 'Mood tracking & mindfulness practices'}
                          {item.name === 'Community' && 'Connect with like-minded wellness enthusiasts'}
                          {item.name === 'Achievements' && 'Goals, milestones & reward system'}
                        </div>
                      </div>
                      
                      <ArrowRight className={cn(
                        "w-5 h-5 transition-all duration-500",
                        isActive(item.path) ? "text-purple-600 scale-125" : "opacity-0 group-hover:opacity-100 group-hover:scale-110"
                      )} />
                      
                      {isActive(item.path) && (
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg">
                          <Sparkles className="w-3 h-3 text-yellow-800 m-0.5" />
                        </div>
                      )}
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
