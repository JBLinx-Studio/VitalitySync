
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
  Crown,
  Sparkles,
  TrendingUp
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
            "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 rounded-2xl font-bold tracking-wide shadow-2xl hover:shadow-cosmic transition-all duration-500 hover:scale-105 px-8 py-3 relative overflow-hidden group",
            className
          )}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12"></div>
          
          <User className="w-4 h-4 mr-2 relative z-10" />
          <span className="relative z-10">Get Started</span>
          <Sparkles className="w-4 h-4 ml-2 relative z-10 animate-pulse" />
        </Button>
      </Link>
    );
  }

  const menuSections = [
    {
      label: 'Account',
      icon: User,
      items: [
        { 
          icon: User, 
          label: 'Profile', 
          path: '/profile', 
          description: 'Personal information & settings',
          color: 'text-blue-600 dark:text-blue-400'
        },
        { 
          icon: Settings, 
          label: 'Preferences', 
          path: '/settings', 
          description: 'App customization & privacy',
          color: 'text-gray-600 dark:text-gray-400'
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          path: '/notifications', 
          description: 'Alerts & communication',
          color: 'text-orange-600 dark:text-orange-400'
        },
      ]
    },
    {
      label: 'Health & Fitness',
      icon: Heart,
      items: [
        { 
          icon: Activity, 
          label: 'Health Data', 
          path: '/dashboard', 
          description: 'Comprehensive health metrics',
          color: 'text-emerald-600 dark:text-emerald-400'
        },
        { 
          icon: TrendingUp, 
          label: 'Progress', 
          path: '/dashboard', 
          description: 'Trends & analytics',
          color: 'text-blue-600 dark:text-blue-400'
        },
        { 
          icon: Award, 
          label: 'Achievements', 
          path: '/achievements', 
          description: 'Goals & milestones',
          color: 'text-yellow-600 dark:text-yellow-400'
        },
      ]
    },
    {
      label: 'Support & Help',
      icon: HelpCircle,
      items: [
        { 
          icon: HelpCircle, 
          label: 'Help Center', 
          path: '/help', 
          description: 'FAQ & support resources',
          color: 'text-purple-600 dark:text-purple-400'
        },
        { 
          icon: Shield, 
          label: 'Privacy & Security', 
          path: '/privacy', 
          description: 'Data protection & security',
          color: 'text-red-600 dark:text-red-400'
        },
      ]
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "relative group focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full transition-all duration-500",
          className
        )}>
          {/* Enhanced glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-50 blur-lg transition-all duration-700 animate-pulse-soft"></div>
          
          {/* Main avatar container */}
          <div className="relative transform transition-all duration-500 group-hover:scale-110">
            <UserAvatar 
              userProfile={userProfile} 
              size="md"
              className="ring-3 ring-white/80 dark:ring-slate-700/80 shadow-2xl border-2 border-white/50 dark:border-slate-600/50"
            />
            
            {/* Premium status indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white dark:border-slate-900 rounded-full shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            
            {/* Crown for premium users */}
            <div className="absolute -top-1 -right-1">
              <Crown className="w-4 h-4 text-yellow-500 animate-pulse" />
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-96 bg-white/99 dark:bg-slate-900/99 backdrop-blur-3xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl shadow-2xl p-6" 
        align="end"
        sideOffset={16}
      >
        {/* Premium User Info Header */}
        <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl mb-6 border border-blue-200/30 dark:border-blue-700/30 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50"></div>
          
          <div className="relative z-10">
            <UserAvatar 
              userProfile={userProfile} 
              size="lg"
              className="ring-3 ring-blue-200/50 dark:ring-blue-700/50 shadow-xl"
            />
            <div className="absolute -top-1 -right-1">
              <Crown className="w-5 h-5 text-yellow-500" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0 relative z-10">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate mb-1">
              {userProfile.name || 'VitalitySync Champion'}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 truncate mb-3">
              {userProfile.email || 'champion@vitality.com'}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
                <Zap className="w-3 h-3 text-emerald-500" />
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Premium Active</span>
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-500 animate-pulse" />
                <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">Pro</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <div key={section.label}>
            <DropdownMenuLabel className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 py-3 flex items-center gap-2">
              <section.icon className="w-3 h-3" />
              {section.label}
            </DropdownMenuLabel>
            
            <DropdownMenuGroup>
              {section.items.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link
                    to={item.path}
                    className="flex items-center gap-4 px-5 py-4 text-sm hover:bg-gray-50/80 dark:hover:bg-slate-800/80 rounded-2xl transition-all duration-500 font-medium group cursor-pointer relative overflow-hidden"
                  >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
                    
                    <div className="w-12 h-12 rounded-2xl bg-gray-100/80 dark:bg-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg relative z-10">
                      <item.icon className={cn("w-5 h-5", item.color)} />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                      <div className="font-semibold text-gray-900 dark:text-white mb-1">{item.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{item.description}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            {sectionIndex < menuSections.length - 1 && (
              <DropdownMenuSeparator className="my-4 bg-gray-200/50 dark:bg-gray-700/50" />
            )}
          </div>
        ))}

        <DropdownMenuSeparator className="my-4 bg-gray-200/50 dark:bg-gray-700/50" />

        {/* Enhanced Logout Button */}
        <DropdownMenuItem asChild>
          <button
            className="w-full flex items-center gap-4 px-5 py-4 text-sm hover:bg-red-50/80 dark:hover:bg-red-950/30 rounded-2xl transition-all duration-500 font-medium text-red-600 dark:text-red-400 group cursor-pointer relative overflow-hidden"
            onClick={() => {
              console.log('Logout clicked');
            }}
          >
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
            
            <div className="w-12 h-12 rounded-2xl bg-red-100/80 dark:bg-red-900/30 flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg relative z-10">
              <LogOut className="w-5 h-5" />
            </div>
            
            <span className="font-semibold relative z-10">Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfessionalUserMenu;
