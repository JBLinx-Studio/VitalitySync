
import React, { useState } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { toast } from '@/hooks/use-toast';
import { Ruler, TrendingUp, Scale, BarChart, PlusCircle, Heart } from 'lucide-react';
import { format } from 'date-fns';

const BodyMeasurements: React.FC = () => {
  const { userProfile, calculateBMI } = useHealth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [measurements, setMeasurements] = useState(() => {
    const saved = localStorage.getItem('bodyMeasurements');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [weight, setWeight] = useState(userProfile?.weight || 70);
  const [waist, setWaist] = useState(80);
  const [chest, setChest] = useState(90);
  const [hips, setHips] = useState(95);
  const [bodyFat, setBodyFat] = useState(20);
  
  // Get the last 10 measurements for the chart
  const measurementHistory = measurements
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-10)
    .map(record => ({
      date: format(new Date(record.date), 'MM/dd'),
      weight: record.weight,
      waist: record.waist,
      bodyFat: record.bodyFat,
    }));
  
  const handleAddMeasurement = () => {
    const newMeasurement = {
      id: crypto.randomUUID(),
      date,
      weight,
      waist,
      chest,
      hips,
      bodyFat
    };
    
    const updatedMeasurements = [...measurements, newMeasurement];
    setMeasurements(updatedMeasurements);
    localStorage.setItem('bodyMeasurements', JSON.stringify(updatedMeasurements));
    
    toast({
      title: "Measurements recorded",
      description: `Your body measurements have been saved.`,
    });
    
    setShowAddForm(false);
  };
  
  const bmi = calculateBMI();
  
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  const bmiInfo = bmi ? getBMICategory(bmi) : { category: 'Unknown', color: 'text-gray-500' };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Body Measurements</h1>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 bg-health-primary hover:bg-health-primary/90"
        >
          <PlusCircle className="h-4 w-4" />
          Record Measurements
        </Button>
      </div>
      
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Record Body Measurements</CardTitle>
            <CardDescription>Track your physical changes over time</CardDescription>
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
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <span className="text-sm font-medium">{weight} kg</span>
                  </div>
                  <div className="flex items-center">
                    <Scale className="mr-2 h-4 w-4 text-health-primary" />
                    <Slider
                      id="weight"
                      min={30}
                      max={200}
                      step={0.5}
                      value={[weight]}
                      onValueChange={(value) => setWeight(value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="bodyFat">Body Fat %</Label>
                    <span className="text-sm font-medium">{bodyFat}%</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-2 h-4 w-4 text-red-500" />
                    <Slider
                      id="bodyFat"
                      min={3}
                      max={50}
                      step={0.5}
                      value={[bodyFat]}
                      onValueChange={(value) => setBodyFat(value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="waist">Waist (cm)</Label>
                    <span className="text-sm font-medium">{waist} cm</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="mr-2 h-4 w-4 text-indigo-500" />
                    <Slider
                      id="waist"
                      min={50}
                      max={150}
                      step={0.5}
                      value={[waist]}
                      onValueChange={(value) => setWaist(value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="chest">Chest (cm)</Label>
                    <span className="text-sm font-medium">{chest} cm</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="mr-2 h-4 w-4 text-indigo-500" />
                    <Slider
                      id="chest"
                      min={50}
                      max={150}
                      step={0.5}
                      value={[chest]}
                      onValueChange={(value) => setChest(value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="hips">Hips (cm)</Label>
                    <span className="text-sm font-medium">{hips} cm</span>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="mr-2 h-4 w-4 text-indigo-500" />
                    <Slider
                      id="hips"
                      min={50}
                      max={150}
                      step={0.5}
                      value={[hips]}
                      onValueChange={(value) => setHips(value[0])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddMeasurement}
                className="w-full bg-health-primary hover:bg-health-primary/90"
              >
                Save Measurements
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-health-primary" />
              BMI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-health-primary">
              {bmi ? bmi.toFixed(1) : 'N/A'}
            </div>
            <p className={`text-sm ${bmiInfo.color} font-medium mt-1`}>
              {bmiInfo.category}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Based on your height and weight
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-health-secondary" />
              Weight Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-health-secondary">
              {measurements.length > 1 
                ? `${(measurements[measurements.length-1]?.weight - measurements[measurements.length-2]?.weight).toFixed(1)} kg` 
                : 'N/A'}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {measurements.length > 1 
                ? measurements[measurements.length-1]?.weight - measurements[measurements.length-2]?.weight > 0
                  ? 'Gaining'
                  : 'Losing'
                : 'Start tracking to see trends'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Heart className="mr-2 h-5 w-5 text-red-500" />
              Body Fat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">
              {measurements.length > 0 ? `${measurements[measurements.length-1]?.bodyFat}%` : 'N/A'}
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {measurements.length > 0 
                ? measurements[measurements.length-1]?.bodyFat < 25 
                  ? 'Healthy range'
                  : 'Above recommended range'
                : 'No data recorded'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Ruler className="mr-2 h-5 w-5 text-indigo-500" />
              Waist-Height Ratio
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProfile && measurements.length > 0 ? (
              <div className="text-3xl font-bold text-indigo-500">
                {(measurements[measurements.length-1]?.waist / userProfile.height).toFixed(2)}
              </div>
            ) : (
              <div className="text-3xl font-bold text-gray-300">N/A</div>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {userProfile && measurements.length > 0 
                ? (measurements[measurements.length-1]?.waist / userProfile.height) < 0.5
                  ? 'Healthy ratio'
                  : 'Above recommended ratio'
                : 'No data available'}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Measurement Trends</CardTitle>
          <CardDescription>Track your body composition changes over time</CardDescription>
        </CardHeader>
        <CardContent className="h-96">
          {measurementHistory.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={measurementHistory}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="weight" 
                  name="Weight (kg)"
                  stroke="#4FD1C5" 
                  fill="#4FD1C5" 
                  fillOpacity={0.3}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="waist" 
                  name="Waist (cm)"
                  stroke="#9b87f5" 
                  fill="#9b87f5" 
                  fillOpacity={0.3}
                />
                <Area 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bodyFat" 
                  name="Body Fat (%)"
                  stroke="#F56565" 
                  fill="#F56565" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <Scale className="mx-auto h-16 w-16 opacity-20 mb-4" />
              <h3 className="text-lg font-medium mb-2">No measurement data recorded yet</h3>
              <p className="max-w-sm mx-auto">
                Start tracking your body measurements to see your trends and progress over time.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Measurement History</CardTitle>
        </CardHeader>
        <CardContent>
          {measurements.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-right py-3 px-4">Weight (kg)</th>
                    <th className="text-right py-3 px-4">Body Fat (%)</th>
                    <th className="text-right py-3 px-4">Waist (cm)</th>
                    <th className="text-right py-3 px-4">Chest (cm)</th>
                    <th className="text-right py-3 px-4">Hips (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {[...measurements]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((record) => (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{format(new Date(record.date), 'MMM dd, yyyy')}</td>
                        <td className="text-right py-3 px-4">{record.weight}</td>
                        <td className="text-right py-3 px-4">{record.bodyFat}%</td>
                        <td className="text-right py-3 px-4">{record.waist}</td>
                        <td className="text-right py-3 px-4">{record.chest}</td>
                        <td className="text-right py-3 px-4">{record.hips}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No measurement records found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BodyMeasurements;
