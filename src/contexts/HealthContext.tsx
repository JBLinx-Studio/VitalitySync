import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  goal: string;
  activityLevel: string;
}

export interface NutritionItem {
  id: string;
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: string;
  date: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  duration: number; // in minutes
  caloriesBurned: number;
  date: string;
}

export interface WaterIntake {
  amount: number; // in ml
  date: string;
}

export interface SleepRecord {
  id: string;
  date: string;
  duration: number; // in hours
  quality: number; // 1-10 scale
  bedtime: string;
  wakeTime: string;
  notes: string;
}

export interface MoodRecord {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'awful';
  stressLevel: number; // 1-10
  notes: string;
  activities: string[];
}

export interface HealthContextType {
  userProfile: UserProfile | null;
  foodItems: NutritionItem[];
  exerciseItems: ExerciseItem[];
  waterIntake: WaterIntake[];
  sleepRecords: SleepRecord[];
  moodRecords: MoodRecord[];
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
    sleep: number;
  };
  updateUserProfile: (profile: UserProfile) => void;
  addFoodItem: (item: NutritionItem) => void;
  addExerciseItem: (item: ExerciseItem) => void;
  updateWaterIntake: (amount: number) => void;
  addSleepRecord: (record: SleepRecord) => void;
  addMoodRecord: (record: MoodRecord) => void;
  getTodaysFoodItems: () => NutritionItem[];
  getTodaysExerciseItems: () => ExerciseItem[];
  getTodaysWaterIntake: () => number;
  getLatestSleepRecord: () => SleepRecord | null;
  getLatestMoodRecord: () => MoodRecord | null;
  getWeeklySleepData: () => SleepRecord[];
  getWeeklyMoodData: () => MoodRecord[];
  calculateBMI: () => number | null;
  calculateCalorieNeeds: () => number | null;
  getNutritionSummary: () => {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
  };
  getExerciseSummary: () => {
    totalCaloriesBurned: number;
    totalDuration: number;
  };
  getSleepSummary: () => {
    averageDuration: number;
    averageQuality: number;
  };
  getMoodSummary: () => {
    averageStressLevel: number;
    predominantMood: string;
  };
  resetDailyData: () => void;
}

const defaultGoals = {
  calories: 2000,
  protein: 150, // grams
  carbs: 250, // grams
  fat: 70, // grams
  water: 2500, // ml
  sleep: 8, // hours
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [foodItems, setFoodItems] = useState<NutritionItem[]>(() => {
    const saved = localStorage.getItem('foodItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [exerciseItems, setExerciseItems] = useState<ExerciseItem[]>(() => {
    const saved = localStorage.getItem('exerciseItems');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [waterIntake, setWaterIntake] = useState<WaterIntake[]>(() => {
    const saved = localStorage.getItem('waterIntake');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>(() => {
    const saved = localStorage.getItem('sleepRecords');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [moodRecords, setMoodRecords] = useState<MoodRecord[]>(() => {
    const saved = localStorage.getItem('moodRecords');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [dailyGoals, setDailyGoals] = useState(() => {
    const saved = localStorage.getItem('dailyGoals');
    return saved ? JSON.parse(saved) : defaultGoals;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (userProfile) localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('foodItems', JSON.stringify(foodItems));
    localStorage.setItem('exerciseItems', JSON.stringify(exerciseItems));
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake));
    localStorage.setItem('sleepRecords', JSON.stringify(sleepRecords));
    localStorage.setItem('moodRecords', JSON.stringify(moodRecords));
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  }, [userProfile, foodItems, exerciseItems, waterIntake, sleepRecords, moodRecords, dailyGoals]);

  const updateUserProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    // Recalculate daily calorie goals based on profile
    if (profile) {
      const calorieNeeds = calculateBMR(profile) * getActivityMultiplier(profile.activityLevel);
      setDailyGoals(current => ({
        ...current,
        calories: Math.round(calorieNeeds),
      }));
    }
  };

  const addFoodItem = (item: NutritionItem) => {
    setFoodItems(current => [...current, { ...item, id: crypto.randomUUID() }]);
  };

  const addExerciseItem = (item: ExerciseItem) => {
    setExerciseItems(current => [...current, { ...item, id: crypto.randomUUID() }]);
  };

  const updateWaterIntake = (amount: number) => {
    const today = new Date().toISOString().split('T')[0];
    const existingEntry = waterIntake.find(entry => entry.date === today);
    
    if (existingEntry) {
      setWaterIntake(current => 
        current.map(entry => 
          entry.date === today ? { ...entry, amount: entry.amount + amount } : entry
        )
      );
    } else {
      setWaterIntake(current => [...current, { amount, date: today }]);
    }
  };

  const addSleepRecord = (record: SleepRecord) => {
    setSleepRecords(current => [...current, { ...record, id: crypto.randomUUID() }]);
  };

  const addMoodRecord = (record: MoodRecord) => {
    setMoodRecords(current => [...current, { ...record, id: crypto.randomUUID() }]);
  };

  const getTodaysFoodItems = () => {
    const today = new Date().toISOString().split('T')[0];
    return foodItems.filter(item => item.date === today);
  };

  const getTodaysExerciseItems = () => {
    const today = new Date().toISOString().split('T')[0];
    return exerciseItems.filter(item => item.date === today);
  };

  const getTodaysWaterIntake = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntry = waterIntake.find(entry => entry.date === today);
    return todayEntry ? todayEntry.amount : 0;
  };

  const getLatestSleepRecord = () => {
    if (!sleepRecords.length) return null;
    return sleepRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const getLatestMoodRecord = () => {
    if (!moodRecords.length) return null;
    return moodRecords.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };

  const getWeeklySleepData = () => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    
    return sleepRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= oneWeekAgo && recordDate <= today;
    });
  };

  const getWeeklyMoodData = () => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    
    return moodRecords.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= oneWeekAgo && recordDate <= today;
    });
  };

  const calculateBMI = () => {
    if (!userProfile) return null;
    const heightInMeters = userProfile.height / 100;
    return userProfile.weight / (heightInMeters * heightInMeters);
  };

  // Mifflin-St Jeor equation for BMR
  const calculateBMR = (profile: UserProfile) => {
    const { weight, height, age, gender } = profile;
    
    if (gender === 'male') {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const getActivityMultiplier = (activityLevel: string) => {
    switch (activityLevel) {
      case 'sedentary': return 1.2;
      case 'light': return 1.375;
      case 'moderate': return 1.55;
      case 'active': return 1.725;
      case 'very-active': return 1.9;
      default: return 1.2;
    }
  };

  const calculateCalorieNeeds = () => {
    if (!userProfile) return null;
    
    const bmr = calculateBMR(userProfile);
    const activityMultiplier = getActivityMultiplier(userProfile.activityLevel);
    
    let calorieNeeds = bmr * activityMultiplier;
    
    // Adjust based on goal
    switch (userProfile.goal) {
      case 'lose':
        calorieNeeds -= 500; // Calorie deficit
        break;
      case 'gain':
        calorieNeeds += 500; // Calorie surplus
        break;
      default:
        break; // Maintain weight
    }
    
    return Math.round(calorieNeeds);
  };

  const getNutritionSummary = () => {
    const todaysFoodItems = getTodaysFoodItems();
    return {
      totalCalories: todaysFoodItems.reduce((sum, item) => sum + item.calories, 0),
      totalProtein: todaysFoodItems.reduce((sum, item) => sum + item.protein, 0),
      totalCarbs: todaysFoodItems.reduce((sum, item) => sum + item.carbs, 0),
      totalFat: todaysFoodItems.reduce((sum, item) => sum + item.fat, 0),
    };
  };

  const getExerciseSummary = () => {
    const todaysExerciseItems = getTodaysExerciseItems();
    return {
      totalCaloriesBurned: todaysExerciseItems.reduce((sum, item) => sum + item.caloriesBurned, 0),
      totalDuration: todaysExerciseItems.reduce((sum, item) => sum + item.duration, 0),
    };
  };

  const getSleepSummary = () => {
    const weeklySleepData = getWeeklySleepData();
    if (!weeklySleepData.length) return { averageDuration: 0, averageQuality: 0 };
    
    const totalDuration = weeklySleepData.reduce((sum, record) => sum + record.duration, 0);
    const totalQuality = weeklySleepData.reduce((sum, record) => sum + record.quality, 0);
    
    return {
      averageDuration: totalDuration / weeklySleepData.length,
      averageQuality: totalQuality / weeklySleepData.length
    };
  };

  const getMoodSummary = () => {
    const weeklyMoodData = getWeeklyMoodData();
    if (!weeklyMoodData.length) return { averageStressLevel: 0, predominantMood: 'neutral' };
    
    const totalStressLevel = weeklyMoodData.reduce((sum, record) => sum + record.stressLevel, 0);
    
    // Count occurrences of each mood
    const moodCounts = weeklyMoodData.reduce((counts, record) => {
      counts[record.mood] = (counts[record.mood] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    
    // Find the mood with the highest count
    let predominantMood = 'neutral';
    let maxCount = 0;
    for (const [mood, count] of Object.entries(moodCounts)) {
      if (count > maxCount) {
        maxCount = count;
        predominantMood = mood;
      }
    }
    
    return {
      averageStressLevel: totalStressLevel / weeklyMoodData.length,
      predominantMood
    };
  };

  const resetDailyData = () => {
    // Function to reset daily data (if needed)
    // Implement if needed, otherwise keep empty
  };

  const value = {
    userProfile,
    foodItems,
    exerciseItems,
    waterIntake,
    sleepRecords,
    moodRecords,
    dailyGoals,
    updateUserProfile,
    addFoodItem,
    addExerciseItem,
    updateWaterIntake,
    addSleepRecord,
    addMoodRecord,
    getTodaysFoodItems,
    getTodaysExerciseItems,
    getTodaysWaterIntake,
    getLatestSleepRecord,
    getLatestMoodRecord,
    getWeeklySleepData,
    getWeeklyMoodData,
    calculateBMI,
    calculateCalorieNeeds,
    getNutritionSummary,
    getExerciseSummary,
    getSleepSummary,
    getMoodSummary,
    resetDailyData,
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};

export const useHealth = (): HealthContextType => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
