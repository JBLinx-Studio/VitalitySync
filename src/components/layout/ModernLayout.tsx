
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header, Footer } from '@/components/layout';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { PremiumEffects } from '@/components/common';
import ResponsiveContainer from './ResponsiveContainer';
import GlassCard from '@/components/ui/glass-card';
import { useViewport } from '@/hooks/use-viewport';
import { cn } from '@/lib/utils';

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
  const { isMobile, isTablet, width, height } = useViewport();

  const isHomePage = location.pathname === "/" || 
                     location.pathname === "/Health-and-Fitness-Webapp/" || 
                     location.pathname === "/Health-and-Fitness-Webapp";

  const getBackgroundEffect = () => {
    const pathWithoutBase = location.pathname.replace('/Health-and-Fitness-Webapp', '');
    
    if (isHomePage) return 'cosmic';
    if (pathWithoutBase.includes('/exercise')) return 'particles';
    if (pathWithoutBase.includes('/food')) return 'aurora';
    if (pathWithoutBase.includes('/sleep')) return 'cosmic';
    if (pathWithoutBase.includes('/mental')) return 'aurora';
    return 'particles';
  };

  // Enhanced responsive container settings
  const getContainerSettings = () => {
    if (isMobile) return { maxWidth: 'full' as const, padding: 'xs' as const };
    if (isTablet) return { maxWidth: 'xl' as const, padding: 'sm' as const };
    return { maxWidth: '2xl' as const, padding: 'md' as const };
  };

  const { maxWidth, padding } = getContainerSettings();

  return (
    <div 
      ref={layoutRef}
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ 
        minHeight: '100vh',
        maxWidth: '100vw'
      }}
    >
      {/* Enhanced gradient background with better performance */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        {/* Responsive floating orbs with better animations */}
        {!isReducedMotion && (
          <>
            <div className={cn(
              "absolute bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse-soft",
              isMobile ? "top-3 right-3 w-24 h-24" : isTablet ? "top-6 right-6 w-48 h-48" : "top-10 right-10 w-72 h-72"
            )}></div>
            <div className={cn(
              "absolute bg-gradient-to-tr from-emerald-400/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-soft delay-1000",
              isMobile ? "bottom-3 left-3 w-32 h-32" : isTablet ? "bottom-6 left-6 w-56 h-56" : "bottom-10 left-10 w-96 h-96"
            )}></div>
            <div className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-soft delay-500",
              isMobile ? "w-28 h-28" : isTablet ? "w-52 h-52" : "w-80 h-80"
            )}></div>
          </>
        )}
        
        {/* Premium effects with adaptive performance */}
        {enableParticles && !isReducedMotion && width >= 768 && (
          <PremiumEffects 
            type={getBackgroundEffect()} 
            density={width < 1024 ? 'low' : animationLevel === 'full' ? 'medium' : 'low'}
            speed={animationLevel === 'full' ? 'medium' : 'slow'}
            interactive={animationLevel !== 'minimal' && width >= 1024}
          />
        )}
        
        {/* Enhanced responsive mesh gradient */}
        <div className={cn("absolute inset-0", isMobile ? "opacity-25" : isTablet ? "opacity-30" : "opacity-35")}>
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
        
        {/* Adaptive overlay for content readability */}
        <div className={cn(
          "absolute inset-0 backdrop-blur-[0.5px]",
          isMobile ? "bg-white/15 dark:bg-slate-900/35" : "bg-white/20 dark:bg-slate-900/40"
        )}></div>
      </div>

      <Header />
      
      <main className="flex-grow relative z-10">
        <ResponsiveContainer 
          maxWidth={maxWidth}
          padding={padding}
        >
          {!isHomePage ? (
            <GlassCard 
              variant="premium" 
              size={isMobile ? 'sm' : isTablet ? 'md' : 'lg'}
              className={cn(
                "relative animate-fade-in",
                isMobile ? "min-h-[45vh] mx-1" : isTablet ? "min-h-[55vh] mx-2" : "min-h-[60vh]"
              )}
            >
              {/* Enhanced responsive decorative elements */}
              {!isMobile && (
                <>
                  <div className={cn(
                    "absolute top-0 right-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl",
                    isTablet ? "w-24 h-24" : "w-32 h-32"
                  )}></div>
                  <div className={cn(
                    "absolute bottom-0 left-0 bg-gradient-to-tr from-pink-500/10 via-blue-500/10 to-transparent rounded-full blur-2xl",
                    isTablet ? "w-20 h-20" : "w-24 h-24"
                  )}></div>
                </>
              )}
              
              <div className="relative z-10 h-full">
                {children}
              </div>
            </GlassCard>
          ) : (
            <div className="relative z-10 animate-fade-in">
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
