
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useHealth } from '@/contexts/HealthContext';
import { Toaster } from '@/components/ui/toaster';
import { useTheme } from '@/contexts/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getUnreadNotificationsCount } = useHealth();
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Enhanced page transition and parallax effects
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('fade-in-slide');
      
      // Parallax scrolling effect
      const handleScroll = () => {
        const newScrollY = window.scrollY;
        setScrollY(newScrollY);
        
        if (newScrollY > 0) {
          document.body.style.backgroundPositionY = `${newScrollY * 0.1}px`;
          
          // Parallax for background elements
          const bgElements = document.querySelectorAll('.bg-parallax');
          bgElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            (el as HTMLElement).style.transform = `translateY(${newScrollY * speed}px)`;
          });
        }
      };
      
      // Add a more pronounced hover effect to cards
      const addCardHoverEffects = () => {
        document.querySelectorAll('.glass-effect, .glass-card').forEach(card => {
          card.classList.add('card-hover-enhanced');
        });
      };
      
      // Add mouse movement effect for subtle tilt
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Apply tilt effect to specified elements
        document.querySelectorAll('.tilt-effect').forEach((el) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const tiltX = (y - centerY) / (rect.height / 2) * -3;
          const tiltY = (x - centerX) / (rect.width / 2) * 3;
          
          (el as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
      };
      
      addCardHoverEffects();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        if (mainContent) {
          mainContent.classList.remove('fade-in-slide');
        }
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen transition-all duration-500">
      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-radial from-health-primary/5 to-transparent opacity-70 blur-3xl bg-parallax"></div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-radial from-health-secondary/5 to-transparent opacity-70 blur-3xl bg-parallax"></div>
        
        {/* Dynamic interactive background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{ 
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              ${theme === 'dark' ? 'rgba(79, 209, 197, 0.15)' : 'rgba(79, 209, 197, 0.1)'} 0%, 
              transparent 15%)` 
          }}
        ></div>
      </div>
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mb-6 transition-all duration-500 ease-in-out z-10 relative">
        <div className="animate-fade-in rounded-2xl glass-effect p-6 transform transition-all duration-500 shadow-soft dark:shadow-glow-dark tilt-effect">
          {children}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
