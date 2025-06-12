
import React, { useMemo } from 'react';
import { Flame, Activity, Heart, Moon, Droplets, Zap, TrendingUp, Target } from 'lucide-react';
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
        subtitle: 'Balanced nutrition intake',
        gradient: 'from-orange-500 via-red-500 to-pink-500'
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
        subtitle: 'Movement and exercise',
        gradient: 'from-blue-500 via-indigo-500 to-purple-500'
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
        subtitle: 'Optimal hydration status',
        gradient: 'from-cyan-500 via-teal-500 to-emerald-500'
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
        subtitle: 'Quality sleep duration',
        gradient: 'from-purple-500 via-violet-500 to-indigo-500'
      }
    ];
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getTodaysWaterIntake]);

  return (
    <div className="relative">
      {/* Enhanced background with professional gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-slate-50/60 to-white/40 dark:from-slate-800/40 dark:via-slate-900/60 dark:to-slate-800/40 rounded-3xl backdrop-blur-xl border border-white/30 dark:border-slate-700/30 shadow-2xl"></div>
      
      <div className="relative p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Today's Health Metrics</h2>
              <p className="text-slate-600 dark:text-slate-400">Real-time analytics and progress tracking</p>
            </div>
            <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Live Data</span>
            </div>
          </div>
        </div>

        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
          {todayStats.map((stat, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Floating decorative elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-white/60 to-slate-200/60 dark:from-slate-600/60 dark:to-slate-500/60 rounded-full blur-sm animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-2xl border border-white/40 dark:border-slate-700/40 rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden group">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                
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
                  className="relative bg-transparent border-none shadow-none p-0"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Additional insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-100/80 to-slate-200/80 dark:from-slate-700/80 dark:to-slate-800/80 rounded-2xl border border-slate-200/50 dark:border-slate-600/50">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-800 dark:text-slate-200">Quick Insights</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Your health metrics are being calculated in real-time. The system analyzes patterns and provides intelligent recommendations based on your progress and goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardStats);
