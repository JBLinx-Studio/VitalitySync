
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChefHat, Clock, Users, Zap, Star, ShoppingCart, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const MealPlanningHub: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [mealPrepMode, setMealPrepMode] = useState(false);

  const weekDays = [
    { id: 'today', name: 'Today', date: 'Dec 7', isToday: true },
    { id: 'tomorrow', name: 'Tomorrow', date: 'Dec 8' },
    { id: 'sunday', name: 'Sunday', date: 'Dec 9' },
    { id: 'monday', name: 'Monday', date: 'Dec 10' },
    { id: 'tuesday', name: 'Tuesday', date: 'Dec 11' },
    { id: 'wednesday', name: 'Wednesday', date: 'Dec 12' },
    { id: 'thursday', name: 'Thursday', date: 'Dec 13' }
  ];

  const mealSuggestions = [
    {
      id: 1,
      name: 'Mediterranean Power Bowl',
      type: 'lunch',
      calories: 520,
      protein: 32,
      prepTime: 15,
      difficulty: 'Easy',
      tags: ['High Protein', 'Low Carb'],
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300',
      ingredients: ['Quinoa', 'Grilled Chicken', 'Feta', 'Olives', 'Tomatoes'],
      macros: { protein: 32, carbs: 28, fat: 18 }
    },
    {
      id: 2,
      name: 'Green Goddess Smoothie',
      type: 'breakfast',
      calories: 340,
      protein: 24,
      prepTime: 5,
      difficulty: 'Easy',
      tags: ['Vegan', 'Quick'],
      image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=300',
      ingredients: ['Spinach', 'Banana', 'Protein Powder', 'Almond Milk'],
      macros: { protein: 24, carbs: 18, fat: 8 }
    },
    {
      id: 3,
      name: 'Salmon Teriyaki with Veggies',
      type: 'dinner',
      calories: 480,
      protein: 42,
      prepTime: 25,
      difficulty: 'Medium',
      tags: ['Omega-3', 'Heart Healthy'],
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300',
      ingredients: ['Salmon', 'Broccoli', 'Brown Rice', 'Teriyaki Sauce'],
      macros: { protein: 42, carbs: 22, fat: 16 }
    }
  ];

  const mealPrepTasks = [
    { task: 'Wash & chop vegetables', time: '15 min', priority: 'high' },
    { task: 'Cook quinoa & brown rice', time: '25 min', priority: 'high' },
    { task: 'Marinate proteins', time: '10 min', priority: 'medium' },
    { task: 'Prepare smoothie packs', time: '20 min', priority: 'medium' },
    { task: 'Portion snacks', time: '10 min', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-vibrant">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
              Meal Planning Hub
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Plan, prep, and perfect your nutrition game
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant={mealPrepMode ? "default" : "outline"}
            onClick={() => setMealPrepMode(!mealPrepMode)}
            className="gap-2"
          >
            <Zap className="w-4 h-4" />
            Meal Prep Mode
          </Button>
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1">
            <Star className="w-3 h-3 mr-1" />
            Premium Features
          </Badge>
        </div>
      </div>

      {/* Week Navigator */}
      <GlassCard variant="premium" className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Weekly Meal Plan
          </h3>
          <Button variant="outline" size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Generate Shopping List
          </Button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day) => (
            <Button
              key={day.id}
              variant={selectedDay === day.id ? "default" : "outline"}
              onClick={() => setSelectedDay(day.id)}
              className={cn(
                "h-auto p-3 flex flex-col items-center",
                day.isToday && "bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-vibrant"
              )}
            >
              <span className="font-semibold text-sm">{day.name}</span>
              <span className="text-xs opacity-80">{day.date}</span>
            </Button>
          ))}
        </div>
      </GlassCard>

      <Tabs defaultValue="meals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="meals">Today's Meals</TabsTrigger>
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="prep">Meal Prep</TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Breakfast', 'Lunch', 'Dinner'].map((mealType, index) => (
              <GlassCard key={mealType} variant="premium" className="p-4">
                <div className="text-center space-y-3">
                  <div className="text-2xl">{['🌅', '☀️', '🌙'][index]}</div>
                  <h3 className="font-semibold text-lg">{mealType}</h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>Target: 400-500 cal</p>
                    <p>Protein: 25-30g</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500">
                    Add Meal
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealSuggestions.map((meal) => (
              <GlassCard key={meal.id} variant="premium" className="overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={meal.image} 
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/50 text-white">
                      {meal.calories} cal
                    </Badge>
                  </div>
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      {meal.prepTime}m
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{meal.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{meal.type}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {meal.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">{meal.macros.protein}g</p>
                        <p className="text-xs text-gray-500">Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-green-600">{meal.macros.carbs}g</p>
                        <p className="text-xs text-gray-500">Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-purple-600">{meal.macros.fat}g</p>
                        <p className="text-xs text-gray-500">Fat</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500">
                        Add to Plan
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="prep" className="space-y-4">
          <GlassCard variant="premium" className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Sunday Meal Prep Checklist
                </h3>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  Total: 80 minutes
                </Badge>
              </div>
              
              <div className="space-y-3">
                {mealPrepTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-orange-200/30 dark:border-orange-700/30">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">{task.task}</span>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4" />
                      {task.time}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 gap-2">
                  <Users className="w-4 h-4" />
                  Start Meal Prep Session
                </Button>
                <Button variant="outline" className="gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Generate Prep List
                </Button>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlanningHub;
