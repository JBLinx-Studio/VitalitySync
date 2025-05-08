
import { useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * A custom hook that enhances visual effects based on theme settings
 */
export const useThemeEffects = (elementRef: React.RefObject<HTMLElement>, options?: {
  intensity?: 'low' | 'medium' | 'high';
  glassMorphism?: boolean;
  parallax?: boolean;
  animation?: boolean;
}) => {
  const { 
    theme, 
    isReducedMotion,
    animationLevel,
    enableBlur
  } = useTheme();

  // Apply effects based on theme settings
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Skip animations if reduced motion is enabled
    if (isReducedMotion || options?.animation === false) {
      return;
    }

    // Apply glass morphism if enabled
    if (options?.glassMorphism && enableBlur) {
      const blurAmount = animationLevel === 'full' ? 'backdrop-blur-md' : 'backdrop-blur-sm';
      element.classList.add(blurAmount);
      element.style.backgroundColor = theme === 'dark' 
        ? 'rgba(15, 23, 42, 0.7)' 
        : 'rgba(255, 255, 255, 0.7)';
    }

    // Apply parallax effect if enabled
    if (options?.parallax && animationLevel !== 'minimal') {
      const handleMouseMove = (e: MouseEvent) => {
        if (!element) return;
        
        // Calculate intensity based on settings
        let intensityFactor = 0.01; // low
        if (options.intensity === 'medium') intensityFactor = 0.02;
        if (options.intensity === 'high') intensityFactor = 0.03;
        
        // Apply intensity reduction based on animation level
        if (animationLevel === 'moderate') intensityFactor *= 0.5;
        if (animationLevel === 'minimal') intensityFactor *= 0.2;
        
        // Calculate parallax effect
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (centerX - e.clientX) * intensityFactor;
        const y = (centerY - e.clientY) * intensityFactor;
        
        // Apply transform with performance optimization
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        element.style.transition = 'transform 0.15s ease-out';
      };
      
      // Handle visibility changes for performance
      const visibilityObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          window.addEventListener('mousemove', handleMouseMove, { passive: true });
        } else {
          window.removeEventListener('mousemove', handleMouseMove);
        }
      }, { threshold: 0.1 });
      
      visibilityObserver.observe(element);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        visibilityObserver.disconnect();
        
        // Reset any applied styles
        element.style.transform = '';
        element.classList.remove('backdrop-blur-md', 'backdrop-blur-sm');
      };
    }
    
    return () => {
      // Clean up any applied styles
      element.style.transform = '';
      element.classList.remove('backdrop-blur-md', 'backdrop-blur-sm');
    };
  }, [elementRef, theme, isReducedMotion, animationLevel, enableBlur, options]);
};

export default useThemeEffects;
