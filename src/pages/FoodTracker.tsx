
import React, { useState, useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { searchFoods, Food, extractNutrients } from '@/services/foodService';
import { Utensils, Search, Plus, Minus } from 'lucide-react';

const FoodTracker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [servingSize, setServingSize] = useState('1');
  const [isSearching, setIsSearching] = useState(false);
  
  const { 
    addFoodItem, 
    getTodaysFoodItems, 
    getNutritionSummary,
    dailyGoals,
    updateWaterIntake,
    getTodaysWaterIntake
  } = useHealth();
  
  const [waterAmount, setWaterAmount] = useState(250);
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
    setServingSize('1');
  };

  const handleAddFood = () => {
    if (!selectedFood) return;
    
    const today = new Date().toISOString().split('T')[0];
    const nutrients = extractNutrients(selectedFood);
    const servingSizeNum = parseFloat(servingSize);
    
    if (isNaN(servingSizeNum) || servingSizeNum <= 0) {
      alert('Please enter a valid serving size');
      return;
    }
    
    const foodItem = {
      id: crypto.randomUUID(),
      name: selectedFood.description,
      servingSize: `${servingSizeNum} ${nutrients.servingSizeUnit}`,
      calories: Math.round(nutrients.calories * servingSizeNum),
      protein: Math.round(nutrients.protein * servingSizeNum * 10) / 10,
      carbs: Math.round(nutrients.carbs * servingSizeNum * 10) / 10,
      fat: Math.round(nutrients.fat * servingSizeNum * 10) / 10,
      meal: selectedMeal,
      date: today
    };
    
    addFoodItem(foodItem);
    setSelectedFood(null);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleAddWater = () => {
    if (waterAmount > 0) {
      updateWaterIntake(waterAmount);
    }
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Utensils className="mr-2 h-5 w-5 text-health-primary" />
              Food Diary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="diary">
              <TabsList className="mb-4">
                <TabsTrigger value="diary">Food Diary</TabsTrigger>
                <TabsTrigger value="search">Add Food</TabsTrigger>
                <TabsTrigger value="water">Water</TabsTrigger>
              </TabsList>
              
              <TabsContent value="diary" className="space-y-4">
                {Object.entries(foodByMeal).map(([meal, items]) => (
                  <div key={meal} className="space-y-2">
                    <h3 className="font-medium capitalize text-lg">{meal}</h3>
                    {items.length > 0 ? (
                      <div className="space-y-2">
                        {items.map(item => (
                          <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.servingSize}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{item.calories} kcal</div>
                              <div className="text-xs text-gray-500">
                                P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm italic">No foods added</div>
                    )}
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t">
                  <h3 className="font-medium text-lg">Daily Totals</h3>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    <div className="bg-gray-100 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Calories</div>
                      <div className="font-bold">{nutritionSummary.totalCalories}</div>
                      <div className="text-xs text-gray-500">/ {dailyGoals.calories}</div>
                    </div>
                    <div className="bg-health-protein bg-opacity-10 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Protein</div>
                      <div className="font-bold">{nutritionSummary.totalProtein}g</div>
                      <div className="text-xs text-gray-500">/ {dailyGoals.protein}g</div>
                    </div>
                    <div className="bg-health-carbs bg-opacity-10 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Carbs</div>
                      <div className="font-bold">{nutritionSummary.totalCarbs}g</div>
                      <div className="text-xs text-gray-500">/ {dailyGoals.carbs}g</div>
                    </div>
                    <div className="bg-health-fat bg-opacity-10 p-3 rounded-lg text-center">
                      <div className="text-sm text-gray-600">Fat</div>
                      <div className="font-bold">{nutritionSummary.totalFat}g</div>
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
                      className="flex-1 mr-2"
                    />
                    <Button onClick={handleSearch} disabled={isSearching}>
                      <Search className="h-4 w-4 mr-2" />
                      {isSearching ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                  
                  {searchResults.length > 0 && !selectedFood && (
                    <div className="mt-4">
                      <h3 className="font-medium mb-2">Search Results</h3>
                      <div className="max-h-80 overflow-y-auto space-y-2">
                        {searchResults.map((food) => (
                          <div
                            key={food.fdcId}
                            onClick={() => handleSelectFood(food)}
                            className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                          >
                            <div className="font-medium">{food.description}</div>
                            <div className="text-sm text-gray-500">
                              {food.brandName ? `${food.brandName}` : 'Generic'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedFood && (
                    <div className="border p-4 rounded-lg mt-4">
                      <h3 className="font-medium text-lg mb-3">{selectedFood.description}</h3>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="meal">Meal</Label>
                            <Select
                              value={selectedMeal}
                              onValueChange={setSelectedMeal}
                            >
                              <SelectTrigger id="meal">
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
                          
                          <div>
                            <Label htmlFor="servingSize">Servings</Label>
                            <Input
                              id="servingSize"
                              type="number"
                              min="0.25"
                              step="0.25"
                              value={servingSize}
                              onChange={(e) => setServingSize(e.target.value)}
                            />
                          </div>
                        </div>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Nutrition (per serving)</h4>
                          <div className="grid grid-cols-4 gap-2">
                            {(() => {
                              const nutrients = extractNutrients(selectedFood);
                              const servingSizeNum = parseFloat(servingSize) || 0;
                              
                              return (
                                <>
                                  <div className="bg-gray-100 p-2 rounded text-center">
                                    <div className="text-xs text-gray-600">Calories</div>
                                    <div className="font-bold">{Math.round(nutrients.calories * servingSizeNum)}</div>
                                  </div>
                                  <div className="bg-health-protein bg-opacity-10 p-2 rounded text-center">
                                    <div className="text-xs text-gray-600">Protein</div>
                                    <div className="font-bold">
                                      {Math.round(nutrients.protein * servingSizeNum * 10) / 10}g
                                    </div>
                                  </div>
                                  <div className="bg-health-carbs bg-opacity-10 p-2 rounded text-center">
                                    <div className="text-xs text-gray-600">Carbs</div>
                                    <div className="font-bold">
                                      {Math.round(nutrients.carbs * servingSizeNum * 10) / 10}g
                                    </div>
                                  </div>
                                  <div className="bg-health-fat bg-opacity-10 p-2 rounded text-center">
                                    <div className="text-xs text-gray-600">Fat</div>
                                    <div className="font-bold">
                                      {Math.round(nutrients.fat * servingSizeNum * 10) / 10}g
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-2">
                          <Button variant="outline" onClick={() => setSelectedFood(null)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddFood}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add to Diary
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="water">
                <div className="space-y-4">
                  <div className="bg-health-water bg-opacity-10 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Water Intake</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>Today's intake</span>
                        <span className="font-medium">{waterIntake}ml / {dailyGoals.water}ml</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-health-water h-2.5 rounded-full" 
                          style={{ width: `${Math.min((waterIntake / dailyGoals.water) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 flex-1">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setWaterAmount(Math.max(50, waterAmount - 50))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={waterAmount}
                          onChange={(e) => setWaterAmount(parseInt(e.target.value) || 0)}
                          className="text-center"
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => setWaterAmount(waterAmount + 50)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-gray-500 text-sm mr-3">ml</div>
                      <Button onClick={handleAddWater}>Add Water</Button>
                    </div>
                    
                    <div className="flex justify-between mt-4">
                      <Button variant="ghost" onClick={() => updateWaterIntake(250)}>+ 250ml</Button>
                      <Button variant="ghost" onClick={() => updateWaterIntake(500)}>+ 500ml</Button>
                      <Button variant="ghost" onClick={() => updateWaterIntake(1000)}>+ 1000ml</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Calories</span>
                  <span className="text-sm text-gray-500">
                    {nutritionSummary.totalCalories} / {dailyGoals.calories}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-health-primary h-2 rounded-full" 
                    style={{ width: `${Math.min((nutritionSummary.totalCalories / dailyGoals.calories) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Protein</span>
                  <span className="text-sm text-gray-500">
                    {nutritionSummary.totalProtein}g / {dailyGoals.protein}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-health-protein h-2 rounded-full" 
                    style={{ width: `${Math.min((nutritionSummary.totalProtein / dailyGoals.protein) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Carbohydrates</span>
                  <span className="text-sm text-gray-500">
                    {nutritionSummary.totalCarbs}g / {dailyGoals.carbs}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-health-carbs h-2 rounded-full" 
                    style={{ width: `${Math.min((nutritionSummary.totalCarbs / dailyGoals.carbs) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Fat</span>
                  <span className="text-sm text-gray-500">
                    {nutritionSummary.totalFat}g / {dailyGoals.fat}g
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-health-fat h-2 rounded-full" 
                    style={{ width: `${Math.min((nutritionSummary.totalFat / dailyGoals.fat) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Water</span>
                  <span className="text-sm text-gray-500">
                    {waterIntake}ml / {dailyGoals.water}ml
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-health-water h-2 rounded-full" 
                    style={{ width: `${Math.min((waterIntake / dailyGoals.water) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodTracker;
