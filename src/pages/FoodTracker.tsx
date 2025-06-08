
import React, { useState } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchFoods, Food } from '@/services/foodService';
import { Utensils, Search } from 'lucide-react';

// Import our new components
import FoodEntryForm from '@/components/FoodDiary/FoodEntryForm';
import FoodDiaryItem from '@/components/FoodDiary/FoodDiaryItem';
import NutritionSummaryCard from '@/components/FoodDiary/NutritionSummaryCard';
import FoodSearchResults from '@/components/FoodDiary/FoodSearchResults';
import WaterTracker from '@/components/FoodDiary/WaterTracker';

const FoodTracker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const { 
    addFoodItem, 
    getTodaysFoodItems, 
    getNutritionSummary,
    dailyGoals,
    updateWaterIntake,
    getTodaysWaterIntake,
    removeFoodItem
  } = useHealth();
  
  const waterIntake = getTodaysWaterIntake();
  const todaysFoodItems = getTodaysFoodItems();
  const nutritionSummary = getNutritionSummary();

  const handleSearch = async () => {
    if (searchQuery.trim() === '') return;
    
    setIsSearching(true);
    try {
      const results = await searchFoods(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching foods:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
  };

  const handleAddFood = (foodItem: any) => {
    const today = new Date().toISOString().split('T')[0];
    
    const newFoodItem = {
      id: crypto.randomUUID(),
      name: foodItem.name,
      servingSize: foodItem.servingSize,
      calories: foodItem.calories,
      protein: foodItem.protein,
      carbs: foodItem.carbs,
      fat: foodItem.fat,
      meal: foodItem.meal,
      date: today
    };
    
    addFoodItem(newFoodItem);
    setSelectedFood(null);
    setSearchResults([]);
    setSearchQuery('');
  };
  
  // Group food items by meal
  const foodByMeal = {
    breakfast: todaysFoodItems.filter(item => item.meal === 'breakfast'),
    lunch: todaysFoodItems.filter(item => item.meal === 'lunch'),
    dinner: todaysFoodItems.filter(item => item.meal === 'dinner'),
    snacks: todaysFoodItems.filter(item => item.meal === 'snacks')
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Food & Nutrition</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-health-primary/10 to-health-secondary/10">
              <CardTitle className="flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-health-primary" />
                Food Diary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="diary">
                <TabsList className="mb-4 bg-gray-100">
                  <TabsTrigger value="diary">Food Diary</TabsTrigger>
                  <TabsTrigger value="search">Add Food</TabsTrigger>
                  <TabsTrigger value="water">Water</TabsTrigger>
                </TabsList>
                
                <TabsContent value="diary" className="space-y-6">
                  {Object.entries(foodByMeal).map(([meal, items]) => (
                    <div key={meal} className="space-y-3">
                      <h3 className="font-medium capitalize text-lg flex items-center">
                        <div className="w-2 h-2 rounded-full bg-health-primary mr-2"></div>
                        {meal}
                      </h3>
                      {items.length > 0 ? (
                        <div className="space-y-2">
                          {items.map(item => (
                            <FoodDiaryItem 
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              servingSize={item.servingSize}
                              calories={item.calories}
                              protein={item.protein}
                              carbs={item.carbs}
                              fat={item.fat}
                              meal={item.meal}
                              onDelete={removeFoodItem}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-sm italic p-3 bg-gray-50 rounded-lg">
                          No foods added
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="mt-6 pt-6 border-t border-dashed">
                    <h3 className="font-medium text-lg mb-4">Daily Totals</h3>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm text-center">
                        <div className="text-sm text-gray-600">Calories</div>
                        <div className="font-bold text-xl text-gray-800">{nutritionSummary.totalCalories}</div>
                        <div className="text-xs text-gray-500">/ {dailyGoals.calories}</div>
                      </div>
                      <div className="bg-gradient-to-br from-health-protein/10 to-health-protein/20 p-4 rounded-xl shadow-sm text-center">
                        <div className="text-sm text-gray-600">Protein</div>
                        <div className="font-bold text-xl text-gray-800">{nutritionSummary.totalProtein}g</div>
                        <div className="text-xs text-gray-500">/ {dailyGoals.protein}g</div>
                      </div>
                      <div className="bg-gradient-to-br from-health-carbs/10 to-health-carbs/20 p-4 rounded-xl shadow-sm text-center">
                        <div className="text-sm text-gray-600">Carbs</div>
                        <div className="font-bold text-xl text-gray-800">{nutritionSummary.totalCarbs}g</div>
                        <div className="text-xs text-gray-500">/ {dailyGoals.carbs}g</div>
                      </div>
                      <div className="bg-gradient-to-br from-health-fat/10 to-health-fat/20 p-4 rounded-xl shadow-sm text-center">
                        <div className="text-sm text-gray-600">Fat</div>
                        <div className="font-bold text-xl text-gray-800">{nutritionSummary.totalFat}g</div>
                        <div className="text-xs text-gray-500">/ {dailyGoals.fat}g</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="search">
                  <div className="space-y-4">
                    <div className="flex">
                      <Input
                        placeholder="Search for foods..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 mr-2 bg-white"
                      />
                      <Button 
                        onClick={handleSearch} 
                        disabled={isSearching}
                        className="bg-gradient-primary hover:shadow-highlight transition-shadow"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        {isSearching ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                    
                    <FoodSearchResults 
                      results={searchResults}
                      isSearching={isSearching}
                      onSelectFood={handleSelectFood}
                    />
                    
                    {selectedFood && (
                      <FoodEntryForm
                        food={selectedFood}
                        onAddFood={handleAddFood}
                        onCancel={() => setSelectedFood(null)}
                      />
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="water">
                  <WaterTracker
                    waterIntake={waterIntake}
                    dailyGoal={dailyGoals.water}
                    onAddWater={updateWaterIntake}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <NutritionSummaryCard
            nutritionSummary={nutritionSummary}
            dailyGoals={dailyGoals}
            waterIntake={waterIntake}
          />
          
          {/* Additional Nutrition Tips Card */}
          <Card className="mt-6 shadow-card overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-health-primary/5 to-health-secondary/5 pb-2">
              <CardTitle className="text-lg text-gray-800">Nutrition Tips</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 rounded-lg border border-green-100">
                  <h4 className="font-medium text-sm text-gray-800">Balance Your Plate</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Aim to fill half your plate with vegetables, a quarter with proteins and a quarter with complex carbs.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-sm text-gray-800">Stay Hydrated</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Drinking enough water can help boost metabolism and prevent overeating.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-3 rounded-lg border border-yellow-100">
                  <h4 className="font-medium text-sm text-gray-800">Mindful Eating</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Pay attention to hunger cues and eat slowly to enjoy your food and prevent overeating.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FoodTracker;
