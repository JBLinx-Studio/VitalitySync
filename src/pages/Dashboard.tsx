
import React from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import SlidingPanelInterface from '@/components/dashboard/SlidingPanelInterface';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { userProfile } = useHealth();
  const { theme, colorTheme } = useTheme();

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden",
      "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"
    )}>
      <SlidingPanelInterface />
    </div>
  );
};

export default Dashboard;
