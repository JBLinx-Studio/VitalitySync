
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
  HelpCircle
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
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative rounded-full bg-gradient-to-r from-health-primary/10 to-health-secondary/10 border-health-primary/20 hover:border-health-primary/40 hover:bg-gradient-to-r hover:from-health-primary/20 hover:to-health-secondary/20 transition-all shadow-md hover:shadow-lg"
        >
          <Settings className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} transition-transform hover:rotate-45 duration-300`} />
          <span className="sr-only">Options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-64 mr-2 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-health-primary/20 shadow-xl rounded-xl border-[1.5px]"
        sideOffset={8}
        align="end"
      >
        <div className="px-2 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
          <DropdownMenuLabel className="flex items-center text-lg font-semibold">
            <Settings className="mr-2 h-5 w-5 text-health-primary" />
            Options
          </DropdownMenuLabel>
          <span className="text-xs text-muted-foreground mr-1">v1.2.0</span>
        </div>
        
        <div className="py-2 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Appearance section */}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-health-primary/10">
                <Palette className="mr-2 h-4 w-4 text-health-primary" />
                <span>Appearance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-health-primary/20">
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      onClick={toggleTheme}
                      className="cursor-pointer hover:bg-health-primary/10"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="mr-2 h-4 w-4 text-amber-500" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="mr-2 h-4 w-4 text-indigo-400" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('teal-purple')}
                      className={`cursor-pointer ${colorTheme === 'teal-purple' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#4FD1C5] to-[#9b87f5] mr-2" />
                      <span>Teal-Purple</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('blue-pink')}
                      className={`cursor-pointer ${colorTheme === 'blue-pink' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 mr-2" />
                      <span>Blue-Pink</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('green-yellow')}
                      className={`cursor-pointer ${colorTheme === 'green-yellow' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-yellow-400 mr-2" />
                      <span>Green-Yellow</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('sunset')}
                      className={`cursor-pointer ${colorTheme === 'sunset' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 mr-2" />
                      <span>Sunset</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setColorTheme('ocean')}
                      className={`cursor-pointer ${colorTheme === 'ocean' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-sky-500 to-green-500 mr-2" />
                      <span>Ocean</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-health-primary/10">
                <Sparkles className="mr-2 h-4 w-4 text-health-secondary" />
                <span>Effects</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 border-health-primary/20">
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      onClick={() => setGlassEffect('standard')}
                      className={`cursor-pointer ${glassEffect === 'standard' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-800 mr-2 border border-gray-300 dark:border-gray-700" />
                      <span>Standard Glass</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setGlassEffect('frosted')}
                      className={`cursor-pointer ${glassEffect === 'frosted' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded bg-white/60 dark:bg-black/60 mr-2 border border-white/30 dark:border-white/10" />
                      <span>Frosted Glass</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setGlassEffect('neo')}
                      className={`cursor-pointer ${glassEffect === 'neo' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded bg-white/20 dark:bg-black/40 mr-2 shadow-sm border border-white/30 dark:border-white/5" />
                      <span>Neo Glass</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setGlassEffect('ultra')}
                      className={`cursor-pointer ${glassEffect === 'ultra' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-white/30 to-black/10 dark:from-white/10 dark:to-black/30 mr-2 shadow-md border border-white/40 dark:border-white/5" />
                      <span>Ultra Glass</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => setGlassEffect('iridescent')}
                      className={`cursor-pointer ${glassEffect === 'iridescent' ? 'bg-health-primary/20' : 'hover:bg-health-primary/10'}`}
                    >
                      <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-300/40 via-blue-300/20 to-pink-300/30 dark:from-purple-500/30 dark:via-blue-500/20 dark:to-pink-500/30 mr-2 border border-white/20" />
                      <span>Iridescent</span>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => setEnableParticles(!enableParticles)}
                      className="cursor-pointer hover:bg-health-primary/10"
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
            
            <DropdownMenuItem 
              onClick={() => navigate('/settings')}
              className="cursor-pointer hover:bg-health-primary/10"
            >
              <Eye className="mr-2 h-4 w-4 text-health-primary" />
              <span>Display Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-health-primary/10">
              <Languages className="mr-2 h-4 w-4 text-health-secondary" />
              <span>Language</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            <DropdownMenuItem 
              onClick={() => navigate('/settings?tab=units')}
              className="cursor-pointer hover:bg-health-primary/10"
            >
              <Scale className="mr-2 h-4 w-4 text-amber-500" />
              <span>Units & Measurements</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-health-primary/10">
              <Bell className="mr-2 h-4 w-4 text-amber-500" />
              <span>Notifications</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-health-primary/10">
              <Lock className="mr-2 h-4 w-4 text-health-secondary" />
              <span>Privacy</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer hover:bg-health-primary/10">
              <HelpCircle className="mr-2 h-4 w-4 text-health-primary" />
              <span>Help & Support</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          {userLoggedIn && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="cursor-pointer hover:bg-health-primary/10"
                >
                  <User className="mr-2 h-4 w-4 text-blue-500" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-red-500 hover:bg-red-500/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
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
