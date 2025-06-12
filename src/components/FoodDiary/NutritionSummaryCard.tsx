
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface NutritionSummaryCardProps {
  nutritionSummary: {
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
  };
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    water: number;
  };
  waterIntake: number;
}

const NutritionSummaryCard: React.FC<NutritionSummaryCardProps> = ({
  nutritionSummary,
  dailyGoals,
  waterIntake
}) => {
  // Calculate macro percentages for pie chart
  const totalMacroGrams = nutritionSummary.totalProtein + nutritionSummary.totalCarbs + nutritionSummary.totalFat;
  const macroData = [
    { name: 'Protein', value: nutritionSummary.totalProtein, color: '#3182CE' },
    { name: 'Carbs', value: nutritionSummary.totalCarbs, color: '#ED8936' },
    { name: 'Fat', value: nutritionSummary.totalFat, color: '#ECC94B' },
  ];

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage < 25) return "bg-gray-300";
    if (percentage < 50) return "bg-blue-300";
    if (percentage < 75) return "bg-blue-400";
    if (percentage < 100) return "bg-gradient-primary";
    return "bg-green-500";
  };

  return (
    <Card className="shadow-card overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-health-primary/10 to-health-secondary/10 pb-2">
        <CardTitle className="text-lg text-gray-800">Nutrition Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {/* Calories Progress */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-800">Calories</span>
              <span className="text-sm text-gray-500">
                {nutritionSummary.totalCalories} / {dailyGoals.calories}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getProgressColor(nutritionSummary.totalCalories, dailyGoals.calories)}`}
                style={{ width: `${Math.min((nutritionSummary.totalCalories / dailyGoals.calories) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Macronutrient Distribution */}
          <div className="pt-2">
            {totalMacroGrams > 0 && (
              <div className="flex items-center justify-center my-4">
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
            
            {/* Protein */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <div className="w-3 h-3 rounded-full bg-health-protein mr-2"></div>
                  Protein
                </span>
                <span className="text-sm text-gray-500">
                  {nutritionSummary.totalProtein}g / {dailyGoals.protein}g
                  {totalMacroGrams > 0 && (
                    <span className="ml-1 text-xs">
                      ({Math.round((nutritionSummary.totalProtein / totalMacroGrams) * 100)}%)
                    </span>
                  )}
                </span>
              </div>
              <Progress 
                value={(nutritionSummary.totalProtein / dailyGoals.protein) * 100} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-health-protein" 
              />
            </div>
            
            {/* Carbs */}
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <div className="w-3 h-3 rounded-full bg-health-carbs mr-2"></div>
                  Carbohydrates
                </span>
                <span className="text-sm text-gray-500">
                  {nutritionSummary.totalCarbs}g / {dailyGoals.carbs}g
                  {totalMacroGrams > 0 && (
                    <span className="ml-1 text-xs">
                      ({Math.round((nutritionSummary.totalCarbs / totalMacroGrams) * 100)}%)
                    </span>
                  )}
                </span>
              </div>
              <Progress 
                value={(nutritionSummary.totalCarbs / dailyGoals.carbs) * 100} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-health-carbs" 
              />
            </div>
            
            {/* Fat */}
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <div className="w-3 h-3 rounded-full bg-health-fat mr-2"></div>
                  Fat
                </span>
                <span className="text-sm text-gray-500">
                  {nutritionSummary.totalFat}g / {dailyGoals.fat}g
                  {totalMacroGrams > 0 && (
                    <span className="ml-1 text-xs">
                      ({Math.round((nutritionSummary.totalFat / totalMacroGrams) * 100)}%)
                    </span>
                  )}
                </span>
              </div>
              <Progress 
                value={(nutritionSummary.totalFat / dailyGoals.fat) * 100} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-health-fat" 
              />
            </div>
            
            {/* Water */}
            <div className="mt-2">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium flex items-center">
                  <div className="w-3 h-3 rounded-full bg-health-water mr-2"></div>
                  Water
                </span>
                <span className="text-sm text-gray-500">
                  {waterIntake}ml / {dailyGoals.water}ml
                </span>
              </div>
              <Progress 
                value={(waterIntake / dailyGoals.water) * 100} 
                className="h-2 bg-gray-100" 
                indicatorClassName="bg-health-water" 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NutritionSummaryCard;
