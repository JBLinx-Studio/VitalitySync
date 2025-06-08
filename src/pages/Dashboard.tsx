
import React, { useState, useCallback, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  Target, 
  Brain,
  Trophy,
  TrendingUp,
  Sparkles,
  Gauge,
  Activity,
  Zap,
  Crown,
  Star,
  Rocket,
  Award,
  Calendar,
  Clock,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import EnhancedDashboardOverview from '@/components/dashboard/EnhancedDashboardOverview';
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
      label: 'Smart Overview',
      icon: Gauge,
      color: 'from-emerald-500 to-teal-600',
      description: 'Intelligent health dashboard with real-time insights',
      bgGradient: 'from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40'
    },
    {
      value: 'analytics',
      label: 'Deep Analytics',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Advanced performance metrics and data analysis',
      bgGradient: 'from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40'
    },
    {
      value: 'ai-coach',
      label: 'AI Health Coach',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      description: 'Personalized AI-powered health recommendations',
      bgGradient: 'from-purple-50/80 to-pink-50/80 dark:from-purple-950/40 dark:to-pink-950/40'
    },
    {
      value: 'goals',
      label: 'Goal Mastery',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'Achievement tracking and milestone management',
      bgGradient: 'from-amber-50/80 to-orange-50/80 dark:from-amber-950/40 dark:to-orange-950/40'
    },
    {
      value: 'trends',
      label: 'Health Evolution',
      icon: TrendingUp,
      color: 'from-rose-500 to-pink-600',
      description: 'Long-term patterns and trend visualization',
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
      "Your health transformation journey begins here",
      "Data-driven wellness for extraordinary results",
      "Unlock your potential with intelligent insights",
      "Every metric tells your unique wellness story",
      "Advanced analytics for peak performance"
    ];
    return messages[new Date().getDate() % messages.length];
  };

  const currentTab = tabConfig.find(tab => tab.value === activeTab);

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden transition-all duration-1000",
      `bg-gradient-to-br ${currentTab?.bgGradient || 'from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900'}`
    )}>
      {/* Advanced Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl"></div>
        
        {/* Dynamic floating orbs that change with tab selection */}
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse opacity-20 transition-all duration-1000",
          isMobile ? "top-10 right-10 w-32 h-32" : "top-20 right-20 w-72 h-72",
          activeTab === 'overview' && "bg-gradient-to-br from-emerald-400/40 to-teal-500/40",
          activeTab === 'analytics' && "bg-gradient-to-br from-blue-400/40 to-indigo-500/40",
          activeTab === 'ai-coach' && "bg-gradient-to-br from-purple-400/40 to-pink-500/40",
          activeTab === 'goals' && "bg-gradient-to-br from-amber-400/40 to-orange-500/40",
          activeTab === 'trends' && "bg-gradient-to-br from-rose-400/40 to-pink-500/40"
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse delay-1000 opacity-15 transition-all duration-1000",
          isMobile ? "bottom-10 left-10 w-40 h-40" : "bottom-20 left-20 w-80 h-80",
          activeTab === 'overview' && "bg-gradient-to-tr from-teal-400/40 to-emerald-500/40",
          activeTab === 'analytics' && "bg-gradient-to-tr from-indigo-400/40 to-blue-500/40",
          activeTab === 'ai-coach' && "bg-gradient-to-tr from-pink-400/40 to-purple-500/40",
          activeTab === 'goals' && "bg-gradient-to-tr from-orange-400/40 to-amber-500/40",
          activeTab === 'trends' && "bg-gradient-to-tr from-pink-400/40 to-rose-500/40"
        )}></div>

        {/* Additional ambient effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tl from-white/10 to-transparent rounded-full blur-3xl animate-pulse delay-1500"></div>
      </div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8 md:space-y-12 relative z-10">
          {/* Revolutionary Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur-3xl rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className={cn(
                        "w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110",
                        `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                      )}>
                        <currentTab.icon className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                      {/* Pulsing rings */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/30 to-transparent scale-110 animate-pulse opacity-60"></div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent scale-125 animate-pulse delay-500 opacity-40"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-3">
                        {getWelcomeMessage()}, {userProfile?.name || 'Health Champion'}
                      </h1>
                      <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-2">
                        {getMotivationalMessage()}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
                          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-semibold">Real-time Processing</span>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full border border-blue-200/50 dark:border-blue-700/50">
                          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                            <Star className="w-4 h-4" />
                            <span className="text-sm font-semibold">AI Powered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-100 dark:to-slate-200 rounded-2xl text-white dark:text-slate-900 font-bold shadow-2xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6" />
                      <div>
                        <div className="text-sm opacity-80">VitalitySync</div>
                        <div className="text-lg">Elite Dashboard</div>
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
              
              {/* Enhanced focus banner */}
              <div className="mt-8 p-6 bg-gradient-to-r from-white/60 via-white/80 to-white/60 dark:from-slate-800/60 dark:via-slate-700/80 dark:to-slate-800/60 rounded-2xl border border-white/40 dark:border-slate-600/40 backdrop-blur-xl shadow-inner">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl",
                    `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                  )}>
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Revolutionary Health Intelligence Platform
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {currentTab?.description} - Experience next-generation health monitoring with advanced AI algorithms, real-time data processing, and personalized insights that adapt to your unique wellness journey.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Active Module</div>
                      <div className="font-bold text-slate-700 dark:text-slate-300">{currentTab?.label}</div>
                    </div>
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-3xl rounded-3xl border border-white/40 dark:border-slate-700/40 shadow-2xl"></div>
              <TabsList className={cn(
                "relative grid w-full bg-transparent p-8 gap-3",
                isMobile ? "grid-cols-2" : "grid-cols-5"
              )}>
                {tabConfig.slice(0, isMobile ? 2 : 5).map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value} 
                    className={cn(
                      "relative flex items-center gap-4 p-6 rounded-2xl transition-all duration-700 font-bold text-base overflow-hidden group border-2 border-transparent",
                      "hover:scale-105 hover:shadow-2xl",
                      activeTab === tab.value && [
                        `bg-gradient-to-br ${tab.color} text-white shadow-2xl scale-105 border-white/30`,
                        "dark:border-slate-400/30"
                      ],
                      activeTab !== tab.value && [
                        "bg-white/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300",
                        "hover:bg-white/80 dark:hover:bg-slate-600/80"
                      ]
                    )}
                  >
                    {/* Enhanced shimmer and glow effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 animate-pulse"></div>
                    
                    <tab.icon className={cn("w-6 h-6 relative z-10", isMobile && "w-5 h-5")} />
                    {!isMobile && <span className="relative z-10">{tab.label}</span>}
                    
                    {activeTab === tab.value && (
                      <Sparkles className="w-5 h-5 text-white/90 animate-pulse relative z-10 ml-auto" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {/* Enhanced tab descriptions */}
              {!isMobile && (
                <div className="relative mt-6 text-center px-8 pb-4">
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium bg-white/80 dark:bg-slate-800/80 rounded-full px-6 py-3 inline-block backdrop-blur-xl border border-white/40 dark:border-slate-600/40 shadow-lg">
                    {currentTab?.description}
                  </p>
                </div>
              )}
            </div>

            {/* Revolutionary Tab Content */}
            <div className="mt-10">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <EnhancedDashboardOverview />
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
