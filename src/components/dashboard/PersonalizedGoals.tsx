
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Trophy, 
  Plus,
  Edit,
  Check,
  Star,
  Flame,
  Activity,
  Heart,
  Moon,
  Droplets,
  Brain,
  Sparkles,
  Award,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useViewport } from '@/hooks';
import { cn } from '@/lib/utils';

const PersonalizedGoals: React.FC = () => {
  const { userProfile } = useHealth();
  const { isMobile } = useViewport();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const personalGoals = [
    {
      id: '1',
      title: 'Daily Movement Mastery',
      target: 10000,
      current: 8745,
      unit: 'steps',
      icon: Activity,
      color: 'blue',
      difficulty: 'Moderate',
      deadline: '2024-12-31',
      streak: 18,
      priority: 'high',
      description: 'Achieve consistent daily movement for optimal cardiovascular health and energy levels.',
      insight: 'On track for 15% fitness improvement',
      weeklyProgress: '+12%',
      motivation: 'Every step counts toward your best self!'
    },
    {
      id: '2',
      title: 'Strength Training Excellence',
      target: 5,
      current: 4,
      unit: 'sessions/week',
      icon: Flame,
      color: 'orange',
      difficulty: 'Challenging',
      deadline: '2024-12-31',
      streak: 6,
      priority: 'high',
      description: 'Build lean muscle mass and functional strength through consistent resistance training.',
      insight: 'Muscle growth up 8% this month',
      weeklyProgress: '+20%',
      motivation: 'Your strength is your superpower!'
    },
    {
      id: '3',
      title: 'Recovery Optimization',
      target: 8.5,
      current: 7.8,
      unit: 'hours sleep',
      icon: Moon,
      color: 'purple',
      difficulty: 'Achievable',
      deadline: '2024-12-31',
      streak: 12,
      priority: 'high',
      description: 'Prioritize quality sleep for enhanced recovery, cognitive function, and overall wellness.',
      insight: 'Sleep quality improved 22%',
      weeklyProgress: '+8%',
      motivation: 'Rest is when the magic happens!'
    },
    {
      id: '4',
      title: 'Hydration Perfection',
      target: 10,
      current: 7,
      unit: 'glasses/day',
      icon: Droplets,
      color: 'cyan',
      difficulty: 'Easy',
      deadline: '2024-12-31',
      streak: 25,
      priority: 'medium',
      description: 'Maintain optimal hydration for peak cellular function and mental clarity.',
      insight: 'Hydration consistency at 85%',
      weeklyProgress: '+25%',
      motivation: 'Hydration is your foundation!'
    },
    {
      id: '5',
      title: 'Mindfulness Mastery',
      target: 30,
      current: 18,
      unit: 'minutes/day',
      icon: Brain,
      color: 'green',
      difficulty: 'Moderate',
      deadline: '2024-12-31',
      streak: 9,
      priority: 'medium',
      description: 'Develop mental resilience and emotional balance through daily mindfulness practice.',
      insight: 'Stress levels reduced 35%',
      weeklyProgress: '+15%',
      motivation: 'Peace of mind is priceless!'
    },
    {
      id: '6',
      title: 'Cardiovascular Excellence',
      target: 35,
      current: 22,
      unit: 'minutes zone 2',
      icon: Heart,
      color: 'red',
      difficulty: 'Advanced',
      deadline: '2024-12-31',
      streak: 4,
      priority: 'high',
      description: 'Enhance cardiovascular endurance and metabolic efficiency through targeted training.',
      insight: 'VO2 Max improved 6%',
      weeklyProgress: '+10%',
      motivation: 'Your heart is getting stronger!'
    }
  ];

  const achievements = [
    {
      title: 'Consistency Champion',
      description: 'Complete your daily routine for 30 consecutive days',
      icon: Star,
      progress: 60,
      target: 100,
      unlocked: false,
      rarity: 'Epic',
      reward: '500 XP + Special Badge'
    },
    {
      title: 'Workout Warrior',
      description: 'Complete 100 strength training sessions',
      icon: Trophy,
      progress: 78,
      target: 100,
      unlocked: false,
      rarity: 'Rare',
      reward: '300 XP + Workout Title'
    },
    {
      title: 'Sleep Guardian',
      description: 'Achieve 8+ hours of quality sleep for 14 days',
      icon: Moon,
      progress: 100,
      target: 100,
      unlocked: true,
      rarity: 'Common',
      reward: '200 XP + Sleep Badge'
    },
    {
      title: 'Hydration Hero',
      description: 'Meet daily water goals for 21 consecutive days',
      icon: Droplets,
      progress: 95,
      target: 100,
      unlocked: false,
      rarity: 'Uncommon',
      reward: '250 XP + Hydration Title'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': 
      case 'Achievable': return 'text-emerald-700 bg-emerald-100/80 dark:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800';
      case 'Moderate': return 'text-amber-700 bg-amber-100/80 dark:bg-amber-900/50 border border-amber-200 dark:border-amber-800';
      case 'Challenging': 
      case 'Advanced': return 'text-red-700 bg-red-100/80 dark:bg-red-900/50 border border-red-200 dark:border-red-800';
      default: return 'text-gray-700 bg-gray-100/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200/60 dark:border-red-700/60 bg-gradient-to-br from-red-50/50 to-pink-50/30 dark:from-red-950/30 dark:to-pink-950/20';
      case 'medium': return 'border-amber-200/60 dark:border-amber-700/60 bg-gradient-to-br from-amber-50/50 to-yellow-50/30 dark:from-amber-950/30 dark:to-yellow-950/20';
      case 'low': return 'border-blue-200/60 dark:border-blue-700/60 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 dark:from-blue-950/30 dark:to-indigo-950/20';
      default: return 'border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-br from-gray-50/50 to-slate-50/30 dark:from-gray-950/30 dark:to-slate-950/20';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/60 dark:to-blue-800/60';
      case 'orange': return 'text-orange-600 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/60 dark:to-orange-800/60';
      case 'purple': return 'text-purple-600 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/60 dark:to-purple-800/60';
      case 'cyan': return 'text-cyan-600 bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/60 dark:to-cyan-800/60';
      case 'green': return 'text-green-600 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/60 dark:to-green-800/60';
      case 'red': return 'text-red-600 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/60 dark:to-red-800/60';
      default: return 'text-gray-600 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/60 dark:to-gray-800/60';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Epic': return 'text-purple-700 bg-purple-100/80 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800';
      case 'Rare': return 'text-blue-700 bg-blue-100/80 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800';
      case 'Uncommon': return 'text-green-700 bg-green-100/80 dark:bg-green-900/50 border border-green-200 dark:border-green-800';
      case 'Common': return 'text-gray-700 bg-gray-100/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800';
      default: return 'text-gray-700 bg-gray-100/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800';
    }
  };

  return (
    <div className="space-y-10">
      {/* Enhanced Goals Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-teal-50/20 to-blue-50/30 dark:from-emerald-950/30 dark:via-teal-950/20 dark:to-blue-950/30 rounded-3xl blur-3xl"></div>
        
        <Card className="relative bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 shadow-2xl overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl animate-pulse-soft"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl animate-pulse-soft delay-1000"></div>
          
          <CardHeader className="relative z-10 pb-8">
            <CardTitle className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  Personalized Health Goals
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Your journey to optimal health and peak performance
                </p>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg px-6 py-3">
                <Plus className="w-5 h-5 mr-2" />
                Create Goal
              </Button>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Enhanced Goals Grid */}
      <div className={cn("grid gap-8", isMobile ? "grid-cols-1" : "md:grid-cols-2 lg:grid-cols-3")}>
        {personalGoals.map((goal) => (
          <Card 
            key={goal.id} 
            className={cn(
              "group relative bg-white/25 dark:bg-slate-900/25 backdrop-blur-2xl border-2 transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden rounded-3xl",
              getPriorityColor(goal.priority),
              selectedGoal === goal.id && "ring-2 ring-emerald-500 scale-105 shadow-2xl"
            )}
            onClick={() => setSelectedGoal(goal.id)}
          >
            {/* Priority indicator */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-2 bg-gradient-to-r",
              goal.priority === 'high' && "from-red-500 via-pink-500 to-red-600",
              goal.priority === 'medium' && "from-amber-500 via-yellow-500 to-amber-600",
              goal.priority === 'low' && "from-blue-500 via-indigo-500 to-blue-600"
            )}></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-shimmer"></div>
            
            <CardContent className="relative z-10 p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110", getIconColor(goal.color))}>
                    <goal.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100">{goal.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{goal.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                    {goal.current}
                  </div>
                  <div className="text-right">
                    <div className="text-lg text-gray-500 font-medium">/ {goal.target} {goal.unit}</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-emerald-600">
                      <TrendingUp className="w-3 h-3" />
                      {goal.weeklyProgress}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Progress value={(goal.current / goal.target) * 100} className="h-4 bg-gray-200/50 dark:bg-gray-700/50" />
                  <div className="text-right text-sm font-bold text-gray-900 dark:text-gray-100">
                    {Math.round((goal.current / goal.target) * 100)}% Complete
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(goal.difficulty)}>
                      {goal.difficulty}
                    </Badge>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{goal.streak} day streak</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50/50 dark:bg-slate-800/30 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{goal.insight}</span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 italic">
                    💪 {goal.motivation}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Achievements Section */}
      <Card className="bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/30 dark:border-slate-700/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 dark:from-slate-800/10 dark:to-slate-800/5"></div>
        
        <CardHeader className="relative z-10 pb-6">
          <CardTitle className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Achievement Gallery
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Celebrating your health and fitness milestones</p>
            </div>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
              <Award className="w-3 h-3 mr-1" />
              {achievements.filter(a => a.unlocked).length} / {achievements.length} Unlocked
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <div className={cn("grid gap-6", isMobile ? "grid-cols-1" : "grid-cols-2")}>
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={cn(
                  "group relative p-6 rounded-3xl border-2 transition-all duration-500 hover:scale-105 overflow-hidden",
                  achievement.unlocked 
                    ? "bg-gradient-to-br from-yellow-50/80 to-orange-50/60 dark:from-yellow-950/40 dark:to-orange-950/30 border-yellow-200/60 dark:border-yellow-700/60 shadow-xl" 
                    : "bg-white/30 dark:bg-slate-800/30 backdrop-blur-xl border-gray-200/60 dark:border-gray-700/60"
                )}
              >
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -skew-x-12 group-hover:animate-shimmer"></div>
                )}
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110",
                      achievement.unlocked 
                        ? "bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/60 dark:to-orange-900/60" 
                        : "bg-gray-100/80 dark:bg-gray-700/80"
                    )}>
                      <achievement.icon className={cn(
                        "w-7 h-7",
                        achievement.unlocked ? "text-yellow-600" : "text-gray-500"
                      )} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">{achievement.title}</h4>
                        {achievement.unlocked && <Check className="w-5 h-5 text-green-500" />}
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{achievement.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700 dark:text-gray-300">Progress</span>
                      <span className="text-gray-900 dark:text-gray-100">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-3 bg-gray-200/50 dark:bg-gray-700/50" />
                    <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 px-3 py-2 rounded-full">
                      🎁 Reward: {achievement.reward}
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

export default PersonalizedGoals;
