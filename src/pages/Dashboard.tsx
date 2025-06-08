
import React from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Weight, Heart, Utensils } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { 
    userProfile, 
    dailyGoals,
    calculateBMI,
    getNutritionSummary,
    getExerciseSummary,
    getTodaysWaterIntake
  } = useHealth();

  const nutritionSummary = getNutritionSummary();
  const exerciseSummary = getExerciseSummary();
  const waterIntake = getTodaysWaterIntake();
  const bmi = calculateBMI();

  const remainingCalories = dailyGoals.calories - nutritionSummary.totalCalories + exerciseSummary.totalCaloriesBurned;

  // Calculate macro percentages for pie chart
  const totalMacroGrams = nutritionSummary.totalProtein + nutritionSummary.totalCarbs + nutritionSummary.totalFat;
  const macroData = [
    { name: 'Protein', value: nutritionSummary.totalProtein, color: '#3182CE' },
    { name: 'Carbs', value: nutritionSummary.totalCarbs, color: '#ED8936' },
    { name: 'Fat', value: nutritionSummary.totalFat, color: '#ECC94B' },
  ];

  const COLORS = ['#3182CE', '#ED8936', '#ECC94B'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      {!userProfile ? (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-700">
            Welcome! To get started, please set up your profile to customize your health tracking experience.
          </p>
          <a href="/profile" className="text-health-primary font-medium hover:underline mt-2 inline-block">
            Set up profile →
          </a>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Utensils className="mr-2 h-5 w-5 text-health-primary" />
                  Daily Calories
                </CardTitle>
                <CardDescription>Calories consumed vs. goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {nutritionSummary.totalCalories} / {dailyGoals.calories} kcal
                    </span>
                    <span className="text-sm text-gray-500">
                      {remainingCalories > 0 ? `${remainingCalories} kcal remaining` : 'Goal exceeded'}
                    </span>
                  </div>
                  <Progress 
                    value={(nutritionSummary.totalCalories / dailyGoals.calories) * 100} 
                    className="h-2" 
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    Burned: {exerciseSummary.totalCaloriesBurned} kcal
                  </div>
                </div>
              </CardContent>
            </Card>
          
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-health-primary" />
                  Exercise
                </CardTitle>
                <CardDescription>Today's activity summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Duration</span>
                    <span className="font-medium">{exerciseSummary.totalDuration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Calories Burned</span>
                    <span className="font-medium">{exerciseSummary.totalCaloriesBurned} kcal</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Weight className="mr-2 h-5 w-5 text-health-primary" />
                  Body Metrics
                </CardTitle>
                <CardDescription>Your health indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">Weight</span>
                    <span className="font-medium">{userProfile?.weight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">BMI</span>
                    <span className="font-medium">{bmi ? bmi.toFixed(1) : 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Water</span>
                    <span className="font-medium">{waterIntake} / {dailyGoals.water} ml</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Breakdown</CardTitle>
                <CardDescription>Today's macronutrient distribution</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                {totalMacroGrams > 0 ? (
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="w-48 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={macroData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {macroData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4 md:mt-0 md:ml-6">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-health-protein mr-2"></div>
                        <span className="text-sm">Protein: {nutritionSummary.totalProtein}g</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({totalMacroGrams ? Math.round((nutritionSummary.totalProtein / totalMacroGrams) * 100) : 0}%)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-health-carbs mr-2"></div>
                        <span className="text-sm">Carbs: {nutritionSummary.totalCarbs}g</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({totalMacroGrams ? Math.round((nutritionSummary.totalCarbs / totalMacroGrams) * 100) : 0}%)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-health-fat mr-2"></div>
                        <span className="text-sm">Fat: {nutritionSummary.totalFat}g</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({totalMacroGrams ? Math.round((nutritionSummary.totalFat / totalMacroGrams) * 100) : 0}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No nutrition data for today</p>
                    <a href="/food" className="text-health-primary hover:underline mt-2 inline-block">
                      Add food entry
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Nutrient Goals</CardTitle>
                <CardDescription>Daily progress toward your targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Protein</span>
                    <span className="text-sm text-gray-500">
                      {nutritionSummary.totalProtein}g / {dailyGoals.protein}g
                    </span>
                  </div>
                  <Progress 
                    value={(nutritionSummary.totalProtein / dailyGoals.protein) * 100} 
                    className="h-2 bg-gray-100" 
                    indicatorClassName="bg-health-protein" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Carbohydrates</span>
                    <span className="text-sm text-gray-500">
                      {nutritionSummary.totalCarbs}g / {dailyGoals.carbs}g
                    </span>
                  </div>
                  <Progress 
                    value={(nutritionSummary.totalCarbs / dailyGoals.carbs) * 100} 
                    className="h-2 bg-gray-100" 
                    indicatorClassName="bg-health-carbs" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Fat</span>
                    <span className="text-sm text-gray-500">
                      {nutritionSummary.totalFat}g / {dailyGoals.fat}g
                    </span>
                  </div>
                  <Progress 
                    value={(nutritionSummary.totalFat / dailyGoals.fat) * 100} 
                    className="h-2 bg-gray-100" 
                    indicatorClassName="bg-health-fat" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Water</span>
                    <span className="text-sm text-gray-500">
                      {waterIntake}ml / {dailyGoals.water}ml
                    </span>
                  </div>
                  <Progress 
                    value={(waterIntake / dailyGoals.water) * 100} 
                    className="h-2 bg-gray-100" 
                    indicatorClassName="bg-health-water" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
