
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  Brain,
  Trophy,
  TrendingUp,
  Sparkles,
  Gauge,
  Activity,
  Zap,
  Crown,
  Star,
  Rocket,
  Award,
  Calendar,
  Clock,
  Shield,
  Gem,
  Flame,
  Heart,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useViewport } from '@/hooks';
import EnhancedDashboardOverview from './EnhancedDashboardOverview';
import AdvancedAnalytics from './AdvancedAnalytics';
import AIHealthCoach from './AIHealthCoach';
import GoalManagement from './GoalManagement';
import HealthTrends from './HealthTrends';

interface PanelConfig {
  id: string;
  title: string;
  icon: React.ElementType;
  gradient: string;
  component: React.ComponentType;
  color: string;
  description: string;
}

const SlidingPanelInterface: React.FC = () => {
  const [activePanel, setActivePanel] = useState<string>('overview');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { isMobile } = useViewport();

  const panels: PanelConfig[] = [
    {
      id: 'overview',
      title: 'Dashboard Overview',
      icon: Gauge,
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      component: EnhancedDashboardOverview,
      color: 'emerald',
      description: 'Complete health insights & metrics'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      icon: BarChart3,
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      component: AdvancedAnalytics,
      color: 'blue',
      description: 'Deep performance analysis'
    },
    {
      id: 'ai-coach',
      title: 'AI Health Coach',
      icon: Brain,
      gradient: 'from-purple-400 via-violet-500 to-pink-600',
      component: AIHealthCoach,
      color: 'purple',
      description: 'Personalized AI recommendations'
    },
    {
      id: 'goals',
      title: 'Goal Management',
      icon: Trophy,
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      component: GoalManagement,
      color: 'amber',
      description: 'Track achievements & milestones'
    },
    {
      id: 'trends',
      title: 'Health Trends',
      icon: TrendingUp,
      gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
      component: HealthTrends,
      color: 'rose',
      description: 'Long-term pattern analysis'
    }
  ];

  const activeConfig = panels.find(p => p.id === activePanel) || panels[0];
  const ActiveComponent = activeConfig.component;

  const handlePanelSelect = useCallback((panelId: string) => {
    setActivePanel(panelId);
    if (isMobile) {
      setIsPanelOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 overflow-hidden">
      {/* Revolutionary Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className={cn(
          "absolute inset-0 transition-all duration-1000",
          `bg-gradient-to-br from-${activeConfig.color}-500/20 via-transparent to-${activeConfig.color}-500/10`
        )}></div>
        
        {/* Dynamic floating orbs */}
        <motion.div 
          className={cn(
            "absolute rounded-full blur-3xl opacity-20",
            isMobile ? "top-10 right-10 w-48 h-48" : "top-20 right-20 w-96 h-96",
            `bg-gradient-to-br ${activeConfig.gradient}`
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className={cn(
            "absolute rounded-full blur-3xl opacity-15",
            isMobile ? "bottom-10 left-10 w-56 h-56" : "bottom-20 left-20 w-[32rem] h-[32rem]",
            `bg-gradient-to-tr ${activeConfig.gradient}`
          )}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Animated mesh grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Revolutionary Side Panel Navigation */}
      <div className={cn(
        "fixed left-0 top-0 bottom-0 z-50 transition-all duration-500",
        isMobile ? "w-16" : "w-20"
      )}>
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl border-r border-white/10"></div>
        
        <div className="relative h-full flex flex-col p-4">
          {/* Logo section */}
          <div className="mb-8 flex justify-center">
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Crown className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Panel navigation buttons */}
          <div className="flex-1 space-y-4">
            {panels.map((panel, index) => (
              <motion.button
                key={panel.id}
                onClick={() => handlePanelSelect(panel.id)}
                className={cn(
                  "relative w-full aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 group overflow-hidden border-2",
                  activePanel === panel.id 
                    ? `bg-gradient-to-br ${panel.gradient} border-white/30 shadow-2xl scale-110` 
                    : "bg-white/10 hover:bg-white/20 border-white/10 hover:border-white/20"
                )}
                whileHover={{ scale: activePanel === panel.id ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12"></div>
                
                <panel.icon className={cn(
                  "relative z-10 transition-all duration-300",
                  isMobile ? "w-5 h-5" : "w-6 h-6",
                  activePanel === panel.id ? "text-white scale-110" : "text-gray-300 group-hover:text-white"
                )} />
                
                {/* Active indicator */}
                {activePanel === panel.id && (
                  <motion.div 
                    className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-lg"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Glow effect for active */}
                {activePanel === panel.id && (
                  <div className={cn(
                    "absolute inset-0 rounded-2xl opacity-60 blur-lg",
                    `bg-gradient-to-br ${panel.gradient}`
                  )}></div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Settings and profile section */}
          <div className="space-y-4">
            <motion.button
              className="w-full aspect-square rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={cn(
        "transition-all duration-500",
        isMobile ? "ml-16" : "ml-20"
      )}>
        {/* Premium Header */}
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl border-b border-white/10"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div 
                  className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl",
                    `bg-gradient-to-br ${activeConfig.gradient}`
                  )}
                  key={activePanel}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <activeConfig.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <div>
                  <motion.h1 
                    className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent"
                    key={`${activePanel}-title`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {activeConfig.title}
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-cyan-200/80 font-medium"
                    key={`${activePanel}-desc`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {activeConfig.description}
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge className={cn(
                  "px-4 py-2 text-white font-bold shadow-xl",
                  `bg-gradient-to-r ${activeConfig.gradient}`
                )}>
                  <Star className="w-4 h-4 mr-2" />
                  Elite Pro
                </Badge>
                
                <div className="px-4 py-2 bg-black/20 backdrop-blur-xl rounded-xl border border-gray-600/30">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium text-sm">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 flex items-center gap-3">
              {panels.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    activePanel === panel.id 
                      ? `bg-gradient-to-r ${panel.gradient} shadow-lg` 
                      : "bg-white/20"
                  )}
                  style={{ width: activePanel === panel.id ? '60px' : '20px' }}
                  layoutId={`progress-${panel.id}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                staggerChildren: 0.1
              }}
              className="relative"
            >
              {/* Glass container for content */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl"></div>
                <div className={cn(
                  "absolute inset-0 rounded-3xl opacity-20",
                  `bg-gradient-to-br ${activeConfig.gradient}`
                )}></div>
                
                <div className="relative p-8">
                  <ActiveComponent />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SlidingPanelInterface;
