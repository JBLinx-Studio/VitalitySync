
import React from 'react';
import {
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Bell,
  Palette,
  Languages,
  Zap,
  Eye,
  Scale,
  Lock,
  HelpCircle,
  Monitor,
  Smartphone
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useViewport } from '@/hooks/use-viewport';
import { cn } from '@/lib/utils';

interface OptionsMenuProps {
  userLoggedIn?: boolean;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ userLoggedIn = false }) => {
  const { 
    theme, 
    toggleTheme, 
    setColorTheme, 
    colorTheme,
    glassEffect,
    setGlassEffect,
    enableParticles,
    setEnableParticles
  } = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "icon"}
          className={cn(
            "relative rounded-2xl bg-white/30 dark:bg-slate-800/30 border-white/40 dark:border-slate-700/40 hover:bg-white/40 dark:hover:bg-slate-800/40 transition-all duration-300 hover:scale-105 backdrop-blur-lg shadow-lg hover:shadow-xl",
            isMobile ? "px-3 py-2" : "w-10 h-10"
          )}
        >
          <Settings className={cn(
            "text-gray-700 dark:text-gray-300 transition-transform hover:rotate-180 duration-500",
            isMobile ? "h-4 w-4" : "h-5 w-5"
          )} />
          {isMobile && <span className="ml-1.5 text-xs font-medium">Settings</span>}
          <span className="sr-only">Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={cn(
          "backdrop-blur-3xl bg-white/95 dark:bg-slate-900/95 border-white/40 dark:border-slate-700/40 shadow-2xl rounded-2xl border-2",
          isMobile ? "w-56 mr-1" : "w-64 mr-2"
        )}
        sideOffset={8}
        align="end"
      >
        <div className={cn(
          "flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-b border-white/20 dark:border-slate-700/20 rounded-t-2xl",
          isMobile ? "px-3 py-2" : "px-4 py-3"
        )}>
          <DropdownMenuLabel className={cn(
            "flex items-center font-bold text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text",
            isMobile ? "text-sm" : "text-base"
          )}>
            <Settings className={cn(
              "mr-2 text-emerald-500",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} />
            Settings
          </DropdownMenuLabel>
        </div>
        
        <div className={cn(
          "py-2",
          isMobile ? "max-h-[70vh]" : "max-h-[80vh]",
          "overflow-y-auto"
        )}>
          {/* Enhanced theme toggle */}
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={toggleTheme}
              className="cursor-pointer hover:bg-emerald-500/10 rounded-xl mx-2 my-1 px-3 py-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className={cn(
                    "mr-3 text-amber-500",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  <span className={isMobile ? "text-sm" : ""}>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className={cn(
                    "mr-3 text-slate-600",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  <span className={isMobile ? "text-sm" : ""}>Dark Mode</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="my-2" />

          {/* Enhanced appearance submenu */}
          {!isMobile ? (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-emerald-500/10 rounded-xl mx-2 px-3 py-2">
                <Palette className="mr-3 h-4 w-4 text-emerald-500" />
                <span>Appearance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="backdrop-blur-3xl bg-white/95 dark:bg-slate-900/95 border-white/40 dark:border-slate-700/40 rounded-xl shadow-2xl">
                  <DropdownMenuGroup>
                    {[
                      { key: 'teal-purple', colors: 'from-[#4FD1C5] to-[#9b87f5]', name: 'Teal-Purple' },
                      { key: 'blue-pink', colors: 'from-blue-500 to-pink-500', name: 'Blue-Pink' },
                      { key: 'green-yellow', colors: 'from-green-500 to-yellow-400', name: 'Green-Yellow' },
                      { key: 'sunset', colors: 'from-orange-500 to-pink-500', name: 'Sunset' },
                      { key: 'ocean', colors: 'from-sky-500 to-green-500', name: 'Ocean' },
                      { key: 'cosmic-nebula', colors: 'from-purple-600 to-blue-600', name: 'Cosmic' }
                    ].map(({ key, colors, name }) => (
                      <DropdownMenuItem 
                        key={key}
                        onClick={() => setColorTheme(key as any)}
                        className={`cursor-pointer rounded-xl px-3 py-2 mx-1 ${colorTheme === key ? 'bg-emerald-500/20' : 'hover:bg-emerald-500/10'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colors} mr-3 shadow-lg`} />
                        <span className="text-sm font-medium">{name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem 
              onClick={() => setEnableParticles(!enableParticles)}
              className="cursor-pointer hover:bg-emerald-500/10 rounded-xl mx-2 my-1 px-3 py-2"
            >
              <Zap className="mr-3 h-4 w-4 text-emerald-500" />
              <span className="text-sm">
                {enableParticles ? 'Disable' : 'Enable'} Effects
              </span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator className="my-2" />
          
          {/* Enhanced settings shortcuts */}
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => navigate('/settings')}
              className="cursor-pointer hover:bg-blue-500/10 rounded-xl mx-2 my-1 px-3 py-2"
            >
              <Monitor className={cn(
                "mr-3 text-blue-500",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>Display Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-purple-500/10 rounded-xl mx-2 my-1 px-3 py-2">
              <Bell className={cn(
                "mr-3 text-purple-500",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>Notifications</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-orange-500/10 rounded-xl mx-2 my-1 px-3 py-2">
              <Lock className={cn(
                "mr-3 text-orange-500",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>Privacy & Security</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-green-500/10 rounded-xl mx-2 my-1 px-3 py-2">
              <HelpCircle className={cn(
                "mr-3 text-green-500",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>Help & Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          {userLoggedIn && (
            <>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="cursor-pointer hover:bg-emerald-500/10 rounded-xl mx-2 my-1 px-3 py-2"
                >
                  <User className={cn(
                    "mr-3 text-emerald-500",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  <span className={isMobile ? "text-sm" : ""}>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-500/10 rounded-xl mx-2 my-1 px-3 py-2">
                  <LogOut className={cn(
                    "mr-3",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  <span className={isMobile ? "text-sm" : ""}>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
