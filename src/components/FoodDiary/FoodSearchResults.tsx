
import React from 'react';
import { Food } from '@/services/foodService';
import { cn } from '@/lib/utils';

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
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-slate-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2 text-gray-700">Search Results</h3>
      <div className="max-h-80 overflow-y-auto space-y-2">
        {results.map((food) => (
          <div
            key={food.fdcId}
            onClick={() => onSelectFood(food)}
            className={cn(
              "p-3 border rounded-lg cursor-pointer transition-all",
              "bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100",
              "shadow-sm hover:shadow-md"
            )}
          >
            <div className="font-medium text-gray-800">{food.description}</div>
            <div className="text-sm text-gray-500">
              {food.brandName ? `${food.brandName}` : 'Generic'} 
              {food.servingSize && food.servingSizeUnit && 
                ` • ${food.servingSize}${food.servingSizeUnit} per serving`
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearchResults;
