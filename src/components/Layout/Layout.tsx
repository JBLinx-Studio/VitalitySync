
import React, { useEffect, useRef, useState } from 'react';
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
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Apply smooth page transition effects with enhanced animation
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      document.querySelectorAll('section, .card-content').forEach(section => {
        observer.observe(section);
      });
    }
    
    return () => {
      if (mainContent) {
        mainContent.classList.remove('animate-fade-in');
      }
    };
  }, []);

  // Add enhanced atmospheric particles in background
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
          particle.style.width = `${Math.random() * 5 + 2}px`;
          particle.style.height = particle.style.width;
          particle.style.opacity = `${Math.random() * 0.6 + 0.4}`;
        } else {
          particle.style.width = `${Math.random() * 10 + 4}px`;
          particle.style.height = particle.style.width;
          particle.style.opacity = `${Math.random() * 0.4 + 0.1}`;
        }
        
        bgElement.appendChild(particle);
        
        setTimeout(() => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        }, 30000);
      };
      
      // Create initial particles
      for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 150);
      }
      
      const particleInterval = setInterval(() => {
        createParticle();
      }, 1500);
      
      return () => clearInterval(particleInterval);
    }
  }, [enableParticles, isReducedMotion]);
  
  // Enhanced ripple effect on click with dynamic color based on theme
  useEffect(() => {
    if (animationLevel === 'full' && !isReducedMotion) {
      const handleClick = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Dynamic color based on color theme
        const primary = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
        const secondary = getComputedStyle(document.documentElement).getPropertyValue('--color-secondary');
        
        ripple.style.background = `radial-gradient(circle, ${primary}40 0%, ${secondary}00 70%)`;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 1200);
      };
      
      document.addEventListener('click', handleClick);
      
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }
  }, [animationLevel, isReducedMotion, colorTheme]);

  // Enhanced interactive moving background effect with parallax
  useEffect(() => {
    if (animationLevel !== 'minimal' && !isReducedMotion && appRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!appRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate percentage of movement (mouse position relative to window)
        const moveX = (clientX / innerWidth) - 0.5;
        const moveY = (clientY / innerHeight) - 0.5;
        
        setMousePosition({ x: clientX, y: clientY });
        
        // Find all background orbs/blobs and move them based on mouse position
        const orbs = document.querySelectorAll('.bg-orb');
        orbs.forEach((orb: Element, index) => {
          const orbEl = orb as HTMLElement;
          const speed = index % 3 === 0 ? 30 : index % 2 === 0 ? 15 : 45;
          orbEl.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
        
        // Parallax effect for cards
        document.querySelectorAll('.parallax-card').forEach((card: Element) => {
          const rect = card.getBoundingClientRect();
          const cardX = rect.left + rect.width / 2;
          const cardY = rect.top + rect.height / 2;
          
          const diffX = (clientX - cardX) / 25;
          const diffY = (clientY - cardY) / 25;
          
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${-diffY * 0.5}deg) rotateY(${diffX * 0.5}deg)`;
          
          const content = card.querySelector('.parallax-card-content');
          if (content) {
            (content as HTMLElement).style.transform = `translateZ(20px) translateX(${diffX * 0.3}px) translateY(${diffY * 0.3}px)`;
          }
        });
      };
      
      // Update spotlight position
      if (spotlightRef.current && !isReducedMotion && animationLevel === 'full') {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.left = `${mousePosition.x}px`;
        spotlightRef.current.style.top = `${mousePosition.y}px`;
      }
      
      // Create enhanced background orbs with better visuals
      const createBackgroundOrbs = () => {
        if (!appRef.current) return;
        
        const bgElement = document.querySelector('.app-background');
        if (!bgElement) return;
        
        // Remove existing orbs
        const existingOrbs = document.querySelectorAll('.bg-orb');
        existingOrbs.forEach(orb => orb.remove());
        
        // Create new orbs with enhanced visuals
        for (let i = 0; i < 6; i++) {
          const orb = document.createElement('div');
          orb.classList.add('bg-orb');
          
          // Set random position and size with enhanced visual properties
          const size = Math.random() * 500 + 200;
          orb.style.width = `${size}px`;
          orb.style.height = `${size}px`;
          orb.style.left = `${Math.random() * 120 - 10}%`;
          orb.style.top = `${Math.random() * 120 - 10}%`;
          
          // Add animation class for subtle motion
          orb.classList.add(i % 2 === 0 ? 'animate-float-slow' : 'animate-float-slower');
          
          // Set color based on theme with enhanced opacity and blur
          if (colorTheme === 'teal-purple') {
            orb.style.background = i % 2 === 0 
              ? 'radial-gradient(circle, rgba(79, 209, 197, 0.18), transparent 70%)'
              : 'radial-gradient(circle, rgba(155, 135, 245, 0.18), transparent 70%)';
          } else if (colorTheme === 'blue-pink') {
            orb.style.background = i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.18), transparent 70%)'
              : 'radial-gradient(circle, rgba(236, 72, 153, 0.18), transparent 70%)';
          } else {
            orb.style.background = i % 2 === 0 
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.18), transparent 70%)'
              : 'radial-gradient(circle, rgba(251, 191, 36, 0.18), transparent 70%)';
          }
          
          orb.style.filter = 'blur(50px)';
          orb.style.opacity = '0.7';
          
          bgElement.appendChild(orb);
        }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      createBackgroundOrbs();
      
      // Add animated orbs for more dynamic backgrounds
      if (animationLevel === 'full') {
        const bgElement = document.querySelector('.app-background');
        
        for (let i = 0; i < 3; i++) {
          const animatedOrb = document.createElement('div');
          animatedOrb.classList.add('animated-orb');
          
          const size = Math.random() * 300 + 100;
          animatedOrb.style.width = `${size}px`;
          animatedOrb.style.height = `${size}px`;
          animatedOrb.style.left = `${Math.random() * 80 + 10}%`;
          animatedOrb.style.top = `${Math.random() * 80 + 10}%`;
          animatedOrb.style.animationDelay = `${i * 0.5}s`;
          
          if (bgElement) bgElement.appendChild(animatedOrb);
        }
      }
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        const existingOrbs = document.querySelectorAll('.bg-orb, .animated-orb');
        existingOrbs.forEach(orb => orb.remove());
      };
    }
  }, [animationLevel, isReducedMotion, colorTheme, mousePosition]);

  // Get the appropriate glass effect class based on selected effect
  const getGlassEffectClass = () => {
    switch (glassEffect) {
      case 'frosted':
        return 'frosted-glass';
      case 'neo':
        return 'neo-glass';
      case 'ultra':
        return 'ultra-glass';
      default:
        return 'glass-card';
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden spotlight-container" ref={appRef}>
      <div className="absolute inset-0 pointer-events-none app-background">
        {/* Dynamic background orbs will be added here by JS */}
        <div className="noise-overlay"></div>
      </div>
      
      {!isReducedMotion && animationLevel === 'full' && (
        <div ref={spotlightRef} className="spotlight"></div>
      )}
      
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
