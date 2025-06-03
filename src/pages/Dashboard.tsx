
import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Target, 
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import DashboardStats from '@/components/common/DashboardStats';
import RecentActivity from '@/components/common/RecentActivity';
import QuickActionsPanel from '@/components/common/QuickActionsPanel';
import AnalyticsDashboard from '@/components/common/AnalyticsDashboard';
import { useHealth } from '@/contexts/HealthContext';

const Dashboard: React.FC = () => {
  const { userProfile } = useHealth();
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'actions'>('overview');

  const handleGetStarted = useCallback(() => {
    setActiveTab('actions');
  }, []);

  const handleTabChange = useCallback((value: any) => {
    setActiveTab(value);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950">
      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-6 md:space-y-8">
          {/* Header */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Welcome back, {userProfile?.name || 'Health Champion'}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Here's your comprehensive health overview
            </p>
          </div>

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-3'} mb-6`}>
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                {!isMobile && "Overview"}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                {!isMobile && "Analytics"}
              </TabsTrigger>
              <TabsTrigger value="actions" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {!isMobile && "Actions"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Today's Quick Stats */}
              <DashboardStats />

              {/* Recent Activity */}
              <RecentActivity onGetStarted={handleGetStarted} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsDashboard />
            </TabsContent>

            <TabsContent value="actions" className="space-y-6">
              <QuickActionsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
