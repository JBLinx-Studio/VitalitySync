
import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Info } from 'lucide-react';
import PremiumEffects from '../ui/PremiumEffects';
import { UltraCard } from '../ui/card';

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
  const isHomePage = location.pathname === "/" || location.pathname === "/Health-and-Fitness-Webapp/";
  
  // Handle page transitions with enhanced animation
  useEffect(() => {
    if (mainContentRef.current && !isReducedMotion) {
      setIsTransitioning(true);
      
      // Apply entrance animation
      const entranceAnimation = () => {
        if (mainContentRef.current) {
          mainContentRef.current.classList.add('animate-fade-in');
          mainContentRef.current.classList.remove('opacity-0');
        }
        setIsTransitioning(false);
      };
      
      // Brief timeout to ensure state updates and animations work properly
      setTimeout(entranceAnimation, 50);
    }
  }, [location.pathname, isReducedMotion]);

  // Choose background effect based on route
  const getBackgroundEffect = () => {
    if (isHomePage) {
      return 'cosmic';
    }
    
    if (location.pathname.includes('/exercise')) {
      return 'particles';
    }
    
    if (location.pathname.includes('/food')) {
      return 'gradient';
    }
    
    if (location.pathname.includes('/sleep')) {
      return 'aurora';
    }
    
    if (location.pathname.includes('/mental')) {
      return 'atmosphere';
    }
    
    return 'particles';
  };

  // Get the appropriate glass effect class
  const getContentContainerClass = () => {
    const baseClasses = "relative z-20 transition-all duration-500 flex-grow container mx-auto px-4 py-6";
    
    if (isHomePage) {
      return `${baseClasses}`;
    }
    
    return `${baseClasses} py-8 mb-6`;
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden" ref={appRef}>
      {/* Dynamic background */}
      <div className="fixed inset-0 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
        {/* Background effects */}
        {enableParticles && !isReducedMotion && (
          <PremiumEffects 
            type={getBackgroundEffect()} 
            density={animationLevel === 'full' ? 'high' : animationLevel === 'moderate' ? 'medium' : 'low'}
            speed={animationLevel === 'full' ? 'medium' : 'slow'}
            interactive={animationLevel !== 'minimal'}
          />
        )}
        
        {/* Bottom gradient overlay for better text contrast */}
        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-gray-100/90 to-transparent dark:from-gray-950/90"></div>
      </div>

      <Header />
      
      <main 
        ref={mainContentRef}
        className={`${getContentContainerClass()} ${isTransitioning ? 'opacity-0' : ''}`}
      >
        {/* Conditional wrapper for non-home pages */}
        {!isHomePage ? (
          <UltraCard className="p-4 md:p-6 lg:p-8 shadow-xl relative overflow-hidden">
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
      
      {/* Show footer only on home page */}
      {isHomePage && <Footer />}
      <Toaster />
    </div>
  );
};

export default Layout;
