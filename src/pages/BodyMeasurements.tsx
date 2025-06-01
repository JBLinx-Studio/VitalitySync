import React, { useState } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Metric, User2, GripVertical, CheckCircle2, AlertTriangle } from 'lucide-react';

const BodyMeasurements: React.FC = () => {
  const { userProfile, bodyMeasurements, addBodyMeasurement, getLatestMeasurement, calculateBMI } = useHealth();
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [muscleMass, setMuscleMass] = useState('');
  const [notes, setNotes] = useState('');
  const latestMeasurement = getLatestMeasurement();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newMeasurement = {
      weight: parseFloat(weight),
      bodyFat: parseFloat(bodyFat),
      muscleMass: parseFloat(muscleMass),
      date: new Date().toISOString().split('T')[0],
      notes
    };

    addBodyMeasurement(newMeasurement);

    // Reset form
    setWeight('');
    setBodyFat('');
    setMuscleMass('');
    setNotes('');
  };

  const currentBMI = userProfile?.weight && userProfile?.height 
    ? calculateBMI(userProfile.weight, userProfile.height)
    : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Metric className="h-8 w-8 text-gray-700 dark:text-gray-300" />
        <div>
          <h1 className="text-2xl font-bold">Body Measurements</h1>
          <p className="text-gray-500 dark:text-gray-400">Track your body composition over time</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User2 className="h-5 w-5 text-blue-500" />
            Current Stats
          </CardTitle>
          <CardDescription>Your most recent body measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Weight</p>
              <p className="text-lg font-semibold">{latestMeasurement?.weight || userProfile?.weight || 'N/A'} kg</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Body Fat</p>
              <p className="text-lg font-semibold">{latestMeasurement?.bodyFat || 'N/A'} %</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Muscle Mass</p>
              <p className="text-lg font-semibold">{latestMeasurement?.muscleMass || 'N/A'} kg</p>
            </div>
             <div>
              <p className="text-gray-600 dark:text-gray-400">BMI</p>
              <p className="text-lg font-semibold">
                {currentBMI ? currentBMI.toFixed(2) : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-green-500" />
            Add New Measurement
          </CardTitle>
          <CardDescription>Enter your latest body measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in kg"
                  required
                />
              </div>
              <div>
                <Label htmlFor="bodyFat">Body Fat (%)</Label>
                <Input
                  type="number"
                  id="bodyFat"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  placeholder="Enter body fat percentage"
                />
              </div>
              <div>
                <Label htmlFor="muscleMass">Muscle Mass (kg)</Label>
                <Input
                  type="number"
                  id="muscleMass"
                  value={muscleMass}
                  onChange={(e) => setMuscleMass(e.target.value)}
                  placeholder="Enter muscle mass in kg"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes about this measurement"
              />
            </div>
            <Button type="submit">Add Measurement</Button>
          </form>
        </CardContent>
      </Card>

      {bodyMeasurements.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-purple-500" />
              Measurement History
            </CardTitle>
            <CardDescription>Your past body measurements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Weight (kg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Body Fat (%)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Muscle Mass (kg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {bodyMeasurements.map((measurement) => (
                    <tr key={measurement.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(measurement.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{measurement.weight}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{measurement.bodyFat}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{measurement.muscleMass}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{measurement.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="py-8 flex flex-col items-center justify-center">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
            <h2 className="text-lg font-semibold text-center">No measurements recorded yet.</h2>
            <p className="text-gray-500 dark:text-gray-400 text-center">Start tracking your body composition by adding your first measurement above.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BodyMeasurements;
