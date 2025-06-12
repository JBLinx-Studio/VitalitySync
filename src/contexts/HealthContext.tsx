import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { 
  UserProfile,
  DailyGoals,
  TodayData,
  ExerciseItem,
  FoodItem,
  SleepRecord,
  MoodRecord,
  AddictionRecord,
  Achievement,
  Notification,
  HealthContextType,
  WaterIntake,
  BodyMeasurement
} from '@/types/health';

// Default goals and data
const defaultDailyGoals: DailyGoals = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
  water: 2000,
  steps: 10000,
  exercise: 60,
  sleep: 8
};

const defaultTodayData: TodayData = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  water: 0,
  steps: 0,
  exercise: 0,
  sleep: 0,
  lastUpdated: new Date().toISOString()
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

interface HealthProviderProps {
  children: ReactNode;
}

export const HealthProvider: React.FC<HealthProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [dailyGoals, setDailyGoals] = useState<DailyGoals>(defaultDailyGoals);
  const [todayData, setTodayData] = useState<TodayData>(defaultTodayData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for additional features
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
  const [moodRecords, setMoodRecords] = useState<MoodRecord[]>([]);
  const [addictionRecords, setAddictionRecords] = useState<AddictionRecord[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [waterIntakes, setWaterIntakes] = useState<WaterIntake[]>([]);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('healthProfile');
      const savedGoals = localStorage.getItem('dailyGoals');
      const savedTodayData = localStorage.getItem('todayData');
      const savedExerciseItems = localStorage.getItem('exerciseItems');
      const savedFoodItems = localStorage.getItem('foodItems');
      const savedSleepRecords = localStorage.getItem('sleepRecords');
      const savedMoodRecords = localStorage.getItem('moodRecords');
      const savedAddictionRecords = localStorage.getItem('addictionRecords');
      const savedAchievements = localStorage.getItem('achievements');
      const savedNotifications = localStorage.getItem('notifications');

      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
      if (savedGoals) setDailyGoals(JSON.parse(savedGoals));
      if (savedExerciseItems) setExerciseItems(JSON.parse(savedExerciseItems));
      if (savedFoodItems) setFoodItems(JSON.parse(savedFoodItems));
      if (savedSleepRecords) setSleepRecords(JSON.parse(savedSleepRecords));
      if (savedMoodRecords) setMoodRecords(JSON.parse(savedMoodRecords));
      if (savedAddictionRecords) setAddictionRecords(JSON.parse(savedAddictionRecords));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

      if (savedTodayData) {
        const parsedData = JSON.parse(savedTodayData);
        const today = new Date().toDateString();
        const dataDate = new Date(parsedData.lastUpdated).toDateString();
        if (today === dataDate) {
          setTodayData(parsedData);
        } else {
          const resetData = { ...defaultTodayData, lastUpdated: new Date().toISOString() };
          setTodayData(resetData);
          localStorage.setItem('todayData', JSON.stringify(resetData));
        }
      }
    } catch (error) {
      console.error('Error loading health data:', error);
      setError('Failed to load health data');
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem('healthProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  }, [dailyGoals]);

  useEffect(() => {
    localStorage.setItem('todayData', JSON.stringify(todayData));
  }, [todayData]);

  useEffect(() => {
    localStorage.setItem('exerciseItems', JSON.stringify(exerciseItems));
  }, [exerciseItems]);

  useEffect(() => {
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem('sleepRecords', JSON.stringify(sleepRecords));
  }, [sleepRecords]);

  useEffect(() => {
    localStorage.setItem('moodRecords', JSON.stringify(moodRecords));
  }, [moodRecords]);

  useEffect(() => {
    localStorage.setItem('addictionRecords', JSON.stringify(addictionRecords));
  }, [addictionRecords]);

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  const updateTodayData = (updates: Partial<TodayData>) => {
    setTodayData(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Food & Nutrition methods
  const addFoodItem = (item: Omit<FoodItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setFoodItems(prev => [...prev, newItem]);
  };

  const deleteFoodItem = (id: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  const getTodaysFoodItems = () => {
    const today = new Date().toISOString().split('T')[0];
    return foodItems.filter(item => item.date === today);
  };

  const getNutritionSummary = (date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const dayFoodItems = foodItems.filter(item => item.date === targetDate);
    
    return dayFoodItems.reduce((summary, item) => ({
      calories: summary.calories + (item.calories * item.quantity),
      protein: summary.protein + (item.protein * item.quantity),
      carbs: summary.carbs + (item.carbs * item.quantity),
      fat: summary.fat + (item.fat * item.quantity),
      fiber: summary.fiber + ((item.fiber || 0) * item.quantity)
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });
  };

  // Water Intake methods
  const addWaterIntake = (amount: number) => {
    const newIntake = {
      id: Date.now().toString(),
      amount,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toISOString()
    };
    setWaterIntakes(prev => [...prev, newIntake]);
  };

  const getTodaysWaterIntake = () => {
    const today = new Date().toISOString().split('T')[0];
    return waterIntakes
      .filter(intake => intake.date === today)
      .reduce((total, intake) => total + intake.amount, 0);
  };

  // Exercise methods
  const addExerciseItem = (item: Omit<ExerciseItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setExerciseItems(prev => [...prev, newItem]);
  };

  const deleteExerciseItem = (id: string) => {
    setExerciseItems(prev => prev.filter(item => item.id !== id));
  };

  const getTodaysExerciseItems = () => {
    const today = new Date().toISOString().split('T')[0];
    return exerciseItems.filter(item => item.date === today);
  };

  const getExerciseSummary = (date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const dayExercises = exerciseItems.filter(item => item.date === targetDate);
    
    return {
      totalDuration: dayExercises.reduce((total, item) => total + item.duration, 0),
      totalCalories: dayExercises.reduce((total, item) => total + item.calories_burned, 0),
      exerciseCount: dayExercises.length
    };
  };

  // Sleep methods
  const addSleepRecord = (record: Omit<SleepRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setSleepRecords(prev => [...prev, newRecord]);
  };

  const deleteSleepRecord = (id: string) => {
    setSleepRecords(prev => prev.filter(record => record.id !== id));
  };

  const getSleepSummary = (days: number = 7) => {
    const recentRecords = sleepRecords.slice(-days);
    if (recentRecords.length === 0) {
      return { averageDuration: 0, averageQuality: 'poor', totalSleep: 0 };
    }
    
    const totalDuration = recentRecords.reduce((total, record) => total + record.duration, 0);
    const avgDuration = totalDuration / recentRecords.length;
    
    const qualityScores = { poor: 1, fair: 2, good: 3, excellent: 4 };
    const totalQuality = recentRecords.reduce((total, record) => total + qualityScores[record.quality], 0);
    const avgQualityScore = totalQuality / recentRecords.length;
    
    let averageQuality = 'poor';
    if (avgQualityScore >= 3.5) averageQuality = 'excellent';
    else if (avgQualityScore >= 2.5) averageQuality = 'good';
    else if (avgQualityScore >= 1.5) averageQuality = 'fair';
    
    return {
      averageDuration: avgDuration,
      averageQuality,
      totalSleep: totalDuration
    };
  };

  // Mood methods
  const addMoodRecord = (record: Omit<MoodRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setMoodRecords(prev => [...prev, newRecord]);
  };

  const deleteMoodRecord = (id: string) => {
    setMoodRecords(prev => prev.filter(record => record.id !== id));
  };

  const getMoodSummary = (days: number = 7) => {
    const recentRecords = moodRecords.slice(-days);
    if (recentRecords.length === 0) {
      return { averageMood: 0, averageEnergy: 0, averageStress: 0 };
    }
    
    const moodScores = { awful: 1, bad: 2, neutral: 3, good: 4, great: 5 };
    const totalMood = recentRecords.reduce((total, record) => total + moodScores[record.mood], 0);
    const totalEnergy = recentRecords.reduce((total, record) => total + record.energy, 0);
    const totalStress = recentRecords.reduce((total, record) => total + record.stress, 0);
    
    return {
      averageMood: totalMood / recentRecords.length,
      averageEnergy: totalEnergy / recentRecords.length,
      averageStress: totalStress / recentRecords.length
    };
  };

  // Addiction methods
  const addAddictionRecord = (record: Omit<AddictionRecord, 'id'>) => {
    const newRecord = { ...record, id: Date.now().toString() };
    setAddictionRecords(prev => [...prev, newRecord]);
  };

  const deleteAddictionRecord = (id: string) => {
    setAddictionRecords(prev => prev.filter(record => record.id !== id));
  };

  const getUserAddictionGoals = (): AddictionRecord[] => {
    const uniqueTypes = [...new Set(addictionRecords.map(r => r.type))];
    
    return uniqueTypes.map(type => {
      const typeRecords = addictionRecords.filter(r => r.type === type);
      const latestRecord = typeRecords[typeRecords.length - 1];
      return latestRecord;
    }).filter(record => record && record.goal);
  };

  const updateAddictionGoal = (type: string, goal: number, unit: string) => {
    // Update existing records or create a placeholder
    const existingRecords = addictionRecords.filter(r => r.type === type);
    if (existingRecords.length > 0) {
      const updatedRecords = addictionRecords.map(record => 
        record.type === type ? { ...record, goal, goalUnit: unit } : record
      );
      setAddictionRecords(updatedRecords);
    }
  };

  // Body Measurements methods
  const addBodyMeasurement = (measurement: any) => {
    const newMeasurement = { ...measurement, id: Date.now().toString() };
    setBodyMeasurements(prev => [...prev, newMeasurement]);
  };

  const getLatestMeasurement = () => {
    return bodyMeasurements.length > 0 ? bodyMeasurements[bodyMeasurements.length - 1] : null;
  };

  // Achievement methods
  const addAchievement = (achievement: Omit<Achievement, 'id'>) => {
    const newAchievement = { ...achievement, id: Date.now().toString() };
    setAchievements(prev => [...prev, newAchievement]);
  };

  // Notification methods
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now().toString() };
    setNotifications(prev => [...prev, newNotification]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  // Calculation methods
  const calculateBMI = (weight: number, height: number) => {
    const heightInM = height / 100;
    return weight / (heightInM * heightInM);
  };

  const calculateCalorieNeeds = (profile: UserProfile) => {
    let bmr: number;
    if (profile.gender === 'male') {
      bmr = 10 * (profile.weight || 70) + 6.25 * (profile.height || 175) - 5 * (profile.age || 30) + 5;
    } else {
      bmr = 10 * (profile.weight || 60) + 6.25 * (profile.height || 165) - 5 * (profile.age || 30) - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extremely_active: 1.9
    };

    return bmr * (activityMultipliers[profile.activityLevel || 'moderately_active'] || 1.55);
  };

  // Goals checking
  const checkAndUpdateGoals = () => {
    // Implementation for checking goals
  };

  const getGoalProgress = (type: string) => {
    // Implementation for goal progress
    return 0;
  };

  // Add the enhanced getHealthSummary method
  const getHealthSummary = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayFoodItems = foodItems.filter(item => item.date === today);
    const todayExercises = exerciseItems.filter(item => item.date === today);
    const recentSleep = sleepRecords.slice(-7);
    const recentMood = moodRecords.slice(-7);
    
    const todayCalories = todayFoodItems.reduce((total, item) => total + (item.calories * item.quantity), 0);
    const totalWorkouts = exerciseItems.length;
    const avgSleepHours = recentSleep.length > 0 
      ? recentSleep.reduce((total, record) => total + record.duration, 0) / recentSleep.length 
      : 0;
    
    const moodScores = { awful: 1, bad: 2, neutral: 3, good: 4, great: 5 };
    const avgMoodScore = recentMood.length > 0
      ? recentMood.reduce((total, record) => total + moodScores[record.mood], 0) / recentMood.length
      : 0;

    // Calculate weekly totals for progress tracking
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoString = weekAgo.toISOString().split('T')[0];
    
    const weeklyExercises = exerciseItems.filter(item => item.date >= weekAgoString);
    const totalDuration = weeklyExercises.reduce((total, item) => total + item.duration, 0);
    const totalCalories = weeklyExercises.reduce((total, item) => total + item.calories_burned, 0);
    const calorieGoal = userProfile?.daily_calorie_goal || userProfile?.goals?.calorieGoal || 2000;

    return {
      todayCalories: Math.round(todayCalories),
      totalWorkouts,
      avgSleepHours: Math.round(avgSleepHours * 10) / 10,
      moodScore: Math.round(avgMoodScore * 10) / 10,
      totalDuration,
      totalCalories,
      calorieGoal
    };
  };

  const value: HealthContextType = {
    userProfile,
    updateUserProfile,
    dailyGoals,
    todayData,
    foodItems,
    addFoodItem,
    deleteFoodItem,
    getTodaysFoodItems,
    getNutritionSummary,
    waterIntakes,
    addWaterIntake,
    getTodaysWaterIntake,
    exerciseItems,
    addExerciseItem,
    deleteExerciseItem,
    getTodaysExerciseItems,
    getExerciseSummary,
    sleepRecords,
    sleepItems: sleepRecords, // compatibility alias
    addSleepRecord,
    deleteSleepRecord,
    getSleepSummary,
    moodRecords,
    mentalWellnessItems: moodRecords, // compatibility alias
    addMoodRecord,
    deleteMoodRecord,
    getMoodSummary,
    addictionRecords,
    addAddictionRecord,
    deleteAddictionRecord,
    getUserAddictionGoals,
    updateAddictionGoal,
    bodyMeasurements,
    addBodyMeasurement,
    getLatestMeasurement,
    achievements,
    addAchievement,
    notifications,
    addNotification,
    markNotificationAsRead,
    getUnreadNotificationsCount,
    calculateBMI,
    calculateCalorieNeeds,
    checkAndUpdateGoals,
    getGoalProgress,
    getHealthSummary
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};
