
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Cigarette, CigaretteOff, Clock, Calendar, Award, Bell, Pill } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useToast } from "@/hooks/use-toast";

const AddictionTracker: React.FC = () => {
  const { addictionRecords, addAddictionRecord, getUserAddictionGoals, updateAddictionGoal } = useHealth();
  const { toast } = useToast();
  const [selectedAddiction, setSelectedAddiction] = useState<string>('smoking');
  const [amount, setAmount] = useState<number>(1);
  const [craving, setCraving] = useState<number>(5);
  const [timeSinceLast, setTimeSinceLast] = useState<string>('');

  const addictions = [
    { id: 'smoking', name: 'Smoking/Vaping', icon: <Cigarette className="h-5 w-5" /> },
    { id: 'alcohol', name: 'Alcohol', icon: <Pill className="h-5 w-5" /> },
    { id: 'caffeine', name: 'Caffeine', icon: <Pill className="h-5 w-5" /> },
    { id: 'other', name: 'Other', icon: <Pill className="h-5 w-5" /> }
  ];

  const addictionGoals = getUserAddictionGoals();
  const currentGoal = addictionGoals[selectedAddiction] || { daily: 10, target: 0, timeframe: 30 };
  
  const handleAddRecord = () => {
    const newRecord = {
      id: crypto.randomUUID(),
      type: selectedAddiction,
      amount: amount,
      craving: craving,
      date: new Date().toISOString(),
      notes: timeSinceLast
    };
    
    addAddictionRecord(newRecord);
    toast({
      title: "Record added",
      description: `Your ${selectedAddiction} record has been saved.`,
    });
    
    // Check if deserves reward
    const todayRecords = addictionRecords.filter(record => 
      record.type === selectedAddiction && 
      new Date(record.date).toDateString() === new Date().toDateString()
    );
    
    const totalToday = todayRecords.reduce((sum, record) => sum + record.amount, 0) + amount;
    
    if (totalToday <= currentGoal.daily) {
      toast({
        title: "🏆 Achievement unlocked!",
        description: `You've stayed under your daily ${selectedAddiction} goal. Great work!`,
      });
    }
  };

  const handleUpdateGoal = (field: string, value: number) => {
    const updatedGoal = {...currentGoal, [field]: value};
    updateAddictionGoal(selectedAddiction, updatedGoal);
    toast({
      title: "Goal updated",
      description: `Your ${selectedAddiction} goal has been updated.`,
    });
  };

  // Prepare chart data
  const getLast7DaysData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayRecords = addictionRecords.filter(
        record => record.type === selectedAddiction && record.date.startsWith(dateStr)
      );
      
      const total = dayRecords.reduce((sum, record) => sum + record.amount, 0);
      const avgCraving = dayRecords.length ? 
        dayRecords.reduce((sum, record) => sum + record.craving, 0) / dayRecords.length : 0;
      
      data.push({
        name: date.toLocaleDateString('en-US', {weekday: 'short'}),
        usage: total,
        craving: avgCraving,
        goal: currentGoal.daily
      });
    }
    
    return data;
  };
  
  const chartData = getLast7DaysData();
  
  // Calculate streaks and progress
  const calculateDaysUnderGoal = () => {
    let days = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayRecords = addictionRecords.filter(
        record => record.type === selectedAddiction && record.date.startsWith(dateStr)
      );
      
      const total = dayRecords.reduce((sum, record) => sum + record.amount, 0);
      
      if (total <= currentGoal.daily) {
        days++;
      } else {
        break; // Break streak when goal is exceeded
      }
    }
    
    return days;
  };
  
  const daysUnderGoal = calculateDaysUnderGoal();
  const progressPercentage = Math.min(100, (daysUnderGoal / currentGoal.timeframe) * 100);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Addiction Recovery Tracker</h1>
        <Bell className="h-6 w-6 text-health-primary cursor-pointer" aria-label="View notifications" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {addictions.map(addiction => (
          <Card 
            key={addiction.id} 
            className={`cursor-pointer transition-all ${selectedAddiction === addiction.id ? 'ring-2 ring-health-primary' : ''}`}
            onClick={() => setSelectedAddiction(addiction.id)}
          >
            <CardContent className="flex items-center justify-center p-6">
              <div className="text-center">
                {addiction.icon}
                <h3 className="mt-2 font-medium">{addiction.name}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Track Usage</CardTitle>
            <CardDescription>Record your consumption and cravings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <div className="flex mt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                >-</Button>
                <div className="px-4 py-1 border rounded-md mx-2 w-12 text-center">
                  {amount}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setAmount(amount + 1)}
                >+</Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Craving Level (1-10)</label>
              <div className="flex items-center mt-1">
                <span className="text-sm mr-2">Low</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={craving}
                  onChange={(e) => setCraving(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm ml-2">High</span>
                <span className="ml-2 bg-gray-100 px-2 py-1 rounded">{craving}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Time since last use (optional)</label>
              <input
                type="text"
                placeholder="e.g. 2 hours"
                value={timeSinceLast}
                onChange={(e) => setTimeSinceLast(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
            
            <Button className="w-full" onClick={handleAddRecord}>
              Record Usage
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your journey to recovery</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Days under goal streak</h4>
                <span className="text-2xl font-bold text-health-primary">{daysUnderGoal}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">
                {daysUnderGoal} days out of {currentGoal.timeframe} day goal
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm text-gray-500">Current Goal</h5>
                <p className="text-xl font-bold">{currentGoal.daily}/day</p>
                <div className="mt-2 flex justify-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateGoal('daily', Math.max(0, currentGoal.daily - 1))}
                  >-</Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUpdateGoal('daily', currentGoal.daily + 1)}
                  >+</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm text-gray-500">Ultimate Target</h5>
                <p className="text-xl font-bold">{currentGoal.target}/day</p>
                <div className="mt-2 flex justify-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateGoal('target', Math.max(0, currentGoal.target - 1))}
                  >-</Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUpdateGoal('target', currentGoal.target + 1)}
                  >+</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h5 className="text-sm text-gray-500">Day Target</h5>
                <p className="text-xl font-bold">{currentGoal.timeframe}</p>
                <div className="mt-2 flex justify-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleUpdateGoal('timeframe', Math.max(7, currentGoal.timeframe - 7))}
                  >-</Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleUpdateGoal('timeframe', currentGoal.timeframe + 7)}
                  >+</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Usage Trend</CardTitle>
          <CardDescription>Track your usage and cravings over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="usage" 
                  name="Usage" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="craving" 
                  name="Craving Level" 
                  stroke="#82ca9d" 
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="goal" 
                  name="Daily Goal" 
                  stroke="#ff7300" 
                  strokeDasharray="5 5" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-500" />
            Achievements & Rewards
          </CardTitle>
          <CardDescription>Celebrate your progress milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`border rounded-lg p-4 ${daysUnderGoal >= 1 ? 'bg-green-50' : 'bg-gray-50 opacity-50'}`}>
              <h3 className="font-medium">First Day</h3>
              <p className="text-sm">Stay under your goal for 1 day</p>
              {daysUnderGoal >= 1 ? (
                <span className="text-green-600 text-sm font-medium flex items-center mt-2">
                  <Award className="h-4 w-4 mr-1" /> Achieved!
                </span>
              ) : (
                <span className="text-gray-500 text-sm mt-2 block">In progress</span>
              )}
            </div>
            
            <div className={`border rounded-lg p-4 ${daysUnderGoal >= 7 ? 'bg-green-50' : 'bg-gray-50 opacity-50'}`}>
              <h3 className="font-medium">One Week Strong</h3>
              <p className="text-sm">Stay under your goal for 7 days</p>
              {daysUnderGoal >= 7 ? (
                <span className="text-green-600 text-sm font-medium flex items-center mt-2">
                  <Award className="h-4 w-4 mr-1" /> Achieved!
                </span>
              ) : (
                <span className="text-gray-500 text-sm mt-2 block">In progress</span>
              )}
            </div>
            
            <div className={`border rounded-lg p-4 ${daysUnderGoal >= 30 ? 'bg-green-50' : 'bg-gray-50 opacity-50'}`}>
              <h3 className="font-medium">Monthly Milestone</h3>
              <p className="text-sm">Stay under your goal for 30 days</p>
              {daysUnderGoal >= 30 ? (
                <span className="text-green-600 text-sm font-medium flex items-center mt-2">
                  <Award className="h-4 w-4 mr-1" /> Achieved!
                </span>
              ) : (
                <span className="text-gray-500 text-sm mt-2 block">In progress</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddictionTracker;
