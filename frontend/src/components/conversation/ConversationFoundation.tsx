import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CulturalConversationInterface } from './CulturalConversationInterface';
import { CulturalStyleAdapter } from './CulturalStyleAdapter';
import { MultiCulturalLanguageInterface } from './MultiCulturalLanguageInterface';
import { MessageCircle, Settings, Languages, Sparkles, Brain, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import sunpathLogo from '@/assets/sunpath-ai-logo.png';
import { useTranslation } from 'react-i18next';

interface ConversationFoundationProps {
  className?: string;
}

export function ConversationFoundation({ className }: ConversationFoundationProps) {
  const { t } = useTranslation();
  const [culturalStyle, setCulturalStyle] = useState<'collectivist' | 'individualist' | 'high-context' | 'direct'>('individualist');
  const [aiReadiness, setAiReadiness] = useState(false);

  const conversationCapabilities = [
    {
      icon: Brain,
      title: t('conversation.capabilities.aiUnderstanding'),
      description: t('conversation.capabilities.aiUnderstandingDesc'),
      status: t('conversation.status.active')
    },
    {
      icon: Heart,
      title: t('conversation.capabilities.culturalEmotion'),
      description: t('conversation.capabilities.culturalEmotionDesc'),
      status: t('conversation.status.frameworkActive')
    },
    {
      icon: Languages,
      title: t('conversation.capabilities.multilingual'),
      description: t('conversation.capabilities.multilingualDesc'),
      status: t('conversation.status.interfaceReady')
    },
    {
      icon: MessageCircle,
      title: t('conversation.capabilities.adaptiveFlow'),
      description: t('conversation.capabilities.adaptiveFlowDesc'),
      status: t('conversation.status.frameworkComplete')
    }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Logo and Vision */}
      <Card className="p-6 bg-gradient-to-r from-background via-primary/5 to-accent/5 border border-primary/20">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={sunpathLogo} 
            alt="SunPath AI" 
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('conversation.foundationTitle')}</h1>
            <p className="text-muted-foreground">{t('conversation.foundationDesc')}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conversationCapabilities.map((capability, index) => (
            <div key={index} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <capability.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground text-sm">{capability.title}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{capability.description}</p>
              <Badge variant="secondary" className="text-xs">
                {capability.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Main Conversation Interface */}
      <Tabs defaultValue="conversation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversation" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {t('conversation.liveConversation')}
          </TabsTrigger>
          <TabsTrigger value="cultural-setup" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            {t('conversation.culturalSetup')}
          </TabsTrigger>
          <TabsTrigger value="language-setup" className="flex items-center gap-2">
            <Languages className="w-4 h-4" />
            {t('conversation.languageSetup')}
          </TabsTrigger>
          <TabsTrigger value="ai-integration" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {t('conversation.aiIntegration')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conversation" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CulturalConversationInterface 
                culturalStyle={culturalStyle}
                className="h-full"
              />
            </div>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  {t('conversation.quickStyleSwitch')}
                </h4>
                <div className="space-y-2">
                  {(['collectivist', 'individualist', 'high-context', 'direct'] as const).map((style) => (
                    <Button
                      key={style}
                      variant={culturalStyle === style ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => setCulturalStyle(style)}
                    >
                      {t(`conversation.styles.${style}`)}
                    </Button>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium text-foreground mb-3">{t('conversation.conversationAnalytics')}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('conversation.culturalAdaptation')}</span>
                    <Badge variant="secondary">{t('conversation.status.active')}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('conversation.languageDetection')}</span>
                    <Badge variant="secondary">{t('conversation.multiLingual')}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('conversation.emotionalContext')}</span>
                    <Badge variant="secondary">{t('conversation.recognized')}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('conversation.culturalComfort')}</span>
                    <Badge className="bg-green-100 text-green-800">{t('conversation.high')}</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cultural-setup">
          <CulturalStyleAdapter 
            onStyleChange={(profile) => {
              setCulturalStyle(profile.style as any);
            }}
          />
        </TabsContent>

        <TabsContent value="language-setup">
          <MultiCulturalLanguageInterface />
        </TabsContent>

        <TabsContent value="ai-integration" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{t('conversation.advancedAiTitle')}</h3>
                <p className="text-sm text-muted-foreground">{t('conversation.deepSeekDesc')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">{t('conversation.culturalFeatures')}</h4>
                <div className="space-y-3">
                  {[
                    t('conversation.features.culturalContext'),
                    t('conversation.features.emotionRecognition'),
                    t('conversation.features.adaptiveStyles'),
                    t('conversation.features.multilingualConv'),
                    t('conversation.features.familyDynamics'),
                    t('conversation.features.culturalMetaphors')
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">{t('conversation.integrationPoints')}</h4>
                <div className="space-y-3">
                  <Card className="p-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('conversation.integration.deepSeek')}</span>
                      <Badge className="bg-green-100 text-green-800">{t('conversation.status.active')}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t('conversation.integration.deepSeekDesc')}</p>
                  </Card>
                  
                  <Card className="p-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('conversation.integration.voice')}</span>
                      <Badge className="bg-purple-100 text-purple-800">{t('conversation.status.frameworkReady')}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t('conversation.integration.voiceDesc')}</p>
                  </Card>
                  
                  <Card className="p-3 border border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t('conversation.integration.ml')}</span>
                      <Badge className="bg-green-100 text-green-800">{t('conversation.status.interfaceComplete')}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{t('conversation.integration.mlDesc')}</p>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <h4 className="font-medium text-foreground mb-2">{t('conversation.activeCapabilities')}</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ {t('conversation.capabilitiesList.processing')}</li>
                <li>✓ {t('conversation.capabilitiesList.understanding')}</li>
                <li>✓ {t('conversation.capabilitiesList.multilingual')}</li>
                <li>✓ {t('conversation.capabilitiesList.responses')}</li>
              </ul>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}