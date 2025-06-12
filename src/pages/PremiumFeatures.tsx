
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown, Bot, Wifi, Dumbbell } from 'lucide-react';
import ResponsiveContainer from '@/components/layout/ResponsiveContainer';
import { useViewport } from '@/hooks';
import SmartHealthAssistant from '@/components/dashboard/SmartHealthAssistant';
import ApiIntegrationsHub from '@/components/integrations/ApiIntegrationsHub';
import PremiumWorkoutBuilder from '@/components/premium/PremiumWorkoutBuilder';

const PremiumFeatures: React.FC = () => {
  const { isMobile } = useViewport();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-orange-50/50 dark:from-purple-950/30 dark:via-pink-950/20 dark:to-orange-950/30 p-6">
      <ResponsiveContainer maxWidth="2xl" padding={isMobile ? "sm" : "lg"}>
        <div className="space-y-8">
          {/* Premium Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-vibrant">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  VitalitySync Premium
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Advanced AI-powered health optimization suite
                </p>
              </div>
            </div>
          </div>

          {/* Premium Features Tabs */}
          <Tabs defaultValue="ai-coach" className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} mb-8`}>
              <TabsTrigger value="ai-coach" className="gap-2">
                <Bot className="w-4 h-4" />
                {!isMobile && "AI Coach"}
              </TabsTrigger>
              <TabsTrigger value="integrations" className="gap-2">
                <Wifi className="w-4 h-4" />
                {!isMobile && "Integrations"}
              </TabsTrigger>
              {!isMobile && (
                <>
                  <TabsTrigger value="workouts" className="gap-2">
                    <Dumbbell className="w-4 h-4" />
                    Workout Builder
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="gap-2">
                    <Crown className="w-4 h-4" />
                    Advanced Analytics
                  </TabsTrigger>
                </>
              )}
            </TabsList>

            <TabsContent value="ai-coach">
              <SmartHealthAssistant />
            </TabsContent>

            <TabsContent value="integrations">
              <ApiIntegrationsHub />
            </TabsContent>

            {!isMobile && (
              <>
                <TabsContent value="workouts">
                  <PremiumWorkoutBuilder />
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold mb-4">Advanced Analytics Coming Soon</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Deep performance insights and predictive health analytics
                    </p>
                  </div>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </ResponsiveContainer>
    </div>
  );
};

export default PremiumFeatures;
