
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Target, 
  Activity, 
  Apple, 
  Droplets, 
  Moon, 
  Heart,
  Calculator,
  Award,
  Settings,
  Save,
  AlertCircle
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { toast } from '@/hooks/use-toast';
import GlassCard from '@/components/ui/glass-card';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';

const UserProfile: React.FC = () => {
  const { userProfile, updateUserProfile } = useHealth();
  const { isMobile } = useViewport();
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    gender: '',
    activity_level: '',
    daily_calorie_goal: '',
    daily_exercise_goal: '',
    daily_water_goal: '',
    weight_goal: '',
    health_conditions: ''
  });

  const [calculatedBMR, setCalculatedBMR] = useState(0);
  const [recommendedCalories, setRecommendedCalories] = useState(0);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        age: userProfile.age?.toString() || '',
        height: userProfile.height?.toString() || '',
        weight: userProfile.weight?.toString() || '',
        gender: userProfile.gender || '',
        activity_level: userProfile.activity_level || '',
        daily_calorie_goal: userProfile.daily_calorie_goal?.toString() || '',
        daily_exercise_goal: userProfile.daily_exercise_goal?.toString() || '',
        daily_water_goal: userProfile.daily_water_goal?.toString() || '',
        weight_goal: userProfile.weight_goal?.toString() || '',
        health_conditions: userProfile.health_conditions || ''
      });
    }
  }, [userProfile]);

  // Calculate BMR and recommended calories
  useEffect(() => {
    const { weight, height, age, gender, activity_level } = formData;
    
    if (weight && height && age && gender) {
      let bmr = 0;
      const w = parseFloat(weight);
      const h = parseFloat(height);
      const a = parseFloat(age);

      // Mifflin-St Jeor Equation
      if (gender === 'male') {
        bmr = (10 * w) + (6.25 * h) - (5 * a) + 5;
      } else if (gender === 'female') {
        bmr = (10 * w) + (6.25 * h) - (5 * a) - 161;
      }

      setCalculatedBMR(Math.round(bmr));

      // Apply activity multiplier
      const activityMultipliers = {
        sedentary: 1.2,
        lightly_active: 1.375,
        moderately_active: 1.55,
        very_active: 1.725,
        extremely_active: 1.9
      };

      const multiplier = activityMultipliers[activity_level as keyof typeof activityMultipliers] || 1.2;
      setRecommendedCalories(Math.round(bmr * multiplier));
    }
  }, [formData.weight, formData.height, formData.age, formData.gender, formData.activity_level]);

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // Convert cm to m
    
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return null;
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profileData = {
      name: formData.name,
      age: parseInt(formData.age) || undefined,
      height: parseFloat(formData.height) || undefined,
      weight: parseFloat(formData.weight) || undefined,
      gender: formData.gender as 'male' | 'female' | undefined,
      activity_level: formData.activity_level as any,
      daily_calorie_goal: parseInt(formData.daily_calorie_goal) || undefined,
      daily_exercise_goal: parseInt(formData.daily_exercise_goal) || undefined,
      daily_water_goal: parseInt(formData.daily_water_goal) || undefined,
      weight_goal: parseFloat(formData.weight_goal) || undefined,
      health_conditions: formData.health_conditions || undefined
    };

    updateUserProfile(profileData);
    toast({
      title: "Profile Updated! 🎉",
      description: "Your health profile has been successfully updated.",
    });
  };

  const bmi = calculateBMI();
  const bmiInfo = bmi ? getBMICategory(parseFloat(bmi)) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950">
      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-6 md:space-y-8">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Health Profile 👤
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Set up your profile for personalized health tracking
            </p>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
              {!isMobile && <TabsTrigger value="health">Health Data</TabsTrigger>}
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <GlassCard variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-emerald-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your name"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          placeholder="Your age"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          value={formData.height}
                          onChange={(e) => handleInputChange('height', e.target.value)}
                          placeholder="Height in cm"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          step="0.1"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', e.target.value)}
                          placeholder="Weight in kg"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label>Activity Level</Label>
                      <Select value={formData.activity_level} onValueChange={(value) => handleInputChange('activity_level', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                          <SelectItem value="lightly_active">Lightly Active (1-3 days/week)</SelectItem>
                          <SelectItem value="moderately_active">Moderately Active (3-5 days/week)</SelectItem>
                          <SelectItem value="very_active">Very Active (6-7 days/week)</SelectItem>
                          <SelectItem value="extremely_active">Extremely Active (2x/day, intense)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-500">
                      <Save className="w-4 h-4 mr-2" />
                      Save Profile
                    </Button>
                  </form>
                </CardContent>
              </GlassCard>

              {/* Health Calculations */}
              {bmi && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassCard variant="premium">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-500" />
                        BMI Calculator
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                          {bmi}
                        </div>
                        <Badge className={`${bmiInfo?.color} bg-opacity-10`}>
                          {bmiInfo?.category}
                        </Badge>
                        <Progress 
                          value={Math.min((parseFloat(bmi) / 40) * 100, 100)} 
                          className="mt-4"
                        />
                        <p className="text-sm text-gray-500 mt-2">
                          Normal range: 18.5 - 24.9
                        </p>
                      </div>
                    </CardContent>
                  </GlassCard>

                  <GlassCard variant="premium">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Metabolism
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>BMR (Basal Metabolic Rate):</span>
                          <span className="font-semibold">{calculatedBMR} cal</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended Daily Calories:</span>
                          <span className="font-semibold text-emerald-600">{recommendedCalories} cal</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Based on your activity level and body metrics
                        </div>
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>
              )}
            </TabsContent>

            <TabsContent value="goals" className="space-y-6">
              <GlassCard variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    Daily Goals & Targets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="daily_calorie_goal" className="flex items-center gap-2">
                            <Apple className="w-4 h-4 text-green-500" />
                            Daily Calorie Goal
                          </Label>
                          <Input
                            id="daily_calorie_goal"
                            type="number"
                            value={formData.daily_calorie_goal}
                            onChange={(e) => handleInputChange('daily_calorie_goal', e.target.value)}
                            placeholder={recommendedCalories ? `Recommended: ${recommendedCalories}` : "2000"}
                            className="mt-1"
                          />
                          {recommendedCalories > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="mt-1 text-xs"
                              onClick={() => handleInputChange('daily_calorie_goal', recommendedCalories.toString())}
                            >
                              Use Recommended ({recommendedCalories} cal)
                            </Button>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="daily_exercise_goal" className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-orange-500" />
                            Daily Exercise Goal (minutes)
                          </Label>
                          <Input
                            id="daily_exercise_goal"
                            type="number"
                            value={formData.daily_exercise_goal}
                            onChange={(e) => handleInputChange('daily_exercise_goal', e.target.value)}
                            placeholder="30"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="daily_water_goal" className="flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            Daily Water Goal (glasses)
                          </Label>
                          <Input
                            id="daily_water_goal"
                            type="number"
                            value={formData.daily_water_goal}
                            onChange={(e) => handleInputChange('daily_water_goal', e.target.value)}
                            placeholder="8"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="weight_goal" className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-purple-500" />
                            Weight Goal (kg)
                          </Label>
                          <Input
                            id="weight_goal"
                            type="number"
                            step="0.1"
                            value={formData.weight_goal}
                            onChange={(e) => handleInputChange('weight_goal', e.target.value)}
                            placeholder="Target weight"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500">
                      <Save className="w-4 h-4 mr-2" />
                      Save Goals
                    </Button>
                  </form>
                </CardContent>
              </GlassCard>

              {/* Goal Progress Visualization */}
              {userProfile && (
                <GlassCard variant="premium">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Goal Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { 
                          name: 'Daily Calories', 
                          current: 0, 
                          goal: userProfile.daily_calorie_goal || 2000, 
                          icon: Apple,
                          color: 'text-green-500'
                        },
                        { 
                          name: 'Exercise Minutes', 
                          current: 0, 
                          goal: userProfile.daily_exercise_goal || 30, 
                          icon: Activity,
                          color: 'text-orange-500'
                        },
                        { 
                          name: 'Water Glasses', 
                          current: 0, 
                          goal: userProfile.daily_water_goal || 8, 
                          icon: Droplets,
                          color: 'text-blue-500'
                        }
                      ].map((goal, index) => (
                        <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <goal.icon className={`w-4 h-4 ${goal.color}`} />
                            <span className="font-medium text-sm">{goal.name}</span>
                          </div>
                          <div className="text-2xl font-bold mb-2">
                            {goal.current} / {goal.goal}
                          </div>
                          <Progress value={(goal.current / goal.goal) * 100} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round((goal.current / goal.goal) * 100)}% complete
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </GlassCard>
              )}
            </TabsContent>

            <TabsContent value="health" className="space-y-6">
              <GlassCard variant="premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Health Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="health_conditions">
                        Health Conditions or Notes (Optional)
                      </Label>
                      <textarea
                        id="health_conditions"
                        value={formData.health_conditions}
                        onChange={(e) => handleInputChange('health_conditions', e.target.value)}
                        placeholder="Any health conditions, allergies, or notes to consider..."
                        className="mt-1 w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white/80 dark:bg-slate-700/80 min-h-[100px]"
                        rows={4}
                      />
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800 dark:text-amber-200">
                            Medical Disclaimer
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                            This app is for tracking purposes only and should not replace professional medical advice. 
                            Always consult with healthcare professionals for medical decisions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500">
                      <Save className="w-4 h-4 mr-2" />
                      Save Health Information
                    </Button>
                  </form>
                </CardContent>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default UserProfile;
