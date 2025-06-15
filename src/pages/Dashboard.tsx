
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Target, 
  Zap,
  Brain,
  Trophy,
  TrendingUp,
  Activity,
  Heart,
  Sparkles,
  Crown,
  Flame,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import DashboardStats from '@/components/common/DashboardStats';
import RecentActivity from '@/components/common/RecentActivity';
import QuickActionsPanel from '@/components/common/QuickActionsPanel';
import AnalyticsDashboard from '@/components/common/AnalyticsDashboard';
import AIInsightsPanel from '@/components/dashboard/AIInsightsPanel';
import AdvancedMetrics from '@/components/dashboard/AdvancedMetrics';
import HealthTrends from '@/components/dashboard/HealthTrends';
import PersonalizedGoals from '@/components/dashboard/PersonalizedGoals';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { userProfile } = useHealth();
  const { theme, colorTheme } = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'ai-insights' | 'goals' | 'trends'>('overview');

  const handleGetStarted = useCallback(() => {
    setActiveTab('goals');
  }, []);

  const handleTabChange = useCallback((value: any) => {
    setActiveTab(value);
  }, []);

  const tabConfig = useMemo(() => [
    {
      value: 'overview',
      label: 'Overview',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      description: 'Your health snapshot'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      description: 'Deep insights & trends'
    },
    {
      value: 'ai-insights',
      label: 'AI Coach',
      icon: Brain,
      color: 'from-emerald-500 to-teal-500',
      description: 'Personalized recommendations'
    },
    {
      value: 'goals',
      label: 'Goals',
      icon: Trophy,
      color: 'from-orange-500 to-red-500',
      description: 'Achievement tracking'
    },
    {
      value: 'trends',
      label: 'Trends',
      icon: TrendingUp,
      color: 'from-indigo-500 to-purple-500',
      description: 'Health patterns'
    }
  ], []);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 relative overflow-hidden">
      {/* Enhanced atmospheric background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-100/80 dark:from-slate-950 dark:via-slate-900/95 dark:to-indigo-950/90"></div>
        
        {/* Floating orbs with better performance */}
        <div className={cn(
          "absolute bg-gradient-to-br from-blue-400/8 via-purple-500/12 to-pink-500/8 rounded-full blur-3xl animate-pulse-soft opacity-60",
          isMobile ? "top-5 right-5 w-32 h-32" : "top-10 right-10 w-64 h-64"
        )}></div>
        <div className={cn(
          "absolute bg-gradient-to-tr from-emerald-400/8 via-cyan-500/12 to-blue-500/8 rounded-full blur-3xl animate-pulse-soft delay-1000 opacity-60",
          isMobile ? "bottom-5 left-5 w-40 h-40" : "bottom-10 left-10 w-72 h-72"
        )}></div>
      </div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8 md:space-y-12 relative z-10">
          {/* Revolutionary Header Section */}
          <div className="text-center md:text-left space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {getWelcomeMessage()}, {userProfile?.name || 'Champion'}! 🌟
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                      Your premium health command center
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl text-white font-bold shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Premium Active</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                  <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">AI Powered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              <TabsList className={cn(
                "grid w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-2 shadow-2xl",
                isMobile ? "grid-cols-3" : "grid-cols-5"
              )}>
                {tabConfig.slice(0, isMobile ? 3 : 5).map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value} 
                    className={cn(
                      "relative flex items-center gap-3 p-4 rounded-2xl transition-all duration-500 font-semibold data-[state=active]:text-white overflow-hidden",
                      activeTab === tab.value && `bg-gradient-to-r ${tab.color} shadow-2xl scale-105`
                    )}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12"></div>
                    
                    <tab.icon className={cn("w-5 h-5 relative z-10", isMobile && "w-4 h-4")} />
                    {!isMobile && <span className="relative z-10">{tab.label}</span>}
                    
                    {activeTab === tab.value && (
                      <Sparkles className="w-3 h-3 text-white/80 animate-pulse relative z-10" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Tab descriptions for desktop */}
              {!isMobile && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tabConfig.find(tab => tab.value === activeTab)?.description}
                  </p>
                </div>
              )}
            </div>

            {/* Tab Content with Enhanced Layouts */}
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <DashboardStats />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <RecentActivity onGetStarted={handleGetStarted} />
                  </div>
                  <div className="space-y-6">
                    <QuickActionsPanel />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8 animate-fade-in">
                <AnalyticsDashboard />
                <AdvancedMetrics />
              </TabsContent>

              <TabsContent value="ai-insights" className="space-y-8 animate-fade-in">
                <AIInsightsPanel />
              </TabsContent>

              <TabsContent value="goals" className="space-y-8 animate-fade-in">
                <PersonalizedGoals />
              </TabsContent>

              <TabsContent value="trends" className="space-y-8 animate-fade-in">
                <HealthTrends />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
