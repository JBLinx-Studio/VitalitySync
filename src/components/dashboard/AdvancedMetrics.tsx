
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Heart, 
  Zap, 
  TrendingUp, 
  Target,
  Flame,
  Droplets,
  Moon,
  Brain,
  Shield
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const AdvancedMetrics: React.FC = () => {
  const { userProfile, getHealthSummary } = useHealth();
  const { isMobile } = useViewport();
  const healthSummary = getHealthSummary();

  const advancedMetrics = [
    {
      title: 'VO2 Max Estimate',
      value: 45.2,
      unit: 'ml/kg/min',
      target: 50,
      status: 'good',
      trend: '+2.1',
      icon: Activity,
      color: 'blue',
      description: 'Cardiovascular fitness indicator'
    },
    {
      title: 'Resting Heart Rate',
      value: 62,
      unit: 'bpm',
      target: 60,
      status: 'excellent',
      trend: '-3',
      icon: Heart,
      color: 'red',
      description: 'Recovery and fitness marker'
    },
    {
      title: 'Recovery Score',
      value: 78,
      unit: '%',
      target: 80,
      status: 'good',
      trend: '+5',
      icon: Shield,
      color: 'green',
      description: 'Body readiness for training'
    },
    {
      title: 'Stress Level',
      value: 35,
      unit: '%',
      target: 30,
      status: 'moderate',
      trend: '-8',
      icon: Brain,
      color: 'purple',
      description: 'Mental and physical stress'
    },
    {
      title: 'Metabolic Rate',
      value: 1850,
      unit: 'cal/day',
      target: 1900,
      status: 'good',
      trend: '+50',
      icon: Flame,
      color: 'orange',
      description: 'Daily calorie burn rate'
    },
    {
      title: 'Hydration Level',
      value: 85,
      unit: '%',
      target: 90,
      status: 'good',
      trend: '+10',
      icon: Droplets,
      color: 'cyan',
      description: 'Body water percentage'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100 dark:bg-green-900/40';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/40';
      case 'moderate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/40';
      case 'poor': return 'text-red-600 bg-red-100 dark:bg-red-900/40';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/40';
      case 'red': return 'text-red-500 bg-red-100 dark:bg-red-900/40';
      case 'green': return 'text-green-500 bg-green-100 dark:bg-green-900/40';
      case 'purple': return 'text-purple-500 bg-purple-100 dark:bg-purple-900/40';
      case 'orange': return 'text-orange-500 bg-orange-100 dark:bg-orange-900/40';
      case 'cyan': return 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/40';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  return (
    <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Advanced Health Metrics
          <Badge variant="secondary" className="ml-auto">
            Real-time Analytics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3")}>
          {advancedMetrics.map((metric, index) => (
            <div key={index} className="p-5 bg-gray-50 dark:bg-slate-700/50 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", getIconColor(metric.color))}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{metric.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{metric.description}</p>
              
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold">{metric.value}</span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
                <div className={cn(
                  "ml-auto flex items-center gap-1 text-sm font-semibold",
                  metric.trend.startsWith('+') ? "text-green-600" : "text-blue-600"
                )}>
                  <TrendingUp className="w-3 h-3" />
                  {metric.trend}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Target: {metric.target} {metric.unit}</span>
                  <span>{Math.round((metric.value / metric.target) * 100)}%</span>
                </div>
                <Progress 
                  value={Math.min((metric.value / metric.target) * 100, 100)} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedMetrics;
