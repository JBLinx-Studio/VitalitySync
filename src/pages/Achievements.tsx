import React from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, Medal, Award, Crown, Check } from 'lucide-react';
import AchievementsList from '@/components/Rewards/AchievementsList';

const Achievements: React.FC = () => {
  const { achievements, addictionRecords, sleepRecords, exerciseItems, foodItems } = useHealth();

  // Calculate user stats
  const totalExerciseDuration = exerciseItems.reduce((total, item) => total + item.duration, 0);
  const totalCaloriesBurned = exerciseItems.reduce((total, item) => total + item.calories_burned, 0);
  const totalMealsLogged = foodItems.length;
  const totalSleepRecords = sleepRecords.length;
  
  const streakStats = {
    exercise: getMaxStreak(exerciseItems.map(item => item.date.split('T')[0])),
    sleep: getMaxStreak(sleepRecords.map(record => record.date.split('T')[0])),
    addiction: addictionRecords.length > 0 ? 
      Math.max(...[...new Set(addictionRecords.map(record => record.type))].map(type => 
        getStreakForAddictionType(type)
      )) : 0
  };
  
  function getMaxStreak(dates: string[]): number {
    if (dates.length === 0) return 0;
    
    // Sort dates
    const sortedDates = [...new Set(dates)].sort();
    
    let currentStreak = 1;
    let maxStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      
      // Check if dates are consecutive
      prevDate.setDate(prevDate.getDate() + 1);
      if (prevDate.toISOString().split('T')[0] === sortedDates[i]) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      
      maxStreak = Math.max(maxStreak, currentStreak);
    }
    
    return maxStreak;
  }
  
  function getStreakForAddictionType(type: string): number {
    // This is simplified - a real implementation would check against goals
    return addictionRecords
      .filter(record => record.type === type)
      .map(record => record.date.split('T')[0])
      .filter((date, index, self) => self.indexOf(date) === index)
      .length;
  }
  
  // Calculate progress level based on total achievements
  const achievementProgress = {
    level: Math.min(10, Math.floor(achievements.length / 3) + 1),
    points: achievements.length * 100,
    nextLevel: Math.min(10, Math.floor(achievements.length / 3) + 2),
    progress: (achievements.length % 3) / 3 * 100,
    maxLevel: 10
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Achievements & Rewards</h1>
      
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white p-6 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-white/20 p-4 rounded-full">
              <Trophy className="h-12 w-12 text-yellow-300" />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold">Health Champion</h2>
              <p className="text-white/80">Level {achievementProgress.level} / {achievementProgress.maxLevel}</p>
              <div className="mt-2 bg-white/20 h-2 w-48 rounded-full">
                <div 
                  className="bg-yellow-300 h-2 rounded-full" 
                  style={{ width: `${achievementProgress.progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">
                {achievementProgress.points} points - {Math.round(achievementProgress.progress)}% to Level {achievementProgress.nextLevel}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold">{achievements.length}</p>
              <p className="text-white/80 text-sm">Achievements</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{Math.max(streakStats.exercise, streakStats.sleep, streakStats.addiction)}</p>
              <p className="text-white/80 text-sm">Best Streak</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{totalMealsLogged + exerciseItems.length + sleepRecords.length}</p>
              <p className="text-white/80 text-sm">Entries</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Medal className="mr-2 h-5 w-5 text-purple-500" />
              Exercise Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Workouts</span>
                <span className="font-bold">{exerciseItems.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Minutes</span>
                <span className="font-bold">{totalExerciseDuration}</span>
              </div>
              <div className="flex justify-between">
                <span>Calories Burned</span>
                <span className="font-bold">{totalCaloriesBurned}</span>
              </div>
              <div className="flex justify-between">
                <span>Best Streak</span>
                <span className="font-bold">{streakStats.exercise} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Crown className="mr-2 h-5 w-5 text-yellow-500" />
              Nutrition Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Meals Logged</span>
                <span className="font-bold">{totalMealsLogged}</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Avg.</span>
                <span className="font-bold">
                  {totalMealsLogged > 0 ? Math.round(totalMealsLogged / (foodItems.length ? [...new Set(foodItems.map(item => item.date.split('T')[0]))].length : 1)) : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Days Tracked</span>
                <span className="font-bold">
                  {foodItems.length ? [...new Set(foodItems.map(item => item.date.split('T')[0]))].length : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Nutritional Balance</span>
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < (totalMealsLogged > 10 ? 4 : Math.floor(totalMealsLogged / 3)) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Check className="mr-2 h-5 w-5 text-green-500" />
              Recovery Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Total Sleep Records</span>
                <span className="font-bold">{totalSleepRecords}</span>
              </div>
              <div className="flex justify-between">
                <span>Best Sleep Streak</span>
                <span className="font-bold">{streakStats.sleep} days</span>
              </div>
              <div className="flex justify-between">
                <span>Addiction Tracking</span>
                <span className="font-bold">
                  {addictionRecords.length > 0 ? [...new Set(addictionRecords.map(record => record.type))].length : 0} types
                </span>
              </div>
              <div className="flex justify-between">
                <span>Best Recovery Streak</span>
                <span className="font-bold">{streakStats.addiction} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AchievementsList />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-5 w-5 text-blue-500" />
            Health Reward System
          </CardTitle>
          <CardDescription>
            Set personal rewards for reaching your health goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 border rounded-lg p-4">
              <h3 className="font-medium mb-2">How the Reward System Works</h3>
              <p className="text-sm text-gray-600">
                1. Track your health consistently to earn achievements<br />
                2. Each achievement earns you points<br />
                3. Set personal rewards for yourself when you reach certain point levels<br />
                4. Stay motivated by working toward your next reward
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Beginner Reward</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">500 points</span>
                </div>
                <p className="text-sm text-gray-600">
                  Suggestion: Enjoy a relaxing spa day or massage as a reward for starting your health journey.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Intermediate Reward</h3>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">1000 points</span>
                </div>
                <p className="text-sm text-gray-600">
                  Suggestion: Purchase a new fitness gadget or workout gear to enhance your health routine.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Advanced Reward</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">2000 points</span>
                </div>
                <p className="text-sm text-gray-600">
                  Suggestion: Plan a weekend getaway to celebrate your dedication to your health journey.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
