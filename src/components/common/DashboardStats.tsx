
import React, { useMemo } from 'react';
import { Flame, Activity, Heart, Moon } from 'lucide-react';
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
        title: 'Calories Today',
        value: todayCalories,
        goal: userProfile?.goals?.calorieGoal || 2000,
        icon: <Flame className="w-6 h-6" />,
        color: 'orange' as const,
        unit: 'kcal',
        trend: { value: 5, direction: 'up' as const }
      },
      {
        title: 'Exercise Minutes',
        value: todayExerciseMinutes,
        goal: userProfile?.goals?.exerciseGoal || 30,
        icon: <Activity className="w-6 h-6" />,
        color: 'blue' as const,
        unit: 'min',
        trend: { value: 12, direction: 'up' as const }
      },
      {
        title: 'Water Intake',
        value: todayWaterGlasses,
        goal: 8,
        icon: <Heart className="w-6 h-6" />,
        color: 'blue' as const,
        unit: 'glasses',
        trend: { value: 8, direction: 'up' as const }
      },
      {
        title: 'Sleep Hours',
        value: todaySleepHours,
        goal: 8,
        icon: <Moon className="w-6 h-6" />,
        color: 'purple' as const,
        unit: 'hrs'
      }
    ];
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getTodaysWaterIntake]);

  return (
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
  );
};

export default React.memo(DashboardStats);
