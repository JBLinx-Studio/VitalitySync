
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type UnitSystem = 'metric' | 'imperial';
type WeightUnit = 'kg' | 'lb';
type HeightUnit = 'cm' | 'ft';
type VolumeUnit = 'ml' | 'fl-oz';
type EnergyUnit = 'kcal' | 'kJ';

export function MeasurementSettings() {
  const { toast } = useToast();
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => 
    localStorage.getItem('health-unit-system') as UnitSystem || 'metric'
  );
  const [showWaterInUnits, setShowWaterInUnits] = useState<boolean>(() => 
    localStorage.getItem('health-water-in-units') === 'true' || false
  );
  const [energyUnit, setEnergyUnit] = useState<EnergyUnit>(() => 
    localStorage.getItem('health-energy-unit') as EnergyUnit || 'kcal'
  );
  
  useEffect(() => {
    localStorage.setItem('health-unit-system', unitSystem);
    localStorage.setItem('health-water-in-units', String(showWaterInUnits));
    localStorage.setItem('health-energy-unit', energyUnit);
  }, [unitSystem, showWaterInUnits, energyUnit]);

  const handleUnitSystemChange = (value: string) => {
    setUnitSystem(value as UnitSystem);
    toast({
      title: "Settings Updated",
      description: `Measurement system changed to ${value}`,
      duration: 2000,
    });
  };

  return (
    <Card className="glass-effect animate-fade-in shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Measurement Units</CardTitle>
        <CardDescription>Customize your preferred measurement units</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Unit System</h4>
          <RadioGroup 
            value={unitSystem} 
            onValueChange={handleUnitSystemChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric (kg, cm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial (lb, ft)</Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Energy Units</h4>
          <RadioGroup 
            value={energyUnit} 
            onValueChange={(value) => setEnergyUnit(value as EnergyUnit)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kcal" id="kcal" />
              <Label htmlFor="kcal">Calories (kcal)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kJ" id="kJ" />
              <Label htmlFor="kJ">Kilojoules (kJ)</Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="water-units">Show water in units</Label>
            <p className="text-sm text-muted-foreground">
              Display water intake in ml/fl-oz instead of percentages
            </p>
          </div>
          <Switch 
            id="water-units" 
            checked={showWaterInUnits}
            onCheckedChange={setShowWaterInUnits}
          />
        </div>
      </CardContent>
    </Card>
  );
}
