
import React, { useState, useEffect } from 'react';
import { Food, extractNutrients, calculateNutrientsByWeight, calculateNutrientsByServings } from '@/services/foodService';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Utensils, Plus, X } from 'lucide-react';

interface FoodEntryFormProps {
  food: Food;
  onAddFood: (foodData: {
    name: string;
    servingSize: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal: string;
  }) => void;
  onCancel: () => void;
}

const FoodEntryForm: React.FC<FoodEntryFormProps> = ({ food, onAddFood, onCancel }) => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [servingSize, setServingSize] = useState('1');
  const [gramAmount, setGramAmount] = useState('100');
  const [measurementType, setMeasurementType] = useState<'servings' | 'grams'>('servings');
  const [nutrients, setNutrients] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0
  });
  
  const baseNutrients = extractNutrients(food);
  
  useEffect(() => {
    if (measurementType === 'servings') {
      const servingNum = parseFloat(servingSize) || 0;
      const calculatedNutrients = calculateNutrientsByServings(baseNutrients, servingNum);
      setNutrients(calculatedNutrients);
    } else {
      const grams = parseFloat(gramAmount) || 0;
      const calculatedNutrients = calculateNutrientsByWeight(baseNutrients, grams);
      setNutrients(calculatedNutrients);
    }
  }, [servingSize, gramAmount, measurementType, food]);
  
  const handleAddFood = () => {
    const amount = measurementType === 'servings' 
      ? `${servingSize} ${baseNutrients.servingSizeUnit}`
      : `${gramAmount}g`;
      
    onAddFood({
      name: food.description,
      servingSize: amount,
      calories: nutrients.calories,
      protein: nutrients.protein,
      carbs: nutrients.carbs,
      fat: nutrients.fat,
      meal: selectedMeal
    });
  };
  
  return (
    <Card className="border p-4 rounded-lg shadow-card bg-gradient-card">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-health-primary" />
          {food.description}
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="meal">Meal</Label>
          <Select value={selectedMeal} onValueChange={setSelectedMeal}>
            <SelectTrigger id="meal" className="bg-white">
              <SelectValue placeholder="Select meal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snacks">Snacks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Tabs defaultValue="servings" onValueChange={(val) => setMeasurementType(val as 'servings' | 'grams')}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="servings">Servings</TabsTrigger>
            <TabsTrigger value="grams">Grams</TabsTrigger>
          </TabsList>
          
          <TabsContent value="servings" className="pt-4">
            <div>
              <Label htmlFor="servingSize">Number of Servings</Label>
              <div className="flex items-center">
                <Input
                  id="servingSize"
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                  className="bg-white"
                />
                <span className="ml-2 text-gray-500">{baseNutrients.servingSizeUnit}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                1 serving = {baseNutrients.servingSize}{baseNutrients.servingSizeUnit}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="grams" className="pt-4">
            <div>
              <Label htmlFor="gramAmount">Amount in Grams</Label>
              <div className="flex items-center">
                <Input
                  id="gramAmount"
                  type="number"
                  min="1"
                  step="1"
                  value={gramAmount}
                  onChange={(e) => setGramAmount(e.target.value)}
                  className="bg-white"
                />
                <span className="ml-2 text-gray-500">g</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Values are calculated per 100g by default
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Nutrition Information</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-2 rounded-lg text-center shadow-sm">
              <div className="text-xs text-gray-600">Calories</div>
              <div className="font-bold text-gray-800">{nutrients.calories}</div>
            </div>
            <div className="bg-gradient-to-br from-health-protein/10 to-health-protein/20 p-2 rounded-lg text-center shadow-sm">
              <div className="text-xs text-gray-600">Protein</div>
              <div className="font-bold text-gray-800">{nutrients.protein}g</div>
            </div>
            <div className="bg-gradient-to-br from-health-carbs/10 to-health-carbs/20 p-2 rounded-lg text-center shadow-sm">
              <div className="text-xs text-gray-600">Carbs</div>
              <div className="font-bold text-gray-800">{nutrients.carbs}g</div>
            </div>
            <div className="bg-gradient-to-br from-health-fat/10 to-health-fat/20 p-2 rounded-lg text-center shadow-sm">
              <div className="text-xs text-gray-600">Fat</div>
              <div className="font-bold text-gray-800">{nutrients.fat}g</div>
            </div>
            <div className="bg-gradient-to-br from-health-fiber/10 to-health-fiber/20 p-2 rounded-lg text-center shadow-sm">
              <div className="text-xs text-gray-600">Fiber</div>
              <div className="font-bold text-gray-800">{nutrients.fiber}g</div>
            </div>
            <div className="bg-gradient-to-br from-health-sugar/10 to-health-sugar/20 p-2 rounded-lg text-center shadow-sm">
              <div className="text-xs text-gray-600">Sugar</div>
              <div className="font-bold text-gray-800">{nutrients.sugar}g</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleAddFood} className="bg-gradient-primary hover:shadow-highlight transition-shadow">
            <Plus className="h-4 w-4 mr-2" />
            Add to Diary
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FoodEntryForm;
