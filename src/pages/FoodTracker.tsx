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
  BookOpen,
  Scan,
  Coffee,
  Apple,
  Droplets
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';
import { useHealth } from '@/contexts/HealthContext';
import { Food, searchFoods } from '@/services/foodService';
import { searchByBarcode, searchFreeRecipes, getApiStatus } from '@/services/apiIntegrations';
import FoodSearchResults from '@/components/FoodDiary/FoodSearchResults';
import FoodEntryForm from '@/components/FoodDiary/FoodEntryForm';
import BarcodeScanner from '@/components/BarcodeScanner';
import { useViewport } from '@/hooks/use-viewport';

const FoodTracker: React.FC = () => {
  const { dailyGoals, todayData, addFoodItem } = useHealth();
  const { isMobile, isTablet } = useViewport();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const [recipes, setRecipes] = useState<any[]>([]);

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

  const handleBarcodeSearch = async (barcode: string) => {
    try {
      const product = await searchByBarcode(barcode);
      if (product) {
        handleAddFood({
          ...product,
          meal: selectedMeal
        });
      }
    } catch (error) {
      console.error('Barcode search failed:', error);
    }
  };

  const handleRecipeSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const recipeResults = await searchFreeRecipes(searchQuery);
      setRecipes(recipeResults);
    } catch (error) {
      console.error('Recipe search failed:', error);
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
      unit: 'g',
      icon: '💪'
    },
    { 
      name: 'Carbs', 
      current: todayData?.carbs || 0, 
      goal: dailyGoals.carbs, 
      color: 'from-green-500 to-emerald-500',
      unit: 'g',
      icon: '🌾'
    },
    { 
      name: 'Fat', 
      current: todayData?.fat || 0, 
      goal: dailyGoals.fat, 
      color: 'from-purple-500 to-pink-500',
      unit: 'g',
      icon: '🥑'
    }
  ];

  const quickAddFoods = [
    { name: 'Water', icon: <Droplets className="w-4 h-4" />, color: 'bg-blue-500' },
    { name: 'Coffee', icon: <Coffee className="w-4 h-4" />, color: 'bg-amber-600' },
    { name: 'Apple', icon: <Apple className="w-4 h-4" />, color: 'bg-red-500' },
    { name: 'Banana', icon: '🍌', color: 'bg-yellow-500' }
  ];

  const meals = [
    { id: 'breakfast', name: 'Breakfast', icon: '🌅', foods: 2, calories: 420, color: 'from-orange-400 to-red-500' },
    { id: 'lunch', name: 'Lunch', icon: '☀️', foods: 3, calories: 650, color: 'from-yellow-400 to-orange-500' },
    { id: 'dinner', name: 'Dinner', icon: '🌙', foods: 1, calories: 380, color: 'from-purple-400 to-pink-500' },
    { id: 'snacks', name: 'Snacks', icon: '🍎', foods: 2, calories: 200, color: 'from-green-400 to-emerald-500' }
  ];

  const currentCalories = todayData?.calories || 0;
  const calorieProgress = (currentCalories / dailyGoals.calories) * 100;

  // Responsive settings
  const headerSize = isMobile ? 'text-2xl' : isTablet ? 'text-3xl' : 'text-4xl';
  const cardPadding = isMobile ? 'p-3' : isTablet ? 'p-4' : 'p-6';
  const gridCols = isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3';
  const buttonSize = isMobile ? 'sm' : 'lg';
  const spacing = isMobile ? 'space-y-4' : 'space-y-8';

  return (
    <div className={cn(spacing, cardPadding)}>
      {/* Enhanced Responsive Header */}
      <div className={cn(
        "flex flex-col gap-4",
        isMobile ? "items-center text-center" : "lg:flex-row justify-between items-start lg:items-center"
      )}>
        <div>
          <h1 className={cn(
            "font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent",
            headerSize
          )}>
            Nutrition Hub 🍽️
          </h1>
          <p className={cn(
            "text-gray-600 dark:text-gray-300 mt-2",
            isMobile ? "text-sm" : isTablet ? "text-base" : "text-lg"
          )}>
            Track nutrition with precision and discover healthy recipes
          </p>
        </div>
        <div className={cn("flex gap-2", isMobile ? "flex-col w-full" : "flex-row")}>
          <Button 
            variant="glass" 
            size={buttonSize}
            className="gap-2"
            onClick={() => setShowBarcodeScanner(true)}
          >
            <Scan className={cn(isMobile ? "w-4 h-4" : "w-5 h-5")} />
            Scan Barcode
          </Button>
          <Button variant="glass-primary" size={buttonSize} className="gap-2">
            <Plus className={cn(isMobile ? "w-4 h-4" : "w-5 h-5")} />
            Add Food
          </Button>
        </div>
      </div>

      {/* Enhanced Daily Summary with better mobile layout */}
      <GlassCard variant="premium" className={cardPadding}>
        <div className={cn(
          "grid gap-6",
          isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-4"
        )}>
          {/* Calories Circle - Enhanced for mobile */}
          <div className="lg:col-span-1">
            <div className="text-center">
              <div className={cn(
                "relative mx-auto mb-4",
                isMobile ? "w-24 h-24" : "w-32 h-32"
              )}>
                <svg className={cn("transform -rotate-90", isMobile ? "w-24 h-24" : "w-32 h-32")} viewBox="0 0 36 36">
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
                    strokeDasharray={`${Math.min(calorieProgress, 100)}, 100`}
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
                  <span className={cn("font-bold", isMobile ? "text-lg" : "text-2xl")}>{currentCalories}</span>
                  <span className={cn("text-gray-500", isMobile ? "text-xs" : "text-xs")}>/ {dailyGoals.calories}</span>
                </div>
              </div>
              <h3 className={cn("font-semibold", isMobile ? "text-base" : "text-lg")}>Calories 🔥</h3>
              <p className={cn("text-gray-500", isMobile ? "text-xs" : "text-sm")}>
                {Math.max(0, dailyGoals.calories - currentCalories)} remaining
              </p>
            </div>
          </div>

          {/* Enhanced Macros with better mobile layout */}
          <div className="lg:col-span-3">
            <h3 className={cn("font-semibold mb-4", isMobile ? "text-base" : "text-lg")}>Macronutrients</h3>
            <div className={cn("grid gap-3", isMobile ? "grid-cols-1" : "grid-cols-3")}>
              {macroData.map((macro, index) => {
                const percentage = Math.min((macro.current / macro.goal) * 100, 100);
                return (
                  <div key={index} className={cn(
                    "p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all",
                    isMobile ? "p-3" : "p-4"
                  )}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{macro.icon}</span>
                        <span className={cn("font-medium", isMobile ? "text-sm" : "text-base")}>{macro.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {percentage.toFixed(0)}%
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className={cn("font-bold", isMobile ? "text-lg" : "text-xl")}>{macro.current}{macro.unit}</span>
                      <span className={cn("text-gray-500", isMobile ? "text-xs" : "text-sm")}>/ {macro.goal}{macro.unit}</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full bg-gradient-to-r transition-all duration-700", macro.color)}
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

      {/* Enhanced Responsive Tabs */}
      <Tabs defaultValue="log" className="w-full">
        <TabsList className={cn(
          "grid w-full mb-6",
          isMobile ? "grid-cols-2 h-auto" : "grid-cols-5"
        )}>
          <TabsTrigger value="log" className={cn(isMobile ? "text-xs p-2" : "")}>
            {isMobile ? "Log" : "Log Food"}
          </TabsTrigger>
          <TabsTrigger value="search" className={cn(isMobile ? "text-xs p-2" : "")}>
            {isMobile ? "Search" : "Search Foods"}
          </TabsTrigger>
          {!isMobile && <TabsTrigger value="recipes">Recipes</TabsTrigger>}
          {!isMobile && <TabsTrigger value="meals">Meals</TabsTrigger>}
          {!isMobile && <TabsTrigger value="insights">Insights</TabsTrigger>}
        </TabsList>

        <TabsContent value="log" className="space-y-6">
          {/* Enhanced Search Bar */}
          <GlassCard variant="premium" className={cardPadding}>
            <div className={cn("flex gap-3 mb-4", isMobile ? "flex-col" : "flex-row")}>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search foods, brands, or scan barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className={cn("pl-10", isMobile ? "h-10" : "h-12")}
                />
              </div>
              <Button 
                variant="glass" 
                size={buttonSize}
                className="gap-2"
                onClick={handleSearch}
                disabled={isSearching}
              >
                <Search className="w-4 h-4" />
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {/* Enhanced Quick Add with better mobile layout */}
            <div className={cn("grid gap-2", isMobile ? "grid-cols-2" : "grid-cols-4")}>
              {quickAddFoods.map((item) => (
                <Button key={item.name} variant="outline" className={cn("gap-2", isMobile ? "h-10 text-xs" : "h-12")}>
                  <span className={cn(typeof item.icon === 'string' ? 'text-base' : '')}>
                    {item.icon}
                  </span>
                  {item.name}
                </Button>
              ))}
            </div>
          </GlassCard>

          {/* Search Results or Food Entry */}
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
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <GlassCard variant="premium" className={cardPadding}>
            <div className={cn("flex gap-3 mb-4", isMobile ? "flex-col" : "flex-row")}>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search USDA food database..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className={cn("pl-10", isMobile ? "h-10" : "h-12")}
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                size={buttonSize}
                className="gap-2"
              >
                <Search className="w-4 h-4" />
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

        {/* Enhanced Meals Tab with better responsive design */}
        {!isMobile && (
          <TabsContent value="meals" className="space-y-6">
            <div className={cn("grid gap-4", gridCols)}>
              {meals.map((meal) => (
                <GlassCard key={meal.id} variant="premium" className="p-4 hover:scale-105 transition-transform cursor-pointer group">
                  <div className="text-center relative overflow-hidden">
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-xl",
                      meal.color
                    )}></div>
                    <div className="relative z-10">
                      <div className="text-3xl mb-3">{meal.icon}</div>
                      <h3 className="font-semibold text-lg mb-2">{meal.name}</h3>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold">{meal.calories}</p>
                        <p className="text-sm text-gray-500">calories</p>
                        <p className="text-xs text-gray-400">{meal.foods} foods logged</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Other tabs content remains similar but with responsive improvements */}
        {!isMobile && (
          <>
            <TabsContent value="recipes">
              <GlassCard variant="premium" className={cardPadding}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-green-500" />
                  Free Recipe Database
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Input 
                      placeholder="Search healthy recipes..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button onClick={handleRecipeSearch} className="gap-2">
                      <Search className="w-4 h-4" />
                      Search
                    </Button>
                  </div>
                  
                  {recipes.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {recipes.map((recipe) => (
                        <div key={recipe.id} className="p-4 border rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex gap-3">
                            {recipe.image && (
                              <img src={recipe.image} alt={recipe.name} className="w-16 h-16 rounded-lg object-cover" />
                            )}
                            <div>
                              <h4 className="font-semibold">{recipe.name}</h4>
                              <p className="text-sm text-gray-500">{recipe.category} • {recipe.cuisine}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </TabsContent>

            <TabsContent value="insights">
              <GlassCard variant="premium" className={cardPadding}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  Nutrition Insights & APIs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(getApiStatus()).map(([key, api]) => (
                    <div key={key} className={cn(
                      "p-4 rounded-xl border",
                      api.status === 'active' ? 'bg-green-50 border-green-200 dark:bg-green-900/20' :
                      api.status === 'ready' ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20' :
                      'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20'
                    )}>
                      <h4 className="font-medium mb-1">{api.description}</h4>
                      <Badge variant={api.status === 'active' ? 'default' : api.status === 'ready' ? 'secondary' : 'outline'}>
                        {api.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </TabsContent>
          </>
        )}
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
