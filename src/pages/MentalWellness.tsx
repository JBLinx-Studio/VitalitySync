
import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Calendar, Plus, Heart, Zap, Sun, CloudRain } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/contexts/HealthContext';
import { format, subDays, startOfDay } from 'date-fns';

type MoodType = 'awful' | 'bad' | 'neutral' | 'good' | 'great';

const MentalWellness: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [mood, setMood] = useState<MoodType>('neutral');
  const [energy, setEnergy] = useState<number>(5);
  const [stress, setStress] = useState<number>(5);
  const [notes, setNotes] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [newActivity, setNewActivity] = useState('');

  const { moodRecords, addMoodRecord, getMoodSummary } = useHealth();

  const moodEmojis = {
    awful: '😞',
    bad: '😕',
    neutral: '😐',
    good: '🙂',
    great: '😄'
  };

  const moodColors = {
    awful: 'bg-red-100 text-red-800 border-red-200',
    bad: 'bg-orange-100 text-orange-800 border-orange-200',
    neutral: 'bg-gray-100 text-gray-800 border-gray-200',
    good: 'bg-green-100 text-green-800 border-green-200',
    great: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  };

  const predefinedActivities = [
    'Exercise', 'Meditation', 'Reading', 'Socializing', 'Work', 'Hobbies',
    'Music', 'Nature', 'Sleep', 'Eating', 'Gaming', 'Learning'
  ];

  const addActivity = () => {
    if (newActivity.trim() && !activities.includes(newActivity.trim())) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity('');
    }
  };

  const removeActivity = (activity: string) => {
    setActivities(activities.filter(a => a !== activity));
  };

  const handleSubmit = () => {
    const moodRecord = {
      date: selectedDate,
      mood,
      energy,
      stress,
      notes: notes.trim() || undefined,
      activities: activities.length > 0 ? activities : undefined
    };

    addMoodRecord(moodRecord);
    
    // Reset form
    setMood('neutral');
    setEnergy(5);
    setStress(5);
    setNotes('');
    setActivities([]);
  };

  const todaysRecord = moodRecords.find(record => record.date === selectedDate);
  const weekSummary = getMoodSummary(7);

  // Calculate stress level color
  const getStressColor = (level: number) => {
    if (level <= 3) return 'text-green-600';
    if (level <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Calculate energy level color
  const getEnergyColor = (level: number) => {
    if (level <= 3) return 'text-red-600';
    if (level <= 6) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Get mood string from number
  const getMoodFromNumber = (num: number): MoodType => {
    if (num <= 1) return 'awful';
    if (num <= 2) return 'bad';
    if (num <= 3) return 'neutral';
    if (num <= 4) return 'good';
    return 'great';
  };

  const recentRecords = moodRecords
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Mental Wellness
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Track your mood, energy, and mental health journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mood Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Brain className="mr-2 h-6 w-6 text-purple-500" />
                  Daily Check-in
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-medium">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                  />
                </div>

                {/* Mood Selection */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">How are you feeling?</Label>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    {Object.entries(moodEmojis).map(([moodValue, emoji]) => (
                      <button
                        key={moodValue}
                        onClick={() => setMood(moodValue as MoodType)}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          mood === moodValue
                            ? moodColors[moodValue as MoodType] + ' scale-105 shadow-lg'
                            : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-3xl mb-2">{emoji}</span>
                        <span className="text-sm font-medium capitalize">{moodValue}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Energy Level */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">
                    Energy Level: <span className={`font-bold ${getEnergyColor(energy)}`}>{energy}/10</span>
                  </Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={energy}
                    onChange={(e) => setEnergy(parseInt(e.target.value))}
                    className="w-full mt-3 h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Stress Level */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">
                    Stress Level: <span className={`font-bold ${getStressColor(stress)}`}>{stress}/10</span>
                  </Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={stress}
                    onChange={(e) => setStress(parseInt(e.target.value))}
                    className="w-full mt-3 h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">Activities</Label>
                  <div className="flex gap-2 mt-3 mb-3">
                    <Input
                      placeholder="Add activity..."
                      value={newActivity}
                      onChange={(e) => setNewActivity(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addActivity()}
                      className="flex-1 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                    />
                    <Button onClick={addActivity} size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {predefinedActivities.map((activity) => (
                      <Button
                        key={activity}
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (!activities.includes(activity)) {
                            setActivities([...activities, activity]);
                          }
                        }}
                        className="text-xs bg-white/60 dark:bg-slate-700/60 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-200/60 dark:border-gray-600/60 text-gray-700 dark:text-gray-300"
                      >
                        {activity}
                      </Button>
                    ))}
                  </div>
                  {activities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {activities.map((activity) => (
                        <Badge
                          key={activity}
                          variant="secondary"
                          className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-800 dark:hover:text-red-200"
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
                  <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300 font-medium">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="How was your day? Any thoughts or reflections..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3"
                  disabled={!selectedDate}
                >
                  Save Mental Health Record
                </Button>
              </CardContent>
            </Card>

            {/* Recent Records */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Check-ins
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentRecords.length > 0 ? (
                  <div className="space-y-4">
                    {recentRecords.map((record) => (
                      <div key={record.id} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{moodEmojis[record.mood]}</span>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{format(new Date(record.date), 'MMM dd, yyyy')}</p>
                              <p className={`text-sm ${moodColors[record.mood]} px-2 py-1 rounded-full border inline-block`}>
                                {record.mood}
                              </p>
                            </div>
                          </div>
                          <div className="text-right text-sm">
                            <p className={`font-medium ${getEnergyColor(record.energy)}`}>
                              Energy: {record.energy}/10
                            </p>
                            <p className={`font-medium ${getStressColor(record.stress)}`}>
                              Stress: {record.stress}/10
                            </p>
                          </div>
                        </div>
                        
                        {record.activities && record.activities.length > 0 && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Activities:</p>
                            <div className="flex flex-wrap gap-1">
                              {record.activities.map((activity, index) => (
                                <Badge key={index} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700">
                                  {activity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {record.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic border-l-2 border-gray-300 dark:border-gray-600 pl-3">
                            "{record.notes}"
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No mood records yet. Start your mental wellness journey by adding your first check-in!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Summary Stats */}
          <div className="space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
                  Week Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Mood</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      {moodEmojis[getMoodFromNumber(weekSummary.averageMood)]} {getMoodFromNumber(weekSummary.averageMood)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Energy</span>
                    <span className={`text-lg font-bold ${getEnergyColor(weekSummary.averageEnergy)}`}>
                      {weekSummary.averageEnergy.toFixed(1)}/10
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Stress</span>
                    <span className={`text-lg font-bold ${getStressColor(weekSummary.averageStress)}`}>
                      {weekSummary.averageStress.toFixed(1)}/10
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips & Insights */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Heart className="mr-2 h-5 w-5 text-red-500" />
                  Wellness Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-yellow-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Morning Routine</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Start your day with 5 minutes of meditation or deep breathing
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Energy Boost</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Take short walks throughout the day to maintain energy levels
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                  <div className="flex items-start gap-3">
                    <CloudRain className="h-5 w-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Stress Relief</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Practice gratitude journaling to reduce stress and improve mood
                      </p>
                    </div>
                  </div>
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
