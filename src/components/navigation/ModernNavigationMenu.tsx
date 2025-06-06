
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Activity, 
  Utensils, 
  Moon, 
  Brain, 
  Ruler, 
  BarChart3,
  Users,
  Award,
  ChevronDown,
  TrendingUp,
  Zap,
  Heart,
  Target,
  Calendar,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';
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
  description: string;
  category: 'overview' | 'tracking' | 'wellness' | 'social';
}

interface ModernNavigationMenuProps {
  items: NavigationItem[];
  className?: string;
}

const ModernNavigationMenu: React.FC<ModernNavigationMenuProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const { isMobile } = useViewport();

  const categories = [
    {
      id: 'overview',
      name: 'Overview',
      icon: <BarChart3 className="w-5 h-5" />,
      color: 'emerald',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      accent: 'emerald-500',
      items: items.filter(item => item.category === 'overview')
    },
    {
      id: 'tracking',
      name: 'Health Tracking',
      icon: <Activity className="w-5 h-5" />,
      color: 'blue',
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      accent: 'blue-500',
      items: items.filter(item => item.category === 'tracking')
    },
    {
      id: 'wellness',
      name: 'Wellness',
      icon: <Heart className="w-5 h-5" />,
      color: 'purple',
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      accent: 'purple-500',
      items: items.filter(item => item.category === 'wellness')
    },
    {
      id: 'social',
      name: 'Community',
      icon: <Users className="w-5 h-5" />,
      color: 'orange',
      gradient: 'from-orange-500 via-amber-500 to-yellow-600',
      accent: 'orange-500',
      items: items.filter(item => item.category === 'social')
    }
  ].filter(category => category.items.length > 0);

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  };

  if (isMobile) {
    return (
      <div className={cn("w-full px-4", className)}>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                <span className={`text-${category.color}-500`}>{category.icon}</span>
                <span className="truncate">{category.name}</span>
              </div>
              {category.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl transition-all duration-500 text-sm font-medium border backdrop-blur-xl group relative overflow-hidden",
                    isActive(item.path)
                      ? `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-2xl scale-105`
                      : "bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border-gray-200/60 dark:border-gray-700/60 hover:scale-105 hover:shadow-xl"
                  )}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                  
                  <span className="text-lg relative z-10">{item.icon}</span>
                  <span className="truncate relative z-10">{item.name}</span>
                  
                  {isActive(item.path) && (
                    <Sparkles className="w-3 h-3 text-white/80 animate-pulse relative z-10" />
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="space-x-3">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className={cn(
              "group h-14 px-8 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 border border-gray-200/60 dark:border-gray-700/60 rounded-2xl transition-all duration-500 backdrop-blur-2xl shadow-lg hover:shadow-2xl hover:scale-105 font-semibold text-gray-700 dark:text-gray-200 relative overflow-hidden",
              category.items.some(item => isActive(item.path)) && 
              `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-2xl scale-105`
            )}>
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12"></div>
              
              <span className="mr-3 relative z-10">{category.icon}</span>
              <span className="hidden sm:inline relative z-10">{category.name}</span>
              <ChevronDown className="relative top-[1px] ml-3 h-4 w-4 transition duration-500 group-data-[state=open]:rotate-180 z-10" />
            </NavigationMenuTrigger>
            
            <NavigationMenuContent className="min-w-[500px] lg:min-w-[700px]">
              <div className="p-8 bg-white/98 dark:bg-slate-900/98 backdrop-blur-3xl border border-gray-200/60 dark:border-gray-700/60 rounded-3xl shadow-2xl">
                {/* Enhanced Category Header */}
                <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className={cn(
                    "w-16 h-16 rounded-3xl bg-gradient-to-br flex items-center justify-center text-white shadow-2xl relative",
                    category.gradient
                  )}>
                    {category.icon}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {category.id === 'overview' && 'Comprehensive dashboard and analytics insights'}
                      {category.id === 'tracking' && 'Monitor and track your health metrics'}
                      {category.id === 'wellness' && 'Mental health and wellbeing tools'}
                      {category.id === 'social' && 'Community features and achievements'}
                    </p>
                  </div>
                </div>

                {/* Enhanced Navigation Items Grid */}
                <div className="grid grid-cols-2 gap-5">
                  {category.items.map((item) => (
                    <NavigationMenuLink key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "group flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 hover:scale-105 border relative overflow-hidden",
                          isActive(item.path)
                            ? `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-2xl scale-105`
                            : "bg-gray-50/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border-gray-200/60 dark:border-gray-700/60 hover:shadow-xl"
                        )}
                      >
                        {/* Sophisticated hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
                        
                        <div className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 relative z-10 shadow-lg",
                          isActive(item.path) 
                            ? "bg-white/20 text-white scale-110 shadow-2xl" 
                            : `bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-600 dark:text-${category.color}-400 group-hover:scale-110 group-hover:shadow-xl`
                        )}>
                          {item.icon}
                        </div>
                        
                        <div className="flex-1 relative z-10">
                          <div className="font-bold text-lg mb-2">{item.name}</div>
                          <div className={cn(
                            "text-sm opacity-90 leading-relaxed",
                            isActive(item.path) ? "text-white/90" : "text-gray-600 dark:text-gray-400"
                          )}>
                            {item.description}
                          </div>
                        </div>
                        
                        {isActive(item.path) && (
                          <div className="flex items-center gap-2 relative z-10">
                            <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse"></div>
                            <Sparkles className="w-4 h-4 text-white/80 animate-pulse" />
                          </div>
                        )}
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default ModernNavigationMenu;
