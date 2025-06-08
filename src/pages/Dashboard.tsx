
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
  Shield,
  Gem,
  Flame,
  Heart
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
      label: 'Dashboard',
      icon: Gauge,
      color: 'from-emerald-400 via-teal-500 to-cyan-600',
      description: 'Complete health overview with real-time insights',
      bgGradient: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
      accentColor: 'emerald'
    },
    {
      value: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      color: 'from-blue-400 via-indigo-500 to-purple-600',
      description: 'Advanced metrics and performance analysis',
      bgGradient: 'from-blue-500/30 via-indigo-500/20 to-purple-500/30',
      accentColor: 'blue'
    },
    {
      value: 'ai-coach',
      label: 'AI Coach',
      icon: Brain,
      color: 'from-purple-400 via-violet-500 to-pink-600',
      description: 'Personalized AI-powered health recommendations',
      bgGradient: 'from-purple-500/30 via-violet-500/20 to-pink-500/30',
      accentColor: 'purple'
    },
    {
      value: 'goals',
      label: 'Goals',
      icon: Trophy,
      color: 'from-amber-400 via-orange-500 to-red-600',
      description: 'Achievement tracking and milestone management',
      bgGradient: 'from-amber-500/30 via-orange-500/20 to-red-500/30',
      accentColor: 'amber'
    },
    {
      value: 'trends',
      label: 'Trends',
      icon: TrendingUp,
      color: 'from-rose-400 via-pink-500 to-fuchsia-600',
      description: 'Long-term patterns and health evolution',
      bgGradient: 'from-rose-500/30 via-pink-500/20 to-fuchsia-500/30',
      accentColor: 'rose'
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
      "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900"
    )}>
      {/* Revolutionary Background Effects */}
      <div className="fixed inset-0 -z-10">
        {/* Animated gradient background */}
        <div className={cn(
          "absolute inset-0 transition-all duration-1000",
          `bg-gradient-to-br ${currentTab?.bgGradient || 'from-slate-900/80 to-gray-900/80'}`
        )}></div>
        
        {/* Floating orbs */}
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse opacity-20 transition-all duration-1000",
          isMobile ? "top-10 right-10 w-48 h-48" : "top-20 right-20 w-96 h-96",
          `bg-gradient-to-br ${currentTab?.color || 'from-slate-400/40 to-gray-500/40'}`
        )}></div>
        
        <div className={cn(
          "absolute rounded-full blur-3xl animate-pulse delay-1000 opacity-15 transition-all duration-1000",
          isMobile ? "bottom-10 left-10 w-56 h-56" : "bottom-20 left-20 w-[32rem] h-[32rem]",
          `bg-gradient-to-tr ${currentTab?.color || 'from-slate-400/40 to-gray-500/40'}`
        )}></div>

        {/* Mesh grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Glowing particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/50 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-bounce delay-1000"></div>
      </div>

      <ResponsiveContainer maxWidth="full" padding={isMobile ? "sm" : "lg"} className="relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Premium Header Section */}
          <div className="relative">
            {/* Glass morphism background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative group">
                      {/* Glowing backdrop */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
                      
                      <div className={cn(
                        "relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:scale-110",
                        `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                      )}>
                        <currentTab.icon className="w-10 h-10 md:w-12 md:h-12 text-white" />
                      </div>
                      
                      {/* Premium badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-3">
                        {getWelcomeMessage()}, {userProfile?.name || 'Champion'}
                      </h1>
                      <p className="text-xl md:text-2xl text-cyan-200/80 font-semibold mb-3">
                        {getMotivationalMessage()}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-emerald-500/20 backdrop-blur-xl rounded-xl border border-emerald-400/30">
                          <div className="flex items-center gap-2 text-emerald-300">
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold text-sm">Live Analytics</span>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-blue-500/20 backdrop-blur-xl rounded-xl border border-blue-400/30">
                          <div className="flex items-center gap-2 text-blue-300">
                            <Star className="w-4 h-4" />
                            <span className="font-semibold text-sm">AI Powered</span>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-purple-500/20 backdrop-blur-xl rounded-xl border border-purple-400/30">
                          <div className="flex items-center gap-2 text-purple-300">
                            <Gem className="w-4 h-4" />
                            <span className="font-semibold text-sm">Premium</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Premium status card */}
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl text-white font-bold shadow-2xl border border-gray-700/50">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-cyan-400" />
                      <div>
                        <div className="text-xs text-cyan-400">VitalitySync</div>
                        <div className="text-lg">Elite Dashboard</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Time widget */}
                  <div className="px-4 py-3 bg-black/20 backdrop-blur-xl rounded-xl border border-gray-600/30">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold text-sm">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Elite info panel */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/40 via-gray-900/60 to-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-600/30 shadow-inner">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl",
                    `bg-gradient-to-br ${currentTab?.color || 'from-slate-500 to-gray-600'}`
                  )}>
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2 flex items-center gap-3">
                      Professional Health Intelligence
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </h3>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                      {currentTab?.description} - Experience advanced health monitoring with real-time analytics, 
                      personalized insights, and professional-grade tracking tools.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Active Module</div>
                      <div className="font-bold text-lg text-white">{currentTab?.label}</div>
                    </div>
                    <Award className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="relative mb-8">
              {/* Glass morphism container */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-3xl"></div>
              
              <div className="relative p-6 md:p-8">
                <TabsList className={cn(
                  "grid w-full bg-black/40 backdrop-blur-2xl gap-3 md:gap-4 border border-white/20 shadow-2xl rounded-2xl",
                  isMobile ? "grid-cols-2 p-3" : "grid-cols-5 p-4"
                )}>
                  {tabConfig.slice(0, isMobile ? 2 : 5).map((tab) => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value} 
                      className={cn(
                        "relative flex items-center gap-3 transition-all duration-500 font-bold text-sm md:text-base overflow-hidden group border-2 border-transparent backdrop-blur-xl",
                        "hover:scale-105 hover:shadow-xl",
                        isMobile ? "p-3 rounded-xl min-h-[50px]" : "p-4 rounded-2xl min-h-[60px]",
                        activeTab === tab.value && [
                          `bg-gradient-to-br ${tab.color} text-white shadow-2xl scale-105 border-white/30`,
                          "shadow-[0_0_30px_rgba(0,0,0,0.3)]"
                        ],
                        activeTab !== tab.value && [
                          "bg-gray-800/60 text-gray-300 border-gray-600/30",
                          "hover:bg-gray-700/60 hover:text-white hover:border-gray-500/50"
                        ]
                      )}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
                      
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
                    <p className="text-lg text-gray-300 font-medium bg-gray-800/40 backdrop-blur-xl rounded-full px-6 py-3 inline-block border border-gray-600/30 shadow-lg">
                      <Flame className="w-5 h-5 inline mr-2 text-orange-400" />
                      {currentTab?.description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Premium Tab Content */}
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8">
                  <EnhancedDashboardOverview />
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8 animate-fade-in">
                <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8">
                  <AdvancedAnalytics />
                </div>
              </TabsContent>

              <TabsContent value="ai-coach" className="space-y-8 animate-fade-in">
                <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8">
                  <AIHealthCoach />
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-8 animate-fade-in">
                <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8">
                  <GoalManagement />
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-8 animate-fade-in">
                <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-8">
                  <HealthTrends />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
