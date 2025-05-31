
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
        <Button variant="outline" size="icon" className="rounded-full bg-background/80 backdrop-blur-sm border-cosmic-nebula/20">
          <Settings className="h-5 w-5 text-cosmic-nebula" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 backdrop-blur-md bg-background/80 border-cosmic-nebula/20">
        <DropdownMenuLabel className="font-normal">
          <p className="text-sm font-medium leading-none mb-1">Appearance</p>
          <p className="text-xs leading-none text-muted-foreground">
            Customize your experience
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Theme Toggle */}
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-sm">{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 bg-transparent border-cosmic-nebula/20"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-cosmic-star" />
            ) : (
              <Moon className="h-4 w-4 text-cosmic-nebula" />
            )}
          </Button>
        </div>

        {/* Color Theme Select */}
        <div className="px-2 py-1.5 space-y-1">
          <p className="text-xs text-muted-foreground mb-1">Color Theme</p>
          <Select value={colorTheme} onValueChange={handleColorThemeChange}>
            <SelectTrigger className="w-full h-8 text-xs bg-background/50 border-cosmic-nebula/20">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-cosmic-nebula/20">
              <SelectItem value="cosmic-nebula" className="text-xs">Cosmic Nebula</SelectItem>
              <SelectItem value="teal-purple" className="text-xs">Teal Purple</SelectItem>
              <SelectItem value="blue-pink" className="text-xs">Blue Pink</SelectItem>
              <SelectItem value="green-yellow" className="text-xs">Green Yellow</SelectItem>
              <SelectItem value="sunset" className="text-xs">Sunset</SelectItem>
              <SelectItem value="ocean" className="text-xs">Ocean</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Glass Effect Select */}
        <div className="px-2 py-1.5 space-y-1">
          <p className="text-xs text-muted-foreground mb-1">Glass Effect</p>
          <Select value={glassEffect} onValueChange={handleGlassEffectChange}>
            <SelectTrigger className="w-full h-8 text-xs bg-background/50 border-cosmic-nebula/20">
              <SelectValue placeholder="Select glass effect" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-cosmic-nebula/20">
              <SelectItem value="cosmic" className="text-xs">Cosmic</SelectItem>
              <SelectItem value="frosted" className="text-xs">Frosted</SelectItem>
              <SelectItem value="ultra" className="text-xs">Ultra</SelectItem>
              <SelectItem value="neo" className="text-xs">Neo</SelectItem>
              <SelectItem value="iridescent" className="text-xs">Iridescent</SelectItem>
              <SelectItem value="standard" className="text-xs">Standard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Animation Level Select */}
        <div className="px-2 py-1.5 space-y-1">
          <p className="text-xs text-muted-foreground mb-1">Animation Level</p>
          <Select value={animationLevel} onValueChange={handleAnimationLevelChange}>
            <SelectTrigger className="w-full h-8 text-xs bg-background/50 border-cosmic-nebula/20">
              <SelectValue placeholder="Select animation level" />
            </SelectTrigger>
            <SelectContent className="bg-background/90 backdrop-blur-md border-cosmic-nebula/20">
              <SelectItem value="full" className="text-xs">Full</SelectItem>
              <SelectItem value="moderate" className="text-xs">Moderate</SelectItem>
              <SelectItem value="minimal" className="text-xs">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <DropdownMenuSeparator />
        
        {/* Accessibility Options */}
        <DropdownMenuLabel className="text-xs font-semibold">
          Performance & Accessibility
        </DropdownMenuLabel>
        
        {/* Reduced Motion Toggle */}
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-sm flex items-center gap-2">
            <Zap className="h-4 w-4 text-cosmic-highlight" />
            Reduced Motion
          </span>
          <Switch 
            checked={isReducedMotion}
            onCheckedChange={handleReducedMotionToggle}
            className="data-[state=checked]:bg-cosmic-nebula"
          />
        </div>
        
        {/* Particles Toggle */}
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cosmic-star" />
            Background Effects
          </span>
          <Switch 
            checked={enableParticles}
            onCheckedChange={handleParticlesToggle}
            className="data-[state=checked]:bg-cosmic-nebula"
          />
        </div>
        
        {/* Blur Toggle */}
        <div className="px-2 py-1.5 flex items-center justify-between">
          <span className="text-sm flex items-center gap-2">
            <Eye className="h-4 w-4 text-cosmic-highlight" />
            Blur Effects
          </span>
          <Switch 
            checked={enableBlur}
            onCheckedChange={handleBlurToggle}
            className="data-[state=checked]:bg-cosmic-nebula"
          />
        </div>
        
        <DropdownMenuSeparator />

        {userLoggedIn && (
          <>
            <DropdownMenuItem className="gap-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-red-500">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
