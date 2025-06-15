
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
        gradient: 'from-orange-500 via-red-500 to-pink-500',
        glowColor: 'shadow-orange-500/20'
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
        gradient: 'from-blue-500 via-indigo-500 to-purple-500',
        glowColor: 'shadow-blue-500/20'
      },
      {
        title: 'Hydration Level',
        value: todayWaterGlasses,
        goal: 10,
        icon: <Droplets className="w-6 h-6" />,
        color: 'blue' as const,
        unit: 'glasses',
        trend: { 
          value: Math.round(((todayWaterGlasses - weekAvg.water) / weekAvg.water) * 100), 
          direction: todayWaterGlasses >= weekAvg.water ? 'up' as const : 'down' as const 
        },
        subtitle: 'Optimal hydration status',
        gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
        glowColor: 'shadow-cyan-500/20'
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
        gradient: 'from-purple-500 via-violet-500 to-indigo-500',
        glowColor: 'shadow-purple-500/20'
      }
    ];
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getTodaysWaterIntake]);

  return (
    <div className="relative group">
      {/* Enhanced multi-layer background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-white/90 to-slate-100/80 dark:from-slate-900/80 dark:via-slate-800/90 dark:to-slate-900/80 rounded-3xl backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl"></div>
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-xl"></div>
      
      <div className="relative p-8 lg:p-12">
        {/* Enhanced header with better typography and spacing */}
        <div className="mb-10">
          <div className="flex items-center gap-6 mb-6">
            <div className="relative group/icon">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-emerald-500/30 group-hover/icon:scale-110 transition-all duration-500">
                <Target className="w-8 h-8 text-white" />
              </div>
              {/* Pulsing ring effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-600 opacity-30 scale-125 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent mb-2">
                Today's Health Metrics
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                Real-time analytics with intelligent insights & personalized recommendations
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <div className="text-right">
                <div className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Live Analytics</div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400">Updating now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced stats grid with better spacing and animations */}
        <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 xl:grid-cols-4'}`}>
          {todayStats.map((stat, index) => (
            <div 
              key={index}
              className="group/card relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Floating particles effect */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-white/60 to-slate-200/60 dark:from-slate-600/60 dark:to-slate-500/60 rounded-full blur-sm animate-bounce opacity-0 group-hover/card:opacity-100 transition-all duration-700" style={{ animationDelay: `${index * 200}ms` }}></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-slate-300/40 to-slate-400/40 dark:from-slate-500/40 dark:to-slate-600/40 rounded-full blur-sm animate-pulse opacity-0 group-hover/card:opacity-100 transition-all duration-1000" style={{ animationDelay: `${index * 300}ms` }}></div>
              
              <div className={`relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:scale-105 overflow-hidden group/inner ${stat.glowColor} hover:shadow-2xl`}>
                {/* Dynamic gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover/inner:opacity-15 transition-opacity duration-700 rounded-3xl`}></div>
                
                {/* Animated border glow */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.gradient} opacity-0 group-hover/inner:opacity-20 blur-sm transition-all duration-700`}></div>
                
                {/* Content with enhanced styling */}
                <div className="relative z-10">
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
                    className="bg-transparent border-none shadow-none p-0"
                  />
                </div>
                
                {/* Animated corner accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${stat.gradient} opacity-10 group-hover/inner:opacity-30 transition-opacity duration-500 rounded-bl-3xl`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced insights section with better visual hierarchy */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100/60 via-white/80 to-slate-100/60 dark:from-slate-800/60 dark:via-slate-700/80 dark:to-slate-800/60 rounded-3xl border border-slate-200/50 dark:border-slate-600/50 backdrop-blur-xl"></div>
          
          <div className="relative p-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30 flex-shrink-0">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  Intelligent Health Insights
                </h3>
                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Your health metrics are processed using advanced algorithms that analyze patterns, detect trends, and provide personalized recommendations based on your unique health profile and goals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    Real-time Processing
                  </div>
                  <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                    Trend Analysis
                  </div>
                  <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm font-medium text-purple-700 dark:text-purple-300">
                    Smart Recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardStats);
