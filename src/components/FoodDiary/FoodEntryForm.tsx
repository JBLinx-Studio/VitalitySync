
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Utensils, Plus, X } from 'lucide-react';
import { Food, extractNutrients, calculateNutrientsByWeight } from '@/services/foodService';

interface FoodEntryFormProps {
  food: Food;
  onAddFood: (foodData: any) => void;
  onCancel: () => void;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({ food, onAddFood, onCancel }) => {
  const [quantity, setQuantity] = useState('1');
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [weightInGrams, setWeightInGrams] = useState('100');
  
  const baseNutrients = extractNutrients(food);
  const calculatedNutrients = calculateNutrientsByWeight(baseNutrients, parseInt(weightInGrams) || 100);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const foodData = {
      name: food.description || 'Unknown Food',
      calories: calculatedNutrients.calories,
      protein: calculatedNutrients.protein,
      carbs: calculatedNutrients.carbs,
      fat: calculatedNutrients.fat,
      fiber: calculatedNutrients.fiber || 0,
      serving_size: `${weightInGrams}g`,
      meal_type: mealType,
      quantity: parseInt(quantity) || 1,
      date: new Date().toISOString().split('T')[0],
      brandName: food.brandName
    };
    
    onAddFood(foodData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-green-500" />
            Add to Food Diary
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Food Info */}
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <h3 className="font-semibold text-lg mb-2">{food.description}</h3>
          {food.brandName && (
            <Badge variant="outline" className="mb-2">{food.brandName}</Badge>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Calories:</span>
              <span className="ml-1 font-semibold">{calculatedNutrients.calories}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Protein:</span>
              <span className="ml-1 font-semibold">{calculatedNutrients.protein}g</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Carbs:</span>
              <span className="ml-1 font-semibold">{calculatedNutrients.carbs}g</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Fat:</span>
              <span className="ml-1 font-semibold">{calculatedNutrients.fat}g</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="weight">Weight (grams)</Label>
              <Input
                id="weight"
                type="number"
                value={weightInGrams}
                onChange={(e) => setWeightInGrams(e.target.value)}
                min="1"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="mt-1"
              />
            </div>
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

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add to Diary
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

export default FoodEntryForm;
