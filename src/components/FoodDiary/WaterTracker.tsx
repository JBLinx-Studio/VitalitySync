
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WaterTrackerProps {
  waterIntake: number;
  dailyGoal: number;
  onAddWater: (amount: number) => void;
}

const WaterTracker: React.FC<WaterTrackerProps> = ({ 
  waterIntake, 
  dailyGoal, 
  onAddWater 
}) => {
  const [waterAmount, setWaterAmount] = useState(250);
  
  const percentage = Math.min((waterIntake / dailyGoal) * 100, 100);
  
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-health-water/10 to-health-water/25 p-5 rounded-xl shadow-sm">
        <h3 className="font-medium mb-3 text-gray-800">Water Intake</h3>
        
        <div className="mb-5">
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-700">Today's intake</span>
            <span className="font-medium text-sm text-gray-700">
              {waterIntake}ml / {dailyGoal}ml
            </span>
          </div>
          
          {/* Water visual representation */}
          <div className="relative w-full h-14 bg-white/60 rounded-full shadow-inner overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-health-water transition-all duration-500 ease-out rounded-b-full"
              style={{ height: `${percentage}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20"></div>
            </div>
            
            {/* Water level markers */}
            <div className="absolute left-0 right-0 top-0 bottom-0 flex flex-col justify-between py-1">
              <div className="border-t border-dashed border-gray-300/50 h-0 w-full"></div>
              <div className="border-t border-dashed border-gray-300/50 h-0 w-full"></div>
              <div className="border-t border-dashed border-gray-300/50 h-0 w-full"></div>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-bold text-lg text-white drop-shadow-md">
                {Math.round(percentage)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 flex-1">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setWaterAmount(Math.max(50, waterAmount - 50))}
              className="bg-white/80 hover:bg-white"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={waterAmount}
              onChange={(e) => setWaterAmount(parseInt(e.target.value) || 0)}
              className="text-center bg-white/80"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setWaterAmount(waterAmount + 50)}
              className="bg-white/80 hover:bg-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-gray-500 text-sm mr-3">ml</div>
          <Button 
            onClick={() => onAddWater(waterAmount)}
            className="bg-gradient-to-r from-blue-400 to-health-water hover:shadow-glow transition-shadow text-white"
          >
            Add Water
          </Button>
        </div>
        
        <div className="flex justify-between mt-4 space-x-2">
          <Button 
            variant="ghost" 
            onClick={() => onAddWater(250)}
            className="flex-1 bg-white/30 hover:bg-white/60"
          >
            + 250ml
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onAddWater(500)}
            className="flex-1 bg-white/30 hover:bg-white/60"
          >
            + 500ml
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => onAddWater(1000)}
            className="flex-1 bg-white/30 hover:bg-white/60"
          >
            + 1000ml
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
