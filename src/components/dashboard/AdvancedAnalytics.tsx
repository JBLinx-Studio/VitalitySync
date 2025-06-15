
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Heart,
  Brain,
  Zap,
  Target,
  Calendar,
  Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const AdvancedAnalytics: React.FC = () => {
  const { 
    userProfile, 
    foodItems, 
    exerciseItems, 
    sleepRecords, 
    moodRecords,
    getTodaysWaterIntake
  } = useHealth();
  const { isMobile } = useViewport();

  const weeklyData = [
    { day: 'Mon', calories: 2100, exercise: 45, sleep: 7.5, mood: 8, steps: 8500, weight: 75.2 },
    { day: 'Tue', calories: 1950, exercise: 60, sleep: 8.0, mood: 9, steps: 9200, weight: 75.0 },
    { day: 'Wed', calories: 2200, exercise: 30, sleep: 7.2, mood: 7, steps: 7800, weight: 74.8 },
    { day: 'Thu', calories: 2000, exercise: 75, sleep: 8.5, mood: 9, steps: 10500, weight: 74.6 },
    { day: 'Fri', calories: 2150, exercise: 50, sleep: 7.8, mood: 8, steps: 11200, weight: 74.5 },
    { day: 'Sat', calories: 2300, exercise: 90, sleep: 9.0, mood: 10, steps: 12800, weight: 74.3 },
    { day: 'Sun', calories: 2050, exercise: 40, sleep: 8.2, mood: 8, steps: 9500, weight: 74.2 }
  ];

  const monthlyTrends = [
    { month: 'Jan', avgWeight: 76.5, avgSleep: 7.2, avgMood: 7.5, totalWorkouts: 20 },
    { month: 'Feb', avgWeight: 75.8, avgSleep: 7.5, avgMood: 8.0, totalWorkouts: 22 },
    { month: 'Mar', avgWeight: 75.2, avgSleep: 7.8, avgMood: 8.2, totalWorkouts: 25 },
    { month: 'Apr', avgWeight: 74.6, avgSleep: 8.0, avgMood: 8.5, totalWorkouts: 28 },
    { month: 'May', avgWeight: 74.2, avgSleep: 8.2, avgMood: 8.8, totalWorkouts: 30 },
    { month: 'Jun', avgWeight: 74.0, avgSleep: 8.1, avgMood: 9.0, totalWorkouts: 32 }
  ];

  const performanceMetrics = [
    { name: 'Strength', current: 85, target: 90, trend: 8 },
    { name: 'Endurance', current: 78, target: 85, trend: 12 },
    { name: 'Flexibility', current: 72, target: 80, trend: 5 },
    { name: 'Balance', current: 88, target: 90, trend: 3 }
  ];

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/50 dark:via-slate-900/80 dark:to-indigo-950/50 border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-xl">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Advanced Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Deep insights into your health performance</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics Grid */}
      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-lg">{metric.name}</h3>
                <div className={cn(
                  "flex items-center gap-1 text-sm",
                  metric.trend > 0 ? "text-green-500" : "text-red-500"
                )}>
                  {metric.trend > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.trend}%
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">{metric.current}</span>
                  <span className="text-sm text-gray-500">/ {metric.target}</span>
                </div>
                <Progress value={(metric.current / metric.target) * 100} className="h-3" />
                <div className="text-xs text-gray-500">
                  {Math.round((metric.current / metric.target) * 100)}% of target
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Advanced Charts */}
      <div className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {/* Weekly Progress */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Weekly Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
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

        {/* Monthly Trends */}
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgWeight" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="totalWorkouts" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Insights */}
      <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/30 dark:via-slate-900/80 dark:to-pink-950/30 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Performance Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">AI-powered analysis of your health data</p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Peak Performance Days",
                value: "Tue & Thu",
                description: "Your body performs best mid-week",
                icon: Zap,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Optimal Recovery Time",
                value: "8.2 hours",
                description: "Your ideal sleep duration for best performance",
                icon: Clock,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Target Heart Rate Zone",
                value: "145-165 BPM",
                description: "Your optimal cardio training zone",
                icon: Heart,
                color: "from-red-500 to-pink-500"
              }
            ].map((insight, index) => (
              <div key={index} className="p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-xl border border-white/20">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${insight.color}`}>
                    <insight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{insight.title}</h4>
                    <p className="text-2xl font-black text-gray-900 dark:text-white mb-2">{insight.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
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

export default AdvancedAnalytics;
