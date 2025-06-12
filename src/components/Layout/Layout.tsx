
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useHealth } from '@/contexts/HealthContext';
import { Toaster } from '@/components/ui/toaster';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Info } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getUnreadNotificationsCount } = useHealth();
  
  // Apply smooth page transition effects
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
    }
    
    // Add atmospheric particles in background
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('bg-particle');
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
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
    }, 3000);
    
    // Initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(() => createParticle(), i * 300);
    }
    
    return () => {
      if (mainContent) {
        mainContent.classList.remove('animate-fade-in');
      }
      clearInterval(particleInterval);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-health-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-health-secondary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mb-6 transition-all duration-500 ease-in-out z-10">
        <div className="rounded-2xl glass-card shadow-soft p-6 transform hover:shadow-hover transition-all duration-300">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="absolute top-4 right-4 text-gray-400 hover:text-health-primary cursor-help transition-colors">
                <Info size={16} />
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
