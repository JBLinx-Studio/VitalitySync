
import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, LogOut, Shield, Bell, Heart, Award, HelpCircle, Plus, Sparkles, Crown, Star } from 'lucide-react';
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

  // Streamlined menu sections with enhanced styling
  const menuSections = useMemo(() => [
    {
      items: [
        { 
          icon: User, 
          label: 'Profile', 
          path: '/profile', 
          description: 'Personal information & settings',
          color: 'from-blue-500 to-indigo-600'
        },
        { 
          icon: Bell, 
          label: 'Notifications', 
          path: '/notifications', 
          description: 'Alerts, reminders & updates',
          color: 'from-purple-500 to-pink-600'
        },
        { 
          icon: Settings, 
          label: 'Preferences', 
          path: '/settings', 
          description: 'App customization & controls',
          color: 'from-slate-500 to-slate-700'
        },
      ]
    },
    {
      items: [
        { 
          icon: Heart, 
          label: 'Health Data', 
          path: '/health-data', 
          description: 'Your wellness metrics & insights',
          color: 'from-red-500 to-pink-600'
        },
        { 
          icon: Award, 
          label: 'Achievements', 
          path: '/achievements', 
          description: 'Progress milestones & rewards',
          color: 'from-yellow-500 to-orange-600'
        },
      ]
    },
    {
      items: [
        { 
          icon: HelpCircle, 
          label: 'Support', 
          path: '/help', 
          description: 'Get help & learn more',
          color: 'from-green-500 to-emerald-600'
        },
        { 
          icon: Shield, 
          label: 'Privacy', 
          path: '/privacy', 
          description: 'Data security & privacy settings',
          color: 'from-indigo-500 to-purple-600'
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
            "group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 hover:from-emerald-600 hover:via-blue-700 hover:to-purple-700 text-white border-0 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 active:scale-95",
            isMobile ? "px-5 py-3 text-sm h-12" : "px-8 py-3 h-14",
            className
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-bold">{isMobile ? "Join Now" : "Get Started Today"}</span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "relative group focus:outline-none focus:ring-4 focus:ring-blue-500/30 rounded-2xl transition-all duration-500 hover:scale-110 active:scale-95",
          className
        )}>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
          
          <div className="relative transform transition-all duration-500">
            <UserAvatar 
              userProfile={userProfile} 
              size="md"
              className="ring-4 ring-white/50 dark:ring-slate-700/50 shadow-2xl group-hover:ring-blue-400/60 dark:group-hover:ring-blue-600/60 transition-all duration-500"
            />
            
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 border-3 border-white dark:border-slate-900 rounded-full shadow-lg">
              <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse">
                <Crown className="w-3 h-3 text-yellow-300 m-1" />
              </div>
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className={cn(
          "w-80 p-0 bg-white/98 dark:bg-slate-900/98 backdrop-blur-3xl border-2 border-white/30 dark:border-slate-700/30 rounded-3xl shadow-3xl overflow-hidden",
          className
        )}
        align="end"
        sideOffset={12}
      >
        {/* Enhanced user info header */}
        <div className="p-6 bg-gradient-to-br from-slate-50/95 via-blue-50/95 to-purple-50/95 dark:from-slate-800/95 dark:to-slate-700/95 border-b-2 border-white/30 dark:border-slate-600/30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserAvatar 
                userProfile={userProfile} 
                size="lg"
                className="ring-4 ring-blue-200/60 dark:ring-blue-700/60 shadow-2xl"
              />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <Star className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-lg text-slate-800 dark:text-slate-100 truncate mb-1">
                {userProfile.name || 'Health Enthusiast'}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 truncate mb-2">
                {userProfile.email || 'user@vitality.com'}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Premium Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced menu sections */}
        <div className="p-3">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <DropdownMenuGroup>
                {section.items.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className="group flex items-center gap-4 px-4 py-4 text-sm hover:bg-slate-50/80 dark:hover:bg-slate-800/60 rounded-2xl transition-all duration-300 cursor-pointer mx-1 my-1 hover:scale-[1.02] hover:shadow-lg"
                    >
                      <div className={cn(
                        "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110",
                        item.color
                      )}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-bold text-slate-700 dark:text-slate-200 mb-1">{item.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</div>
                      </div>
                      
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              
              {sectionIndex < menuSections.length - 1 && (
                <DropdownMenuSeparator className="my-3 mx-4 bg-slate-200/60 dark:bg-slate-700/60" />
              )}
            </div>
          ))}

          <DropdownMenuSeparator className="my-3 mx-4 bg-slate-200/60 dark:bg-slate-700/60" />

          {/* Enhanced logout button */}
          <DropdownMenuItem asChild>
            <button
              className="group w-full flex items-center gap-4 px-4 py-4 text-sm hover:bg-red-50/80 dark:hover:bg-red-950/40 rounded-2xl transition-all duration-300 text-red-600 dark:text-red-400 cursor-pointer mx-1 hover:scale-[1.02] hover:shadow-lg"
              onClick={handleLogout}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <LogOut className="w-5 h-5 text-white" />
              </div>
              
              <div className="flex-1 text-left">
                <div className="font-bold">Sign Out</div>
                <div className="text-xs text-red-500/70 dark:text-red-400/70">End your session securely</div>
              </div>
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EnhancedUserMenu;
