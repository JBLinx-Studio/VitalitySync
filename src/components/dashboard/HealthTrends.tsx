
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  BarChart3,
  LineChart,
  Activity,
  Target,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const HealthTrends: React.FC = () => {
  const { isMobile } = useViewport();

  // Enhanced trend data with more realistic patterns
  const weeklyTrends = [
    { day: 'Mon', steps: 8500, calories: 2100, sleep: 7.5, mood: 7, heartRate: 72, hydration: 85 },
    { day: 'Tue', steps: 9200, calories: 1950, sleep: 8.0, mood: 8, heartRate: 68, hydration: 90 },
    { day: 'Wed', steps: 7800, calories: 2200, sleep: 7.2, mood: 6, heartRate: 75, hydration: 80 },
    { day: 'Thu', steps: 10500, calories: 2000, sleep: 8.5, mood: 9, heartRate: 65, hydration: 95 },
    { day: 'Fri', steps: 11200, calories: 2150, sleep: 7.8, mood: 8, heartRate: 70, hydration: 88 },
    { day: 'Sat', steps: 12800, calories: 2300, sleep: 9.0, mood: 9, heartRate: 62, hydration: 92 },
    { day: 'Sun', steps: 9500, calories: 2050, sleep: 8.2, mood: 8, heartRate: 67, hydration: 87 }
  ];

  const monthlyProgress = [
    { month: 'Jan', weight: 75.2, bodyFat: 15.1, muscle: 41.8, performance: 82 },
    { month: 'Feb', weight: 74.8, bodyFat: 14.6, muscle: 42.1, performance: 84 },
    { month: 'Mar', weight: 74.3, bodyFat: 14.2, muscle: 42.4, performance: 87 },
    { month: 'Apr', weight: 73.9, bodyFat: 13.8, muscle: 42.7, performance: 89 },
    { month: 'May', weight: 73.5, bodyFat: 13.4, muscle: 43.0, performance: 91 },
    { month: 'Jun', weight: 73.1, bodyFat: 13.0, muscle: 43.3, performance: 94 }
  ];

  const trendInsights = [
    {
      title: 'Weekly Activity Surge',
      value: '+18%',
      description: 'Consistent step increases with weekend peaks',
      trend: 'up',
      color: 'emerald',
      impact: 'Excellent cardiovascular improvement',
      prediction: 'Continue this momentum for 2 more weeks'
    },
    {
      title: 'Sleep Quality Enhancement',
      value: '+12%',
      description: 'Better sleep duration and consistency',
      trend: 'up',
      color: 'blue',
      impact: 'Enhanced recovery and energy levels',
      prediction: 'Optimal sleep pattern developing'
    },
    {
      title: 'Body Composition Progress',
      value: '-2.8%',
      description: 'Body fat reduction with muscle gain',
      trend: 'down',
      color: 'purple',
      impact: 'Ideal body recomposition occurring',
      prediction: 'Target body fat in 6-8 weeks'
    },
    {
      title: 'Mental Wellness Boost',
      value: '+22%',
      description: 'Mood scores consistently improving',
      trend: 'up',
      color: 'orange',
      impact: 'Stress resilience building effectively',
      prediction: 'Peak mental state approaching'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-4 shadow-2xl">
          <p className="font-bold text-gray-900 dark:text-gray-100 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-semibold">{entry.dataKey}:</span> {entry.value}
              {entry.dataKey === 'steps' && ' steps'}
              {entry.dataKey === 'mood' && '/10'}
              {entry.dataKey === 'heartRate' && ' bpm'}
              {entry.dataKey === 'hydration' && '%'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-10">
      {/* Enhanced Trend Insights Overview */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 via-blue-50/20 to-purple-50/30 dark:from-emerald-950/30 dark:via-blue-950/20 dark:to-purple-950/30 rounded-3xl blur-3xl"></div>
        
        <div className={cn("relative grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4")}>
          {trendInsights.map((insight, index) => (
            <Card key={index} className="group bg-white/25 dark:bg-slate-900/25 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 hover:shadow-2xl transition-all duration-500 hover:scale-105 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
              
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
                    insight.trend === 'up' 
                      ? `bg-gradient-to-br from-${insight.color}-100 to-${insight.color}-200 dark:from-${insight.color}-900/60 dark:to-${insight.color}-800/60` 
                      : "bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60"
                  )}>
                    {insight.trend === 'up' ? (
                      <TrendingUp className={`w-6 h-6 text-${insight.color}-600`} />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    7 days
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{insight.title}</h3>
                  <div className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    {insight.value}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{insight.description}</p>
                  <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Impact:</p>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{insight.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Enhanced Weekly Activity Trends */}
      <Card className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
        
        <CardHeader className="relative z-10 pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
              <LineChart className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Weekly Activity Intelligence
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced multi-metric trend analysis</p>
            </div>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Insights
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#3B82F6" 
                  strokeWidth={4}
                  dot={{ fill: '#3B82F6', strokeWidth: 3, r: 8 }}
                  activeDot={{ r: 10, stroke: '#3B82F6', strokeWidth: 3, fill: '#ffffff' }}
                  name="Steps"
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#10B981" 
                  strokeWidth={4}
                  dot={{ fill: '#10B981', strokeWidth: 3, r: 8 }}
                  activeDot={{ r: 10, stroke: '#10B981', strokeWidth: 3, fill: '#ffffff' }}
                  name="Mood"
                />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#EF4444" 
                  strokeWidth={4}
                  dot={{ fill: '#EF4444', strokeWidth: 3, r: 8 }}
                  activeDot={{ r: 10, stroke: '#EF4444', strokeWidth: 3, fill: '#ffffff' }}
                  name="Heart Rate"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Body Composition Progress */}
      <Card className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
        
        <CardHeader className="relative z-10 pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Body Composition Evolution
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive transformation tracking</p>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              6 Months Journey
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: 'currentColor' }}
                  axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stackId="1"
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.4}
                  strokeWidth={3}
                  name="Weight (kg)"
                />
                <Area 
                  type="monotone" 
                  dataKey="muscle" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.4}
                  strokeWidth={3}
                  name="Muscle (kg)"
                />
                <Area 
                  type="monotone" 
                  dataKey="performance" 
                  stackId="3"
                  stroke="#F59E0B" 
                  fill="#F59E0B"
                  fillOpacity={0.4}
                  strokeWidth={3}
                  name="Performance Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Performance Metrics */}
      <div className={cn("grid gap-8", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        <Card className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/40 dark:to-indigo-950/40 backdrop-blur-2xl border border-blue-200/60 dark:border-blue-700/60 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 dark:from-slate-800/20 dark:to-slate-800/10"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300">Performance Index</h3>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">Overall fitness assessment</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10 text-center space-y-6">
            <div className="relative">
              <div className="text-6xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                94
              </div>
              <div className="absolute -top-2 -right-8">
                <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                Elite performance level achieved
              </p>
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2">
                <Award className="w-3 h-3 mr-1" />
                +7 points this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-950/40 dark:to-teal-950/40 backdrop-blur-2xl border border-emerald-200/60 dark:border-emerald-700/60 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 dark:from-slate-800/20 dark:to-slate-800/10"></div>
          
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">Goals Mastery</h3>
                <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">Weekly targets completion</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="relative z-10 text-center space-y-6">
            <div className="relative">
              <div className="text-6xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                96%
              </div>
              <div className="absolute -top-2 -right-8">
                <Sparkles className="w-8 h-8 text-yellow-500 animate-star-twinkle" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80">
                Exceptional consistency and dedication
              </p>
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2">
                <Award className="w-3 h-3 mr-1" />
                Champion Status
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTrends;
