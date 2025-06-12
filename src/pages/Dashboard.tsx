
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
import AdvancedAnalytics from '@/components/dashboard/AdvancedAnalytics';
import AIHealthCoach from '@/components/dashboard/AIHealthCoach';
import GoalManagement from '@/components/dashboard/GoalManagement';
import HealthTrends from '@/components/dashboard/HealthTrends';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { userProfile } = useHealth();
  const { theme, colorTheme } = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'ai-coach' | 'goals' | 'trends'>('overview');

  const handleTabChange = useCallback((value: any) => {
    setActiveTab(value);
  }, []);

  const tabConfig = useMemo(() => [
    {
      value: 'overview',
      label: 'Smart Overview',
      icon: Gauge,
      color: 'from-emerald-500 to-teal-600',
      description: 'Comprehensive health dashboard with real-time insights',
      bgGradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20'
    },
    {
      value: 'analytics',
      label: 'Analytics Pro',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Advanced metrics and performance analysis',
      bgGradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20'
    },
    {
      value: 'ai-coach',
      label: 'AI Coach',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      description: 'Personalized AI-powered health recommendations',
      bgGradient: 'from-purple-500/20 via-pink-500/10 to-rose-500/20'
    },
    {
      value: 'goals',
      label: 'Goal Tracker',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'Achievement tracking and milestone management',
      bgGradient: 'from-amber-500/20 via-orange-500/10 to-red-500/20'
    },
    {
      value: 'trends',
      label: 'Health Trends',
      icon: TrendingUp,
      color: 'from-rose-500 to-pink-600',
      description: 'Long-term patterns and health evolution',
      bgGradient: 'from-rose-500/20 via-pink-500/10 to-purple-500/20'
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
      "Transform your health with intelligent insights",
      "Your wellness journey starts with great data",
      "Achieve peak performance with smart tracking",
      "Every metric tells your success story",
      "Unlock your potential with personalized analytics"
    ];
    return messages[new Date().getDate() % messages.length];
  };

  const currentTab = tabConfig.find(tab => tab.value === activeTab);

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden",
      "bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
    )}>
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-1000",
          `${currentTab?.bgGradient || 'from-slate-50/80 to-gray-100/80'}`
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse opacity-20 transition-all duration-1000",
          isMobile ? "top-10 right-10 w-40 h-40" : "top-20 right-20 w-96 h-96",
          activeTab === 'overview' && "bg-gradient-to-br from-emerald-400/40 to-teal-500/40",
          activeTab === 'analytics' && "bg-gradient-to-br from-blue-400/40 to-indigo-500/40",
          activeTab === 'ai-coach' && "bg-gradient-to-br from-purple-400/40 to-pink-500/40",
          activeTab === 'goals' && "bg-gradient-to-br from-amber-400/40 to-orange-500/40",
          activeTab === 'trends' && "bg-gradient-to-br from-rose-400/40 to-pink-500/40"
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse delay-1000 opacity-15 transition-all duration-1000",
          isMobile ? "bottom-10 left-10 w-48 h-48" : "bottom-20 left-20 w-[32rem] h-[32rem]",
          activeTab === 'overview' && "bg-gradient-to-tr from-teal-400/40 to-emerald-500/40",
          activeTab === 'analytics' && "bg-gradient-to-tr from-indigo-400/40 to-blue-500/40",
          activeTab === 'ai-coach' && "bg-gradient-to-tr from-pink-400/40 to-purple-500/40",
          activeTab === 'goals' && "bg-gradient-to-tr from-orange-400/40 to-amber-500/40",
          activeTab === 'trends' && "bg-gradient-to-tr from-pink-400/40 to-rose-500/40"
        )}></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"} className="relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Professional Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/90 dark:from-black/60 dark:via-gray-900/40 dark:to-black/60 backdrop-blur-3xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className={cn(
                        "w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110",
                        `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                      )}>
                        <currentTab.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-3">
                        {getWelcomeMessage()}, {userProfile?.name || 'Champion'}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-semibold mb-3">
                        {getMotivationalMessage()}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-400/30 backdrop-blur-xl">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold text-sm">Live Analytics</span>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-400/30 backdrop-blur-xl">
                          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                            <Star className="w-4 h-4" />
                            <span className="font-semibold text-sm">AI Powered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-white dark:to-gray-100 rounded-2xl text-white dark:text-black font-bold shadow-2xl border border-gray-700 dark:border-white/20">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6" />
                      <div>
                        <div className="text-xs opacity-80">VitalitySync</div>
                        <div className="text-lg">Pro Dashboard</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-black/10 dark:bg-white/10 rounded-xl border border-gray-300/50 dark:border-gray-700/50 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold text-sm">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-50/60 via-white/80 to-gray-50/60 dark:from-black/40 dark:via-gray-900/60 dark:to-black/40 rounded-3xl border border-gray-200/50 dark:border-white/20 backdrop-blur-xl shadow-inner">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl",
                    `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                  )}>
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                      Professional Health Intelligence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                      {currentTab?.description} - Experience advanced health monitoring with real-time analytics, personalized insights, and professional-grade tracking tools.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Active Module</div>
                      <div className="font-bold text-lg text-gray-900 dark:text-white">{currentTab?.label}</div>
                    </div>
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-black/80 dark:via-gray-900/60 dark:to-black/80 backdrop-blur-3xl rounded-3xl border border-white/30 dark:border-white/20 shadow-2xl"></div>
              <div className="relative p-6 md:p-8">
                <TabsList className={cn(
                  "grid w-full bg-transparent gap-3 md:gap-4",
                  isMobile ? "grid-cols-2 p-3" : "grid-cols-5 p-4"
                )}>
                  {tabConfig.slice(0, isMobile ? 2 : 5).map((tab) => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value} 
                      className={cn(
                        "relative flex items-center gap-3 transition-all duration-500 font-bold text-sm md:text-base overflow-hidden group border-2 border-transparent",
                        "hover:scale-105 hover:shadow-xl",
                        isMobile ? "p-3 rounded-xl min-h-[50px]" : "p-4 rounded-2xl min-h-[60px]",
                        activeTab === tab.value && [
                          `bg-gradient-to-br ${tab.color} text-white shadow-xl scale-105 border-white/30`
                        ],
                        activeTab !== tab.value && [
                          "bg-gradient-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-900/80 text-gray-700 dark:text-gray-300",
                          "hover:from-gray-200/80 hover:to-gray-300/80 dark:hover:from-gray-700/80 dark:hover:to-gray-800/80 hover:text-gray-900 dark:hover:text-white"
                        ]
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
                      
                      <tab.icon className={cn("relative z-10", isMobile ? "w-5 h-5" : "w-6 h-6")} />
                      {!isMobile && <span className="relative z-10">{tab.label}</span>}
                      
                      {activeTab === tab.value && (
                        <Sparkles className="w-5 h-5 text-white/90 animate-pulse relative z-10 ml-auto" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {!isMobile && (
                  <div className="relative mt-6 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium bg-gray-100/60 dark:bg-black/40 rounded-full px-6 py-3 inline-block backdrop-blur-xl border border-gray-200/50 dark:border-white/20 shadow-lg">
                      {currentTab?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <EnhancedDashboardOverview />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8 animate-fade-in">
                <AdvancedAnalytics />
              </TabsContent>

              <TabsContent value="ai-coach" className="space-y-8 animate-fade-in">
                <AIHealthCoach />
              </TabsContent>

              <TabsContent value="goals" className="space-y-8 animate-fade-in">
                <GoalManagement />
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
