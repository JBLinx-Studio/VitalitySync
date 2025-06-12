
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sun,
  Moon,
  Settings,
  LogOut,
  User,
  Palette,
  Eye,
  Zap,
  Sparkles,
  Bell,
  Languages,
  Scale,
  Lock,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassEffect } from '@/types';

interface OptionsMenuProps {
  userLoggedIn?: boolean;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ userLoggedIn = false }) => {
  const { 
    theme, 
    toggleTheme, 
    colorTheme, 
    setColorTheme,
    isReducedMotion, 
    setIsReducedMotion,
    glassEffect,
    setGlassEffect,
    animationLevel,
    setAnimationLevel,
    enableParticles,
    setEnableParticles,
    enableBlur,
    setEnableBlur
  } = useTheme();
  const { toast } = useToast();

  const handleColorThemeChange = (value: string) => {
    setColorTheme(value as any);
    toast({
      title: "Theme Updated",
      description: `Color theme changed to ${value}`,
      variant: "default",
    });
  };

  const handleGlassEffectChange = (value: string) => {
    setGlassEffect(value as GlassEffect);
    toast({
      description: `Glass effect changed to ${value}`,
      variant: "default",
    });
  };

  const handleAnimationLevelChange = (value: string) => {
    setAnimationLevel(value as any);
    toast({
      description: `Animation level changed to ${value}`,
      variant: "default",
    });
  };

  const handleReducedMotionToggle = (checked: boolean) => {
    setIsReducedMotion(checked);
    toast({
      description: `Reduced motion ${checked ? 'enabled' : 'disabled'}`,
      variant: "default",
    });
  };

  const handleParticlesToggle = (checked: boolean) => {
    setEnableParticles(checked);
    toast({
      description: `Particles ${checked ? 'enabled' : 'disabled'}`,
      variant: "default",
    });
  };

  const handleBlurToggle = (checked: boolean) => {
    setEnableBlur(checked);
    toast({
      description: `Blur effects ${checked ? 'enabled' : 'disabled'}`,
      variant: "default",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/60 dark:border-gray-700/60 hover:bg-white dark:hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-10 w-10"
        >
          <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300 transition-transform hover:rotate-45 duration-300" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        sideOffset={8}
        className="w-80 mr-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60 shadow-2xl rounded-2xl border-2 p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 border-b border-gray-200/60 dark:border-gray-700/60">
          <DropdownMenuLabel className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 p-0">
            <Settings className="h-5 w-5 text-blue-500" />
            Options & Settings
          </DropdownMenuLabel>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Customize your experience
          </p>
        </div>

        <div className="max-h-[70vh] overflow-y-auto py-2">
          {/* Theme Section */}
          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Palette className="h-4 w-4 text-purple-500" />
              Appearance
            </h3>
            
            {/* Theme Toggle */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 hover:scale-105 transition-transform"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-600" />
                )}
              </Button>
            </div>

            {/* Color Theme Select */}
            <div className="py-2 px-3 space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Color Theme</p>
              <Select value={colorTheme} onValueChange={handleColorThemeChange}>
                <SelectTrigger className="w-full h-9 text-sm bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60 rounded-xl">
                  <SelectItem value="cosmic-nebula" className="text-sm text-gray-900 dark:text-gray-100">Cosmic Nebula</SelectItem>
                  <SelectItem value="teal-purple" className="text-sm text-gray-900 dark:text-gray-100">Teal Purple</SelectItem>
                  <SelectItem value="blue-pink" className="text-sm text-gray-900 dark:text-gray-100">Blue Pink</SelectItem>
                  <SelectItem value="green-yellow" className="text-sm text-gray-900 dark:text-gray-100">Green Yellow</SelectItem>
                  <SelectItem value="sunset" className="text-sm text-gray-900 dark:text-gray-100">Sunset</SelectItem>
                  <SelectItem value="ocean" className="text-sm text-gray-900 dark:text-gray-100">Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Glass Effect Select */}
            <div className="py-2 px-3 space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Glass Effect</p>
              <Select value={glassEffect} onValueChange={handleGlassEffectChange}>
                <SelectTrigger className="w-full h-9 text-sm bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select glass effect" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60 rounded-xl">
                  <SelectItem value="cosmic" className="text-sm text-gray-900 dark:text-gray-100">Cosmic</SelectItem>
                  <SelectItem value="frosted" className="text-sm text-gray-900 dark:text-gray-100">Frosted</SelectItem>
                  <SelectItem value="ultra" className="text-sm text-gray-900 dark:text-gray-100">Ultra</SelectItem>
                  <SelectItem value="neo" className="text-sm text-gray-900 dark:text-gray-100">Neo</SelectItem>
                  <SelectItem value="iridescent" className="text-sm text-gray-900 dark:text-gray-100">Iridescent</SelectItem>
                  <SelectItem value="standard" className="text-sm text-gray-900 dark:text-gray-100">Standard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Animation Level Select */}
            <div className="py-2 px-3 space-y-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Animation Level</p>
              <Select value={animationLevel} onValueChange={handleAnimationLevelChange}>
                <SelectTrigger className="w-full h-9 text-sm bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select animation level" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60 rounded-xl">
                  <SelectItem value="full" className="text-sm text-gray-900 dark:text-gray-100">Full</SelectItem>
                  <SelectItem value="moderate" className="text-sm text-gray-900 dark:text-gray-100">Moderate</SelectItem>
                  <SelectItem value="minimal" className="text-sm text-gray-900 dark:text-gray-100">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DropdownMenuSeparator className="mx-4 bg-gray-200/60 dark:bg-gray-700/60" />
          
          {/* Performance & Accessibility */}
          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              Performance & Accessibility
            </h3>
            
            {/* Reduced Motion Toggle */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Eye className="h-4 w-4 text-green-500" />
                Reduced Motion
              </span>
              <Switch 
                checked={isReducedMotion}
                onCheckedChange={handleReducedMotionToggle}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            
            {/* Particles Toggle */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Background Effects
              </span>
              <Switch 
                checked={enableParticles}
                onCheckedChange={handleParticlesToggle}
                className="data-[state=checked]:bg-purple-500"
              />
            </div>
            
            {/* Blur Toggle */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-500" />
                Blur Effects
              </span>
              <Switch 
                checked={enableBlur}
                onCheckedChange={handleBlurToggle}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
          </div>
          
          <DropdownMenuSeparator className="mx-4 bg-gray-200/60 dark:bg-gray-700/60" />

          {/* System Settings */}
          <div className="px-4 py-3 space-y-1">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Settings className="h-4 w-4 text-gray-500" />
              System
            </h3>
            
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <Bell className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Notifications</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <Scale className="h-4 w-4 text-green-500" />
              <span className="font-medium">Units & Measurements</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <Languages className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Language</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <Lock className="h-4 w-4 text-red-500" />
              <span className="font-medium">Privacy</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <HelpCircle className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Help & Support</span>
            </DropdownMenuItem>
          </div>

          {userLoggedIn && (
            <>
              <DropdownMenuSeparator className="mx-4 bg-gray-200/60 dark:bg-gray-700/60" />
              <div className="px-4 py-3 space-y-1">
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer">
                  <User className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </DropdownMenuItem>
              </div>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
