
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Moon, Activity, Shield, Ruler, Award, Zap, Utensils, CheckCircle, Star } from 'lucide-react';
import { useHealth } from '@/contexts/HealthContext';
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const { userProfile } = useHealth();

  return (
    <div className="min-h-screen space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-health-primary/20 via-health-secondary/10 to-purple-500/10 py-20 md:py-28 rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-health-primary/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-36 h-36 bg-health-secondary/25 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-health-primary/20 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-health-primary/20 to-health-secondary/20 text-health-primary font-semibold text-sm mb-6 backdrop-blur-sm border border-health-primary/20">
                <Star className="h-4 w-4 mr-2 text-yellow-500" />
                Transform Your Health Journey Today
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-health-primary via-health-secondary to-purple-600 bg-clip-text text-transparent">
                  VitalitySync
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-medium">
                Your Complete Wellness Revolution
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl">
                Experience the power of integrated health tracking. Monitor nutrition, fitness, sleep, mental wellness, and body metrics—all synchronized in one beautiful, intelligent platform designed for your success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {userProfile ? (
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-health-primary to-health-secondary hover:from-health-primary/90 hover:to-health-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    <Activity className="h-5 w-5 mr-2" />
                    Continue Your Journey <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => navigate('/profile')}
                    className="bg-gradient-to-r from-health-primary to-health-secondary hover:from-health-primary/90 hover:to-health-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Start Your Transformation <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                )}
                
                <Button 
                  variant="outline" 
                  className="border-2 border-health-primary text-health-primary hover:bg-health-primary hover:text-white transition-all duration-300"
                  size="lg"
                  onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}
                >
                  Discover Features
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Science-backed metrics</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Privacy-first approach</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <span>Completely free</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-96 md:h-[500px] rounded-3xl bg-gradient-to-br from-health-primary/20 via-health-secondary/20 to-purple-500/20 flex items-center justify-center shadow-2xl backdrop-blur-sm border border-white/20">
                  <div className="grid grid-cols-2 gap-6 p-8">
                    <div className="animate-float-slow bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-health-primary to-teal-400 flex items-center justify-center mb-3">
                        <Activity className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-base font-semibold text-gray-800">Exercise</span>
                      <span className="text-xs text-gray-600 mt-1">Track & Optimize</span>
                    </div>
                    
                    <div className="animate-float-slower bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 delay-300">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center mb-3">
                        <Utensils className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-base font-semibold text-gray-800">Nutrition</span>
                      <span className="text-xs text-gray-600 mt-1">Smart Tracking</span>
                    </div>
                    
                    <div className="animate-float-slow bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 delay-150">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-3">
                        <Moon className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-base font-semibold text-gray-800">Sleep</span>
                      <span className="text-xs text-gray-600 mt-1">Quality Analysis</span>
                    </div>
                    
                    <div className="animate-float-slower bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform duration-300 delay-200">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-health-secondary to-pink-500 flex items-center justify-center mb-3">
                        <Brain className="h-6 w-6 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-base font-semibold text-gray-800">Mental</span>
                      <span className="text-xs text-gray-600 mt-1">Wellness Focus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-health-primary/10 text-health-primary font-semibold text-sm mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Comprehensive Health Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Everything You Need to Thrive
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              VitalitySync brings together cutting-edge health tracking with beautiful design, giving you the insights and motivation to achieve your wellness goals faster than ever before.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Heart className="h-12 w-12 text-red-500" />}
              title="Intelligent Nutrition"
              description="AI-powered meal tracking with personalized recommendations, macro optimization, and instant nutritional insights that adapt to your unique goals."
              color="bg-gradient-to-br from-red-50 to-pink-50"
              iconBg="bg-gradient-to-r from-red-100 to-pink-100"
            />
            <FeatureCard
              icon={<Activity className="h-12 w-12 text-health-primary" />}
              title="Advanced Fitness Analytics"
              description="Transform your workouts with detailed performance tracking, progress visualization, and personalized training insights that evolve with you."
              color="bg-gradient-to-br from-teal-50 to-cyan-50"
              iconBg="bg-gradient-to-r from-teal-100 to-cyan-100"
            />
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-health-secondary" />}
              title="Mental Wellness Hub"
              description="Monitor your emotional health with mood tracking, stress analysis, and personalized mindfulness recommendations for optimal mental clarity."
              color="bg-gradient-to-br from-purple-50 to-indigo-50"
              iconBg="bg-gradient-to-r from-purple-100 to-indigo-100"
            />
            <FeatureCard
              icon={<Moon className="h-12 w-12 text-indigo-600" />}
              title="Sleep Optimization"
              description="Unlock better rest with comprehensive sleep analysis, quality scoring, and personalized recommendations for peak recovery."
              color="bg-gradient-to-br from-indigo-50 to-blue-50"
              iconBg="bg-gradient-to-r from-indigo-100 to-blue-100"
            />
            <FeatureCard
              icon={<Ruler className="h-12 w-12 text-amber-600" />}
              title="Body Transformation"
              description="Track your physical journey with precise measurements, progress photos, and visual analytics that celebrate every milestone."
              color="bg-gradient-to-br from-amber-50 to-yellow-50"
              iconBg="bg-gradient-to-r from-amber-100 to-yellow-100"
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-green-600" />}
              title="Holistic Dashboard"
              description="See the complete picture of your health with integrated insights, trend analysis, and actionable recommendations in one unified view."
              color="bg-gradient-to-br from-green-50 to-emerald-50"
              iconBg="bg-gradient-to-r from-green-100 to-emerald-100"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-gray-50 via-blue-50/30 to-purple-50/30 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-health-secondary/10 text-health-secondary font-semibold text-sm mb-6">
              <Star className="h-4 w-4 mr-2" />
              Simple. Powerful. Transformative.
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your Journey to Wellness Starts Here</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Three simple steps to unlock your healthiest, happiest self</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Create Your Health Profile"
              description="Set up your personalized health blueprint with your goals, preferences, and current metrics in just 2 minutes."
              icon={<User className="h-8 w-8 text-health-primary" />}
            />
            <StepCard
              number="02"
              title="Track Effortlessly"
              description="Log your daily activities with our intuitive interface designed to make healthy habits stick naturally."
              icon={<Activity className="h-8 w-8 text-health-primary" />}
            />
            <StepCard
              number="03"
              title="Transform & Thrive"
              description="Watch as personalized insights and recommendations guide you toward your best self, one day at a time."
              icon={<Zap className="h-8 w-8 text-health-primary" />}
            />
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-health-primary/20 via-health-secondary/20 to-purple-500/20 rounded-3xl p-12 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute -top-20 -right-20 w-48 h-48 bg-health-primary/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-health-secondary/30 rounded-full blur-2xl"></div>
                
                <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-health-primary to-health-secondary flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">Science Meets Simplicity</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    VitalitySync combines cutting-edge health science with intuitive design, delivering evidence-based insights that actually work for real people with real lives.
                  </p>
                  <ul className="space-y-4">
                    {["Research-backed recommendations", "Personalized to your unique biology", "Continuously updated with latest health science"].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-health-primary to-health-secondary flex items-center justify-center mr-4">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-base font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-health-primary/10 text-health-primary font-semibold text-sm mb-6">
                  <Heart className="h-4 w-4 mr-2" />
                  Why VitalitySync Changes Everything
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">More Than Tracking—It's Transformation</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover how our comprehensive approach reveals the hidden connections in your health, empowering truly holistic wellness that fits your lifestyle.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <BenefitCard
                  icon={<Brain className="h-6 w-6 text-health-primary" />}
                  title="Holistic Intelligence"
                  description="Understand how sleep affects workouts, nutrition impacts mood, and stress influences everything."
                />
                <BenefitCard
                  icon={<Activity className="h-6 w-6 text-health-primary" />}
                  title="Predictive Insights"
                  description="Advanced analytics reveal patterns and predict trends, helping you stay ahead of your health."
                />
                <BenefitCard
                  icon={<Award className="h-6 w-6 text-health-primary" />}
                  title="Smart Goal Setting"
                  description="Set and achieve realistic goals based on your personal data and scientifically-proven methods."
                />
                <BenefitCard
                  icon={<Zap className="h-6 w-6 text-health-primary" />}
                  title="Visual Progress"
                  description="Beautiful charts and insights that make your health journey engaging and motivating."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-health-primary via-health-secondary to-purple-600 rounded-3xl text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Health?</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Join thousands who've already discovered the power of integrated wellness tracking. Your healthiest, happiest self is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => userProfile ? navigate('/dashboard') : navigate('/profile')}
                className="bg-white text-health-primary hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Heart className="h-5 w-5 mr-2" />
                {userProfile ? 'Continue Your Journey' : 'Start Your Transformation'}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <p className="text-white/80 text-sm">No signup required • Completely free • Privacy first</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, color, iconBg }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 group">
      <CardContent className="p-8">
        <div className={`w-20 h-20 rounded-3xl ${iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

const StepCard = ({ number, title, description, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-health-primary to-health-secondary flex items-center justify-center text-white font-bold text-xl mr-4">
          {number}
        </div>
        <div className="w-12 h-12 rounded-xl bg-health-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="flex items-start p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-health-primary/20 to-health-secondary/20 flex items-center justify-center mr-4 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

// Import User icon for the step card
const User = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default Index;
