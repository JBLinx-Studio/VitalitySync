
import React, { useState } from 'react';
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
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationsMenu from '../Notifications/NotificationsMenu';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navItems = [
    { path: "/", icon: <BarChart className="h-5 w-5" />, label: "Home" },
    { path: "/dashboard", icon: <Activity className="h-5 w-5" />, label: "Dashboard" },
    { path: "/food", icon: <Utensils className="h-5 w-5" />, label: "Nutrition" },
    { path: "/exercise", icon: <Activity className="h-5 w-5" />, label: "Exercise" },
    { path: "/sleep", icon: <Moon className="h-5 w-5" />, label: "Sleep" },
    { path: "/mental", icon: <Brain className="h-5 w-5" />, label: "Mental" },
    { path: "/body", icon: <Ruler className="h-5 w-5" />, label: "Body" },
    { path: "/profile", icon: <User className="h-5 w-5" />, label: "Profile" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-primary text-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3 px-4">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Activity className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">VitalitySync</h1>
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
              />
            ))}
            <div className="ml-3">
              <NotificationsMenu />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <NotificationsMenu />
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleMobileMenu} 
              className="ml-2 text-white hover:bg-white/20"
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
          <div className="md:hidden py-3 px-4 bg-primary/90">
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
  onClick?: () => void;
}> = ({ to, icon, label, isActive = false, isMobile = false, onClick }) => {
  const baseClasses = "flex flex-col items-center rounded-lg transition-colors";
  
  const desktopClasses = isActive 
    ? "bg-white/30 text-white px-3 py-2" 
    : "hover:bg-white/20 text-white/90 px-3 py-2";
  
  const mobileClasses = isActive 
    ? "bg-white/20 text-white p-2" 
    : "hover:bg-white/10 text-white/90 p-2";
  
  const classes = `${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`;
  
  return (
    <Link to={to} className={classes} onClick={onClick}>
      <div className="mb-1">{icon}</div>
      <span className={`text-xs ${isMobile ? "" : "sm:text-sm"}`}>{label}</span>
    </Link>
  );
};

export default Header;
