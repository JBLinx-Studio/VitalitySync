
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dumbbell, 
  Heart, 
  Zap, 
  Clock, 
  Target,
  Play,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

interface Workout {
  id: string;
  name: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'sports';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  calories: number;
  description: string;
  exercises: string[];
  equipment: string[];
  benefits: string[];
}

const WorkoutRecommendations: React.FC = () => {
  const { userProfile, exerciseItems } = useHealth();
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const workouts: Workout[] = [
    {
      id: '1',
      name: 'Morning Energy Boost',
      type: 'cardio',
      difficulty: 'beginner',
      duration: 15,
      calories: 120,
      description: 'Quick morning routine to energize your day',
      exercises: ['Jumping Jacks', 'High Knees', 'Butt Kicks', 'Mountain Climbers'],
      equipment: ['None'],
      benefits: ['Increased energy', 'Better mood', 'Improved circulation']
    },
    {
      id: '2',
      name: 'Strength Building Circuit',
      type: 'strength',
      difficulty: 'intermediate',
      duration: 30,
      calories: 200,
      description: 'Full-body strength training for muscle building',
      exercises: ['Push-ups', 'Squats', 'Lunges', 'Plank', 'Burpees'],
      equipment: ['Dumbbells (optional)'],
      benefits: ['Muscle strength', 'Bone density', 'Metabolism boost']
    },
    {
      id: '3',
      name: 'Flexibility & Mobility',
      type: 'flexibility',
      difficulty: 'beginner',
      duration: 20,
      calories: 60,
      description: 'Improve flexibility and reduce muscle tension',
      exercises: ['Cat-Cow Stretch', 'Downward Dog', 'Hip Flexor Stretch', 'Shoulder Rolls'],
      equipment: ['Yoga mat'],
      benefits: ['Better flexibility', 'Reduced tension', 'Improved posture']
    },
    {
      id: '4',
      name: 'HIIT Fat Burner',
      type: 'cardio',
      difficulty: 'advanced',
      duration: 25,
      calories: 300,
      description: 'High-intensity interval training for maximum calorie burn',
      exercises: ['Burpees', 'Sprint Intervals', 'Jump Squats', 'Battle Ropes'],
      equipment: ['Timer', 'Battle ropes (optional)'],
      benefits: ['Fat burning', 'Cardiovascular health', 'Time efficient']
    },
    {
      id: '5',
      name: 'Beginner Yoga Flow',
      type: 'flexibility',
      difficulty: 'beginner',
      duration: 30,
      calories: 90,
      description: 'Gentle yoga sequence for relaxation and flexibility',
      exercises: ['Sun Salutation', 'Warrior Pose', 'Child\'s Pose', 'Savasana'],
      equipment: ['Yoga mat'],
      benefits: ['Stress relief', 'Flexibility', 'Mind-body connection']
    },
    {
      id: '6',
      name: 'Power Lifting Session',
      type: 'strength',
      difficulty: 'advanced',
      duration: 45,
      calories: 250,
      description: 'Advanced strength training with compound movements',
      exercises: ['Deadlifts', 'Squats', 'Bench Press', 'Pull-ups'],
      equipment: ['Barbell', 'Dumbbells', 'Pull-up bar'],
      benefits: ['Maximum strength', 'Muscle mass', 'Functional fitness']
    }
  ];

  // Get user's fitness level and preferences
  const userFitnessLevel = useMemo(() => {
    const recentWorkouts = exerciseItems.length;
    if (recentWorkouts === 0) return 'beginner';
    if (recentWorkouts < 10) return 'beginner';
    if (recentWorkouts < 25) return 'intermediate';
    return 'advanced';
  }, [exerciseItems]);

  // Filter workouts based on user preferences and fitness level
  const recommendedWorkouts = useMemo(() => {
    let filtered = workouts;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(w => w.type === selectedType);
    }

    // Prioritize workouts matching user's fitness level
    return filtered.sort((a, b) => {
      if (a.difficulty === userFitnessLevel && b.difficulty !== userFitnessLevel) return -1;
      if (b.difficulty === userFitnessLevel && a.difficulty !== userFitnessLevel) return 1;
      return 0;
    });
  }, [selectedType, userFitnessLevel]);

  const workoutTypes = [
    { value: 'all', label: 'All Workouts', icon: Target },
    { value: 'cardio', label: 'Cardio', icon: Heart },
    { value: 'strength', label: 'Strength', icon: Dumbbell },
    { value: 'flexibility', label: 'Flexibility', icon: Zap }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'cardio': return 'text-red-600 dark:text-red-400';
      case 'strength': return 'text-blue-600 dark:text-blue-400';
      case 'flexibility': return 'text-purple-600 dark:text-purple-400';
      case 'sports': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard variant="premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            Workout Recommendations
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Award className="w-4 h-4" />
            <span>Recommended for: {userFitnessLevel} level</span>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {workoutTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className="flex items-center gap-2"
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Workouts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedWorkouts.map((workout) => (
              <Card 
                key={workout.id}
                className="bg-white/50 dark:bg-slate-700/50 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-lg">{workout.name}</h3>
                      <Badge className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>

                    {/* Type and Duration */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className={cn("flex items-center gap-1", getTypeColor(workout.type))}>
                        {workout.type === 'cardio' && <Heart className="w-4 h-4" />}
                        {workout.type === 'strength' && <Dumbbell className="w-4 h-4" />}
                        {workout.type === 'flexibility' && <Zap className="w-4 h-4" />}
                        <span className="capitalize">{workout.type}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </div>
                    </div>

                    {/* Calories */}
                    <div className="text-sm">
                      <span className="text-orange-600 dark:text-orange-400 font-semibold">
                        ~{workout.calories} calories
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {workout.description}
                    </p>

                    {/* Exercises Preview */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Key Exercises:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {workout.exercises.slice(0, 3).map((exercise, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {exercise}
                          </Badge>
                        ))}
                        {workout.exercises.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{workout.exercises.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Equipment */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Equipment:
                      </p>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {workout.equipment.join(', ')}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button 
                      className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      size="sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Workout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {recommendedWorkouts.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No workouts found for the selected type. Try a different filter!
              </p>
            </div>
          )}
        </CardContent>
      </GlassCard>

      {/* Personalized Tips */}
      <GlassCard variant="premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-500" />
            Personalized Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                For Your Fitness Level
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {userFitnessLevel === 'beginner' && 
                  "Start with 2-3 workouts per week, focusing on form over intensity. Gradually increase duration as you build endurance."
                }
                {userFitnessLevel === 'intermediate' && 
                  "Aim for 4-5 workouts per week. Mix different types of exercises and start incorporating more challenging movements."
                }
                {userFitnessLevel === 'advanced' && 
                  "Focus on progressive overload and advanced techniques. Consider periodization and recovery planning."
                }
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                Consistency Tips
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Start with shorter workouts you can maintain consistently. It's better to do 15 minutes daily than 60 minutes once a week.
              </p>
            </div>
          </div>
        </CardContent>
      </GlassCard>
    </div>
  );
};

export default WorkoutRecommendations;
