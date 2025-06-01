
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  gender: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  goals: {
    weightGoal: number;
    targetDate?: string;
    primaryGoal: 'lose_weight' | 'gain_weight' | 'maintain_weight' | 'build_muscle' | 'improve_fitness';
  };
  preferences: {
    units: 'metric' | 'imperial';
    notifications: boolean;
    privacy: 'public' | 'friends' | 'private';
  };
  createdAt?: string;
  avatar?: string;
}

export interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number; // in ml
  steps: number;
  exercise: number; // in minutes
  sleep: number; // in hours
}

export interface TodayData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
  steps: number;
  exercise: number;
  sleep: number;
  lastUpdated: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  duration: number;
  caloriesBurned: number;
  date: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export interface SleepRecord {
  id: string;
  date: string;
  bedtime: string;
  wakeTime: string;
  quality: number;
  duration: number;
}

export interface MoodRecord {
  id: string;
  date: string;
  mood: number;
  energy: number;
  stress: number;
  notes?: string;
}

export interface AddictionRecord {
  id: string;
  type: string;
  amount: number;
  craving: number;
  date: string;
  notes?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: string;
  date: string;
}

export interface Notification {
  id: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}

export interface AddictionGoal {
  daily: number;
  target: number;
  timeframe: number;
}

export interface HealthContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  dailyGoals: DailyGoals;
  setDailyGoals: (goals: DailyGoals) => void;
  todayData: TodayData;
  setTodayData: (data: TodayData) => void;
  updateTodayData: (updates: Partial<TodayData>) => void;
  isLoading: boolean;
  error: string | null;
  
  // Exercise related
  exerciseItems: ExerciseItem[];
  addExerciseItem: (item: ExerciseItem) => void;
  getTodaysExerciseItems: () => ExerciseItem[];
  getExerciseSummary: () => { totalDuration: number; totalCaloriesBurned: number };
  
  // Food related
  foodItems: FoodItem[];
  addFoodItem: (item: FoodItem) => void;
  
  // Sleep related
  sleepRecords: SleepRecord[];
  addSleepRecord: (record: SleepRecord) => void;
  getSleepSummary: () => { averageDuration: number; averageQuality: number };
  
  // Mood related
  moodRecords: MoodRecord[];
  addMoodRecord: (record: MoodRecord) => void;
  getMoodSummary: () => { averageMood: number; averageEnergy: number; averageStress: number };
  
  // Addiction related
  addictionRecords: AddictionRecord[];
  addAddictionRecord: (record: AddictionRecord) => void;
  getUserAddictionGoals: () => { [key: string]: AddictionGoal };
  updateAddictionGoal: (type: string, goal: AddictionGoal) => void;
  
  // Achievements
  achievements: Achievement[];
  addAchievement: (achievement: Achievement) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  getUnreadNotificationsCount: () => number;
  
  // Calculations
  calculateBMI: () => number | null;
  calculateCalorieNeeds: () => number | null;
}

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
  
  // New state for additional features
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
  const [moodRecords, setMoodRecords] = useState<MoodRecord[]>([]);
  const [addictionRecords, setAddictionRecords] = useState<AddictionRecord[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [addictionGoals, setAddictionGoals] = useState<{ [key: string]: AddictionGoal }>({});

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
      const savedAddictionGoals = localStorage.getItem('addictionGoals');

      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
      if (savedGoals) setDailyGoals(JSON.parse(savedGoals));
      if (savedExerciseItems) setExerciseItems(JSON.parse(savedExerciseItems));
      if (savedFoodItems) setFoodItems(JSON.parse(savedFoodItems));
      if (savedSleepRecords) setSleepRecords(JSON.parse(savedSleepRecords));
      if (savedMoodRecords) setMoodRecords(JSON.parse(savedMoodRecords));
      if (savedAddictionRecords) setAddictionRecords(JSON.parse(savedAddictionRecords));
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements));
      if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
      if (savedAddictionGoals) setAddictionGoals(JSON.parse(savedAddictionGoals));

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

  useEffect(() => {
    localStorage.setItem('addictionGoals', JSON.stringify(addictionGoals));
  }, [addictionGoals]);

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

  // Exercise methods
  const addExerciseItem = (item: ExerciseItem) => {
    setExerciseItems(prev => [...prev, item]);
  };

  const getTodaysExerciseItems = () => {
    const today = new Date().toISOString().split('T')[0];
    return exerciseItems.filter(item => item.date === today);
  };

  const getExerciseSummary = () => {
    const todaysItems = getTodaysExerciseItems();
    return {
      totalDuration: todaysItems.reduce((total, item) => total + item.duration, 0),
      totalCaloriesBurned: todaysItems.reduce((total, item) => total + item.caloriesBurned, 0)
    };
  };

  // Food methods
  const addFoodItem = (item: FoodItem) => {
    setFoodItems(prev => [...prev, item]);
  };

  // Sleep methods
  const addSleepRecord = (record: SleepRecord) => {
    setSleepRecords(prev => [...prev, record]);
  };

  const getSleepSummary = () => {
    if (sleepRecords.length === 0) {
      return { averageDuration: 0, averageQuality: 0 };
    }
    const totalDuration = sleepRecords.reduce((total, record) => total + record.duration, 0);
    const totalQuality = sleepRecords.reduce((total, record) => total + record.quality, 0);
    return {
      averageDuration: totalDuration / sleepRecords.length,
      averageQuality: totalQuality / sleepRecords.length
    };
  };

  // Mood methods
  const addMoodRecord = (record: MoodRecord) => {
    setMoodRecords(prev => [...prev, record]);
  };

  const getMoodSummary = () => {
    if (moodRecords.length === 0) {
      return { averageMood: 0, averageEnergy: 0, averageStress: 0 };
    }
    const totalMood = moodRecords.reduce((total, record) => total + record.mood, 0);
    const totalEnergy = moodRecords.reduce((total, record) => total + record.energy, 0);
    const totalStress = moodRecords.reduce((total, record) => total + record.stress, 0);
    return {
      averageMood: totalMood / moodRecords.length,
      averageEnergy: totalEnergy / moodRecords.length,
      averageStress: totalStress / moodRecords.length
    };
  };

  // Addiction methods
  const addAddictionRecord = (record: AddictionRecord) => {
    setAddictionRecords(prev => [...prev, record]);
  };

  const getUserAddictionGoals = () => {
    return addictionGoals;
  };

  const updateAddictionGoal = (type: string, goal: AddictionGoal) => {
    setAddictionGoals(prev => ({ ...prev, [type]: goal }));
  };

  // Achievement methods
  const addAchievement = (achievement: Achievement) => {
    setAchievements(prev => [...prev, achievement]);
  };

  // Notification methods
  const addNotification = (notification: Notification) => {
    setNotifications(prev => [...prev, notification]);
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
  const calculateBMI = () => {
    if (!userProfile) return null;
    const heightInM = userProfile.height / 100;
    return userProfile.weight / (heightInM * heightInM);
  };

  const calculateCalorieNeeds = () => {
    if (!userProfile) return null;
    
    let bmr: number;
    if (userProfile.gender === 'male') {
      bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
    } else {
      bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    return bmr * activityMultipliers[userProfile.activityLevel];
  };

  // Calculate daily goals based on user profile
  useEffect(() => {
    if (userProfile) {
      const calories = calculateCalorieNeeds();
      if (calories) {
        let adjustedCalories = calories;
        if (userProfile.goals.primaryGoal === 'lose_weight') {
          adjustedCalories = calories - 500;
        } else if (userProfile.goals.primaryGoal === 'gain_weight' || userProfile.goals.primaryGoal === 'build_muscle') {
          adjustedCalories = calories + 300;
        }

        const protein = Math.round((adjustedCalories * 0.30) / 4);
        const carbs = Math.round((adjustedCalories * 0.40) / 4);
        const fat = Math.round((adjustedCalories * 0.30) / 9);

        setDailyGoals({
          calories: Math.round(adjustedCalories),
          protein,
          carbs,
          fat,
          water: userProfile.weight * 35,
          steps: 10000,
          exercise: 60,
          sleep: 8
        });
      }
    }
  }, [userProfile]);

  const value: HealthContextType = {
    userProfile,
    setUserProfile,
    updateUserProfile,
    dailyGoals,
    setDailyGoals,
    todayData,
    setTodayData,
    updateTodayData,
    isLoading,
    error,
    exerciseItems,
    addExerciseItem,
    getTodaysExerciseItems,
    getExerciseSummary,
    foodItems,
    addFoodItem,
    sleepRecords,
    addSleepRecord,
    getSleepSummary,
    moodRecords,
    addMoodRecord,
    getMoodSummary,
    addictionRecords,
    addAddictionRecord,
    getUserAddictionGoals,
    updateAddictionGoal,
    achievements,
    addAchievement,
    notifications,
    addNotification,
    markNotificationAsRead,
    getUnreadNotificationsCount,
    calculateBMI,
    calculateCalorieNeeds
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};
