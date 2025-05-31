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
  Users,
  Palette,
  Monitor,
  MousePointer,
  Eye,
  Sparkles,
  Layers,
  Star
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, GlassCard, FrostedCard, NeoCard } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const Settings = () => {
  const { 
    theme, 
    toggleTheme, 
    setTheme, 
    measurementSystem, 
    setMeasurementSystem,
    colorTheme,
    setColorTheme,
    isReducedMotion,
    setIsReducedMotion,
    glassEffect,
    setGlassEffect,
    animationLevel,
    setAnimationLevel,
    enableParticles,
    setEnableParticles
  } = useTheme();

  // Function to render the appropriate card based on the selected glass effect
  const renderGlassEffectPreview = (effectName: string) => {
    switch (effectName) {
      case 'standard':
        return (
          <GlassCard className="p-4 h-20 flex items-center justify-center">
            <span className="text-sm font-medium">Standard Glass</span>
          </GlassCard>
        );
      case 'frosted':
        return (
          <FrostedCard className="p-4 h-20 flex items-center justify-center">
            <span className="text-sm font-medium">Frosted Glass</span>
          </FrostedCard>
        );
      case 'neo':
        return (
          <NeoCard className="p-4 h-20 flex items-center justify-center">
            <span className="text-sm font-medium">Neo Glass</span>
          </NeoCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 gradient-text">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your app preferences and account settings
        </p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="appearance" className="btn-shine">
            <Palette className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="effects" className="btn-shine">
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Effects</span>
          </TabsTrigger>
          <TabsTrigger value="units" className="btn-shine">
            <Scale className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Units</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="btn-shine">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="btn-shine">
            <Lock className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="hidden md:inline-flex btn-shine">
            <Monitor className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <GlassCard className="interactive-card glow-border">
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
                  className="data-[state=checked]:bg-health-secondary"
                />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Color Theme</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`p-3 rounded-lg cursor-pointer transition-all glass-effect ${
                      colorTheme === 'teal-purple' 
                        ? 'ring-2 ring-health-primary ring-offset-2 dark:ring-offset-gray-900' 
                        : 'border border-gray-200 dark:border-gray-700'
                    } ${!isReducedMotion ? 'hover-lift' : ''}`}
                    onClick={() => setColorTheme('teal-purple')}
                  >
                    <div className="bg-gradient-to-r from-health-primary to-health-secondary h-14 rounded-md mb-2 shimmer-effect"></div>
                    <span className="text-xs font-medium">Teal/Purple</span>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg cursor-pointer transition-all glass-effect ${
                      colorTheme === 'blue-pink' 
                        ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' 
                        : 'border border-gray-200 dark:border-gray-700'
                    } ${!isReducedMotion ? 'hover-lift' : ''}`}
                    onClick={() => setColorTheme('blue-pink')}
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-pink-500 h-14 rounded-md mb-2 shimmer-effect"></div>
                    <span className="text-xs font-medium">Blue/Pink</span>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg cursor-pointer transition-all glass-effect ${
                      colorTheme === 'green-yellow' 
                        ? 'ring-2 ring-green-500 ring-offset-2 dark:ring-offset-gray-900' 
                        : 'border border-gray-200 dark:border-gray-700'
                    } ${!isReducedMotion ? 'hover-lift' : ''}`}
                    onClick={() => setColorTheme('green-yellow')}
                  >
                    <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-14 rounded-md mb-2 shimmer-effect"></div>
                    <span className="text-xs font-medium">Green/Yellow</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <MousePointer className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Reduced Motion</span>
                    <span className="text-xs text-muted-foreground">
                      Minimize animations across the app
                    </span>
                  </div>
                </div>
                <Switch 
                  checked={isReducedMotion} 
                  onCheckedChange={() => setIsReducedMotion(!isReducedMotion)}
                />
              </div>
            </CardContent>
          </GlassCard>

          <GlassCard className="interactive-card">
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
                  <Eye className="h-5 w-5 text-health-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">High Contrast</span>
                    <span className="text-xs text-muted-foreground">
                      Improve visibility with higher contrast
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Visual Effects</span>
                    <span className="text-xs text-muted-foreground">
                      Enable special visual effects
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={true} />
              </div>
              
              <Separator />
              
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
                <select className="text-sm rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-1">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>

        <TabsContent value="effects" className="space-y-6">
          <GlassCard className="interactive-card">
            <CardHeader>
              <CardTitle>Visual Effects</CardTitle>
              <CardDescription>
                Customize the app's visual appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Glass Effect Style</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`cursor-pointer transition-all ${
                      glassEffect === 'standard' 
                        ? 'ring-2 ring-health-primary ring-offset-2 dark:ring-offset-gray-900 rounded-lg' 
                        : ''
                    }`}
                    onClick={() => setGlassEffect('standard')}
                  >
                    {renderGlassEffectPreview('standard')}
                  </div>
                  <div 
                    className={`cursor-pointer transition-all ${
                      glassEffect === 'frosted' 
                        ? 'ring-2 ring-health-primary ring-offset-2 dark:ring-offset-gray-900 rounded-lg' 
                        : ''
                    }`}
                    onClick={() => setGlassEffect('frosted')}
                  >
                    {renderGlassEffectPreview('frosted')}
                  </div>
                  <div 
                    className={`cursor-pointer transition-all ${
                      glassEffect === 'neo' 
                        ? 'ring-2 ring-health-primary ring-offset-2 dark:ring-offset-gray-900 rounded-lg' 
                        : ''
                    }`}
                    onClick={() => setGlassEffect('neo')}
                  >
                    {renderGlassEffectPreview('neo')}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Animation Level</h3>
                <RadioGroup 
                  value={animationLevel} 
                  onValueChange={(value) => setAnimationLevel(value as 'minimal' | 'moderate' | 'full')}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="minimal" id="animation-minimal" className="text-health-primary" />
                    <Label htmlFor="animation-minimal" className="flex items-center gap-2 cursor-pointer">
                      <div>
                        <span className="font-medium">Minimal</span>
                        <p className="text-xs text-muted-foreground">Essential animations only</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="moderate" id="animation-moderate" className="text-health-secondary" />
                    <Label htmlFor="animation-moderate" className="flex items-center gap-2 cursor-pointer">
                      <div>
                        <span className="font-medium">Moderate</span>
                        <p className="text-xs text-muted-foreground">Balanced animations</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="full" id="animation-full" className="text-amber-500" />
                    <Label htmlFor="animation-full" className="flex items-center gap-2 cursor-pointer">
                      <div>
                        <span className="font-medium">Full</span>
                        <p className="text-xs text-muted-foreground">Rich, immersive animations</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Background Particles</span>
                    <span className="text-xs text-muted-foreground">
                      Enable floating particles in the background
                    </span>
                  </div>
                </div>
                <Switch 
                  checked={enableParticles} 
                  onCheckedChange={() => setEnableParticles(!enableParticles)}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Interactive Elements</span>
                    <span className="text-xs text-muted-foreground">
                      Elements respond to mouse/touch interactions
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={true} className="data-[state=checked]:bg-health-primary" />
              </div>
            </CardContent>
          </GlassCard>
        </TabsContent>
        
        <TabsContent value="units" className="space-y-6">
          <GlassCard className="interactive-card">
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
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="metric" id="metric" className="text-health-primary" />
                  <Label htmlFor="metric" className="flex items-center gap-2 cursor-pointer">
                    <Scale className="h-4 w-4 text-health-primary" />
                    <div>
                      <span className="font-medium">Metric System</span>
                      <p className="text-xs text-muted-foreground">kg, cm, km</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <RadioGroupItem value="imperial" id="imperial" className="text-health-secondary" />
                  <Label htmlFor="imperial" className="flex items-center gap-2 cursor-pointer">
                    <Ruler className="h-4 w-4 text-health-secondary" />
                    <div>
                      <span className="font-medium">Imperial System</span>
                      <p className="text-xs text-muted-foreground">lbs, inches, miles</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </GlassCard>

          <Card className="glass-effect interactive-card">
            <CardHeader>
              <CardTitle>Nutrition Display</CardTitle>
              <CardDescription>
                Choose how you want to view nutrition values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">Show Percentages</span>
                      <span className="text-xs text-muted-foreground">
                        Display % of daily targets
                      </span>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-health-primary" />
                </div>
                
                <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-medium">Detailed Macros</span>
                      <span className="text-xs text-muted-foreground">
                        Show detailed macro breakdowns
                      </span>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-health-primary" />
                </div>
                
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-3">Display Format</h3>
                  <ToggleGroup type="single" defaultValue="bars">
                    <ToggleGroupItem value="bars" className="flex-1">Bars</ToggleGroupItem>
                    <ToggleGroupItem value="pie" className="flex-1">Pie Chart</ToggleGroupItem>
                    <ToggleGroupItem value="text" className="flex-1">Text Only</ToggleGroupItem>
                  </ToggleGroup>
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
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Push Notifications</span>
                    <span className="text-xs text-muted-foreground">
                      Receive alerts on your device
                    </span>
                  </div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-health-primary" />
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <BellRing className="h-5 w-5 text-health-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Reminders</span>
                    <span className="text-xs text-muted-foreground">
                      Get reminders for tracking
                    </span>
                  </div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-health-secondary" />
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Speech className="h-5 w-5 text-amber-500" />
                  <div className="flex flex-col">
                    <span className="font-medium">Sound Alerts</span>
                    <span className="text-xs text-muted-foreground">
                      Play sounds for notifications
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={false} className="data-[state=checked]:bg-amber-500" />
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-sm font-medium mb-3">Notification Time</h3>
                <select className="w-full p-2 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                  <option value="morning">Morning (8:00 AM)</option>
                  <option value="noon">Noon (12:00 PM)</option>
                  <option value="evening">Evening (6:00 PM)</option>
                  <option value="custom">Custom Time</option>
                </select>
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
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="h-5 w-5 text-health-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Data Analytics</span>
                    <span className="text-xs text-muted-foreground">
                      Allow anonymous usage data
                    </span>
                  </div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-health-primary" />
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-health-secondary" />
                  <div className="flex flex-col">
                    <span className="font-medium">Export Data</span>
                    <span className="text-xs text-muted-foreground">
                      Download all your data
                    </span>
                  </div>
                </div>
                <button className="text-xs bg-health-primary/10 text-health-primary hover:bg-health-primary/20 px-4 py-2 rounded-md transition-colors btn-shine">
                  Export
                </button>
              </div>
              
              <Separator />
              
              <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">Data Deletion</h3>
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-3">
                  You can request to delete all your data and information from our servers.
                  This action cannot be undone.
                </p>
                <button className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 px-4 py-2 rounded-md transition-colors">
                  Request Data Deletion
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
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium">Data Auto-Sync</span>
                    <span className="text-xs text-muted-foreground">
                      Automatically sync data when online
                    </span>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium">Cache Management</span>
                    <span className="text-xs text-muted-foreground">
                      Control how app data is cached
                    </span>
                  </div>
                </div>
                <button className="text-xs bg-muted hover:bg-muted/80 px-4 py-2 rounded-md transition-colors">
                  Clear Cache
                </button>
              </div>
              
              <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium">Debug Mode</span>
                    <span className="text-xs text-muted-foreground">
                      Show detailed logs and error messages
                    </span>
                  </div>
                </div>
                <Switch defaultChecked={false} />
              </div>
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
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <CircleHelp className="h-5 w-5 text-health-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">Documentation</span>
                  <span className="text-xs text-muted-foreground">
                    Read our detailed user guides
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium">Contact Support</span>
                  <span className="text-xs text-muted-foreground">
                    Get help from our support team
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex flex-col">
                  <span className="font-medium">Frequently Asked Questions</span>
                  <span className="text-xs text-muted-foreground">
                    Find answers to common questions
                  </span>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mt-4">
                <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">About VitalitySync</h3>
                <p className="text-xs text-blue-700 dark:text-blue-400 mb-3">
                  Version 1.0.0 <br />
                  © 2025 VitalitySync. All rights reserved.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70 px-4 py-2 rounded-md transition-colors">
                    Privacy Policy
                  </button>
                  <button className="text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70 px-4 py-2 rounded-md transition-colors">
                    Terms of Service
                  </button>
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
