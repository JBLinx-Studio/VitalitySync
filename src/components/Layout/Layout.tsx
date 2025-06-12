
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import NotificationsMenu from '../Notifications/NotificationsMenu';
import { useHealth } from '@/contexts/HealthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getUnreadNotificationsCount } = useHealth();
  const unreadCount = getUnreadNotificationsCount();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <NotificationsMenu />
      </div>
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
