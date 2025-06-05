
import React, { useState, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Target, 
  Zap,
  TrendingUp,
  Activity,
  Brain
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

  const tabConfigs = [
    {
      value: 'overview',
      icon: <Target className="w-5 h-5" />,
      label: 'Overview',
      description: 'Daily health summary',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      value: 'analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Analytics',
      description: 'Detailed insights',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      value: 'actions',
      icon: <Zap className="w-5 h-5" />,
      label: 'Quick Actions',
      description: 'Fast tracking',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/30">
      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8">
          {/* Enhanced Header */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 text-center lg:text-left">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Health Dashboard
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mt-2">
                    Welcome back, {userProfile?.name || 'Health Champion'}! 🚀
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                    Live Tracking Active
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700">
                  <Brain className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    AI Insights Ready
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="grid grid-cols-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60">
                {tabConfigs.map((tab) => (
                  <TabsTrigger 
                    key={tab.value}
                    value={tab.value} 
                    className={`group relative flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 data-[state=active]:shadow-lg ${
                      activeTab === tab.value 
                        ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg scale-105` 
                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:scale-102'
                    }`}
                  >
                    <div className={`transition-transform duration-300 ${activeTab === tab.value ? 'scale-110' : 'group-hover:scale-105'}`}>
                      {tab.icon}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">{isMobile ? tab.label.split(' ')[0] : tab.label}</div>
                      {!isMobile && (
                        <div className={`text-xs opacity-80 ${activeTab === tab.value ? 'text-white/80' : 'text-gray-500'}`}>
                          {tab.description}
                        </div>
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Enhanced Tab Content */}
            <div className="relative">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <DashboardStats />
                <RecentActivity onGetStarted={handleGetStarted} />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    Advanced Analytics
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Deep insights into your health patterns and trends
                  </p>
                </div>
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="actions" className="space-y-8 animate-fade-in">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                    Quick Actions
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fast track your health data with one-click actions
                  </p>
                </div>
                <QuickActionsPanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
