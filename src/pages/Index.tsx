
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Moon, Activity, Shield, Ruler, Award, Zap, Utensils, Sparkles, Target, TrendingUp, User } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useViewport } from '@/hooks';
import GlassCard from "@/components/ui/glass-card";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";

const Index = () => {
  const navigate = useNavigate();
  const { userProfile } = useHealth();
  const { isMobile, isTablet } = useViewport();

  return (
    <div className="min-h-screen space-y-16 relative">
      {/* Enhanced Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32">
        <ResponsiveContainer maxWidth="2xl" padding="lg">
          <div className="text-center relative z-10">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-full px-6 py-3 mb-8 border border-white/20 dark:border-slate-700/20 shadow-xl">
              <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Your Complete Wellness Intelligence</span>
            </div>
            
            <h1 className={`font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight ${
              isMobile ? 'text-4xl' : isTablet ? 'text-6xl' : 'text-8xl'
            }`}>
              VitalitySync
            </h1>
            
            <p className={`text-gray-700 dark:text-gray-200 mb-6 font-light ${
              isMobile ? 'text-xl' : 'text-3xl'
            }`}>
              Harmonize your health & wellness journey
            </p>
            
            <p className={`text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed ${
              isMobile ? 'text-base px-4' : 'text-lg'
            }`}>
              Experience the future of health tracking with our comprehensive platform that seamlessly integrates nutrition, fitness, sleep, mental wellness, and body measurements in one beautiful, intuitive interface.
            </p>
            
            <div className={`flex gap-6 justify-center items-center ${
              isMobile ? 'flex-col' : 'flex-row'
            }`}>
              {userProfile ? (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl text-white text-lg px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-110 border-0 font-semibold"
                  size="lg"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl text-white text-lg px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-110 border-0 font-semibold"
                  size="lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="border-2 border-white/30 dark:border-slate-600/30 bg-white/10 dark:bg-slate-800/10 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-slate-800/20 text-lg px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-110 font-semibold"
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
              >
                Learn More
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
        
        {/* Enhanced hero visual elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-30">
          <div className={`grid gap-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-2'}`}>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl animate-float-slow shadow-2xl"></div>
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl animate-float-slower shadow-2xl"></div>
            <div className="w-28 h-28 bg-gradient-to-br from-pink-500 to-blue-500 rounded-3xl animate-float delay-300 shadow-2xl"></div>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-pink-500 rounded-3xl animate-float-slow delay-150 shadow-2xl"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20">
        <ResponsiveContainer maxWidth="2xl" padding="lg">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/20 dark:border-slate-700/20 shadow-xl">
              <Target className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="text-purple-600 dark:text-purple-400 font-semibold">Complete Wellness Tracking</span>
            </div>
            <h2 className={`font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent ${
              isMobile ? 'text-3xl' : 'text-5xl'
            }`}>
              Everything you need to optimize your health
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed ${
              isMobile ? 'text-lg px-4' : 'text-xl'
            }`}>
              VitalitySync brings together all aspects of your health journey in one place, providing deep insights and personalized analytics to help you reach your wellness goals.
            </p>
          </div>
          
          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {[
              {
                icon: <Heart className="h-12 w-12 text-red-500" />,
                title: "Smart Nutrition",
                description: "AI-powered meal tracking with macro analysis, personalized recommendations, and smart goal adjustments based on your progress.",
                gradient: "from-red-500/10 to-pink-500/10",
                color: "red"
              },
              {
                icon: <Activity className="h-12 w-12 text-blue-500" />,
                title: "Fitness Intelligence",
                description: "Advanced workout analytics, form tracking, and adaptive training plans that evolve with your fitness level.",
                gradient: "from-blue-500/10 to-cyan-500/10",
                color: "blue"
              },
              {
                icon: <Brain className="h-12 w-12 text-purple-500" />,
                title: "Mental Wellness",
                description: "Mood pattern recognition, stress level monitoring, and personalized mindfulness recommendations.",
                gradient: "from-purple-500/10 to-indigo-500/10",
                color: "purple"
              },
              {
                icon: <Moon className="h-12 w-12 text-indigo-500" />,
                title: "Sleep Optimization",
                description: "Deep sleep analysis with quality metrics, sleep debt tracking, and circadian rhythm optimization.",
                gradient: "from-indigo-500/10 to-blue-500/10",
                color: "indigo"
              },
              {
                icon: <Ruler className="h-12 w-12 text-amber-500" />,
                title: "Body Analytics",
                description: "Comprehensive body composition tracking with visual progress maps and measurement trend analysis.",
                gradient: "from-amber-500/10 to-orange-500/10",
                color: "amber"
              },
              {
                icon: <Shield className="h-12 w-12 text-green-500" />,
                title: "Health Insights",
                description: "Holistic health dashboard with predictive analytics and actionable insights for optimal wellness.",
                gradient: "from-green-500/10 to-emerald-500/10",
                color: "green"
              }
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Enhanced How It Works Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl mx-4 backdrop-blur-3xl"></div>
        <ResponsiveContainer maxWidth="2xl" padding="lg" className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-full px-6 py-3 mb-6 border border-white/20 dark:border-slate-700/20 shadow-xl">
              <TrendingUp className="w-5 h-5 text-green-500 animate-pulse" />
              <span className="text-green-600 dark:text-green-400 font-semibold">Seamless Experience</span>
            </div>
            <h2 className={`font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent ${
              isMobile ? 'text-3xl' : 'text-5xl'
            }`}>
              How VitalitySync Works
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 max-w-4xl mx-auto ${
              isMobile ? 'text-lg px-4' : 'text-xl'
            }`}>
              Our intuitive platform makes health tracking effortless and actionable
            </p>
          </div>
          
          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-3'
          }`}>
            {[
              {
                number: "01",
                title: "Smart Profile Setup",
                description: "Create your personalized health profile with AI-guided goal setting and preference optimization.",
                icon: <User className="w-8 h-8 text-blue-500" />
              },
              {
                number: "02",
                title: "Effortless Tracking",
                description: "Log activities seamlessly with smart automation, voice input, and intelligent pattern recognition.",
                icon: <Activity className="w-8 h-8 text-purple-500" />
              },
              {
                number: "03",
                title: "Actionable Insights",
                description: "Receive personalized recommendations and visualize your progress with beautiful, meaningful analytics.",
                icon: <TrendingUp className="w-8 h-8 text-pink-500" />
              }
            ].map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl mx-4 shadow-2xl"></div>
        <ResponsiveContainer maxWidth="2xl" padding="lg" className="text-center relative z-10">
          <div className="text-white">
            <h2 className={`font-bold mb-6 ${
              isMobile ? 'text-3xl' : 'text-5xl'
            }`}>
              Transform Your Health Today
            </h2>
            <p className={`mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed ${
              isMobile ? 'text-lg px-4' : 'text-xl'
            }`}>
              Join thousands of users who have revolutionized their wellness journey with VitalitySync's intelligent health ecosystem.
            </p>
            <Button 
              onClick={() => userProfile ? navigate('/dashboard') : navigate('/profile')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-110 shadow-2xl font-semibold"
              size="lg"
            >
              {userProfile ? 'View Your Dashboard' : 'Start Your Journey'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, color }) => {
  return (
    <GlassCard 
      variant="cosmic" 
      className="group hover:shadow-2xl transition-all duration-500 hover:scale-105"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
      <div className="relative z-10">
        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>
    </GlassCard>
  );
};

const StepCard = ({ number, title, description, icon }) => {
  return (
    <GlassCard 
      variant="premium" 
      className="group text-center hover:shadow-2xl transition-all duration-500 hover:scale-105"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-xl">
        <span className="text-white font-bold text-2xl">{number}</span>
      </div>
      <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </GlassCard>
  );
};

export default Index;
