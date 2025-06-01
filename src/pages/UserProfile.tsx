
import React, { useState, useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Weight, 
  Heart, 
  Activity, 
  Camera, 
  Share2, 
  Trophy, 
  Calendar,
  Target,
  Zap,
  Users,
  Settings,
  Star,
  TrendingUp,
  Award,
  Crown,
  Sparkles
} from 'lucide-react';
import GlassCard from '@/components/ui/glass-card';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';

const UserProfile: React.FC = () => {
  const { userProfile, updateUserProfile, calculateBMI, calculateCalorieNeeds, dailyGoals } = useHealth();
  const { isMobile, isTablet } = useViewport();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    age: userProfile?.age || '',
    gender: userProfile?.gender || 'male',
    height: userProfile?.height || '',
    weight: userProfile?.weight || '',
    goal: userProfile?.goal || 'maintain',
    activityLevel: userProfile?.activityLevel || 'light',
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.height || !formData.weight) {
      alert('Please fill out all required fields');
      return;
    }
    
    updateUserProfile({
      name: formData.name,
      age: parseInt(formData.age.toString()),
      gender: formData.gender,
      height: parseInt(formData.height.toString()),
      weight: parseInt(formData.weight.toString()),
      goal: formData.goal,
      activityLevel: formData.activityLevel,
    });
    
    alert('Profile updated successfully!');
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const currentBMI = calculateBMI();
  const bmiCategory = currentBMI ? getBMICategory(currentBMI) : null;

  return (
    <ResponsiveContainer maxWidth="2xl" padding={isMobile ? 'sm' : 'lg'}>
      <div className="space-y-8">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 dark:border-slate-700/20 shadow-xl">
            <Crown className="w-5 h-5 text-purple-500 animate-pulse" />
            <span className="text-purple-600 dark:text-purple-400 font-semibold">Premium Profile Management</span>
          </div>
          
          <h1 className={`font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent ${
            isMobile ? 'text-3xl' : 'text-5xl'
          }`}>
            Your Health Profile
          </h1>
          
          <p className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto ${
            isMobile ? 'text-base px-4' : 'text-lg'
          }`}>
            Manage your personal information, track your progress, and unlock advanced features to dominate your health journey
          </p>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-center mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className={isMobile ? 'hidden' : 'inline'}>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="health" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className={isMobile ? 'hidden' : 'inline'}>Health</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className={isMobile ? 'hidden' : 'inline'}>Goals</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className={isMobile ? 'hidden' : 'inline'}>Community</span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className={isMobile ? 'hidden' : 'inline'}>Premium</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
              <GlassCard variant="premium" size="lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <User className="w-6 h-6 text-purple-500" />
                      Personal Information
                    </h2>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Camera className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-medium">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-12 text-base"
                      />
                    </div>
                    
                    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <div className="space-y-2">
                        <Label htmlFor="age" className="text-base font-medium">Age</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="1"
                          max="120"
                          value={formData.age}
                          onChange={handleInputChange}
                          placeholder="Your age"
                          className="h-12 text-base"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-base font-medium">Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                          <SelectTrigger id="gender" className="h-12 text-base">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      <div className="space-y-2">
                        <Label htmlFor="height" className="text-base font-medium">Height (cm)</Label>
                        <Input
                          id="height"
                          name="height"
                          type="number"
                          min="50"
                          max="250"
                          value={formData.height}
                          onChange={handleInputChange}
                          placeholder="Height in cm"
                          className="h-12 text-base"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="weight" className="text-base font-medium">Weight (kg)</Label>
                        <Input
                          id="weight"
                          name="weight"
                          type="number"
                          min="20"
                          max="300"
                          value={formData.weight}
                          onChange={handleInputChange}
                          placeholder="Weight in kg"
                          className="h-12 text-base"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goal" className="text-base font-medium">Weight Goal</Label>
                      <Select value={formData.goal} onValueChange={(value) => handleSelectChange('goal', value)}>
                        <SelectTrigger id="goal" className="h-12 text-base">
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose">🎯 Lose Weight</SelectItem>
                          <SelectItem value="maintain">⚖️ Maintain Weight</SelectItem>
                          <SelectItem value="gain">💪 Gain Weight</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="activityLevel" className="text-base font-medium">Activity Level</Label>
                      <Select value={formData.activityLevel} onValueChange={(value) => handleSelectChange('activityLevel', value)}>
                        <SelectTrigger id="activityLevel" className="h-12 text-base">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">🛋️ Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="light">🚶 Light (exercise 1-3 days/week)</SelectItem>
                          <SelectItem value="moderate">🏃 Moderate (exercise 3-5 days/week)</SelectItem>
                          <SelectItem value="active">💪 Active (exercise 6-7 days/week)</SelectItem>
                          <SelectItem value="very-active">🔥 Very Active (physical job or 2x training)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:shadow-2xl transition-all duration-500 hover:scale-105"
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Save Profile
                    </Button>
                  </form>
                </div>
              </GlassCard>

              <div className="space-y-6">
                {/* Health Metrics Card */}
                <GlassCard variant="cosmic" size="lg">
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Activity className="w-6 h-6 text-blue-500" />
                      Health Metrics
                    </h2>
                    
                    {userProfile ? (
                      <div className="space-y-6">
                        <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-2'}`}>
                          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/20">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">BMI</div>
                            <div className="text-3xl font-bold mb-2">{currentBMI?.toFixed(1) || 'N/A'}</div>
                            {bmiCategory && (
                              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${bmiCategory.bg} ${bmiCategory.color}`}>
                                {bmiCategory.label}
                              </div>
                            )}
                          </div>
                          
                          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-2xl text-center backdrop-blur-sm border border-white/20">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Daily Calories</div>
                            <div className="text-3xl font-bold mb-2">{calculateCalorieNeeds() || 'N/A'}</div>
                            <div className="text-xs text-gray-500">kcal target</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Target className="w-5 h-5 text-orange-500" />
                            Daily Nutrient Goals
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { label: 'Protein', value: `${dailyGoals.protein}g`, icon: '🥩' },
                              { label: 'Carbs', value: `${dailyGoals.carbs}g`, icon: '🍞' },
                              { label: 'Fat', value: `${dailyGoals.fat}g`, icon: '🥑' },
                              { label: 'Water', value: `${dailyGoals.water}ml`, icon: '💧' }
                            ].map((goal, index) => (
                              <div key={index} className="bg-white/10 dark:bg-slate-800/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{goal.icon} {goal.label}</span>
                                  <span className="font-bold">{goal.value}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Complete your profile to view health metrics</p>
                      </div>
                    )}
                  </div>
                </GlassCard>

                {/* Quick Actions Card */}
                <GlassCard variant="premium" size="lg">
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Quick Actions
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="glass" className="h-16 flex-col gap-2">
                        <Camera className="w-6 h-6" />
                        <span className="text-sm">Scan Barcode</span>
                      </Button>
                      <Button variant="glass" className="h-16 flex-col gap-2">
                        <Share2 className="w-6 h-6" />
                        <span className="text-sm">Share Progress</span>
                      </Button>
                      <Button variant="glass" className="h-16 flex-col gap-2">
                        <Trophy className="w-6 h-6" />
                        <span className="text-sm">View Achievements</span>
                      </Button>
                      <Button variant="glass" className="h-16 flex-col gap-2">
                        <Calendar className="w-6 h-6" />
                        <span className="text-sm">Meal Plans</span>
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </TabsContent>

          {/* Health Tab - Coming Soon */}
          <TabsContent value="health">
            <GlassCard variant="cosmic" size="xl" className="text-center py-16">
              <Heart className="w-24 h-24 text-red-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Advanced Health Analytics</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Detailed health insights, progress tracking, and personalized recommendations coming soon!
              </p>
              <Button variant="premium" size="lg">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Premium
              </Button>
            </GlassCard>
          </TabsContent>

          {/* Goals Tab - Coming Soon */}
          <TabsContent value="goals">
            <GlassCard variant="premium" size="xl" className="text-center py-16">
              <Target className="w-24 h-24 text-blue-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Smart Goal Management</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                AI-powered goal setting, progress tracking, and achievement systems coming soon!
              </p>
              <Button variant="premium" size="lg">
                <Star className="w-5 h-5 mr-2" />
                Set Smart Goals
              </Button>
            </GlassCard>
          </TabsContent>

          {/* Community Tab - Coming Soon */}
          <TabsContent value="community">
            <GlassCard variant="cosmic" size="xl" className="text-center py-16">
              <Users className="w-24 h-24 text-purple-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Community & Social Features</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Connect with others, share progress, join challenges, and get inspired by the community!
              </p>
              <Button variant="premium" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Join Community Beta
              </Button>
            </GlassCard>
          </TabsContent>

          {/* Premium Tab - Coming Soon */}
          <TabsContent value="premium">
            <GlassCard variant="premium" size="xl" className="text-center py-16">
              <Crown className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold mb-4">Premium Features</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Unlock advanced barcode scanning, detailed nutrition analysis, meal planning, and exclusive community features!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                {[
                  { icon: Camera, title: 'AI Barcode Scanner', desc: 'Instant nutrition lookup' },
                  { icon: TrendingUp, title: 'Advanced Analytics', desc: 'Deep health insights' },
                  { icon: Award, title: 'Premium Community', desc: 'Exclusive access' }
                ].map((feature, index) => (
                  <div key={index} className="bg-white/10 dark:bg-slate-800/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
                    <feature.icon className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
              <Button variant="premium" size="lg" className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Premium
              </Button>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </div>
    </ResponsiveContainer>
  );
};

export default UserProfile;
