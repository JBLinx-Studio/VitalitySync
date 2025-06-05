
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Bell, 
  Heart, 
  Award, 
  HelpCircle,
  Activity,
  Zap,
  Crown
} from 'lucide-react';
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

interface ProfessionalUserMenuProps {
  className?: string;
}

const ProfessionalUserMenu: React.FC<ProfessionalUserMenuProps> = ({ className = '' }) => {
  const { userProfile } = useHealth();

  if (!userProfile) {
    return (
      <Link to="/profile">
        <Button 
          className={cn(
            "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-xl font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-2.5",
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
        { 
          icon: User, 
          label: 'Profile', 
          path: '/profile', 
          description: 'Personal information',
          color: 'text-blue-600 dark:text-blue-400'
        },
        { 
          icon: Settings, 
          label: 'Settings', 
          path: '/settings', 
          description: 'App preferences',
          color: 'text-gray-600 dark:text-gray-400'
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          path: '/notifications', 
          description: 'Manage alerts',
          color: 'text-orange-600 dark:text-orange-400'
        },
      ]
    },
    {
      label: 'Health',
      items: [
        { 
          icon: Activity, 
          label: 'Health Data', 
          path: '/dashboard', 
          description: 'View all metrics',
          color: 'text-emerald-600 dark:text-emerald-400'
        },
        { 
          icon: Award, 
          label: 'Achievements', 
          path: '/achievements', 
          description: 'Your progress',
          color: 'text-yellow-600 dark:text-yellow-400'
        },
      ]
    },
    {
      label: 'Support',
      items: [
        { 
          icon: HelpCircle, 
          label: 'Help Center', 
          path: '/help', 
          description: 'Get assistance',
          color: 'text-purple-600 dark:text-purple-400'
        },
        { 
          icon: Shield, 
          label: 'Privacy', 
          path: '/privacy', 
          description: 'Data & security',
          color: 'text-red-600 dark:text-red-400'
        },
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
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-60 blur-sm transition-all duration-500"></div>
          <div className="relative transform transition-transform duration-300 group-hover:scale-110">
            <UserAvatar 
              userProfile={userProfile} 
              size="md"
              className="ring-2 ring-white/60 dark:ring-slate-700/60 shadow-lg"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full">
            <div className="w-full h-full bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-2xl p-4" 
        align="end"
        sideOffset={12}
      >
        {/* Enhanced User Info Header */}
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl mb-4 border border-blue-200/30 dark:border-blue-700/30">
          <div className="relative">
            <UserAvatar 
              userProfile={userProfile} 
              size="lg"
              className="ring-2 ring-blue-200 dark:ring-blue-700"
            />
            <div className="absolute -top-1 -right-1">
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              {userProfile.name || 'VitalitySync User'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {userProfile.email || 'user@vitality.com'}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Premium Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.label}>
            <DropdownMenuLabel className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              {section.label === 'Account' && <User className="w-3 h-3" />}
              {section.label === 'Health' && <Heart className="w-3 h-3" />}
              {section.label === 'Support' && <HelpCircle className="w-3 h-3" />}
              {section.label}
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {section.items.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-slate-800/80 rounded-xl transition-all duration-300 font-medium group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <item.icon className={cn("w-4 h-4", item.color)} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            {sectionIndex < menuSections.length - 1 && (
              <DropdownMenuSeparator className="my-3 bg-gray-200/50 dark:bg-gray-700/50" />
            )}
          </div>
        ))}

        <DropdownMenuSeparator className="my-3 bg-gray-200/50 dark:bg-gray-700/50" />

        {/* Enhanced Logout */}
        <DropdownMenuItem asChild>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-300 font-medium text-red-600 dark:text-red-400 group cursor-pointer"
            onClick={() => {
              console.log('Logout clicked');
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfessionalUserMenu;
