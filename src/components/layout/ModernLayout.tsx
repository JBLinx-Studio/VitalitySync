
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { PremiumEffects } from '@/components/common';
import ResponsiveContainer from './ResponsiveContainer';
import GlassCard from '@/components/ui/glass-card';

const ModernLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getUnreadNotificationsCount } = useHealth();
  const { 
    theme, 
    isReducedMotion, 
    animationLevel,
    enableParticles
  } = useTheme();
  
  const location = useLocation();
  const layoutRef = useRef<HTMLDivElement>(null);
  const [viewportDimensions, setViewportDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const isHomePage = location.pathname === "/" || 
                     location.pathname === "/Health-and-Fitness-Webapp/" || 
                     location.pathname === "/Health-and-Fitness-Webapp";

  useEffect(() => {
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setViewportDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const getBackgroundEffect = () => {
    const pathWithoutBase = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    
    if (isHomePage) return 'cosmic';
    if (pathWithoutBase.includes('/exercise')) return 'particles';
    if (pathWithoutBase.includes('/food')) return 'aurora';
    if (pathWithoutBase.includes('/sleep')) return 'cosmic';
    if (pathWithoutBase.includes('/mental')) return 'aurora';
    return 'particles';
  };

  const isDynamicSize = viewportDimensions.width < 768;

  return (
    <div 
      ref={layoutRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ 
        minHeight: '100vh',
        maxWidth: '100vw'
      }}
    >
      {/* Dynamic gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        {/* Floating orbs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-soft delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-soft delay-500"></div>
        
        {/* Premium effects layer */}
        {enableParticles && !isReducedMotion && (
          <PremiumEffects 
            type={getBackgroundEffect()} 
            density={viewportDimensions.width < 768 ? 'low' : animationLevel === 'full' ? 'high' : 'medium'}
            speed={animationLevel === 'full' ? 'medium' : 'slow'}
            interactive={animationLevel !== 'minimal' && viewportDimensions.width >= 768}
          />
        )}
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)
              `
            }}
          />
        </div>
        
        {/* Subtle overlay for content readability */}
        <div className="absolute inset-0 bg-white/20 dark:bg-slate-900/40 backdrop-blur-[0.5px]"></div>
      </div>

      <Header />
      
      <main className="flex-grow relative z-10">
        <ResponsiveContainer 
          maxWidth={isDynamicSize ? 'full' : '2xl'}
          padding={isDynamicSize ? 'sm' : 'lg'}
        >
          {!isHomePage ? (
            <GlassCard 
              variant="premium" 
              size={isDynamicSize ? 'sm' : 'lg'}
              className="min-h-[60vh] relative"
            >
              {/* Content decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 via-blue-500/10 to-transparent rounded-full blur-2xl"></div>
              
              <div className="relative z-10 h-full">
                {children}
              </div>
            </GlassCard>
          ) : (
            <div className="relative z-10">
              {children}
            </div>
          )}
        </ResponsiveContainer>
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

export default ModernLayout;
