
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Zap,
  Award,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';

const NutritionInsights: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const macroData = [
    { name: 'Protein', value: 25, color: '#3B82F6', goal: 30 },
    { name: 'Carbs', value: 45, color: '#10B981', goal: 50 },
    { name: 'Fat', value: 30, color: '#F59E0B', goal: 20 }
  ];

  const weeklyTrends = [
    { day: 'Mon', calories: 1850, protein: 120, carbs: 180, fat: 65 },
    { day: 'Tue', calories: 1950, protein: 135, carbs: 195, fat: 70 },
    { day: 'Wed', calories: 1780, protein: 115, carbs: 165, fat: 62 },
    { day: 'Thu', calories: 2100, protein: 145, carbs: 220, fat: 78 },
    { day: 'Fri', calories: 1920, protein: 128, carbs: 185, fat: 68 },
    { day: 'Sat', calories: 2200, protein: 150, carbs: 240, fat: 85 },
    { day: 'Sun', calories: 1650, protein: 105, carbs: 145, fat: 58 }
  ];

  const aiInsights = [
    {
      type: 'success',
      title: 'Protein Goal Achieved!',
      message: 'You\'ve consistently hit your protein targets this week. Great job maintaining muscle-building nutrition!',
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      type: 'warning',
      title: 'Hydration Alert',
      message: 'Your water intake has been below optimal levels. Aim for 8-10 glasses daily for better performance.',
      icon: AlertCircle,
      color: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      type: 'tip',
      title: 'Meal Timing Optimization',
      message: 'Consider eating protein within 30 minutes post-workout to maximize muscle recovery and growth.',
      icon: Lightbulb,
      color: 'text-blue-600 dark:text-blue-400'
    }
  ];

  const nutritionScore = 78;
  const improvementAreas = [
    { area: 'Fiber Intake', current: 18, target: 25, unit: 'g' },
    { area: 'Omega-3', current: 0.8, target: 1.5, unit: 'g' },
    { area: 'Vitamin D', current: 12, target: 20, unit: 'mcg' },
    { area: 'Magnesium', current: 280, target: 400, unit: 'mg' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-vibrant">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 bg-clip-text text-transparent">
              Nutrition Intelligence
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              AI-powered insights for optimal nutrition
            </p>
          </div>
        </div>
      </div>

      {/* Nutrition Score Card */}
      <GlassCard variant="premium" className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(156, 163, 175, 0.3)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#nutritionGradient)"
                  strokeWidth="3"
                  strokeDasharray={`${nutritionScore}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="nutritionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{nutritionScore}</span>
                <span className="text-sm text-gray-500">Nutrition Score</span>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
              <Award className="w-3 h-3 mr-1" />
              Above Average
            </Badge>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              AI Nutrition Insights
            </h3>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-purple-200/30 dark:border-purple-700/30">
                  <insight.icon className={cn("w-5 h-5 mt-0.5", insight.color)} />
                  <div>
                    <h4 className="font-semibold">{insight.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{insight.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="day">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard variant="premium" className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Weekly Calorie Intake
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calories" fill="url(#calorieGradient)" />
                  <defs>
                    <linearGradient id="calorieGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
            
            <GlassCard variant="premium" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Macronutrient Balance</h3>
              <div className="flex justify-center mb-4">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {macroData.map((macro) => (
                  <div key={macro.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                      <span className="text-sm font-medium">{macro.name}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {macro.value}% (Goal: {macro.goal}%)
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Improvement Areas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvementAreas.map((area, index) => (
                <div key={index} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-purple-200/30 dark:border-purple-700/30">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">{area.area}</h4>
                    <Badge variant="outline">
                      {Math.round((area.current / area.target) * 100)}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{area.current}{area.unit}</span>
                      <span>{area.target}{area.unit}</span>
                    </div>
                    <Progress value={(area.current / area.target) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border border-purple-200/30 dark:border-purple-700/30">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-purple-500" />
                Weekly Nutrition Goal
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Focus on increasing fiber intake by adding more vegetables and whole grains to your meals.
              </p>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                Create Action Plan
              </Button>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionInsights;
