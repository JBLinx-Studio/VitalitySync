
import React, { useState } from 'react';
import { User, Save, Calculator, Target, Edit2, Heart, TrendingUp, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/contexts/HealthContext';
import { UserAvatar } from '@/components/common';

const UserProfile: React.FC = () => {
  const { userProfile, updateUserProfile, calculateBMI, calculateCalorieNeeds } = useHealth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    age: userProfile?.age || '',
    height: userProfile?.height || '',
    weight: userProfile?.weight || '',
    gender: userProfile?.gender || '',
    activityLevel: userProfile?.activityLevel || '',
    goals: {
      weightGoal: userProfile?.goals?.weightGoal || '',
      calorieGoal: userProfile?.goals?.calorieGoal || '',
      exerciseGoal: userProfile?.goals?.exerciseGoal || '',
      sleepGoal: userProfile?.goals?.sleepGoal || ''
    }
  });

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('goals.')) {
      const goalField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        goals: {
          ...prev.goals,
          [goalField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    const updatedProfile = {
      ...formData,
      age: formData.age ? parseInt(formData.age.toString()) : undefined,
      height: formData.height ? parseFloat(formData.height.toString()) : undefined,
      weight: formData.weight ? parseFloat(formData.weight.toString()) : undefined,
      goals: {
        weightGoal: formData.goals.weightGoal ? parseFloat(formData.goals.weightGoal.toString()) : undefined,
        calorieGoal: formData.goals.calorieGoal ? parseInt(formData.goals.calorieGoal.toString()) : undefined,
        exerciseGoal: formData.goals.exerciseGoal ? parseInt(formData.goals.exerciseGoal.toString()) : undefined,
        sleepGoal: formData.goals.sleepGoal ? parseFloat(formData.goals.sleepGoal.toString()) : undefined,
      }
    };

    updateUserProfile(updatedProfile);
    setIsEditing(false);
  };

  const bmi = userProfile?.height && userProfile?.weight 
    ? calculateBMI(userProfile.weight, userProfile.height)
    : null;

  const dailyCalories = userProfile ? calculateCalorieNeeds(userProfile) : null;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
    { value: 'lightly_active', label: 'Lightly active (light exercise 1-3 days/week)' },
    { value: 'moderately_active', label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { value: 'very_active', label: 'Very active (hard exercise 6-7 days/week)' },
    { value: 'extremely_active', label: 'Extremely active (very hard exercise, physical job)' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            User Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Manage your personal information and health goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                    <User className="mr-2 h-6 w-6 text-blue-500" />
                    Personal Information
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit2 className="h-4 w-4 mr-2" />}
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6 pb-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="relative">
                    <UserAvatar userProfile={userProfile} className="h-20 w-20" />
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {userProfile?.name || 'Your Name'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {userProfile?.email || 'your.email@example.com'}
                    </p>
                    <Badge variant="secondary" className="mt-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200">
                      Member since {userProfile?.joinDate ? new Date(userProfile.joinDate).getFullYear() : new Date().getFullYear()}
                    </Badge>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.name || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.email || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="age" className="text-gray-700 dark:text-gray-300 font-medium">Age</Label>
                    {isEditing ? (
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.age ? `${userProfile.age} years` : 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300 font-medium">Gender</Label>
                    {isEditing ? (
                      <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100 capitalize">{userProfile?.gender || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="height" className="text-gray-700 dark:text-gray-300 font-medium">Height (cm)</Label>
                    {isEditing ? (
                      <Input
                        id="height"
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange('height', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.height ? `${userProfile.height} cm` : 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="weight" className="text-gray-700 dark:text-gray-300 font-medium">Weight (kg)</Label>
                    {isEditing ? (
                      <Input
                        id="weight"
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.weight ? `${userProfile.weight} kg` : 'Not set'}</p>
                    )}
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <Label htmlFor="activity" className="text-gray-700 dark:text-gray-300 font-medium">Activity Level</Label>
                  {isEditing ? (
                    <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange('activityLevel', value)}>
                      <SelectTrigger className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60">
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">
                      {activityLevels.find(level => level.value === userProfile?.activityLevel)?.label || 'Not set'}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Goals Section */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Target className="mr-2 h-6 w-6 text-green-500" />
                  Health Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weightGoal" className="text-gray-700 dark:text-gray-300 font-medium">Weight Goal (kg)</Label>
                    {isEditing ? (
                      <Input
                        id="weightGoal"
                        type="number"
                        value={formData.goals.weightGoal}
                        onChange={(e) => handleInputChange('goals.weightGoal', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.goals?.weightGoal ? `${userProfile.goals.weightGoal} kg` : 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="calorieGoal" className="text-gray-700 dark:text-gray-300 font-medium">Daily Calorie Goal</Label>
                    {isEditing ? (
                      <Input
                        id="calorieGoal"
                        type="number"
                        value={formData.goals.calorieGoal}
                        onChange={(e) => handleInputChange('goals.calorieGoal', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.goals?.calorieGoal ? `${userProfile.goals.calorieGoal} cal` : 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="exerciseGoal" className="text-gray-700 dark:text-gray-300 font-medium">Weekly Exercise Goal (minutes)</Label>
                    {isEditing ? (
                      <Input
                        id="exerciseGoal"
                        type="number"
                        value={formData.goals.exerciseGoal}
                        onChange={(e) => handleInputChange('goals.exerciseGoal', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.goals?.exerciseGoal ? `${userProfile.goals.exerciseGoal} min` : 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="sleepGoal" className="text-gray-700 dark:text-gray-300 font-medium">Daily Sleep Goal (hours)</Label>
                    {isEditing ? (
                      <Input
                        id="sleepGoal"
                        type="number"
                        step="0.5"
                        value={formData.goals.sleepGoal}
                        onChange={(e) => handleInputChange('goals.sleepGoal', e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                      />
                    ) : (
                      <p className="mt-2 p-2 text-gray-900 dark:text-gray-100">{userProfile?.goals?.sleepGoal ? `${userProfile.goals.sleepGoal} hours` : 'Not set'}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Stats Sidebar */}
          <div className="space-y-6">
            {/* BMI Card */}
            {bmi && (
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                    <Calculator className="mr-2 h-5 w-5 text-blue-500" />
                    BMI Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {bmi.toFixed(1)}
                    </div>
                    <div className={`text-lg font-medium ${getBMICategory(bmi).color} mb-4`}>
                      {getBMICategory(bmi).category}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      BMI is calculated using your height and weight
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Daily Calories */}
            {dailyCalories && (
              <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    Daily Calories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                      {Math.round(dailyCalories)}
                    </div>
                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                      calories/day
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Based on your activity level and goals
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Profile Completion</span>
                  <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200">
                    85%
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Goals Set</span>
                  <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200">
                    3/4
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Health Score</span>
                  <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200">
                    Good
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Preview */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/40 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Profile Complete</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Completed your profile</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
                      <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Goal Setter</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Set your first health goal</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
