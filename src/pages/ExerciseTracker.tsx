
import React, { useState } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  exercises, 
  calculateCaloriesBurned,
  searchExercises,
  getExerciseById
} from '@/services/exerciseService';
import { Activity, Search, Plus, Clock } from 'lucide-react';

const ExerciseTracker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(exercises);
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);
  const [duration, setDuration] = useState('30');
  
  const { 
    userProfile,
    addExerciseItem, 
    getTodaysExerciseItems,
    getExerciseSummary
  } = useHealth();
  
  const todaysExerciseItems = getTodaysExerciseItems();
  const exerciseSummary = getExerciseSummary();

  const handleSearch = () => {
    const results = searchExercises(searchQuery);
    setSearchResults(results);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectExercise = (id: number) => {
    setSelectedExerciseId(id);
    setDuration('30');
  };

  const handleAddExercise = () => {
    if (!selectedExerciseId || !userProfile) return;
    
    const today = new Date().toISOString().split('T')[0];
    const exercise = getExerciseById(selectedExerciseId);
    
    if (!exercise) return;
    
    const durationNum = parseInt(duration);
    
    if (isNaN(durationNum) || durationNum <= 0) {
      alert('Please enter a valid duration');
      return;
    }
    
    const caloriesBurned = Math.round(
      calculateCaloriesBurned(exercise.met, userProfile.weight, durationNum)
    );
    
    const exerciseItem = {
      id: crypto.randomUUID(),
      name: exercise.name,
      duration: durationNum,
      caloriesBurned,
      date: today
    };
    
    addExerciseItem(exerciseItem);
    setSelectedExerciseId(null);
    setDuration('30');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Exercise Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-health-primary" />
              Exercise Log
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!userProfile ? (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <p className="text-yellow-700">
                  To track exercises and calculate calories burned accurately, please set up your profile first.
                </p>
                <a href="/profile" className="text-health-primary font-medium hover:underline mt-2 inline-block">
                  Set up profile →
                </a>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex">
                    <Input
                      placeholder="Search for exercises..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 mr-2"
                    />
                    <Button onClick={handleSearch}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium mb-2">Activities</h3>
                      <div className="max-h-96 overflow-y-auto space-y-2">
                        {searchResults.map((exercise) => (
                          <div
                            key={exercise.id}
                            onClick={() => handleSelectExercise(exercise.id)}
                            className={`p-3 border rounded-lg cursor-pointer ${
                              selectedExerciseId === exercise.id
                                ? 'border-health-primary bg-health-primary bg-opacity-5'
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-gray-500">
                              MET: {exercise.met} (intensity level)
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      {selectedExerciseId ? (
                        <div className="border p-4 rounded-lg">
                          <h3 className="font-medium text-lg mb-3">
                            {getExerciseById(selectedExerciseId)?.name}
                          </h3>
                          
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="duration">Duration (minutes)</Label>
                              <div className="flex items-center mt-1">
                                <Input
                                  id="duration"
                                  type="number"
                                  min="1"
                                  step="1"
                                  value={duration}
                                  onChange={(e) => setDuration(e.target.value)}
                                  className="flex-1"
                                />
                                <div className="flex space-x-1 ml-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setDuration('15')}
                                  >
                                    15
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setDuration('30')}
                                  >
                                    30
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setDuration('60')}
                                  >
                                    60
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <h4 className="text-sm font-medium mb-2">Estimated calories burned</h4>
                              <div className="bg-gray-100 p-3 rounded-lg text-center">
                                <div className="text-2xl font-bold">
                                  {Math.round(
                                    calculateCaloriesBurned(
                                      getExerciseById(selectedExerciseId)?.met || 0,
                                      userProfile.weight,
                                      parseInt(duration) || 0
                                    )
                                  )}
                                </div>
                                <div className="text-sm text-gray-500">calories</div>
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Based on your weight of {userProfile.weight} kg
                              </div>
                            </div>
                            
                            <div className="flex justify-end space-x-2 pt-2">
                              <Button variant="outline" onClick={() => setSelectedExerciseId(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleAddExercise}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add to Log
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center border border-dashed rounded-lg p-6">
                          <div className="text-center text-gray-500">
                            <Activity className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                            <p>Select an activity from the list to add it to your exercise log</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-lg mb-3">Today's Exercise Log</h3>
                  {todaysExerciseItems.length > 0 ? (
                    <div className="space-y-3">
                      {todaysExerciseItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Activity className="h-5 w-5 mr-3 text-health-primary" />
                            <div>
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {item.duration} minutes
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{item.caloriesBurned} kcal</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 p-6 border border-dashed rounded-lg">
                      <p>No exercises logged today</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Exercise Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Calories Burned Today</div>
                <div className="text-3xl font-bold text-health-primary">
                  {exerciseSummary.totalCaloriesBurned}
                </div>
                <div className="text-sm text-gray-500">kcal</div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Active Time</div>
                <div className="text-3xl font-bold text-health-primary">
                  {exerciseSummary.totalDuration}
                </div>
                <div className="text-sm text-gray-500">minutes</div>
              </div>
              
              <div className="pt-4">
                <h4 className="font-medium text-sm mb-2">Activity Benefits</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full h-2 w-2 mt-2 mr-2"></div>
                    <span>Regular exercise improves cardiovascular health</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full h-2 w-2 mt-2 mr-2"></div>
                    <span>Helps maintain a healthy weight</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full h-2 w-2 mt-2 mr-2"></div>
                    <span>Reduces risk of chronic diseases</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-500 rounded-full h-2 w-2 mt-2 mr-2"></div>
                    <span>Improves mental health and mood</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExerciseTracker;
