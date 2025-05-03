
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type MeasurementSystem = 'metric' | 'imperial';
type ColorTheme = 'teal-purple' | 'blue-pink' | 'green-yellow';
type GlassEffect = 'standard' | 'frosted' | 'neo';
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
    return (savedEffect as GlassEffect) || 'standard';
  });

  const [animationLevel, setAnimationLevel] = useState<AnimationLevel>(() => {
    const savedLevel = localStorage.getItem('vitality-animation-level');
    return (savedLevel as AnimationLevel) || 'moderate';
  });

  const [enableParticles, setEnableParticles] = useState(() => {
    const savedParticles = localStorage.getItem('vitality-particles');
    return savedParticles !== 'false'; // Default to true
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
          background-image: radial-gradient(circle at top right, ${primaryColor}26, transparent 70%),
          radial-gradient(circle at bottom left, ${secondaryColor}26, transparent 70%),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(245, 245, 255, 0.92));
        `);
      } else {
        bg.setAttribute('style', `
          background-image: radial-gradient(circle at top right, ${primaryColor}33, transparent 70%),
          radial-gradient(circle at bottom left, ${secondaryColor}33, transparent 70%),
          linear-gradient(to bottom, rgba(20, 20, 30, 0.95), rgba(10, 10, 20, 0.95));
        `);
      }
    }
  }, [colorTheme, theme]);

  useEffect(() => {
    localStorage.setItem('vitality-reduced-motion', String(isReducedMotion));
    
    if (isReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isReducedMotion]);

  useEffect(() => {
    localStorage.setItem('vitality-glass-effect', glassEffect);
    
    // Apply different glass effect styles
    document.documentElement.setAttribute('data-glass', glassEffect);
    
    // We could add specific class handling here if needed
  }, [glassEffect]);

  useEffect(() => {
    localStorage.setItem('vitality-animation-level', animationLevel);
    document.documentElement.setAttribute('data-animation', animationLevel);
    
    // Remove all animation level classes
    document.documentElement.classList.remove('animation-minimal', 'animation-moderate', 'animation-full');
    
    // Add the appropriate animation level class
    document.documentElement.classList.add(`animation-${animationLevel}`);
  }, [animationLevel]);

  useEffect(() => {
    localStorage.setItem('vitality-particles', String(enableParticles));
    
    if (enableParticles) {
      // Function to create and manage interactive background particles
      const createParticles = () => {
        const particlesContainer = document.querySelector('.app-background');
        if (!particlesContainer) return;
        
        // Remove existing particles
        const existingParticles = document.querySelectorAll('.floating-particle, .firefly');
        existingParticles.forEach(p => p.remove());
        
        // Create new particles
        const particleCount = window.innerWidth < 768 ? 8 : 15;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.classList.add(Math.random() > 0.6 ? 'firefly' : 'floating-particle');
          
          // Set random sizes
          const size = Math.random() * 8 + 3;
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          
          // Set random positions
          particle.style.left = `${Math.random() * 100}vw`;
          particle.style.top = `${Math.random() * 100}vh`;
          
          // Set random animation properties
          particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
          particle.style.animationDelay = `${Math.random() * 5}s`;
          
          // Add to DOM
          particlesContainer.appendChild(particle);
          
          // Remove after animation completes
          setTimeout(() => {
            if (particle && particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 30000);
        }
      };
      
      // Initial creation and interval
      createParticles();
      const particleInterval = setInterval(createParticles, 15000);
      
      return () => clearInterval(particleInterval);
    }
  }, [enableParticles]);

  // Create and initialize orbs that follow mouse/touch
  useEffect(() => {
    if (enableParticles && animationLevel === 'full') {
      const orb1 = document.createElement('div');
      const orb2 = document.createElement('div');
      
      orb1.classList.add('interactive-orb');
      orb2.classList.add('interactive-orb');
      
      document.querySelector('.app-background')?.appendChild(orb1);
      document.querySelector('.app-background')?.appendChild(orb2);
      
      let mouseX = 0;
      let mouseY = 0;
      let orb1X = 0;
      let orb1Y = 0;
      let orb2X = 0;
      let orb2Y = 0;
      
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      
      const animateOrbs = () => {
        // Calculate positions with lag effect
        orb1X += (mouseX - orb1X) * 0.05;
        orb1Y += (mouseY - orb1Y) * 0.05;
        orb2X += (mouseX - orb2X) * 0.02;
        orb2Y += (mouseY - orb2Y) * 0.02;
        
        // Apply positions
        orb1.style.transform = `translate(${orb1X - 50}px, ${orb1Y - 50}px)`;
        orb2.style.transform = `translate(${orb2X - 50}px, ${orb2Y - 50}px)`;
        
        requestAnimationFrame(animateOrbs);
      };
      
      animateOrbs();
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        orb1.remove();
        orb2.remove();
      };
    }
  }, [enableParticles, animationLevel]);

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

