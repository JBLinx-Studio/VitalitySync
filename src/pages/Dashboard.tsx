
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Target, 
  Brain,
  TrendingUp,
  Activity,
  Heart,
  Sparkles,
  Crown,
  Flame,
  Shield,
  Star,
  Rocket,
  Users,
  Award,
  Calendar,
  Clock,
  BarChart3,
  Apple,
  Moon,
  Droplets,
  Zap,
  Eye,
  RefreshCw,
  ChevronRight,
  Timer,
  Calculator
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { userProfile, foodItems, exerciseItems, sleepRecords, moodRecords, getTodaysWaterIntake } = useHealth();
  const { theme, colorTheme } = useTheme();
  const navigate = useNavigate();
  const { isMobile, isTablet } = useViewport();
  const [activeInsight, setActiveInsight] = useState(0);
  const [calculatingMetrics, setCalculatingMetrics] = useState(false);
  const [revealedSections, setRevealedSections] = useState<string[]>([]);

  // Smart data calculations with real-time updates
  const smartCalculations = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 604800000).toISOString().split('T')[0];
    
    // Today's metrics
    const todayFood = foodItems.filter(item => item.date === today);
    const todayExercise = exerciseItems.filter(item => item.date === today);
    const todaySleep = sleepRecords.filter(item => item.date === today);
    const todayMood = moodRecords.filter(item => item.date === today);
    
    // Yesterday's metrics for comparison
    const yesterdayFood = foodItems.filter(item => item.date === yesterday);
    const yesterdayExercise = exerciseItems.filter(item => item.date === yesterday);
    
    // Weekly metrics
    const weeklyFood = foodItems.filter(item => item.date >= weekAgo);
    const weeklyExercise = exerciseItems.filter(item => item.date >= weekAgo);
    const weeklySleep = sleepRecords.filter(item => item.date >= weekAgo);
    
    // Calculate totals and averages
    const todayCalories = todayFood.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    const yesterdayCalories = yesterdayFood.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    const todayExerciseMinutes = todayExercise.reduce((sum, item) => sum + item.duration, 0);
    const yesterdayExerciseMinutes = yesterdayExercise.reduce((sum, item) => sum + item.duration, 0);
    const todaySleepHours = todaySleep.length > 0 ? todaySleep[0].duration : 0;
    const todayMoodScore = todayMood.length > 0 ? (todayMood[0] as any).mood_score || 7 : 7;
    const todayWater = getTodaysWaterIntake();
    
    // Weekly averages
    const weeklyAvgCalories = weeklyFood.length > 0 ? weeklyFood.reduce((sum, item) => sum + (item.calories * item.quantity), 0) / 7 : 0;
    const weeklyAvgExercise = weeklyExercise.length > 0 ? weeklyExercise.reduce((sum, item) => sum + item.duration, 0) / 7 : 0;
    const weeklyAvgSleep = weeklySleep.length > 0 ? weeklySleep.reduce((sum, item) => sum + item.duration, 0) / weeklySleep.length : 0;
    
    // Calculate trends and percentages
    const caloriesTrend = yesterdayCalories > 0 ? ((todayCalories - yesterdayCalories) / yesterdayCalories) * 100 : 0;
    const exerciseTrend = yesterdayExerciseMinutes > 0 ? ((todayExerciseMinutes - yesterdayExerciseMinutes) / yesterdayExerciseMinutes) * 100 : 0;
    
    // Health score calculation
    const calorieGoal = userProfile?.goals?.calorieGoal || 2200;
    const exerciseGoal = userProfile?.goals?.exerciseGoal || 45;
    const sleepGoal = 8;
    const waterGoal = 2000; // ml
    
    const calorieScore = Math.min((todayCalories / calorieGoal) * 100, 100);
    const exerciseScore = Math.min((todayExerciseMinutes / exerciseGoal) * 100, 100);
    const sleepScore = Math.min((todaySleepHours / sleepGoal) * 100, 100);
    const waterScore = Math.min((todayWater / waterGoal) * 100, 100);
    const moodScore = (todayMoodScore / 10) * 100;
    
    const overallHealthScore = (calorieScore + exerciseScore + sleepScore + waterScore + moodScore) / 5;
    
    return {
      today: {
        calories: todayCalories,
        exercise: todayExerciseMinutes,
        sleep: todaySleepHours,
        mood: todayMoodScore,
        water: todayWater
      },
      trends: {
        calories: caloriesTrend,
        exercise: exerciseTrend
      },
      weekly: {
        avgCalories: weeklyAvgCalories,
        avgExercise: weeklyAvgExercise,
        avgSleep: weeklyAvgSleep
      },
      scores: {
        calories: calorieScore,
        exercise: exerciseScore,
        sleep: sleepScore,
        water: waterScore,
        mood: moodScore,
        overall: overallHealthScore
      },
      goals: {
        calories: calorieGoal,
        exercise: exerciseGoal,
        sleep: sleepGoal,
        water: waterGoal
      }
    };
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, userProfile, getTodaysWaterIntake]);

  // Progressive revelation of dashboard sections
  useEffect(() => {
    const revealSections = async () => {
      setCalculatingMetrics(true);
      const sections = ['profile', 'today', 'trends', 'goals', 'insights'];
      
      for (let i = 0; i < sections.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setRevealedSections(prev => [...prev, sections[i]]);
      }
      
      setCalculatingMetrics(false);
    };
    
    if (revealedSections.length === 0) {
      revealSections();
    }
  }, []);

  const insights = [
    {
      title: "Nutrition Balance",
      description: `Your daily calorie intake is ${smartCalculations.trends.calories > 0 ? 'higher' : 'lower'} than yesterday by ${Math.abs(smartCalculations.trends.calories).toFixed(1)}%`,
      score: smartCalculations.scores.calories,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Activity Level",
      description: `You're ${smartCalculations.scores.exercise >= 80 ? 'exceeding' : 'approaching'} your exercise goals with ${smartCalculations.today.exercise} minutes today`,
      score: smartCalculations.scores.exercise,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Recovery Quality",
      description: `Your sleep pattern shows ${smartCalculations.today.sleep >= 7 ? 'optimal' : 'room for improvement'} recovery time`,
      score: smartCalculations.scores.sleep,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Hydration Status",
      description: `Water intake is ${smartCalculations.scores.water >= 70 ? 'on track' : 'below optimal'} for today`,
      score: smartCalculations.scores.water,
      color: "from-cyan-500 to-blue-500"
    }
  ];

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getHealthScoreGradient = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-green-500";
    if (score >= 60) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-amber-50/30 to-red-50/50 dark:from-orange-950/30 dark:via-amber-950/20 dark:to-red-950/30 relative overflow-hidden">
      {/* Enhanced atmospheric background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-red-100/80 dark:from-orange-950 dark:via-amber-950/95 dark:to-red-950/90"></div>
        <div className={cn(
          "absolute bg-gradient-to-br from-orange-400/12 via-amber-500/15 to-red-500/12 rounded-full blur-3xl animate-vibrant-pulse opacity-60",
          isMobile ? "top-5 right-5 w-32 h-32" : "top-10 right-10 w-64 h-64"
        )}></div>
        <div className={cn(
          "absolute bg-gradient-to-tr from-blue-400/10 via-cyan-500/12 to-teal-500/10 rounded-full blur-3xl animate-vibrant-pulse delay-1000 opacity-60",
          isMobile ? "bottom-5 left-5 w-40 h-40" : "bottom-10 left-10 w-72 h-72"
        )}></div>
      </div>

      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8 md:space-y-12 relative z-10">
          {/* Smart Header with User Insights */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-vibrant">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent mb-2">
                  Smart Dashboard
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                  Your Intelligent Health Analytics
                </p>
              </div>
            </div>
          </div>

          {/* Smart Calculations Status */}
          {calculatingMetrics && (
            <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-blue-200/50 dark:border-blue-700/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-white animate-spin" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">
                      Analyzing Your Health Data
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      Processing metrics and calculating insights...
                    </p>
                  </div>
                  <RefreshCw className="w-5 h-5 text-blue-500 animate-spin ml-auto" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progressive Revelation Sections */}
          <div className="space-y-8">
            {/* User Profile Overview */}
            {revealedSections.includes('profile') && (
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-500" />
                    Profile Intelligence
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Live Data
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Health Score</p>
                      <div className="flex items-center gap-3">
                        <div className={cn("text-3xl font-bold", getHealthScoreColor(smartCalculations.scores.overall))}>
                          {smartCalculations.scores.overall.toFixed(0)}%
                        </div>
                        <div className={cn("px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r", getHealthScoreGradient(smartCalculations.scores.overall), "text-white")}>
                          {smartCalculations.scores.overall >= 80 ? 'Excellent' : smartCalculations.scores.overall >= 60 ? 'Good' : 'Improving'}
                        </div>
                      </div>
                      <Progress value={smartCalculations.scores.overall} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Active Days This Week</p>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {exerciseItems.filter(item => item.date >= new Date(Date.now() - 604800000).toISOString().split('T')[0]).length}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Consistency Streak</p>
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {Math.min(exerciseItems.length, 30)} days
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Today's Metrics */}
            {revealedSections.includes('today') && (
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    Today's Performance
                    <Badge variant="outline" className="ml-auto">
                      Live Updates
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-5 h-5 text-orange-600" />
                        <span className="text-sm font-medium">Calories</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                        {smartCalculations.today.calories.toLocaleString()}
                      </div>
                      <Progress 
                        value={(smartCalculations.today.calories / smartCalculations.goals.calories) * 100} 
                        className="h-2 mt-2" 
                      />
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                        Goal: {smartCalculations.goals.calories.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-medium">Exercise</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {smartCalculations.today.exercise}m
                      </div>
                      <Progress 
                        value={(smartCalculations.today.exercise / smartCalculations.goals.exercise) * 100} 
                        className="h-2 mt-2" 
                      />
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                        Goal: {smartCalculations.goals.exercise}m
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-medium">Sleep</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {smartCalculations.today.sleep}h
                      </div>
                      <Progress 
                        value={(smartCalculations.today.sleep / smartCalculations.goals.sleep) * 100} 
                        className="h-2 mt-2" 
                      />
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        Goal: {smartCalculations.goals.sleep}h
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="w-5 h-5 text-cyan-600" />
                        <span className="text-sm font-medium">Water</span>
                      </div>
                      <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">
                        {(smartCalculations.today.water / 1000).toFixed(1)}L
                      </div>
                      <Progress 
                        value={(smartCalculations.today.water / smartCalculations.goals.water) * 100} 
                        className="h-2 mt-2" 
                      />
                      <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">
                        Goal: {smartCalculations.goals.water / 1000}L
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trends Analysis */}
            {revealedSections.includes('trends') && (
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Trend Analysis
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      AI Insights
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Weekly Averages</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Calories</span>
                          <span className="font-medium">{smartCalculations.weekly.avgCalories.toFixed(0)}/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Exercise</span>
                          <span className="font-medium">{smartCalculations.weekly.avgExercise.toFixed(0)}m/day</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sleep</span>
                          <span className="font-medium">{smartCalculations.weekly.avgSleep.toFixed(1)}h/night</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700 dark:text-gray-300">Daily Changes</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Calories vs Yesterday</span>
                          <span className={cn("font-medium flex items-center gap-1", 
                            smartCalculations.trends.calories > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            <TrendingUp className="w-4 h-4" />
                            {smartCalculations.trends.calories > 0 ? '+' : ''}{smartCalculations.trends.calories.toFixed(1)}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Exercise vs Yesterday</span>
                          <span className={cn("font-medium flex items-center gap-1", 
                            smartCalculations.trends.exercise > 0 ? "text-green-600" : "text-red-600"
                          )}>
                            <TrendingUp className="w-4 h-4" />
                            {smartCalculations.trends.exercise > 0 ? '+' : ''}{smartCalculations.trends.exercise.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Smart Insights Carousel */}
            {revealedSections.includes('insights') && (
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-500" />
                    AI Health Insights
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Personalized
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all duration-500 cursor-pointer",
                          activeInsight === index 
                            ? "border-purple-500 bg-white/80 dark:bg-slate-800/80 shadow-lg scale-105" 
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                        )}
                        onClick={() => setActiveInsight(index)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br", insight.color, "flex items-center justify-center")}>
                            <Brain className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                              {insight.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                              {insight.description}
                            </p>
                            <div className="flex items-center gap-3">
                              <Progress value={insight.score} className="h-2 flex-1" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {insight.score.toFixed(0)}%
                              </span>
                            </div>
                          </div>
                          <ChevronRight className={cn("w-5 h-5 text-gray-400 transition-transform", activeInsight === index && "rotate-90")} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            {revealedSections.includes('insights') && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                <Button 
                  onClick={() => navigate('/food')}
                  className="h-20 bg-gradient-to-br from-orange-500 to-red-500 hover:shadow-xl transition-all duration-300 flex-col gap-2"
                >
                  <Apple className="w-6 h-6" />
                  <span>Log Meal</span>
                </Button>
                <Button 
                  onClick={() => navigate('/exercise')}
                  className="h-20 bg-gradient-to-br from-blue-500 to-cyan-500 hover:shadow-xl transition-all duration-300 flex-col gap-2"
                >
                  <Activity className="w-6 h-6" />
                  <span>Add Workout</span>
                </Button>
                <Button 
                  onClick={() => navigate('/sleep')}
                  className="h-20 bg-gradient-to-br from-purple-500 to-pink-500 hover:shadow-xl transition-all duration-300 flex-col gap-2"
                >
                  <Moon className="w-6 h-6" />
                  <span>Log Sleep</span>
                </Button>
                <Button 
                  onClick={() => navigate('/mental')}
                  className="h-20 bg-gradient-to-br from-emerald-500 to-teal-500 hover:shadow-xl transition-all duration-300 flex-col gap-2"
                >
                  <Heart className="w-6 h-6" />
                  <span>Mood Check</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
