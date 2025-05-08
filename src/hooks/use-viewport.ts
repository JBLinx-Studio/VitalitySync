
import { useState, useEffect } from 'react';
import { throttle } from '@/utils/performance';

interface ViewportState {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Breakpoints
const MOBILE_BREAKPOINT = 640;  // sm
const TABLET_BREAKPOINT = 1024; // lg

const useViewport = (): ViewportState => {
  const [viewport, setViewport] = useState<ViewportState>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    // Initialize on mount
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
      });
    };
    
    // Initial call
    updateViewport();
    
    // Throttled event handler to prevent too many updates
    const throttledUpdateViewport = throttle(updateViewport, 100);
    
    // Add resize listener
    window.addEventListener('resize', throttledUpdateViewport);
    
    return () => {
      window.removeEventListener('resize', throttledUpdateViewport);
    };
  }, []);

  return viewport;
};

export default useViewport;
