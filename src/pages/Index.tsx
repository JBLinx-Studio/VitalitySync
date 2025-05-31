
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Moon, Activity, Shield, Ruler, Award, Zap, Utensils, Sparkles, Target, TrendingUp, User } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const navigate = useNavigate();
  const { userProfile } = useHealth();

  return (
    <div className="min-h-screen space-y-16 relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-blue-200/50 dark:border-blue-700/50">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">Your Complete Wellness Companion</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              VitalitySync
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-200 mb-6 font-light">
              Harmonize your health & wellness journey
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of health tracking with our comprehensive platform that seamlessly integrates nutrition, fitness, sleep, mental wellness, and body measurements in one beautiful, intuitive interface.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {userProfile ? (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl text-white text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 border-0"
                  size="lg"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl text-white text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 border-0"
                  size="lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Hero visual elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="grid grid-cols-2 gap-8 opacity-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl animate-float-slow"></div>
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl animate-float-slower"></div>
            <div className="w-28 h-28 bg-gradient-to-br from-pink-500 to-blue-500 rounded-3xl animate-float delay-300"></div>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-pink-500 rounded-3xl animate-float-slow delay-150"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-purple-200/50 dark:border-purple-700/50">
              <Target className="w-5 h-5 text-purple-500" />
              <span className="text-purple-600 dark:text-purple-400 font-medium">Complete Wellness Tracking</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Everything you need to optimize your health
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              VitalitySync brings together all aspects of your health journey in one place, providing deep insights and personalized analytics to help you reach your wellness goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Heart className="h-12 w-12 text-red-500" />}
              title="Smart Nutrition"
              description="AI-powered meal tracking with macro analysis, personalized recommendations, and smart goal adjustments based on your progress."
              gradient="from-red-500/10 to-pink-500/10"
              accentColor="red"
            />
            <FeatureCard
              icon={<Activity className="h-12 w-12 text-blue-500" />}
              title="Fitness Intelligence"
              description="Advanced workout analytics, form tracking, and adaptive training plans that evolve with your fitness level."
              gradient="from-blue-500/10 to-cyan-500/10"
              accentColor="blue"
            />
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-purple-500" />}
              title="Mental Wellness"
              description="Mood pattern recognition, stress level monitoring, and personalized mindfulness recommendations."
              gradient="from-purple-500/10 to-indigo-500/10"
              accentColor="purple"
            />
            <FeatureCard
              icon={<Moon className="h-12 w-12 text-indigo-500" />}
              title="Sleep Optimization"
              description="Deep sleep analysis with quality metrics, sleep debt tracking, and circadian rhythm optimization."
              gradient="from-indigo-500/10 to-blue-500/10"
              accentColor="indigo"
            />
            <FeatureCard
              icon={<Ruler className="h-12 w-12 text-amber-500" />}
              title="Body Analytics"
              description="Comprehensive body composition tracking with visual progress maps and measurement trend analysis."
              gradient="from-amber-500/10 to-orange-500/10"
              accentColor="amber"
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-green-500" />}
              title="Health Insights"
              description="Holistic health dashboard with predictive analytics and actionable insights for optimal wellness."
              gradient="from-green-500/10 to-emerald-500/10"
              accentColor="green"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-blue-100/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-3xl mx-4"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-green-200/50 dark:border-green-700/50">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-green-600 dark:text-green-400 font-medium">Seamless Experience</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              How VitalitySync Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our intuitive platform makes health tracking effortless and actionable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Smart Profile Setup"
              description="Create your personalized health profile with AI-guided goal setting and preference optimization."
              icon={<User className="w-8 h-8 text-blue-500" />}
            />
            <StepCard
              number="02"
              title="Effortless Tracking"
              description="Log activities seamlessly with smart automation, voice input, and intelligent pattern recognition."
              icon={<Activity className="w-8 h-8 text-purple-500" />}
            />
            <StepCard
              number="03"
              title="Actionable Insights"
              description="Receive personalized recommendations and visualize your progress with beautiful, meaningful analytics."
              icon={<TrendingUp className="w-8 h-8 text-pink-500" />}
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl mx-4"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Health Today</h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Join thousands of users who have revolutionized their wellness journey with VitalitySync's intelligent health ecosystem.
            </p>
            <Button 
              onClick={() => userProfile ? navigate('/dashboard') : navigate('/profile')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl"
              size="lg"
            >
              {userProfile ? 'View Your Dashboard' : 'Start Your Journey'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, accentColor }) => {
  return (
    <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
      <CardContent className="p-8 relative">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
        <div className="relative z-10">
          <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const StepCard = ({ number, title, description, icon }) => {
  return (
    <Card className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-2xl p-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
          <span className="text-white font-bold text-2xl">{number}</span>
        </div>
        <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
};

export default Index;
