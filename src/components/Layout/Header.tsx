
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Activity, Utensils, BarChart } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';

const Header: React.FC = () => {
  const { userProfile } = useHealth();

  return (
    <header className="bg-health-primary text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-3 sm:mb-0">
          <Activity className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Health Tracker</h1>
        </div>
        
        <nav className="flex space-x-1 sm:space-x-4">
          <NavLink to="/" icon={<BarChart className="h-5 w-5" />} label="Dashboard" />
          <NavLink to="/food" icon={<Utensils className="h-5 w-5" />} label="Nutrition" />
          <NavLink to="/exercise" icon={<Activity className="h-5 w-5" />} label="Exercise" />
          <NavLink to="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
        </nav>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex flex-col items-center p-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors"
  >
    <div className="mb-1">{icon}</div>
    <span className="text-xs sm:text-sm">{label}</span>
  </Link>
);

export default Header;
