
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
  Home,
  Activity,
  Apple,
  Moon,
  Brain,
  Trophy,
  Users,
  Smartphone,
  Target,
  Heart,
  Plus,
  Sparkles,
  Shield
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useViewport } from '@/hooks/use-viewport';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/ui/user-avatar';

const EnhancedHeader: React.FC = () => {
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

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home, color: 'text-orange-500', description: 'Your health overview' },
    { name: 'Exercise', path: '/exercise', icon: Activity, color: 'text-red-500', description: 'Track workouts' },
    { name: 'Nutrition', path: '/food', icon: Apple, color: 'text-green-500', description: 'Monitor meals' },
    { name: 'Sleep', path: '/sleep', icon: Moon, color: 'text-purple-500', description: 'Rest tracking' },
    { name: 'Mental', path: '/mental', icon: Brain, color: 'text-blue-500', description: 'Wellness & mood' },
    { name: 'Premium', path: '/premium', icon: Crown, color: 'text-yellow-500', description: 'AI-powered features', isPremium: true }
  ];

  const userMenuItems = [
    { name: 'Profile', icon: User, action: () => navigate('/profile') },
    { name: 'Achievements', icon: Trophy, action: () => navigate('/achievements') },
    { name: 'Body Measurements', icon: Target, action: () => navigate('/body') },
    { name: 'Community', icon: Users, action: () => navigate('/community') },
    { name: 'Settings', icon: Settings, action: () => navigate('/settings') },
  ];

  const isActivePath = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/') return true;
    return location.pathname === path;
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setIsUserMenuOpen(false);
  };

  return (
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

          {/* Navigation - Desktop */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 relative overflow-hidden",
                        isActive 
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-vibrant" 
                          : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                      )}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-20 animate-pulse"></div>
                      )}
                      <item.icon className={cn("w-4 h-4 relative z-10", isActive ? "text-white" : item.color)} />
                      <span className="relative z-10">{item.name}</span>
                      {item.isPremium && (
                        <Crown className="w-3 h-3 text-yellow-400 relative z-10" />
                      )}
                    </Link>
                    
                    {/* Enhanced tooltip */}
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/90 rotate-45"></div>
                    </div>
                  </div>
                );
              })}
            </nav>
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

        {/* Mobile Navigation */}
        {isMobile && isMobileMenuOpen && (
          <div className="md:hidden border-t border-orange-200/50 dark:border-orange-700/50 py-4">
            <nav className="grid grid-cols-2 gap-2">
              {navigationItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-xl font-medium transition-all duration-300",
                      isActive 
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" 
                        : "text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                    )}
                  >
                    <item.icon className={cn("w-4 h-4", isActive ? "text-white" : item.color)} />
                    <span className="text-sm">{item.name}</span>
                    {item.isPremium && (
                      <Crown className="w-3 h-3 text-yellow-400 ml-auto" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedHeader;
