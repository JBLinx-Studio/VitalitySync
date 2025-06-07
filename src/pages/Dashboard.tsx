
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
  Award,
  Calendar,
  Clock,
  Gauge
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
import SmartHealthAssistant from '@/components/dashboard/SmartHealthAssistant';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { userProfile } = useHealth();
  const { theme, colorTheme } = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'ai-coach' | 'goals' | 'trends'>('overview');

  const handleGetStarted = useCallback(() => {
    setActiveTab('goals');
  }, []);

  const handleTabChange = useCallback((value: any) => {
    setActiveTab(value);
  }, []);

  const tabConfig = useMemo(() => [
    {
      value: 'overview',
      label: 'Health Overview',
      icon: Gauge,
      color: 'from-emerald-500 to-teal-600',
      description: 'Your complete wellness dashboard',
      bgGradient: 'from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40'
    },
    {
      value: 'analytics',
      label: 'Analytics Pro',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Advanced performance insights',
      bgGradient: 'from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40'
    },
    {
      value: 'ai-coach',
      label: 'AI Coach',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      description: 'Intelligent health recommendations',
      bgGradient: 'from-purple-50/80 to-pink-50/80 dark:from-purple-950/40 dark:to-pink-950/40'
    },
    {
      value: 'goals',
      label: 'Goals & Achievements',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'Milestone tracking & rewards',
      bgGradient: 'from-amber-50/80 to-orange-50/80 dark:from-amber-950/40 dark:to-orange-950/40'
    },
    {
      value: 'trends',
      label: 'Health Trends',
      icon: TrendingUp,
      color: 'from-rose-500 to-pink-600',
      description: 'Long-term pattern analysis',
      bgGradient: 'from-rose-50/80 to-pink-50/80 dark:from-rose-950/40 dark:to-pink-950/40'
    }
  ], []);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Transform your health with data-driven insights",
      "Every metric tells your wellness story",
      "Your journey to optimal health starts here",
      "Discover patterns, unlock potential",
      "Smart analytics for smarter health decisions"
    ];
    return messages[new Date().getDate() % messages.length];
  };

  const currentTab = tabConfig.find(tab => tab.value === activeTab);

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-1000",
      currentTab?.bgGradient || 'from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900',
      `bg-gradient-to-br ${currentTab?.bgGradient}`
    )}>
      {/* Dynamic background effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl"></div>
        
        {/* Floating orbs that change with tab selection */}
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse opacity-30 transition-all duration-1000",
          isMobile ? "top-10 right-10 w-32 h-32" : "top-20 right-20 w-64 h-64",
          activeTab === 'overview' && "bg-gradient-to-br from-emerald-400/30 to-teal-500/30",
          activeTab === 'analytics' && "bg-gradient-to-br from-blue-400/30 to-indigo-500/30",
          activeTab === 'ai-coach' && "bg-gradient-to-br from-purple-400/30 to-pink-500/30",
          activeTab === 'goals' && "bg-gradient-to-br from-amber-400/30 to-orange-500/30",
          activeTab === 'trends' && "bg-gradient-to-br from-rose-400/30 to-pink-500/30"
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse delay-1000 opacity-20 transition-all duration-1000",
          isMobile ? "bottom-10 left-10 w-40 h-40" : "bottom-20 left-20 w-72 h-72",
          activeTab === 'overview' && "bg-gradient-to-tr from-teal-400/30 to-emerald-500/30",
          activeTab === 'analytics' && "bg-gradient-to-tr from-indigo-400/30 to-blue-500/30",
          activeTab === 'ai-coach' && "bg-gradient-to-tr from-pink-400/30 to-purple-500/30",
          activeTab === 'goals' && "bg-gradient-to-tr from-orange-400/30 to-amber-500/30",
          activeTab === 'trends' && "bg-gradient-to-tr from-pink-400/30 to-rose-500/30"
        )}></div>
      </div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8 md:space-y-12 relative z-10">
          {/* Professional Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-700/20"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className={cn(
                        "w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500",
                        `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                      )}>
                        <currentTab.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-2">
                        {getWelcomeMessage()}, {userProfile?.name || 'Health Champion'}
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium">
                        {getMotivationalMessage()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 rounded-2xl text-white dark:text-slate-900 font-bold shadow-2xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6" />
                      <div>
                        <div className="text-sm opacity-80">VitalitySync</div>
                        <div className="text-lg">Professional</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced info banner */}
              <div className="mt-8 p-6 bg-gradient-to-r from-white/40 via-white/60 to-white/40 dark:from-slate-800/40 dark:via-slate-700/60 dark:to-slate-800/40 rounded-2xl border border-white/30 dark:border-slate-600/30 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl",
                    `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                  )}>
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Advanced Health Analytics Dashboard
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentTab?.description} - Real-time data processing with intelligent insights and personalized recommendations powered by advanced algorithms.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Current Focus</div>
                      <div className="font-bold text-slate-700 dark:text-slate-300">{currentTab?.label}</div>
                    </div>
                    <Award className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl"></div>
              <TabsList className={cn(
                "relative grid w-full bg-transparent p-6 gap-2",
                isMobile ? "grid-cols-2" : "grid-cols-5"
              )}>
                {tabConfig.slice(0, isMobile ? 2 : 5).map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value} 
                    className={cn(
                      "relative flex items-center gap-3 p-6 rounded-2xl transition-all duration-500 font-bold text-base overflow-hidden group border-2 border-transparent",
                      "hover:scale-105 hover:shadow-xl",
                      activeTab === tab.value && [
                        `bg-gradient-to-br ${tab.color} text-white shadow-2xl scale-105 border-white/20`,
                        "dark:border-slate-400/20"
                      ],
                      activeTab !== tab.value && [
                        "bg-white/40 dark:bg-slate-700/40 text-slate-700 dark:text-slate-300",
                        "hover:bg-white/60 dark:hover:bg-slate-600/60"
                      ]
                    )}
                  >
                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-pulse"></div>
                    
                    <tab.icon className={cn("w-6 h-6 relative z-10", isMobile && "w-5 h-5")} />
                    {!isMobile && <span className="relative z-10">{tab.label}</span>}
                    
                    {activeTab === tab.value && (
                      <Sparkles className="w-4 h-4 text-white/90 animate-pulse relative z-10 ml-auto" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Tab descriptions */}
              {!isMobile && (
                <div className="relative mt-4 text-center px-6 pb-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-white/60 dark:bg-slate-800/60 rounded-full px-4 py-2 inline-block backdrop-blur-xl border border-white/30 dark:border-slate-600/30">
                    {currentTab?.description}
                  </p>
                </div>
              )}
            </div>

            {/* Enhanced Tab Content */}
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

              <TabsContent value="ai-coach" className="space-y-8 animate-fade-in">
                <SmartHealthAssistant />
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
