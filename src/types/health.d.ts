
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  gender?: 'male' | 'female' | 'other';
  activityLevel?: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
  goals?: {
    weightGoal?: number;
    calorieGoal?: number;
    exerciseGoal?: number;
    sleepGoal?: number;
  };
  preferences?: {
    units?: 'metric' | 'imperial';
    notifications?: boolean;
  };
  avatar?: string;
  joinDate?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
  serving_size: string;
  date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  quantity: number;
  barcode?: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports';
  duration: number; // in minutes
  calories_burned: number;
  date: string;
  notes?: string;
  sets?: number;
  reps?: number;
  weight?: number;
}

export interface SleepRecord {
  id: string;
  date: string;
  bedtime: string;
  wakeup_time: string;
  duration: number; // in hours
  quality: 'poor' | 'fair' | 'good' | 'excellent';
  notes?: string;
}

export interface MoodRecord {
  id: string;
  date: string;
  mood: 'awful' | 'bad' | 'neutral' | 'good' | 'great';
  energy: number; // 1-10
  stress: number; // 1-10
  notes?: string;
  activities?: string[];
}

export interface AddictionRecord {
  id: string;
  type: string; // e.g., 'smoking', 'alcohol', 'caffeine'
  amount: number;
  unit: string;
  date: string;
  notes?: string;
  goal?: number;
  goalUnit?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: string;
  date: string;
  icon?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
}

export interface WaterIntake {
  id: string;
  amount: number; // in ml
  date: string;
  time: string;
}

export interface BodyMeasurement {
  id: string;
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  date: string;
  notes?: string;
}

export interface HealthContextType {
  // User Profile
  userProfile: UserProfile | null;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  
  // Food & Nutrition
  foodItems: FoodItem[];
  addFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  deleteFoodItem: (id: string) => void;
  getTodaysFoodItems: () => FoodItem[];
  getNutritionSummary: (date?: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  
  // Water Intake
  waterIntakes: WaterIntake[];
  addWaterIntake: (amount: number) => void;
  getTodaysWaterIntake: () => number;
  
  // Exercise
  exerciseItems: ExerciseItem[];
  addExerciseItem: (item: Omit<ExerciseItem, 'id'>) => void;
  deleteExerciseItem: (id: string) => void;
  getTodaysExerciseItems: () => ExerciseItem[];
  getExerciseSummary: (date?: string) => {
    totalDuration: number;
    totalCalories: number;
    exerciseCount: number;
  };
  
  // Sleep
  sleepRecords: SleepRecord[];
  addSleepRecord: (record: Omit<SleepRecord, 'id'>) => void;
  deleteSleepRecord: (id: string) => void;
  getSleepSummary: (days?: number) => {
    averageDuration: number;
    averageQuality: string;
    totalSleep: number;
  };
  
  // Mental Wellness
  moodRecords: MoodRecord[];
  addMoodRecord: (record: Omit<MoodRecord, 'id'>) => void;
  deleteMoodRecord: (id: string) => void;
  getMoodSummary: (days?: number) => {
    averageMood: number;
    averageEnergy: number;
    averageStress: number;
  };
  
  // Addiction Tracking
  addictionRecords: AddictionRecord[];
  addAddictionRecord: (record: Omit<AddictionRecord, 'id'>) => void;
  deleteAddictionRecord: (id: string) => void;
  getUserAddictionGoals: () => AddictionRecord[];
  updateAddictionGoal: (type: string, goal: number, unit: string) => void;
  
  // Body Measurements
  bodyMeasurements: BodyMeasurement[];
  addBodyMeasurement: (measurement: Omit<BodyMeasurement, 'id'>) => void;
  getLatestMeasurement: () => BodyMeasurement | null;
  
  // Achievements & Notifications
  achievements: Achievement[];
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markNotificationAsRead: (id: string) => void;
  getUnreadNotificationsCount: () => number;
  
  // Calculations
  calculateBMI: (weight: number, height: number) => number;
  calculateCalorieNeeds: (profile: UserProfile) => number;
  
  // Goals
  checkAndUpdateGoals: () => void;
  getGoalProgress: (type: string) => number;
}
