import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Heart,
  MessageCircle,
  Map,
  BarChart3,
  BookOpen,
  Settings,
  Users,
  Globe,
  Shield,
  Star,
  Compass,
  Brain,
  TreePine
} from 'lucide-react';

interface CulturalNavigationProps {
  culturalBackground: string;
  currentView: string;
  onViewChange: (view: string) => void;
  urgencyLevel?: 'low' | 'medium' | 'high';
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  culturalRelevance: string[];
  urgencyAccess: boolean;
  badge?: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Your Wellness Home',
    icon: Home,
    description: 'Your personal cultural wellness space',
    culturalRelevance: ['all'],
    urgencyAccess: true
  },
  {
    id: 'checkin',
    label: 'Morning Sun Check-In',
    icon: Heart,
    description: 'Daily culturally-aware wellness reflection',
    culturalRelevance: ['collectivist', 'individualist', 'spiritual'],
    urgencyAccess: true
  },
  {
    id: 'conversation',
    label: 'Cultural Conversation',
    icon: MessageCircle,
    description: 'AI companion that understands your cultural communication style',
    culturalRelevance: ['high-context', 'low-context', 'relationship-focused'],
    urgencyAccess: true,
    badge: 'AI-Powered'
  },
  {
    id: 'canvas',
    label: 'Emotion Canvas',
    icon: TreePine,
    description: 'Express emotions through cultural symbols and art',
    culturalRelevance: ['artistic', 'visual', 'expressive'],
    urgencyAccess: false
  },
  {
    id: 'resources',
    label: 'Cultural Resource Map',
    icon: Map,
    description: 'Discover culturally-appropriate support in your area',
    culturalRelevance: ['community-focused', 'location-based'],
    urgencyAccess: true
  },
  {
    id: 'analytics',
    label: 'Wisdom Insights',
    icon: BarChart3,
    description: 'Beautiful data about your cultural wellness journey',
    culturalRelevance: ['data-driven', 'progress-focused'],
    urgencyAccess: false,
    badge: 'Personal AI'
  },
  {
    id: 'research',
    label: 'Community Wisdom',
    icon: BookOpen,
    description: 'Contribute to cultural mental health understanding',
    culturalRelevance: ['community-oriented', 'knowledge-sharing'],
    urgencyAccess: false
  },
  {
    id: 'family',
    label: 'Family & Community',
    icon: Users,
    description: 'Include your support network in your wellness journey',
    culturalRelevance: ['family-centered', 'collectivist'],
    urgencyAccess: true
  }
];

const CulturalNavigation: React.FC<CulturalNavigationProps> = ({
  culturalBackground,
  currentView,
  onViewChange,
  urgencyLevel = 'low'
}) => {
  const { t } = useTranslation();
  const [navigationMode, setNavigationMode] = useState<'cultural' | 'crisis' | 'all'>('cultural');

  const getCulturallyRelevantItems = () => {
    return navigationItems.filter(item => 
      item.culturalRelevance.includes('all') || 
      item.culturalRelevance.some(relevance => 
        culturalBackground.toLowerCase().includes(relevance)
      )
    );
  };

  const getUrgencyItems = () => {
    return navigationItems.filter(item => item.urgencyAccess);
  };

  const getCulturalNavigationStyle = () => {
    const baseClasses = "transition-all duration-300";
    
    if (culturalBackground.includes('collectivist')) {
      return `${baseClasses} grid-cols-2 gap-6`; // Wider, more inclusive layout
    } else if (culturalBackground.includes('individualist')) {
      return `${baseClasses} grid-cols-1 gap-4`; // Focused, personal layout
    } else if (culturalBackground.includes('high-context')) {
      return `${baseClasses} grid-cols-2 gap-8`; // More spacious, environmental context
    } else {
      return `${baseClasses} grid-cols-3 gap-4`; // Clean, direct layout
    }
  };

  const renderNavigationItem = (item: NavigationItem) => {
    const Icon = item.icon;
    const isActive = currentView === item.id;
    
    return (
      <Card 
        key={item.id}
        className={`p-4 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
          isActive 
            ? 'border-primary bg-primary/5 shadow-lg' 
            : 'border-border hover:border-primary/50'
        }`}
        onClick={() => onViewChange(item.id)}
      >
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{item.label}</h3>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Cultural Navigation Header */}
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          {t('culturalNavigation.journeyTitle')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('culturalNavigation.featuresTitle')}
        </p>
      </div>

      {/* Navigation Mode Selector */}
      <Tabs value={navigationMode} onValueChange={(value: any) => setNavigationMode(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cultural" className="text-xs">
            <Compass className="h-4 w-4 mr-1" />
            {t('integration.tabs.navigation')}
          </TabsTrigger>
          <TabsTrigger value="crisis" className="text-xs">
            <Shield className="h-4 w-4 mr-1" />
            {t('culturalNavigation.quickAccessTitle')}
          </TabsTrigger>
          <TabsTrigger value="all" className="text-xs">
            <Globe className="h-4 w-4 mr-1" />
            {t('culturalNavigation.allFeatures')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cultural" className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('culturalNavigation.relevantFeatures')}
            </p>
          </div>
          <div className={`grid ${getCulturalNavigationStyle()}`}>
            {getCulturallyRelevantItems().map(renderNavigationItem)}
          </div>
        </TabsContent>

        <TabsContent value="crisis" className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('resourceMap.crisis.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {getUrgencyItems().map(renderNavigationItem)}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {t('culturalNavigation.yourWellnessHome')}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {navigationItems.map(renderNavigationItem)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Cultural Context Indicator */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-center space-x-3">
          <Star className="h-5 w-5 text-primary" />
          <div>
            <h4 className="font-medium text-sm">{t('culturalNavigation.adaptationActive')}</h4>
            <p className="text-xs text-muted-foreground">
              {t('culturalNavigation.interfaceAdapted')}
            </p>
          </div>
        </div>
      </Card>

      {/* AI Integration Status */}
      <Card className="p-4 bg-secondary/50 border-secondary">
        <div className="flex items-center space-x-3">
          <Brain className="h-5 w-5 text-secondary-foreground" />
          <div>
            <h4 className="font-medium text-sm">{t('aiCulturalIntelligence.title')}</h4>
            <p className="text-xs text-muted-foreground">
              {t('aiCulturalIntelligence.description')}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CulturalNavigation;