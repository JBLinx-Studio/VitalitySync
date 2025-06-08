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
import RevolutionaryDashboard from '@/components/dashboard/RevolutionaryDashboard';
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
      bgGradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20'
    },
    {
      value: 'analytics',
      label: 'Deep Analytics',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Advanced performance metrics and data analysis',
      bgGradient: 'from-blue-500/20 via-indigo-500/10 to-purple-500/20'
    },
    {
      value: 'ai-coach',
      label: 'AI Health Coach',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      description: 'Personalized AI-powered health recommendations',
      bgGradient: 'from-purple-500/20 via-pink-500/10 to-rose-500/20'
    },
    {
      value: 'goals',
      label: 'Goal Mastery',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'Achievement tracking and milestone management',
      bgGradient: 'from-amber-500/20 via-orange-500/10 to-red-500/20'
    },
    {
      value: 'trends',
      label: 'Health Evolution',
      icon: TrendingUp,
      color: 'from-rose-500 to-pink-600',
      description: 'Long-term patterns and trend visualization',
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
      "min-h-screen relative overflow-hidden",
      "bg-gradient-to-br from-slate-900 via-gray-900 to-black"
    )}>
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br transition-all duration-1000",
          `${currentTab?.bgGradient || 'from-slate-900/80 to-gray-900/80'}`
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse opacity-30 transition-all duration-1000",
          isMobile ? "top-10 right-10 w-40 h-40" : "top-20 right-20 w-96 h-96",
          activeTab === 'overview' && "bg-gradient-to-br from-emerald-400/60 to-teal-500/60",
          activeTab === 'analytics' && "bg-gradient-to-br from-blue-400/60 to-indigo-500/60",
          activeTab === 'ai-coach' && "bg-gradient-to-br from-purple-400/60 to-pink-500/60",
          activeTab === 'goals' && "bg-gradient-to-br from-amber-400/60 to-orange-500/60",
          activeTab === 'trends' && "bg-gradient-to-br from-rose-400/60 to-pink-500/60"
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse delay-1000 opacity-25 transition-all duration-1000",
          isMobile ? "bottom-10 left-10 w-48 h-48" : "bottom-20 left-20 w-[32rem] h-[32rem]",
          activeTab === 'overview' && "bg-gradient-to-tr from-teal-400/60 to-emerald-500/60",
          activeTab === 'analytics' && "bg-gradient-to-tr from-indigo-400/60 to-blue-500/60",
          activeTab === 'ai-coach' && "bg-gradient-to-tr from-pink-400/60 to-purple-500/60",
          activeTab === 'goals' && "bg-gradient-to-tr from-orange-400/60 to-amber-500/60",
          activeTab === 'trends' && "bg-gradient-to-tr from-pink-400/60 to-rose-500/60"
        )}></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <ResponsiveContainer maxWidth="7xl" padding={isMobile ? "sm" : "lg"} className="relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Revolutionary Header Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/40 to-black/60 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"></div>
            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      <div className={cn(
                        "w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110",
                        `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                      )}>
                        <currentTab.icon className="w-14 h-14 text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent scale-125 animate-pulse opacity-40"></div>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 to-transparent scale-150 animate-pulse delay-500 opacity-30"></div>
                    </div>
                    <div>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent mb-4">
                        {getWelcomeMessage()}, {userProfile?.name || 'Champion'}
                      </h1>
                      <p className="text-2xl md:text-3xl text-gray-300 font-bold mb-4">
                        {getMotivationalMessage()}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="px-6 py-3 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-2xl border border-emerald-400/30 backdrop-blur-xl">
                          <div className="flex items-center gap-3 text-emerald-300">
                            <Zap className="w-5 h-5" />
                            <span className="font-bold">Real-time Processing</span>
                          </div>
                        </div>
                        <div className="px-6 py-3 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 rounded-2xl border border-blue-400/30 backdrop-blur-xl">
                          <div className="flex items-center gap-3 text-blue-300">
                            <Star className="w-5 h-5" />
                            <span className="font-bold">AI Powered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="px-8 py-5 bg-gradient-to-r from-white to-gray-100 rounded-2xl text-black font-bold shadow-2xl border border-white/20">
                    <div className="flex items-center gap-3">
                      <Shield className="w-7 h-7" />
                      <div>
                        <div className="text-sm opacity-80">VitalitySync</div>
                        <div className="text-xl">Elite Dashboard</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-black/60 rounded-xl border border-gray-700/50 backdrop-blur-xl">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Clock className="w-6 h-6" />
                      <span className="font-bold">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-8 bg-gradient-to-r from-black/40 via-gray-900/60 to-black/40 rounded-3xl border border-white/20 backdrop-blur-xl shadow-inner">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-20 h-20 rounded-3xl flex items-center justify-center shadow-xl",
                    `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                  )}>
                    <Rocket className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-white mb-3">
                      Revolutionary Health Intelligence Platform
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {currentTab?.description} - Experience next-generation health monitoring with advanced AI algorithms, real-time data processing, and personalized insights that adapt to your unique wellness journey.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Active Module</div>
                      <div className="font-bold text-xl text-white">{currentTab?.label}</div>
                    </div>
                    <Award className="w-10 h-10 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/60 to-black/80 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"></div>
              <div className="relative p-6 md:p-10">
                <TabsList className={cn(
                  "grid w-full bg-transparent gap-4",
                  isMobile ? "grid-cols-2 p-4" : "grid-cols-5 p-6",
                  "min-h-[80px]"
                )}>
                  {tabConfig.slice(0, isMobile ? 2 : 5).map((tab) => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value} 
                      className={cn(
                        "relative flex items-center gap-4 transition-all duration-700 font-bold text-base overflow-hidden group border-2 border-transparent",
                        "hover:scale-105 hover:shadow-2xl",
                        isMobile ? "p-4 rounded-2xl min-h-[60px]" : "p-6 rounded-3xl min-h-[70px]",
                        activeTab === tab.value && [
                          `bg-gradient-to-br ${tab.color} text-white shadow-2xl scale-105 border-white/30`
                        ],
                        activeTab !== tab.value && [
                          "bg-gradient-to-br from-gray-800/80 to-gray-900/80 text-gray-300",
                          "hover:from-gray-700/80 hover:to-gray-800/80 hover:text-white"
                        ]
                      )}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 animate-pulse"></div>
                      
                      <tab.icon className={cn("relative z-10", isMobile ? "w-6 h-6" : "w-7 h-7")} />
                      {!isMobile && <span className="relative z-10 text-lg">{tab.label}</span>}
                      
                      {activeTab === tab.value && (
                        <Sparkles className="w-6 h-6 text-white/90 animate-pulse relative z-10 ml-auto" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {!isMobile && (
                  <div className="relative mt-8 text-center">
                    <p className="text-lg text-gray-300 font-semibold bg-black/40 rounded-full px-8 py-4 inline-block backdrop-blur-xl border border-white/20 shadow-lg">
                      {currentTab?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mt-10">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <RevolutionaryDashboard />
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
