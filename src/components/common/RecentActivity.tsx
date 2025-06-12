
import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, Plus, Flame, Activity, Moon } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';

interface RecentActivityProps {
  onGetStarted: () => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ onGetStarted }) => {
  const { foodItems, exerciseItems, sleepRecords } = useHealth();

  const recentItems = useMemo(() => {
    return [...foodItems, ...exerciseItems, ...sleepRecords]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6)
      .map((item, index) => ({
        ...item,
        key: `${item.id}-${index}`,
        type: (item as any).name ? 'food' : 
              (item as any).duration && (item as any).calories_burned ? 'exercise' : 'sleep',
        displayName: (item as any).name || (item as any).exercise_type || 'Sleep tracked',
        displayValue: (item as any).calories ? `${(item as any).calories} cal` :
                     (item as any).calories_burned ? `${(item as any).calories_burned} cal burned` :
                     (item as any).duration ? `${(item as any).duration} min` : 'Logged',
        badge: (item as any).meal_type || (item as any).type || 'sleep'
      }));
  }, [foodItems, exerciseItems, sleepRecords]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'food': return <Flame className="w-4 h-4" />;
      case 'exercise': return <Activity className="w-4 h-4" />;
      case 'sleep': return <Moon className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Recent Activity
          <Badge variant="outline" className="ml-auto">
            Latest
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentItems.length > 0 ? (
            recentItems.map((item) => (
              <div key={item.key} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600/50 transition-colors">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg text-white">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.displayName}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()} • {item.displayValue}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.badge}
                </Badge>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No recent activity. Start tracking your health journey!
              </p>
              <Button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(RecentActivity);
