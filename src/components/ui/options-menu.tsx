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
  Sparkles,
  Eye,
  Scale,
  Lock,
  HelpCircle,
  Star
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
            "relative rounded-full bg-gradient-to-r from-cosmic-nebula/10 to-cosmic-highlight/10 border-cosmic-nebula/20 hover:border-cosmic-nebula/40 hover:bg-gradient-to-r hover:from-cosmic-nebula/20 hover:to-cosmic-highlight/20 transition-all shadow-cosmic",
            isMobile ? "px-2" : ""
          )}
        >
          <Settings className={cn(
            `${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-transform hover:rotate-45 duration-300`,
            isMobile ? "h-4 w-4" : "h-5 w-5"
          )} />
          {isMobile && <span className="ml-1 text-xs">Settings</span>}
          <span className="sr-only">Options</span>
          <span className={cn(
            "absolute rounded-full bg-cosmic-nebula animate-pulse",
            isMobile ? "-top-0.5 -right-0.5 w-2 h-2" : "-top-1 -right-1 w-3 h-3"
          )}></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={cn(
          "backdrop-blur-lg bg-white/90 dark:bg-cosmic-deep/90 border-cosmic-nebula/20 shadow-cosmic rounded-xl border-[1.5px]",
          isMobile ? "w-56 mr-1" : "w-64 mr-2"
        )}
        sideOffset={8}
        align="end"
      >
        <div className={cn(
          "flex items-center justify-between bg-gradient-to-r from-cosmic-nebula/5 to-cosmic-highlight/5 border-b border-cosmic-nebula/10 dark:border-cosmic-nebula/20 rounded-t-xl",
          isMobile ? "px-2 py-2" : "px-2 py-3"
        )}>
          <DropdownMenuLabel className={cn(
            "flex items-center font-semibold",
            isMobile ? "text-base" : "text-lg"
          )}>
            <Settings className={cn(
              "mr-2 text-cosmic-nebula",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} />
            Options
          </DropdownMenuLabel>
          <span className={cn(
            "text-muted-foreground mr-1",
            isMobile ? "text-xs" : "text-xs"
          )}>v1.2.0</span>
        </div>
        
        <div className={cn(
          "py-2 scrollbar-thin",
          isMobile ? "max-h-[60vh]" : "max-h-[calc(100vh-120px)]",
          "overflow-y-auto"
        )}>
          {/* Appearance section */}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-cosmic-nebula/10">
                <Palette className={cn(
                  "mr-2 text-cosmic-nebula",
                  isMobile ? "h-4 w-4" : "h-4 w-4"
                )} />
                <span className={isMobile ? "text-sm" : ""}>Appearance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className={cn(
                  "backdrop-blur-lg bg-white/90 dark:bg-cosmic-deep/90 border-cosmic-nebula/20",
                  isMobile ? "w-48" : ""
                )}>
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      onClick={toggleTheme}
                      className="cursor-pointer hover:bg-cosmic-nebula/10"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className={cn(
                            "mr-2 text-cosmic-star",
                            isMobile ? "h-4 w-4" : "h-4 w-4"
                          )} />
                          <span className={isMobile ? "text-sm" : ""}>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className={cn(
                            "mr-2 text-cosmic-nebula",
                            isMobile ? "h-4 w-4" : "h-4 w-4"
                          )} />
                          <span className={isMobile ? "text-sm" : ""}>Dark Mode</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('teal-purple')}
                      className={`cursor-pointer ${colorTheme === 'teal-purple' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#9b87f5] mr-2" />
                      <span>Teal-Purple</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('blue-pink')}
                      className={`cursor-pointer ${colorTheme === 'blue-pink' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 mr-2" />
                      <span>Blue-Pink</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('green-yellow')}
                      className={`cursor-pointer ${colorTheme === 'green-yellow' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-yellow-400 mr-2" />
                      <span>Green-Yellow</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('sunset')}
                      className={`cursor-pointer ${colorTheme === 'sunset' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mr-2" />
                      <span>Sunset</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('ocean')}
                      className={`cursor-pointer ${colorTheme === 'ocean' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-sky-500 to-green-500 mr-2" />
                      <span>Ocean</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('cosmic-nebula')}
                      className={`cursor-pointer ${colorTheme === 'cosmic-nebula' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cosmic-nebula to-cosmic-highlight mr-2 animate-pulse-soft" />
                      <span>Cosmic Nebula</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* Effects submenu - simplified for mobile */}
            {!isMobile && (
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:bg-cosmic-nebula/10">
                  <Sparkles className="mr-2 h-4 w-4 text-cosmic-star" />
                  <span>Effects</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="backdrop-blur-lg bg-white/90 dark:bg-cosmic-deep/90 border-cosmic-nebula/20">
                    <DropdownMenuGroup>
                      <DropdownMenuItem 
                        onClick={() => setGlassEffect('standard')}
                        className={`cursor-pointer ${glassEffect === 'standard' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                      >
                        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-800 mr-2 border border-gray-300 dark:border-gray-700" />
                        <span>Standard Glass</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => setGlassEffect('frosted')}
                        className={`cursor-pointer ${glassEffect === 'frosted' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                      >
                        <div className="w-4 h-4 rounded bg-white/60 dark:bg-black/60 mr-2 border border-white/30 dark:border-white/10" />
                        <span>Frosted Glass</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => setGlassEffect('neo')}
                        className={`cursor-pointer ${glassEffect === 'neo' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                      >
                        <div className="w-4 h-4 rounded bg-white/20 dark:bg-black/40 mr-2 shadow-sm border border-white/30 dark:border-white/5" />
                        <span>Neo Glass</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => setGlassEffect('ultra')}
                        className={`cursor-pointer ${glassEffect === 'ultra' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                      >
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-white/30 to-black/10 dark:from-white/10 dark:to-black/30 mr-2 shadow-md border border-white/40 dark:border-white/5" />
                        <span>Ultra Glass</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        onClick={() => setGlassEffect('iridescent')}
                        className={`cursor-pointer ${glassEffect === 'iridescent' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                      >
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-300/40 via-blue-300/20 to-pink-300/30 dark:from-purple-500/30 dark:via-blue-500/20 dark:to-pink-500/30 mr-2 border border-white/20" />
                        <span>Iridescent</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        onClick={() => setGlassEffect('cosmic')}
                        className={`cursor-pointer ${glassEffect === 'cosmic' ? 'bg-cosmic-nebula/20' : 'hover:bg-cosmic-nebula/10'}`}
                      >
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-cosmic-nebula/30 via-cosmic-deep/20 to-cosmic-highlight/30 mr-2 border border-cosmic-nebula/20 animate-pulse" />
                        <span>Cosmic</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={() => setEnableParticles(!enableParticles)}
                        className="cursor-pointer hover:bg-cosmic-nebula/10"
                      >
                        <span className="w-4 h-4 flex items-center justify-center mr-2">
                          {enableParticles ? '✓' : ''}
                        </span>
                        <span>Background Particles</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            )}
            
            {/* Simplified effects toggle for mobile */}
            {isMobile && (
              <DropdownMenuItem 
                onClick={() => setEnableParticles(!enableParticles)}
                className="cursor-pointer hover:bg-cosmic-nebula/10"
              >
                <Sparkles className="mr-2 h-4 w-4 text-cosmic-star" />
                <span className="text-sm">
                  {enableParticles ? 'Disable' : 'Enable'} Effects
                </span>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem 
              onClick={() => navigate('/settings')}
              className="cursor-pointer hover:bg-cosmic-nebula/10"
            >
              <Eye className={cn(
                "mr-2 text-cosmic-highlight",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>Display</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-nebula/10">
              <Languages className="mr-2 h-4 w-4 text-cosmic-accent" />
              <span>Language</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          
          {/* Condensed settings for mobile */}
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => navigate('/settings?tab=units')}
              className="cursor-pointer hover:bg-cosmic-nebula/10"
            >
              <Scale className={cn(
                "mr-2 text-cosmic-star",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>
                {isMobile ? "Units" : "Units & Measurements"}
              </span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-nebula/10">
              <Bell className={cn(
                "mr-2 text-cosmic-star",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span className={isMobile ? "text-sm" : ""}>Notifications</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-nebula/10">
              <Lock className={cn(
                "mr-2 text-cosmic-accent",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span>Privacy</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-cosmic-nebula/10">
              <HelpCircle className={cn(
                "mr-2 text-cosmic-highlight",
                isMobile ? "h-4 w-4" : "h-4 w-4"
              )} />
              <span>Help & Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          {userLoggedIn && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="cursor-pointer hover:bg-cosmic-nebula/10"
                >
                  <User className={cn(
                    "mr-2 text-cosmic-nebula",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  <span className={isMobile ? "text-sm" : ""}>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-500/10">
                  <LogOut className={cn(
                    "mr-2",
                    isMobile ? "h-4 w-4" : "h-4 w-4"
                  )} />
                  <span className={isMobile ? "text-sm" : ""}>Log out</span>
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
