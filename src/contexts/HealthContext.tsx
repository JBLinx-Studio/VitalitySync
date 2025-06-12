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

export interface HealthContextType {
  userProfile: UserProfile | null;
  foodItems: NutritionItem[];
  exerciseItems: ExerciseItem[];
  waterIntake: WaterIntake[];
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  updateUserProfile: (profile: UserProfile) => void;
  addFoodItem: (item: NutritionItem) => void;
  addExerciseItem: (item: ExerciseItem) => void;
  updateWaterIntake: (amount: number) => void;
  getTodaysFoodItems: () => NutritionItem[];
  getTodaysExerciseItems: () => ExerciseItem[];
  getTodaysWaterIntake: () => number;
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
  resetDailyData: () => void;
}

const defaultGoals = {
  calories: 2000,
  protein: 150, // grams
  carbs: 250, // grams
  fat: 70, // grams
  water: 2500, // ml
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
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
  }, [userProfile, foodItems, exerciseItems, waterIntake, dailyGoals]);

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

  const resetDailyData = () => {
    // Function to reset daily data (if needed)
    // Implement if needed, otherwise keep empty
  };

  const value = {
    userProfile,
    foodItems,
    exerciseItems,
    waterIntake,
    dailyGoals,
    updateUserProfile,
    addFoodItem,
    addExerciseItem,
    updateWaterIntake,
    getTodaysFoodItems,
    getTodaysExerciseItems,
    getTodaysWaterIntake,
    calculateBMI,
    calculateCalorieNeeds,
    getNutritionSummary,
    getExerciseSummary,
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
