
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Plus, X, Zap } from 'lucide-react';
import { calculateCaloriesBurned } from '@/services/exerciseService';
import { useHealth } from '@/contexts/HealthContext';

interface Exercise {
  id: number;
  name: string;
  met: number;
}

interface ExerciseEntryFormProps {
  exercise: Exercise;
  onAddExercise: (exerciseData: any) => void;
  onCancel: () => void;
}

const ExerciseEntryForm: React.FC<ExerciseEntryFormProps> = ({ exercise, onAddExercise, onCancel }) => {
  const { userProfile } = useHealth();
  const [duration, setDuration] = useState('30');
  const [notes, setNotes] = useState('');
  
  const userWeight = userProfile?.weight || 70; // Default to 70kg if no weight set
  const calculatedCalories = calculateCaloriesBurned(exercise.met, userWeight, parseInt(duration) || 30);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const exerciseData = {
      name: exercise.name,
      type: 'cardio' as const, // Default type, could be made configurable
      duration: parseInt(duration) || 30,
      calories_burned: Math.round(calculatedCalories),
      date: new Date().toISOString().split('T')[0],
      notes: notes.trim() || undefined
    };
    
    onAddExercise(exerciseData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Dumbbell className="h-5 w-5 text-orange-500" />
            Log Exercise
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Exercise Info */}
        <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">{exercise.name}</h3>
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline" className="gap-1">
              <Zap className="w-3 h-3" />
              MET: {exercise.met}
            </Badge>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Estimated calories:</span>
              <span className="ml-1 font-semibold text-orange-600">{Math.round(calculatedCalories)} cal</span>
            </div>
          </div>
          {!userProfile?.weight && (
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              💡 Set your weight in profile for more accurate calorie calculations
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              max="600"
              className="mt-1"
              placeholder="30"
            />
            <p className="text-xs text-gray-500 mt-1">
              Calories will update automatically: ~{Math.round(calculatedCalories)} calories
            </p>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How did it feel? Any achievements or challenges..."
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" />
              Log Exercise
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExerciseEntryForm;
