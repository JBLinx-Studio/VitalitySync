
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Moon, 
  Sun, 
  Scale, 
  Ruler, 
  Bell, 
  Languages, 
  Lock, 
  BellRing, 
  Speech, 
  Download, 
  CircleHelp, 
  Users 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  const { theme, toggleTheme, setTheme, measurementSystem, setMeasurementSystem } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your app preferences and account settings
        </p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-8">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="advanced" className="hidden md:inline-flex">Advanced</TabsTrigger>
          <TabsTrigger value="help" className="hidden md:inline-flex">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>
                Manage your theme preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? 
                    <Moon className="h-5 w-5 text-health-secondary" /> : 
                    <Sun className="h-5 w-5 text-amber-500" />
                  }
                  <div className="flex flex-col">
                    <span className="font-medium">Dark Mode</span>
                    <span className="text-xs text-muted-foreground">
                      Switch between light and dark mode
                    </span>
                  </div>
                </div>
                <Switch 
                  checked={theme === 'dark'} 
                  onCheckedChange={() => toggleTheme()} 
                />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Color Theme</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div 
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      theme === 'light' ? 'ring-2 ring-health-primary ring-offset-2' : ''
                    }`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="bg-gradient-to-r from-health-primary to-health-secondary h-12 rounded-md mb-1"></div>
                    <span className="text-xs font-medium">Light</span>
                  </div>
                  <div 
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      theme === 'dark' ? 'ring-2 ring-health-primary ring-offset-2' : ''
                    }`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-12 rounded-md mb-1"></div>
                    <span className="text-xs font-medium">Dark</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Display</CardTitle>
              <CardDescription>
                Control how content is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Compact View</span>
                    <span className="text-xs text-muted-foreground">
                      Show more data in less space
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Languages className="h-5 w-5 text-health-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Language</span>
                    <span className="text-xs text-muted-foreground">
                      Choose your preferred language
                    </span>
                  </div>
                </div>
                <select className="text-sm rounded border border-gray-300 p-1">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Measurement Units</CardTitle>
              <CardDescription>
                Select your preferred measurement system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={measurementSystem} 
                onValueChange={(value) => setMeasurementSystem(value as 'metric' | 'imperial')}
              >
                <div className="flex items-center space-x-2 mb-3">
                  <RadioGroupItem value="metric" id="metric" />
                  <Label htmlFor="metric" className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-health-primary" />
                    <div>
                      <span className="font-medium">Metric System</span>
                      <p className="text-xs text-muted-foreground">kg, cm, km</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="imperial" id="imperial" />
                  <Label htmlFor="imperial" className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-health-secondary" />
                    <div>
                      <span className="font-medium">Imperial System</span>
                      <p className="text-xs text-muted-foreground">lbs, inches, miles</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Nutrition Display</CardTitle>
              <CardDescription>
                Choose how you want to view nutrition values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">Show Percentages</span>
                      <span className="text-xs text-muted-foreground">
                        Display % of daily targets
                      </span>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">Detailed Macros</span>
                      <span className="text-xs text-muted-foreground">
                        Show detailed macro breakdowns
                      </span>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Push Notifications</span>
                    <span className="text-xs text-muted-foreground">
                      Receive alerts on your device
                    </span>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <BellRing className="h-5 w-5 text-health-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Reminders</span>
                    <span className="text-xs text-muted-foreground">
                      Get reminders for tracking
                    </span>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Speech className="h-5 w-5 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Sound Alerts</span>
                    <span className="text-xs text-muted-foreground">
                      Play sounds for notifications
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Manage your data and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Data Analytics</span>
                    <span className="text-xs text-muted-foreground">
                      Allow anonymous usage data
                    </span>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-health-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Export Data</span>
                    <span className="text-xs text-muted-foreground">
                      Download all your data
                    </span>
                  </div>
                </div>
                <button className="text-xs bg-health-primary/10 text-health-primary px-3 py-1 rounded">
                  Export
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced application options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Advanced settings options will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-6">
          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>
                Get assistance with using VitalitySync
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <CircleHelp className="h-5 w-5 text-health-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">Documentation</span>
                  <span className="text-xs text-muted-foreground">
                    Read our detailed user guides
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
