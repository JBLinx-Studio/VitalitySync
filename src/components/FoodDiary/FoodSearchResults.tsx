
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Utensils, Plus, Search } from 'lucide-react';
import { Food, extractNutrients } from '@/services/foodService';

interface FoodSearchResultsProps {
  results: Food[];
  isSearching: boolean;
  onSelectFood: (food: Food) => void;
}

const FoodSearchResults: React.FC<FoodSearchResultsProps> = ({ 
  results, 
  isSearching, 
  onSelectFood 
}) => {
  if (isSearching) {
    return (
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">Searching USDA food database...</p>
        </CardContent>
      </Card>
    );
  }

  if (results.length === 0) {
    return (
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No Results Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try searching with different keywords or check your spelling.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Utensils className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold">Search Results ({results.length})</h3>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {results.map((food) => {
            const nutrients = extractNutrients(food);
            
            return (
              <div
                key={food.fdcId}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group cursor-pointer"
                onClick={() => onSelectFood(food)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {food.description}
                    </h4>
                    {food.brandName && (
                      <Badge variant="outline" className="mt-1 text-xs">
                        {food.brandName}
                      </Badge>
                    )}
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-sm">
                      <div>
                        <span className="text-gray-500">Calories:</span>
                        <span className="ml-1 font-semibold">{nutrients.calories}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Protein:</span>
                        <span className="ml-1 font-semibold">{nutrients.protein}g</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Carbs:</span>
                        <span className="ml-1 font-semibold">{nutrients.carbs}g</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fat:</span>
                        <span className="ml-1 font-semibold">{nutrients.fat}g</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFood(food);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Select
                  </Button>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Per 100g • Click to add to diary
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-300">
            💡 Click on any food item to add it to your diary with customizable portions
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FoodSearchResults;
