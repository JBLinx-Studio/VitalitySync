
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

export interface HealthContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  dailyGoals: DailyGoals;
  setDailyGoals: (goals: DailyGoals) => void;
  todayData: TodayData;
  setTodayData: (data: TodayData) => void;
  updateTodayData: (updates: Partial<TodayData>) => void;
  isLoading: boolean;
  error: string | null;
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

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('healthProfile');
      const savedGoals = localStorage.getItem('dailyGoals');
      const savedTodayData = localStorage.getItem('todayData');

      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }
      if (savedGoals) {
        setDailyGoals(JSON.parse(savedGoals));
      }
      if (savedTodayData) {
        const parsedData = JSON.parse(savedTodayData);
        // Check if data is from today, reset if not
        const today = new Date().toDateString();
        const dataDate = new Date(parsedData.lastUpdated).toDateString();
        if (today === dataDate) {
          setTodayData(parsedData);
        } else {
          // Reset to default if data is from a different day
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

  const updateTodayData = (updates: Partial<TodayData>) => {
    setTodayData(prev => ({
      ...prev,
      ...updates,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Calculate daily goals based on user profile
  useEffect(() => {
    if (userProfile) {
      // Calculate BMR using Mifflin-St Jeor Equation
      let bmr: number;
      if (userProfile.gender === 'male') {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age + 5;
      } else {
        bmr = 10 * userProfile.weight + 6.25 * userProfile.height - 5 * userProfile.age - 161;
      }

      // Activity multipliers
      const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9
      };

      const tdee = bmr * activityMultipliers[userProfile.activityLevel];
      
      // Adjust calories based on goal
      let calories = tdee;
      if (userProfile.goals.primaryGoal === 'lose_weight') {
        calories = tdee - 500; // 500 calorie deficit
      } else if (userProfile.goals.primaryGoal === 'gain_weight' || userProfile.goals.primaryGoal === 'build_muscle') {
        calories = tdee + 300; // 300 calorie surplus
      }

      // Calculate macros (40% carbs, 30% protein, 30% fat)
      const protein = Math.round((calories * 0.30) / 4);
      const carbs = Math.round((calories * 0.40) / 4);
      const fat = Math.round((calories * 0.30) / 9);

      setDailyGoals({
        calories: Math.round(calories),
        protein,
        carbs,
        fat,
        water: userProfile.weight * 35, // 35ml per kg of body weight
        steps: 10000,
        exercise: 60,
        sleep: 8
      });
    }
  }, [userProfile]);

  const value: HealthContextType = {
    userProfile,
    setUserProfile,
    dailyGoals,
    setDailyGoals,
    todayData,
    setTodayData,
    updateTodayData,
    isLoading,
    error
  };

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};
