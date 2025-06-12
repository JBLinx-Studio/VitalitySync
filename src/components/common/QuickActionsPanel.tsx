import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, 
  Target, 
  Utensils, 
  Activity, 
  Moon, 
  Brain, 
  Droplets,
  Calendar,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useNavigate } from 'react-router-dom';
import { useViewport } from '@/hooks';

const QuickActionsPanel: React.FC = () => {
  const { userProfile, getHealthSummary, getTodaysWaterIntake } = useHealth();
  const navigate = useNavigate();
  const { isMobile } = useViewport();
  const healthSummary = getHealthSummary();
  const todayWater = getTodaysWaterIntake();

  const quickActions = [
    {
      title: 'Log Food',
      description: 'Track nutrition',
      icon: <Utensils className="w-5 h-5" />,
      path: '/food',
      color: 'from-green-500 to-emerald-600',
      current: healthSummary.todayCalories,
      goal: userProfile?.daily_calorie_goal || 2000,
      unit: 'cal',
      priority: 'high'
    },
    {
      title: 'Add Exercise',
      description: 'Log workout',
      icon: <Activity className="w-5 h-5" />,
      path: '/exercise',
      color: 'from-orange-500 to-red-600',
      current: 0, // Would need today's exercise minutes
      goal: userProfile?.daily_exercise_goal || 30,
      unit: 'min',
      priority: 'high'
    },
    {
      title: 'Water Intake',
      description: 'Track hydration',
      icon: <Droplets className="w-5 h-5" />,
      path: '/food',
      color: 'from-blue-500 to-cyan-600',
      current: Math.round(todayWater / 250), // Convert ml to glasses
      goal: userProfile?.daily_water_goal || 8,
      unit: 'glasses',
      priority: 'medium'
    },
    {
      title: 'Sleep Log',
      description: 'Record rest',
      icon: <Moon className="w-5 h-5" />,
      path: '/sleep',
      color: 'from-purple-500 to-indigo-600',
      current: healthSummary.avgSleepHours,
      goal: 8,
      unit: 'hrs',
      priority: 'medium'
    },
    {
      title: 'Mood Check',
      description: 'Mental wellness',
      icon: <Brain className="w-5 h-5" />,
      path: '/mental',
      color: 'from-pink-500 to-purple-600',
      current: healthSummary.moodScore,
      goal: 10,
      unit: '/10',
      priority: 'low'
    },
    {
      title: 'Body Stats',
      description: 'Track measurements',
      icon: <Target className="w-5 h-5" />,
      path: '/body',
      color: 'from-teal-500 to-green-600',
      current: 0,
      goal: 1,
      unit: 'entry',
      priority: 'low'
    }
  ];

  const highPriorityActions = quickActions.filter(action => action.priority === 'high');
  const otherActions = quickActions.filter(action => action.priority !== 'high');

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Priority Actions */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-900/20 border-blue-200 dark:border-indigo-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Priority Actions
            <Badge variant="secondary" className="ml-auto">
              Today's Focus
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {highPriorityActions.map((action, index) => (
              <div
                key={index}
                className="p-4 bg-white/80 dark:bg-slate-700/50 rounded-xl border border-white/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{action.description}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => navigate(action.path)}
                    className={`bg-gradient-to-r ${action.color} text-white shadow-md hover:shadow-lg`}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className={getProgressColor(action.current, action.goal)}>
                      {action.current} / {action.goal} {action.unit}
                    </span>
                    <span className="text-gray-500">
                      {Math.round((action.current / action.goal) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((action.current / action.goal) * 100, 100)} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Other Actions */}
      <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Additional Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
            {otherActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => navigate(action.path)}
                className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-300"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color} text-white`}>
                  {action.icon}
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500">{action.description}</p>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {action.current} / {action.goal}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActionsPanel;
