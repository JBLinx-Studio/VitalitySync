
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type MeasurementSystem = 'metric' | 'imperial';
type ColorTheme = 'teal-purple' | 'blue-pink' | 'green-yellow' | 'sunset' | 'ocean' | 'cosmic-nebula';
type GlassEffect = 'standard' | 'frosted' | 'neo' | 'ultra' | 'iridescent' | 'cosmic';
type AnimationLevel = 'minimal' | 'moderate' | 'full';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  measurementSystem: MeasurementSystem;
  setMeasurementSystem: (system: MeasurementSystem) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  isReducedMotion: boolean;
  setIsReducedMotion: (reduced: boolean) => void;
  glassEffect: GlassEffect;
  setGlassEffect: (effect: GlassEffect) => void;
  animationLevel: AnimationLevel;
  setAnimationLevel: (level: AnimationLevel) => void;
  enableParticles: boolean;
  setEnableParticles: (enabled: boolean) => void;
  enableBlur: boolean;
  setEnableBlur: (enabled: boolean) => void;
  cardStyle: string;
  setCardStyle: (style: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Theme state
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('vitality-theme');
    return (savedTheme as Theme) || 'dark';
  });
  
  // Measurement system state
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>(() => {
    const savedSystem = localStorage.getItem('vitality-measurement');
    return (savedSystem as MeasurementSystem) || 'metric';
  });

  // Color theme state
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const savedColorTheme = localStorage.getItem('vitality-color-theme');
    return (savedColorTheme as ColorTheme) || 'cosmic-nebula';
  });

  // Reduced motion state
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    const savedMotion = localStorage.getItem('vitality-reduced-motion');
    return savedMotion === 'true';
  });

  // Glass effect state
  const [glassEffect, setGlassEffect] = useState<GlassEffect>(() => {
    const savedEffect = localStorage.getItem('vitality-glass-effect');
    return (savedEffect as GlassEffect) || 'cosmic';
  });

  // Animation level state
  const [animationLevel, setAnimationLevel] = useState<AnimationLevel>(() => {
    const savedLevel = localStorage.getItem('vitality-animation-level');
    return (savedLevel as AnimationLevel) || 'moderate';
  });

  // Particles state
  const [enableParticles, setEnableParticles] = useState(() => {
    const savedParticles = localStorage.getItem('vitality-particles');
    return savedParticles !== 'false'; // Default to true
  });
  
  // Blur effect state
  const [enableBlur, setEnableBlur] = useState(() => {
    const savedBlur = localStorage.getItem('vitality-enable-blur');
    return savedBlur !== 'false'; // Default to true
  });
  
  // Card style state
  const [cardStyle, setCardStyle] = useState(() => {
    const savedCardStyle = localStorage.getItem('vitality-card-style');
    return savedCardStyle || 'cosmic'; // Default to cosmic
  });

  // Apply theme with enhanced transition
  useEffect(() => {
    localStorage.setItem('vitality-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Apply smooth transition effect when switching themes
    document.documentElement.style.transition = 'background-color 0.7s ease, color 0.7s ease';
  }, [theme]);

  // Apply measurement system
  useEffect(() => {
    localStorage.setItem('vitality-measurement', measurementSystem);
  }, [measurementSystem]);

  // Apply color theme with enhanced effects
  useEffect(() => {
    localStorage.setItem('vitality-color-theme', colorTheme);
    
    // Apply different color themes to the root element
    document.documentElement.setAttribute('data-color-theme', colorTheme);
    
    let primaryColor, secondaryColor;
    
    switch (colorTheme) {
      case 'blue-pink':
        primaryColor = '#3B82F6'; // blue-500
        secondaryColor = '#EC4899'; // pink-500
        document.documentElement.style.setProperty('--primary', '217 91% 60%');
        document.documentElement.style.setProperty('--secondary', '330 86% 62%');
        break;
      case 'green-yellow':
        primaryColor = '#10B981'; // green-500
        secondaryColor = '#FBBF24'; // yellow-400
        document.documentElement.style.setProperty('--primary', '158 64% 40%');
        document.documentElement.style.setProperty('--secondary', '43 96% 56%');
        break;
      case 'sunset':
        primaryColor = '#F97316'; // orange-500
        secondaryColor = '#EC4899'; // pink-500
        document.documentElement.style.setProperty('--primary', '24 95% 53%');
        document.documentElement.style.setProperty('--secondary', '330 86% 62%');
        break;
      case 'ocean':
        primaryColor = '#0EA5E9'; // sky-500
        secondaryColor = '#10B981'; // green-500
        document.documentElement.style.setProperty('--primary', '199 89% 48%');
        document.documentElement.style.setProperty('--secondary', '158 64% 40%');
        break;
      case 'cosmic-nebula':
        primaryColor = '#7C3AED'; // cosmic-nebula
        secondaryColor = '#06B6D4'; // cosmic-highlight
        document.documentElement.style.setProperty('--primary', '265 84% 58%');
        document.documentElement.style.setProperty('--secondary', '187 85% 43%');
        break;
      default: // teal-purple
        primaryColor = '#4FD1C5'; // health-primary
        secondaryColor = '#9b87f5'; // health-secondary
        document.documentElement.style.setProperty('--primary', '174 83% 56%');
        document.documentElement.style.setProperty('--secondary', '262 85% 74%');
    }
    
    // Update CSS variables for gradient effects
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    document.documentElement.style.setProperty('--color-secondary', secondaryColor);
    
    // Update background gradients based on color theme
    const bg = document.querySelector('.app-background');
    if (bg) {
      if (theme === 'light') {
        bg.setAttribute('style', `
          background-image: radial-gradient(circle at top right, ${primaryColor}33, transparent 70%),
          radial-gradient(circle at bottom left, ${secondaryColor}33, transparent 70%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(245, 245, 255, 0.98));
        `);
      } else {
        bg.setAttribute('style', `
          background-image: radial-gradient(circle at top right, ${primaryColor}33, transparent 70%),
          radial-gradient(circle at bottom left, ${secondaryColor}33, transparent 70%),
          linear-gradient(to bottom, rgba(15, 15, 25, 0.97), rgba(10, 10, 20, 0.98));
        `);
      }
    }
    
    // Update particle colors with enhanced visuals
    document.documentElement.style.setProperty('--particle-primary', primaryColor);
    document.documentElement.style.setProperty('--particle-secondary', secondaryColor);
    
    // Update all existing particles to match new theme
    document.querySelectorAll('.bg-particle').forEach((particle: Element) => {
      (particle as HTMLElement).style.background = `linear-gradient(135deg, ${primaryColor}AA, ${secondaryColor}AA)`;
    });
    
    document.querySelectorAll('.firefly').forEach((firefly: Element) => {
      if (theme === 'dark') {
        (firefly as HTMLElement).style.backgroundColor = primaryColor;
        (firefly as HTMLElement).style.boxShadow = `0 0 15px 2px ${primaryColor}CC`;
      } else {
        (firefly as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        (firefly as HTMLElement).style.boxShadow = '0 0 15px 2px rgba(255, 255, 255, 0.8)';
      }
    });
  }, [colorTheme, theme]);

  // Apply reduced motion preference with enhanced logic
  useEffect(() => {
    localStorage.setItem('vitality-reduced-motion', String(isReducedMotion));
    
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      
      // Remove any existing particles and animations
      document.querySelectorAll('.bg-particle, .firefly, .interactive-orb, .bg-orb, .animated-orb').forEach(el => {
        el.remove();
      });
      
      // Disable animations
      document.querySelectorAll('.animate-float, .animate-float-slow, .animate-float-slower, .animate-pulse, .animate-pulse-soft').forEach(el => {
        el.classList.remove('animate-float', 'animate-float-slow', 'animate-float-slower', 'animate-pulse', 'animate-pulse-soft');
      });
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  // Apply glass effect styles with enhanced settings
  useEffect(() => {
    localStorage.setItem('vitality-glass-effect', glassEffect);
    document.documentElement.setAttribute('data-glass', glassEffect);
    
    // Adjust backdrop filter blur based on glass effect
    let blurAmount = '12px';
    
    switch (glassEffect) {
      case 'frosted':
        blurAmount = '16px';
        break;
      case 'neo':
        blurAmount = '10px';
        break;
      case 'ultra':
        blurAmount = '20px';
        break;
      case 'iridescent':
        blurAmount = '16px';
        break;
      case 'cosmic':
        blurAmount = '14px';
        break;
      default:
        blurAmount = '12px';
    }
    
    // Update backdrop blur for all glass elements if blur is enabled
    if (enableBlur) {
      document.querySelectorAll('.glass-card, .frosted-glass, .neo-glass, .ultra-glass, .iridescent-glass, .cosmic-glass').forEach((el: Element) => {
        (el as HTMLElement).style.backdropFilter = `blur(${blurAmount})`;
      });
    } else {
      document.querySelectorAll('.glass-card, .frosted-glass, .neo-glass, .ultra-glass, .iridescent-glass, .cosmic-glass').forEach((el: Element) => {
        (el as HTMLElement).style.backdropFilter = 'none';
      });
    }
  }, [glassEffect, enableBlur]);

  // Apply animation level with enhanced settings
  useEffect(() => {
    localStorage.setItem('vitality-animation-level', animationLevel);
    document.documentElement.setAttribute('data-animation', animationLevel);
    
    // Remove all animation level classes
    document.documentElement.classList.remove('animation-minimal', 'animation-moderate', 'animation-full');
    
    // Add the appropriate animation level class
    document.documentElement.classList.add(`animation-${animationLevel}`);
    
    // Adjust animation intensities based on level
    if (animationLevel === 'minimal') {
      // Reduce or disable most animations
      document.querySelectorAll('.animate-float, .animate-float-slow, .animate-float-slower').forEach(el => {
        el.classList.remove('animate-float', 'animate-float-slow', 'animate-float-slower');
      });
    } else if (animationLevel === 'full' && !isReducedMotion) {
      // Enhance animations for full experience
      document.querySelectorAll('.card-3d-effect').forEach(el => {
        el.classList.add('tilt-card');
      });
    }
  }, [animationLevel, isReducedMotion]);

  // Manage particles with enhanced settings
  useEffect(() => {
    localStorage.setItem('vitality-particles', String(enableParticles));
    // Particles are managed in the Layout component
  }, [enableParticles]);
  
  // Manage blur effect
  useEffect(() => {
    localStorage.setItem('vitality-enable-blur', String(enableBlur));
    
    if (!enableBlur) {
      document.querySelectorAll('.glass-card, .frosted-glass, .neo-glass, .ultra-glass, .iridescent-glass, .cosmic-glass').forEach((el: Element) => {
        (el as HTMLElement).style.backdropFilter = 'none';
      });
    } else {
      // Re-apply the appropriate blur based on glass effect
      let blurAmount = '12px';
      
      switch (glassEffect) {
        case 'frosted':
          blurAmount = '16px';
          break;
        case 'neo':
          blurAmount = '10px';
          break;
        case 'ultra':
          blurAmount = '20px';
          break;
        case 'iridescent':
          blurAmount = '16px';
          break;
        case 'cosmic':
          blurAmount = '14px';
          break;
        default:
          blurAmount = '12px';
      }
      
      document.querySelectorAll('.glass-card, .frosted-glass, .neo-glass, .ultra-glass, .iridescent-glass, .cosmic-glass').forEach((el: Element) => {
        (el as HTMLElement).style.backdropFilter = `blur(${blurAmount})`;
      });
    }
  }, [enableBlur, glassEffect]);
  
  // Manage card style
  useEffect(() => {
    localStorage.setItem('vitality-card-style', cardStyle);
  }, [cardStyle]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        toggleTheme, 
        setTheme, 
        measurementSystem, 
        setMeasurementSystem,
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
        setEnableBlur,
        cardStyle,
        setCardStyle
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
