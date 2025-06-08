
import React from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Weight, Heart, Utensils, CigaretteOff, Brain, Award, Moon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart } from 'recharts';
import NotificationsMenu from '@/components/Notifications/NotificationsMenu';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useNavigate } from 'react-router-dom';

const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Dashboard: React.FC = () => {
  const { 
    userProfile, 
    dailyGoals,
    calculateBMI,
    getNutritionSummary,
    getExerciseSummary,
    getTodaysWaterIntake,
    getSleepSummary,
    getMoodSummary,
    addictionRecords,
    getAddictionSummary
  } = useHealth();

  const navigate = useNavigate();
  const nutritionSummary = getNutritionSummary();
  const exerciseSummary = getExerciseSummary();
  const waterIntake = getTodaysWaterIntake();
  const sleepSummary = getSleepSummary();
  const moodSummary = getMoodSummary();
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

  // Get addiction data if available
  const hasAddictionData = addictionRecords.length > 0;
  const smokingSummary = hasAddictionData ? getAddictionSummary('smoking') : null;
  
  // Prepare weekly metrics data
  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    const sortedDays = [...days.slice(today + 1), ...days.slice(0, today + 1)];
    
    return sortedDays.map(day => ({
      name: day,
      calories: Math.floor(Math.random() * 500) + 1500,
      exercise: Math.floor(Math.random() * 60) + 20,
      sleep: Math.floor(Math.random() * 2) + 6,
      mood: Math.floor(Math.random() * 3) + 3,
    }));
  };
  
  const weeklyData = getWeeklyData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Health Dashboard</h1>
        <div className="flex items-center gap-3">
          <NotificationsMenu />
        </div>
      </div>

      {!userProfile ? (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <p className="text-yellow-700">
            Welcome! To get started, please set up your profile to customize your health tracking experience.
          </p>
          <Button 
            variant="link" 
            className="text-health-primary font-medium hover:underline mt-2 p-0"
            onClick={() => navigate('/profile')}
          >
            Set up profile →
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => navigate('/food')}
                  >
                    Track Food
                  </Button>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate('/exercise')}
                  >
                    Track Exercise
                  </Button>
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
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate('/body')}
                  >
                    Body Measurements
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className={hasAddictionData ? "" : "bg-gray-50"}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <CigaretteOff className="mr-2 h-5 w-5 text-health-primary" />
                  Addiction Recovery
                </CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent>
                {hasAddictionData && smokingSummary ? (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Today's usage</span>
                      <span className="font-medium">{smokingSummary.totalToday} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Avg. daily</span>
                      <span className="font-medium">{smokingSummary.averageDaily.toFixed(1)} items</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Streak</span>
                      <span className="font-medium">{smokingSummary.streakDays} days</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3"
                      onClick={() => navigate('/addiction')}
                    >
                      Manage Addictions
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[100px]">
                    <p className="text-sm text-gray-500 text-center mb-3">
                      Start tracking addictions to see your progress
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/addiction')}
                    >
                      Start Tracking
                    </Button>
                  </div>
                )}
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
                          <Tooltip />
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
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => navigate('/food')}
                      >
                        Nutrition Details
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No nutrition data for today</p>
                    <Button 
                      variant="link" 
                      className="text-health-primary hover:underline mt-2"
                      onClick={() => navigate('/food')}
                    >
                      Add food entry
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Weekly Health Overview</CardTitle>
                <CardDescription>Track your progress across metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ChartContainer
                    config={{
                      calories: { label: "Calories", color: "#EC4899" },
                      exercise: { label: "Exercise (min)", color: "#3B82F6" },
                      sleep: { label: "Sleep (hrs)", color: "#8B5CF6" },
                      mood: { label: "Mood", color: "#10B981" }
                    }}
                  >
                    <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="calories"
                        strokeWidth={2}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="exercise"
                        strokeWidth={2}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sleep"
                        strokeWidth={2}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        strokeWidth={2}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Moon className="mr-2 h-5 w-5 text-health-primary" />
                  Sleep Quality
                </CardTitle>
                <CardDescription>Your sleep patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Duration</span>
                    <span className="font-medium">{sleepSummary.averageDuration.toFixed(1)} hrs</span>
                  </div>
                  <Progress 
                    value={(sleepSummary.averageDuration / dailyGoals.sleep) * 100} 
                    className="h-2" 
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Rating</span>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.round(sleepSummary.averageQuality/2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => navigate('/sleep')}
                  >
                    Sleep Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Brain className="mr-2 h-5 w-5 text-health-primary" />
                  Mental Wellness
                </CardTitle>
                <CardDescription>Your emotional health</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Predominant Mood</span>
                    <span className="font-medium capitalize">{moodSummary.predominantMood}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Stress Level</span>
                    <div className="bg-gray-100 rounded-full h-2 w-24">
                      <div 
                        className="bg-orange-400 rounded-full h-2" 
                        style={{ width: `${(moodSummary.averageStressLevel / 10) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{moodSummary.averageStressLevel.toFixed(1)}/10</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate('/mental')}
                  >
                    Mental Wellness Details
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="mr-2 h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
                <CardDescription>Your health milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Streak Days</span>
                    <span className="font-medium">{smokingSummary?.streakDays || 0} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Exercise Sessions</span>
                    <span className="font-medium">{exerciseSummary.totalDuration > 0 ? '1' : '0'} today</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Water Goal</span>
                    <span className="font-medium">
                      {waterIntake >= dailyGoals.water ? 'Achieved' : `${Math.round((waterIntake / dailyGoals.water) * 100)}%`}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-3"
                    onClick={() => navigate('/achievements')}
                  >
                    View All Achievements
                  </Button>
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
