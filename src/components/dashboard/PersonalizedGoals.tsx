
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Trophy, 
  Plus,
  Edit,
  Check,
  Star,
  Flame,
  Activity,
  Heart,
  Moon,
  Droplets,
  Brain
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const PersonalizedGoals: React.FC = () => {
  const { userProfile } = useHealth();
  const { isMobile } = useViewport();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const personalGoals = [
    {
      id: '1',
      title: 'Daily Steps',
      target: 10000,
      current: 7845,
      unit: 'steps',
      icon: Activity,
      color: 'blue',
      difficulty: 'Easy',
      deadline: '2024-12-31',
      streak: 12,
      priority: 'high',
      description: 'Maintain consistent daily movement'
    },
    {
      id: '2',
      title: 'Weekly Workouts',
      target: 5,
      current: 3,
      unit: 'sessions',
      icon: Flame,
      color: 'orange',
      difficulty: 'Medium',
      deadline: '2024-12-31',
      streak: 4,
      priority: 'high',
      description: 'Build strength and endurance'
    },
    {
      id: '3',
      title: 'Sleep Quality',
      target: 8,
      current: 7.2,
      unit: 'hours',
      icon: Moon,
      color: 'purple',
      difficulty: 'Medium',
      deadline: '2024-12-31',
      streak: 8,
      priority: 'medium',
      description: 'Improve recovery and energy'
    },
    {
      id: '4',
      title: 'Water Intake',
      target: 8,
      current: 6,
      unit: 'glasses',
      icon: Droplets,
      color: 'cyan',
      difficulty: 'Easy',
      deadline: '2024-12-31',
      streak: 15,
      priority: 'medium',
      description: 'Stay properly hydrated'
    },
    {
      id: '5',
      title: 'Meditation',
      target: 20,
      current: 12,
      unit: 'minutes',
      icon: Brain,
      color: 'green',
      difficulty: 'Easy',
      deadline: '2024-12-31',
      streak: 6,
      priority: 'low',
      description: 'Reduce stress and improve focus'
    },
    {
      id: '6',
      title: 'Heart Rate Zone',
      target: 30,
      current: 18,
      unit: 'minutes',
      icon: Heart,
      color: 'red',
      difficulty: 'Hard',
      deadline: '2024-12-31',
      streak: 3,
      priority: 'high',
      description: 'Improve cardiovascular fitness'
    }
  ];

  const achievements = [
    {
      title: '30-Day Streak',
      description: 'Complete your daily steps goal for 30 days',
      icon: Star,
      progress: 40,
      target: 100,
      unlocked: false
    },
    {
      title: 'Workout Warrior',
      description: 'Complete 100 workout sessions',
      icon: Trophy,
      progress: 75,
      target: 100,
      unlocked: false
    },
    {
      title: 'Sleep Champion',
      description: 'Maintain 8+ hours sleep for 2 weeks',
      icon: Moon,
      progress: 100,
      target: 100,
      unlocked: true
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/40';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/40';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-900/10';
      case 'medium': return 'border-yellow-200 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10';
      case 'low': return 'border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/10';
      default: return 'border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/10';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/40';
      case 'orange': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/40';
      case 'purple': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/40';
      case 'cyan': return 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/40';
      case 'green': return 'text-green-500 bg-green-100 dark:bg-green-900/40';
      case 'red': return 'text-red-500 bg-red-100 dark:bg-red-900/40';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  return (
    <div className="space-y-8">
      {/* Goals Header */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Personal Goals</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track your health and fitness objectives</p>
            </div>
            <Button className="ml-auto bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Goal
            </Button>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Goals Grid */}
      <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3")}>
        {personalGoals.map((goal) => (
          <Card 
            key={goal.id} 
            className={cn(
              "bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-2 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer relative overflow-hidden",
              getPriorityColor(goal.priority),
              selectedGoal === goal.id && "ring-2 ring-emerald-500 scale-105"
            )}
            onClick={() => setSelectedGoal(goal.id)}
          >
            {/* Priority indicator */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
              goal.priority === 'high' && "from-red-500 to-orange-500",
              goal.priority === 'medium' && "from-yellow-500 to-amber-500",
              goal.priority === 'low' && "from-blue-500 to-indigo-500"
            )}></div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg", getIconColor(goal.color))}>
                    <goal.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{goal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{goal.current}</span>
                  <span className="text-lg text-gray-500">/ {goal.target} {goal.unit}</span>
                </div>
                
                <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(goal.difficulty)}>
                      {goal.difficulty}
                    </Badge>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600 dark:text-gray-400">{goal.streak} day streak</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="font-semibold">{Math.round((goal.current / goal.target) * 100)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements Section */}
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Achievements
            <Badge variant="secondary" className="ml-auto">
              {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={cn("grid gap-4", isMobile ? "grid-cols-1" : "grid-cols-3")}>
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all duration-300",
                  achievement.unlocked 
                    ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-700" 
                    : "bg-gray-50 dark:bg-slate-700/50 border-gray-200 dark:border-gray-700"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center",
                    achievement.unlocked ? "bg-yellow-100 dark:bg-yellow-900/40" : "bg-gray-100 dark:bg-gray-700"
                  )}>
                    <achievement.icon className={cn(
                      "w-5 h-5",
                      achievement.unlocked ? "text-yellow-600" : "text-gray-500"
                    )} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{achievement.title}</h4>
                    {achievement.unlocked && <Check className="w-4 h-4 text-green-500 float-right" />}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedGoals;
