import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  ArrowLeft,
  Globe,
  Building,
  Brain,
  Target
} from "lucide-react";
import AcademicResearchInterface from "./research/AcademicResearchInterface";
import CrossCulturalDashboard from "./research/CrossCulturalDashboard";
import PolicySupportInterface from "./research/PolicySupportInterface";
import MLInsightsVisualization from "./research/MLInsightsVisualization";

interface ResearchPlatformProps {
  onBack: () => void;
}

const ResearchPlatform = ({ onBack }: ResearchPlatformProps) => {
  const { t } = useTranslation();
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  if (activeComponent === 'academic') {
    return <AcademicResearchInterface />;
  }

  if (activeComponent === 'cross-cultural') {
    return <CrossCulturalDashboard />;
  }

  if (activeComponent === 'policy') {
    return <PolicySupportInterface />;
  }

  if (activeComponent === 'ml-insights') {
    return <MLInsightsVisualization />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="mr-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-wisdom">{t('research.title')}</h1>
              <p className="text-sm text-gentle">{t('research.subtitle')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Platform Overview */}
        <Card className="card-warm p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-wisdom mb-4">
              {t('research.buildingFuture')}
            </h2>
            <p className="text-gentle max-w-3xl mx-auto mb-6">
              {t('research.participationDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{t('research.tags.anonymous')}</span>
              <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">{t('research.tags.controlled')}</span>
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">{t('research.tags.reviewed')}</span>
              <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-sm">{t('research.tags.benefit')}</span>
            </div>
          </div>
        </Card>

        {/* Research Platform Modules */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setActiveComponent('academic')}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-wisdom mb-2">{t('research.academic.title')}</h3>
                <p className="text-gentle text-sm mb-4">
                  {t('research.academic.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{t('research.academic.tags.control')}</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{t('research.academic.tags.tracking')}</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{t('research.academic.tags.approved')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setActiveComponent('cross-cultural')}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-wisdom mb-2">{t('research.crossCultural.title')}</h3>
                <p className="text-gentle text-sm mb-4">
                  {t('research.crossCultural.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{t('research.crossCultural.tags.analysis')}</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{t('research.crossCultural.tags.effectiveness')}</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{t('research.crossCultural.tags.strengths')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setActiveComponent('policy')}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-wisdom mb-2">{t('research.policy.title')}</h3>
                <p className="text-gentle text-sm mb-4">
                  {t('research.policy.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{t('research.policy.tags.impact')}</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{t('research.policy.tags.gaps')}</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{t('research.policy.tags.funding')}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="card-embrace p-6 cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setActiveComponent('ml-insights')}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-wisdom mb-2">{t('research.mlInsights.title')}</h3>
                <p className="text-gentle text-sm mb-4">
                  {t('research.mlInsights.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{t('research.mlInsights.tags.transparency')}</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">{t('research.mlInsights.tags.detection')}</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded">{t('research.mlInsights.tags.fairness')}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Research Impact Summary */}
        <Card className="card-warm p-6 mt-8">
          <h3 className="text-lg font-semibold text-wisdom mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {t('research.impact.title')}
          </h3>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">47</div>
              <div className="text-sm text-wisdom">{t('research.impact.papers')}</div>
              <div className="text-xs text-gentle">{t('research.impact.papersDesc')}</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
              <div className="text-2xl font-bold text-secondary mb-1">156K</div>
              <div className="text-sm text-wisdom">{t('research.impact.peopleHelped')}</div>
              <div className="text-xs text-gentle">{t('research.impact.peopleHelpedDesc')}</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">$47.8M</div>
              <div className="text-sm text-wisdom">{t('research.impact.funding')}</div>
              <div className="text-xs text-gentle">{t('research.impact.fundingDesc')}</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
              <div className="text-sm text-wisdom">{t('research.impact.approval')}</div>
              <div className="text-xs text-gentle">{t('research.impact.approvalDesc')}</div>
            </div>
          </div>
        </Card>

        {/* Ethical Commitment */}
        <Card className="card-embrace p-6 mt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-wisdom mb-2">{t('research.commitment.title')}</h3>
            <p className="text-gentle text-sm max-w-3xl mx-auto">
              {t('research.commitment.description')}
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ResearchPlatform;