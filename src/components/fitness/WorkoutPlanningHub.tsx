
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Target, 
  Timer, 
  Zap, 
  Trophy,
  Play,
  Pause,
  RotateCcw,
  Heart,
  Flame,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const WorkoutPlanningHub: React.FC = () => {
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);
  const [workoutTimer, setWorkoutTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const workoutPlans = [
    {
      id: 'strength',
      name: 'Strength Builder',
      duration: '45 min',
      difficulty: 'Intermediate',
      calories: 320,
      exercises: 8,
      equipment: ['Dumbbells', 'Bench'],
      focus: ['Upper Body', 'Core'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300'
    },
    {
      id: 'cardio',
      name: 'HIIT Blast',
      duration: '30 min',
      difficulty: 'Advanced',
      calories: 450,
      exercises: 12,
      equipment: ['None'],
      focus: ['Cardio', 'Fat Burn'],
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=300'
    },
    {
      id: 'yoga',
      name: 'Morning Flow',
      duration: '25 min',
      difficulty: 'Beginner',
      calories: 180,
      exercises: 15,
      equipment: ['Mat'],
      focus: ['Flexibility', 'Mindfulness'],
      image: 'https://images.unsplash.com/photo-1506629905333-eb94fa4715fe?w=300'
    }
  ];

  const todaysExercises = [
    { name: 'Push-ups', sets: 3, reps: '12-15', completed: true },
    { name: 'Squats', sets: 3, reps: '15-20', completed: true },
    { name: 'Plank', sets: 3, reps: '45s', completed: false },
    { name: 'Burpees', sets: 3, reps: '8-10', completed: false }
  ];

  const weeklyProgress = [
    { day: 'Mon', completed: true, type: 'Strength' },
    { day: 'Tue', completed: true, type: 'Cardio' },
    { day: 'Wed', completed: false, type: 'Rest' },
    { day: 'Thu', completed: true, type: 'HIIT' },
    { day: 'Fri', completed: false, type: 'Strength' },
    { day: 'Sat', completed: false, type: 'Yoga' },
    { day: 'Sun', completed: false, type: 'Active Recovery' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-vibrant">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent">
              Workout Central
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Transform your body, elevate your performance
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Today\'s Goal', value: '320', unit: 'cal', icon: Flame, color: 'from-red-500 to-orange-500' },
          { label: 'Weekly Streak', value: '5', unit: 'days', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
          { label: 'Heart Rate', value: '145', unit: 'bpm', icon: Heart, color: 'from-pink-500 to-red-500' },
          { label: 'Progress', value: '78', unit: '%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' }
        ].map((stat, index) => (
          <GlassCard key={index} variant="premium" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}<span className="text-sm text-gray-500 ml-1">{stat.unit}</span></p>
              </div>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today's Plan</TabsTrigger>
          <TabsTrigger value="workouts">Workout Library</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="timer">Workout Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlassCard variant="premium" className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    Today's Workout
                  </h3>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                    45 min remaining
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {todaysExercises.map((exercise, index) => (
                    <div key={index} className={cn(
                      "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                      exercise.completed 
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" 
                        : "bg-white/50 dark:bg-slate-800/50 border-orange-200/30 dark:border-orange-700/30"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          exercise.completed ? "bg-green-500" : "bg-orange-500"
                        )}>
                          {exercise.completed ? "✓" : index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{exercise.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {exercise.sets} sets × {exercise.reps}
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant={exercise.completed ? "outline" : "default"}
                        size="sm"
                        className={!exercise.completed ? "bg-gradient-to-r from-orange-500 to-red-500" : ""}
                      >
                        {exercise.completed ? "Done" : "Start"}
                      </Button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
            
            <div className="space-y-4">
              <GlassCard variant="premium" className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Timer className="w-4 h-4 text-orange-500" />
                  Quick Timer
                </h3>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-orange-600">
                    {formatTime(workoutTimer)}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setWorkoutTimer(0)}
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard variant="premium" className="p-4">
                <h3 className="font-semibold mb-3">Weekly Progress</h3>
                <div className="grid grid-cols-7 gap-1">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold mb-1",
                        day.completed 
                          ? "bg-green-500 text-white" 
                          : index < 4 ? "bg-gray-200 dark:bg-gray-700" : "bg-orange-500 text-white"
                      )}>
                        {day.day.charAt(0)}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{day.type}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workoutPlans.map((workout) => (
              <GlassCard key={workout.id} variant="premium" className="overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={workout.image} 
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/50 text-white">
                      {workout.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">
                      {workout.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{workout.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {workout.exercises} exercises • {workout.calories} calories
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {workout.focus.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                        Start Workout
                      </Button>
                      <Button size="sm" variant="outline">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              Fitness Progress Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Weekly Goal</span>
                    <span>4/5 workouts</span>
                  </div>
                  <Progress value={80} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Strength Progress</span>
                    <span>+15% this month</span>
                  </div>
                  <Progress value={65} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Cardio Endurance</span>
                    <span>+22% this month</span>
                  </div>
                  <Progress value={75} className="h-3" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Achievement Unlocked!</h4>
                  <p className="text-sm text-green-600 dark:text-green-300">Completed 20 workouts this month</p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400">Next Milestone</h4>
                  <p className="text-sm text-orange-600 dark:text-orange-300">5 more workouts to reach your monthly goal</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="timer" className="space-y-4">
          <GlassCard variant="premium" className="p-8 text-center">
            <div className="space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Timer className="w-16 h-16 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Workout Timer</h3>
                <div className="text-6xl font-bold text-orange-600 mb-4">
                  {formatTime(workoutTimer)}
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 gap-2"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                >
                  {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isTimerRunning ? 'Pause' : 'Start'}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setWorkoutTimer(0)}
                  className="gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkoutPlanningHub;
