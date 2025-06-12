import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Dumbbell, Flame, ListChecks, NotebookPen, Plus, Timer, Clock, Search, Zap } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';
import { exercises, searchExercises, calculateCaloriesBurned } from '@/services/exerciseService';

const ExerciseTracker: React.FC = () => {
  const { exerciseItems, addExerciseItem, getExerciseSummary, userProfile } = useHealth();
  
  const [exerciseName, setExerciseName] = useState('');
  const [exerciseType, setExerciseType] = useState('cardio');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [notes, setNotes] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(exercises);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);

  const handleSearch = () => {
    const results = searchExercises(searchQuery);
    setSearchResults(results);
  };

  const handleSelectExercise = (exercise: any) => {
    setSelectedExercise(exercise);
    setExerciseName(exercise.name);
    
    // Auto-calculate calories if we have user weight
    if (userProfile?.weight && duration) {
      const calories = calculateCaloriesBurned(exercise.met, userProfile.weight, parseInt(duration));
      setCaloriesBurned(Math.round(calories).toString());
    }
  };

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    
    // Auto-calculate calories if we have selected exercise and user weight
    if (selectedExercise && userProfile?.weight && newDuration) {
      const calories = calculateCaloriesBurned(selectedExercise.met, userProfile.weight, parseInt(newDuration));
      setCaloriesBurned(Math.round(calories).toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newExercise = {
      name: exerciseName,
      type: exerciseType as 'cardio' | 'strength' | 'flexibility' | 'sports',
      duration: parseInt(duration),
      calories_burned: parseInt(caloriesBurned),
      date: new Date().toISOString().split('T')[0],
      notes
    };
    
    addExerciseItem(newExercise);
    
    // Reset form
    setExerciseName('');
    setDuration('');
    setCaloriesBurned('');
    setNotes('');
    setSelectedExercise(null);
  };

  const summary = getExerciseSummary();

  const exerciseTypes = [
    { value: 'cardio', label: 'Cardio', icon: Timer },
    { value: 'strength', label: 'Strength Training', icon: Dumbbell },
    { value: 'flexibility', label: 'Flexibility', icon: ListChecks },
    { value: 'sports', label: 'Sports', icon: NotebookPen }
  ];

  const recentExercises = exerciseItems.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-lime-50 dark:from-slate-900 dark:via-zinc-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-yellow-600 to-lime-600 bg-clip-text text-transparent mb-2">
            Exercise Tracker 🏋️‍♀️
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Log your workouts and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <GlassCard variant="premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Duration</p>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {summary.totalDuration} min
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-2xl">
                    <Timer className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard variant="premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Calories</p>
                    <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      {summary.totalCalories}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/40 rounded-2xl">
                    <Flame className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard variant="premium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Workouts Logged</p>
                    <p className="text-3xl font-bold text-lime-600 dark:text-lime-400">
                      {summary.exerciseCount}
                    </p>
                  </div>
                  <div className="p-3 bg-lime-100 dark:bg-lime-900/40 rounded-2xl">
                    <Dumbbell className="h-8 w-8 text-lime-600 dark:text-lime-400" />
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>

          {/* Exercise Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="log" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="log">Log Exercise</TabsTrigger>
                <TabsTrigger value="search">Search Exercises</TabsTrigger>
              </TabsList>

              <TabsContent value="log">
                <GlassCard variant="premium">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                      <Dumbbell className="mr-2 h-6 w-6 text-orange-500" />
                      Log Your Exercise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <Label htmlFor="exerciseName" className="text-gray-700 dark:text-gray-300 font-medium">
                          Exercise Name
                        </Label>
                        <Input
                          id="exerciseName"
                          type="text"
                          value={exerciseName}
                          onChange={(e) => setExerciseName(e.target.value)}
                          className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                        />
                        {selectedExercise && (
                          <p className="text-xs text-gray-500 mt-1">
                            MET value: {selectedExercise.met} (calories per kg per hour)
                          </p>
                        )}
                      </div>

                      <div>
                        <Label className="text-gray-700 dark:text-gray-300 font-medium">Exercise Type</Label>
                        <Select value={exerciseType} onValueChange={(value) => setExerciseType(value)}>
                          <SelectTrigger className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60">
                            {exerciseTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300 font-medium">
                            Duration (minutes)
                          </Label>
                          <Input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                          />
                        </div>

                        <div>
                          <Label htmlFor="caloriesBurned" className="text-gray-700 dark:text-gray-300 font-medium">
                            Calories Burned
                          </Label>
                          <Input
                            id="caloriesBurned"
                            type="number"
                            value={caloriesBurned}
                            onChange={(e) => setCaloriesBurned(e.target.value)}
                            className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300 font-medium">
                          Exercise Notes (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="How did the exercise feel? Any challenges or achievements..."
                          className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                          rows={3}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 via-yellow-500 to-lime-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-[1.02]"
                      >
                        Log Exercise
                      </Button>
                    </form>
                  </CardContent>
                </GlassCard>
              </TabsContent>

              <TabsContent value="search">
                <GlassCard variant="premium">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                      <Search className="mr-2 h-6 w-6 text-blue-500" />
                      Exercise Database
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-1 relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            placeholder="Search exercises (e.g., 'running', 'yoga')..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="pl-10"
                          />
                        </div>
                        <Button onClick={handleSearch} className="gap-2">
                          <Search className="w-4 h-4" />
                          Search
                        </Button>
                      </div>

                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {searchResults.map((exercise) => (
                          <div
                            key={exercise.id}
                            onClick={() => handleSelectExercise(exercise)}
                            className={cn(
                              "p-4 rounded-xl cursor-pointer transition-all border",
                              "hover:border-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20",
                              selectedExercise?.id === exercise.id 
                                ? "border-orange-400 bg-orange-100 dark:bg-orange-900/30" 
                                : "border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-700/50"
                            )}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{exercise.name}</h4>
                                <p className="text-sm text-gray-500">
                                  MET: {exercise.met} • 
                                  {userProfile?.weight && duration && (
                                    <span className="text-orange-600 font-medium ml-1">
                                      ~{Math.round(calculateCaloriesBurned(exercise.met, userProfile.weight, parseInt(duration) || 30))} cal/{duration || 30}min
                                    </span>
                                  )}
                                  {(!userProfile?.weight || !duration) && (
                                    <span className="text-gray-400 ml-1">
                                      Set duration to see calories
                                    </span>
                                  )}
                                </p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                {exercise.met}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>

                      {userProfile?.weight && (
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            💡 Calories are auto-calculated based on your weight ({userProfile.weight}kg) and exercise duration
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>

          {/* Recent Exercise Records */}
          <div className="space-y-6">
            <GlassCard variant="premium">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Exercises
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentExercises.map((exercise) => (
                    <div 
                      key={exercise.id}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {exercise.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(exercise.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>
                          Type: {exercise.type}
                        </div>
                        <div>
                          Duration: {exercise.duration} minutes
                        </div>
                        <div>
                          Calories Burned: <p className="font-semibold">{exercise.calories_burned} cal</p>
                        </div>
                        {exercise.notes && (
                          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 italic">
                            "{exercise.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {exerciseItems.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No exercise records yet. Start logging your workouts!
                    </p>
                  )}
                </div>
              </CardContent>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTracker;
