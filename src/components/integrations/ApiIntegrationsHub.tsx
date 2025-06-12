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
  RefreshCw,
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
    <div className="space-y-8">
      {/* Enhanced Header with Premium Styling */}
      <GlassCard variant="premium" className="p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <Wifi className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  Smart Integrations Hub
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  Connect your favorite apps and devices for seamless health tracking
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {connectedApps.length} Apps Connected
                  </Badge>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-600 dark:text-blue-400">
                    Premium Features Available
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 hover:from-blue-600 hover:via-cyan-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Sync All Data
              </Button>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Enhanced Tabs with Premium Styling */}
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-16 p-2 bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl rounded-3xl border border-white/30 dark:border-slate-700/30 shadow-2xl">
          <TabsTrigger value="integrations" className="text-base font-semibold rounded-2xl">
            <Smartphone className="w-5 h-5 mr-2" />
            App Integrations
          </TabsTrigger>
          <TabsTrigger value="apis" className="text-base font-semibold rounded-2xl">
            <Database className="w-5 h-5 mr-2" />
            API Services
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-base font-semibold rounded-2xl">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableIntegrations.map((integration) => (
              <GlassCard key={integration.id} variant="premium" className="p-6 hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl shadow-lg">
                        <integration.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{integration.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {integration.premium && (
                        <Shield className="w-5 h-5 text-purple-500" />
                      )}
                      <Badge className={cn(getStatusColor(integration.status), "text-sm font-medium")}>
                        {getStatusIcon(integration.status)}
                        <span className="ml-2 capitalize">{integration.status}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Available Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {integration.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={connectedApps.includes(integration.id)}
                          onCheckedChange={() => toggleConnection(integration.id)}
                        />
                        <span className="text-sm font-medium">
                          {connectedApps.includes(integration.id) ? 'Connected' : 'Disconnected'}
                        </span>
                      </div>
                      <Button 
                        size="sm"
                        variant={integration.status === 'connected' ? 'outline' : 'default'}
                        className={cn(
                          integration.status === 'connected' 
                            ? 'border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                        )}
                      >
                        {integration.status === 'connected' ? 'Configure' : 'Connect Now'}
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="apis" className="space-y-6 mt-8">
          <div className="grid gap-6">
            {apiServices.map((service, index) => (
              <GlassCard key={index} variant="premium" className="p-6 hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl shadow-lg">
                        <service.icon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{service.description}</p>
                        <div className="flex gap-2">
                          {service.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs border-purple-200 dark:border-purple-700">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={cn(getStatusColor(service.status), "text-sm font-medium")}>
                        {getStatusIcon(service.status)}
                        <span className="ml-2 capitalize">{service.status}</span>
                      </Badge>
                      {service.status === 'premium' && (
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                          <Key className="w-4 h-4 mr-2" />
                          Setup API
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-8">
          <GlassCard variant="premium" className="p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Settings className="w-6 h-6 text-blue-500" />
              Integration Settings
            </h3>
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-700/30">
                  <div>
                    <label className="font-semibold text-lg">Auto-sync data</label>
                    <p className="text-gray-600 dark:text-gray-400">
                      Automatically sync data from connected apps every hour
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-700/30">
                  <div>
                    <label className="font-semibold text-lg">Data backup</label>
                    <p className="text-gray-600 dark:text-gray-400">
                      Create daily backups of all synced health data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/30 dark:border-slate-700/30">
                  <div>
                    <label className="font-semibold text-lg">Privacy mode</label>
                    <p className="text-gray-600 dark:text-gray-400">
                      Encrypt all data transmissions and storage
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="font-semibold text-lg">API Rate Limits</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3">Sync frequency (minutes)</label>
                    <Input type="number" defaultValue="60" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-3">Batch size</label>
                    <Input type="number" defaultValue="100" className="h-12 rounded-xl" />
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
