
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Moon, Sun, MonitorSmartphone } from "lucide-react";

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <Card className="glass-effect animate-fade-in shadow-soft">
      <CardHeader>
        <CardTitle className="text-lg">Appearance</CardTitle>
        <CardDescription>Customize how the app looks for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup 
          value={theme} 
          onValueChange={(value) => setTheme(value as 'light' | 'dark' | 'system')}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light" className="flex items-center space-x-2 cursor-pointer">
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark" className="flex items-center space-x-2 cursor-pointer">
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system" className="flex items-center space-x-2 cursor-pointer">
              <MonitorSmartphone className="h-4 w-4" />
              <span>System</span>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
