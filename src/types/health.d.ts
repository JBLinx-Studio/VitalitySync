
export interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  avatar?: string;
  profileImage?: string;
  photoUrl?: string;
  image?: string;
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  activityLevel?: string;
  fitnessGoal?: string;
  joinDate?: string;
  premium?: boolean;
  settings?: UserSettings;
}

export interface UserSettings {
  notifications?: boolean;
  darkMode?: boolean;
  units?: 'metric' | 'imperial';
  language?: string;
  privacyLevel?: 'public' | 'friends' | 'private';
}
