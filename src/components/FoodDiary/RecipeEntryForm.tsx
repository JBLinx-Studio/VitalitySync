
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Plus, X, Clock, Users } from 'lucide-react';

interface Recipe {
  id: string;
  title: string;
  image?: string;
  readyInMinutes: number;
  servings: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

interface RecipeEntryFormProps {
  recipe: Recipe;
  onAddRecipe: (recipeData: any) => void;
  onCancel: () => void;
}

const RecipeEntryForm: React.FC<RecipeEntryFormProps> = ({ recipe, onAddRecipe, onCancel }) => {
  const [servings, setServings] = useState('1');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  
  const multiplier = parseFloat(servings) || 1;
  const adjustedNutrition = {
    calories: Math.round(recipe.nutrition.calories * multiplier),
    protein: Math.round(recipe.nutrition.protein * multiplier * 10) / 10,
    carbs: Math.round(recipe.nutrition.carbs * multiplier * 10) / 10,
    fat: Math.round(recipe.nutrition.fat * multiplier * 10) / 10,
    fiber: Math.round(recipe.nutrition.fiber * multiplier * 10) / 10,
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipeData = {
      name: recipe.title,
      calories: adjustedNutrition.calories,
      protein: adjustedNutrition.protein,
      carbs: adjustedNutrition.carbs,
      fat: adjustedNutrition.fat,
      fiber: adjustedNutrition.fiber,
      serving_size: `${servings} serving(s)`,
      meal_type: mealType,
      quantity: 1,
      date: new Date().toISOString().split('T')[0],
      recipe_id: recipe.id
    };
    
    onAddRecipe(recipeData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-purple-500" />
            Add Recipe to Diary
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recipe Info */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
          <div className="flex gap-4">
            {recipe.image && (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.readyInMinutes} min
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {recipe.servings} servings
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Calories:</span>
              <span className="ml-1 font-semibold">{adjustedNutrition.calories}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Protein:</span>
              <span className="ml-1 font-semibold">{adjustedNutrition.protein}g</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Carbs:</span>
              <span className="ml-1 font-semibold">{adjustedNutrition.carbs}g</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Fat:</span>
              <span className="ml-1 font-semibold">{adjustedNutrition.fat}g</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Fiber:</span>
              <span className="ml-1 font-semibold">{adjustedNutrition.fiber}g</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="servings">Number of Servings</Label>
              <Input
                id="servings"
                type="number"
                step="0.5"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                min="0.1"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Original recipe serves {recipe.servings}
              </p>
            </div>
            
            <div>
              <Label>Meal Type</Label>
              <Select value={mealType} onValueChange={(value: any) => setMealType(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                  <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                  <SelectItem value="lunch">☀️ Lunch</SelectItem>
                  <SelectItem value="dinner">🌙 Dinner</SelectItem>
                  <SelectItem value="snack">🍎 Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Recipe to Diary
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

export default RecipeEntryForm;
