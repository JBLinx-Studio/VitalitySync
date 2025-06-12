
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type MeasurementSystem = 'metric' | 'imperial';
type ColorTheme = 'teal-purple' | 'blue-pink' | 'green-yellow';
type GlassEffect = 'standard' | 'frosted' | 'neo' | 'ultra';
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
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('vitality-theme');
    return (savedTheme as Theme) || 'light';
  });
  
  const [measurementSystem, setMeasurementSystem] = useState<MeasurementSystem>(() => {
    const savedSystem = localStorage.getItem('vitality-measurement');
    return (savedSystem as MeasurementSystem) || 'metric';
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const savedColorTheme = localStorage.getItem('vitality-color-theme');
    return (savedColorTheme as ColorTheme) || 'teal-purple';
  });

  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    const savedMotion = localStorage.getItem('vitality-reduced-motion');
    return savedMotion === 'true';
  });

  const [glassEffect, setGlassEffect] = useState<GlassEffect>(() => {
    const savedEffect = localStorage.getItem('vitality-glass-effect');
    return (savedEffect as GlassEffect) || 'neo';
  });

  const [animationLevel, setAnimationLevel] = useState<AnimationLevel>(() => {
    const savedLevel = localStorage.getItem('vitality-animation-level');
    return (savedLevel as AnimationLevel) || 'moderate';
  });

  const [enableParticles, setEnableParticles] = useState(() => {
    const savedParticles = localStorage.getItem('vitality-particles');
    return savedParticles !== 'false'; // Default to true
  });

  // Apply theme
  useEffect(() => {
    localStorage.setItem('vitality-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Apply smooth transition effect when switching themes
    document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  }, [theme]);

  // Apply measurement system
  useEffect(() => {
    localStorage.setItem('vitality-measurement', measurementSystem);
  }, [measurementSystem]);

  // Apply color theme
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
          linear-gradient(to bottom, rgba(255, 255, 255, 0.92), rgba(245, 245, 255, 0.96));
        `);
      } else {
        bg.setAttribute('style', `
          background-image: radial-gradient(circle at top right, ${primaryColor}33, transparent 70%),
          radial-gradient(circle at bottom left, ${secondaryColor}33, transparent 70%),
          linear-gradient(to bottom, rgba(15, 15, 25, 0.95), rgba(10, 10, 20, 0.98));
        `);
      }
    }
    
    // Update particle colors
    document.documentElement.style.setProperty('--particle-primary', primaryColor);
    document.documentElement.style.setProperty('--particle-secondary', secondaryColor);
  }, [colorTheme, theme]);

  // Apply reduced motion preference
  useEffect(() => {
    localStorage.setItem('vitality-reduced-motion', String(isReducedMotion));
    
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
      
      // Remove any existing particles and animations
      document.querySelectorAll('.bg-particle, .firefly, .interactive-orb, .bg-orb').forEach(el => {
        el.remove();
      });
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  // Apply glass effect styles
  useEffect(() => {
    localStorage.setItem('vitality-glass-effect', glassEffect);
    document.documentElement.setAttribute('data-glass', glassEffect);
  }, [glassEffect]);

  // Apply animation level
  useEffect(() => {
    localStorage.setItem('vitality-animation-level', animationLevel);
    document.documentElement.setAttribute('data-animation', animationLevel);
    
    // Remove all animation level classes
    document.documentElement.classList.remove('animation-minimal', 'animation-moderate', 'animation-full');
    
    // Add the appropriate animation level class
    document.documentElement.classList.add(`animation-${animationLevel}`);
  }, [animationLevel]);

  // Manage particles
  useEffect(() => {
    localStorage.setItem('vitality-particles', String(enableParticles));
    
    // Particles are managed in the Layout component
  }, [enableParticles]);

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
        setEnableParticles
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
