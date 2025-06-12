import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Trophy, 
  Target, 
  TrendingUp, 
  Plus, 
  Search,
  Filter,
  Utensils,
  Activity,
  Image,
  MapPin,
  Flame,
  BookOpen,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useHealth } from '@/contexts/HealthContext';
import { cn } from '@/lib/utils';

interface Author {
  id: string;
  name: string;
  avatar: string;
}

interface Post {
  id: string;
  author: Author;
  type: string;
  timestamp: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  points: number;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      id: '101',
      name: 'Alice Johnson',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    type: 'Workout',
    timestamp: '2 hours ago',
    content: 'Just finished an intense HIIT session! Feeling energized and ready to tackle the day 💪 #fitness #healthylifestyle',
    image: 'https://images.unsplash.com/photo-1517836357463-dcaaa9c3c0d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    likes: 45,
    comments: 12
  },
  {
    id: '2',
    author: {
      id: '102',
      name: 'Bob Williams',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    type: 'Recipe',
    timestamp: '5 hours ago',
    content: 'Sharing my new favorite post-workout smoothie recipe! Packed with protein and nutrients to help you recover faster 😋 #healthyfood #smoothie #recipe',
    image: 'https://images.unsplash.com/photo-1540189849995-395e6ba2e588?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    likes: 62,
    comments: 27
  },
  {
    id: '3',
    author: {
      id: '103',
      name: 'Charlie Davis',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    type: 'Challenge',
    timestamp: '1 day ago',
    content: 'Who\'s up for a 30-day plank challenge? Let\'s motivate each other to reach our fitness goals! #challenge #fitnesschallenge #plankchallenge',
    likes: 89,
    comments: 41
  },
  {
    id: '4',
    author: {
      id: '104',
      name: 'Diana Brown',
      avatar: 'https://i.pravatar.cc/150?img=4'
    },
    type: 'Achievement',
    timestamp: '2 days ago',
    content: 'Just hit a new personal best in my deadlift! Hard work and dedication pay off! 🎉 #achievement #fitnessmotivation #deadlift',
    likes: 124,
    comments: 53
  },
];

const mockChallenges: Challenge[] = [
  {
    id: '201',
    title: '7-Day Hydration Challenge',
    description: 'Drink 3 liters of water every day for a week!',
    participants: 78
  },
  {
    id: '202',
    title: '10,000 Steps a Day Challenge',
    description: 'Walk 10,000 steps every day for the next 30 days.',
    participants: 123
  },
  {
    id: '203',
    title: 'No Sugar Challenge',
    description: 'Eliminate added sugar from your diet for 21 days.',
    participants: 56
  },
];

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: '301',
    name: 'Eva Green',
    avatar: 'https://i.pravatar.cc/150?img=5',
    points: 1250
  },
  {
    id: '302',
    name: 'Frank White',
    avatar: 'https://i.pravatar.cc/150?img=6',
    points: 1180
  },
  {
    id: '303',
    name: 'Grace Taylor',
    avatar: 'https://i.pravatar.cc/150?img=7',
    points: 1120
  },
  {
    id: '304',
    name: 'Harry Moore',
    avatar: 'https://i.pravatar.cc/150?img=8',
    points: 1050
  },
];

const Community: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Community Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Connect, share, and achieve your health goals together
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search posts, challenges..."
                  className="pl-10 w-full sm:w-80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Feed Filter */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-3">
                  {['All', 'Following', 'Challenges', 'Achievements', 'Recipes', 'Workouts'].map((filter) => (
                    <Button
                      key={filter}
                      variant={activeFilter === filter ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "transition-all duration-300",
                        activeFilter === filter 
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                          : "hover:bg-gray-100 dark:hover:bg-slate-700"
                      )}
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-blue-200 dark:ring-blue-800">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {post.type}
                          </Badge>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</span>
                        </div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>
                        
                        {post.image && (
                          <div className="mb-4 rounded-xl overflow-hidden">
                            <img src={post.image} alt="Post content" className="w-full h-64 object-cover" />
                          </div>
                        )}
                        
                        <div className="flex items-center gap-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                            <Heart className="h-4 w-4 mr-2" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Challenges */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200/50 dark:border-yellow-700/50">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{challenge.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{challenge.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">
                        {challenge.participants} participants
                      </span>
                      <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-gray-100">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Weekly Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockLeaderboard.map((user, index) => (
                  <div key={user.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm",
                      index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-400" : "bg-blue-500"
                    )}>
                      {index + 1}
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.points} points</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
