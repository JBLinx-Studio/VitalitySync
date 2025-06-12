import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Search, 
  Plus, 
  Utensils, 
  Clock,
  TrendingUp,
  Zap,
  Star,
  Calendar,
  BarChart3,
  ChefHat,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';
import { useHealth } from '@/contexts/HealthContext';
import { Food, searchFoods } from '@/services/foodService';
import FoodSearchResults from '@/components/FoodDiary/FoodSearchResults';
import FoodEntryForm from '@/components/FoodDiary/FoodEntryForm';
import BarcodeScanner from '@/components/BarcodeScanner';

const FoodTracker: React.FC = () => {
  const { dailyGoals, todayData, addFoodItem } = useHealth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchFoods(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectFood = (food: Food) => {
    setSelectedFood(food);
  };

  const handleAddFood = (foodData: any) => {
    addFoodItem({
      ...foodData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      quantity: 1
    });
    setSelectedFood(null);
    setSearchResults([]);
    setSearchQuery('');
  };

  const handleBarcodeResult = (product: any) => {
    // Convert barcode result to food format and add
    handleAddFood({
      name: product.name,
      servingSize: product.servingSize,
      calories: product.calories,
      protein: product.nutrition.protein,
      carbs: product.nutrition.carbs,
      fat: product.nutrition.fat,
      meal: selectedMeal
    });
    setShowBarcodeScanner(false);
  };

  const macroData = [
    { 
      name: 'Protein', 
      current: todayData?.protein || 0, 
      goal: dailyGoals.protein, 
      color: 'from-blue-500 to-cyan-500',
      unit: 'g'
    },
    { 
      name: 'Carbs', 
      current: todayData?.carbs || 0, 
      goal: dailyGoals.carbs, 
      color: 'from-green-500 to-emerald-500',
      unit: 'g'
    },
    { 
      name: 'Fat', 
      current: todayData?.fat || 0, 
      goal: dailyGoals.fat, 
      color: 'from-purple-500 to-pink-500',
      unit: 'g'
    }
  ];

  const recentFoods = [
    { name: 'Greek Yogurt', calories: 150, protein: 15, brand: 'Chobani' },
    { name: 'Banana', calories: 105, protein: 1, brand: 'Fresh' },
    { name: 'Oatmeal', calories: 154, protein: 5, brand: 'Quaker' },
    { name: 'Chicken Breast', calories: 231, protein: 43, brand: 'Organic' }
  ];

  const meals = [
    { id: 'breakfast', name: 'Breakfast', icon: '🌅', foods: 2, calories: 420 },
    { id: 'lunch', name: 'Lunch', icon: '☀️', foods: 3, calories: 650 },
    { id: 'dinner', name: 'Dinner', icon: '🌙', foods: 1, calories: 380 },
    { id: 'snacks', name: 'Snacks', icon: '🍎', foods: 2, calories: 200 }
  ];

  const currentCalories = todayData?.calories || 0;
  const calorieProgress = (currentCalories / dailyGoals.calories) * 100;

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Food Tracker 🍽️
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            Track your nutrition with precision and ease
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="glass" 
            size="lg" 
            className="gap-2"
            onClick={() => setShowBarcodeScanner(true)}
          >
            <Camera className="w-5 h-5" />
            Scan Barcode
          </Button>
          <Button variant="glass-primary" size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Add Food
          </Button>
        </div>
      </div>

      {/* Daily Summary */}
      <GlassCard variant="premium" className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calories */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="rgba(156, 163, 175, 0.3)"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="url(#calorieGradient)"
                    strokeWidth="3"
                    strokeDasharray={`${calorieProgress}, 100`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="calorieGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{currentCalories}</span>
                  <span className="text-xs text-gray-500">/ {dailyGoals.calories}</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg">Calories</h3>
              <p className="text-sm text-gray-500">{(100 - calorieProgress).toFixed(0)}% remaining</p>
            </div>
          </div>

          {/* Macros */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-lg mb-4">Macronutrients</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {macroData.map((macro, index) => {
                const percentage = Math.min((macro.current / macro.goal) * 100, 100);
                return (
                  <div key={index} className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{macro.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl font-bold">{macro.current}{macro.unit}</span>
                      <span className="text-sm text-gray-500">/ {macro.goal}{macro.unit}</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full bg-gradient-to-r transition-all duration-500", macro.color)}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </GlassCard>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="log">Log Food</TabsTrigger>
          <TabsTrigger value="search">Search Foods</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="log" className="space-y-6">
          {/* Search Bar */}
          <GlassCard variant="premium" className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for foods, brands, or scan barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button variant="glass" size="lg" className="gap-2 px-8">
                <Camera className="w-5 h-5" />
                Scan
              </Button>
            </div>

            {/* Quick Add Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {['Water', 'Coffee', 'Apple', 'Bread'].map((item) => (
                <Button key={item} variant="outline" className="h-12 gap-2">
                  <Plus className="w-4 h-4" />
                  {item}
                </Button>
              ))}
            </div>
          </GlassCard>

          {/* Recent Foods */}
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" />
              Recent Foods
            </h3>
            <div className="grid gap-3">
              {recentFoods.map((food, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold">
                      {food.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{food.name}</h4>
                      <p className="text-sm text-gray-500">{food.brand}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{food.calories} cal</p>
                    <p className="text-sm text-gray-500">{food.protein}g protein</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <GlassCard variant="premium" className="p-6">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search USDA food database (e.g., 'chicken breast', 'apple')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 h-12"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className="gap-2 px-8"
              >
                <Search className="w-5 h-5" />
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {selectedFood ? (
              <FoodEntryForm
                food={selectedFood}
                onAddFood={handleAddFood}
                onCancel={() => setSelectedFood(null)}
              />
            ) : (
              <FoodSearchResults
                results={searchResults}
                isSearching={isSearching}
                onSelectFood={handleSelectFood}
              />
            )}
          </GlassCard>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-green-500" />
              Recipe & Diet Search
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Find Recipes</h4>
                <Input placeholder="Search for healthy recipes..." />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Keto</Button>
                  <Button variant="outline" size="sm">Vegan</Button>
                  <Button variant="outline" size="sm">Low-carb</Button>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium">Diet Plans</h4>
                <Input placeholder="Search diet plans..." />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Mediterranean</Button>
                  <Button variant="outline" size="sm">Paleo</Button>
                  <Button variant="outline" size="sm">DASH</Button>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              🔧 Recipe search integration coming soon with Spoonacular API
            </p>
          </GlassCard>
        </TabsContent>

        <TabsContent value="meals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <GlassCard key={meal.id} variant="premium" className="p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className="text-center">
                  <div className="text-4xl mb-3">{meal.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{meal.calories}</p>
                    <p className="text-sm text-gray-500">calories</p>
                    <p className="text-xs text-gray-400">{meal.foods} foods logged</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              Nutrition Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                <h4 className="font-medium mb-2">Nutrient Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track micronutrients, vitamins, and minerals in your diet
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                <h4 className="font-medium mb-2">Meal Suggestions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI-powered meal recommendations based on your goals
                </p>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={showBarcodeScanner}
        onClose={() => setShowBarcodeScanner(false)}
        onScanResult={handleBarcodeResult}
      />
    </div>
  );
};

export default FoodTracker;
