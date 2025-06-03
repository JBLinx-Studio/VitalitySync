
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  BarChart3, 
  Calendar, 
  Flame, 
  Heart, 
  Moon, 
  Target, 
  TrendingUp, 
  Zap,
  Award,
  Clock,
  Plus,
  Brain
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/glass-card';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import { Badge } from '@/components/ui/badge';
import { EnhancedQuickStatsCard } from '@/components/common/EnhancedQuickStatsCard';
import QuickActionsPanel from '@/components/common/QuickActionsPanel';
import AnalyticsDashboard from '@/components/common/AnalyticsDashboard';

const Dashboard: React.FC = () => {
  const { 
    userProfile, 
    foodItems, 
    exerciseItems, 
    sleepRecords, 
    moodRecords,
    getHealthSummary,
    getTodaysWaterIntake
  } = useHealth();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'actions'>('overview');

  // Enhanced health summary with more detailed analytics
  const healthSummary = useMemo(() => {
    const summary = getHealthSummary();
    const today = new Date().toISOString().split('T')[0];
    
    // Today's data
    const todayFood = foodItems.filter(item => item.date === today);
    const todayExercise = exerciseItems.filter(item => item.date === today);
    const todaySleep = sleepRecords.filter(item => item.date === today);
    const todayMood = moodRecords.filter(item => item.date === today);
    const todayWater = getTodaysWaterIntake();

    return {
      ...summary,
      todayCalories: todayFood.reduce((sum, item) => sum + (item.calories * item.quantity), 0),
      todayExerciseMinutes: todayExercise.reduce((sum, item) => sum + item.duration, 0),
      todaySleepHours: todaySleep.length > 0 ? todaySleep[0].duration : 0,
      todayMoodScore: todayMood.length > 0 ? (todayMood[0] as any).mood_score || 0 : 0,
      todayWaterGlasses: Math.round(todayWater / 250), // Convert ml to glasses
      calorieGoal: userProfile?.daily_calorie_goal || 2000,
      exerciseGoal: userProfile?.daily_exercise_goal || 30,
      waterGoal: userProfile?.daily_water_goal || 8
    };
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getHealthSummary, getTodaysWaterIntake]);

  const todayStats = [
    {
      title: 'Calories Today',
      value: healthSummary.todayCalories,
      goal: healthSummary.calorieGoal,
      icon: <Flame className="w-6 h-6" />,
      color: 'orange' as const,
      unit: 'kcal',
      trend: { value: 5, direction: 'up' as const }
    },
    {
      title: 'Exercise Minutes',
      value: healthSummary.todayExerciseMinutes,
      goal: healthSummary.exerciseGoal,
      icon: <Activity className="w-6 h-6" />,
      color: 'blue' as const,
      unit: 'min',
      trend: { value: 12, direction: 'up' as const }
    },
    {
      title: 'Water Intake',
      value: healthSummary.todayWaterGlasses,
      goal: healthSummary.waterGoal,
      icon: <Heart className="w-6 h-6" />,
      color: 'blue' as const,
      unit: 'glasses',
      trend: { value: 8, direction: 'up' as const }
    },
    {
      title: 'Sleep Hours',
      value: healthSummary.todaySleepHours,
      goal: 8,
      icon: <Moon className="w-6 h-6" />,
      color: 'purple' as const,
      unit: 'hrs'
    }
  ];

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
          <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="w-full">
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
              <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                {todayStats.map((stat, index) => (
                  <EnhancedQuickStatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    goal={stat.goal}
                    unit={stat.unit}
                    icon={stat.icon}
                    color={stat.color}
                    trend={stat.trend}
                    size={isMobile ? 'sm' : 'md'}
                  />
                ))}
              </div>

              {/* Recent Activity */}
              <GlassCard variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Recent Activity
                    <Badge variant="outline" className="ml-auto">
                      Latest
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[...foodItems, ...exerciseItems, ...sleepRecords]
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .slice(0, 6)
                      .map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-colors">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
                            {(item as any).name ? <Flame className="w-4 h-4" /> : 
                             (item as any).duration ? <Activity className="w-4 h-4" /> :
                             <Moon className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {(item as any).name || (item as any).exercise_type || 'Sleep tracked'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString()} • {
                                (item as any).calories ? `${(item as any).calories} cal` :
                                (item as any).calories_burned ? `${(item as any).calories_burned} cal burned` :
                                (item as any).duration ? `${(item as any).duration} min` : 'Logged'
                              }
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {(item as any).meal_type || (item as any).type || 'sleep'}
                          </Badge>
                        </div>
                      ))}
                    {[...foodItems, ...exerciseItems, ...sleepRecords].length === 0 && (
                      <div className="text-center py-8">
                        <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          No recent activity. Start tracking your health journey!
                        </p>
                        <Button
                          onClick={() => setActiveTab('actions')}
                          className="bg-gradient-to-r from-blue-500 to-purple-500"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Get Started
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </GlassCard>
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
