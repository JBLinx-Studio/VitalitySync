import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Trophy, 
  Target, 
  Calendar,
  TrendingUp,
  Star,
  Medal,
  Crown,
  Activity,
  Utensils,
  Moon,
  Brain,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const posts = [
    {
      id: 1,
      user: { 
        name: 'Sarah Johnson', 
        avatar: '', 
        streak: 15, 
        level: 'Gold',
        location: 'New York, NY',
        followers: 234
      },
      content: 'Just hit my 15-day streak! 🔥 Lost 5 pounds this month and feeling incredible. The key was meal prepping every Sunday and staying consistent with my workouts. Who else is crushing their goals today?',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      likes: 127,
      comments: 23,
      shares: 8,
      time: '2h ago',
      achievement: '15-Day Streak',
      tags: ['weightloss', 'mealprep', 'consistency'],
      category: 'transformation'
    },
    {
      id: 2,
      user: { 
        name: 'Mike Chen', 
        avatar: '', 
        streak: 7, 
        level: 'Silver',
        location: 'San Francisco, CA',
        followers: 189
      },
      content: 'Amazing post-workout meal prep session! 💪 Grilled chicken, quinoa, and roasted vegetables. Nutrition is 80% of the battle! Here\'s my secret marinade recipe in the comments.',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      likes: 89,
      comments: 34,
      shares: 12,
      time: '4h ago',
      achievement: 'Meal Prep Master',
      tags: ['mealprep', 'nutrition', 'recipes'],
      category: 'nutrition'
    },
    {
      id: 3,
      user: { 
        name: 'Emily Rodriguez', 
        avatar: '', 
        streak: 22, 
        level: 'Platinum',
        location: 'Austin, TX',
        followers: 456
      },
      content: 'Ran my first 10K today! 🏃‍♀️ Started with barely being able to run 1K three months ago. Progress not perfection! The Couch to 10K program really works.',
      likes: 203,
      comments: 67,
      shares: 25,
      time: '6h ago',
      achievement: 'First 10K',
      tags: ['running', 'milestone', 'cardio'],
      category: 'fitness'
    }
  ];

  const challenges = [
    { 
      name: '30-Day Water Challenge', 
      participants: 2847, 
      progress: 68,
      prize: 'Premium Badge + Water Bottle',
      color: 'from-cyan-500 to-blue-500',
      icon: '💧',
      difficulty: 'Beginner',
      timeLeft: '12 days',
      category: 'hydration'
    },
    { 
      name: 'Protein Goal Week', 
      participants: 1592, 
      progress: 45,
      prize: 'Recipe Bundle + Nutrition Guide',
      color: 'from-purple-500 to-pink-500',
      icon: '🥩',
      difficulty: 'Intermediate',
      timeLeft: '3 days',
      category: 'nutrition'
    },
    { 
      name: 'Step Count Squad', 
      participants: 3856, 
      progress: 78,
      prize: 'Fitness Tracker + Premium Month',
      color: 'from-green-500 to-emerald-500',
      icon: '👟',
      difficulty: 'Beginner',
      timeLeft: '18 days',
      category: 'fitness'
    },
    {
      name: 'Mindful Meditation March',
      participants: 1234,
      progress: 32,
      prize: 'Meditation App + Wellness Kit',
      color: 'from-indigo-500 to-purple-500',
      icon: '🧘',
      difficulty: 'Beginner',
      timeLeft: '25 days',
      category: 'mental'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Alex Thompson', streak: 67, points: 4890, level: 'Diamond', change: '+2' },
    { rank: 2, name: 'Maria Garcia', streak: 54, points: 4654, level: 'Platinum', change: '0' },
    { rank: 3, name: 'David Kim', streak: 48, points: 4401, level: 'Platinum', change: '-1' },
    { rank: 4, name: 'Lisa Wang', streak: 45, points: 4298, level: 'Gold', change: '+1' },
    { rank: 5, name: 'You', streak: 15, points: 2845, level: 'Silver', change: '+3' }
  ];

  const groups = [
    {
      name: 'Weight Loss Warriors',
      members: 12847,
      posts: 89,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200',
      description: 'Support group for sustainable weight loss',
      category: 'Weight Loss',
      isJoined: true
    },
    {
      name: 'Meal Prep Masters',
      members: 8934,
      posts: 156,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
      description: 'Share recipes, tips, and meal planning strategies',
      category: 'Nutrition',
      isJoined: false
    },
    {
      name: 'Running Club',
      members: 15623,
      posts: 203,
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=200',
      description: 'For runners of all levels - from beginners to marathoners',
      category: 'Fitness',
      isJoined: true
    },
    {
      name: 'Plant-Based Power',
      members: 6782,
      posts: 134,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
      description: 'Vegetarian and vegan nutrition and lifestyle',
      category: 'Nutrition',
      isJoined: false
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Posts', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'transformation', label: 'Transformations', icon: <Trophy className="w-4 h-4" /> },
    { value: 'nutrition', label: 'Nutrition', icon: <Utensils className="w-4 h-4" /> },
    { value: 'fitness', label: 'Fitness', icon: <Activity className="w-4 h-4" /> },
    { value: 'mental', label: 'Mental Health', icon: <Heart className="w-4 h-4" /> }
  ];

  const filteredPosts = selectedFilter === 'all' ? posts : posts.filter(post => post.category === selectedFilter);

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Community Hub 🌟
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-3 text-xl">
            Connect, inspire, and achieve together with 50,000+ members
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Badge variant="secondary" className="px-4 py-2 gap-2">
              <Users className="w-4 h-4" />
              2,847 online now
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 gap-2">
              <MessageCircle className="w-4 h-4" />
              156 new posts today
            </Badge>
          </div>
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
        <TabsList className="grid w-full grid-cols-4 mb-8 h-14">
          <TabsTrigger value="feed" className="text-base gap-2">
            <TrendingUp className="w-5 h-5" />
            Feed
          </TabsTrigger>
          <TabsTrigger value="challenges" className="text-base gap-2">
            <Target className="w-5 h-5" />
            Challenges
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-base gap-2">
            <Trophy className="w-5 h-5" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="groups" className="text-base gap-2">
            <Users className="w-5 h-5" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-8">
              {/* Enhanced Filter Bar */}
              <GlassCard variant="premium" className="p-6">
                <div className="flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {filterOptions.map((filter) => (
                      <Button
                        key={filter.value}
                        variant={selectedFilter === filter.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFilter(filter.value)}
                        className="gap-2"
                      >
                        {filter.icon}
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="w-4 h-4" />
                    More Filters
                  </Button>
                </div>
              </GlassCard>

              {/* Enhanced Create Post */}
              <GlassCard variant="premium" className="p-6">
                <div className="flex gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                      You
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-4">
                    <Textarea 
                      placeholder="Share your progress, achievements, or inspire others..." 
                      className="min-h-[120px] resize-none text-lg"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Camera className="w-4 h-4" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Trophy className="w-4 h-4" />
                          Achievement
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </Button>
                      </div>
                      <Button variant="glass-primary" className="gap-2 px-8">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Enhanced Posts */}
              {filteredPosts.map((post) => (
                <GlassCard key={post.id} variant="premium" className="p-8">
                  <div className="space-y-6">
                    {/* Enhanced User Info */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 ring-2 ring-white/20">
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white text-xl">
                            {post.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-lg">{post.user.name}</h4>
                            <Badge variant="secondary" className="text-xs gap-1">
                              {post.user.level}
                            </Badge>
                            <Badge variant="outline" className="text-xs gap-1">
                              <Flame className="w-3 h-3" />
                              {post.user.streak}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            {post.user.location} • {post.time} • {post.user.followers} followers
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Achievement Badge */}
                    {post.achievement && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white gap-2 px-4 py-2 text-sm">
                        <Trophy className="w-4 h-4" />
                        {post.achievement}
                      </Badge>
                    )}

                    {/* Content */}
                    <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed">{post.content}</p>

                    {/* Tags */}
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-blue-600 hover:bg-blue-50 cursor-pointer">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Image */}
                    {post.image && (
                      <div className="rounded-2xl overflow-hidden shadow-xl">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Enhanced Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex gap-8">
                        <button className="flex items-center gap-3 text-gray-600 hover:text-red-500 transition-colors group">
                          <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-3 text-gray-600 hover:text-blue-500 transition-colors group">
                          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-3 text-gray-600 hover:text-green-500 transition-colors group">
                          <Share2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold">{post.shares || 0}</span>
                        </button>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <BookOpen className="w-4 h-4" />
                        Read More
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <GlassCard variant="premium" className="p-6">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-orange-500" />
                  Trending Now
                </h3>
                <div className="space-y-4">
                  {['#TransformationTuesday', '#MealPrepMonday', '#WorkoutWednesday', '#ThrowbackThursday', '#FridayMotivation'].map((tag, index) => (
                    <button key={tag} className="block w-full text-left p-4 rounded-xl bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group">
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">{tag}</span>
                        <Badge variant="secondary" className="text-xs">
                          {Math.floor(Math.random() * 500) + 100}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Top Contributors */}
              <GlassCard variant="premium" className="p-6">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Top Contributors
                </h3>
                <div className="space-y-4">
                  {leaderboard.slice(0, 5).map((user) => (
                    <div key={user.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/20 transition-colors cursor-pointer">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold",
                        user.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                        user.rank === 2 ? "bg-gradient-to-r from-gray-400 to-gray-500" :
                        user.rank === 3 ? "bg-gradient-to-r from-orange-600 to-red-600" :
                        "bg-gradient-to-r from-gray-500 to-gray-600"
                      )}>
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.points} points • {user.level}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        user.change.startsWith('+') ? "text-green-600 border-green-300" :
                        user.change === '0' ? "text-gray-600" : "text-red-600 border-red-300"
                      )}>
                        {user.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Quick Stats */}
              <GlassCard variant="premium" className="p-6">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-500" />
                  Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Current Streak</span>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white gap-1">
                      <Flame className="w-3 h-3" />
                      15 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Posts This Month</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Likes Received</span>
                    <span className="font-bold">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Followers</span>
                    <span className="font-bold">89</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </TabsContent>

        {/* Keep existing challenges, leaderboard, and groups tabs with enhancements */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <GlassCard key={index} variant="premium" className="p-8 hover:scale-105 transition-transform">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-20 h-20 rounded-3xl bg-gradient-to-r flex items-center justify-center text-4xl shadow-xl",
                      challenge.color
                    )}>
                      {challenge.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-2">{challenge.name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">{challenge.difficulty}</Badge>
                        <Badge variant="outline" className="text-xs">{challenge.timeLeft} left</Badge>
                        <Badge variant="secondary" className="text-xs">{challenge.participants.toLocaleString()} joined</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-bold">{challenge.progress}%</span>
                    </div>
                    <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={cn("h-full bg-gradient-to-r transition-all duration-500", challenge.color)}
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Prize:</span>
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">{challenge.prize}</Badge>
                    </div>
                    <Button className="w-full h-12 text-base font-semibold" variant="glass-primary">
                      Join Challenge
                    </Button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <GlassCard variant="premium" className="p-8">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Monthly Leaderboard
            </h3>
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.rank} 
                  className={cn(
                    "flex items-center gap-6 p-6 rounded-2xl transition-all hover:scale-105",
                    user.name === 'You' 
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700" 
                      : "bg-white/30 dark:bg-gray-800/30 hover:bg-white/50 dark:hover:bg-gray-800/50"
                  )}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl",
                    user.rank === 1 ? "bg-gradient-to-r from-yellow-400 to-orange-500" :
                    user.rank === 2 ? "bg-gradient-to-r from-gray-400 to-gray-500" :
                    user.rank === 3 ? "bg-gradient-to-r from-orange-600 to-red-600" :
                    "bg-gradient-to-r from-gray-500 to-gray-600"
                  )}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-xl">{user.name}</h4>
                    <div className="flex gap-6 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Flame className="w-4 h-4" />
                        {user.streak} day streak
                      </span>
                      <span>{user.points} points</span>
                      <span>{user.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className={cn(
                      "text-sm font-bold",
                      user.change.startsWith('+') ? "text-green-600 border-green-300" :
                      user.change === '0' ? "text-gray-600" : "text-red-600 border-red-300"
                    )}>
                      {user.change}
                    </Badge>
                    {user.rank <= 3 && (
                      <div className="text-3xl">
                        {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, index) => (
              <GlassCard key={index} variant="premium" className="p-6 hover:scale-105 transition-transform">
                <div className="space-y-4">
                  <div className="relative">
                    <img 
                      src={group.image} 
                      alt={group.name}
                      className="w-full h-40 object-cover rounded-xl"
                    />
                    <Badge className="absolute top-3 right-3 bg-black/50 text-white">
                      {group.category}
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2">{group.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{group.description}</p>
                    
                    <div className="flex justify-between text-sm text-gray-500 mb-4">
                      <span>{group.members.toLocaleString()} members</span>
                      <span>{group.posts} posts today</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    variant={group.isJoined ? "outline" : "glass-primary"}
                  >
                    {group.isJoined ? 'Joined' : 'Join Group'}
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
