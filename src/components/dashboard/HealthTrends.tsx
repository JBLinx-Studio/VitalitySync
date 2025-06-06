
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
  Target
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const HealthTrends: React.FC = () => {
  const { isMobile } = useViewport();

  // Mock trend data
  const weeklyTrends = [
    { day: 'Mon', steps: 8500, calories: 2100, sleep: 7.5, mood: 7 },
    { day: 'Tue', steps: 9200, calories: 1950, sleep: 8.0, mood: 8 },
    { day: 'Wed', steps: 7800, calories: 2200, sleep: 7.2, mood: 6 },
    { day: 'Thu', steps: 10500, calories: 2000, sleep: 8.5, mood: 9 },
    { day: 'Fri', steps: 11200, calories: 2150, sleep: 7.8, mood: 8 },
    { day: 'Sat', steps: 12800, calories: 2300, sleep: 9.0, mood: 9 },
    { day: 'Sun', steps: 9500, calories: 2050, sleep: 8.2, mood: 8 }
  ];

  const monthlyProgress = [
    { month: 'Jan', weight: 75, bodyFat: 15, muscle: 42 },
    { month: 'Feb', weight: 74.5, bodyFat: 14.5, muscle: 42.2 },
    { month: 'Mar', weight: 74, bodyFat: 14, muscle: 42.5 },
    { month: 'Apr', weight: 73.5, bodyFat: 13.5, muscle: 42.8 },
    { month: 'May', weight: 73.2, bodyFat: 13.2, muscle: 43 },
    { month: 'Jun', weight: 72.8, bodyFat: 12.8, muscle: 43.3 }
  ];

  const trendInsights = [
    {
      title: 'Weekly Activity',
      value: '+12%',
      description: 'Steps increased consistently',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Sleep Quality',
      value: '+8%',
      description: 'Better sleep duration',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Body Composition',
      value: '-2.1%',
      description: 'Body fat percentage down',
      trend: 'down',
      color: 'purple'
    },
    {
      title: 'Mood Score',
      value: '+15%',
      description: 'Mental wellness improving',
      trend: 'up',
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trend Insights Overview */}
      <div className={cn("grid gap-6", isMobile ? "grid-cols-2" : "grid-cols-4")}>
        {trendInsights.map((insight, index) => (
          <Card key={index} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  insight.trend === 'up' ? "bg-green-100 dark:bg-green-900/40" : "bg-blue-100 dark:bg-blue-900/40"
                )}>
                  {insight.trend === 'up' ? (
                    <TrendingUp className={cn("w-4 h-4", insight.trend === 'up' ? "text-green-500" : "text-blue-500")} />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <Badge variant="secondary" className="text-xs">
                  7 days
                </Badge>
              </div>
              
              <h3 className="font-semibold text-sm mb-1">{insight.title}</h3>
              <div className="text-2xl font-bold mb-2">{insight.value}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Activity Trends */}
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <LineChart className="w-6 h-6 text-blue-500" />
            Weekly Activity Trends
            <Badge variant="secondary" className="ml-auto">Last 7 Days</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Body Composition Progress */}
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            Body Composition Progress
            <Badge variant="secondary" className="ml-auto">6 Months</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="weight" 
                  stackId="1"
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="muscle" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-blue-500" />
              Performance Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-blue-600">87</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Based on activity, recovery, and consistency
              </div>
              <Badge className="bg-blue-500 text-white">
                +5 points this week
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Target className="w-6 h-6 text-green-500" />
              Goals Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-5xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Weekly goals completion rate
              </div>
              <Badge className="bg-green-500 text-white">
                Excellent progress
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthTrends;
