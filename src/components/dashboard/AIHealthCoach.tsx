
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain,
  Sparkles,
  Target,
  TrendingUp,
  Heart,
  Activity,
  Moon,
  Utensils,
  Droplets,
  MessageCircle,
  Lightbulb,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const AIHealthCoach: React.FC = () => {
  const { userProfile } = useHealth();
  const { isMobile } = useViewport();
  const [selectedRecommendation, setSelectedRecommendation] = useState<number | null>(null);

  const recommendations = [
    {
      id: 1,
      type: 'nutrition',
      priority: 'high',
      title: 'Optimize Post-Workout Nutrition',
      description: 'Your recovery could improve with better post-workout meals.',
      suggestion: 'Try consuming 20-30g protein within 30 minutes after your workouts.',
      impact: '+15% faster recovery',
      icon: Utensils,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      type: 'exercise',
      priority: 'medium',
      title: 'Add Cardio Variety',
      description: 'Your workouts could benefit from more cardiovascular diversity.',
      suggestion: 'Include 2-3 different cardio activities per week (swimming, cycling, running).',
      impact: '+20% cardiovascular health',
      icon: Activity,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      type: 'sleep',
      priority: 'high',
      title: 'Improve Sleep Consistency',
      description: 'Your sleep schedule varies too much between weekdays and weekends.',
      suggestion: 'Try maintaining the same bedtime within a 30-minute window every night.',
      impact: '+25% sleep quality',
      icon: Moon,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 4,
      type: 'hydration',
      priority: 'low',
      title: 'Increase Hydration',
      description: 'Your water intake is below optimal levels.',
      suggestion: 'Add one extra glass of water with each meal.',
      impact: '+10% energy levels',
      icon: Droplets,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const achievements = [
    { title: 'Consistency Champion', description: '7 days of logging food', icon: Award, earned: true },
    { title: 'Workout Warrior', description: '5 workouts this week', icon: Activity, earned: true },
    { title: 'Sleep Master', description: '8+ hours sleep 3 nights', icon: Moon, earned: false },
    { title: 'Hydration Hero', description: 'Daily water goal for 5 days', icon: Droplets, earned: false }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Coach Header */}
      <Card className="bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950/50 dark:via-slate-900/80 dark:to-pink-950/50 border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                AI Health Coach
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Personalized recommendations powered by advanced AI
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-400/30 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-semibold text-sm">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/60 dark:bg-slate-800/60 rounded-2xl backdrop-blur-xl border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-600 dark:text-green-400">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Goals Achieved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">87%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Health Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Recommendations */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h3 className="text-2xl font-bold">Personalized Recommendations</h3>
        </div>
        
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {recommendations.map((rec) => (
            <Card 
              key={rec.id}
              className={cn(
                "group cursor-pointer transition-all duration-500 border-0 shadow-xl hover:shadow-2xl hover:scale-105",
                "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl",
                selectedRecommendation === rec.id && "ring-2 ring-purple-500"
              )}
              onClick={() => setSelectedRecommendation(selectedRecommendation === rec.id ? null : rec.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${rec.color} shadow-lg`}>
                    <rec.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-lg">{rec.title}</h4>
                      <Badge className={getPriorityColor(rec.priority)}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{rec.description}</p>
                    
                    {selectedRecommendation === rec.id && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <p className="text-sm font-medium mb-2">💡 Recommendation:</p>
                          <p className="text-sm">{rec.suggestion}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-sm font-semibold">{rec.impact}</span>
                          </div>
                          <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            Apply <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievement Tracker */}
      <Card className="bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-amber-950/30 dark:via-slate-900/80 dark:to-orange-950/30 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-xl">
              <Award className="w-6 h-6 text-white" />
            </div>
            Weekly Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'}`}>
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all duration-300",
                  achievement.earned 
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700" 
                    : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    achievement.earned 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-400 text-white"
                  )}>
                    {achievement.earned ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <achievement.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={cn(
                      "font-semibold mb-1",
                      achievement.earned ? "text-green-700 dark:text-green-300" : "text-gray-600 dark:text-gray-400"
                    )}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat with AI Coach */}
      <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-blue-950/30 dark:via-slate-900/80 dark:to-indigo-950/30 border-0 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Chat with Your AI Coach</h3>
              <p className="text-gray-600 dark:text-gray-400">Get instant answers to your health questions</p>
            </div>
          </div>
          
          <div className="bg-white/60 dark:bg-slate-800/60 rounded-2xl p-6 mb-6 backdrop-blur-xl border border-white/20">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">💬 Recent conversation:</p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded-xl p-3">
                  <p className="text-sm">Based on your recent data, I recommend focusing on consistency rather than intensity this week.</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-3 max-w-xs ml-auto">
                  <p className="text-sm">Why do you suggest that?</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{userProfile?.name?.[0] || 'U'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-4 rounded-xl hover:shadow-xl transition-all duration-300">
            <MessageCircle className="w-5 h-5 mr-2" />
            Start New Conversation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIHealthCoach;
