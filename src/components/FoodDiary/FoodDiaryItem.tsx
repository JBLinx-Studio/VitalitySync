
import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FoodDiaryItemProps {
  id: string;
  name: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal: string;
  onDelete: (id: string) => void;
}

const FoodDiaryItem: React.FC<FoodDiaryItemProps> = ({ 
  id, 
  name, 
  servingSize, 
  calories, 
  protein, 
  carbs, 
  fat,
  onDelete 
}) => {
  return (
    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm hover:shadow-card transition-shadow border border-gray-100">
      <div className="flex-grow">
        <div className="font-medium text-gray-800">{name}</div>
        <div className="text-sm text-gray-500">{servingSize}</div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block">
          <div className="flex items-center space-x-2 text-sm">
            <span className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
              "bg-gradient-to-br from-health-protein/10 to-health-protein/20"
            )}>
              P: {protein}g
            </span>
            <span className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
              "bg-gradient-to-br from-health-carbs/10 to-health-carbs/20"
            )}>
              C: {carbs}g
            </span>
            <span className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
              "bg-gradient-to-br from-health-fat/10 to-health-fat/20"
            )}>
              F: {fat}g
            </span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="font-medium text-gray-800">{calories} kcal</div>
          <div className="text-xs text-gray-500 sm:hidden">
            P: {protein}g | C: {carbs}g | F: {fat}g
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onDelete(id)} 
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FoodDiaryItem;
