
import React, { useState, useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Target, 
  TrendingUp, 
  Calendar, 
  Award,
  Heart,
  Zap,
  Users,
  Camera,
  Plus,
  BarChart3,
  Clock,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const Dashboard: React.FC = () => {
  const { userProfile, dailyGoals, todayData } = useHealth();
  const [streak, setStreak] = useState(7);
  const [weeklyProgress, setWeeklyProgress] = useState(68);

  const quickActions = [
    { icon: Camera, label: 'Scan Food', color: 'from-blue-500 to-cyan-500', action: () => {} },
    { icon: Plus, label: 'Log Meal', color: 'from-green-500 to-emerald-500', action: () => {} },
    { icon: Activity, label: 'Add Exercise', color: 'from-purple-500 to-pink-500', action: () => {} },
    { icon: Users, label: 'Community', color: 'from-orange-500 to-red-500', action: () => {} }
  ];

  const healthMetrics = [
    { 
      title: 'Calories', 
      current: todayData?.calories || 0, 
      goal: dailyGoals.calories, 
      unit: 'kcal',
      icon: Flame,
      color: 'text-orange-500'
    },
    { 
      title: 'Steps', 
      current: 8420, 
      goal: 10000, 
      unit: 'steps',
      icon: Activity,
      color: 'text-blue-500'
    },
    { 
      title: 'Water', 
      current: todayData?.water || 0, 
      goal: dailyGoals.water, 
      unit: 'ml',
      icon: Heart,
      color: 'text-cyan-500'
    },
    { 
      title: 'Sleep', 
      current: 7.5, 
      goal: 8, 
      unit: 'hrs',
      icon: Clock,
      color: 'text-purple-500'
    }
  ];

  const achievements = [
    { title: '7-Day Streak', description: 'Logged meals consistently', earned: true },
    { title: 'Hydration Hero', description: 'Met water goals 5 times', earned: true },
    { title: 'Early Bird', description: 'Logged breakfast before 9 AM', earned: false },
    { title: 'Goal Crusher', description: 'Hit all daily targets', earned: false }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome back, {userProfile?.name || 'Champion'}! 🌟
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            You're on a {streak}-day streak! Keep up the amazing work.
          </p>
        </div>
        <div className="flex gap-3">
          <Badge variant="secondary" className="px-4 py-2 text-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            {weeklyProgress}% Weekly Goal
          </Badge>
          <Button variant="glass-primary" size="lg" className="gap-2">
            <Award className="w-5 h-5" />
            View Achievements
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <GlassCard variant="premium" className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={cn(
                "group relative p-6 rounded-2xl border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl",
                "bg-gradient-to-br", action.color, "text-white"
              )}
            >
              <action.icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
              <p className="font-semibold text-sm">{action.label}</p>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            </button>
          ))}
        </div>
      </GlassCard>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Health Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthMetrics.map((metric, index) => {
              const percentage = Math.min((metric.current / metric.goal) * 100, 100);
              return (
                <GlassCard key={index} variant="premium" className="p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={cn("w-6 h-6", metric.color)} />
                    <Badge variant="outline" className="text-xs">
                      {percentage.toFixed(0)}%
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {metric.title}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{metric.current}</span>
                      <span className="text-sm text-gray-500">/ {metric.goal} {metric.unit}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Weekly Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard variant="premium" className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Weekly Progress
              </h3>
              <div className="space-y-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                  const completed = index < 5;
                  return (
                    <div key={day} className="flex items-center gap-4">
                      <span className="w-8 text-sm font-medium">{day}</span>
                      <div className="flex-1 flex gap-2">
                        {['Nutrition', 'Exercise', 'Sleep'].map((category) => (
                          <div 
                            key={category}
                            className={cn(
                              "h-3 rounded-full flex-1",
                              completed 
                                ? "bg-gradient-to-r from-green-400 to-emerald-500" 
                                : "bg-gray-200 dark:bg-gray-700"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            <GlassCard variant="premium" className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border transition-all",
                      achievement.earned 
                        ? "bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700" 
                        : "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      achievement.earned 
                        ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white" 
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                    )}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="nutrition">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Nutrition Overview</h3>
            <p className="text-gray-600 dark:text-gray-400">Advanced nutrition tracking coming soon...</p>
          </GlassCard>
        </TabsContent>

        <TabsContent value="fitness">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Fitness Tracking</h3>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive fitness analytics coming soon...</p>
          </GlassCard>
        </TabsContent>

        <TabsContent value="insights">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Health Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">AI-powered health insights coming soon...</p>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
