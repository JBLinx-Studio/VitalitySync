
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { PremiumEffects } from '@/components/common';
import { VisualEffectType } from '@/types';

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

  const isHomePage = location.pathname === "/" || 
                     location.pathname === "/Health-and-Fitness-Webapp/" || 
                     location.pathname === "/Health-and-Fitness-Webapp";
  
  useEffect(() => {
    if (mainContentRef.current && !isReducedMotion) {
      setIsTransitioning(true);
      const entranceAnimation = () => {
        if (mainContentRef.current) {
          mainContentRef.current.classList.add('animate-fade-in');
          mainContentRef.current.classList.remove('opacity-0');
        }
        setIsTransitioning(false);
      };
      setTimeout(entranceAnimation, 50);
    }
  }, [location.pathname, isReducedMotion]);

  useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setViewportHeight(window.innerHeight);
        setViewportWidth(window.innerWidth);
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const getBackgroundEffect = (): VisualEffectType => {
    const pathWithoutBase = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    
    if (isHomePage) return 'cosmic';
    if (pathWithoutBase.includes('/exercise')) return 'particles';
    if (pathWithoutBase.includes('/food')) return 'aurora';
    if (pathWithoutBase.includes('/sleep')) return 'aurora';
    if (pathWithoutBase.includes('/mental')) return 'cosmic';
    return 'particles';
  };

  const getContentContainerClass = () => {
    const baseClasses = "relative z-20 transition-all duration-500 flex-grow container mx-auto px-4 py-6";
    
    if (isHomePage) return baseClasses;
    
    if (viewportWidth < 640) {
      return `${baseClasses} py-4 mb-4`;
    } else if (viewportWidth < 1024) {
      return `${baseClasses} py-6 mb-6`;
    } else {
      return `${baseClasses} py-8 mb-6`;
    }
  };

  const getMainContentMaxWidth = () => {
    if (viewportWidth < 640) return '100%';
    if (viewportWidth < 1024) return '100%';
    return '1400px';
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden" ref={appRef}>
      {/* Modern gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 transition-colors duration-700">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-soft delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse-soft delay-500"></div>
        
        {/* Premium effects layer */}
        {enableParticles && !isReducedMotion && (
          <PremiumEffects 
            type={getBackgroundEffect()} 
            density={animationLevel === 'full' ? 'high' : animationLevel === 'moderate' ? 'medium' : 'low'}
            speed={animationLevel === 'full' ? 'medium' : 'slow'}
            interactive={animationLevel !== 'minimal'}
          />
        )}
        
        {/* Subtle overlay for better content readability */}
        <div className="absolute inset-0 bg-white/30 dark:bg-slate-900/50"></div>
      </div>

      <Header />
      
      <main 
        ref={mainContentRef}
        style={{ maxWidth: getMainContentMaxWidth(), margin: '0 auto', width: '100%' }}
        className={`${getContentContainerClass()} ${isTransitioning ? 'opacity-0' : ''}`}
      >
        {!isHomePage ? (
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Modern card decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            {children}
          </div>
        )}
      </main>
      
      {isHomePage && (
        <div className="relative z-10 mt-auto">
          <Footer />
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default Layout;
