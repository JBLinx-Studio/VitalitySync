
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * A hook that applies specific visual effects based on the current theme settings
 * @param elementRef Reference to the element to apply the effects to
 * @param options Configuration options
 */
export const useThemeEffect = (
  elementRef: React.RefObject<HTMLElement>,
  options?: {
    disableAnimation?: boolean;
    glassMorphism?: boolean;
    parallax?: boolean;
    intensity?: 'low' | 'medium' | 'high';
  }
) => {
  const { 
    theme,
    colorTheme, 
    isReducedMotion,
    animationLevel,
    enableBlur
  } = useTheme();

  // Apply effects based on theme settings
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Skip animations if reduced motion is enabled
    if (isReducedMotion || options?.disableAnimation) {
      return;
    }

    // Apply glass morphism if enabled
    if (options?.glassMorphism && enableBlur) {
      element.classList.add('backdrop-blur-md');
      element.style.backgroundColor = theme === 'dark' 
        ? 'rgba(15, 23, 42, 0.7)' 
        : 'rgba(255, 255, 255, 0.7)';
    } else {
      element.classList.remove('backdrop-blur-md');
    }

    // Apply parallax effect if enabled
    if (options?.parallax && animationLevel !== 'minimal') {
      const handleMouseMove = (e: MouseEvent) => {
        if (!element) return;
        
        // Calculate intensity based on settings
        let intensityFactor = 0.01; // low
        if (options.intensity === 'medium') intensityFactor = 0.02;
        if (options.intensity === 'high') intensityFactor = 0.04;
        
        // Apply intensity reduction based on animation level
        if (animationLevel === 'moderate') intensityFactor *= 0.5;
        
        // Calculate parallax effect
        const x = (window.innerWidth / 2 - e.clientX) * intensityFactor;
        const y = (window.innerHeight / 2 - e.clientY) * intensityFactor;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        element.style.transform = '';
      };
    }
  }, [elementRef, theme, colorTheme, isReducedMotion, animationLevel, enableBlur, options]);
};
