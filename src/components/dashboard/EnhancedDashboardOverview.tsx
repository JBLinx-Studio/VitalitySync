
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Heart, 
  Flame, 
  Moon, 
  Droplets, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Award,
  Zap,
  Brain,
  Shield,
  Star
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const EnhancedDashboardOverview: React.FC = () => {
  const { 
    userProfile, 
    foodItems, 
    exerciseItems, 
    sleepRecords, 
    moodRecords,
    getTodaysWaterIntake
  } = useHealth();
  const { isMobile } = useViewport();

  const healthData = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    const todayFood = foodItems.filter(item => item.date === today);
    const todayExercise = exerciseItems.filter(item => item.date === today);
    const todaySleep = sleepRecords.filter(item => item.date === today);
    const todayMood = moodRecords.filter(item => item.date === today);
    const todayWater = getTodaysWaterIntake();

    const calories = todayFood.reduce((sum, item) => sum + (item.calories * item.quantity), 0);
    const exerciseMinutes = todayExercise.reduce((sum, item) => sum + item.duration, 0);
    const sleepHours = todaySleep.length > 0 ? todaySleep[0].duration : 0;
    const moodScore = todayMood.length > 0 ? (todayMood[0] as any).mood_score || 7 : 7;
    const waterGlasses = Math.round(todayWater / 250);

    return { calories, exerciseMinutes, sleepHours, moodScore, waterGlasses };
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, getTodaysWaterIntake]);

  const weeklyData = [
    { day: 'Mon', calories: 2100, exercise: 45, sleep: 7.5, mood: 8, steps: 8500 },
    { day: 'Tue', calories: 1950, exercise: 60, sleep: 8.0, mood: 9, steps: 9200 },
    { day: 'Wed', calories: 2200, exercise: 30, sleep: 7.2, mood: 7, steps: 7800 },
    { day: 'Thu', calories: 2000, exercise: 75, sleep: 8.5, mood: 9, steps: 10500 },
    { day: 'Fri', calories: 2150, exercise: 50, sleep: 7.8, mood: 8, steps: 11200 },
    { day: 'Sat', calories: 2300, exercise: 90, sleep: 9.0, mood: 10, steps: 12800 },
    { day: 'Sun', calories: 2050, exercise: 40, sleep: 8.2, mood: 8, steps: 9500 }
  ];

  const nutritionBreakdown = [
    { name: 'Protein', value: 35, color: '#3B82F6' },
    { name: 'Carbs', value: 45, color: '#10B981' },
    { name: 'Fats', value: 20, color: '#F59E0B' }
  ];

  const healthScore = Math.round(
    (Math.min(healthData.calories / 2200, 1) * 25) +
    (Math.min(healthData.exerciseMinutes / 60, 1) * 25) +
    (Math.min(healthData.sleepHours / 8, 1) * 25) +
    (healthData.moodScore / 10 * 25)
  );

  const StatCard = ({ 
    title, 
    value, 
    unit, 
    goal, 
    icon: Icon, 
    color, 
    trend, 
    gradient 
  }: {
    title: string;
    value: number;
    unit: string;
    goal: number;
    icon: any;
    color: string;
    trend: number;
    gradient: string;
  }) => {
    const percentage = Math.min((value / goal) * 100, 100);
    const isOnTrack = percentage >= 80;

    return (
      <Card className="group relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-bl-full"></div>
        
        <CardContent className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <Badge variant={isOnTrack ? "default" : "secondary"} className="mb-2">
                {Math.round(percentage)}%
              </Badge>
              {trend !== 0 && (
                <div className={cn("flex items-center gap-1", trend > 0 ? "text-green-500" : "text-red-500")}>
                  {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-xs font-medium">{Math.abs(trend)}%</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-gray-900 dark:text-gray-100">
                  {value.toLocaleString()}
                </span>
                <span className={`text-sm font-medium ${color}`}>{unit}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Goal: {goal.toLocaleString()}{unit}</p>
            </div>
            
            <div className="space-y-2">
              <Progress value={percentage} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Current</span>
                <span>{isOnTrack ? 'On Track!' : 'Keep Going!'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Hero Health Score */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-950/50 dark:via-slate-900/80 dark:to-cyan-950/50 border-0 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-cyan-500/10"></div>
        <CardContent className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                  Health Score
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Overall wellness index</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                {healthScore}
              </div>
              <div className="flex items-center gap-2 justify-center mt-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {healthScore >= 80 ? 'Excellent' : healthScore >= 60 ? 'Good' : 'Needs Attention'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'Nutrition', value: Math.min(healthData.calories / 2200, 1) * 100, color: 'from-green-500 to-emerald-500' },
              { label: 'Exercise', value: Math.min(healthData.exerciseMinutes / 60, 1) * 100, color: 'from-orange-500 to-red-500' },
              { label: 'Sleep', value: Math.min(healthData.sleepHours / 8, 1) * 100, color: 'from-purple-500 to-indigo-500' },
              { label: 'Mood', value: healthData.moodScore * 10, color: 'from-pink-500 to-rose-500' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{item.label}</p>
                <p className="text-sm font-bold">{Math.round(item.value)}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
        <StatCard
          title="Daily Nutrition"
          value={healthData.calories}
          unit="kcal"
          goal={2200}
          icon={Flame}
          color="text-orange-500"
          trend={8}
          gradient="from-orange-500 to-red-500"
        />
        <StatCard
          title="Active Minutes"
          value={healthData.exerciseMinutes}
          unit="min"
          goal={60}
          icon={Activity}
          color="text-blue-500"
          trend={12}
          gradient="from-blue-500 to-indigo-500"
        />
        <StatCard
          title="Quality Sleep"
          value={healthData.sleepHours}
          unit="hrs"
          goal={8}
          icon={Moon}
          color="text-purple-500"
          trend={-3}
          gradient="from-purple-500 to-indigo-500"
        />
        <StatCard
          title="Hydration"
          value={healthData.waterGlasses}
          unit="glasses"
          goal={8}
          icon={Droplets}
          color="text-cyan-500"
          trend={15}
          gradient="from-cyan-500 to-blue-500"
        />
      </div>

      {/* Charts Section */}
      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {/* Weekly Trends */}
        <Card className="col-span-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Weekly Progress</h3>
                <p className="text-sm text-gray-500">7-day activity overview</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="exercise" 
                    stackId="1"
                    stroke="#3B82F6" 
                    fill="#3B82F6"
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mood" 
                    stackId="2"
                    stroke="#10B981" 
                    fill="#10B981"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Breakdown */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Nutrition Split</h3>
                <p className="text-sm text-gray-500">Macro distribution</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nutritionBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {nutritionBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {nutritionBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-pink-950/30 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Health Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Personalized recommendations based on your data</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Excellent Progress!",
                description: "Your consistency this week is outstanding. Keep up the great work!",
                icon: Award,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Hydration Boost Needed",
                description: "Try to increase water intake by 2 glasses for optimal performance.",
                icon: Droplets,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Sleep Optimization",
                description: "Your sleep pattern is good, but try going to bed 30 minutes earlier.",
                icon: Moon,
                color: "from-purple-500 to-indigo-500"
              }
            ].map((insight, index) => (
              <div key={index} className="p-4 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-xl border border-white/20">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${insight.color}`}>
                    <insight.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboardOverview;
