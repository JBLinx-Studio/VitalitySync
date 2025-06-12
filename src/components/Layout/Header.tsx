
import React, { useState, useEffect } from 'react';
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
  Settings as SettingsIcon,
  Sun
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '../Notifications/NotificationsMenu';

const Header: React.FC = () => {
  const { userProfile } = useHealth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: "/", icon: <BarChart className="h-5 w-5" />, label: "Home" },
    { path: "/dashboard", icon: <Activity className="h-5 w-5" />, label: "Dashboard" },
    { path: "/food", icon: <Utensils className="h-5 w-5" />, label: "Nutrition" },
    { path: "/exercise", icon: <Activity className="h-5 w-5" />, label: "Exercise" },
    { path: "/sleep", icon: <Moon className="h-5 w-5" />, label: "Sleep" },
    { path: "/mental", icon: <Brain className="h-5 w-5" />, label: "Mental" },
    { path: "/body", icon: <Ruler className="h-5 w-5" />, label: "Body" },
    { path: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" },
    { path: "/settings", icon: <SettingsIcon className="h-5 w-5" />, label: "Settings" }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md' : 
      'backdrop-blur-sm bg-gradient-to-r from-health-primary to-health-secondary text-white shadow-sm'
    }`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3 px-4">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Activity className={`h-8 w-8 mr-2 ${scrolled ? 'text-health-primary' : 'text-white'}`} />
            <h1 className={`text-2xl font-bold font-display ${
              scrolled ? 'bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent' : 'text-white'
            }`}>
              VitalitySync
            </h1>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                icon={item.icon} 
                label={item.label} 
                isActive={isActivePath(item.path)}
                onClick={closeMobileMenu}
                scrolled={scrolled}
              />
            ))}
            <div className="ml-3 flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={`rounded-full ${
                  scrolled 
                    ? 'text-gray-700 hover:bg-gray-200/70' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <NotificationsMenu />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full mr-2 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-200/70' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <NotificationsMenu />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleMobileMenu} 
              className={`ml-2 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-200/70' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-4 bg-gradient-to-b from-health-secondary/90 to-health-primary/90 backdrop-blur-md animate-fade-in">
            <nav className="grid grid-cols-4 gap-2">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  icon={item.icon} 
                  label={item.label} 
                  isActive={isActivePath(item.path)}
                  isMobile={true}
                  onClick={closeMobileMenu}
                  scrolled={false}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink: React.FC<{ 
  to: string; 
  icon: React.ReactNode; 
  label: string;
  isActive?: boolean;
  isMobile?: boolean;
  scrolled?: boolean;
  onClick?: () => void;
}> = ({ to, icon, label, isActive = false, isMobile = false, scrolled = false, onClick }) => {
  const baseClasses = "flex flex-col items-center rounded-lg transition-all duration-300";
  
  let desktopClasses = "";
  if (scrolled) {
    desktopClasses = isActive 
      ? "bg-gray-200/70 text-health-primary px-3 py-2" 
      : "hover:bg-gray-100/70 text-gray-700 hover:text-health-primary px-3 py-2";
  } else {
    desktopClasses = isActive 
      ? "bg-white/30 text-white px-3 py-2" 
      : "hover:bg-white/20 text-white/90 hover:text-white px-3 py-2";
  }
  
  const mobileClasses = isActive 
    ? "bg-white/20 text-white p-2" 
    : "hover:bg-white/10 text-white/90 hover:text-white p-2";
  
  const classes = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;
  
  return (
    <Link to={to} className={classes} onClick={onClick}>
      <div className="mb-1">{icon}</div>
      <span className={`text-xs ${isMobile ? "" : "sm:text-sm"}`}>{label}</span>
    </Link>
  );
};

export default Header;
