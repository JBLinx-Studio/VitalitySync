
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Zap,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  Flame,
  Heart,
  Moon
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const AIInsightsPanel: React.FC = () => {
  const { userProfile, getHealthSummary } = useHealth();
  const { isMobile } = useViewport();
  const healthSummary = getHealthSummary();

  const aiInsights = [
    {
      type: 'recommendation',
      priority: 'high',
      title: 'Sleep Optimization Protocol',
      description: 'AI analysis reveals your sleep efficiency could improve by 18% with a 45-minute earlier bedtime. Your current sleep debt of 2.3 hours is impacting recovery and cognitive performance.',
      action: 'Implement Smart Sleep Schedule',
      confidence: 94,
      icon: Moon,
      color: 'purple',
      impact: 'Energy +25%, Recovery +30%',
      timeframe: '2-3 weeks'
    },
    {
      type: 'insight',
      priority: 'medium',
      title: 'Nutrition Synergy Detected',
      description: 'Your protein timing aligns perfectly with workout windows, resulting in 15% better muscle protein synthesis. This optimal pattern is accelerating your strength gains.',
      action: 'Maintain Current Protocol',
      confidence: 91,
      icon: TrendingUp,
      color: 'green',
      impact: 'Muscle Growth +15%',
      timeframe: 'Ongoing'
    },
    {
      type: 'alert',
      priority: 'high',
      title: 'Hydration Performance Gap',
      description: 'Advanced analytics show 25% lower water intake on training days versus rest days. This pattern is limiting your power output by an estimated 8-12% during high-intensity sessions.',
      action: 'Activate Pre-Workout Hydration Protocol',
      confidence: 96,
      icon: AlertCircle,
      color: 'blue',
      impact: 'Performance +12%',
      timeframe: 'Immediate'
    },
    {
      type: 'achievement',
      priority: 'low',
      title: 'Consistency Mastery Unlocked',
      description: 'Exceptional achievement! You\'ve maintained perfect workout adherence for 4 consecutive weeks. This consistency is creating profound adaptive changes and building elite-level habits.',
      action: 'Continue Elite Momentum',
      confidence: 100,
      icon: Award,
      color: 'yellow',
      impact: 'Habit Strength +40%',
      timeframe: 'Achieved'
    },
    {
      type: 'prediction',
      priority: 'medium',
      title: 'Recovery Window Optimization',
      description: 'Predictive modeling suggests your optimal recovery window is 18-22 hours between high-intensity sessions. Current 24-hour gaps may be slightly conservative for your fitness level.',
      action: 'Test Optimized Recovery Protocol',
      confidence: 87,
      icon: Shield,
      color: 'emerald',
      impact: 'Training Volume +15%',
      timeframe: '1-2 weeks'
    },
    {
      type: 'breakthrough',
      priority: 'high',
      title: 'Metabolic Efficiency Breakthrough',
      description: 'Your metabolic flexibility has improved 23% over the past month. Your body is now efficiently switching between fuel sources, indicating exceptional metabolic health.',
      action: 'Leverage Metabolic Advantage',
      confidence: 98,
      icon: Flame,
      color: 'orange',
      impact: 'Fat Oxidation +23%',
      timeframe: 'Active now'
    }
  ];

  const smartGoals = [
    {
      title: 'Weekly Training Volume',
      current: 4.8,
      target: 5.0,
      unit: 'sessions',
      prediction: 'Exceed target by Sunday evening',
      confidence: 92,
      trend: '+15%',
      optimized: true
    },
    {
      title: 'Daily Movement Target',
      current: 9240,
      target: 10000,
      unit: 'steps',
      prediction: 'Add 12min evening walk to hit target',
      confidence: 85,
      trend: '+8%',
      optimized: false
    },
    {
      title: 'Sleep Quality Index',
      current: 8.2,
      target: 8.5,
      unit: 'score',
      prediction: 'Maintain current sleep hygiene',
      confidence: 94,
      trend: '+12%',
      optimized: true
    },
    {
      title: 'Recovery Score',
      current: 87,
      target: 90,
      unit: 'points',
      prediction: 'Focus on active recovery today',
      confidence: 88,
      trend: '+5%',
      optimized: false
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-700 bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800';
      case 'medium': return 'text-amber-700 bg-amber-100/80 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-800';
      case 'low': return 'text-blue-700 bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800';
      default: return 'text-gray-700 bg-gray-100/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800';
    }
  };

  const getTypeColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-600 dark:text-purple-400 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60';
      case 'green': return 'text-green-600 dark:text-green-400 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/60 dark:to-green-800/60';
      case 'blue': return 'text-blue-600 dark:text-blue-400 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60';
      case 'yellow': return 'text-yellow-600 dark:text-yellow-400 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/60 dark:to-yellow-800/60';
      case 'emerald': return 'text-emerald-600 dark:text-emerald-400 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/60 dark:to-emerald-800/60';
      case 'orange': return 'text-orange-600 dark:text-orange-400 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/60 dark:to-orange-800/60';
      default: return 'text-gray-600 dark:text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/60 dark:to-gray-800/60';
    }
  };

  return (
    <div className="space-y-10">
      {/* Enhanced AI Coach Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-blue-50/30 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-blue-950/30 rounded-3xl blur-3xl"></div>
        
        <Card className="relative bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 shadow-2xl overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse-soft"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse-soft delay-1000"></div>
          
          <CardHeader className="relative z-10 pb-8">
            <CardTitle className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  AI Health Coach Intelligence
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Advanced machine learning insights and personalized optimization strategies
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg px-6 py-3 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                Neural Engine Active
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Enhanced AI Insights Grid */}
      <div className={cn("grid gap-8", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        {aiInsights.map((insight, index) => (
          <Card 
            key={index} 
            className="group relative bg-white/25 dark:bg-slate-900/25 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 hover:shadow-2xl transition-all duration-700 hover:scale-105 rounded-3xl overflow-hidden"
          >
            {/* Animated gradient accent */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-2 bg-gradient-to-r",
              insight.color === 'purple' && "from-purple-500 via-pink-500 to-purple-600",
              insight.color === 'green' && "from-green-500 via-emerald-500 to-green-600",
              insight.color === 'blue' && "from-blue-500 via-cyan-500 to-blue-600",
              insight.color === 'yellow' && "from-yellow-500 via-amber-500 to-yellow-600",
              insight.color === 'emerald' && "from-emerald-500 via-teal-500 to-emerald-600",
              insight.color === 'orange' && "from-orange-500 via-red-500 to-orange-600"
            )}></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-shimmer"></div>
            
            <CardContent className="relative z-10 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110", getTypeColor(insight.color))}>
                    <insight.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">{insight.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={getPriorityColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {insight.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">AI Confidence</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{insight.confidence}%</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {insight.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Expected Impact</div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{insight.impact}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Timeframe</div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{insight.timeframe}</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <button className={cn(
                    "px-6 py-3 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg",
                    insight.color === 'purple' && "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white",
                    insight.color === 'green' && "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white",
                    insight.color === 'blue' && "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white",
                    insight.color === 'yellow' && "bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white",
                    insight.color === 'emerald' && "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white",
                    insight.color === 'orange' && "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                  )}>
                    {insight.action}
                  </button>
                  {insight.type === 'achievement' && (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Smart Goals Predictions */}
      <Card className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
        
        <CardHeader className="relative z-10 pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Intelligent Goal Predictions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered goal optimization and success forecasting</p>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2">
              <Brain className="w-3 h-3 mr-1" />
              Neural Predictions
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <div className="grid gap-6">
            {smartGoals.map((goal, index) => (
              <div key={index} className="group relative p-6 bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-slate-700/40 hover:shadow-lg transition-all duration-500">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{goal.title}</h4>
                    {goal.optimized && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Optimized
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {goal.current} / {goal.target} {goal.unit}
                    </div>
                    <div className="text-sm text-gray-500">
                      {goal.confidence}% confidence • {goal.trend} trend
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Progress value={(goal.current / goal.target) * 100} className="h-4 bg-gray-200/50 dark:bg-gray-700/50" />
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl">
                    <Lightbulb className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{goal.prediction}</span>
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

export default AIInsightsPanel;
