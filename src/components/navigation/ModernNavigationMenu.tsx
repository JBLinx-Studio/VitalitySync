
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
  Calendar
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
      gradient: 'from-emerald-500 to-teal-600',
      items: items.filter(item => item.category === 'overview')
    },
    {
      id: 'tracking',
      name: 'Health Tracking',
      icon: <Activity className="w-5 h-5" />,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      items: items.filter(item => item.category === 'tracking')
    },
    {
      id: 'wellness',
      name: 'Wellness',
      icon: <Heart className="w-5 h-5" />,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      items: items.filter(item => item.category === 'wellness')
    },
    {
      id: 'social',
      name: 'Community',
      icon: <Users className="w-5 h-5" />,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
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
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                <span className={`text-${category.color}-500`}>{category.icon}</span>
                {category.name}
              </div>
              {category.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-sm font-medium border backdrop-blur-sm",
                    isActive(item.path)
                      ? `bg-gradient-to-r ${category.gradient} text-white border-white/20 shadow-lg scale-105`
                      : "bg-white/70 dark:bg-slate-800/70 hover:bg-white/90 dark:hover:bg-slate-700/90 border-gray-200/60 dark:border-gray-700/60 hover:scale-105 hover:shadow-md"
                  )}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
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
      <NavigationMenuList className="space-x-2">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className={cn(
              "group h-12 px-6 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 border border-gray-200/60 dark:border-gray-700/60 rounded-xl transition-all duration-300 backdrop-blur-lg shadow-sm hover:shadow-lg hover:scale-105 font-semibold text-gray-700 dark:text-gray-200",
              category.items.some(item => isActive(item.path)) && 
              `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-lg`
            )}>
              <span className="mr-2">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <ChevronDown className="relative top-[1px] ml-2 h-4 w-4 transition duration-300 group-data-[state=open]:rotate-180" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[500px] lg:min-w-[650px]">
              <div className="p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-2xl">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white shadow-xl",
                    category.gradient
                  )}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.id === 'overview' && 'Dashboard and analytics overview'}
                      {category.id === 'tracking' && 'Monitor your health metrics'}
                      {category.id === 'wellness' && 'Mental health and wellbeing'}
                      {category.id === 'social' && 'Community and achievements'}
                    </p>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="grid grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <NavigationMenuLink key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 border relative overflow-hidden",
                          isActive(item.path)
                            ? `bg-gradient-to-r ${category.gradient} text-white border-white/30 shadow-xl scale-105`
                            : "bg-gray-50/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform duration-300 relative z-10",
                          isActive(item.path) 
                            ? "bg-white/20 text-white scale-110" 
                            : `bg-${category.color}-100 dark:bg-${category.color}-900/30 text-${category.color}-600 dark:text-${category.color}-400 group-hover:scale-110`
                        )}>
                          {item.icon}
                        </div>
                        <div className="flex-1 relative z-10">
                          <div className="font-semibold text-base mb-1">{item.name}</div>
                          <div className={cn(
                            "text-sm opacity-80 leading-relaxed",
                            isActive(item.path) ? "text-white/80" : "text-gray-600 dark:text-gray-400"
                          )}>
                            {item.description}
                          </div>
                        </div>
                        {isActive(item.path) && (
                          <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse relative z-10"></div>
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
