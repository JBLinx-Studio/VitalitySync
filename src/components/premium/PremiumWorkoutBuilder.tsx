
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Target, 
  Timer, 
  Zap,
  Crown,
  Sparkles,
  Play,
  Pause,
  SkipForward,
  Volume2,
  Settings,
  TrendingUp,
  Award,
  Star,
  Flame,
  Heart,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const PremiumWorkoutBuilder: React.FC = () => {
  const [workoutType, setWorkoutType] = useState('strength');
  const [duration, setDuration] = useState([45]);
  const [intensity, setIntensity] = useState([7]);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);

  const workoutTemplates = [
    {
      name: 'HIIT Metabolic Blast',
      duration: '25 min',
      intensity: 'High',
      calories: '300-400',
      type: 'cardio',
      equipment: 'Bodyweight',
      difficulty: 'Advanced',
      focus: ['Fat Burn', 'Endurance', 'Power']
    },
    {
      name: 'Strength Foundation',
      duration: '45 min',
      intensity: 'Medium',
      calories: '250-350',
      type: 'strength',
      equipment: 'Dumbbells',
      difficulty: 'Intermediate',
      focus: ['Muscle Building', 'Strength', 'Form']
    },
    {
      name: 'Mobility & Recovery',
      duration: '30 min',
      intensity: 'Low',
      calories: '100-150',
      type: 'flexibility',
      equipment: 'Mat',
      difficulty: 'Beginner',
      focus: ['Flexibility', 'Recovery', 'Stress Relief']
    },
    {
      name: 'Athletic Performance',
      duration: '60 min',
      intensity: 'High',
      calories: '400-550',
      type: 'sports',
      equipment: 'Various',
      difficulty: 'Advanced',
      focus: ['Power', 'Agility', 'Coordination']
    }
  ];

  const exerciseLibrary = [
    {
      name: 'Burpees',
      category: 'Cardio',
      difficulty: 'High',
      equipment: 'Bodyweight',
      muscles: ['Full Body'],
      duration: '30s',
      calories: 8
    },
    {
      name: 'Deadlifts',
      category: 'Strength',
      difficulty: 'Medium',
      equipment: 'Barbell',
      muscles: ['Hamstrings', 'Glutes', 'Back'],
      duration: '8-12 reps',
      calories: 6
    },
    {
      name: 'Mountain Climbers',
      category: 'Cardio',
      difficulty: 'Medium',
      equipment: 'Bodyweight',
      muscles: ['Core', 'Shoulders'],
      duration: '30s',
      calories: 7
    },
    {
      name: 'Pull-ups',
      category: 'Strength',
      difficulty: 'High',
      equipment: 'Pull-up Bar',
      muscles: ['Back', 'Biceps'],
      duration: '5-10 reps',
      calories: 5
    }
  ];

  const getIntensityColor = (intensity: string) => {
    switch (intensity.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'advanced': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'intermediate': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Premium Header */}
      <GlassCard variant="premium" className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-vibrant">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                AI Workout Builder Pro
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Personalized workouts powered by advanced AI algorithms
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg">
            <Crown className="w-4 h-4 mr-2" />
            Premium Only
          </Badge>
        </div>
      </GlassCard>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Workout Builder</TabsTrigger>
          <TabsTrigger value="templates">Smart Templates</TabsTrigger>
          <TabsTrigger value="live">Live Workout</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Workout Configuration */}
            <GlassCard variant="premium" className="p-6 lg:col-span-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-500" />
                Workout Parameters
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Workout Type</label>
                  <Select value={workoutType} onValueChange={setWorkoutType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="cardio">Cardio & HIIT</SelectItem>
                      <SelectItem value="flexibility">Flexibility & Yoga</SelectItem>
                      <SelectItem value="sports">Sports Performance</SelectItem>
                      <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration: {duration[0]} minutes
                  </label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    max={120}
                    min={15}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Intensity: {intensity[0]}/10
                  </label>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Equipment Available</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bodyweight">Bodyweight Only</SelectItem>
                      <SelectItem value="dumbbells">Dumbbells</SelectItem>
                      <SelectItem value="full-gym">Full Gym Access</SelectItem>
                      <SelectItem value="home-basic">Basic Home Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Target Areas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Upper Body', 'Lower Body', 'Core', 'Full Body', 'Cardio', 'Flexibility'].map((area) => (
                      <Button key={area} size="sm" variant="outline" className="text-xs">
                        {area}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate AI Workout
                </Button>
              </div>
            </GlassCard>

            {/* Exercise Library */}
            <GlassCard variant="premium" className="p-6 lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-purple-500" />
                Exercise Library
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Search exercises..." className="flex-1" />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="strength">Strength</SelectItem>
                      <SelectItem value="cardio">Cardio</SelectItem>
                      <SelectItem value="flexibility">Flexibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  {exerciseLibrary.map((exercise, index) => (
                    <div key={index} className="p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-purple-200/30 dark:border-purple-700/30 hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{exercise.name}</h4>
                            <Badge className={getDifficultyColor(exercise.difficulty)}>
                              {exercise.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {exercise.equipment}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              {exercise.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              {exercise.calories} cal/min
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-3 h-3" />
                              {exercise.muscles.join(', ')}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-purple-200 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                          Add to Workout
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workoutTemplates.map((template, index) => (
              <GlassCard key={index} variant="premium" className="p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getIntensityColor(template.intensity)}>
                          {template.intensity} Intensity
                        </Badge>
                        <Badge className={getDifficultyColor(template.difficulty)}>
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-purple-500" />
                      <span>{template.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{template.calories} cal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-blue-500" />
                      <span>{template.equipment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span>{template.type}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Focus Areas:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.focus.map((focus, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <GlassCard variant="premium" className="p-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-vibrant">
                  {isWorkoutActive ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">HIIT Metabolic Blast</h2>
                  <p className="text-gray-600 dark:text-gray-300">Exercise 3 of 8 • Burpees</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-500">15:42</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Time Remaining</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500">247</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Calories Burned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-500">156</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Heart Rate</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" variant="outline">
                  <SkipForward className="w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-8"
                  onClick={() => setIsWorkoutActive(!isWorkoutActive)}
                >
                  {isWorkoutActive ? 'Pause' : 'Start'}
                </Button>
                <Button size="lg" variant="outline">
                  <Volume2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard variant="premium" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Weekly Progress</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2">+12%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Improvement in overall fitness score
              </p>
            </GlassCard>
            
            <GlassCard variant="premium" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Consistency Score</h3>
                <Award className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-3xl font-bold text-purple-500 mb-2">94%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Workout completion rate this month
              </p>
            </GlassCard>
            
            <GlassCard variant="premium" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Total Calories</h3>
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-3xl font-bold text-orange-500 mb-2">2,847</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Burned this week
              </p>
            </GlassCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PremiumWorkoutBuilder;
