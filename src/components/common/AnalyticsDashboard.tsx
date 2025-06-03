import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award,
  Calendar,
  BarChart3,
  Activity,
  Apple,
  Moon,
  Brain
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import EnhancedQuickStatsCard from './EnhancedQuickStatsCard';

const AnalyticsDashboard: React.FC = () => {
  const { 
    userProfile, 
    exerciseItems, 
    foodItems, 
    sleepRecords, 
    moodRecords,
    getHealthSummary 
  } = useHealth();
  const { isMobile } = useViewport();
  const healthSummary = getHealthSummary();

  // Calculate streaks and trends
  const calculateStreaks = () => {
    const today = new Date();
    const dates = [];
    
    // Get last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }

    const exerciseStreak = dates.filter(date => 
      exerciseItems.some(item => item.date === date)
    ).length;

    const foodStreak = dates.filter(date => 
      foodItems.some(item => item.date === date)
    ).length;

    const sleepStreak = dates.filter(date => 
      sleepRecords.some(item => item.date === date)
    ).length;

    return { exerciseStreak, foodStreak, sleepStreak };
  };

  const { exerciseStreak, foodStreak, sleepStreak } = calculateStreaks();

  // Calculate weekly progress
  const weeklyProgress = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoString = weekAgo.toISOString().split('T')[0];

    const weeklyExercises = exerciseItems.filter(item => item.date >= weekAgoString);
    const weeklyMinutes = weeklyExercises.reduce((total, item) => total + item.duration, 0);
    
    const weeklyCaloriesBurned = weeklyExercises.reduce((total, item) => total + item.calories_burned, 0);
    
    const avgSleep = sleepRecords
      .filter(item => item.date >= weekAgoString)
      .reduce((total, item, _, arr) => total + item.duration / arr.length, 0);

    return {
      weeklyMinutes,
      weeklyCaloriesBurned,
      avgSleep: avgSleep || 0
    };
  };

  const weeklyStats = weeklyProgress();

  const analyticsCards = [
    {
      title: 'Exercise Minutes',
      value: weeklyStats.weeklyMinutes,
      goal: (userProfile?.daily_exercise_goal || 30) * 7,
      icon: <Activity className="w-6 h-6" />,
      color: 'orange' as const,
      unit: 'min',
      trend: { value: 12, direction: 'up' as const }
    },
    {
      title: 'Calories Burned',
      value: weeklyStats.weeklyCaloriesBurned,
      goal: 2000,
      icon: <Target className="w-6 h-6" />,
      color: 'red' as const,
      unit: 'cal',
      trend: { value: 8, direction: 'up' as const }
    },
    {
      title: 'Avg Sleep',
      value: weeklyStats.avgSleep,
      goal: 8,
      icon: <Moon className="w-6 h-6" />,
      color: 'purple' as const,
      unit: 'hrs',
      trend: { value: 5, direction: 'down' as const }
    },
    {
      title: 'Mood Score',
      value: healthSummary.moodScore,
      goal: 10,
      icon: <Brain className="w-6 h-6" />,
      color: 'pink' as const,
      unit: '/10',
      trend: { value: 15, direction: 'up' as const }
    }
  ];

  const achievements = [
    { 
      title: 'Exercise Streak', 
      value: exerciseStreak, 
      max: 30, 
      icon: Activity,
      description: 'Days with exercise logged',
      level: exerciseStreak >= 7 ? 'gold' : exerciseStreak >= 3 ? 'silver' : 'bronze'
    },
    { 
      title: 'Food Tracking', 
      value: foodStreak, 
      max: 30, 
      icon: Apple,
      description: 'Days with meals logged',
      level: foodStreak >= 7 ? 'gold' : foodStreak >= 3 ? 'silver' : 'bronze'
    },
    { 
      title: 'Sleep Logging', 
      value: sleepStreak, 
      max: 30, 
      icon: Moon,
      description: 'Days with sleep tracked',
      level: sleepStreak >= 7 ? 'gold' : sleepStreak >= 3 ? 'silver' : 'bronze'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40';
      case 'silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/40';
      case 'bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/40';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Weekly Analytics */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-emerald-900/20 border-emerald-200 dark:border-emerald-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            Weekly Analytics
            <Badge variant="secondary" className="ml-auto">
              Last 7 Days
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {analyticsCards.map((card, index) => (
              <EnhancedQuickStatsCard
                key={index}
                title={card.title}
                value={card.value}
                goal={card.goal}
                unit={card.unit}
                icon={card.icon}
                color={card.color}
                trend={card.trend}
                size={isMobile ? 'sm' : 'md'}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Streaks */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Achievements & Streaks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                      <achievement.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{achievement.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getLevelColor(achievement.level)}>
                      {achievement.level}
                    </Badge>
                    <p className="text-sm font-medium mt-1">
                      {achievement.value} days
                    </p>
                  </div>
                </div>
                <Progress 
                  value={(achievement.value / achievement.max) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Current streak</span>
                  <span>{achievement.value} / {achievement.max} days</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals Overview */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Goals Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Weekly Exercise Goal
              </h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Progress this week</span>
                <span className="font-medium">
                  {Math.round((weeklyStats.weeklyMinutes / ((userProfile?.daily_exercise_goal || 30) * 7)) * 100)}%
                </span>
              </div>
              <Progress 
                value={Math.min((weeklyStats.weeklyMinutes / ((userProfile?.daily_exercise_goal || 30) * 7)) * 100, 100)} 
                className="h-3"
              />
              <p className="text-xs text-green-700 dark:text-green-300 mt-2">
                {weeklyStats.weeklyMinutes} / {(userProfile?.daily_exercise_goal || 30) * 7} minutes completed
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Consistency Score
              </h4>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Weekly consistency</span>
                <span className="font-medium">
                  {Math.round(((exerciseStreak + foodStreak + sleepStreak) / 21) * 100)}%
                </span>
              </div>
              <Progress 
                value={((exerciseStreak + foodStreak + sleepStreak) / 21) * 100} 
                className="h-3"
              />
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-2">
                Based on exercise, food, and sleep tracking consistency
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
