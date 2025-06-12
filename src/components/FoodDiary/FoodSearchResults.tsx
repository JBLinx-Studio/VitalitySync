
import React, { useState } from 'react';
import { Food } from '@/services/foodService';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Info, Star, Bookmark, Clock, Salad } from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from '@/components/ui/hover-card';

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
  const [favoriteItems, setFavoriteItems] = useState<Record<string, boolean>>({});

  const toggleFavorite = (foodId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteItems(prev => ({
      ...prev,
      [foodId]: !prev[foodId]
    }));
  };
  
  if (isSearching) {
    return (
      <div className="animate-pulse space-y-4 p-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-100 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-3/4"></div>
              <div className="h-3 bg-gradient-to-r from-gray-100 to-white rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gradient-to-r from-gray-100 to-white rounded w-16"></div>
                <div className="h-6 bg-gradient-to-r from-gray-100 to-white rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  // Function to determine if a food item is branded
  const isBranded = (food: Food) => !!food.brandName;
  
  // Group foods by branded vs generic
  const brandedFoods = results.filter(isBranded);
  const genericFoods = results.filter(food => !isBranded(food));

  // Function to get food image based on description
  const getFoodImage = (description: string) => {
    const foodImages: Record<string, string> = {
      apple: "/food-images/apple.jpg",
      banana: "/food-images/banana.jpg",
      chicken: "/food-images/chicken.jpg",
      beef: "/food-images/beef.jpg",
      pasta: "/food-images/pasta.jpg",
      rice: "/food-images/rice.jpg",
      fish: "/food-images/fish.jpg",
      salad: "/food-images/salad.jpg",
      bread: "/food-images/bread.jpg",
      milk: "/food-images/milk.jpg",
      cheese: "/food-images/cheese.jpg",
      yogurt: "/food-images/yogurt.jpg",
      egg: "/food-images/eggs.jpg",
      pizza: "/food-images/pizza.jpg",
      burger: "/food-images/burger.jpg"
    };
    
    // Try to find a matching image
    const lowerDesc = description.toLowerCase();
    for (const [key, url] of Object.entries(foodImages)) {
      if (lowerDesc.includes(key)) {
        return url;
      }
    }
    
    // Default food icon if no image matches
    return null;
  };

  return (
    <div className="mt-6 animate-fade-in">
      <h3 className="font-display mb-4 text-gray-800 flex items-center text-xl">
        <span className="gradient-text font-bold">
          Search Results
        </span>
        <Badge variant="outline" className="ml-2 text-xs bg-white/80 backdrop-blur-sm">
          {results.length} items found
        </Badge>
      </h3>
      
      <div className="max-h-80 overflow-y-auto space-y-6 pr-1 scrollbar-thin">
        {/* Branded Foods Section */}
        {brandedFoods.length > 0 && (
          <div className="glass-effect rounded-xl p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center text-gray-700">
              <Star className="h-4 w-4 mr-1 text-health-secondary fill-health-secondary/20" /> 
              <span className="font-display">Branded Foods</span>
            </h4>
            <div className="space-y-3">
              {brandedFoods.map((food) => (
                <FoodResultItem 
                  key={food.fdcId} 
                  food={food} 
                  onSelectFood={onSelectFood}
                  isFavorite={!!favoriteItems[food.fdcId]}
                  onToggleFavorite={toggleFavorite}
                  getFoodImage={getFoodImage}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Generic Foods Section */}
        {genericFoods.length > 0 && (
          <div className="glass-effect rounded-xl p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center text-gray-700">
              <Salad className="h-4 w-4 mr-1 text-health-primary fill-health-primary/20" /> 
              <span className="font-display">Generic Foods</span>
            </h4>
            <div className="space-y-3">
              {genericFoods.map((food) => (
                <FoodResultItem 
                  key={food.fdcId} 
                  food={food} 
                  onSelectFood={onSelectFood} 
                  isFavorite={!!favoriteItems[food.fdcId]}
                  onToggleFavorite={toggleFavorite}
                  getFoodImage={getFoodImage}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Extract food item to its own component for better organization
const FoodResultItem = ({ 
  food, 
  onSelectFood, 
  isFavorite, 
  onToggleFavorite,
  getFoodImage 
}: { 
  food: Food, 
  onSelectFood: (food: Food) => void,
  isFavorite: boolean,
  onToggleFavorite: (foodId: string, e: React.MouseEvent) => void,
  getFoodImage: (desc: string) => string | null
}) => {
  // Get nutrients if available
  const hasNutrients = food.foodNutrients && food.foodNutrients.length > 0;
  const foodImage = getFoodImage(food.description);
  
  // Find common nutrients
  const findNutrient = (nutrientId: number) => {
    if (!hasNutrients) return null;
    const nutrient = food.foodNutrients.find(n => 
      (n.nutrientId === nutrientId) || 
      (n.number && parseInt(n.number) === nutrientId)
    );
    return nutrient ? (nutrient.amount || nutrient.value || 0) : 0;
  };
  
  // Common nutrient IDs
  const ENERGY = 1008;  // Energy (kcal)
  const PROTEIN = 1003; // Protein (g)
  const FAT = 1004;     // Total fat (g)
  const CARBS = 1005;   // Total carbs (g)

  return (
    <div
      onClick={() => onSelectFood(food)}
      className={cn(
        "p-3 border rounded-xl cursor-pointer transition-all group relative",
        "hover:border-health-primary/30",
        "bg-gradient-to-r from-white to-gray-50/80 hover:from-gray-50/50 hover:to-gray-100/30",
        "backdrop-blur-md shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
      )}
    >
      <div className="flex gap-3">
        {/* Food Image/Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-lg overflow-hidden bg-gray-100">
          {foodImage ? (
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${foodImage})` }}></div>
          ) : (
            <Salad className="w-8 h-8 text-health-primary/50" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between">
            <div className="font-medium text-gray-800 group-hover:text-health-primary transition-colors font-display">
              {food.description}
            </div>
            
            <div className="flex space-x-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button 
                      onClick={(e) => onToggleFavorite(food.fdcId, e)}
                      className={cn(
                        "p-1 rounded-full hover:bg-gray-100 transition-colors",
                        isFavorite ? "text-amber-500" : "text-gray-400"
                      )}
                    >
                      <Bookmark className={cn("h-4 w-4", isFavorite && "fill-amber-500")} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p className="text-xs">{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <HoverCard>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-health-secondary hover:text-health-primary cursor-help p-1 rounded-full hover:bg-gray-100 transition-colors">
                        <Info className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="text-xs">Click to add to your food diary</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <HoverCardContent className="w-72 p-4 glass-effect">
                  <h4 className="font-medium text-sm mb-2 text-gray-800">{food.description}</h4>
                  <p className="text-xs text-gray-600 mb-2">
                    {food.brandName ? `By ${food.brandName}` : 'Generic food item'} • Serving: {food.servingSize || '100'}{food.servingSizeUnit || 'g'}
                  </p>
                  
                  <div className="space-y-2 mt-3">
                    {hasNutrients && (
                      <>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-health-primary/10 p-2 rounded">
                            <div className="text-gray-600">Calories</div>
                            <div className="font-bold">{findNutrient(ENERGY)} kcal</div>
                          </div>
                          <div className="bg-health-protein/10 p-2 rounded">
                            <div className="text-gray-600">Protein</div>
                            <div className="font-bold">{findNutrient(PROTEIN)}g</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-health-carbs/10 p-2 rounded">
                            <div className="text-gray-600">Carbs</div>
                            <div className="font-bold">{findNutrient(CARBS)}g</div>
                          </div>
                          <div className="bg-health-fat/10 p-2 rounded">
                            <div className="text-gray-600">Fat</div>
                            <div className="font-bold">{findNutrient(FAT)}g</div>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="text-xs text-gray-500 pt-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Recently added to database
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          
          <div className="flex items-center flex-wrap gap-2 mt-1">
            {food.brandName ? (
              <Badge variant="outline" className="bg-health-secondary/5 text-gray-600 text-xs border-health-secondary/20">
                {food.brandName}
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-health-primary/5 text-gray-600 text-xs border-health-primary/20">
                Generic
              </Badge>
            )}
            
            {hasNutrients && (
              <Badge variant="outline" className="bg-white/80 text-xs border-gray-200">
                {findNutrient(ENERGY)} kcal
              </Badge>
            )}
            
            {food.servingSize && food.servingSizeUnit && (
              <span className="text-xs text-gray-500">
                {food.servingSize}{food.servingSizeUnit} per serving
              </span>
            )}
          </div>
          
          {hasNutrients && (
            <div className="mt-2 grid grid-cols-3 gap-1">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-health-protein h-full" style={{width: `${Math.min(findNutrient(PROTEIN) * 5, 100)}%`}}></div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-health-carbs h-full" style={{width: `${Math.min(findNutrient(CARBS) * 5, 100)}%`}}></div>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-health-fat h-full" style={{width: `${Math.min(findNutrient(FAT) * 5, 100)}%`}}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodSearchResults;
