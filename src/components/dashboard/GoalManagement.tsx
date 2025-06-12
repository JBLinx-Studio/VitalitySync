
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy,
  Target,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Flame,
  Activity,
  Moon,
  Droplets,
  Weight,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const GoalManagement: React.FC = () => {
  const { userProfile } = useHealth();
  const { isMobile } = useViewport();
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const goals = [
    {
      id: 1,
      title: 'Lose 5kg',
      category: 'weight',
      target: 5,
      current: 2.3,
      unit: 'kg',
      deadline: '2024-08-01',
      status: 'in-progress',
      priority: 'high',
      icon: Weight,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Exercise 5x per week',
      category: 'fitness',
      target: 5,
      current: 3.2,
      unit: 'times/week',
      deadline: '2024-07-31',
      status: 'in-progress',
      priority: 'high',
      icon: Activity,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'Sleep 8+ hours daily',
      category: 'sleep',
      target: 8,
      current: 7.2,
      unit: 'hours',
      deadline: '2024-08-15',
      status: 'in-progress',
      priority: 'medium',
      icon: Moon,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 4,
      title: 'Drink 3L water daily',
      category: 'hydration',
      target: 3,
      current: 3,
      unit: 'liters',
      deadline: '2024-07-20',
      status: 'completed',
      priority: 'low',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const weeklyStats = {
    goalsCompleted: 1,
    totalGoals: 4,
    streakDays: 12,
    weeklyProgress: 68
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'overdue': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 dark:border-red-800';
      case 'medium': return 'border-yellow-200 dark:border-yellow-800';
      case 'low': return 'border-green-200 dark:border-green-800';
      default: return 'border-gray-200 dark:border-gray-800';
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Goal Management Header */}
      <Card className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/50 dark:via-slate-900/80 dark:to-orange-950/50 border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Goal Management
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Track and achieve your health objectives</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold">
              <Plus className="w-5 h-5 mr-2" />
              New Goal
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-6 p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-xl border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400">{weeklyStats.goalsCompleted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Goals Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-600 dark:text-orange-400">{weeklyStats.totalGoals}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Goals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-600 dark:text-green-400">{weeklyStats.streakDays}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{weeklyStats.weeklyProgress}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Goals */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold flex items-center gap-3">
          <Target className="w-6 h-6 text-amber-500" />
          Active Goals
        </h3>
        
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {goals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            const daysRemaining = getDaysRemaining(goal.deadline);
            
            return (
              <Card 
                key={goal.id}
                className={cn(
                  "group cursor-pointer transition-all duration-500 border-2 shadow-xl hover:shadow-2xl hover:scale-105",
                  "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
                  getPriorityColor(goal.priority),
                  selectedGoal === goal.id && "ring-2 ring-amber-500"
                )}
                onClick={() => setSelectedGoal(selectedGoal === goal.id ? null : goal.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${goal.color} shadow-lg`}>
                        <goal.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{goal.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{goal.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {goal.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-bold">{progress.toFixed(1)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                      <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{goal.current} / {goal.target} {goal.unit}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                        </span>
                      </div>
                    </div>
                    
                    {selectedGoal === goal.id && (
                      <div className="space-y-4 animate-fade-in border-t pt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Target Date:</span>
                            <p className="text-gray-600 dark:text-gray-400">{new Date(goal.deadline).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="font-medium">Priority:</span>
                            <p className={cn(
                              "capitalize font-semibold",
                              goal.priority === 'high' ? 'text-red-600' : 
                              goal.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                            )}>{goal.priority}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/30 dark:via-slate-900/80 dark:to-indigo-950/30 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            Quick Goal Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {[
              { title: 'Lose Weight', icon: Weight, color: 'from-red-500 to-pink-500' },
              { title: 'Build Muscle', icon: Activity, color: 'from-blue-500 to-indigo-500' },
              { title: 'Better Sleep', icon: Moon, color: 'from-purple-500 to-indigo-500' },
              { title: 'Stay Hydrated', icon: Droplets, color: 'from-cyan-500 to-blue-500' }
            ].map((template, index) => (
              <Button 
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2 hover:shadow-lg transition-all duration-300"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${template.color}`}>
                  <template.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium">{template.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalManagement;
