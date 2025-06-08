
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Moon, Activity, Shield, Ruler, Award, Zap, Utensils } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent, CosmicCard, PrismaticCard, UltraCard, FloatingCard, IridescentCard } from "@/components/ui/card";
import { useTheme } from '@/contexts/ThemeContext';
import VisualEffects from '@/components/ui/VisualEffects';

const Index = () => {
  const navigate = useNavigate();
  const { userProfile } = useHealth();
  const { glassEffect } = useTheme();

  // Get appropriate card component based on glass effect setting
  const getCardComponent = () => {
    switch (glassEffect) {
      case 'ultra':
        return UltraCard;
      case 'iridescent':
        return IridescentCard;
      case 'standard':
        return Card;
      default:
        return CosmicCard;
    }
  };

  const FeatureCardComponent = getCardComponent();

  return (
    <div className="min-h-screen space-y-12 relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-health-primary/20 to-health-secondary/10 py-16 md:py-24 rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <VisualEffects type="cosmic" density="medium" interactive={true} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-health-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-health-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-36 h-36 bg-health-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-health-secondary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
              <span className="inline-block px-4 py-1 rounded-full bg-health-primary/10 text-health-primary font-medium text-sm mb-4">Your Complete Wellness Companion</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-health-primary to-health-secondary bg-clip-text text-transparent">
                VitalitySync
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8">
                Harmonize your health & wellness journey
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Comprehensive tracking for nutrition, fitness, sleep, mental wellness, and body measurements in one intuitive interface.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {userProfile ? (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-health-primary hover:bg-health-primary/90 text-white flex items-center gap-2 shadow-glow"
                    size="lg"
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/profile')}
                    className="bg-health-primary hover:bg-health-primary/90 text-white flex items-center gap-2 hover-glow-intense shadow-glow"
                    size="lg"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="border-health-primary text-health-primary hover:bg-health-primary/10"
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-80 md:h-[400px] rounded-2xl bg-gradient-to-r from-health-primary/20 to-health-secondary/20 flex items-center justify-center shadow-xl cosmic-glass overflow-hidden">
                  <div className="grid grid-cols-2 gap-4 p-6 relative z-10">
                    <FloatingCard className="animate-float-slow bg-white/90 dark:bg-cosmic-deep/80 backdrop-blur rounded-xl shadow-lg p-4 flex flex-col items-center">
                      <Activity className="h-8 w-8 text-health-primary mb-2" strokeWidth={1.5} />
                      <span className="text-sm font-medium dark:text-white">Exercise</span>
                    </FloatingCard>
                    <FloatingCard className="animate-float-slower bg-white/90 dark:bg-cosmic-deep/80 backdrop-blur rounded-xl shadow-lg p-4 flex flex-col items-center delay-300">
                      <Utensils className="h-8 w-8 text-amber-500 mb-2" strokeWidth={1.5} />
                      <span className="text-sm font-medium dark:text-white">Nutrition</span>
                    </FloatingCard>
                    <FloatingCard className="animate-float-slow bg-white/90 dark:bg-cosmic-deep/80 backdrop-blur rounded-xl shadow-lg p-4 flex flex-col items-center delay-150">
                      <Moon className="h-8 w-8 text-indigo-600 mb-2" strokeWidth={1.5} />
                      <span className="text-sm font-medium dark:text-white">Sleep</span>
                    </FloatingCard>
                    <FloatingCard className="animate-float-slower bg-white/90 dark:bg-cosmic-deep/80 backdrop-blur rounded-xl shadow-lg p-4 flex flex-col items-center delay-200">
                      <Brain className="h-8 w-8 text-health-secondary mb-2" strokeWidth={1.5} />
                      <span className="text-sm font-medium dark:text-white">Mental</span>
                    </FloatingCard>
                  </div>
                  <div className="absolute inset-0 cosmic-stars opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-health-primary/10 text-health-primary font-medium text-sm mb-4">Complete Wellness Tracking</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Everything you need to optimize your health</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">VitalitySync brings together all aspects of your health journey in one place, providing insights and analytics to help you reach your goals.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Heart className="h-10 w-10 text-red-500" />}
              title="Nutrition Tracking"
              description="Monitor calories, macros, water intake, and get personalized meal recommendations based on your goals."
              color="bg-red-50 dark:bg-red-900/20"
            />
            <FeatureCard
              icon={<Activity className="h-10 w-10 text-health-primary" />}
              title="Fitness Analytics"
              description="Track workouts, measure progress, and visualize improvements over time with detailed exercise analytics."
              color="bg-teal-50 dark:bg-teal-900/20"
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-health-secondary" />}
              title="Mental Wellness"
              description="Monitor mood patterns, stress levels, and get personalized mindfulness recommendations."
              color="bg-purple-50 dark:bg-purple-900/20"
            />
            <FeatureCard
              icon={<Moon className="h-10 w-10 text-indigo-500" />}
              title="Sleep Analysis"
              description="Optimize your rest with detailed sleep tracking, quality metrics, and personalized insights."
              color="bg-indigo-50 dark:bg-indigo-900/20"
            />
            <FeatureCard
              icon={<Ruler className="h-10 w-10 text-amber-500" />}
              title="Body Metrics"
              description="Track body measurements, composition changes, and visualize your physical transformation."
              color="bg-amber-50 dark:bg-amber-900/20"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Health Overview"
              description="Get a holistic view of your health with comprehensive dashboards and actionable insights."
              color="bg-green-50 dark:bg-green-900/20"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-cosmic-deep dark:to-cosmic-space rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <VisualEffects type="fireflies" density="low" speed="slow" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-health-secondary/10 text-health-secondary font-medium text-sm mb-4">Seamless Experience</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">How VitalitySync Works</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Our intuitive platform makes health tracking simple and effective</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Create Your Profile"
              description="Set up your health profile with your goals, current metrics, and preferences."
            />
            <StepCard
              number="02"
              title="Track Daily Activities"
              description="Log your meals, workouts, sleep, and mental state easily throughout your day."
            />
            <StepCard
              number="03"
              title="Get Personalized Insights"
              description="Receive tailored recommendations and visualize your progress over time."
            />
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <PrismaticCard className="p-8 md:p-12 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <Award className="h-12 w-12 text-health-primary" />
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Science-Backed Approach</h3>
                  <p className="text-gray-700 dark:text-gray-200">
                    VitalitySync combines proven health metrics and scientific research to provide you with the most accurate and effective health optimization strategies.
                  </p>
                  <ul className="space-y-3">
                    {["Evidence-based recommendations", "Personalized to your unique biology", "Regular updates based on latest research"].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-5 w-5 rounded-full bg-health-primary/20 flex items-center justify-center mr-3">
                          <Zap className="h-3 w-3 text-health-primary" />
                        </div>
                        <span className="text-sm dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </PrismaticCard>
            </div>
            
            <div className="md:w-1/2 space-y-8">
              <div>
                <span className="inline-block px-4 py-1 rounded-full bg-health-primary/10 text-health-primary font-medium text-sm mb-4">Why Choose VitalitySync</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">Optimize Every Aspect of Your Health</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Our comprehensive approach helps you understand the connections between different aspects of your health, enabling truly holistic wellness.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <BenefitCard
                  icon={<Zap className="h-5 w-5 text-health-primary" />}
                  title="Holistic View"
                  description="See how sleep affects your workouts, how nutrition impacts your mood, and more."
                />
                <BenefitCard
                  icon={<Zap className="h-5 w-5 text-health-primary" />}
                  title="Data Insights"
                  description="Advanced analytics reveal patterns you might miss, helping optimize your routine."
                />
                <BenefitCard
                  icon={<Zap className="h-5 w-5 text-health-primary" />}
                  title="Goal Setting"
                  description="Set realistic, achievable goals based on your personal health data."
                />
                <BenefitCard
                  icon={<Zap className="h-5 w-5 text-health-primary" />}
                  title="Progress Tracking"
                  description="Visualize your improvements over time with intuitive charts and graphs."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-cosmic-nebula to-cosmic-highlight dark:from-health-primary dark:to-health-secondary rounded-3xl text-white relative overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <VisualEffects type="particles" density="medium" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have transformed their health with VitalitySync's comprehensive wellness tracking.
            </p>
            <Button 
              onClick={() => userProfile ? navigate('/dashboard') : navigate('/profile')}
              className="bg-white text-health-primary hover:bg-white/90 hover-glow-intense"
              size="lg"
            >
              {userProfile ? 'View Your Dashboard' : 'Create Your Profile'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color }) => {
  return (
    <CosmicCard className="overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-md card-3d-effect">
      <CardContent className="p-6">
        <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </CardContent>
    </CosmicCard>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <UltraCard className="p-6 hover:shadow-cosmic-glow transition-shadow">
      <div className="w-12 h-12 rounded-full bg-health-primary/10 flex items-center justify-center mb-4">
        <span className="text-health-primary font-bold dark:text-cosmic-star">{number}</span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </UltraCard>
  );
};

const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start">
      <div className="w-10 h-10 rounded-full bg-health-primary/10 flex items-center justify-center mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-medium mb-1 text-gray-800 dark:text-white">{title}</h4>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Index;
