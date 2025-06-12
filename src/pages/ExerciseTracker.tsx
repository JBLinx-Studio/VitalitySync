
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Dumbbell, 
  Target, 
  Timer, 
  Zap,
  TrendingUp,
  Activity,
  Heart,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';
import WorkoutPlanningHub from '@/components/fitness/WorkoutPlanningHub';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks/use-viewport';

const ExerciseTracker: React.FC = () => {
  const { userProfile, addExerciseItem, getTodaysExerciseItems } = useHealth();
  const { isMobile, isTablet } = useViewport();
  const [activeTab, setActiveTab] = useState('planning');

  const todaysExercises = getTodaysExerciseItems();
  const totalCaloriesBurned = todaysExercises.reduce((sum, exercise) => sum + exercise.calories_burned, 0);
  const totalDuration = todaysExercises.reduce((sum, exercise) => sum + exercise.duration, 0);

  const headerSize = isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl';
  const cardPadding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6';
  const spacing = isMobile ? 'space-y-4' : 'space-y-8';

  return (
    <div className={cn(spacing, cardPadding)}>
      {/* Enhanced Header */}
      <div className={cn(
        "flex flex-col gap-4",
        isMobile ? "items-center text-center" : "lg:flex-row justify-between items-start lg:items-center"
      )}>
        <div>
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-orange-600 via-red-600 to-orange-700 bg-clip-text text-transparent",
            headerSize
          )}>
            Fitness Command Center 💪
          </h1>
          <p className={cn(
            "text-gray-600 dark:text-gray-300 mt-2",
            isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg"
          )}>
            Advanced workout planning, tracking, and performance analytics
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Calories Burned', 
            value: totalCaloriesBurned, 
            unit: 'cal', 
            icon: Flame, 
            color: 'from-red-500 to-orange-500',
            goal: userProfile?.daily_exercise_goal ? userProfile.daily_exercise_goal * 10 : 300
          },
          { 
            label: 'Workout Time', 
            value: totalDuration, 
            unit: 'min', 
            icon: Timer, 
            color: 'from-blue-500 to-cyan-500',
            goal: userProfile?.daily_exercise_goal || 30
          },
          { 
            label: 'Exercises', 
            value: todaysExercises.length, 
            unit: 'done', 
            icon: Activity, 
            color: 'from-green-500 to-emerald-500',
            goal: 5
          },
          { 
            label: 'Weekly Goal', 
            value: 75, 
            unit: '%', 
            icon: Target, 
            color: 'from-purple-500 to-pink-500',
            goal: 100
          }
        ].map((stat, index) => (
          <GlassCard key={index} variant="premium" className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}<span className="text-sm text-gray-500 ml-1">{stat.unit}</span></p>
                {stat.goal && (
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
                      style={{ width: `${Math.min((stat.value / stat.goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                )}
              </div>
              <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={cn(
          "grid w-full mb-6",
          isMobile ? "grid-cols-2 h-auto" : "grid-cols-4"
        )}>
          <TabsTrigger value="planning" className={cn(isMobile ? "text-xs p-2" : "")}>
            {isMobile ? "Workouts" : "Workout Planning"}
          </TabsTrigger>
          <TabsTrigger value="tracking" className={cn(isMobile ? "text-xs p-2" : "")}>
            {isMobile ? "Track" : "Exercise Tracking"}
          </TabsTrigger>
          {!isMobile && <TabsTrigger value="analytics">Performance</TabsTrigger>}
          {!isMobile && <TabsTrigger value="programs">Programs</TabsTrigger>}
        </TabsList>

        <TabsContent value="planning">
          <WorkoutPlanningHub />
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <GlassCard variant="premium" className={cardPadding}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                Quick Exercise Entry
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Exercise Name</label>
                  <Input placeholder="e.g., Push-ups, Running, Squats..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <Input type="number" placeholder="30" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Exercise Type</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Cardio</option>
                    <option>Strength</option>
                    <option>Flexibility</option>
                    <option>Sports</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Calories Burned</label>
                  <Input type="number" placeholder="200" />
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500">
                Log Exercise
              </Button>
            </div>
          </GlassCard>

          {/* Today's Exercises */}
          {todaysExercises.length > 0 && (
            <GlassCard variant="premium" className={cardPadding}>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-orange-500" />
                Today's Exercises
              </h3>
              <div className="space-y-3">
                {todaysExercises.map((exercise) => (
                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-orange-200/30 dark:border-orange-700/30">
                    <div>
                      <h4 className="font-semibold">{exercise.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.duration} min • {exercise.calories_burned} cal • {exercise.type}
                      </p>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      Completed
                    </Badge>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </TabsContent>

        {!isMobile && (
          <>
            <TabsContent value="analytics">
              <GlassCard variant="premium" className={cardPadding}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Performance Analytics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">This Week's Progress</h4>
                      <p className="text-2xl font-bold text-green-600">+15%</p>
                      <p className="text-sm text-green-600">improvement in endurance</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Strength Gains</h4>
                      <p className="text-2xl font-bold text-blue-600">+8%</p>
                      <p className="text-sm text-blue-600">increase this month</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
                      <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Calories Burned</h4>
                      <p className="text-2xl font-bold text-orange-600">2,450</p>
                      <p className="text-sm text-orange-600">this week</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Consistency</h4>
                      <p className="text-2xl font-bold text-purple-600">94%</p>
                      <p className="text-sm text-purple-600">workout adherence</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="programs">
              <GlassCard variant="premium" className={cardPadding}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-500" />
                  Fitness Programs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: '30-Day Strength Builder', duration: '30 days', difficulty: 'Intermediate', progress: 65 },
                    { name: 'HIIT Fat Burner', duration: '21 days', difficulty: 'Advanced', progress: 80 },
                    { name: 'Flexibility & Mobility', duration: '14 days', difficulty: 'Beginner', progress: 45 }
                  ].map((program, index) => (
                    <div key={index} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-orange-200/30 dark:border-orange-700/30">
                      <h4 className="font-semibold mb-2">{program.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <Badge variant="outline">{program.difficulty}</Badge>
                        </div>
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{program.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                              style={{ width: `${program.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-gradient-to-r from-orange-500 to-red-500">
                        Continue Program
                      </Button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default ExerciseTracker;
