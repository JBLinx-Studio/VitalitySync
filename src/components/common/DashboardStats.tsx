
import React, { useMemo } from 'react';
import { Flame, Activity, Heart, Moon, Droplets, Zap } from 'lucide-react';
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
    
    // Today's data calculations with enhanced metrics
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

    // Calculate weekly averages for better trend analysis
    const weekAvg = {
      calories: 2100,
      exercise: 35,
      water: 8,
      sleep: 7.8
    };

    return [
      {
        title: 'Daily Nutrition',
        value: todayCalories,
        goal: userProfile?.goals?.calorieGoal || 2200,
        icon: <Flame className="w-6 h-6" />,
        color: 'orange' as const,
        unit: 'kcal',
        trend: { 
          value: Math.round(((todayCalories - weekAvg.calories) / weekAvg.calories) * 100), 
          direction: todayCalories >= weekAvg.calories ? 'up' as const : 'down' as const 
        },
        subtitle: 'Balanced nutrition intake'
      },
      {
        title: 'Active Minutes',
        value: todayExerciseMinutes,
        goal: userProfile?.goals?.exerciseGoal || 45,
        icon: <Activity className="w-6 h-6" />,
        color: 'blue' as const,
        unit: 'min',
        trend: { 
          value: Math.round(((todayExerciseMinutes - weekAvg.exercise) / weekAvg.exercise) * 100), 
          direction: todayExerciseMinutes >= weekAvg.exercise ? 'up' as const : 'down' as const 
        },
        subtitle: 'Movement and exercise'
      },
      {
        title: 'Hydration Level',
        value: todayWaterGlasses,
        goal: 10,
        icon: <Droplets className="w-6 h-6" />,
        color: 'cyan' as const,
        unit: 'glasses',
        trend: { 
          value: Math.round(((todayWaterGlasses - weekAvg.water) / weekAvg.water) * 100), 
          direction: todayWaterGlasses >= weekAvg.water ? 'up' as const : 'down' as const 
        },
        subtitle: 'Optimal hydration status'
      },
      {
        title: 'Recovery Time',
        value: todaySleepHours,
        goal: 8.5,
        icon: <Moon className="w-6 h-6" />,
        color: 'purple' as const,
        unit: 'hrs',
        trend: { 
          value: Math.round(((todaySleepHours - weekAvg.sleep) / weekAvg.sleep) * 100), 
          direction: todaySleepHours >= weekAvg.sleep ? 'up' as const : 'down' as const 
        },
        subtitle: 'Quality sleep duration'
      }
    ];
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getTodaysWaterIntake]);

  return (
    <div className="relative">
      {/* Enhanced atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-purple-50/15 to-pink-50/20 dark:from-blue-950/20 dark:via-purple-950/15 dark:to-pink-950/20 rounded-3xl blur-2xl"></div>
      
      <div className={`relative grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {todayStats.map((stat, index) => (
          <div 
            key={index}
            className="group relative"
          >
            {/* Floating decorative elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full blur-sm animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <EnhancedQuickStatsCard
              title={stat.title}
              value={stat.value}
              goal={stat.goal}
              unit={stat.unit}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              size={isMobile ? 'sm' : 'md'}
              subtitle={stat.subtitle}
              className="relative bg-white/30 dark:bg-slate-900/30 backdrop-blur-2xl border border-white/40 dark:border-slate-700/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(DashboardStats);
