
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
  Star,
  Sparkles,
  Crown,
  Rocket,
  Diamond
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const RevolutionaryDashboard: React.FC = () => {
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
    const moodScore = todayMood.length > 0 ? (todayMood[0] as any).mood_score || 8 : 8;
    const waterGlasses = Math.round(todayWater / 250);

    return { calories, exerciseMinutes, sleepHours, moodScore, waterGlasses };
  }, [foodItems, exerciseItems, sleepRecords, moodRecords, getTodaysWaterIntake]);

  const weeklyData = [
    { day: 'Mon', calories: 2100, exercise: 45, sleep: 7.5, mood: 8, steps: 8500, weight: 75.2 },
    { day: 'Tue', calories: 1950, exercise: 60, sleep: 8.0, mood: 9, steps: 9200, weight: 75.0 },
    { day: 'Wed', calories: 2200, exercise: 30, sleep: 7.2, mood: 7, steps: 7800, weight: 74.8 },
    { day: 'Thu', calories: 2000, exercise: 75, sleep: 8.5, mood: 9, steps: 10500, weight: 74.6 },
    { day: 'Fri', calories: 2150, exercise: 50, sleep: 7.8, mood: 8, steps: 11200, weight: 74.5 },
    { day: 'Sat', calories: 2300, exercise: 90, sleep: 9.0, mood: 10, steps: 12800, weight: 74.3 },
    { day: 'Sun', calories: 2050, exercise: 40, sleep: 8.2, mood: 8, steps: 9500, weight: 74.2 }
  ];

  const nutritionBreakdown = [
    { name: 'Protein', value: 35, color: '#3B82F6', fill: '#3B82F6' },
    { name: 'Carbs', value: 45, color: '#10B981', fill: '#10B981' },
    { name: 'Fats', value: 20, color: '#F59E0B', fill: '#F59E0B' }
  ];

  const healthScore = Math.round(
    (Math.min(healthData.calories / 2200, 1) * 25) +
    (Math.min(healthData.exerciseMinutes / 60, 1) * 25) +
    (Math.min(healthData.sleepHours / 8, 1) * 25) +
    (healthData.moodScore / 10 * 25)
  );

  const radialData = [
    { name: 'Nutrition', value: Math.min(healthData.calories / 2200, 1) * 100, fill: '#10B981' },
    { name: 'Exercise', value: Math.min(healthData.exerciseMinutes / 60, 1) * 100, fill: '#3B82F6' },
    { name: 'Sleep', value: Math.min(healthData.sleepHours / 8, 1) * 100, fill: '#8B5CF6' },
    { name: 'Mood', value: healthData.moodScore * 10, fill: '#F59E0B' }
  ];

  const MetricCard = ({ 
    title, 
    value, 
    unit, 
    goal, 
    icon: Icon, 
    gradient,
    trend,
    subtitle 
  }: {
    title: string;
    value: number;
    unit: string;
    goal: number;
    icon: any;
    gradient: string;
    trend: number;
    subtitle: string;
  }) => {
    const percentage = Math.min((value / goal) * 100, 100);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;

    return (
      <Card className="group relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-0 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-15 transition-opacity duration-500`}></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/30 to-transparent rounded-bl-full"></div>
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl animate-pulse"></div>
        
        <CardContent className="relative p-8">
          <div className="flex items-start justify-between mb-6">
            <div className={`p-4 rounded-3xl bg-gradient-to-br ${gradient} shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div className="text-right space-y-2">
              <Badge 
                variant={isExcellent ? "default" : isGood ? "secondary" : "outline"} 
                className={cn(
                  "text-lg px-4 py-2 font-bold",
                  isExcellent && "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
                  isGood && "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                )}
              >
                {Math.round(percentage)}%
              </Badge>
              {trend !== 0 && (
                <div className={cn("flex items-center gap-2 justify-end", trend > 0 ? "text-green-500" : "text-red-500")}>
                  {trend > 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  <span className="text-sm font-bold">{Math.abs(trend)}%</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{subtitle}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  {value.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-gray-600 dark:text-gray-400">{unit}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Goal: {goal.toLocaleString()}{unit}</p>
            </div>
            
            <div className="space-y-3">
              <Progress value={percentage} className="h-4 bg-gray-200 dark:bg-gray-700" />
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className={cn(
                  "font-bold",
                  isExcellent ? "text-green-500" : isGood ? "text-blue-500" : "text-orange-500"
                )}>
                  {isExcellent ? 'Excellent!' : isGood ? 'Good Progress!' : 'Keep Going!'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-12">
      {/* Revolutionary Health Score Hero */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 border-0 shadow-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/30 to-pink-600/20"></div>
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-2xl animate-bounce"></div>
        
        <CardContent className="relative p-12">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <Crown className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Diamond className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent mb-2">
                  VitalitySync Score
                </h2>
                <p className="text-xl text-cyan-200 font-semibold">Elite Health Intelligence Platform</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
                {healthScore}
              </div>
              <div className="flex items-center gap-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-8 h-8",
                      i < Math.floor(healthScore / 20) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                    )} 
                  />
                ))}
              </div>
              <p className="text-lg font-bold text-cyan-200 mt-2">
                {healthScore >= 90 ? 'World Class' : healthScore >= 80 ? 'Elite Level' : healthScore >= 60 ? 'Strong Progress' : 'Building Foundation'}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {radialData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="60%" outerRadius="90%" data={[item]}>
                      <RadialBar dataKey="value" cornerRadius={10} fill={item.fill} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm font-bold text-cyan-200 mb-1">{item.name}</p>
                <p className="text-2xl font-black text-white">{Math.round(item.value)}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revolutionary Metrics Grid */}
      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 xl:grid-cols-4'}`}>
        <MetricCard
          title="Nutritional Excellence"
          value={healthData.calories}
          unit="kcal"
          goal={2200}
          icon={Flame}
          gradient="from-orange-500 via-red-500 to-pink-500"
          trend={12}
          subtitle="Optimal fuel for peak performance"
        />
        <MetricCard
          title="Active Performance"
          value={healthData.exerciseMinutes}
          unit="min"
          goal={60}
          icon={Activity}
          gradient="from-blue-500 via-indigo-500 to-purple-500"
          trend={8}
          subtitle="Building strength and endurance"
        />
        <MetricCard
          title="Recovery Mastery"
          value={healthData.sleepHours}
          unit="hrs"
          goal={8}
          icon={Moon}
          gradient="from-purple-500 via-violet-500 to-indigo-500"
          trend={-2}
          subtitle="Quality rest for optimal health"
        />
        <MetricCard
          title="Hydration Power"
          value={healthData.waterGlasses}
          unit="glasses"
          goal={8}
          icon={Droplets}
          gradient="from-cyan-500 via-blue-500 to-indigo-500"
          trend={15}
          subtitle="Essential for peak performance"
        />
      </div>

      {/* Advanced Analytics Section */}
      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
        {/* Weekly Progress Chart */}
        <Card className="col-span-2 bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Weekly Evolution
                </h3>
                <p className="text-sm text-gray-500">Advanced progress tracking</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="exerciseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                  <XAxis dataKey="day" tick={{ fontSize: 14, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 14, fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '16px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="exercise" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    fill="url(#exerciseGradient)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    fill="url(#moodGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Nutrition Breakdown */}
        <Card className="bg-gradient-to-br from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Macro Balance
                </h3>
                <p className="text-sm text-gray-500">Nutritional distribution</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nutritionBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    dataKey="value"
                    stroke="none"
                  >
                    {nutritionBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4 mt-6">
              {nutritionBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <span className="text-lg font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI-Powered Insights */}
      <Card className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 border-0 shadow-3xl">
        <CardContent className="p-10">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI Health Intelligence
              </h3>
              <p className="text-xl text-blue-200 font-semibold">Personalized insights powered by advanced analytics</p>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Outstanding Consistency!",
                description: "Your 7-day streak shows exceptional commitment. You're in the top 5% of users.",
                icon: Award,
                color: "from-yellow-400 to-orange-500",
                priority: "high"
              },
              {
                title: "Hydration Optimization",
                description: "Increase water intake by 20% during workout days for peak performance.",
                icon: Droplets,
                color: "from-cyan-400 to-blue-500",
                priority: "medium"
              },
              {
                title: "Sleep Enhancement Protocol",
                description: "Your REM sleep could improve with a 30-minute earlier bedtime routine.",
                icon: Moon,
                color: "from-purple-400 to-indigo-500",
                priority: "medium"
              },
              {
                title: "Protein Timing Optimization",
                description: "Post-workout protein within 30 minutes could boost recovery by 25%.",
                icon: Zap,
                color: "from-green-400 to-emerald-500",
                priority: "high"
              },
              {
                title: "Cardiovascular Excellence",
                description: "Your heart rate variability indicates excellent cardiovascular health.",
                icon: Heart,
                color: "from-red-400 to-pink-500",
                priority: "low"
              },
              {
                title: "Mental Wellness Peak",
                description: "Your mood patterns show optimal mental wellness balance.",
                icon: Sparkles,
                color: "from-pink-400 to-purple-500",
                priority: "low"
              }
            ].map((insight, index) => (
              <div key={index} className="relative p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${insight.color} shadow-lg`}>
                    <insight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white text-lg">{insight.title}</h4>
                      <Badge 
                        variant={insight.priority === 'high' ? 'destructive' : insight.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {insight.priority}
                      </Badge>
                    </div>
                    <p className="text-blue-200 leading-relaxed">{insight.description}</p>
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

export default RevolutionaryDashboard;
