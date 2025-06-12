
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Activity, Utensils, BarChart, Moon, Brain, Ruler } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';

const Header: React.FC = () => {
  const { userProfile } = useHealth();

  return (
    <header className="bg-gradient-to-r from-health-primary to-health-secondary text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-3 sm:mb-0">
          <Activity className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">VitalitySync</h1>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-1 sm:gap-2">
          <NavLink to="/" icon={<BarChart className="h-5 w-5" />} label="Home" />
          <NavLink to="/dashboard" icon={<Activity className="h-5 w-5" />} label="Dashboard" />
          <NavLink to="/food" icon={<Utensils className="h-5 w-5" />} label="Nutrition" />
          <NavLink to="/exercise" icon={<Activity className="h-5 w-5" />} label="Exercise" />
          <NavLink to="/sleep" icon={<Moon className="h-5 w-5" />} label="Sleep" />
          <NavLink to="/mental" icon={<Brain className="h-5 w-5" />} label="Mental" />
          <NavLink to="/body" icon={<Ruler className="h-5 w-5" />} label="Body" />
          <NavLink to="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
        </nav>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex flex-col items-center p-2 hover:bg-white/20 rounded-lg transition-colors"
  >
    <div className="mb-1">{icon}</div>
    <span className="text-xs sm:text-sm">{label}</span>
  </Link>
);

export default Header;
