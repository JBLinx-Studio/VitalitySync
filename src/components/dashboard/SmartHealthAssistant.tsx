
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Camera,
  Gem,
  Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    { label: 'Log Meal', icon: Apple, color: 'from-green-400 to-emerald-500' },
    { label: 'Start Workout', icon: Activity, color: 'from-orange-400 to-red-500' },
    { label: 'Track Sleep', icon: Moon, color: 'from-purple-400 to-indigo-500' },
    { label: 'Check Goals', icon: Target, color: 'from-blue-400 to-cyan-500' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400/50 bg-red-500/10 backdrop-blur-xl';
      case 'medium': return 'border-yellow-400/50 bg-yellow-500/10 backdrop-blur-xl';
      case 'low': return 'border-green-400/50 bg-green-500/10 backdrop-blur-xl';
      default: return 'border-gray-400/50 bg-gray-500/10 backdrop-blur-xl';
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="space-y-8">
      {/* Premium AI Assistant Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-purple-500/20 rounded-3xl"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-purple-400/30 via-pink-400/30 to-purple-400/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse shadow-xl">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  VitalitySync AI Coach
                </h2>
                <p className="text-gray-300 text-lg">
                  Your personal health optimization assistant
                </p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 text-base">
              <Crown className="w-5 h-5 mr-2" />
              Elite AI
            </Badge>
          </div>

          {/* Premium Chat Interface */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about your health journey..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="pr-28 rounded-2xl border-purple-400/30 bg-white/10 backdrop-blur-xl text-white placeholder:text-gray-400 focus:border-purple-400 h-14 text-lg"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleVoiceInput}
                    className={cn(
                      "w-10 h-10 p-0 rounded-xl transition-all duration-300",
                      isListening && "bg-red-500 text-white animate-pulse shadow-lg"
                    )}
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-10 h-10 p-0 rounded-xl hover:bg-white/20"
                  >
                    <Camera className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl px-8 h-14 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                <Send className="w-5 h-5 mr-2" />
                Send
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  className="rounded-xl border-purple-300/30 bg-white/10 backdrop-blur-xl hover:bg-white/20 text-white font-semibold px-4 py-2"
                >
                  <action.icon className="w-4 h-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Smart Suggestions */}
      <div className="relative">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-3xl"></div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              Personalized Insights & Recommendations
            </h3>
            <Badge variant="secondary" className="flex items-center gap-2 bg-white/20 backdrop-blur-xl text-white border-white/30">
              <TrendingUp className="w-4 h-4" />
              AI-Powered
            </Badge>
          </div>

          <div className="grid gap-6">
            {smartSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
                  getPriorityColor(suggestion.priority)
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg">
                      <suggestion.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-lg text-white">{suggestion.title}</h4>
                        <Badge 
                          variant={suggestion.priority === 'high' ? 'destructive' : 'secondary'}
                          className="text-xs font-semibold"
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {suggestion.description}
                      </p>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {suggestion.action}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <Gem className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHealthAssistant;
