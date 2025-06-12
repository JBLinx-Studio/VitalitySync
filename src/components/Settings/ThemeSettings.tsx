
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
  };

  return (
    <Card className="glass-effect animate-fade-in shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Appearance</CardTitle>
        <CardDescription>Customize how the app looks for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup 
          value={theme} 
          onValueChange={handleThemeChange}
          className="flex flex-col md:flex-row gap-4"
        >
          <ThemeOption
            value="light"
            icon={<Sun className="h-4 w-4" />}
            label="Light"
            isSelected={theme === 'light'}
          />
          
          <ThemeOption
            value="dark"
            icon={<Moon className="h-4 w-4" />}
            label="Dark"
            isSelected={theme === 'dark'}
          />
          
          <ThemeOption
            value="system"
            icon={<MonitorSmartphone className="h-4 w-4" />}
            label="System"
            isSelected={theme === 'system'}
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

interface ThemeOptionProps {
  value: string;
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
}

const ThemeOption = ({ value, icon, label, isSelected }: ThemeOptionProps) => {
  return (
    <div className="relative">
      <div className={`
        flex flex-col items-center p-3 rounded-lg cursor-pointer relative overflow-hidden
        ${isSelected 
          ? 'bg-accent text-accent-foreground shadow-md' 
          : 'bg-background/50 hover:bg-background/80'}
        transition-all duration-300 border border-transparent
        ${isSelected ? 'border-primary/50' : 'hover:border-input'}
      `}>
        <RadioGroupItem value={value} id={value} className="sr-only" />
        
        {isSelected && (
          <motion.div 
            className="absolute inset-0 bg-primary/10 dark:bg-primary/5 -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <div className={`
          w-12 h-12 rounded-full mb-2 flex items-center justify-center
          ${isSelected 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-muted/50'}
          transition-all duration-300
        `}>
          {icon}
        </div>
        
        <Label htmlFor={value} className="cursor-pointer text-center">
          {label}
        </Label>
      </div>
      
      {isSelected && (
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-primary"
          initial={{ opacity: 0, scale: 0, x: '-50%', y: '100%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '100%' }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};
