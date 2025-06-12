
import React, { useState } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Plus, TrendingUp, BarChart, CheckCircle2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const moodEmojis = {
  great: '😁',
  good: '🙂',
  neutral: '😐',
  bad: '😔',
  awful: '😣',
};

const wellnessActivities = [
  { id: 'meditation', label: 'Meditation' },
  { id: 'exercise', label: 'Exercise' },
  { id: 'reading', label: 'Reading' },
  { id: 'nature', label: 'Time in Nature' },
  { id: 'journaling', label: 'Journaling' },
  { id: 'socializing', label: 'Socializing' },
  { id: 'therapy', label: 'Therapy' },
  { id: 'creative', label: 'Creative Activity' },
];

const MentalWellness: React.FC = () => {
  const { moodRecords, addMoodRecord, getMoodSummary } = useHealth();
  
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [mood, setMood] = useState<'great' | 'good' | 'neutral' | 'bad' | 'awful'>('neutral');
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const moodSummary = getMoodSummary();
  
  const handleActivityChange = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter(a => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Format mood data for charts
  const moodCountByType = moodRecords.reduce((acc, record) => {
    acc[record.mood] = (acc[record.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const moodPieData = Object.keys(moodCountByType).map(mood => ({
    name: mood,
    value: moodCountByType[mood]
  }));

  const MOOD_COLORS = {
    great: '#22c55e',
    good: '#84cc16',
    neutral: '#f59e0b',
    bad: '#f97316',
    awful: '#ef4444'
  };

  // Weekly stress data for line chart
  const weeklyStressData = moodRecords
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map(record => ({
      date: format(new Date(record.date), 'MM/dd'),
      stress: record.stressLevel
    }));

  const handleAddMoodRecord = () => {
    addMoodRecord({
      id: '',
      date,
      mood,
      stressLevel,
      notes,
      activities: selectedActivities
    });
    
    toast({
      title: "Mood recorded",
      description: `Your mood has been logged as ${mood} with stress level ${stressLevel}/10`,
    });
    
    // Reset form
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setMood('neutral');
    setStressLevel(5);
    setNotes('');
    setSelectedActivities([]);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Mental Wellness</h1>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-health-secondary hover:bg-health-secondary/90"
        >
          <Plus className="h-4 w-4" />
          Log Mood
        </Button>
      </div>
      
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Track Your Mood</CardTitle>
            <CardDescription>Record how you're feeling today</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="mood-select">How are you feeling today?</Label>
                <RadioGroup 
                  value={mood} 
                  onValueChange={(value) => setMood(value as typeof mood)}
                  className="flex justify-between mt-2"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-2">😁</div>
                    <RadioGroupItem 
                      value="great" 
                      id="great" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="great" 
                      className={`text-xs px-2 py-1 rounded cursor-pointer ${mood === 'great' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      Great
                    </Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-2">🙂</div>
                    <RadioGroupItem 
                      value="good" 
                      id="good" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="good" 
                      className={`text-xs px-2 py-1 rounded cursor-pointer ${mood === 'good' ? 'bg-lime-100 text-lime-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      Good
                    </Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-2">😐</div>
                    <RadioGroupItem 
                      value="neutral" 
                      id="neutral" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="neutral" 
                      className={`text-xs px-2 py-1 rounded cursor-pointer ${mood === 'neutral' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      Okay
                    </Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-2">😔</div>
                    <RadioGroupItem 
                      value="bad" 
                      id="bad" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="bad" 
                      className={`text-xs px-2 py-1 rounded cursor-pointer ${mood === 'bad' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      Bad
                    </Label>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl mb-2">😣</div>
                    <RadioGroupItem 
                      value="awful" 
                      id="awful" 
                      className="sr-only" 
                    />
                    <Label 
                      htmlFor="awful" 
                      className={`text-xs px-2 py-1 rounded cursor-pointer ${mood === 'awful' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      Awful
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="stress">Stress Level</Label>
                  <span className="text-sm font-medium">{stressLevel}/10</span>
                </div>
                <Slider
                  id="stress"
                  min={1}
                  max={10}
                  step={1}
                  value={[stressLevel]}
                  onValueChange={(value) => setStressLevel(value[0])}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label className="mb-2 block">Wellness Activities (select all that apply)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {wellnessActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={activity.id}
                        checked={selectedActivities.includes(activity.id)}
                        onCheckedChange={() => handleActivityChange(activity.id)}
                      />
                      <Label htmlFor={activity.id} className="text-sm">{activity.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="How are you feeling? Any particular triggers?" 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                />
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddMoodRecord}
                className="w-full bg-health-secondary hover:bg-health-secondary/90"
              >
                Save Mood Entry
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-health-secondary" />
              Current Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            {moodRecords.length > 0 ? (
              <>
                <div className="text-4xl mb-2">
                  {moodEmojis[moodRecords[moodRecords.length - 1].mood as keyof typeof moodEmojis]}
                </div>
                <div className="text-lg font-medium capitalize">
                  {moodRecords[moodRecords.length - 1].mood}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {format(new Date(moodRecords[moodRecords.length - 1].date), 'MMM dd, yyyy')}
                </p>
              </>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No mood data yet
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-health-secondary" />
              Average Stress Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-health-secondary">
              {moodSummary.averageStressLevel.toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">/ 10</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {moodSummary.averageStressLevel <= 4 
                ? "Your stress levels are well managed" 
                : "Consider stress management techniques"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-health-secondary" />
              Predominant Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            {moodRecords.length > 0 ? (
              <>
                <div className="text-4xl mb-2">
                  {moodEmojis[moodSummary.predominantMood as keyof typeof moodEmojis]}
                </div>
                <div className="capitalize text-health-secondary font-medium">
                  {moodSummary.predominantMood}
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No mood data yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>Your emotional patterns over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            {moodPieData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {moodPieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={MOOD_COLORS[entry.name as keyof typeof MOOD_COLORS] || '#cccccc'} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Brain className="mx-auto h-12 w-12 opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">No mood data yet</h3>
                <p className="max-w-sm mx-auto">
                  Start tracking your mood to see distribution
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Stress Level Trends</CardTitle>
            <CardDescription>Your stress levels over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            {weeklyStressData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyStressData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="stress" 
                      name="Stress Level"
                      stroke="#9b87f5" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="mx-auto h-12 w-12 opacity-20 mb-4" />
                <h3 className="text-lg font-medium mb-2">No stress data yet</h3>
                <p className="max-w-sm mx-auto">
                  Track your stress levels to see trends over time
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Wellness Activities Impact</CardTitle>
          <CardDescription>See which activities correlate with improved mood</CardDescription>
        </CardHeader>
        <CardContent>
          {moodRecords.some(record => record.activities && record.activities.length > 0) ? (
            <div className="space-y-4">
              {wellnessActivities.map(activity => {
                // Filter records that include this activity
                const recordsWithActivity = moodRecords.filter(
                  r => r.activities && r.activities.includes(activity.id)
                );
                
                if (recordsWithActivity.length === 0) return null;
                
                // Calculate average stress for records with this activity
                const avgStress = recordsWithActivity.reduce(
                  (sum, r) => sum + r.stressLevel, 
                  0
                ) / recordsWithActivity.length;
                
                // Count good moods (great or good)
                const goodMoodCount = recordsWithActivity.filter(
                  r => r.mood === 'great' || r.mood === 'good'
                ).length;
                
                const goodMoodPercentage = Math.round((goodMoodCount / recordsWithActivity.length) * 100);
                
                return (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-health-secondary/10 flex items-center justify-center mr-3">
                        <CheckCircle2 className="h-5 w-5 text-health-secondary" />
                      </div>
                      <span>{activity.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {goodMoodPercentage}% positive mood
                      </div>
                      <div className="text-xs text-gray-500">
                        Avg stress: {avgStress.toFixed(1)}/10
                      </div>
                    </div>
                  </div>
                );
              }).filter(Boolean)}
              
              {!wellnessActivities.some(activity => 
                moodRecords.some(r => r.activities && r.activities.includes(activity.id))
              ) && (
                <div className="text-center py-8 text-gray-500">
                  Track activities with your mood entries to see correlations
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No wellness activities data yet. Include activities when logging your mood.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalWellness;
