
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import EnhancedHeader from './EnhancedHeader';
import { Footer } from '@/components/layout';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { PremiumEffects } from '@/components/common';
import ResponsiveContainer from './ResponsiveContainer';
import GlassCard from '@/components/ui/glass-card';
import { useViewport } from '@/hooks/use-viewport';
import { cn } from '@/lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  // Responsive container settings
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
      {/* Enhanced responsive background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
        {/* Responsive animated floating orbs */}
        {!isReducedMotion && (
          <>
            <div className={cn(
              "absolute bg-gradient-to-br from-blue-400/15 via-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse-soft opacity-80",
              isMobile ? "top-5 right-5 w-40 h-40" : isTablet ? "top-8 right-8 w-60 h-60" : "top-10 right-10 w-72 h-72"
            )}></div>
            <div className={cn(
              "absolute bg-gradient-to-tr from-emerald-400/15 via-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse-soft delay-1000 opacity-80",
              isMobile ? "bottom-5 left-5 w-48 h-48" : isTablet ? "bottom-8 left-8 w-72 h-72" : "bottom-10 left-10 w-96 h-96"
            )}></div>
            <div className={cn(
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse-soft delay-500 opacity-80",
              isMobile ? "w-44 h-44" : isTablet ? "w-64 h-64" : "w-80 h-80"
            )}></div>
          </>
        )}
        
        {/* Premium effects with better performance for mobile */}
        {enableParticles && !isReducedMotion && width >= 768 && (
          <PremiumEffects 
            type={getBackgroundEffect()} 
            density={width < 1024 ? 'low' : animationLevel === 'full' ? 'medium' : 'low'}
            speed={animationLevel === 'full' ? 'medium' : 'slow'}
            interactive={animationLevel !== 'minimal' && width >= 1024}
          />
        )}
        
        {/* Enhanced responsive mesh gradient */}
        <div className={cn("absolute inset-0", isMobile ? "opacity-30" : "opacity-40")}>
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 30% 70%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)
              `
            }}
          />
        </div>
        
        {/* Optimized overlay for content readability */}
        <div className="absolute inset-0 bg-white/10 dark:bg-slate-900/30 backdrop-blur-[0.5px]"></div>
      </div>

      <EnhancedHeader />
      
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
                isMobile ? "min-h-[50vh]" : "min-h-[60vh]"
              )}
            >
              {/* Responsive decorative elements */}
              {!isMobile && (
                <>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-transparent rounded-full blur-2xl animate-pulse-soft"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-500/8 via-blue-500/8 to-transparent rounded-full blur-2xl animate-pulse-soft delay-1000"></div>
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

export default Layout;
