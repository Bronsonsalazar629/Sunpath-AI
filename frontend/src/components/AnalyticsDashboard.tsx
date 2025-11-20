import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import {
  BarChart3,
  TrendingUp,
  Users,
  Brain,
  Activity,
  ArrowLeft
} from "lucide-react";
import PersonalCulturalDashboard, {
  PredictiveIntelligenceCenter,
  EnvironmentalWellnessInsights
} from "./analytics/PersonalCulturalDashboard";
import CommunityCulturalHealthInsights from "./analytics/CommunityCulturalHealthInsights";
import HealthcareProviderInsights from "./analytics/HealthcareProviderInsights";

const AnalyticsDashboard = () => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'overview' | 'personal' | 'predictive' | 'environmental' | 'community' | 'provider'>('overview');

  const handleBackToOverview = () => {
    setActiveView('overview');
  };

  if (activeView === 'personal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToOverview}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('analytics.backToAnalytics')}
            </Button>
          </div>
          <PersonalCulturalDashboard />
        </div>
      </div>
    );
  }

  if (activeView === 'predictive') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToOverview}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('analytics.backToAnalytics')}
            </Button>
          </div>
          <PredictiveIntelligenceCenter />
        </div>
      </div>
    );
  }

  if (activeView === 'environmental') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToOverview}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('analytics.backToAnalytics')}
            </Button>
          </div>
          <EnvironmentalWellnessInsights />
        </div>
      </div>
    );
  }

  if (activeView === 'community') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToOverview}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('analytics.backToAnalytics')}
            </Button>
          </div>
          <CommunityCulturalHealthInsights />
        </div>
      </div>
    );
  }

  if (activeView === 'provider') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 p-4">
        <div className="max-w-7xl mx-auto py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={handleBackToOverview}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('analytics.backToAnalytics')}
            </Button>
          </div>
          <HealthcareProviderInsights />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-wisdom">{t('analytics.title')}</h1>
                <p className="text-sm text-gentle">{t('analytics.subtitle')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <Card className="card-warm p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-wisdom mb-4">
              {t('analytics.transformData')}
            </h2>
            <p className="text-gentle text-lg max-w-3xl mx-auto leading-relaxed">
              {t('analytics.transformDesc')}
            </p>
          </div>
        </Card>

        {/* Analytics Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Personal Analytics */}
          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform group"
            onClick={() => setActiveView('personal')}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-wisdom mb-2">{t('analytics.personalCultural.title')}</h3>
                <p className="text-gentle mb-4">
                  {t('analytics.personalCultural.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{t('analytics.personalCultural.tags.visualization')}</span>
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">{t('analytics.personalCultural.tags.analysis')}</span>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{t('analytics.personalCultural.tags.insights')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform group"
            onClick={() => setActiveView('predictive')}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-wisdom mb-2">{t('analytics.predictive.title')}</h3>
                <p className="text-gentle mb-4">
                  {t('analytics.predictive.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{t('analytics.predictive.tags.warning')}</span>
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">{t('analytics.predictive.tags.sensitivity')}</span>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{t('analytics.predictive.tags.predictions')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform group"
            onClick={() => setActiveView('environmental')}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-wisdom mb-2">{t('analytics.environmental.title')}</h3>
                <p className="text-gentle mb-4">
                  {t('analytics.environmental.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{t('analytics.environmental.tags.spatial')}</span>
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">{t('analytics.environmental.tags.time')}</span>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{t('analytics.environmental.tags.spaces')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform group"
            onClick={() => setActiveView('community')}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-wisdom mb-2">{t('analytics.community.title')}</h3>
                <p className="text-gentle mb-4">
                  {t('analytics.community.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{t('analytics.community.tags.trends')}</span>
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">{t('analytics.community.tags.anonymous')}</span>
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">{t('analytics.community.tags.resilience')}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Provider Portal */}
        <Card className="card-warm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-wisdom flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-wisdom">{t('analytics.provider.title')}</h3>
                <p className="text-gentle">{t('analytics.provider.description')}</p>
              </div>
            </div>

            <Button
              onClick={() => setActiveView('provider')}
              className="btn-sunrise"
            >
              {t('analytics.provider.accessButton')}
            </Button>
          </div>
        </Card>

        {/* Cultural Ethics Notice */}
        <Card className="card-embrace p-6 mt-8">
          <div className="text-center">
            <h4 className="font-semibold text-wisdom mb-3">{t('analytics.ethics.title')}</h4>
            <p className="text-gentle text-sm max-w-4xl mx-auto leading-relaxed">
              {t('analytics.ethics.description')}
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;