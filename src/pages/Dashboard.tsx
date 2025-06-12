
import React from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Zap, Target } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userProfile } = useHealth();
  const { theme, colorTheme } = useTheme();

  console.log('Dashboard rendering with theme:', theme, 'colorTheme:', colorTheme);
  console.log('User profile:', userProfile);

  return (
    <div className={cn(
      "min-h-screen relative overflow-hidden p-6",
      "bg-gradient-to-br from-background via-muted/30 to-background"
    )}>
      <ResponsiveContainer maxWidth="2xl" padding="lg">
        <div className="space-y-8">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Welcome to VitalitySync
            </h1>
            <p className="text-lg text-muted-foreground">
              Your comprehensive health and wellness dashboard
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Steps</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">8,547</div>
                <p className="text-xs text-muted-foreground">+12% from yesterday</p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                <Heart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-500">72 BPM</div>
                <p className="text-xs text-muted-foreground">Resting rate</p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calories</CardTitle>
                <Zap className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">1,847</div>
                <p className="text-xs text-muted-foreground">Burned today</p>
              </CardContent>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals</CardTitle>
                <Target className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">3/5</div>
                <p className="text-xs text-muted-foreground">Completed today</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-card h-96">
                <CardHeader>
                  <CardTitle>Activity Overview</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <Activity className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-lg font-medium">Your dashboard is loading...</p>
                    <p className="text-sm text-muted-foreground">
                      Track your fitness, nutrition, and wellness goals all in one place
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Log Workout
                  </button>
                  <button className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors">
                    Add Meal
                  </button>
                  <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors">
                    Track Sleep
                  </button>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Today's Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Steps</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Water</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
