
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { Activity, Heart, Brain, Utensils, Moon, Trophy } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  console.log('Index page rendering');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <ResponsiveContainer maxWidth="2xl" padding="lg">
        <div className="space-y-12 py-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              VitalitySync
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Your comprehensive health and wellness platform powered by AI-driven insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="btn-primary min-w-40"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/premium')}
                className="min-w-40"
              >
                Explore Premium
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/exercise')}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Fitness Tracking</CardTitle>
                <CardDescription>
                  Track workouts, monitor progress, and achieve your fitness goals with personalized insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/food')}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Nutrition Management</CardTitle>
                <CardDescription>
                  Log meals, track calories, and discover balanced nutrition plans tailored to your needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/sleep')}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Sleep Optimization</CardTitle>
                <CardDescription>
                  Monitor sleep patterns and receive recommendations for better rest and recovery.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/mental')}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mental Wellness</CardTitle>
                <CardDescription>
                  Practice mindfulness, track mood, and build healthy mental habits with guided support.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/body')}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Health Monitoring</CardTitle>
                <CardDescription>
                  Track vital signs, body measurements, and health metrics for comprehensive wellness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate('/achievements')}>
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Goals & Achievements</CardTitle>
                <CardDescription>
                  Set targets, celebrate milestones, and stay motivated with gamified progress tracking.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center space-y-6 py-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Health?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of users who have already improved their wellness journey with VitalitySync.
              </p>
              <Button 
                size="lg" 
                onClick={() => navigate('/dashboard')}
                className="btn-primary px-8 py-4 text-lg"
              >
                Start Your Journey Today
              </Button>
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default Index;
