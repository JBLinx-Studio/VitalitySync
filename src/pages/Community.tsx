
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Trophy, 
  Flame,
  Star,
  TrendingUp,
  Camera,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const posts = [
    {
      id: 1,
      user: { name: 'Sarah Johnson', avatar: '', streak: 15 },
      content: 'Just hit my 15-day streak! 🔥 Feeling amazing and stronger than ever. Who else is crushing their goals today?',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      likes: 24,
      comments: 8,
      time: '2h ago',
      achievement: '15-Day Streak'
    },
    {
      id: 2,
      user: { name: 'Mike Chen', avatar: '', streak: 7 },
      content: 'Amazing post-workout meal prep session! 💪 Grilled chicken, quinoa, and roasted vegetables. Nutrition is 80% of the battle!',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      likes: 31,
      comments: 12,
      time: '4h ago',
      achievement: 'Meal Prep Master'
    },
    {
      id: 3,
      user: { name: 'Emily Rodriguez', avatar: '', streak: 22 },
      content: 'Ran my first 10K today! 🏃‍♀️ Started with barely being able to run 1K. Progress not perfection!',
      likes: 56,
      comments: 18,
      time: '6h ago',
      achievement: 'First 10K'
    }
  ];

  const challenges = [
    { 
      name: '30-Day Water Challenge', 
      participants: 1247, 
      progress: 68,
      prize: 'Premium Badge',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      name: 'Protein Goal Week', 
      participants: 892, 
      progress: 45,
      prize: 'Recipe Bundle',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      name: 'Step Count Squad', 
      participants: 2156, 
      progress: 78,
      prize: 'Fitness Tracker',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Thompson', streak: 45, points: 2890 },
    { rank: 2, name: 'Maria Garcia', streak: 38, points: 2654 },
    { rank: 3, name: 'David Kim', streak: 35, points: 2401 },
    { rank: 4, name: 'Lisa Wang', streak: 32, points: 2298 },
    { rank: 5, name: 'You', streak: 15, points: 1845 }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Community 👥
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
            Connect, share, and achieve together
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="glass" size="lg" className="gap-2">
            <Camera className="w-5 h-5" />
            Share Progress
          </Button>
          <Button variant="glass-primary" size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create Post
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <GlassCard variant="premium" className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      You
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea 
                      placeholder="Share your progress, achievements, or tips..." 
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Camera className="w-4 h-4" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Trophy className="w-4 h-4" />
                          Achievement
                        </Button>
                      </div>
                      <Button variant="glass-primary" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Posts */}
              {posts.map((post) => (
                <GlassCard key={post.id} variant="premium" className="p-6">
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
                            {post.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{post.user.name}</h4>
                            <Badge variant="secondary" className="text-xs gap-1">
                              <Flame className="w-3 h-3" />
                              {post.user.streak}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{post.time}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Achievement Badge */}
                    {post.achievement && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white gap-2">
                        <Trophy className="w-4 h-4" />
                        {post.achievement}
                      </Badge>
                    )}

                    {/* Content */}
                    <p className="text-gray-800 dark:text-gray-200">{post.content}</p>

                    {/* Image */}
                    {post.image && (
                      <div className="rounded-xl overflow-hidden">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex gap-6">
                        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="w-5 h-5" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                          <Share2 className="w-5 h-5" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Challenges */}
              <GlassCard variant="premium" className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Trending
                </h3>
                <div className="space-y-3">
                  {['#30DayWater', '#ProteinGoals', '#MorningWorkout', '#MealPrep'].map((tag) => (
                    <button key={tag} className="block w-full text-left p-3 rounded-lg bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">{tag}</span>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Top Contributors */}
              <GlassCard variant="premium" className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Top Contributors
                </h3>
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((user) => (
                    <div key={user.rank} className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                        user.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                        user.rank === 2 ? "bg-gradient-to-r from-gray-400 to-gray-500" :
                        "bg-gradient-to-r from-orange-600 to-red-600"
                      )}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.points} points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <GlassCard key={index} variant="premium" className="p-6 hover:scale-105 transition-transform">
                <div className="space-y-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center text-white text-2xl",
                    challenge.color
                  )}>
                    🏆
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{challenge.name}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {challenge.participants.toLocaleString()} participants
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{challenge.progress}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={cn("h-full bg-gradient-to-r transition-all duration-500", challenge.color)}
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">Prize:</span>
                      <Badge variant="outline">{challenge.prize}</Badge>
                    </div>
                    <Button className="w-full" variant="glass-primary">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Monthly Leaderboard
            </h3>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl transition-all",
                    user.name === 'You' 
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700" 
                      : "bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold",
                    user.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                    user.rank === 2 ? "bg-gradient-to-r from-gray-400 to-gray-500" :
                    user.rank === 3 ? "bg-gradient-to-r from-orange-600 to-red-600" :
                    "bg-gradient-to-r from-gray-500 to-gray-600"
                  )}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{user.name}</h4>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {user.streak} day streak
                      </span>
                      <span>{user.points} points</span>
                    </div>
                  </div>
                  {user.rank <= 3 && (
                    <div className="text-2xl">
                      {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <GlassCard variant="premium" className="p-6">
            <h3 className="text-xl font-semibold mb-4">Community Groups</h3>
            <p className="text-gray-600 dark:text-gray-400">Join specialized groups and connect with like-minded individuals...</p>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
