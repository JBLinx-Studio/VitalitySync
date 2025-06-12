
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
      description: 'Comprehensive health dashboard with real-time insights'
    },
    {
      value: 'analytics',
      label: 'Analytics Pro',
      icon: BarChart3,
      color: 'from-blue-500 to-indigo-600',
      description: 'Advanced metrics and performance analysis'
    },
    {
      value: 'ai-coach',
      label: 'AI Coach',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      description: 'Personalized AI-powered health recommendations'
    },
    {
      value: 'goals',
      label: 'Goal Tracker',
      icon: Trophy,
      color: 'from-amber-500 to-orange-600',
      description: 'Achievement tracking and milestone management'
    },
    {
      value: 'trends',
      label: 'Health Trends',
      icon: TrendingUp,
      color: 'from-rose-500 to-pink-600',
      description: 'Long-term patterns and health evolution'
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
    <div className="min-h-screen relative">
      {/* Single background gradient - full screen */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950"></div>
      
      {/* Single glossy overlay - full screen */}
      <div className="fixed inset-0 bg-white/5 dark:bg-white/3 backdrop-blur-3xl"></div>

      {/* Subtle ambient effects */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"} className="relative z-10">
        <div className="space-y-8 md:space-y-12">
          {/* Header Section */}
          <div className="relative">
            <div className="p-8 md:p-12">
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
                    </div>
                    <div>
                      <h1 className="text-4xl md:text-6xl font-black text-white mb-3">
                        {getWelcomeMessage()}, {userProfile?.name || 'Champion'}
                      </h1>
                      <p className="text-xl md:text-2xl text-white/80 font-semibold mb-3">
                        {getMotivationalMessage()}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-xl">
                          <div className="flex items-center gap-2 text-emerald-400">
                            <Zap className="w-4 h-4" />
                            <span className="font-semibold text-sm">Live Analytics</span>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-xl">
                          <div className="flex items-center gap-2 text-blue-400">
                            <Star className="w-4 h-4" />
                            <span className="font-semibold text-sm">AI Powered</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="px-6 py-4 bg-white/10 rounded-2xl text-white font-bold shadow-2xl border border-white/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6" />
                      <div>
                        <div className="text-xs opacity-80">VitalitySync</div>
                        <div className="text-lg">Pro Dashboard</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold text-sm">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className={cn(
              "grid w-full gap-3 md:gap-4",
              isMobile ? "grid-cols-2 p-3" : "grid-cols-5 p-4"
            )}>
              {tabConfig.slice(0, isMobile ? 2 : 5).map((tab) => (
                <TabsTrigger 
                  key={tab.value} 
                  value={tab.value} 
                  className={cn(
                    "relative flex items-center gap-3 transition-all duration-500 font-bold text-sm md:text-base overflow-hidden group",
                    isMobile ? "p-3 rounded-xl min-h-[50px]" : "p-4 rounded-2xl min-h-[60px]"
                  )}
                >
                  <tab.icon className={cn("relative z-10", isMobile ? "w-5 h-5" : "w-6 h-6")} />
                  {!isMobile && <span className="relative z-10">{tab.label}</span>}
                  
                  {activeTab === tab.value && (
                    <Sparkles className="w-5 h-5 text-white/90 animate-pulse relative z-10 ml-auto" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab Content with consistent background */}
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <div className="relative bg-gradient-to-br from-slate-800/50 via-indigo-800/50 to-purple-800/50 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"></div>
                  <div className="relative p-8">
                    <EnhancedDashboardOverview />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8 animate-fade-in">
                <div className="relative bg-gradient-to-br from-slate-800/50 via-blue-800/50 to-indigo-800/50 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"></div>
                  <div className="relative p-8">
                    <AdvancedAnalytics />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-coach" className="space-y-8 animate-fade-in">
                <div className="relative bg-gradient-to-br from-slate-800/50 via-purple-800/50 to-pink-800/50 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"></div>
                  <div className="relative p-8">
                    <AIHealthCoach />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-8 animate-fade-in">
                <div className="relative bg-gradient-to-br from-slate-800/50 via-orange-800/50 to-amber-800/50 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"></div>
                  <div className="relative p-8">
                    <GoalManagement />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-8 animate-fade-in">
                <div className="relative bg-gradient-to-br from-slate-800/50 via-rose-800/50 to-pink-800/50 rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"></div>
                  <div className="relative p-8">
                    <HealthTrends />
                  </div>
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
