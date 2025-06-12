
import React, { useState, useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Weight, Heart, Activity } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { userProfile, updateUserProfile, calculateBMI, calculateCalorieNeeds, dailyGoals } = useHealth();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    age: userProfile?.age || '',
    gender: userProfile?.gender || 'male',
    height: userProfile?.height || '',
    weight: userProfile?.weight || '',
    goal: userProfile?.goal || 'maintain',
    activityLevel: userProfile?.activityLevel || 'light',
  });

  const [bmiCalculator, setBmiCalculator] = useState({
    height: '',
    weight: '',
    bmi: 0,
    category: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
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

  const handleBmiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBmiCalculator({
      ...bmiCalculator,
      [name]: value,
    });
  };

  const calculateBmiValue = () => {
    const heightInMeters = parseInt(bmiCalculator.height) / 100;
    const weightInKg = parseInt(bmiCalculator.weight);
    
    if (isNaN(heightInMeters) || isNaN(weightInKg) || heightInMeters === 0) {
      alert('Please enter valid height and weight');
      return;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    let category = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    
    setBmiCalculator({
      ...bmiCalculator,
      bmi,
      category,
    });
  };

  // Load BMI calculator with user data if available
  useEffect(() => {
    if (userProfile) {
      setBmiCalculator({
        height: userProfile.height.toString(),
        weight: userProfile.weight.toString(),
        bmi: calculateBMI() || 0,
        category: '',
      });
    }
  }, [userProfile, calculateBMI]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-health-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        min="1"
                        max="120"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Your age"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => handleSelectChange('gender', value)}
                      >
                        <SelectTrigger id="gender">
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        min="50"
                        max="250"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="Height in cm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        min="20"
                        max="300"
                        value={formData.weight}
                        onChange={handleInputChange}
                        placeholder="Weight in kg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="goal">Weight Goal</Label>
                    <Select
                      value={formData.goal}
                      onValueChange={(value) => handleSelectChange('goal', value)}
                    >
                      <SelectTrigger id="goal">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose">Lose Weight</SelectItem>
                        <SelectItem value="maintain">Maintain Weight</SelectItem>
                        <SelectItem value="gain">Gain Weight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="activityLevel">Activity Level</Label>
                    <Select
                      value={formData.activityLevel}
                      onValueChange={(value) => handleSelectChange('activityLevel', value)}
                    >
                      <SelectTrigger id="activityLevel">
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="very-active">Very Active (physical job or 2x training)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full">Save Profile</Button>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-health-primary" />
                    Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {userProfile ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                          <div className="text-sm text-gray-600">BMI</div>
                          <div className="text-2xl font-bold">
                            {calculateBMI()?.toFixed(1) || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {(() => {
                              const bmi = calculateBMI();
                              if (!bmi) return '';
                              if (bmi < 18.5) return 'Underweight';
                              if (bmi < 25) return 'Normal';
                              if (bmi < 30) return 'Overweight';
                              return 'Obese';
                            })()}
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 p-4 rounded-lg text-center">
                          <div className="text-sm text-gray-600">Daily Calories</div>
                          <div className="text-2xl font-bold">
                            {calculateCalorieNeeds() || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">kcal</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-medium">Daily Nutrient Goals</h3>
                        
                        <div className="flex justify-between text-sm">
                          <span>Calories</span>
                          <span className="font-medium">{dailyGoals.calories} kcal</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Protein</span>
                          <span className="font-medium">{dailyGoals.protein}g</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Carbohydrates</span>
                          <span className="font-medium">{dailyGoals.carbs}g</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Fat</span>
                          <span className="font-medium">{dailyGoals.fat}g</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Water</span>
                          <span className="font-medium">{dailyGoals.water}ml</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>Complete your profile to view your health metrics</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-health-primary" />
                    Health Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="bg-health-primary rounded-full h-2 w-2 mt-2 mr-2"></div>
                      <span>Aim for at least 150 minutes of moderate exercise per week</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-health-primary rounded-full h-2 w-2 mt-2 mr-2"></div>
                      <span>Drink water regularly throughout the day</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-health-primary rounded-full h-2 w-2 mt-2 mr-2"></div>
                      <span>Include a variety of fruits and vegetables in your diet</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-health-primary rounded-full h-2 w-2 mt-2 mr-2"></div>
                      <span>Get 7-9 hours of quality sleep each night</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="bmi">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Weight className="mr-2 h-5 w-5 text-health-primary" />
                  BMI Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bmi-height">Height (cm)</Label>
                      <Input
                        id="bmi-height"
                        name="height"
                        type="number"
                        min="50"
                        max="250"
                        value={bmiCalculator.height}
                        onChange={handleBmiInputChange}
                        placeholder="Height in cm"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="bmi-weight">Weight (kg)</Label>
                      <Input
                        id="bmi-weight"
                        name="weight"
                        type="number"
                        min="20"
                        max="300"
                        value={bmiCalculator.weight}
                        onChange={handleBmiInputChange}
                        placeholder="Weight in kg"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={calculateBmiValue} className="w-full">Calculate BMI</Button>
                  
                  {bmiCalculator.bmi > 0 && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 mb-1">Your BMI</div>
                        <div className="text-3xl font-bold">{bmiCalculator.bmi.toFixed(1)}</div>
                        <div className="text-sm font-medium mt-1">
                          {bmiCalculator.category}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>BMI Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-2">
                    <span>Below 18.5</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Underweight
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2">
                    <span>18.5 - 24.9</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Normal weight
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2">
                    <span>25.0 - 29.9</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      Overweight
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-2">
                    <span>30.0 and Above</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Obesity
                    </span>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-600">
                    <p className="mb-2">
                      BMI is a screening tool, but it does not diagnose body fatness or health.
                    </p>
                    <p>
                      BMI does not account for factors like muscle mass, bone density, overall body
                      composition, and racial/ethnic differences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
