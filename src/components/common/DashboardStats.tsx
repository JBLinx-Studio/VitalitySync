
import React, { useMemo } from 'react';
import { Flame, Activity, Heart, Moon, Droplets, Target, TrendingUp } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import EnhancedQuickStatsCard from './EnhancedQuickStatsCard';
import { useViewport } from '@/hooks';

const DashboardStats: React.FC = () => {
  const { 
    userProfile, 
    foodItems, 
    exerciseItems, 
    sleepRecords, 
    moodRecords,
    getTodaysWaterIntake
  } = useHealth();
  const { isMobile } = useViewport();

  const todayStats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Today's data calculations
    const todayFood = foodItems.filter(item => item.date === today);
    const todayExercise = exerciseItems.filter(item => item.date === today);
    const todaySleep = sleepRecords.filter(item => item.date === today);
    const todayMood = moodRecords.filter(item => item.date === today);
    const todayWater = getTodaysWaterIntake();

    const todayCalories = todayFood.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    const todayExerciseMinutes = todayExercise.reduce((sum, item) => sum + item.duration, 0);
    const todaySleepHours = todaySleep.length > 0 ? todaySleep[0].duration : 0;
    const todayMoodScore = todayMood.length > 0 ? (todayMood[0] as any).mood_score || 0 : 0;
    const todayWaterGlasses = Math.round(todayWater / 250);

    return [
      {
        title: 'Daily Calories',
        value: todayCalories,
        goal: userProfile?.goals?.calorieGoal || 2000,
        icon: <Flame className="w-7 h-7" />,
        color: 'orange' as const,
        unit: 'kcal',
        trend: { value: 5, direction: 'up' as const },
        gradient: 'from-orange-500 to-red-600'
      },
      {
        title: 'Active Minutes',
        value: todayExerciseMinutes,
        goal: userProfile?.goals?.exerciseGoal || 30,
        icon: <Activity className="w-7 h-7" />,
        color: 'emerald' as const,
        unit: 'min',
        trend: { value: 12, direction: 'up' as const },
        gradient: 'from-emerald-500 to-teal-600'
      },
      {
        title: 'Hydration',
        value: todayWaterGlasses,
        goal: 8,
        icon: <Droplets className="w-7 h-7" />,
        color: 'cyan' as const,
        unit: 'glasses',
        trend: { value: 8, direction: 'up' as const },
        gradient: 'from-cyan-500 to-blue-600'
      },
      {
        title: 'Sleep Quality',
        value: todaySleepHours,
        goal: 8,
        icon: <Moon className="w-7 h-7" />,
        color: 'purple' as const,
        unit: 'hrs',
        gradient: 'from-purple-500 to-indigo-600'
      }
    ];
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getTodaysWaterIntake]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Today's Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your daily health metrics
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
          <Target className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Daily Goals
          </span>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {todayStats.map((stat, index) => (
          <div
            key={index}
            className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-all duration-500`}></div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                      +{stat.trend.value}%
                    </span>
                  </div>
                )}
              </div>

              {/* Value */}
              <div className="mb-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
                  {stat.title}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">Progress</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {Math.round((stat.value / stat.goal) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${Math.min((stat.value / stat.goal) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>0</span>
                  <span>Goal: {stat.goal} {stat.unit}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DashboardStats);
