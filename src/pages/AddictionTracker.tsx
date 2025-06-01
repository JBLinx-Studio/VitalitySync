import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useHealth } from '@/contexts/HealthContext';
import { v4 as uuidv4 } from 'uuid';

const AddictionTracker: React.FC = () => {
  const { addictionRecords, addAddictionRecord, deleteAddictionRecord, getUserAddictionGoals, updateAddictionGoal } = useHealth();
  
  const [addictionType, setAddictionType] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [goalType, setGoalType] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecord = {
      type: addictionType,
      amount: parseFloat(amount),
      unit: 'count', // Add default unit
      date: new Date().toISOString().split('T')[0],
      notes
    };
    
    addAddictionRecord(newRecord);
    
    // Reset form
    setAmount('');
    setNotes('');
  };

  const handleGoalUpdate = () => {
    updateAddictionGoal(goalType, parseFloat(goalAmount), 'daily');
    setGoalType('');
    setGoalAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-red-900 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Addiction Tracker
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Monitor and manage your habits and dependencies
          </p>
        </div>

        <div className="space-y-6">
          {/* Addiction Entry Form */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Log New Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="addictionType" className="text-gray-700 dark:text-gray-300">Type of Addiction</Label>
                  <Input
                    id="addictionType"
                    type="text"
                    value={addictionType}
                    onChange={(e) => setAddictionType(e.target.value)}
                    placeholder="e.g., Smoking, Alcohol, Caffeine"
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 5 (cigarettes), 2 (drinks)"
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any additional notes about this entry..."
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-[1.02]"
                >
                  Log Addiction Record
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Set Addiction Goal */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Set Addiction Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => {e.preventDefault(); handleGoalUpdate();}} className="space-y-4">
                <div>
                  <Label htmlFor="goalType" className="text-gray-700 dark:text-gray-300">Type of Addiction</Label>
                  <Input
                    id="goalType"
                    type="text"
                    value={goalType}
                    onChange={(e) => setGoalType(e.target.value)}
                    placeholder="e.g., Smoking, Alcohol, Caffeine"
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                  />
                </div>

                <div>
                  <Label htmlFor="goalAmount" className="text-gray-700 dark:text-gray-300">Goal Amount</Label>
                  <Input
                    id="goalAmount"
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    placeholder="e.g., 0 (cigarettes), 1 (drink)"
                    className="mt-2 bg-white/80 dark:bg-slate-700/80 border-gray-200/60 dark:border-gray-600/60"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:shadow-xl transition-all duration-300 text-white border-0 hover:scale-[1.02]"
                >
                  Update Addiction Goal
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Addiction Records */}
          <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {addictionRecords.map((record) => (
                  <div
                    key={record.id}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-200/50 dark:border-gray-600/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {record.type} - {record.amount} {record.unit}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(record.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {record.notes && (
                        <p className="italic">Notes: {record.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
                {addictionRecords.length === 0 && (
                  <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                    No addiction records yet. Start tracking your habits!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddictionTracker;
