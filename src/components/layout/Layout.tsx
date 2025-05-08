
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { PremiumEffects } from '@/components/common';
import { UltraCard } from '@/components/ui/card';
import { VisualEffectType } from '@/types';
import { animations } from '@/utils/animation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getUnreadNotificationsCount } = useHealth();
  const { 
    theme, 
    colorTheme, 
    isReducedMotion, 
    glassEffect, 
    animationLevel,
    enableParticles
  } = useTheme();
  
  const location = useLocation();
  const appRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [motionEnabled, setMotionEnabled] = useState(!isReducedMotion);

  // Determine if we're on the home page, considering GitHub Pages base path
  const isHomePage = location.pathname === "/" || 
                     location.pathname === "/Health-and-Fitness-Webapp/" || 
                     location.pathname === "/Health-and-Fitness-Webapp";
  
  // Handle page transitions with enhanced animation
  useEffect(() => {
    if (mainContentRef.current && !isReducedMotion) {
      setIsTransitioning(true);
      
      // Apply entrance animation using our animation utilities
      const element = mainContentRef.current;
      setTimeout(() => {
        if (element) {
          animations.fadeIn(element, 500);
        }
        setIsTransitioning(false);
      }, 50);
    }
  }, [location.pathname, isReducedMotion]);

  // Update viewport dimensions on resize with throttling
  useEffect(() => {
    let resizeTimeout: number;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setViewportHeight(window.innerHeight);
        setViewportWidth(window.innerWidth);
      }, 100); // Throttle resize events
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on mount
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
  
  // Apply animation settings effect
  useEffect(() => {
    setMotionEnabled(!isReducedMotion);
  }, [isReducedMotion]);

  // Choose background effect based on route
  const getBackgroundEffect = (): VisualEffectType => {
    const pathWithoutBase = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    
    if (isHomePage) {
      return 'cosmic';
    }
    
    if (pathWithoutBase.includes('/exercise')) {
      return 'particles';
    }
    
    if (pathWithoutBase.includes('/food')) {
      return 'aurora';
    }
    
    if (pathWithoutBase.includes('/sleep')) {
      return 'aurora';
    }
    
    if (pathWithoutBase.includes('/mental')) {
      return 'cosmic';
    }
    
    return 'particles';
  };

  // Get the appropriate glass effect class
  const getContentContainerClass = () => {
    const baseClasses = "relative z-20 transition-all duration-500 flex-grow container mx-auto px-4 py-6";
    
    if (isHomePage) {
      return `${baseClasses}`;
    }
    
    // Adjust padding for different screen sizes
    if (viewportWidth < 640) { // Mobile
      return `${baseClasses} py-4 mb-4`;
    } else if (viewportWidth < 1024) { // Tablet
      return `${baseClasses} py-6 mb-6`;
    } else { // Desktop
      return `${baseClasses} py-8 mb-6`;
    }
  };

  // Get the appropriate card class based on the glass effect
  const getCardClass = () => {
    switch (glassEffect) {
      case 'frosted':
        return "frosted-glass";
      case 'neo':
        return "neo-glass";
      case 'ultra':
        return "ultra-glass";
      case 'iridescent':
        return "iridescent-glass";
      case 'cosmic':
        return "cosmic-glass";
      default:
        return "glass-card";
    }
  };

  // Adjust padding based on viewport size
  const getCardPadding = () => {
    if (viewportWidth < 640) { // Mobile
      return "p-3 md:p-4";
    } else if (viewportWidth < 1024) { // Tablet
      return "p-4 md:p-5";
    } else { // Desktop
      return "p-4 md:p-6 lg:p-8";
    }
  };
  
  // Determine main content max width for better readability on large screens
  const getMainContentMaxWidth = () => {
    if (viewportWidth < 640) return '100%'; // Mobile: full width
    if (viewportWidth < 1024) return '100%'; // Tablet: full width
    return '1400px'; // Desktop: max width
  };
  
  // Get animation speed based on settings
  const getAnimationSpeed = () => {
    switch (animationLevel) {
      case 'minimal':
        return 'slow';
      case 'moderate':
        return 'medium';
      case 'full':
        return 'normal';
      default:
        return 'slow';
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-cosmic-deep" ref={appRef}>
      {/* Enhanced dynamic background with cosmic theme */}
      <div className="fixed inset-0 bg-gradient-to-br from-cosmic-deep via-cosmic-space to-cosmic-deep transition-colors duration-500">
        {/* Background effects */}
        {enableParticles && motionEnabled && (
          <PremiumEffects 
            type={getBackgroundEffect()} 
            density={animationLevel === 'full' ? 'medium' : 'low'}
            speed={getAnimationSpeed()}
            interactive={animationLevel !== 'minimal'}
          />
        )}
        
        {/* Animated background orbs for visual interest */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-cosmic-nebula/10 rounded-full blur-3xl animate-cosmic-pulse"></div>
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-cosmic-highlight/10 rounded-full blur-3xl animate-nebula-drift"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cosmic-star/5 rounded-full blur-3xl animate-cosmic-pulse opacity-70"></div>
        
        {/* Nebula gas effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep/30 via-transparent to-cosmic-deep/10 opacity-60"></div>
        
        {/* Subtle star field effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="stars-small"></div>
          <div className="stars-medium"></div>
          <div className="stars-large"></div>
        </div>
        
        {/* Bottom gradient overlay for better text contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-cosmic-deep/90 to-transparent"></div>
      </div>

      {/* Fixed header */}
      <Header />
      
      <main 
        ref={mainContentRef}
        style={{ 
          maxWidth: getMainContentMaxWidth(), 
          margin: '0 auto', 
          width: '100%',
          opacity: isTransitioning ? 0 : 1
        }}
        className={getContentContainerClass()}
      >
        {/* Conditional wrapper for non-home pages */}
        {!isHomePage ? (
          <UltraCard className={`${getCardPadding()} shadow-cosmic relative overflow-hidden ${getCardClass()} border-cosmic-nebula/20`}>
            <div className="absolute inset-0 premium-nebula opacity-10"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-cosmic-highlight/10 rounded-full blur-xl animate-pulse-soft"></div>
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-cosmic-nebula/10 rounded-full blur-xl animate-pulse-soft"></div>
            
            <div className="relative z-10">
              {children}
            </div>
          </UltraCard>
        ) : (
          <div className="relative z-10">
            {children}
          </div>
        )}
      </main>
      
      {/* Show footer only on home page with enhanced appearance */}
      {isHomePage && (
        <div className="relative z-10 mt-auto">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cosmic-deep/60 to-transparent"></div>
          <Footer />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Layout;
