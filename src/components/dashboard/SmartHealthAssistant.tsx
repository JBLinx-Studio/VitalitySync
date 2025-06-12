
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Sparkles, 
  MessageCircle, 
  TrendingUp, 
  Zap,
  Brain,
  Target,
  Heart,
  Activity,
  Apple,
  Moon,
  Shield,
  Star,
  Send,
  Mic,
  Camera
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const SmartHealthAssistant: React.FC = () => {
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const smartSuggestions = [
    {
      title: 'Optimize Your Nutrition',
      description: 'Based on your recent meals, I suggest increasing protein by 15g and adding more fiber-rich vegetables.',
      action: 'View Meal Plan',
      icon: Apple,
      type: 'nutrition',
      priority: 'high'
    },
    {
      title: 'Workout Intensity Adjustment',
      description: 'Your heart rate data suggests you can handle higher intensity. Try our HIIT program next week.',
      action: 'Start HIIT',
      icon: Activity,
      type: 'exercise',
      priority: 'medium'
    },
    {
      title: 'Sleep Quality Enhancement',
      description: 'Your sleep efficiency is 78%. Consider reducing screen time 1 hour before bed for better rest.',
      action: 'Sleep Tips',
      icon: Moon,
      type: 'sleep',
      priority: 'high'
    },
    {
      title: 'Hydration Reminder',
      description: 'You\'re 400ml behind your daily water goal. Stay hydrated for optimal performance!',
      action: 'Log Water',
      icon: Heart,
      type: 'hydration',
      priority: 'medium'
    }
  ];

  const quickActions = [
    { label: 'Log Meal', icon: Apple, color: 'from-green-500 to-emerald-500' },
    { label: 'Start Workout', icon: Activity, color: 'from-orange-500 to-red-500' },
    { label: 'Track Sleep', icon: Moon, color: 'from-purple-500 to-indigo-500' },
    { label: 'Check Goals', icon: Target, color: 'from-blue-500 to-cyan-500' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/30 bg-red-50/50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500/30 bg-yellow-50/50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500/30 bg-green-50/50 dark:bg-green-900/20';
      default: return 'border-gray-500/30 bg-gray-50/50 dark:bg-gray-900/20';
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <div className="space-y-6">
      {/* AI Assistant Header */}
      <GlassCard variant="premium" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-vibrant">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                VitalitySync AI Coach
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your personal health optimization assistant
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
            <Shield className="w-4 h-4 mr-2" />
            Premium AI
          </Badge>
        </div>

        {/* Chat Interface */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask me anything about your health journey..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="pr-24 rounded-xl border-purple-200 dark:border-purple-700 focus:border-purple-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleVoiceInput}
                  className={cn(
                    "w-8 h-8 p-0 rounded-lg",
                    isListening && "bg-red-500 text-white animate-pulse"
                  )}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 rounded-lg"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl px-6">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant="outline"
                className="rounded-xl border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
              >
                <action.icon className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Smart Suggestions */}
      <GlassCard variant="premium" className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Personalized Insights & Recommendations
          </h3>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            AI-Powered
          </Badge>
        </div>

        <div className="grid gap-4">
          {smartSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02]",
                getPriorityColor(suggestion.priority)
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                    <suggestion.icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <Badge 
                        variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {suggestion.description}
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                    >
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default SmartHealthAssistant;
