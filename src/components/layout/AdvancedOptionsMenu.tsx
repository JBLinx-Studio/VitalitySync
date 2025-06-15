
import React, { useMemo } from 'react';
import {
  Moon,
  Sun,
  Settings,
  LogOut,
  User,
  Bell,
  Palette,
  Zap,
  Lock,
  HelpCircle,
  Monitor,
  Eye,
  Sparkles,
  Languages,
  Scale
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
import { Switch } from "@/components/ui/switch";
import { useNavigate } from 'react-router-dom';
import { useViewport } from '@/hooks/use-viewport';
import { cn } from '@/lib/utils';

interface AdvancedOptionsMenuProps {
  userLoggedIn?: boolean;
}

const AdvancedOptionsMenu: React.FC<AdvancedOptionsMenuProps> = ({ userLoggedIn = false }) => {
  const { 
    theme, 
    toggleTheme, 
    setColorTheme, 
    colorTheme,
    enableParticles,
    setEnableParticles,
    isReducedMotion,
    setIsReducedMotion,
    enableBlur,
    setEnableBlur
  } = useTheme();
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  
  const colorThemes = useMemo(() => [
    { key: 'cosmic-nebula', colors: 'from-purple-600 to-blue-600', name: 'Cosmic Nebula' },
    { key: 'teal-purple', colors: 'from-[#4FD1C5] to-[#9b87f5]', name: 'Teal Purple' },
    { key: 'blue-pink', colors: 'from-blue-500 to-pink-500', name: 'Blue Pink' },
    { key: 'green-yellow', colors: 'from-green-500 to-yellow-400', name: 'Green Yellow' },
    { key: 'sunset', colors: 'from-orange-500 to-pink-500', name: 'Sunset' },
    { key: 'ocean', colors: 'from-sky-500 to-green-500', name: 'Ocean' }
  ], []);
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "icon"}
          className={cn(
            "relative rounded-xl bg-white/60 dark:bg-slate-800/60 border-white/40 dark:border-slate-700/40 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:scale-110 backdrop-blur-xl shadow-lg hover:shadow-xl active:scale-95 group",
            isMobile ? "px-2.5 py-1.5 h-8" : "w-9 h-9"
          )}
          aria-label="Advanced settings and options"
        >
          <Settings className={cn(
            "text-gray-700 dark:text-gray-300 transition-all duration-500 group-hover:rotate-180",
            isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
          )} />
          {isMobile && <span className="ml-1 text-xs font-medium">Settings</span>}
          
          {/* Enhanced status indicator */}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-pulse shadow-lg"></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className={cn(
          "backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border-white/40 dark:border-slate-700/40 shadow-2xl rounded-2xl border overflow-hidden",
          isMobile ? "w-72 mr-1" : "w-80 mr-2"
        )}
        sideOffset={12}
        align="end"
      >
        {/* Enhanced Header */}
        <div className={cn(
          "relative overflow-hidden bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 border-b border-white/20 dark:border-slate-700/20",
          isMobile ? "px-3 py-2.5" : "px-4 py-3"
        )}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 animate-pulse"></div>
          <DropdownMenuLabel className={cn(
            "relative flex items-center font-bold text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text",
            isMobile ? "text-sm" : "text-base"
          )}>
            <Settings className={cn(
              "mr-2 text-emerald-500 animate-spin-slow",
              isMobile ? "h-4 w-4" : "h-5 w-5"
            )} />
            Advanced Settings
          </DropdownMenuLabel>
          <p className={cn(
            "relative text-gray-600 dark:text-gray-400 font-medium",
            isMobile ? "text-xs mt-0.5" : "text-sm mt-1"
          )}>
            Customize your experience
          </p>
        </div>
        
        <div className={cn(
          "py-2 max-h-[75vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600",
          isMobile ? "space-y-1" : "space-y-2"
        )}>
          {/* Theme Controls */}
          <DropdownMenuGroup>
            <div className={cn(isMobile ? "px-2" : "px-3")}>
              <h3 className={cn(
                "font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
                isMobile ? "text-xs" : "text-sm"
              )}>
                <Palette className="h-4 w-4 text-purple-500" />
                Appearance
              </h3>
              
              {/* Enhanced Theme Toggle */}
              <DropdownMenuItem 
                onClick={toggleTheme}
                className={cn(
                  "cursor-pointer hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-blue-500/10 rounded-xl mx-1 transition-all duration-300 group",
                  isMobile ? "px-2 py-2" : "px-3 py-2.5"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Sun className={cn(
                        "text-amber-500 group-hover:rotate-180 transition-transform duration-500",
                        isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                      )} />
                    ) : (
                      <Moon className={cn(
                        "text-slate-600 group-hover:rotate-12 transition-transform duration-300",
                        isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                      )} />
                    )}
                    <span className={cn(
                      "font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}>
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </div>
                  <div className="w-8 h-4 bg-gray-200 dark:bg-gray-600 rounded-full relative transition-colors">
                    <div className={cn(
                      "w-3 h-3 bg-white rounded-full shadow-md transform transition-transform absolute top-0.5",
                      theme === 'dark' ? 'translate-x-4' : 'translate-x-0.5'
                    )}></div>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuGroup>

          <DropdownMenuSeparator className="mx-2 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

          {/* Enhanced Color Themes (Desktop Only) */}
          {!isMobile && (
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 rounded-xl mx-2 px-3 py-2.5 transition-all duration-300 group">
                <Palette className="mr-3 h-4 w-4 text-purple-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Color Themes</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border-white/40 dark:border-slate-700/40 rounded-xl shadow-2xl">
                  <DropdownMenuGroup>
                    {colorThemes.map(({ key, colors, name }) => (
                      <DropdownMenuItem 
                        key={key}
                        onClick={() => setColorTheme(key as any)}
                        className={cn(
                          "cursor-pointer rounded-lg px-3 py-2.5 mx-1 transition-all duration-300 group",
                          colorTheme === key ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 shadow-lg' : 'hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10'
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-full bg-gradient-to-r shadow-lg mr-3 group-hover:scale-110 transition-transform",
                          colors
                        )} />
                        <span className="text-sm font-medium">{name}</span>
                        {colorTheme === key && (
                          <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          )}
          
          <DropdownMenuSeparator className="mx-2 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          
          {/* Performance & Accessibility */}
          <DropdownMenuGroup>
            <div className={cn(isMobile ? "px-2" : "px-3")}>
              <h3 className={cn(
                "font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
                isMobile ? "text-xs" : "text-sm"
              )}>
                <Zap className="h-4 w-4 text-orange-500" />
                Performance
              </h3>
              
              {/* Enhanced Toggle Controls */}
              <div className="space-y-1">
                <div className={cn(
                  "flex items-center justify-between rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer",
                  isMobile ? "px-2 py-2" : "px-3 py-2.5"
                )} onClick={() => setEnableParticles(!enableParticles)}>
                  <div className="flex items-center gap-2">
                    <Sparkles className={cn(
                      "text-purple-500 group-hover:scale-110 transition-transform",
                      isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                    )} />
                    <span className={cn(
                      "font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}>Background Effects</span>
                  </div>
                  <Switch 
                    checked={enableParticles}
                    onCheckedChange={setEnableParticles}
                    className="data-[state=checked]:bg-purple-500 scale-75"
                  />
                </div>
                
                <div className={cn(
                  "flex items-center justify-between rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer",
                  isMobile ? "px-2 py-2" : "px-3 py-2.5"
                )} onClick={() => setEnableBlur(!enableBlur)}>
                  <div className="flex items-center gap-2">
                    <Eye className={cn(
                      "text-blue-500 group-hover:scale-110 transition-transform",
                      isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                    )} />
                    <span className={cn(
                      "font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}>Blur Effects</span>
                  </div>
                  <Switch 
                    checked={enableBlur}
                    onCheckedChange={setEnableBlur}
                    className="data-[state=checked]:bg-blue-500 scale-75"
                  />
                </div>
                
                <div className={cn(
                  "flex items-center justify-between rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 group cursor-pointer",
                  isMobile ? "px-2 py-2" : "px-3 py-2.5"
                )} onClick={() => setIsReducedMotion(!isReducedMotion)}>
                  <div className="flex items-center gap-2">
                    <Monitor className={cn(
                      "text-green-500 group-hover:scale-110 transition-transform",
                      isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                    )} />
                    <span className={cn(
                      "font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}>Reduced Motion</span>
                  </div>
                  <Switch 
                    checked={isReducedMotion}
                    onCheckedChange={setIsReducedMotion}
                    className="data-[state=checked]:bg-green-500 scale-75"
                  />
                </div>
              </div>
            </div>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator className="mx-2 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
          
          {/* System Settings */}
          <DropdownMenuGroup>
            <div className={cn(isMobile ? "px-2" : "px-3")}>
              <h3 className={cn(
                "font-semibold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2",
                isMobile ? "text-xs" : "text-sm"
              )}>
                <Settings className="h-4 w-4 text-gray-500" />
                System
              </h3>
              
              <div className="space-y-1">
                {[
                  { icon: Bell, label: 'Notifications', color: 'text-blue-500' },
                  { icon: Languages, label: 'Language', color: 'text-purple-500' },
                  { icon: Scale, label: 'Units', color: 'text-green-500' },
                  { icon: Lock, label: 'Privacy', color: 'text-red-500' },
                  { icon: HelpCircle, label: 'Help', color: 'text-orange-500' }
                ].map(({ icon: Icon, label, color }) => (
                  <DropdownMenuItem 
                    key={label}
                    className={cn(
                      "cursor-pointer hover:bg-gradient-to-r hover:from-white/80 hover:to-gray-50/80 dark:hover:from-slate-800/80 dark:hover:to-slate-700/80 rounded-lg transition-all duration-300 group",
                      isMobile ? "px-2 py-2" : "px-3 py-2.5"
                    )}
                  >
                    <Icon className={cn(
                      `${color} mr-3 group-hover:scale-110 transition-transform`,
                      isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                    )} />
                    <span className={cn(
                      "font-medium",
                      isMobile ? "text-xs" : "text-sm"
                    )}>{label}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </div>
          </DropdownMenuGroup>

          {userLoggedIn && (
            <>
              <DropdownMenuSeparator className="mx-2 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
              <DropdownMenuGroup>
                <div className={cn(isMobile ? "px-2" : "px-3")}>
                  <div className="space-y-1">
                    <DropdownMenuItem 
                      onClick={() => navigate('/profile')}
                      className={cn(
                        "cursor-pointer hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-blue-500/10 rounded-lg transition-all duration-300 group",
                        isMobile ? "px-2 py-2" : "px-3 py-2.5"
                      )}
                    >
                      <User className={cn(
                        "mr-3 text-emerald-500 group-hover:scale-110 transition-transform",
                        isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                      )} />
                      <span className={cn(
                        "font-medium",
                        isMobile ? "text-xs" : "text-sm"
                      )}>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className={cn(
                      "cursor-pointer text-red-500 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-pink-500/10 rounded-lg transition-all duration-300 group",
                      isMobile ? "px-2 py-2" : "px-3 py-2.5"
                    )}>
                      <LogOut className={cn(
                        "mr-3 group-hover:scale-110 transition-transform",
                        isMobile ? "h-3.5 w-3.5" : "h-4 w-4"
                      )} />
                      <span className={cn(
                        "font-medium",
                        isMobile ? "text-xs" : "text-sm"
                      )}>Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuGroup>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdvancedOptionsMenu;
