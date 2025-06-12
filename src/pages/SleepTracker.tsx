
import React, { useState } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Moon, Sun, Plus, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

const SleepTracker: React.FC = () => {
  const { sleepRecords, addSleepRecord, getSleepSummary } = useHealth();
  
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [duration, setDuration] = useState(8);
  const [quality, setQuality] = useState(7);
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('06:00');
  const [notes, setNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const sleepSummary = getSleepSummary();
  
  // Get the last 7 days of sleep records for the chart
  const weeklySleepData = sleepRecords
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7)
    .map(record => ({
      date: format(new Date(record.date), 'MM/dd'),
      duration: record.duration,
      quality: record.quality,
    }));

  const handleAddSleepRecord = () => {
    addSleepRecord({
      id: '',
      date,
      duration,
      quality,
      bedtime,
      wakeTime,
      notes
    });
    
    toast({
      title: "Sleep record added",
      description: `You slept for ${duration} hours with a quality of ${quality}/10`,
    });
    
    // Reset form
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setDuration(8);
    setQuality(7);
    setBedtime('22:00');
    setWakeTime('06:00');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Sleep Tracker</h1>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4" />
          Log Sleep
        </Button>
      </div>
      
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Sleep Record</CardTitle>
            <CardDescription>Log your sleep to track your patterns</CardDescription>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedtime">Bedtime</Label>
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4 text-indigo-500" />
                    <Input 
                      id="bedtime" 
                      type="time" 
                      value={bedtime} 
                      onChange={(e) => setBedtime(e.target.value)} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="wakeTime">Wake Time</Label>
                  <div className="flex items-center">
                    <Sun className="mr-2 h-4 w-4 text-amber-500" />
                    <Input 
                      id="wakeTime" 
                      type="time" 
                      value={wakeTime} 
                      onChange={(e) => setWakeTime(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="duration">Duration (hours)</Label>
                  <span className="text-sm font-medium">{duration} hours</span>
                </div>
                <Slider
                  id="duration"
                  min={0}
                  max={12}
                  step={0.5}
                  value={[duration]}
                  onValueChange={(value) => setDuration(value[0])}
                  className="w-full"
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="quality">Sleep Quality</Label>
                  <span className="text-sm font-medium">{quality}/10</span>
                </div>
                <Slider
                  id="quality"
                  min={1}
                  max={10}
                  step={1}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any factors that affected your sleep..." 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                />
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddSleepRecord}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Save Sleep Record
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-indigo-500" />
              Average Sleep Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">
              {sleepSummary.averageDuration.toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">hours</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {sleepSummary.averageDuration >= 7 
                ? "Great job maintaining healthy sleep!" 
                : "Try to get 7-9 hours of sleep for optimal health"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Moon className="mr-2 h-5 w-5 text-indigo-500" />
              Sleep Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">
              {sleepSummary.averageQuality.toFixed(1)}
              <span className="text-sm font-normal text-gray-500 ml-1">/ 10</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {sleepSummary.averageQuality >= 7 
                ? "Your sleep quality is good" 
                : "Consider factors that might improve your sleep quality"}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sun className="mr-2 h-5 w-5 text-amber-500" />
              Sleep Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">
              {sleepRecords.length >= 3 ? "70%" : "N/A"}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {sleepRecords.length < 3 
                ? "Log at least 3 days to see consistency score" 
                : "Try to maintain consistent sleep/wake times"}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sleep Trends</CardTitle>
          <CardDescription>Your sleep patterns over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          {weeklySleepData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weeklySleepData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="duration" 
                    name="Sleep Hours"
                    stroke="#6366f1" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="quality" 
                    name="Sleep Quality"
                    stroke="#f97316" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Moon className="mx-auto h-12 w-12 opacity-20 mb-4" />
              <h3 className="text-lg font-medium mb-2">No sleep data recorded yet</h3>
              <p className="max-w-sm mx-auto">
                Start logging your sleep to see your trends and get personalized insights
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Sleep Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {sleepRecords.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-auto">
              {sleepRecords
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((record) => (
                  <div key={record.id} className="flex border-b border-gray-100 pb-4">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <Moon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h4 className="font-medium">{format(new Date(record.date), 'MMM dd, yyyy')}</h4>
                        <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                          {record.duration} hrs
                        </span>
                        <span className="ml-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                          Quality: {record.quality}/10
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {record.bedtime} - {record.wakeTime}
                      </div>
                      {record.notes && (
                        <p className="text-sm mt-1">{record.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No sleep records found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;
