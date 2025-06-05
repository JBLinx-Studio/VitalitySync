
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, Shield, Bell, Heart, Award, HelpCircle } from 'lucide-react';
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

interface EnhancedUserMenuProps {
  className?: string;
}

const EnhancedUserMenu: React.FC<EnhancedUserMenuProps> = ({ className = '' }) => {
  const { userProfile } = useHealth();

  if (!userProfile) {
    return (
      <Link to="/profile">
        <Button 
          className={cn(
            "bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white border-0 rounded-2xl font-bold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-2.5",
            className
          )}
        >
          <User className="w-4 h-4 mr-2" />
          Get Started
        </Button>
      </Link>
    );
  }

  const menuSections = [
    {
      label: 'Account',
      items: [
        { icon: User, label: 'Profile', path: '/profile', description: 'Personal information' },
        { icon: Settings, label: 'Settings', path: '/settings', description: 'App preferences' },
        { icon: Bell, label: 'Notifications', path: '/notifications', description: 'Manage alerts' },
      ]
    },
    {
      label: 'Health',
      items: [
        { icon: Heart, label: 'Health Data', path: '/health-data', description: 'View all metrics' },
        { icon: Award, label: 'Achievements', path: '/achievements', description: 'Your progress' },
      ]
    },
    {
      label: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', path: '/help', description: 'Get assistance' },
        { icon: Shield, label: 'Privacy', path: '/privacy', description: 'Data & security' },
      ]
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "relative group focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full transition-all duration-300",
          className
        )}>
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-70 blur-lg transition-all duration-500"></div>
          <div className="relative transform transition-transform duration-300 group-hover:scale-110">
            <UserAvatar 
              userProfile={userProfile} 
              size="md"
              className="ring-2 ring-white/50 dark:ring-slate-700/50 shadow-lg"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border-2 border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl p-4" 
        align="end"
        sideOffset={12}
      >
        {/* User Info Header */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl mb-4 border border-emerald-200/50 dark:border-emerald-700/50">
          <UserAvatar 
            userProfile={userProfile} 
            size="lg"
            className="ring-2 ring-emerald-200 dark:ring-emerald-700"
          />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent truncate">
              {userProfile.name || 'User'}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {userProfile.email || 'user@vitality.com'}
            </div>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.label}>
            <DropdownMenuLabel className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2">
              {section.label}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {section.items.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/80 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300 font-medium group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {sectionIndex < menuSections.length - 1 && (
              <DropdownMenuSeparator className="my-2" />
            )}
          </div>
        ))}

        <DropdownMenuSeparator className="my-3" />

        {/* Logout */}
        <DropdownMenuItem asChild>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl transition-all duration-300 font-medium text-red-600 dark:text-red-400 group cursor-pointer"
            onClick={() => {
              // Handle logout logic here
              console.log('Logout clicked');
            }}
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <LogOut className="w-4 h-4" />
            </div>
            <span>Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnhancedUserMenu;
