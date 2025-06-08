
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
  backgroundImage: string;
  accentColor: string;
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
      description: 'Complete health insights & metrics',
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)',
      accentColor: 'rgb(16, 185, 129)'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      icon: BarChart3,
      gradient: 'from-blue-400 via-indigo-500 to-purple-600',
      component: AdvancedAnalytics,
      color: 'blue',
      description: 'Deep performance analysis',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 10%, rgba(99, 102, 241, 0.2) 0%, transparent 50%)',
      accentColor: 'rgb(59, 130, 246)'
    },
    {
      id: 'ai-coach',
      title: 'AI Health Coach',
      icon: Brain,
      gradient: 'from-purple-400 via-violet-500 to-pink-600',
      component: AIHealthCoach,
      color: 'purple',
      description: 'Personalized AI recommendations',
      backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)',
      accentColor: 'rgb(139, 92, 246)'
    },
    {
      id: 'goals',
      title: 'Goal Management',
      icon: Trophy,
      gradient: 'from-amber-400 via-orange-500 to-red-600',
      component: GoalManagement,
      color: 'amber',
      description: 'Track achievements & milestones',
      backgroundImage: 'radial-gradient(circle at 40% 20%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 60%, rgba(234, 179, 8, 0.2) 0%, transparent 50%)',
      accentColor: 'rgb(251, 191, 36)'
    },
    {
      id: 'trends',
      title: 'Health Trends',
      icon: TrendingUp,
      gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
      component: HealthTrends,
      color: 'rose',
      description: 'Long-term pattern analysis',
      backgroundImage: 'radial-gradient(circle at 60% 30%, rgba(244, 63, 94, 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(217, 70, 239, 0.2) 0%, transparent 50%)',
      accentColor: 'rgb(244, 63, 94)'
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background Based on Active Panel */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%), ${activeConfig.backgroundImage}`
          }}
          key={activePanel}
        />
        
        {/* Animated Geometric Patterns */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${activeConfig.accentColor} 0%, transparent 70%)`,
              top: '10%',
              right: '10%'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div 
            className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
            style={{ 
              background: `radial-gradient(circle, ${activeConfig.accentColor} 0%, transparent 70%)`,
              bottom: '15%',
              left: '15%'
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>

        {/* Enhanced Mesh Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
        </div>
      </div>

      {/* Revolutionary Side Panel Navigation */}
      <motion.div 
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 transition-all duration-700",
          isMobile ? "w-20" : "w-24"
        )}
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Ultra Glass Morphism Background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-3xl border-r border-white/20 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
        </div>
        
        <div className="relative h-full flex flex-col p-6">
          {/* Premium Logo Section */}
          <div className="mb-12 flex justify-center">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-60" />
              <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20">
                <Crown className="w-7 h-7 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Enhanced Panel Navigation Buttons */}
          <div className="flex-1 space-y-6">
            {panels.map((panel, index) => (
              <motion.div
                key={panel.id}
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 120 }}
              >
                <motion.button
                  onClick={() => handlePanelSelect(panel.id)}
                  className={cn(
                    "relative w-full aspect-square rounded-3xl flex items-center justify-center transition-all duration-500 group overflow-hidden",
                    "backdrop-blur-xl border-2 shadow-2xl",
                    activePanel === panel.id 
                      ? "bg-white/20 border-white/40 scale-110" 
                      : "bg-white/10 hover:bg-white/15 border-white/20 hover:border-white/30"
                  )}
                  whileHover={{ 
                    scale: activePanel === panel.id ? 1.15 : 1.08,
                    rotateY: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: activePanel === panel.id 
                      ? `linear-gradient(135deg, ${panel.gradient.replace('from-', 'rgba(').replace('via-', ', rgba(').replace('to-', ', rgba(')})`
                      : undefined
                  }}
                >
                  {/* Holographic Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%]" />
                  
                  {/* Icon with Enhanced Glow */}
                  <div className="relative z-10">
                    <panel.icon className={cn(
                      "transition-all duration-500",
                      isMobile ? "w-6 h-6" : "w-7 h-7",
                      activePanel === panel.id 
                        ? "text-white scale-110 drop-shadow-lg" 
                        : "text-gray-300 group-hover:text-white group-hover:scale-105"
                    )} />
                  </div>
                  
                  {/* Active State Indicators */}
                  {activePanel === panel.id && (
                    <>
                      <motion.div 
                        className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-12 bg-white rounded-full shadow-xl"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                      <div 
                        className="absolute inset-0 rounded-3xl opacity-40 blur-2xl"
                        style={{ background: `linear-gradient(135deg, ${panel.gradient})` }}
                      />
                    </>
                  )}
                  
                  {/* Particle Effects for Active State */}
                  {activePanel === panel.id && (
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                          style={{
                            left: `${20 + i * 10}%`,
                            top: `${30 + (i % 2) * 40}%`
                          }}
                          animate={{
                            opacity: [0.6, 1, 0.6],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  )}
                </motion.button>

                {/* Panel Label Tooltip */}
                <motion.div
                  className={cn(
                    "absolute left-full ml-4 top-1/2 transform -translate-y-1/2",
                    "bg-black/80 backdrop-blur-xl text-white px-3 py-2 rounded-xl text-sm font-medium",
                    "border border-white/20 shadow-2xl opacity-0 pointer-events-none transition-all duration-300",
                    "group-hover:opacity-100 group-hover:translate-x-2"
                  )}
                >
                  {panel.title}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/80 rotate-45 border-l border-b border-white/20" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Settings Section */}
          <div className="space-y-4 pt-6 border-t border-white/20">
            <motion.button
              className="w-full aspect-square rounded-3xl bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/30 flex items-center justify-center transition-all duration-300 group backdrop-blur-xl shadow-xl"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Main Content Area */}
      <div className={cn(
        "transition-all duration-700",
        isMobile ? "ml-20" : "ml-24"
      )}>
        {/* Ultra Premium Header */}
        <motion.div 
          className="relative p-8 md:p-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl border-b border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5" />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <motion.div 
                  className="relative"
                  key={activePanel}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div 
                    className="absolute inset-0 rounded-4xl opacity-60 blur-2xl"
                    style={{ background: `linear-gradient(135deg, ${activeConfig.gradient})` }}
                  />
                  <div 
                    className="relative w-20 h-20 rounded-4xl flex items-center justify-center shadow-2xl border border-white/30"
                    style={{ background: `linear-gradient(135deg, ${activeConfig.gradient})` }}
                  >
                    <activeConfig.icon className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </motion.div>
                
                <div>
                  <motion.h1 
                    className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent leading-tight"
                    key={`${activePanel}-title`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {activeConfig.title}
                  </motion.h1>
                  <motion.p 
                    className="text-xl text-cyan-200/90 font-medium mt-2"
                    key={`${activePanel}-desc`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {activeConfig.description}
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <Badge 
                    className="px-6 py-3 text-white font-bold shadow-2xl border border-white/30 backdrop-blur-xl"
                    style={{ background: `linear-gradient(135deg, ${activeConfig.gradient})` }}
                  >
                    <Star className="w-5 h-5 mr-2" />
                    Elite Pro
                  </Badge>
                </motion.div>
                
                <motion.div 
                  className="px-6 py-3 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3 text-gray-200">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Enhanced Progress Indicator */}
            <motion.div 
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {panels.map((panel, index) => (
                <motion.div
                  key={panel.id}
                  className={cn(
                    "h-2 rounded-full transition-all duration-700 shadow-lg",
                    activePanel === panel.id 
                      ? "shadow-2xl" 
                      : "bg-white/20"
                  )}
                  style={{ 
                    width: activePanel === panel.id ? '80px' : '24px',
                    background: activePanel === panel.id 
                      ? `linear-gradient(90deg, ${activeConfig.gradient})`
                      : undefined
                  }}
                  layoutId={`progress-${panel.id}`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Ultra Premium Content Area */}
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePanel}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                staggerChildren: 0.1
              }}
              className="relative"
            >
              {/* Ultra Glass Container */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-4xl shadow-2xl border border-white/20"
                  style={{
                    background: `
                      linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
                      ${activeConfig.backgroundImage}
                    `,
                    backdropFilter: 'blur(40px)'
                  }}
                />
                
                {/* Content Wrapper with Enhanced Glass Effect */}
                <div className="relative p-10 rounded-4xl">
                  <div className="absolute inset-0 rounded-4xl bg-gradient-to-br from-white/5 via-transparent to-white/10" />
                  <div className="relative z-10">
                    <ActiveComponent />
                  </div>
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
