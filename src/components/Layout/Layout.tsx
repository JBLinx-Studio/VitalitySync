
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useHealth } from '@/contexts/HealthContext';
import { Toaster } from '@/components/ui/toaster';
import { useTheme } from '@/contexts/ThemeContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getUnreadNotificationsCount } = useHealth();
  const { theme } = useTheme();
  
  // Enhanced page transition effect
  useEffect(() => {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('fade-in-slide');
      
      // Add subtle parallax scrolling effect
      const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
          document.body.style.backgroundPositionY = `${scrollY * 0.1}px`;
        }
      };
      
      // Add a more pronounced hover effect to cards
      const addCardHoverEffects = () => {
        document.querySelectorAll('.glass-effect, .glass-card').forEach(card => {
          card.classList.add('card-hover-enhanced');
        });
      };
      
      addCardHoverEffects();
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        if (mainContent) {
          mainContent.classList.remove('fade-in-slide');
        }
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90 transition-colors duration-300">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 mb-6 transition-all duration-500 ease-in-out">
        <div className="animate-fade-in rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-soft dark:shadow-glow-dark p-6 transform transition-all duration-500">
          {children}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
