
import { useState, useEffect, useCallback } from 'react';

interface ViewportDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSmallMobile: boolean;
  isLargeMobile: boolean;
  orientation: 'portrait' | 'landscape';
}

export function useViewport(): ViewportDimensions {
  const [dimensions, setDimensions] = useState<ViewportDimensions>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isSmallMobile: width < 480,
      isLargeMobile: width >= 480 && width < 768,
      orientation: width > height ? 'landscape' : 'portrait'
    };
  });

  const updateDimensions = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setDimensions({
      width,
      height,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isSmallMobile: width < 480,
      isLargeMobile: width >= 480 && width < 768,
      orientation: width > height ? 'landscape' : 'portrait'
    });
  }, []);

  useEffect(() => {
    // Debounce resize events for better performance
    let timeoutId: number | null = null;
    const debouncedResize = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      timeoutId = window.setTimeout(() => {
        updateDimensions();
        timeoutId = null;
      }, 150);
    };

    // Listen for both resize and orientation change
    window.addEventListener('resize', debouncedResize);
    window.addEventListener('orientationchange', debouncedResize);
    
    // Initial call
    updateDimensions();
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('orientationchange', debouncedResize);
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [updateDimensions]);

  return dimensions;
}
