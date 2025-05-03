
import React, { useEffect, useRef } from 'react';
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
  
  const appRef = useRef<HTMLDivElement>(null);
  
  // Apply smooth page transition effects
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
    }
    
    return () => {
      if (mainContent) {
        mainContent.classList.remove('animate-fade-in');
      }
    };
  }, []);

  // Add atmospheric particles in background
  useEffect(() => {
    if (enableParticles && !isReducedMotion) {
      const bgElement = document.querySelector('.app-background');
      if (!bgElement) return;
      
      // Clear existing particles
      const existingParticles = document.querySelectorAll('.bg-particle, .firefly');
      existingParticles.forEach(p => p.remove());
      
      const createParticle = () => {
        const particle = document.createElement('div');
        const isFirefly = Math.random() > 0.6;
        
        particle.classList.add(isFirefly ? 'firefly' : 'bg-particle');
        
        // Add randomized properties for more natural feel
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
        
        if (isFirefly) {
          particle.style.width = `${Math.random() * 4 + 2}px`;
          particle.style.height = particle.style.width;
          particle.style.opacity = `${Math.random() * 0.5 + 0.3}`;
        } else {
          particle.style.width = `${Math.random() * 8 + 3}px`;
          particle.style.height = particle.style.width;
          particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        }
        
        bgElement.appendChild(particle);
        
        setTimeout(() => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 30000);
      };
      
      // Create initial particles
      for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 200);
      }
      
      const particleInterval = setInterval(() => {
        createParticle();
      }, 2000);
      
      return () => clearInterval(particleInterval);
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

  // Interactive moving background effect
  useEffect(() => {
    if (animationLevel !== 'minimal' && !isReducedMotion && appRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!appRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate percentage of movement (mouse position relative to window)
        const moveX = (clientX / innerWidth) - 0.5;
        const moveY = (clientY / innerHeight) - 0.5;
        
        // Find all background orbs/blobs and move them based on mouse position
        const orbs = document.querySelectorAll('.bg-orb');
        orbs.forEach((orb: Element, index) => {
          const orbEl = orb as HTMLElement;
          const speed = index % 3 === 0 ? 20 : index % 2 === 0 ? 10 : 30;
          orbEl.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      // Create background orbs with random properties
      const createBackgroundOrbs = () => {
        if (!appRef.current) return;
        
        const bgElement = document.querySelector('.app-background');
        if (!bgElement) return;
        
        // Remove existing orbs
        const existingOrbs = document.querySelectorAll('.bg-orb');
        existingOrbs.forEach(orb => orb.remove());
        
        // Create new orbs
        for (let i = 0; i < 5; i++) {
          const orb = document.createElement('div');
          orb.classList.add('bg-orb');
          
          // Set random position and size
          const size = Math.random() * 400 + 200;
          orb.style.width = `${size}px`;
          orb.style.height = `${size}px`;
          orb.style.left = `${Math.random() * 100}%`;
          orb.style.top = `${Math.random() * 100}%`;
          
          // Set color based on theme
          if (colorTheme === 'teal-purple') {
            orb.style.background = i % 2 === 0 
              ? 'radial-gradient(circle, rgba(79, 209, 197, 0.15), transparent 70%)'
              : 'radial-gradient(circle, rgba(155, 135, 245, 0.15), transparent 70%)';
          } else if (colorTheme === 'blue-pink') {
            orb.style.background = i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)'
              : 'radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent 70%)';
          } else {
            orb.style.background = i % 2 === 0 
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent 70%)';
          }
          
          bgElement.appendChild(orb);
        }
      };
      
      createBackgroundOrbs();
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        const existingOrbs = document.querySelectorAll('.bg-orb');
        existingOrbs.forEach(orb => orb.remove());
      };
    }
  }, [animationLevel, isReducedMotion, colorTheme]);

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
    <div className="flex flex-col min-h-screen relative overflow-hidden" ref={appRef}>
      <div className="absolute inset-0 pointer-events-none app-background">
        {/* Dynamic background orbs will be added here by JS */}
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
