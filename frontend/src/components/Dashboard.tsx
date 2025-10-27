import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import {
  Sun,
  Heart,
  Palette,
  Calendar,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  Moon,
  Star,
  BookOpen,
  MessageCircle
} from "lucide-react";
import MorningSunCheckIn from "./MorningSunCheckIn";
import { JournalingSystem } from "./JournalingSystem";
import ResourceDiscoveryMap from "./ResourceDiscoveryMap";
import AnalyticsDashboard from "./AnalyticsDashboard";
import ResearchPlatform from "./ResearchPlatform";
import { ConversationFoundation } from "./conversation/ConversationFoundation";
import { StreakWidget } from "./StreakWidget";

interface WellnessMetric {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  cultural_context: string;
}

const Dashboard = () => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'dashboard' | 'checkin' | 'canvas' | 'conversation' | 'resources' | 'analytics' | 'research'>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  const wellnessMetrics: WellnessMetric[] = [
    {
      label: t('dashboard.wellnessMetrics.heartHarmony.label'),
      value: 8.2,
      trend: 'up',
      cultural_context: t('dashboard.wellnessMetrics.heartHarmony.context')
    },
    {
      label: t('dashboard.wellnessMetrics.communityConnection.label'),
      value: 7.5,
      trend: 'stable',
      cultural_context: t('dashboard.wellnessMetrics.communityConnection.context')
    },
    {
      label: t('dashboard.wellnessMetrics.innerPeace.label'),
      value: 6.8,
      trend: 'up',
      cultural_context: t('dashboard.wellnessMetrics.innerPeace.context')
    },
    {
      label: t('dashboard.wellnessMetrics.culturalPride.label'),
      value: 9.1,
      trend: 'up',
      cultural_context: t('dashboard.wellnessMetrics.culturalPride.context')
    }
  ];

  const userName = "Bronson"; // TODO: Get from user profile/auth

  const getGreetingByTime = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: t('greetings.goodMorning', { name: userName }), icon: Sun };
    if (hour < 17) return { text: t('greetings.goodAfternoon', { name: userName }), icon: Sparkles };
    if (hour < 21) return { text: t('greetings.goodEvening', { name: userName }), icon: Star };
    return { text: t('greetings.goodNight', { name: userName }), icon: Moon };
  };

  const greeting = getGreetingByTime();

  if (activeView === 'checkin') {
    return <MorningSunCheckIn />;
  }

  if (activeView === 'canvas') {
    return <JournalingSystem />;
  }

  if (activeView === 'conversation') {
    return <ConversationFoundation />;
  }

  if (activeView === 'resources') {
    return <ResourceDiscoveryMap />;
  }

  if (activeView === 'analytics') {
    return <AnalyticsDashboard />;
  }

  if (activeView === 'research') {
    return <ResearchPlatform onBack={() => setActiveView('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-wisdom">{t('common.appName')}</h1>
                <p className="text-sm text-gentle">{t('common.appTagline')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gentle text-sm">
              <Globe className="w-4 h-4" />
              <span>{t('common.culturallyAware')}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Personal Greeting with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="card-warm p-6 mb-8">
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <greeting.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <div>
                <h2 className="text-2xl font-semibold text-wisdom mb-1">{greeting.text}</h2>
                <p className="text-gentle">{t('dashboard.nurtureQuestion')}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Streak Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mb-8"
        >
          <StreakWidget
            currentStreak={7}
            longestStreak={15}
            totalCheckIns={42}
          />
        </motion.div>

        {/* Quick Actions with Staggered Animations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              view: 'checkin' as const,
              icon: Sun,
              title: t('cards.morningCheckIn.title'),
              description: t('cards.morningCheckIn.description'),
              gradient: 'from-primary to-secondary'
            },
            {
              view: 'canvas' as const,
              icon: BookOpen,
              title: t('cards.journal.title'),
              description: t('cards.journal.description'),
              gradient: 'from-secondary to-accent'
            },
            {
              view: 'conversation' as const,
              icon: MessageCircle,
              title: t('cards.aiChat.title'),
              description: t('cards.aiChat.description'),
              gradient: 'from-purple-500 to-pink-500'
            },
            {
              view: 'resources' as const,
              icon: Globe,
              title: t('cards.resourceMap.title'),
              description: t('cards.resourceMap.description'),
              gradient: 'from-accent to-primary'
            },
            {
              view: 'analytics' as const,
              icon: TrendingUp,
              title: t('cards.analytics.title'),
              description: t('cards.analytics.description'),
              gradient: 'from-primary/80 to-secondary/80'
            },
            {
              view: 'research' as const,
              icon: BookOpen,
              title: t('cards.research.title'),
              description: t('cards.research.description'),
              gradient: 'from-accent to-primary'
            }
          ].map((action, index) => (
            <motion.div
              key={action.view}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="card-embrace p-6 cursor-pointer h-full"
                onClick={() => setActiveView(action.view)}
              >
                <div className="flex flex-col gap-4">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${action.gradient} flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <action.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-wisdom mb-1">{action.title}</h3>
                    <p className="text-gentle text-sm">{action.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Wellness Metrics with Animations */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-wisdom mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {t('dashboard.wellnessJourney')}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {wellnessMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ y: -8, scale: 1.05 }}
              >
                <Card className="card-embrace p-4 h-full">
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-primary mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      {metric.value}/10
                    </motion.div>
                    <h4 className="font-medium text-wisdom text-sm mb-1">{metric.label}</h4>
                    <p className="text-xs text-gentle">{metric.cultural_context}</p>

                    {/* Trend Indicator */}
                    <div className="mt-2">
                      {metric.trend === 'up' && (
                        <motion.span
                          className="text-xs text-green-600 flex items-center justify-center gap-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.2 + index * 0.1 }}
                        >
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <TrendingUp className="w-3 h-3" />
                          </motion.div>
                          {t('dashboard.trends.growing')}
                        </motion.span>
                      )}
                      {metric.trend === 'stable' && (
                        <span className="text-xs text-secondary flex items-center justify-center gap-1">
                          <span className="w-3 h-1 bg-secondary rounded"></span>
                          {t('dashboard.trends.stable')}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cultural Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="card-warm p-6">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-wisdom mb-2">{t('dashboard.communitySupport.title')}</h4>
                <p className="text-gentle text-sm mb-4">
                  {t('dashboard.communitySupport.description')}
                </p>
                <Button className="btn-gentle">
                  {t('dashboard.communitySupport.button')}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="card-warm p-6">
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-wisdom mb-2">{t('dashboard.culturalCalendar.title')}</h4>
                <p className="text-gentle text-sm mb-4">
                  {t('dashboard.culturalCalendar.description')}
                </p>
                <Button className="btn-gentle">
                  {t('dashboard.culturalCalendar.button')}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Cultural Sensitivity Notice */}
        <Card className="card-embrace p-6 mt-8">
          <div className="text-center">
            <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold text-wisdom mb-2">{t('dashboard.culturalNotice.title')}</h4>
            <p className="text-gentle text-sm max-w-2xl mx-auto">
              {t('dashboard.culturalNotice.message')}
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;