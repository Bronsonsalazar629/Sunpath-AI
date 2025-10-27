import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import CulturalNavigation from '../navigation/CulturalNavigation';
import { FeatureTransitionProvider, TransitionSuggestions, CulturalContextDisplay } from './FeatureTransitionManager';
import AIIntegrationLayer from './AIIntegrationLayer';
import { BottomNavigation } from '../BottomNavigation';
import {
  Layout,
  Compass,
  Zap,
  Brain,
  Shield,
  Globe,
  Users,
  Star
} from 'lucide-react';

// Import all feature components
import Dashboard from '../Dashboard';
import { OnboardingFlow } from '../onboarding/OnboardingFlow';
import MorningSunCheckIn from '../MorningSunCheckIn';
import { JournalingSystem } from '../JournalingSystem';
import { ConversationFoundation } from '../conversation/ConversationFoundation';
import ResourceDiscoveryMap from '../ResourceDiscoveryMap';
import AnalyticsDashboard from '../AnalyticsDashboard';
import ResearchPlatform from '../ResearchPlatform';

interface SystemIntegrationHubProps {
  initialCulturalBackground?: string;
  userPreferences?: {
    privacy: string;
    communication: string;
    family: string;
  };
}

const SystemIntegrationHub: React.FC<SystemIntegrationHubProps> = ({
  initialCulturalBackground = 'multicultural',
  userPreferences = {
    privacy: 'moderate',
    communication: 'adaptive',
    family: 'inclusive'
  }
}) => {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('dashboard');
  const [integrationMode, setIntegrationMode] = useState<'navigation' | 'transitions' | 'ai' | 'features'>('features');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setIntegrationMode('features');
  };

  const renderCurrentFeature = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'onboarding':
        return <OnboardingFlow />;
      case 'checkin':
        return <MorningSunCheckIn />;
      case 'canvas':
        return <JournalingSystem />;
      case 'conversation':
        return <ConversationFoundation />;
      case 'resources':
        return <ResourceDiscoveryMap />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'research':
        return <ResearchPlatform onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FeatureTransitionProvider 
      initialFeature={currentView}
      culturalBackground={initialCulturalBackground}
    >
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Integration Control Panel */}
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-3">
            <Tabs value={integrationMode} onValueChange={(value: any) => setIntegrationMode(value)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="features" className="text-xs">
                  <Layout className="h-4 w-4 mr-1" />
                  {t('integration.tabs.features')}
                </TabsTrigger>
                <TabsTrigger value="navigation" className="text-xs">
                  <Compass className="h-4 w-4 mr-1" />
                  {t('integration.tabs.navigation')}
                </TabsTrigger>
                <TabsTrigger value="transitions" className="text-xs">
                  <Zap className="h-4 w-4 mr-1" />
                  {t('integration.tabs.transitions')}
                </TabsTrigger>
                <TabsTrigger value="ai" className="text-xs">
                  <Brain className="h-4 w-4 mr-1" />
                  {t('integration.tabs.ai')}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <Tabs value={integrationMode} onValueChange={(value: any) => setIntegrationMode(value)}>
            {/* Features View - Main Application */}
            <TabsContent value="features" className="space-y-6">
              {/* Cultural Context Banner */}
              <div className="mb-4">
                <CulturalContextDisplay showDetails={false} />
              </div>

              {/* Transition Suggestions */}
              <TransitionSuggestions onTransition={handleViewChange} />

              {/* Main Feature Content with Animations */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentView}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full"
                >
                  {renderCurrentFeature()}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            {/* Cultural Navigation */}
            <TabsContent value="navigation" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Compass className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold">{t('integration.culturalNavigation.title')}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t('integration.culturalNavigation.description')}
                    </p>
                  </div>
                </div>

                <CulturalNavigation
                  culturalBackground={initialCulturalBackground}
                  currentView={currentView}
                  onViewChange={handleViewChange}
                />
              </Card>
            </TabsContent>

            {/* Feature Transitions */}
            <TabsContent value="transitions" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold">{t('integration.transitions.title')}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t('integration.transitions.description')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <CulturalContextDisplay showDetails={true} />
                  <TransitionSuggestions onTransition={handleViewChange} />

                  {/* Transition History */}
                  <Card className="p-4 bg-muted/20">
                    <h4 className="font-medium text-sm mb-2">{t('integration.transitions.journeyToday')}</h4>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-muted-foreground">{t('integration.transitions.visited')}</span>
                      <div className="flex space-x-1">
                        {['dashboard', 'checkin', currentView].map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-secondary rounded text-secondary-foreground">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </TabsContent>

            {/* AI Integration */}
            <TabsContent value="ai" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                  <div>
                    <h2 className="text-lg font-semibold">{t('integration.ai.title')}</h2>
                    <p className="text-sm text-muted-foreground">
                      {t('integration.ai.description')}
                    </p>
                  </div>
                </div>

                <AIIntegrationLayer />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Cultural Quality Assurance Footer */}
        <div className="border-t border-border bg-muted/20 mt-12 mb-20">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{t('integration.footer.dataProtected')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{t('integration.footer.validated')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{t('integration.footer.inclusive')}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Star className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">{t('integration.footer.improving')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentView={currentView} onViewChange={handleViewChange} />
      </div>
    </FeatureTransitionProvider>
  );
};

export default SystemIntegrationHub;