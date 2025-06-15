
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
  Shield,
  Sparkles,
  Award
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
      title: 'VO2 Max Estimation',
      value: 45.2,
      unit: 'ml/kg/min',
      target: 50,
      status: 'excellent',
      trend: '+2.1',
      icon: Activity,
      color: 'blue',
      description: 'Your cardiovascular fitness is exceptional, indicating strong heart health and endurance capacity.',
      insight: 'Top 15% for your age group'
    },
    {
      title: 'Resting Heart Rate',
      value: 58,
      unit: 'bpm',
      target: 60,
      status: 'outstanding',
      trend: '-4',
      icon: Heart,
      color: 'red',
      description: 'Excellent resting heart rate indicates superior cardiovascular fitness and recovery.',
      insight: 'Athletic-level performance'
    },
    {
      title: 'Recovery Index',
      value: 87,
      unit: '%',
      target: 80,
      status: 'superb',
      trend: '+8',
      icon: Shield,
      color: 'green',
      description: 'Outstanding recovery score shows your body is adapting well to training stress.',
      insight: 'Ready for intense training'
    },
    {
      title: 'Stress Resilience',
      value: 23,
      unit: '%',
      target: 30,
      status: 'excellent',
      trend: '-12',
      icon: Brain,
      color: 'purple',
      description: 'Low stress levels indicate excellent mental and physical balance.',
      insight: 'Optimal stress management'
    },
    {
      title: 'Metabolic Efficiency',
      value: 1920,
      unit: 'cal/day',
      target: 1900,
      status: 'optimal',
      trend: '+65',
      icon: Flame,
      color: 'orange',
      description: 'Your metabolism is running efficiently, burning calories at an optimal rate.',
      insight: 'Peak metabolic function'
    },
    {
      title: 'Hydration Optimization',
      value: 92,
      unit: '%',
      target: 90,
      status: 'perfect',
      trend: '+15',
      icon: Droplets,
      color: 'cyan',
      description: 'Excellent hydration levels supporting optimal cellular function and performance.',
      insight: 'Perfectly hydrated'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'outstanding': 
      case 'perfect': return 'text-emerald-700 bg-emerald-100/80 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800';
      case 'excellent': 
      case 'superb': return 'text-green-700 bg-green-100/80 dark:bg-green-900/50 border border-green-200 dark:border-green-800';
      case 'optimal': 
      case 'good': return 'text-blue-700 bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800';
      case 'moderate': return 'text-yellow-700 bg-yellow-100/80 dark:bg-yellow-900/50 border border-yellow-200 dark:border-yellow-800';
      case 'poor': return 'text-red-700 bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800';
      default: return 'text-gray-700 bg-gray-100/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60';
      case 'red': return 'text-red-600 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/60 dark:to-red-800/60';
      case 'green': return 'text-green-600 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/60 dark:to-green-800/60';
      case 'purple': return 'text-purple-600 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60';
      case 'orange': return 'text-orange-600 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/60 dark:to-orange-800/60';
      case 'cyan': return 'text-cyan-600 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/60 dark:to-cyan-800/60';
      default: return 'text-gray-600 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/60 dark:to-gray-800/60';
    }
  };

  return (
    <div className="relative">
      {/* Enhanced atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30 rounded-3xl blur-3xl"></div>
      
      <Card className="relative bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 shadow-2xl hover:shadow-3xl transition-all duration-700 rounded-3xl overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse-soft"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse-soft delay-1000"></div>
        
        <CardHeader className="relative z-10 pb-8">
          <CardTitle className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Advanced Health Metrics
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Real-time biometric analysis powered by AI
              </p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg px-4 py-2">
              <Award className="w-3 h-3 mr-1" />
              Premium Analytics
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <div className={cn("grid gap-8", isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3")}>
            {advancedMetrics.map((metric, index) => (
              <div 
                key={index} 
                className="group relative p-6 bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-slate-700/40 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/40 dark:hover:bg-slate-800/40 overflow-hidden"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-shimmer"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110", getIconColor(metric.color))}>
                      <metric.icon className="w-7 h-7" />
                    </div>
                    <Badge className={cn("text-xs font-semibold px-3 py-1 rounded-full", getStatusColor(metric.status))}>
                      {metric.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">{metric.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{metric.description}</p>
                    </div>
                    
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        {metric.value}
                      </span>
                      <span className="text-lg text-gray-500 font-medium">{metric.unit}</span>
                      <div className={cn(
                        "ml-auto flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full",
                        metric.trend.startsWith('+') 
                          ? "text-emerald-700 bg-emerald-100/80 dark:bg-emerald-900/40" 
                          : "text-blue-700 bg-blue-100/80 dark:bg-blue-900/40"
                      )}>
                        <TrendingUp className="w-3 h-3" />
                        {metric.trend}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-700 dark:text-gray-300">Target: {metric.target} {metric.unit}</span>
                        <span className="text-gray-900 dark:text-gray-100 font-bold">{Math.round((metric.value / metric.target) * 100)}%</span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={Math.min((metric.value / metric.target) * 100, 100)} 
                          className="h-3 bg-gray-200/50 dark:bg-gray-700/50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-shimmer opacity-50"></div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium bg-gray-100/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                        💡 {metric.insight}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedMetrics;
