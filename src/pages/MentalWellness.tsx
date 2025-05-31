import React, { useState, useRef } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Brain, Plus, TrendingUp, BarChart, CheckCircle2, Sparkles, Calendar, Clock } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useThemeEffects } from '@/hooks';

const moodEmojis = {
  great: '😁',
  good: '🙂',
  neutral: '😐',
  bad: '😔',
  awful: '😣',
};

const moodColors = {
  great: '#10b981',
  good: '#84cc16', 
  neutral: '#f59e0b',
  bad: '#f97316',
  awful: '#ef4444'
};

const wellnessActivities = [
  { id: 'meditation', label: 'Meditation', icon: '🧘' },
  { id: 'exercise', label: 'Exercise', icon: '🏃' },
  { id: 'reading', label: 'Reading', icon: '📚' },
  { id: 'nature', label: 'Time in Nature', icon: '🌿' },
  { id: 'journaling', label: 'Journaling', icon: '✍️' },
  { id: 'socializing', label: 'Socializing', icon: '👥' },
  { id: 'therapy', label: 'Therapy', icon: '💭' },
  { id: 'creative', label: 'Creative Activity', icon: '🎨' },
];

const MentalWellness: React.FC = () => {
  const { moodRecords, addMoodRecord, getMoodSummary } = useHealth();
  
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [mood, setMood] = useState<'great' | 'good' | 'neutral' | 'bad' | 'awful'>('neutral');
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);
  useThemeEffects(cardRef, { glassMorphism: true, intensity: 'low' });

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
    value: moodCountByType[mood],
    color: moodColors[mood as keyof typeof moodColors]
  }));

  // Weekly stress and mood data
  const weeklyData = moodRecords
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-14)
    .map(record => ({
      date: format(new Date(record.date), 'MM/dd'),
      stress: record.stressLevel,
      moodScore: record.mood === 'great' ? 5 : record.mood === 'good' ? 4 : record.mood === 'neutral' ? 3 : record.mood === 'bad' ? 2 : 1
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
      title: "✨ Mood recorded successfully!",
      description: `Your ${mood} mood with stress level ${stressLevel}/10 has been logged.`,
    });
    
    // Reset form
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setMood('neutral');
    setStressLevel(5);
    setNotes('');
    setSelectedActivities([]);
    setShowAddForm(false);
  };

  const MoodSelector = () => (
    <div className="space-y-4">
      <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200">How are you feeling today?</Label>
      <RadioGroup 
        value={mood} 
        onValueChange={(value) => setMood(value as typeof mood)}
        className="grid grid-cols-5 gap-3"
      >
        {Object.entries(moodEmojis).map(([moodType, emoji]) => (
          <div key={moodType} className="flex flex-col items-center space-y-2">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${
              mood === moodType ? `bg-gradient-to-br ${moodType === 'great' ? 'from-green-400 to-green-600' : 
              moodType === 'good' ? 'from-lime-400 to-lime-600' :
              moodType === 'neutral' ? 'from-amber-400 to-amber-600' :
              moodType === 'bad' ? 'from-orange-400 to-orange-600' :
              'from-red-400 to-red-600'} shadow-lg scale-110` : 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}>
              {emoji}
            </div>
            <RadioGroupItem value={moodType} id={moodType} className="sr-only" />
            <Label 
              htmlFor={moodType} 
              className={`text-sm font-medium cursor-pointer px-3 py-1 rounded-full transition-all duration-300 capitalize ${
                mood === moodType ? 'bg-white text-gray-800 shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {moodType}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-200/50 dark:border-purple-700/50">
            <Brain className="w-5 h-5 text-purple-500" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">Mental Wellness Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Track Your Mental Health
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Monitor your emotional well-being with intelligent insights and personalized recommendations
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-xl"
            size="lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            {showAddForm ? 'Cancel Entry' : 'Log Your Mood'}
          </Button>
        </div>
        
        {/* Mood Entry Form */}
        {showAddForm && (
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Track Your Mood</CardTitle>
                  <CardDescription className="text-lg">Record how you're feeling today and track your wellness activities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Date
                    </Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      className="h-12 rounded-xl border-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="stress" className="text-lg font-semibold flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Stress Level
                      </span>
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {stressLevel}/10
                      </span>
                    </Label>
                    <div className="px-3">
                      <Slider
                        id="stress"
                        min={1}
                        max={10}
                        step={1}
                        value={[stressLevel]}
                        onValueChange={(value) => setStressLevel(value[0])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Low</span>
                        <span>High</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <MoodSelector />
                
                <div className="space-y-4">
                  <Label className="text-lg font-semibold">Wellness Activities</Label>
                  <p className="text-gray-600 dark:text-gray-400">Select activities you engaged in today</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {wellnessActivities.map((activity) => (
                      <div 
                        key={activity.id} 
                        className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                          selectedActivities.includes(activity.id)
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-md'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                        }`}
                        onClick={() => handleActivityChange(activity.id)}
                      >
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <Checkbox 
                            id={activity.id}
                            checked={selectedActivities.includes(activity.id)}
                            onCheckedChange={() => handleActivityChange(activity.id)}
                            className="sr-only"
                          />
                          <Label htmlFor={activity.id} className="text-sm font-medium cursor-pointer">
                            {activity.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-lg font-semibold">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="How are you feeling? Any particular triggers or highlights from today?" 
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                    className="min-h-[120px] rounded-xl border-2 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                
                <Button 
                  type="button" 
                  onClick={handleAddMoodRecord}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-12 rounded-xl text-lg font-semibold"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Save Mood Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-4 mx-auto">
            <TabsTrigger value="overview" className="text-sm font-semibold">
              <BarChart className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-sm font-semibold">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="activities" className="text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Activities
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-sm font-semibold hidden lg:flex">
              <Sparkles className="w-4 h-4 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    Current Mood
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {moodRecords.length > 0 ? (
                    <div className="text-center space-y-3">
                      <div className="text-5xl animate-bounce">
                        {moodEmojis[moodRecords[moodRecords.length - 1].mood as keyof typeof moodEmojis]}
                      </div>
                      <div className="text-xl font-bold capitalize text-gray-800 dark:text-gray-200">
                        {moodRecords[moodRecords.length - 1].mood}
                      </div>
                      <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(new Date(moodRecords[moodRecords.length - 1].date), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Brain className="w-12 h-12 mx-auto opacity-20 mb-3" />
                      <p>No mood data yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Keep existing stress level and predominant mood cards with enhanced styling */}
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
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
              
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-white" />
                    </div>
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
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    Mood & Stress Trends
                  </CardTitle>
                  <CardDescription>Your emotional patterns over the past two weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  {weeklyData.length > 0 ? (
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '12px',
                              border: 'none',
                              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                              backdropFilter: 'blur(10px)'
                            }} 
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="stress" 
                            name="Stress Level"
                            stroke="#ef4444" 
                            fillOpacity={1}
                            fill="url(#stressGradient)"
                            strokeWidth={3}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="moodScore" 
                            name="Mood Score"
                            stroke="#10b981" 
                            fillOpacity={1}
                            fill="url(#moodGradient)"
                            strokeWidth={3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-500">
                      <TrendingUp className="mx-auto h-16 w-16 opacity-20 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No trend data yet</h3>
                      <p className="max-w-sm mx-auto">Start tracking your mood to see trends over time</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Enhanced mood distribution chart */}
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg rounded-2xl">
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
                                fill={entry.color} 
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
            </div>
          </TabsContent>
          
          {/* Keep existing TabsContent for activities and add insights */}
          <TabsContent value="activities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-gray-200 dark:border-gray-700 shadow-md">
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
                          <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-health-secondary/10 flex items-center justify-center mr-3 shadow-sm">
                                <CheckCircle2 className="h-5 w-5 text-health-secondary" />
                              </div>
                              <span>{activity.label}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                <span className={goodMoodPercentage > 50 ? 'text-green-600' : goodMoodPercentage > 30 ? 'text-amber-600' : 'text-red-600'}>
                                  {goodMoodPercentage}% positive mood
                                </span>
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
          </TabsContent>
          
          <TabsContent value="insights" className="space-y-6">
            {/* Add insights content here */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MentalWellness;
