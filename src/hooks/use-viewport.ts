
import { useState, useEffect } from 'react';

interface ViewportDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useViewport(): ViewportDimensions {
  const [dimensions, setDimensions] = useState<ViewportDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    // Throttle resize events for better performance
    let timeoutId: number | null = null;
    const throttledResize = () => {
      if (timeoutId === null) {
        timeoutId = window.setTimeout(() => {
          timeoutId = null;
          handleResize();
        }, 100);
      }
    };

    window.addEventListener('resize', throttledResize);
    handleResize(); // Initialize on mount
    
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return dimensions;
}
