
import React, { useState } from 'react';
import { Brain, Heart, Smile, Zap, AlertTriangle, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealth } from '@/contexts/HealthContext';
import { Badge } from '@/components/ui/badge';

type MoodType = 'awful' | 'bad' | 'neutral' | 'good' | 'great';

const MentalWellness: React.FC = () => {
  const { moodRecords, addMoodRecord, getMoodSummary } = useHealth();
  
  const [selectedMood, setSelectedMood] = useState<MoodType>('neutral');
  const [energy, setEnergy] = useState(5);
  const [stress, setStress] = useState(5);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord = {
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      energy,
      stress,
      notes,
      activities
    };
    
    addMoodRecord(newRecord);
    
    // Reset form
    setSelectedMood('neutral');
    setEnergy(5);
    setStress(5);
    setNotes('');
    setActivities([]);
  };

  const summary = getMoodSummary();

  const addActivity = () => {
    if (newActivity.trim() && !activities.includes(newActivity.trim())) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity('');
    }
  };

  const removeActivity = (activity: string) => {
    setActivities(activities.filter(a => a !== activity));
  };

  const moodOptions = [
    { value: 'awful', label: 'Awful', emoji: '😞', color: 'text-red-600' },
    { value: 'bad', label: 'Bad', emoji: '😕', color: 'text-orange-600' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'text-yellow-600' },
    { value: 'good', label: 'Good', emoji: '😊', color: 'text-green-600' },
    { value: 'great', label: 'Great', emoji: '😄', color: 'text-blue-600' },
  ];

  const getMoodEmoji = (mood: MoodType) => {
    return moodOptions.find(option => option.value === mood)?.emoji || '😐';
  };

  const getScaleColor = (value: number, reverse = false) => {
    if (reverse) {
      if (value <= 3) return 'text-green-600';
      if (value <= 6) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (value <= 3) return 'text-red-600';
      if (value <= 6) return 'text-yellow-600';
      return 'text-green-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Mental Wellness
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track your mood, energy, and mental well-being
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-purple-200/50 dark:border-purple-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Mood</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {summary.averageMood.toFixed(1)}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-2xl">
                    <Smile className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-yellow-200/50 dark:border-yellow-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Energy</p>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                      {summary.averageEnergy.toFixed(1)}
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/40 rounded-2xl">
                    <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-red-200/50 dark:border-red-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Stress</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                      {summary.averageStress.toFixed(1)}
                    </p>
                  </div>
                  <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-2xl">
                    <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mood Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Brain className="mr-2 h-6 w-6 text-purple-500" />
                  Log Your Mental State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Mood Selection */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">How are you feeling today?</Label>
                    <div className="grid grid-cols-5 gap-3 mt-2">
                      {moodOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setSelectedMood(option.value as MoodType)}
                          className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedMood === option.value
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                              : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                          }`}
                        >
                          <div className="text-2xl mb-1">{option.emoji}</div>
                          <div className={`text-xs font-medium ${option.color}`}>
                            {option.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Energy Level */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">
                      Energy Level: <span className={`font-bold ${getScaleColor(energy)}`}>{energy}/10</span>
                    </Label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={energy}
                      onChange={(e) => setEnergy(parseInt(e.target.value))}
                      className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Very Low</span>
                      <span>Very High</span>
                    </div>
                  </div>

                  {/* Stress Level */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">
                      Stress Level: <span className={`font-bold ${getScaleColor(stress, true)}`}>{stress}/10</span>
                    </Label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={stress}
                      onChange={(e) => setStress(parseInt(e.target.value))}
                      className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span>Very Low</span>
                      <span>Very High</span>
                    </div>
                  </div>

                  {/* Activities */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Activities</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={newActivity}
                        onChange={(e) => setNewActivity(e.target.value)}
                        placeholder="Add an activity..."
                        className="bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addActivity())}
                      />
                      <Button
                        type="button"
                        onClick={addActivity}
                        size="icon"
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {activities.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {activities.map((activity, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-900/60"
                            onClick={() => removeActivity(activity)}
                          >
                            {activity} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Notes (Optional)</Label>
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How was your day? Any thoughts or reflections..."
                      className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-[1.02]"
                  >
                    Log Mental Wellness Entry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recent Entries */}
          <div className="space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Heart className="mr-2 h-5 w-5 text-pink-500" />
                  Recent Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {moodRecords.slice(-10).reverse().map((record) => (
                    <div 
                      key={record.id}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getMoodEmoji(record.mood)}</span>
                          <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                            {record.mood}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>Energy: <span className={getScaleColor(record.energy)}>{record.energy}/10</span></div>
                        <div>Stress: <span className={getScaleColor(record.stress, true)}>{record.stress}/10</span></div>
                        {record.activities && record.activities.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {record.activities.map((activity, idx) => (
                              <Badge 
                                key={idx} 
                                variant="outline" 
                                className="text-xs bg-purple-50 dark:bg-purple-900/20"
                              >
                                {activity}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {record.notes && (
                          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 italic">
                            "{record.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {moodRecords.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No mood entries yet. Start tracking your mental wellness!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalWellness;
