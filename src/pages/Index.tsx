import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Moon, Activity, Shield, Ruler, Award, Zap, Utensils, Sparkles, Target, TrendingUp, User, Play, ChevronRight, Pulse } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useViewport } from '@/hooks';
import GlassCard from "@/components/ui/glass-card";
import ResponsiveContainer from "@/components/layout/ResponsiveContainer";

const Index = () => {
  const navigate = useNavigate();
  const { userProfile, getHealthSummary } = useHealth();
  const { isMobile, isTablet } = useViewport();
  const healthSummary = getHealthSummary();

  const quickActions = [
    {
      title: "Track Food",
      description: "Log your meals instantly",
      icon: <Utensils className="w-6 h-6" />,
      path: "/food-tracker",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Log Exercise",
      description: "Record your workouts",
      icon: <Activity className="w-6 h-6" />,
      path: "/exercise-tracker",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Sleep Tracker",
      description: "Monitor your rest",
      icon: <Moon className="w-6 h-6" />,
      path: "/sleep-tracker",
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Mental Wellness",
      description: "Check your mood",
      icon: <Brain className="w-6 h-6" />,
      path: "/mental-wellness",
      color: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen space-y-8 md:space-y-16 relative overflow-hidden">
      {/* Enhanced Hero Section */}
      <section className="relative py-8 md:py-16 lg:py-24">
        <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
          <div className="text-center relative z-10">
            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8 border border-white/20 dark:border-slate-700/20 shadow-xl">
              <Pulse className="w-4 h-4 md:w-5 md:h-5 text-blue-500 animate-pulse" />
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base">Complete Wellness Intelligence</span>
            </div>
            
            <h1 className={`font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight ${
              isMobile ? 'text-3xl' : isTablet ? 'text-5xl' : 'text-7xl'
            }`}>
              VitalitySync
            </h1>
            
            <p className={`text-gray-700 dark:text-gray-200 mb-4 md:mb-6 font-light ${
              isMobile ? 'text-lg' : 'text-2xl'
            }`}>
              Harmonize your health & wellness journey
            </p>
            
            <p className={`text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed ${
              isMobile ? 'text-sm px-2' : 'text-lg'
            }`}>
              Experience the future of health tracking with our comprehensive platform that seamlessly integrates nutrition, fitness, sleep, mental wellness, and body measurements.
            </p>
            
            <div className={`flex gap-4 md:gap-6 justify-center items-center ${
              isMobile ? 'flex-col w-full px-4' : 'flex-row'
            }`}>
              {userProfile ? (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl text-white rounded-2xl transition-all duration-500 hover:scale-105 border-0 font-semibold ${
                    isMobile ? 'w-full py-4 text-base' : 'text-lg px-8 py-4'
                  }`}
                  size="lg"
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  onClick={() => navigate('/profile')}
                  className={`bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-2xl text-white rounded-2xl transition-all duration-500 hover:scale-105 border-0 font-semibold ${
                    isMobile ? 'w-full py-4 text-base' : 'text-lg px-8 py-4'
                  }`}
                  size="lg"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className={`border-2 border-white/30 dark:border-slate-600/30 bg-white/10 dark:bg-slate-800/10 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-slate-800/20 rounded-2xl transition-all duration-500 hover:scale-105 font-semibold ${
                  isMobile ? 'w-full py-4 text-base' : 'text-lg px-8 py-4'
                }`}
                size="lg"
                onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
              >
                Learn More
              </Button>
            </div>
          </div>
        </ResponsiveContainer>
        
        {/* Enhanced hero visual elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20 md:opacity-30">
          <div className={`grid gap-4 md:gap-8 ${isMobile ? 'grid-cols-2' : 'grid-cols-2'}`}>
            <div className={`bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl animate-float-slow shadow-2xl ${isMobile ? 'w-16 h-16' : 'w-24 h-24'}`}></div>
            <div className={`bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl animate-float-slower shadow-2xl ${isMobile ? 'w-20 h-20' : 'w-32 h-32'}`}></div>
            <div className={`bg-gradient-to-br from-pink-500 to-blue-500 rounded-3xl animate-float delay-300 shadow-2xl ${isMobile ? 'w-18 h-18' : 'w-28 h-28'}`}></div>
            <div className={`bg-gradient-to-br from-blue-500 to-pink-500 rounded-3xl animate-float-slow delay-150 shadow-2xl ${isMobile ? 'w-14 h-14' : 'w-20 h-20'}`}></div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      {userProfile && (
        <section className="py-8 md:py-12">
          <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
            <div className="text-center mb-8">
              <h2 className={`font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent ${
                isMobile ? 'text-2xl' : 'text-3xl'
              }`}>
                Quick Actions
              </h2>
              <p className="text-gray-600 dark:text-gray-300">Jump right into tracking your health</p>
            </div>
            
            <div className={`grid gap-4 md:gap-6 ${
              isMobile ? 'grid-cols-2' : isTablet ? 'grid-cols-2' : 'grid-cols-4'
            }`}>
              {quickActions.map((action, index) => (
                <GlassCard 
                  key={index}
                  variant="premium" 
                  className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => navigate(action.path)}
                >
                  <div className="p-4 md:p-6 text-center">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                      <span className="text-white">
                        {action.icon}
                      </span>
                    </div>
                    <h3 className={`font-bold mb-2 text-gray-900 dark:text-white ${isMobile ? 'text-sm' : 'text-lg'}`}>{action.title}</h3>
                    <p className={`text-gray-600 dark:text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>{action.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </ResponsiveContainer>
        </section>
      )}

      {/* Health Summary for logged in users */}
      {userProfile && healthSummary && (
        <section className="py-8 md:py-12">
          <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
            <div className="text-center mb-8">
              <h2 className={`font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent ${
                isMobile ? 'text-2xl' : 'text-3xl'
              }`}>
                Your Health at a Glance
              </h2>
            </div>
            
            <div className={`grid gap-4 md:gap-6 ${
              isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-4'
            }`}>
              <GlassCard variant="premium">
                <div className="p-4 md:p-6 text-center">
                  <Activity className="w-8 h-8 md:w-10 md:h-10 text-orange-500 mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-orange-500">{healthSummary.totalWorkouts}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Workouts</p>
                </div>
              </GlassCard>
              
              <GlassCard variant="premium">
                <div className="p-4 md:p-6 text-center">
                  <Utensils className="w-8 h-8 md:w-10 md:h-10 text-green-500 mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-green-500">{healthSummary.todayCalories}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Calories Today</p>
                </div>
              </GlassCard>
              
              <GlassCard variant="premium">
                <div className="p-4 md:p-6 text-center">
                  <Moon className="w-8 h-8 md:w-10 md:h-10 text-purple-500 mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-purple-500">{healthSummary.avgSleepHours}h</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Sleep</p>
                </div>
              </GlassCard>
              
              <GlassCard variant="premium">
                <div className="p-4 md:p-6 text-center">
                  <Brain className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mx-auto mb-3" />
                  <p className="text-2xl md:text-3xl font-bold text-pink-500">{healthSummary.moodScore}/10</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mood Score</p>
                </div>
              </GlassCard>
            </div>
          </ResponsiveContainer>
        </section>
      )}

      {/* Enhanced Features Section */}
      <section id="features" className="py-12 md:py-20">
        <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 md:space-x-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 backdrop-blur-xl rounded-full px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6 border border-white/20 dark:border-slate-700/20 shadow-xl">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-500 animate-pulse" />
              <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm md:text-base">Complete Wellness Tracking</span>
            </div>
            <h2 className={`font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              Everything you need to optimize your health
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed ${
              isMobile ? 'text-sm px-2' : 'text-lg'
            }`}>
              VitalitySync brings together all aspects of your health journey in one place, providing deep insights and personalized analytics.
            </p>
          </div>
          
          <div className={`grid gap-6 md:gap-8 ${
            isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
          }`}>
            {[
              {
                icon: <Heart className="h-8 w-8 md:h-12 md:w-12 text-red-500" />,
                title: "Smart Nutrition",
                description: "AI-powered meal tracking with macro analysis, barcode scanning, and personalized recommendations.",
                gradient: "from-red-500/10 to-pink-500/10",
                features: ["USDA Food Database", "Barcode Scanner", "Macro Tracking", "Recipe Search"]
              },
              {
                icon: <Activity className="h-8 w-8 md:h-12 md:w-12 text-blue-500" />,
                title: "Fitness Intelligence",
                description: "Advanced workout analytics with exercise database and calorie tracking.",
                gradient: "from-blue-500/10 to-cyan-500/10",
                features: ["Exercise Database", "Calorie Calculator", "Progress Tracking", "Workout Plans"]
              },
              {
                icon: <Brain className="h-8 w-8 md:h-12 md:w-12 text-purple-500" />,
                title: "Mental Wellness",
                description: "Mood tracking, stress monitoring, and mindfulness recommendations.",
                gradient: "from-purple-500/10 to-indigo-500/10",
                features: ["Mood Tracking", "Stress Analysis", "Mindfulness", "Wellness Tips"]
              },
              {
                icon: <Moon className="h-8 w-8 md:h-12 md:w-12 text-indigo-500" />,
                title: "Sleep Optimization",
                description: "Comprehensive sleep analysis with quality metrics and improvement suggestions.",
                gradient: "from-indigo-500/10 to-blue-500/10",
                features: ["Sleep Quality", "Duration Tracking", "Sleep Debt", "Optimization Tips"]
              },
              {
                icon: <Ruler className="h-8 w-8 md:h-12 md:w-12 text-amber-500" />,
                title: "Body Analytics",
                description: "Track body measurements and composition with visual progress mapping.",
                gradient: "from-amber-500/10 to-orange-500/10",
                features: ["Body Composition", "Progress Photos", "Measurements", "BMI Tracking"]
              },
              {
                icon: <Shield className="h-8 w-8 md:h-12 md:w-12 text-green-500" />,
                title: "Health Insights",
                description: "Holistic health dashboard with predictive analytics and actionable insights.",
                gradient: "from-green-500/10 to-emerald-500/10",
                features: ["Health Dashboard", "Predictive Analytics", "Insights", "Recommendations"]
              }
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} isMobile={isMobile} />
            ))}
          </div>
        </ResponsiveContainer>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-12 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl mx-2 md:mx-4 shadow-2xl"></div>
        <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"} className="text-center relative z-10">
          <div className="text-white">
            <h2 className={`font-bold mb-4 md:mb-6 ${
              isMobile ? 'text-2xl' : 'text-4xl'
            }`}>
              Transform Your Health Today
            </h2>
            <p className={`mb-8 md:mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed ${
              isMobile ? 'text-sm px-2' : 'text-lg'
            }`}>
              Join thousands of users who have revolutionized their wellness journey with VitalitySync's intelligent health ecosystem.
            </p>
            <Button 
              onClick={() => userProfile ? navigate('/dashboard') : navigate('/profile')}
              className={`bg-white text-blue-600 hover:bg-gray-100 rounded-2xl transition-all duration-500 hover:scale-105 shadow-2xl font-semibold ${
                isMobile ? 'w-full mx-4 py-4 text-base' : 'text-lg px-8 py-4'
              }`}
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

const FeatureCard = ({ icon, title, description, gradient, features, isMobile }) => {
  return (
    <GlassCard 
      variant="cosmic" 
      className="group hover:shadow-2xl transition-all duration-500 hover:scale-105"
    >
      <div className={`absolute top-0 right-0 ${isMobile ? 'w-20 h-20' : 'w-32 h-32'} bg-gradient-to-br ${gradient} rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500`}></div>
      <div className="relative z-10">
        <div className="mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className={`font-bold mb-3 md:mb-4 text-gray-900 dark:text-white ${isMobile ? 'text-lg' : 'text-2xl'}`}>{title}</h3>
        <p className={`text-gray-600 dark:text-gray-300 leading-relaxed mb-4 ${isMobile ? 'text-sm' : 'text-base'}`}>{description}</p>
        
        {features && (
          <div className="grid grid-cols-2 gap-2">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <ChevronRight className="w-3 h-3 mr-1 text-blue-500" />
                {feature}
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default Index;
