
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
import { motion } from "framer-motion";
import { Ruler, Gauge, Droplets } from "lucide-react";

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
        <CardTitle className="text-lg flex items-center gap-2">
          <Ruler className="h-5 w-5 text-health-primary" />
          Measurement Units
        </CardTitle>
        <CardDescription>Customize your preferred measurement units</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Unit System</h4>
          <RadioGroup 
            value={unitSystem} 
            onValueChange={handleUnitSystemChange}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <UnitOption
              value="metric"
              label="Metric"
              description="kg, cm, ml"
              isSelected={unitSystem === 'metric'}
            />
            
            <UnitOption
              value="imperial"
              label="Imperial"
              description="lb, ft, fl oz"
              isSelected={unitSystem === 'imperial'}
            />
          </RadioGroup>
        </div>

        <Separator />
        
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Gauge className="h-4 w-4 text-health-primary" />
            Energy Units
          </h4>
          <RadioGroup 
            value={energyUnit} 
            onValueChange={(value) => setEnergyUnit(value as EnergyUnit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <UnitOption
              value="kcal"
              label="Calories"
              description="Standard energy measurement (kcal)"
              isSelected={energyUnit === 'kcal'}
            />
            
            <UnitOption
              value="kJ"
              label="Kilojoules"
              description="Alternative energy measurement (kJ)"
              isSelected={energyUnit === 'kJ'}
            />
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Droplets className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <Label htmlFor="water-units" className="text-base font-medium">Show water in units</Label>
              <p className="text-sm text-muted-foreground">
                Display water intake in ml/fl-oz instead of percentages
              </p>
            </div>
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

interface UnitOptionProps {
  value: string;
  label: string;
  description: string;
  isSelected: boolean;
}

const UnitOption = ({ value, label, description, isSelected }: UnitOptionProps) => {
  return (
    <div className="relative overflow-hidden">
      <div 
        className={`
          p-4 rounded-lg cursor-pointer border
          ${isSelected 
            ? 'border-primary bg-primary/10 dark:bg-primary/5' 
            : 'border-input bg-background/50 hover:bg-background/80'}
          transition-all duration-300
        `}
      >
        <RadioGroupItem value={value} id={value} className="sr-only" />
        
        {isSelected && (
          <motion.div 
            className="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-r-[25px] border-t-primary border-r-transparent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <div className="flex flex-col">
          <Label htmlFor={value} className="text-base font-medium cursor-pointer">
            {label}
          </Label>
          <span className="text-sm text-muted-foreground mt-1">{description}</span>
        </div>
      </div>
    </div>
  );
};
