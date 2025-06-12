
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  TrendingUp,
  Zap,
  Crown,
  Bell,
  Settings,
  User,
  LogOut,
  Plus,
  Sparkles,
  Shield,
  X
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useViewport } from '@/hooks/use-viewport';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/ui/user-avatar';
import EnhancedCategorizedNav from '@/components/navigation/EnhancedCategorizedNav';
import MobileEnhancedNav from '@/components/navigation/MobileEnhancedNav';

const EnhancedHeader: React.FC = React.memo(() => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { userProfile, getUnreadNotificationsCount } = useHealth();
  const { isMobile, isTablet } = useViewport();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = getUnreadNotificationsCount();

  const userMenuItems = [
    { name: 'Profile', icon: User, action: () => navigate('/profile') },
    { name: 'Settings', icon: Settings, action: () => navigate('/settings') },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-orange-200/50 dark:border-orange-800/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Enhanced Brand Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-vibrant transition-all duration-500">
                  <TrendingUp className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  VitalitySync
                </span>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  AI Health Platform
                </div>
              </div>
            </Link>

            {/* Enhanced Navigation - Desktop */}
            {!isMobile && (
              <div className="flex-1 flex justify-center">
                <EnhancedCategorizedNav />
              </div>
            )}

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Quick Action Button */}
              {!isMobile && (
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-vibrant transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Quick Log
                </Button>
              )}

              {/* Premium Badge */}
              <Link to="/premium">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform duration-300 cursor-pointer">
                  <Shield className="w-3 h-3 mr-1" />
                  Pro
                </Badge>
              </Link>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative hover:bg-orange-50 dark:hover:bg-orange-950/20"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Button>
                
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-vibrant border border-orange-200/50 dark:border-orange-700/50 p-4">
                    <h3 className="font-semibold mb-2">Notifications</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">No new notifications</p>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                >
                  <UserAvatar 
                    userProfile={userProfile || { name: 'User', email: 'user@example.com' }}
                    size="sm" 
                    className="ring-2 ring-orange-200 dark:ring-orange-700"
                  />
                  {!isMobile && (
                    <span className="text-sm font-medium">
                      {userProfile?.name || 'Welcome'}
                    </span>
                  )}
                </Button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-vibrant border border-orange-200/50 dark:border-orange-700/50 py-2 z-50">
                    <div className="px-4 py-3 border-b border-orange-200/50 dark:border-orange-700/50">
                      <div className="flex items-center gap-3">
                        <UserAvatar 
                          userProfile={userProfile || { name: 'User', email: 'user@example.com' }}
                          size="md" 
                        />
                        <div>
                          <p className="font-semibold text-sm">{userProfile?.name || 'Health Champion'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {userProfile?.email || 'user@vitalitysync.com'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      {userMenuItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={item.action}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </button>
                      ))}
                      <hr className="my-2 border-orange-200/50 dark:border-orange-700/50" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="hover:bg-orange-50 dark:hover:bg-orange-950/20"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 z-40 transform transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col border-l border-gray-200/50 dark:border-gray-700/50">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center">
              <span className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Navigation</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-xl p-2 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <MobileEnhancedNav />
            </div>
          </div>
        </div>
      )}
    </>
  );
});

EnhancedHeader.displayName = 'EnhancedHeader';

export default EnhancedHeader;
