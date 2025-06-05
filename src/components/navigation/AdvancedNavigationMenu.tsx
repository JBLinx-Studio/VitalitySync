
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
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
  category: 'dashboard' | 'tracking' | 'wellness' | 'social';
  description?: string;
}

interface NavigationCategory {
  name: string;
  icon: string;
  items: NavigationItem[];
  color: string;
  gradient: string;
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
  const { isMobile, isTablet, width } = useViewport();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  // Memoized categories for better performance
  const categories: NavigationCategory[] = useMemo(() => [
    {
      name: 'Dashboard',
      icon: '📊',
      color: 'blue',
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      items: items.filter(item => item.category === 'dashboard')
    },
    {
      name: 'Health Tracking',
      icon: '🎯',
      color: 'emerald',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      items: items.filter(item => item.category === 'tracking')
    },
    {
      name: 'Wellness',
      icon: '🧘',
      color: 'purple',
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      items: items.filter(item => item.category === 'wellness')
    },
    {
      name: 'Community',
      icon: '👥',
      color: 'orange',
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      items: items.filter(item => item.category === 'social')
    }
  ].filter(category => category.items.length > 0), [items]);

  // Optimized active check with memoization
  const isActive = useCallback((path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  }, [location.pathname]);

  // Debounced hover handlers for better performance
  const handleCategoryHover = useCallback(
    debounce((categoryName: string | null) => {
      setHoveredCategory(categoryName);
    }, 100),
    []
  );

  // Get descriptions for items
  const getItemDescription = useCallback((itemName: string) => {
    const descriptions = {
      'Dashboard': 'Analytics & insights overview',
      'Nutrition': 'Smart food & macro tracking',
      'Fitness': 'Exercise & workout logging',
      'Sleep': 'Sleep quality & pattern analysis',
      'Body': 'Measurements & progress tracking',
      'Mental': 'Mood & mental wellness tracking',
      'Community': 'Connect with other users',
      'Achievements': 'Goals, rewards & milestones'
    };
    return descriptions[itemName] || 'Health tracking feature';
  }, []);

  // Mobile responsive navigation
  if (isMobile) {
    return (
      <div className={cn("w-full overflow-hidden", className)}>
        <div className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-3xl border-2 border-white/20 dark:border-slate-700/20 rounded-3xl shadow-2xl p-3">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center gap-2 px-2 py-1">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider truncate">
                    {category.name}
                  </span>
                </div>
                {category.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 p-2.5 rounded-2xl transition-all duration-300 text-sm font-medium border-2 group relative overflow-hidden",
                      isActive(item.path)
                        ? `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-xl scale-105`
                        : "bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-700/90 border-gray-200/50 dark:border-gray-700/50 hover:scale-105 hover:shadow-lg"
                    )}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                    <span className="text-base relative z-10">{item.icon}</span>
                    <span className="truncate relative z-10">{item.name}</span>
                    {isActive(item.path) && (
                      <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse relative z-10"></div>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="space-x-2">
        {categories.map((category) => {
          const hasActiveItem = category.items.some(item => isActive(item.path));
          
          return (
            <NavigationMenuItem key={category.name}>
              <NavigationMenuTrigger 
                className={cn(
                  "group h-14 px-6 transition-all duration-500 backdrop-blur-2xl shadow-xl border-2 rounded-3xl font-bold text-sm relative overflow-hidden",
                  "hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/30",
                  hasActiveItem 
                    ? `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-2xl scale-105`
                    : "bg-white/80 dark:bg-slate-800/80 hover:bg-white/95 dark:hover:bg-slate-700/95 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200"
                )}
                onMouseEnter={() => handleCategoryHover(category.name)}
                onMouseLeave={() => handleCategoryHover(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <span className={cn(
                    "text-xl transition-transform duration-300",
                    hasActiveItem ? "scale-110 drop-shadow-lg" : "group-hover:scale-110"
                  )}>
                    {category.icon}
                  </span>
                  <span className="hidden sm:inline font-semibold tracking-wide">
                    {category.name}
                  </span>
                  <ChevronDown className="h-4 w-4 transition-all duration-300 group-data-[state=open]:rotate-180 opacity-70" />
                </div>
                {hasActiveItem && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/90 rounded-full animate-pulse shadow-lg"></div>
                )}
                {hoveredCategory === category.name && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl opacity-70 blur-xl transition-opacity duration-500 -z-10"></div>
                )}
              </NavigationMenuTrigger>
              
              <NavigationMenuContent className="min-w-[500px] md:min-w-[600px] lg:min-w-[700px] p-0">
                <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Enhanced header */}
                  <div className={cn(
                    "relative p-6 bg-gradient-to-br overflow-hidden",
                    category.gradient
                  )}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold shadow-xl border border-white/30">
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                          {category.name}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed">
                          {category.name === 'Dashboard' && 'Comprehensive overview and insights into your health journey'}
                          {category.name === 'Health Tracking' && 'Monitor and track all aspects of your physical health'}
                          {category.name === 'Wellness' && 'Mental health, mindfulness and overall wellbeing tools'}
                          {category.name === 'Community' && 'Connect, share and achieve your goals together'}
                        </p>
                      </div>
                      <div className="text-white/60">
                        <Sparkles className="w-8 h-8" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced navigation items */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.items.map((item) => (
                        <NavigationMenuLink key={item.path} asChild>
                          <Link
                            to={item.path}
                            className={cn(
                              "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden backdrop-blur-sm",
                              "focus:outline-none focus:ring-4 focus:ring-blue-500/30",
                              isActive(item.path)
                                ? `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-xl scale-105`
                                : "bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl"
                            )}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                            
                            <div className={cn(
                              "w-12 h-12 rounded-2xl flex items-center justify-center text-lg transition-all duration-300 relative z-10 shadow-lg",
                              isActive(item.path) 
                                ? "bg-white/20 text-white scale-110 shadow-xl" 
                                : "bg-gray-100 dark:bg-slate-700 group-hover:scale-110 group-hover:shadow-xl"
                            )}>
                              {item.icon}
                            </div>
                            
                            <div className="flex-1 relative z-10">
                              <div className="font-bold text-base mb-1">{item.name}</div>
                              <div className={cn(
                                "text-sm opacity-80 leading-relaxed",
                                isActive(item.path) ? "text-white/90" : "text-gray-600 dark:text-gray-400"
                              )}>
                                {getItemDescription(item.name)}
                              </div>
                            </div>
                            
                            <div className="relative z-10 flex items-center gap-2">
                              {isActive(item.path) && (
                                <div className="w-3 h-3 rounded-full bg-white/90 animate-pulse shadow-lg"></div>
                              )}
                              <ChevronRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AdvancedNavigationMenu;
