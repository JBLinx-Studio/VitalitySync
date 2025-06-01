
import React, { useState } from 'react';
import { Moon, TrendingUp, Calendar, Plus, Clock, Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/contexts/HealthContext';
import { format, differenceInHours, differenceInMinutes } from 'date-fns';

const SleepTracker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [bedtime, setBedtime] = useState('');
  const [wakeupTime, setWakeupTime] = useState('');
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [notes, setNotes] = useState('');

  const { sleepRecords, addSleepRecord, getSleepSummary } = useHealth();

  const qualityColors = {
    poor: 'bg-red-100 text-red-800 border-red-200',
    fair: 'bg-orange-100 text-orange-800 border-orange-200',
    good: 'bg-green-100 text-green-800 border-green-200',
    excellent: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  };

  const qualityEmojis = {
    poor: '😴',
    fair: '😐',
    good: '😊',
    excellent: '😄'
  };

  const calculateDuration = () => {
    if (!bedtime || !wakeupTime) return 0;
    
    const bedDateTime = new Date(`${selectedDate}T${bedtime}`);
    let wakeDateTime = new Date(`${selectedDate}T${wakeupTime}`);
    
    // If wake time is earlier than bedtime, assume it's the next day
    if (wakeDateTime <= bedDateTime) {
      wakeDateTime.setDate(wakeDateTime.getDate() + 1);
    }
    
    const totalMinutes = differenceInMinutes(wakeDateTime, bedDateTime);
    return totalMinutes / 60; // Convert to hours
  };

  const handleSubmit = () => {
    if (!bedtime || !wakeupTime) return;
    
    const duration = calculateDuration();
    
    const sleepRecord = {
      date: selectedDate,
      bedtime,
      wakeup_time: wakeupTime,
      duration,
      quality,
      notes: notes.trim() || undefined
    };

    addSleepRecord(sleepRecord);
    
    // Reset form
    setBedtime('');
    setWakeupTime('');
    setQuality('good');
    setNotes('');
  };

  const weekSummary = getSleepSummary(7);
  const recentRecords = sleepRecords
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);

  const duration = calculateDuration();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Sleep Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Monitor your sleep patterns and improve your rest quality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sleep Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Moon className="mr-2 h-6 w-6 text-indigo-500" />
                  Log Sleep
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="date" className="text-gray-700 dark:text-gray-300 font-medium">Sleep Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedtime" className="text-gray-700 dark:text-gray-300 font-medium">Bedtime</Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={bedtime}
                      onChange={(e) => setBedtime(e.target.value)}
                      className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="wakeup" className="text-gray-700 dark:text-gray-300 font-medium">Wake Up Time</Label>
                    <Input
                      id="wakeup"
                      type="time"
                      value={wakeupTime}
                      onChange={(e) => setWakeupTime(e.target.value)}
                      className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                {duration > 0 && (
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200/50 dark:border-indigo-700/50">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-indigo-500" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Duration: {Math.floor(duration)}h {Math.round((duration % 1) * 60)}m
                      </span>
                    </div>
                  </div>
                )}

                {/* Sleep Quality */}
                <div>
                  <Label className="text-gray-700 dark:text-gray-300 font-medium">Sleep Quality</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    {Object.entries(qualityEmojis).map(([qualityValue, emoji]) => (
                      <button
                        key={qualityValue}
                        onClick={() => setQuality(qualityValue as any)}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          quality === qualityValue
                            ? qualityColors[qualityValue as keyof typeof qualityColors] + ' scale-105 shadow-lg'
                            : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-2xl mb-2">{emoji}</span>
                        <span className="text-sm font-medium capitalize">{qualityValue}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300 font-medium">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="How did you sleep? Any factors that affected your sleep..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60 text-gray-900 dark:text-gray-100"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-3"
                  disabled={!bedtime || !wakeupTime}
                >
                  Save Sleep Record
                </Button>
              </CardContent>
            </Card>

            {/* Recent Sleep Records */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Sleep Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentRecords.length > 0 ? (
                  <div className="space-y-4">
                    {recentRecords.map((record) => (
                      <div key={record.id} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-200/50 dark:border-gray-600/50">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{qualityEmojis[record.quality]}</span>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{format(new Date(record.date), 'MMM dd, yyyy')}</p>
                              <p className={`text-sm ${qualityColors[record.quality]} px-2 py-1 rounded-full border inline-block`}>
                                {record.quality}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                              {Math.floor(record.duration)}h {Math.round((record.duration % 1) * 60)}m
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {record.bedtime} - {record.wakeup_time}
                            </p>
                          </div>
                        </div>
                        
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
                    No sleep records yet. Start tracking your sleep to see patterns and insights!
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
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Sleep</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {Math.floor(weekSummary.averageDuration)}h {Math.round((weekSummary.averageDuration % 1) * 60)}m
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sleep Quality</span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400 capitalize">
                      {weekSummary.averageQuality}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Sleep</span>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {Math.floor(weekSummary.totalSleep)}h {Math.round((weekSummary.totalSleep % 1) * 60)}m
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Tips */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Sleep Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Consistent Schedule</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Try to go to bed and wake up at the same time every day, even on weekends.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Screen Time</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Avoid screens 1-2 hours before bedtime to improve sleep quality.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Environment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keep your bedroom cool, dark, and quiet for optimal sleep.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;
