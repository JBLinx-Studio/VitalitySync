
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
  Clock
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
      title: 'Optimize Sleep Schedule',
      description: 'Your sleep patterns show you could benefit from going to bed 30 minutes earlier. This could improve your energy levels by 15%.',
      action: 'Adjust bedtime routine',
      confidence: 92,
      icon: Clock,
      color: 'purple'
    },
    {
      type: 'insight',
      priority: 'medium',
      title: 'Nutrition Balance Detected',
      description: 'Your protein intake has increased 12% this week. This aligns perfectly with your strength training goals.',
      action: 'Continue current nutrition plan',
      confidence: 87,
      icon: TrendingUp,
      color: 'green'
    },
    {
      type: 'alert',
      priority: 'high',
      title: 'Hydration Opportunity',
      description: 'AI detected you drink 20% less water on workout days. Increasing hydration could boost performance.',
      action: 'Set pre-workout hydration reminder',
      confidence: 94,
      icon: AlertCircle,
      color: 'blue'
    },
    {
      type: 'achievement',
      priority: 'low',
      title: 'Consistency Milestone',
      description: 'Congratulations! You\'ve maintained your exercise routine for 3 weeks straight. This is building lasting habits.',
      action: 'Keep up the momentum',
      confidence: 100,
      icon: Award,
      color: 'yellow'
    }
  ];

  const smartGoals = [
    {
      title: 'Weekly Exercise Goal',
      current: 4,
      target: 5,
      unit: 'workouts',
      prediction: 'On track to exceed by Sunday',
      confidence: 85
    },
    {
      title: 'Daily Steps',
      current: 8420,
      target: 10000,
      unit: 'steps',
      prediction: 'Add 15min evening walk',
      confidence: 78
    },
    {
      title: 'Sleep Quality',
      current: 7.2,
      target: 8.0,
      unit: 'hours',
      prediction: 'Improve with earlier bedtime',
      confidence: 91
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/40';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/40';
      case 'low': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/40';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/40';
    }
  };

  const getTypeColor = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'yellow': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Coach Header */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Health Coach</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Personalized insights powered by machine learning</p>
            </div>
            <Badge className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* AI Insights Grid */}
      <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2")}>
        {aiInsights.map((insight, index) => (
          <Card key={index} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden">
            {/* Gradient accent */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 bg-gradient-to-r",
              insight.color === 'purple' && "from-purple-500 to-pink-500",
              insight.color === 'green' && "from-green-500 to-emerald-500",
              insight.color === 'blue' && "from-blue-500 to-cyan-500",
              insight.color === 'yellow' && "from-yellow-500 to-orange-500"
            )}></div>
            
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", 
                    insight.color === 'purple' && "bg-purple-100 dark:bg-purple-900/40",
                    insight.color === 'green' && "bg-green-100 dark:bg-green-900/40",
                    insight.color === 'blue' && "bg-blue-100 dark:bg-blue-900/40",
                    insight.color === 'yellow' && "bg-yellow-100 dark:bg-yellow-900/40"
                  )}>
                    <insight.icon className={cn("w-5 h-5", getTypeColor(insight.color))} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{insight.title}</h3>
                    <Badge className={getPriorityColor(insight.priority)}>
                      {insight.priority} priority
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Confidence</div>
                  <div className="font-bold text-lg">{insight.confidence}%</div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {insight.description}
              </p>
              
              <div className="flex items-center justify-between">
                <button className={cn(
                  "px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105",
                  insight.color === 'purple' && "bg-purple-500 hover:bg-purple-600 text-white",
                  insight.color === 'green' && "bg-green-500 hover:bg-green-600 text-white",
                  insight.color === 'blue' && "bg-blue-500 hover:bg-blue-600 text-white",
                  insight.color === 'yellow' && "bg-yellow-500 hover:bg-yellow-600 text-white"
                )}>
                  {insight.action}
                </button>
                {insight.type === 'achievement' && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Smart Goals Predictions */}
      <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Target className="w-6 h-6 text-emerald-500" />
            Smart Goal Predictions
            <Badge variant="secondary">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {smartGoals.map((goal, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg">{goal.title}</h4>
                  <div className="text-right">
                    <div className="font-bold">{goal.current} / {goal.target} {goal.unit}</div>
                    <div className="text-sm text-gray-500">{goal.confidence}% confidence</div>
                  </div>
                </div>
                
                <Progress value={(goal.current / goal.target) * 100} className="h-3 mb-3" />
                
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{goal.prediction}</span>
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
