
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type MeasurementSystem = 'metric' | 'imperial';
type ColorTheme = 'teal-purple' | 'blue-pink' | 'green-yellow';

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

  useEffect(() => {
    localStorage.setItem('vitality-theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Apply smooth transition effect when switching themes
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('vitality-measurement', measurementSystem);
  }, [measurementSystem]);

  useEffect(() => {
    localStorage.setItem('vitality-color-theme', colorTheme);
    
    // Here we could add logic to change CSS variables based on color theme
    document.documentElement.setAttribute('data-color-theme', colorTheme);
  }, [colorTheme]);

  useEffect(() => {
    localStorage.setItem('vitality-reduced-motion', String(isReducedMotion));
    
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

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
        setIsReducedMotion
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
