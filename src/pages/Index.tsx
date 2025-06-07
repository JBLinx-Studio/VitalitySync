
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
  Shield,
  Star,
  Rocket,
  Users,
  Award
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

const Index: React.FC = () => {
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
      label: 'Health Hub',
      icon: Target,
      color: 'from-orange-500 to-amber-500',
      description: 'Your complete wellness snapshot'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      description: 'Deep insights & performance metrics'
    },
    {
      value: 'ai-insights',
      label: 'AI Coach',
      icon: Brain,
      color: 'from-emerald-500 to-teal-500',
      description: 'Intelligent health recommendations'
    },
    {
      value: 'goals',
      label: 'Goals',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      description: 'Achievements & milestone tracking'
    },
    {
      value: 'trends',
      label: 'Trends',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      description: 'Long-term health pattern analysis'
    }
  ], []);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Rise & Shine';
    if (hour < 17) return 'Power Through';
    return 'Wind Down';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Your health journey is extraordinary",
      "Every step forward is a victory",
      "Transform your life with purpose",
      "Unlock your full potential today",
      "Be the hero of your health story"
    ];
    return messages[new Date().getDate() % messages.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-red-50/50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-red-950/30 relative overflow-hidden">
      {/* Enhanced atmospheric background with vibrant orange theme */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-red-100/80 dark:from-orange-950 dark:via-amber-950/95 dark:to-red-950/90"></div>
        
        {/* Floating orbs with vibrant orange theme */}
        <div className={cn(
          "absolute bg-gradient-to-br from-orange-400/12 via-amber-500/15 to-red-500/12 rounded-full blur-3xl animate-vibrant-pulse opacity-60",
          isMobile ? "top-5 right-5 w-32 h-32" : "top-10 right-10 w-64 h-64"
        )}></div>
        <div className={cn(
          "absolute bg-gradient-to-tr from-blue-400/10 via-cyan-500/12 to-teal-500/10 rounded-full blur-3xl animate-vibrant-pulse delay-1000 opacity-60",
          isMobile ? "bottom-5 left-5 w-40 h-40" : "bottom-10 left-10 w-72 h-72"
        )}></div>
        <div className={cn(
          "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-300/8 via-amber-400/10 to-yellow-400/8 rounded-full blur-3xl animate-vibrant-pulse delay-500 opacity-50",
          isMobile ? "w-36 h-36" : "w-80 h-80"
        )}></div>
      </div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8 md:space-y-12 relative z-10">
          {/* Revolutionary Header Section with Vibrant Theme */}
          <div className="text-center md:text-left space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-vibrant">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                      <Star className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-2 animate-fade-in">
                      {getWelcomeMessage()}, {userProfile?.name || 'Health Champion'}! 🚀
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                      {getMotivationalMessage()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl text-white font-bold shadow-vibrant hover:shadow-vibrant-glow transition-all duration-500 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>VitalitySync Pro</span>
                  </div>
                </div>
                <div className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-700">
                  <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <Users className="w-4 h-4" />
                    <span className="font-semibold">Community Member</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Motivational banner */}
            <div className="p-6 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 dark:from-orange-400/10 dark:via-amber-400/10 dark:to-yellow-400/10 rounded-3xl border border-orange-200/30 dark:border-orange-700/30 backdrop-blur-xl">
              <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-700 dark:text-orange-300 mb-1">
                    Your Wellness Mission Control is Ready
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Track, analyze, and optimize every aspect of your health journey with AI-powered insights and personalized recommendations.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Level up daily</span>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Tab Navigation with Vibrant Theme */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              <TabsList className={cn(
                "grid w-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-3xl border border-orange-200/50 dark:border-orange-700/50 rounded-3xl p-3 shadow-vibrant",
                isMobile ? "grid-cols-3" : "grid-cols-5"
              )}>
                {tabConfig.slice(0, isMobile ? 3 : 5).map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value} 
                    className={cn(
                      "relative flex items-center gap-3 p-4 rounded-2xl transition-all duration-500 font-semibold data-[state=active]:text-white overflow-hidden group",
                      activeTab === tab.value && `bg-gradient-to-r ${tab.color} shadow-vibrant scale-105`
                    )}
                  >
                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-energy-flow"></div>
                    
                    <tab.icon className={cn("w-5 h-5 relative z-10", isMobile && "w-4 h-4")} />
                    {!isMobile && <span className="relative z-10">{tab.label}</span>}
                    
                    {activeTab === tab.value && (
                      <Sparkles className="w-3 h-3 text-white/80 animate-pulse relative z-10" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Enhanced tab descriptions */}
              {!isMobile && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
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

export default Index;
