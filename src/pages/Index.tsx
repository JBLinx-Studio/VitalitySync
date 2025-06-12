
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Moon, Activity, Shield } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';

const Index = () => {
  const navigate = useNavigate();
  const { userProfile } = useHealth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-health-primary/20 to-health-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
                VitalitySync
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Your all-in-one wellness companion for balanced living
              </p>
              <p className="text-gray-600 mb-6">
                Track nutrition, exercise, sleep, mental wellness, and more with our comprehensive health dashboard.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {userProfile ? (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-health-primary hover:bg-health-primary/90 text-white flex items-center gap-2"
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/profile')}
                    className="bg-health-primary hover:bg-health-primary/90 text-white flex items-center gap-2"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="border-health-primary text-health-primary hover:bg-health-primary/10"
                  onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-80 md:h-96 rounded-xl bg-gradient-to-r from-health-primary/20 to-health-secondary/20 flex items-center justify-center shadow-lg">
                  <div className="absolute -top-4 -left-4 w-20 h-20 bg-health-primary/20 rounded-full backdrop-blur-md"></div>
                  <div className="absolute top-10 right-10 w-12 h-12 bg-health-secondary/20 rounded-full backdrop-blur-md"></div>
                  <div className="absolute bottom-10 left-10 w-16 h-16 bg-health-primary/10 rounded-full backdrop-blur-md"></div>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-health-secondary/10 rounded-full backdrop-blur-md"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <Activity className="h-20 w-20 text-health-primary mb-4" strokeWidth={1.5} />
                    <span className="text-lg font-medium text-gray-700">Holistic Health Tracking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Complete Wellness Tracking</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-health-primary" />}
              title="Nutrition & Fitness"
              description="Track meals, macronutrients, water intake, and exercise routines all in one place."
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-health-secondary" />}
              title="Mental Wellness"
              description="Monitor mood patterns, stress levels, and mindfulness activities."
            />
            <FeatureCard
              icon={<Moon className="h-10 w-10 text-indigo-500" />}
              title="Sleep Analysis"
              description="Track sleep duration and quality with detailed insights for better rest."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Health Metrics"
              description="Record vital signs, symptoms, and medications for comprehensive health monitoring."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-health-primary/10 to-health-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their health with VitalitySync's comprehensive wellness tracking.
          </p>
          <Button 
            onClick={() => userProfile ? navigate('/dashboard') : navigate('/profile')}
            className="bg-health-primary hover:bg-health-primary/90 text-white"
            size="lg"
          >
            {userProfile ? 'View Your Dashboard' : 'Create Your Profile'}
          </Button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Index;
