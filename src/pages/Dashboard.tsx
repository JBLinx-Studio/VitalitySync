
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  Apple, 
  Brain, 
  Calendar, 
  Flame, 
  Heart, 
  Moon, 
  Target, 
  TrendingUp, 
  Utensils,
  Zap,
  Award,
  Clock,
  BarChart3,
  Plus
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/glass-card';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import { Badge } from '@/components/ui/badge';

const Dashboard: React.FC = () => {
  const { 
    userProfile, 
    foodItems, 
    exerciseItems, 
    sleepItems, 
    mentalWellnessItems,
    getHealthSummary 
  } = useHealth();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  // Enhanced health summary with more detailed analytics
  const healthSummary = useMemo(() => {
    const summary = getHealthSummary();
    const today = new Date().toISOString().split('T')[0];
    
    // Today's data
    const todayFood = foodItems.filter(item => item.date === today);
    const todayExercise = exerciseItems.filter(item => item.date === today);
    const todaySleep = sleepItems.filter(item => item.date === today);
    const todayMood = mentalWellnessItems.filter(item => item.date === today);

    // Calculate streaks
    const calculateStreak = (items: any[], dateField = 'date') => {
      const dates = [...new Set(items.map(item => item[dateField]))].sort();
      let streak = 0;
      let currentDate = new Date();
      
      for (let i = dates.length - 1; i >= 0; i--) {
        const itemDate = new Date(dates[i]);
        const daysDiff = Math.floor((currentDate.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff === streak) {
          streak++;
          currentDate = itemDate;
        } else {
          break;
        }
      }
      return streak;
    };

    return {
      ...summary,
      todayCalories: todayFood.reduce((sum, item) => sum + item.calories, 0),
      todayExerciseMinutes: todayExercise.reduce((sum, item) => sum + item.duration, 0),
      todaySleepHours: todaySleep.length > 0 ? todaySleep[0].duration : 0,
      todayMoodScore: todayMood.length > 0 ? todayMood[0].mood_score : 0,
      exerciseStreak: calculateStreak(exerciseItems),
      foodStreak: calculateStreak(foodItems),
      sleepStreak: calculateStreak(sleepItems),
      calorieGoal: userProfile?.daily_calorie_goal || 2000,
      exerciseGoal: userProfile?.daily_exercise_goal || 30,
      waterGoal: userProfile?.daily_water_goal || 8,
      weeklyProgress: {
        exercise: Math.min((summary.totalDuration / 150) * 100, 100), // WHO recommends 150min/week
        calories: Math.min((summary.totalCalories / (summary.calorieGoal * 7)) * 100, 100)
      }
    };
  }, [foodItems, exerciseItems, sleepItems, mentalWellnessItems, userProfile, getHealthSummary]);

  const quickActions = [
    {
      title: 'Log Meal',
      description: 'Track your nutrition',
      icon: <Utensils className="w-5 h-5" />,
      path: '/food',
      color: 'from-green-500 to-emerald-600',
      count: healthSummary.todayCalories
    },
    {
      title: 'Add Exercise',
      description: 'Record workout',
      icon: <Activity className="w-5 h-5" />,
      path: '/exercise',
      color: 'from-orange-500 to-red-600',
      count: healthSummary.todayExerciseMinutes
    },
    {
      title: 'Log Sleep',
      description: 'Track rest quality',
      icon: <Moon className="w-5 h-5" />,
      path: '/sleep',
      color: 'from-purple-500 to-indigo-600',
      count: healthSummary.todaySleepHours
    },
    {
      title: 'Mood Check',
      description: 'Mental wellness',
      icon: <Brain className="w-5 h-5" />,
      path: '/mental',
      color: 'from-pink-500 to-purple-600',
      count: healthSummary.todayMoodScore
    }
  ];

  const achievements = [
    { title: 'Exercise Streak', value: healthSummary.exerciseStreak, max: 30, icon: Activity },
    { title: 'Food Logging', value: healthSummary.foodStreak, max: 30, icon: Apple },
    { title: 'Sleep Tracking', value: healthSummary.sleepStreak, max: 30, icon: Moon }
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
              Here's your health overview for today
            </p>
          </div>

          {/* Quick Stats Overview */}
          <div className={`grid gap-4 md:gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {[
              {
                title: 'Calories Today',
                value: healthSummary.todayCalories,
                goal: healthSummary.calorieGoal,
                icon: <Flame className="w-6 h-6 text-orange-500" />,
                color: 'orange',
                unit: 'kcal'
              },
              {
                title: 'Exercise Minutes',
                value: healthSummary.todayExerciseMinutes,
                goal: healthSummary.exerciseGoal,
                icon: <Activity className="w-6 h-6 text-blue-500" />,
                color: 'blue',
                unit: 'min'
              },
              {
                title: 'Sleep Hours',
                value: healthSummary.todaySleepHours,
                goal: 8,
                icon: <Moon className="w-6 h-6 text-purple-500" />,
                color: 'purple',
                unit: 'hrs'
              },
              {
                title: 'Mood Score',
                value: healthSummary.todayMoodScore,
                goal: 10,
                icon: <Brain className="w-6 h-6 text-pink-500" />,
                color: 'pink',
                unit: '/10'
              }
            ].map((stat, index) => (
              <GlassCard key={index} variant="premium" size={isMobile ? "sm" : "md"}>
                <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
                  <div className="flex items-center justify-between mb-3">
                    {stat.icon}
                    <Badge variant="outline" className="text-xs">
                      {Math.round((stat.value / stat.goal) * 100)}%
                    </Badge>
                  </div>
                  <div>
                    <p className={`font-bold text-${stat.color}-600 dark:text-${stat.color}-400 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
                      {stat.value}{stat.unit}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Goal: {stat.goal}{stat.unit}
                    </p>
                    <Progress 
                      value={Math.min((stat.value / stat.goal) * 100, 100)} 
                      className="mt-2 h-2"
                    />
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>

          {/* Quick Actions */}
          <GlassCard variant="premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => navigate(action.path)}
                    variant="ghost"
                    className={`h-auto p-4 flex flex-col items-center gap-3 bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-300 text-white border-0 shadow-lg`}
                  >
                    <div className="p-2 bg-white/20 rounded-xl">
                      {action.icon}
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-sm">{action.title}</p>
                      <p className="text-xs opacity-90">{action.description}</p>
                      {action.count > 0 && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {action.count} today
                        </Badge>
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </GlassCard>

          {/* Achievements & Streaks */}
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <GlassCard variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  Achievements & Streaks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <achievement.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="font-medium">{achievement.title}</span>
                      </div>
                      <Badge variant={achievement.value >= 7 ? "default" : "secondary"}>
                        {achievement.value} days
                      </Badge>
                    </div>
                    <Progress value={(achievement.value / achievement.max) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </GlassCard>

            <GlassCard variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Exercise Goal</span>
                    <span className="text-sm text-gray-500">
                      {Math.round(healthSummary.weeklyProgress.exercise)}%
                    </span>
                  </div>
                  <Progress value={healthSummary.weeklyProgress.exercise} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    150 minutes recommended per week
                  </p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Nutrition Tracking</span>
                    <span className="text-sm text-gray-500">
                      {foodItems.length > 0 ? '✅' : '⏳'}
                    </span>
                  </div>
                  <Progress value={foodItems.length > 0 ? 100 : 0} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    Keep logging your meals daily
                  </p>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Recent Activity */}
          <GlassCard variant="premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...foodItems, ...exerciseItems, ...sleepItems]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                        {(item as any).name ? <Utensils className="w-4 h-4 text-blue-600" /> : 
                         (item as any).duration ? <Activity className="w-4 h-4 text-orange-600" /> :
                         <Moon className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">
                          {(item as any).name || (item as any).exercise_type || 'Sleep tracked'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {(item as any).calories || (item as any).calories_burned || 
                         `${(item as any).duration}min` || 'Logged'}
                      </Badge>
                    </div>
                  ))}
                {[...foodItems, ...exerciseItems, ...sleepItems].length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No recent activity. Start tracking your health journey!
                    </p>
                    <Button
                      onClick={() => navigate('/food')}
                      className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </GlassCard>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
