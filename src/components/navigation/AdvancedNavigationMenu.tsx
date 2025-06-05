
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
  category: 'dashboard' | 'tracking' | 'wellness' | 'social';
  description?: string;
}

interface NavigationCategory {
  name: string;
  icon: React.ReactNode;
  items: NavigationItem[];
  color: string;
}

interface AdvancedNavigationMenuProps {
  items: NavigationItem[];
  className?: string;
}

const AdvancedNavigationMenu: React.FC<AdvancedNavigationMenuProps> = ({ items, className = '' }) => {
  const location = useLocation();
  const { isMobile, isTablet } = useViewport();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Group items by category
  const categories: NavigationCategory[] = [
    {
      name: 'Dashboard',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600',
      items: items.filter(item => item.category === 'dashboard')
    },
    {
      name: 'Health Tracking',
      icon: '🎯',
      color: 'from-emerald-500 to-teal-600',
      items: items.filter(item => item.category === 'tracking')
    },
    {
      name: 'Wellness',
      icon: '🧘',
      color: 'from-purple-500 to-pink-600',
      items: items.filter(item => item.category === 'wellness')
    },
    {
      name: 'Community',
      icon: '👥',
      color: 'from-orange-500 to-red-600',
      items: items.filter(item => item.category === 'social')
    }
  ].filter(category => category.items.length > 0);

  const isActive = (path: string) => {
    const currentPath = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    return currentPath === path;
  };

  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-2 gap-2 p-3">
          {categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2">
                {category.icon} {category.name}
              </div>
              {category.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 p-2.5 rounded-xl transition-all duration-300 text-sm font-medium border",
                    isActive(item.path)
                      ? `bg-gradient-to-r ${category.color} text-white border-white/20 shadow-lg scale-105`
                      : "bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-gray-200/50 dark:border-gray-700/50 hover:scale-105"
                  )}
                >
                  <span className="text-base">{item.icon}</span>
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
      <NavigationMenuList className="space-x-1">
        {categories.map((category) => (
          <NavigationMenuItem key={category.name}>
            <NavigationMenuTrigger className={cn(
              "group h-12 px-6 bg-white/80 dark:bg-slate-800/80 hover:bg-white/95 dark:hover:bg-slate-700/95 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-2xl transition-all duration-300 backdrop-blur-lg shadow-lg hover:shadow-xl hover:scale-105 font-semibold",
              category.items.some(item => isActive(item.path)) && `bg-gradient-to-r ${category.color} text-white border-white/30`
            )}>
              <span className="text-lg mr-2">{category.icon}</span>
              <span className="hidden sm:inline">{category.name}</span>
              <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-300 group-data-[state=open]:rotate-180" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-[400px] md:min-w-[500px] lg:min-w-[600px]">
              <div className="grid gap-3 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl">
                <div className="row-span-3">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-xl font-bold shadow-xl",
                      category.color
                    )}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category.name === 'Dashboard' && 'Overview and insights'}
                        {category.name === 'Health Tracking' && 'Monitor your health metrics'}
                        {category.name === 'Wellness' && 'Mental health and mindfulness'}
                        {category.name === 'Community' && 'Connect and achieve together'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.items.map((item) => (
                    <NavigationMenuLink key={item.path} asChild>
                      <Link
                        to={item.path}
                        className={cn(
                          "group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-105 border-2 relative overflow-hidden",
                          isActive(item.path)
                            ? `bg-gradient-to-r ${category.color} text-white border-white/30 shadow-xl scale-105`
                            : "bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-700/80 border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-transform duration-300 relative z-10",
                          isActive(item.path) 
                            ? "bg-white/20 text-white scale-110" 
                            : "bg-gray-100 dark:bg-slate-700 group-hover:scale-110"
                        )}>
                          {item.icon}
                        </div>
                        <div className="flex-1 relative z-10">
                          <div className="font-semibold text-sm mb-1">{item.name}</div>
                          <div className={cn(
                            "text-xs opacity-80",
                            isActive(item.path) ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                          )}>
                            {item.name === 'Dashboard' && 'Overview & Analytics'}
                            {item.name === 'Nutrition' && 'Food & Diet Tracking'}
                            {item.name === 'Fitness' && 'Exercise & Workouts'}
                            {item.name === 'Sleep' && 'Sleep Quality Monitoring'}
                            {item.name === 'Body' && 'Body Measurements'}
                            {item.name === 'Mental' && 'Mental Health & Mood'}
                            {item.name === 'Community' && 'Social Features'}
                            {item.name === 'Achievements' && 'Goals & Rewards'}
                          </div>
                        </div>
                        {isActive(item.path) && (
                          <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse relative z-10"></div>
                        )}
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 relative z-10" />
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

export default AdvancedNavigationMenu;
