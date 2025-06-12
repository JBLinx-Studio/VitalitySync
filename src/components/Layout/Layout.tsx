
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Toaster } from '@/components/ui/toaster';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Info } from 'lucide-react';

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
  
  // Apply smooth page transition effects
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
    }
    
    // Add atmospheric particles in background if enabled
    if (enableParticles) {
      const createParticle = () => {
        const particle = document.createElement('div');
        particle.classList.add('bg-particle');
        
        // Add randomized properties for more natural feel
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        particle.style.width = `${Math.random() * 6 + 2}px`;
        particle.style.height = particle.style.width;
        particle.style.opacity = `${Math.random() * 0.2 + 0.1}`;
        
        document.querySelector('.app-background')?.appendChild(particle);
        
        setTimeout(() => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 30000);
      };
      
      const particleInterval = setInterval(() => {
        if (document.querySelector('.app-background')) {
          createParticle();
        }
      }, 2000);
      
      // Initial particles
      if (!isReducedMotion) {
        for (let i = 0; i < 8; i++) {
          setTimeout(() => createParticle(), i * 200);
        }
      }
      
      return () => {
        if (mainContent) {
          mainContent.classList.remove('animate-fade-in');
        }
        clearInterval(particleInterval);
      };
    }
  }, [enableParticles, isReducedMotion]);
  
  // Function to create ripple effect on click
  useEffect(() => {
    if (animationLevel === 'full' && !isReducedMotion) {
      const handleClick = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1000);
      };
      
      document.addEventListener('click', handleClick);
      
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [animationLevel, isReducedMotion]);

  // Get the appropriate glass effect class based on selected effect
  const getGlassEffectClass = () => {
    switch (glassEffect) {
      case 'frosted':
        return 'frosted-glass';
      case 'neo':
        return 'neo-glass';
      default:
        return 'glass-card';
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-health-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-float-slower"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-health-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-float-slow"></div>
        
        {colorTheme === 'teal-purple' && (
          <>
            <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-health-primary/3 rounded-full blur-2xl animate-pulse-soft"></div>
            <div className="absolute bottom-1/4 right-1/5 w-32 h-32 bg-health-secondary/3 rounded-full blur-2xl animate-float-slow"></div>
          </>
        )}
        
        {colorTheme === 'blue-pink' && (
          <>
            <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-blue-500/3 rounded-full blur-2xl animate-pulse-soft"></div>
            <div className="absolute bottom-1/4 right-1/5 w-32 h-32 bg-pink-500/3 rounded-full blur-2xl animate-float-slow"></div>
          </>
        )}
        
        {colorTheme === 'green-yellow' && (
          <>
            <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-green-500/3 rounded-full blur-2xl animate-pulse-soft"></div>
            <div className="absolute bottom-1/4 right-1/5 w-32 h-32 bg-yellow-500/3 rounded-full blur-2xl animate-float-slow"></div>
          </>
        )}
      </div>
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mb-6 transition-all duration-500 ease-in-out z-10">
        <div className={`rounded-2xl ${getGlassEffectClass()} shadow-soft p-6 transform hover:shadow-hover transition-all duration-300 ${!isReducedMotion ? 'tilt-card' : ''}`}>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="absolute top-4 right-4 text-gray-400 hover:text-health-primary cursor-help transition-colors">
                <Info size={16} className={!isReducedMotion ? 'hover-lift' : ''} />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="glass-effect">
              <div className="flex flex-col space-y-2">
                <h4 className="font-medium text-sm">VitalitySync</h4>
                <p className="text-xs text-muted-foreground">Track your health journey with our comprehensive wellness tools.</p>
              </div>
            </HoverCardContent>
          </HoverCard>
          {children}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;

