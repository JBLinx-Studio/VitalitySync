
import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, Shield, Bell, Heart, Award, HelpCircle, Sparkles, Crown } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { UserAvatar } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';

interface EnhancedUserMenuProps {
  className?: string;
}

const EnhancedUserMenu: React.FC<EnhancedUserMenuProps> = ({ className = '' }) => {
  const { userProfile } = useHealth();
  const { isMobile } = useViewport();

  // Memoized menu sections for better performance
  const menuSections = useMemo(() => [
    {
      label: 'Account',
      icon: '👤',
      gradient: 'from-blue-500 to-indigo-600',
      items: [
        { 
          icon: User, 
          label: 'Profile', 
          path: '/profile', 
          description: 'Personal information & settings',
          color: 'text-blue-500'
        },
        { 
          icon: Settings, 
          label: 'Settings', 
          path: '/settings', 
          description: 'App preferences & configuration',
          color: 'text-gray-500'
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          path: '/notifications', 
          description: 'Manage alerts & reminders',
          color: 'text-yellow-500'
        },
      ]
    },
    {
      label: 'Health',
      icon: '💚',
      gradient: 'from-emerald-500 to-teal-600',
      items: [
        { 
          icon: Heart, 
          label: 'Health Data', 
          path: '/health-data', 
          description: 'View all metrics & analytics',
          color: 'text-red-500'
        },
        { 
          icon: Award, 
          label: 'Achievements', 
          path: '/achievements', 
          description: 'Your progress & milestones',
          color: 'text-yellow-500'
        },
      ]
    },
    {
      label: 'Support',
      icon: '🛠️',
      gradient: 'from-purple-500 to-pink-600',
      items: [
        { 
          icon: HelpCircle, 
          label: 'Help Center', 
          path: '/help', 
          description: 'Get assistance & tutorials',
          color: 'text-purple-500'
        },
        { 
          icon: Shield, 
          label: 'Privacy', 
          path: '/privacy', 
          description: 'Data security & privacy settings',
          color: 'text-green-500'
        },
      ]
    }
  ], []);

  // Optimized logout handler
  const handleLogout = useCallback(() => {
    console.log('Logout clicked');
    // Add logout logic here
  }, []);

  if (!userProfile) {
    return (
      <Link to="/profile">
        <Button 
          className={cn(
            "group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white border-0 rounded-3xl font-bold tracking-wide shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 focus:ring-4 focus:ring-blue-500/30",
            isMobile ? "px-4 py-2 text-sm" : "px-6 py-3",
            className
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
          <div className="relative z-10 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Get Started</span>
            <Sparkles className="w-4 h-4 opacity-80" />
          </div>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "relative group focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-full transition-all duration-500",
          className
        )}>
          {/* Enhanced glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-xl transition-all duration-700 animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-50 blur-md transition-all duration-500"></div>
          
          {/* Avatar container */}
          <div className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <UserAvatar 
              userProfile={userProfile} 
              size="md"
              className="ring-4 ring-white/70 dark:ring-slate-700/70 shadow-2xl group-hover:ring-white/90 dark:group-hover:ring-slate-600/90 transition-all duration-500"
            />
            
            {/* Status indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 border-3 border-white dark:border-slate-900 rounded-full animate-pulse shadow-lg">
              <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full animate-ping opacity-75"></div>
            </div>
            
            {/* Premium indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Crown className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className={cn(
          "backdrop-blur-3xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden",
          isMobile ? "w-72 p-3" : "w-80 p-4"
        )}
        align="end"
        sideOffset={12}
      >
        {/* Enhanced user info header */}
        <div className="relative p-4 mb-4 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50 overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-emerald-400/20 to-blue-400/20 rounded-full blur-lg"></div>
          
          <div className="relative z-10 flex items-center gap-4">
            <UserAvatar 
              userProfile={userProfile} 
              size="lg"
              className="ring-3 ring-emerald-200 dark:ring-emerald-700 shadow-xl"
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent truncate">
                {userProfile.name || 'User'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 truncate mb-1">
                {userProfile.email || 'user@vitality.com'}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Crown className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced menu sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.label}>
            <DropdownMenuLabel className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
              <span>{section.icon}</span>
              <span>{section.label}</span>
            </DropdownMenuLabel>
            
            <DropdownMenuGroup>
              {section.items.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className="group flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300 font-medium cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
                    
                    <div className={cn(
                      "w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10",
                      "group-hover:shadow-xl"
                    )}>
                      <item.icon className={cn("w-4 h-4", item.color)} />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </div>
                    </div>
                    
                    <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10"></div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            {sectionIndex < menuSections.length - 1 && (
              <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
            )}
          </div>
        ))}

        <DropdownMenuSeparator className="my-3 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        {/* Enhanced logout button */}
        <DropdownMenuItem asChild>
          <button
            className="group w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-all duration-300 font-medium text-red-600 dark:text-red-400 cursor-pointer relative overflow-hidden"
            onClick={handleLogout}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -skew-x-12"></div>
            
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg relative z-10 group-hover:shadow-xl">
              <LogOut className="w-4 h-4" />
            </div>
            
            <span className="font-semibold relative z-10">Sign Out</span>
            
            <div className="w-2 h-2 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10"></div>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnhancedUserMenu;
