
import React, { useState } from 'react';
import { Moon, Clock, Star, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHealth } from '@/contexts/HealthContext';
import { Badge } from '@/components/ui/badge';

const SleepTracker: React.FC = () => {
  const { sleepRecords, addSleepRecord, getSleepSummary } = useHealth();
  
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('07:00');
  const [quality, setQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [notes, setNotes] = useState('');

  const calculateDuration = (bedtime: string, wakeTime: string) => {
    const bed = new Date(`2000-01-01 ${bedtime}`);
    let wake = new Date(`2000-01-01 ${wakeTime}`);
    
    // If wake time is earlier than bedtime, assume next day
    if (wake < bed) {
      wake = new Date(`2000-01-02 ${wakeTime}`);
    }
    
    const diffMs = wake.getTime() - bed.getTime();
    return diffMs / (1000 * 60 * 60); // Convert to hours
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const duration = calculateDuration(bedtime, wakeTime);
    
    const newRecord = {
      date: new Date().toISOString().split('T')[0],
      bedtime,
      wakeTime,
      duration,
      quality,
      notes
    };
    
    addSleepRecord(newRecord);
    
    // Reset form
    setBedtime('22:00');
    setWakeTime('07:00');
    setQuality('good');
    setNotes('');
  };

  const summary = getSleepSummary();

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/40';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/40';
      case 'fair': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40';
      case 'poor': return 'text-red-600 bg-red-100 dark:bg-red-900/40';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  const getQualityStars = (quality: string) => {
    const counts = { poor: 1, fair: 2, good: 3, excellent: 4 };
    return counts[quality as keyof typeof counts] || 3;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Sleep Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Monitor your sleep patterns and improve your rest quality
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-indigo-200/50 dark:border-indigo-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Duration</p>
                    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      {summary.averageDuration.toFixed(1)}h
                    </p>
                  </div>
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl">
                    <Clock className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-purple-200/50 dark:border-purple-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Average Quality</p>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 capitalize">
                      {summary.averageQuality}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-2xl">
                    <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-blue-200/50 dark:border-blue-700/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Sleep Goal</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      8.0h
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-2xl">
                    <Moon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sleep Entry Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Moon className="mr-2 h-6 w-6 text-indigo-500" />
                  Log Your Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedtime" className="text-gray-700 dark:text-gray-300 font-medium">
                        Bedtime
                      </Label>
                      <Input
                        id="bedtime"
                        type="time"
                        value={bedtime}
                        onChange={(e) => setBedtime(e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                      />
                    </div>

                    <div>
                      <Label htmlFor="wakeTime" className="text-gray-700 dark:text-gray-300 font-medium">
                        Wake Time
                      </Label>
                      <Input
                        id="wakeTime"
                        type="time"
                        value={wakeTime}
                        onChange={(e) => setWakeTime(e.target.value)}
                        className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">
                      Duration: {calculateDuration(bedtime, wakeTime).toFixed(1)} hours
                    </Label>
                    <div className="mt-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-700">
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        Calculated automatically based on your bedtime and wake time
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-gray-300 font-medium">Sleep Quality</Label>
                    <Select value={quality} onValueChange={(value) => setQuality(value as any)}>
                      <SelectTrigger className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60">
                        <SelectItem value="poor">Poor ⭐</SelectItem>
                        <SelectItem value="fair">Fair ⭐⭐</SelectItem>
                        <SelectItem value="good">Good ⭐⭐⭐</SelectItem>
                        <SelectItem value="excellent">Excellent ⭐⭐⭐⭐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300 font-medium">
                      Sleep Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="How did you sleep? Any dreams, interruptions, or thoughts..."
                      className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                      rows={3}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-[1.02]"
                  >
                    Log Sleep Record
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sleep Records */}
          <div className="space-y-6">
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Clock className="mr-2 h-5 w-5 text-blue-500" />
                  Recent Sleep
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sleepRecords.slice(-10).reverse().map((record) => (
                    <div 
                      key={record.id}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-gray-600/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {record.duration.toFixed(1)} hours
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(record.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <div>
                          Bedtime: {record.bedtime} → Wake: {record.wakeTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={`${getQualityColor(record.quality)} border-0`}
                          >
                            {record.quality.charAt(0).toUpperCase() + record.quality.slice(1)}
                          </Badge>
                          <div className="flex">
                            {Array.from({ length: getQualityStars(record.quality) }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        {record.notes && (
                          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 italic">
                            "{record.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {sleepRecords.length === 0 && (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                      No sleep records yet. Start tracking your sleep patterns!
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

export default SleepTracker;
