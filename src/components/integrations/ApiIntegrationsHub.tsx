
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Watch, 
  Wifi, 
  Database, 
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Settings,
  Link,
  Activity,
  Heart,
  BarChart3,
  Cloud,
  Key,
  Sync,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const ApiIntegrationsHub: React.FC = () => {
  const [connectedApps, setConnectedApps] = useState<string[]>(['fitbit', 'myfitnesspal']);

  const availableIntegrations = [
    {
      id: 'fitbit',
      name: 'Fitbit',
      description: 'Sync your steps, heart rate, and sleep data automatically',
      category: 'wearables',
      icon: Watch,
      status: 'connected',
      features: ['Heart Rate', 'Steps', 'Sleep', 'Calories'],
      premium: false
    },
    {
      id: 'myfitnesspal',
      name: 'MyFitnessPal',
      description: 'Import your food diary and nutrition data seamlessly',
      category: 'nutrition',
      icon: Database,
      status: 'connected',
      features: ['Food Logging', 'Nutrition', 'Recipes', 'Barcode Scanning'],
      premium: false
    },
    {
      id: 'apple-health',
      name: 'Apple Health',
      description: 'Connect with Apple HealthKit for comprehensive health data',
      category: 'health',
      icon: Smartphone,
      status: 'available',
      features: ['All Health Metrics', 'Workouts', 'Vitals', 'Medical Records'],
      premium: false
    },
    {
      id: 'google-fit',
      name: 'Google Fit',
      description: 'Sync with Google Fit for activity and wellness tracking',
      category: 'fitness',
      icon: Activity,
      status: 'available',
      features: ['Activity Tracking', 'Goals', 'Nutrition', 'Sleep'],
      premium: false
    },
    {
      id: 'strava',
      name: 'Strava',
      description: 'Import your runs, rides, and athletic activities',
      category: 'fitness',
      icon: BarChart3,
      status: 'available',
      features: ['Activities', 'Routes', 'Performance', 'Social Features'],
      premium: true
    },
    {
      id: 'withings',
      name: 'Withings',
      description: 'Connect smart scales and health devices',
      category: 'wearables',
      icon: Heart,
      status: 'available',
      features: ['Weight', 'Body Composition', 'Blood Pressure', 'Sleep'],
      premium: true
    },
    {
      id: 'cronometer',
      name: 'Cronometer',
      description: 'Detailed nutrition tracking and micronutrient analysis',
      category: 'nutrition',
      icon: Database,
      status: 'available',
      features: ['Micronutrients', 'Food Quality', 'Recipes', 'Meal Planning'],
      premium: true
    },
    {
      id: 'whoop',
      name: 'WHOOP',
      description: 'Advanced recovery and strain monitoring',
      category: 'wearables',
      icon: Zap,
      status: 'available',
      features: ['Recovery', 'Strain', 'Sleep', 'HRV'],
      premium: true
    }
  ];

  const apiServices = [
    {
      name: 'USDA Food Database',
      description: 'Comprehensive nutrition data for 350,000+ foods',
      status: 'active',
      icon: Database,
      features: ['Nutrition Facts', 'Food Search', 'Ingredient Analysis']
    },
    {
      name: 'Spoonacular Recipe API',
      description: 'Recipe search, meal planning, and nutrition analysis',
      status: 'premium',
      icon: Globe,
      features: ['Recipe Search', 'Meal Plans', 'Ingredient Substitutions']
    },
    {
      name: 'ExerciseDB',
      description: 'Exercise database with instructions and demonstrations',
      status: 'premium',
      icon: Activity,
      features: ['Exercise Library', 'Muscle Groups', 'Equipment Filters']
    },
    {
      name: 'OpenAI Health Coach',
      description: 'AI-powered personalized health recommendations',
      status: 'premium',
      icon: Zap,
      features: ['Personalized Advice', 'Goal Setting', 'Progress Analysis']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'premium': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'available': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'premium': return <Shield className="w-4 h-4" />;
      case 'available': return <Link className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const toggleConnection = (appId: string) => {
    setConnectedApps(prev => 
      prev.includes(appId) 
        ? prev.filter(id => id !== appId)
        : [...prev, appId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard variant="premium" className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-vibrant">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Smart Integrations Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Connect your favorite apps and devices for seamless health tracking
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              {connectedApps.length} Connected
            </Badge>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <Sync className="w-4 h-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>
      </GlassCard>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="integrations">App Integrations</TabsTrigger>
          <TabsTrigger value="apis">API Services</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableIntegrations.map((integration) => (
              <GlassCard key={integration.id} variant="premium" className="p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                        <integration.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{integration.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {integration.premium && (
                        <Shield className="w-4 h-4 text-purple-500" />
                      )}
                      <Badge className={getStatusColor(integration.status)}>
                        {getStatusIcon(integration.status)}
                        <span className="ml-1 capitalize">{integration.status}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Switch
                        checked={connectedApps.includes(integration.id)}
                        onCheckedChange={() => toggleConnection(integration.id)}
                      />
                      <Button 
                        size="sm"
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                        className={cn(
                          integration.status === 'connected' 
                            ? 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                        )}
                      >
                        {integration.status === 'connected' ? 'Configure' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apis" className="space-y-4">
          <div className="grid gap-4">
            {apiServices.map((service, index) => (
              <GlassCard key={index} variant="premium" className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                      <service.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                      <div className="flex gap-2 mt-2">
                        {service.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusIcon(service.status)}
                      <span className="ml-1 capitalize">{service.status}</span>
                    </Badge>
                    {service.status === 'premium' && (
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <Key className="w-4 h-4 mr-2" />
                        Setup
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Integration Settings
            </h3>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Auto-sync data</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automatically sync data from connected apps every hour
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Data backup</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Create daily backups of all synced health data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Privacy mode</label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Encrypt all data transmissions and storage
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">API Rate Limits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Sync frequency (minutes)</label>
                    <Input type="number" defaultValue="60" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Batch size</label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiIntegrationsHub;
