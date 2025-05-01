
import React from 'react';
import { Food } from '@/services/foodService';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Info, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
      <div className="flex justify-center p-4">
        <div className="animate-pulse flex space-x-4 w-full">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded"></div>
              <div className="h-16 bg-gradient-to-r from-gray-100 to-white rounded-xl"></div>
            </div>
          ))}
        </div>
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

  return (
    <div className="mt-4 animate-fade-in">
      <h3 className="font-medium mb-2 text-gray-700 flex items-center">
        <span className="bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
          Search Results
        </span>
        <Badge variant="outline" className="ml-2 text-xs">
          {results.length} items found
        </Badge>
      </h3>
      
      <div className="max-h-80 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
        {/* Branded Foods Section */}
        {brandedFoods.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
              <Star className="h-3 w-3 mr-1 text-health-secondary" /> 
              Branded Foods
            </h4>
            <div className="space-y-2">
              {brandedFoods.map((food) => (
                <FoodResultItem key={food.fdcId} food={food} onSelectFood={onSelectFood} />
              ))}
            </div>
          </div>
        )}
        
        {/* Generic Foods Section */}
        {genericFoods.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Generic Foods</h4>
            <div className="space-y-2">
              {genericFoods.map((food) => (
                <FoodResultItem key={food.fdcId} food={food} onSelectFood={onSelectFood} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Extract food item to its own component for better organization
const FoodResultItem = ({ food, onSelectFood }: { food: Food, onSelectFood: (food: Food) => void }) => {
  return (
    <div
      key={food.fdcId}
      onClick={() => onSelectFood(food)}
      className={cn(
        "p-3 border rounded-xl cursor-pointer transition-all group",
        "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100",
        "shadow-sm hover:shadow-md transform hover:-translate-y-0.5 duration-200"
      )}
    >
      <div className="flex justify-between">
        <div className="font-medium text-gray-800 group-hover:text-health-primary transition-colors">
          {food.description}
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-gray-400 hover:text-health-secondary cursor-help">
                <Info className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-xs">Click to add to your food diary</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center mt-1">
        {food.brandName ? (
          <Badge variant="outline" className="mr-2 bg-gray-50 text-gray-500 text-xs border-gray-200">
            {food.brandName}
          </Badge>
        ) : (
          <Badge variant="outline" className="mr-2 bg-gray-50 text-gray-500 text-xs border-gray-200">
            Generic
          </Badge>
        )}
        
        {food.servingSize && food.servingSizeUnit && (
          <span className="text-xs text-gray-500">
            {food.servingSize}{food.servingSizeUnit} per serving
          </span>
        )}
      </div>
    </div>
  );
};

export default FoodSearchResults;
