
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  Activity, 
  Utensils, 
  BarChart, 
  Moon, 
  Brain, 
  Ruler, 
  Menu, 
  X,
  Award
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { UltraCard } from '@/components/ui/card';
import { UserAvatar } from '@/components/common';
import OptionsMenu from '@/components/common/OptionsMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { userProfile } = useHealth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/dashboard", icon: <BarChart className="w-5 h-5" />, label: "Dashboard" },
    { path: "/food", icon: <Utensils className="w-5 h-5" />, label: "Nutrition" },
    { path: "/exercise", icon: <Activity className="w-5 h-5" />, label: "Fitness" },
    { path: "/sleep", icon: <Moon className="w-5 h-5" />, label: "Sleep" },
    { path: "/mental", icon: <Brain className="w-5 h-5" />, label: "Mental" },
    { path: "/body", icon: <Ruler className="w-5 h-5" />, label: "Body" },
    { path: "/achievements", icon: <Award className="w-5 h-5" />, label: "Achievements" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path ? 
      "text-health-primary dark:text-health-primary font-medium" : 
      "text-gray-600 hover:text-health-primary dark:text-gray-300 dark:hover:text-health-primary";
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <UltraCard className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-health-primary to-health-secondary shadow-glow">
              <span className="text-white font-bold text-xl">V</span>
            </UltraCard>
            <span className="text-xl font-display font-bold bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
              VitalitySync
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all duration-200 hover:bg-health-primary/10 ${isActive(item.path)}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Options Menu (includes Theme Toggle) */}
            <OptionsMenu userLoggedIn={!!userProfile} />

            {/* Notifications */}
            <div className="hidden sm:block">
              <NotificationsMenu />
            </div>

            {/* Profile */}
            {userProfile ? (
              <Link to="/profile" className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-health-primary to-health-secondary rounded-full opacity-25 group-hover:opacity-50 blur transition duration-300"></div>
                <UserAvatar userProfile={userProfile} />
              </Link>
            ) : (
              <Link to="/profile">
                <Button 
                  className="bg-gradient-to-r from-health-primary to-health-secondary hover:shadow-glow transition-all text-white"
                >
                  Get Started
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="outline"
              size="icon"
              className="md:hidden border-health-primary/20 hover:border-health-primary/40 hover:bg-health-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 md:hidden`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-gradient-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-950/95 backdrop-blur-lg shadow-xl flex flex-col">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <span className="text-lg font-medium">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-5 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-xl ${
                  location.pathname === item.path 
                    ? 'bg-gradient-to-r from-health-primary/20 to-health-secondary/20 text-health-primary font-medium' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-5 mt-5">
              <Link
                to="/profile"
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>Settings</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
