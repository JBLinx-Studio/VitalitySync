
import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, Shield, Bell, Heart, Award, HelpCircle, Plus } from 'lucide-react';
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

  // Streamlined menu sections
  const menuSections = useMemo(() => [
    {
      items: [
        { 
          icon: User, 
          label: 'Profile', 
          path: '/profile', 
          description: 'Personal settings',
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          path: '/notifications', 
          description: 'Alerts & reminders',
        },
        { 
          icon: Settings, 
          label: 'Preferences', 
          path: '/settings', 
          description: 'App configuration',
        },
      ]
    },
    {
      items: [
        { 
          icon: Heart, 
          label: 'Health Data', 
          path: '/health-data', 
          description: 'Your metrics',
        },
        { 
          icon: Award, 
          label: 'Achievements', 
          path: '/achievements', 
          description: 'Progress & goals',
        },
      ]
    },
    {
      items: [
        { 
          icon: HelpCircle, 
          label: 'Support', 
          path: '/help', 
          description: 'Get help',
        },
        { 
          icon: Shield, 
          label: 'Privacy', 
          path: '/privacy', 
          description: 'Data security',
        },
      ]
    }
  ], []);

  const handleLogout = useCallback(() => {
    console.log('Logout clicked');
    // Add logout logic here
  }, []);

  if (!userProfile) {
    return (
      <Link to="/profile">
        <Button 
          className={cn(
            "group relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white border-0 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
            isMobile ? "px-4 py-2 text-sm h-10" : "px-6 py-2.5 h-11",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>{isMobile ? "Join" : "Get Started"}</span>
          </div>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "relative group focus:outline-none focus:ring-2 focus:ring-blue-500/30 rounded-full transition-all duration-300",
          className
        )}>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>
          
          <div className="relative transform transition-all duration-300 group-hover:scale-110">
            <UserAvatar 
              userProfile={userProfile} 
              size="md"
              className="ring-2 ring-slate-200 dark:ring-slate-700 shadow-md group-hover:ring-blue-300 dark:group-hover:ring-blue-600 transition-all duration-300"
            />
            
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 border-2 border-white dark:border-slate-900 rounded-full">
              <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className={cn(
          "w-72 p-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden",
          className
        )}
        align="end"
        sideOffset={8}
      >
        {/* User info header */}
        <div className="p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 border-b border-slate-200/50 dark:border-slate-600/50">
          <div className="flex items-center gap-3">
            <UserAvatar 
              userProfile={userProfile} 
              size="lg"
              className="ring-2 ring-blue-200 dark:ring-blue-700 shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-800 dark:text-slate-100 truncate">
                {userProfile.name || 'User'}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {userProfile.email || 'user@vitality.com'}
              </div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu sections */}
        <div className="p-2">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <DropdownMenuGroup>
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className="group flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 cursor-pointer mx-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <item.icon className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-medium text-slate-700 dark:text-slate-200">{item.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{item.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              {sectionIndex < menuSections.length - 1 && (
                <DropdownMenuSeparator className="my-2 mx-3 bg-slate-200/50 dark:bg-slate-700/50" />
              )}
            </div>
          ))}

          <DropdownMenuSeparator className="my-2 mx-3 bg-slate-200/50 dark:bg-slate-700/50" />

          {/* Logout button */}
          <DropdownMenuItem asChild>
            <button
              className="group w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-200 text-red-600 dark:text-red-400 cursor-pointer mx-1"
              onClick={handleLogout}
            >
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              
              <span className="font-medium">Sign Out</span>
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnhancedUserMenu;
