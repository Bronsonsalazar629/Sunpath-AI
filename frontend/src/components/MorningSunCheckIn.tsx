import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sun, Heart, Globe, Users } from "lucide-react";
import sunriseHero from "@/assets/sunrise-hero.jpg";
import { useTranslation } from "react-i18next";

interface CulturalGreeting {
  id: string;
  greeting: string;
  language: string;
  cultural_context: string;
}

const MorningSunCheckIn = () => {
  const { t } = useTranslation();
  const culturalGreetings: CulturalGreeting[] = [
    {
      id: "spanish",
      greeting: t('morningSun.greetings.spanish'),
      language: "Español",
      cultural_context: t('morningSun.culturalContext.spanish')
    },
    {
      id: "english",
      greeting: t('morningSun.greetings.english'),
      language: "English",
      cultural_context: t('morningSun.culturalContext.english')
    },
    {
      id: "mandarin",
      greeting: t('morningSun.greetings.mandarin'),
      language: "中文",
      cultural_context: t('morningSun.culturalContext.mandarin')
    },
    {
      id: "arabic",
      greeting: t('morningSun.greetings.arabic'),
      language: "العربية",
      cultural_context: t('morningSun.culturalContext.arabic')
    }
  ];
  const [selectedGreeting, setSelectedGreeting] = useState<CulturalGreeting>(culturalGreetings[1]);
  const [currentStep, setCurrentStep] = useState<'greeting' | 'checkin'>('greeting');

  const handleBeginCheckIn = () => {
    setCurrentStep('checkin');
  };

  if (currentStep === 'greeting') {
    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Hero Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${sunriseHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/30 to-background/90"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm mb-6 breathe">
              <Sun className="w-10 h-10 text-primary" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-wisdom bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
              {t('common.appName')}
            </h1>

            <p className="text-xl text-gentle max-w-2xl mx-auto mb-8">
              {t('morningSun.hero.tagline')}
            </p>
          </div>

          {/* Cultural Greeting Selection */}
          <Card className="card-embrace p-8 max-w-lg w-full mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-wisdom mb-2">
                {selectedGreeting.greeting}
              </h2>
              <p className="text-gentle text-sm">
                {selectedGreeting.cultural_context}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {culturalGreetings.map((greeting) => (
                <button
                  key={greeting.id}
                  onClick={() => setSelectedGreeting(greeting)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedGreeting.id === greeting.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-secondary bg-card'
                  }`}
                >
                  <div className="font-medium text-sm">{greeting.language}</div>
                </button>
              ))}
            </div>

            <Button
              onClick={handleBeginCheckIn}
              className="btn-sunrise w-full text-lg py-6"
            >
              <Heart className="w-5 h-5 mr-2" />
              {t('morningSun.hero.beginButton')}
            </Button>
          </Card>

          {/* Cultural Sensitivity Indicators */}
          <div className="flex items-center gap-6 text-gentle text-sm">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>{t('morningSun.hero.culturesHonored')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{t('morningSun.hero.allAgesWelcome')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <EmotionalAssessment selectedGreeting={selectedGreeting} />;
};

const EmotionalAssessment = ({ selectedGreeting }: { selectedGreeting: CulturalGreeting }) => {
  const { t } = useTranslation();
  const [emotions, setEmotions] = useState<Record<string, number>>({});

  const emotionalDimensions = [
    { key: 'joy', label: t('morningSun.dimensions.joy.label'), icon: '😊', cultural: t('morningSun.dimensions.joy.cultural') },
    { key: 'calm', label: t('morningSun.dimensions.calm.label'), icon: '🕊️', cultural: t('morningSun.dimensions.calm.cultural') },
    { key: 'connection', label: t('morningSun.dimensions.connection.label'), icon: '🤝', cultural: t('morningSun.dimensions.connection.cultural') },
    { key: 'family', label: t('morningSun.dimensions.family.label'), icon: '👨‍👩‍👧‍👦', cultural: t('morningSun.dimensions.family.cultural') },
    { key: 'purpose', label: t('morningSun.dimensions.purpose.label'), icon: '🌟', cultural: t('morningSun.dimensions.purpose.cultural') },
    { key: 'environment', label: t('morningSun.dimensions.environment.label'), icon: '🌿', cultural: t('morningSun.dimensions.environment.cultural') }
  ];

  const updateEmotion = (key: string, value: number) => {
    setEmotions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wisdom mb-2">
            {selectedGreeting.greeting}
          </h1>
          <p className="text-gentle">
            {t('morningSun.shareYourHeart')}
          </p>
        </div>

        {/* Emotional Dimensions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {emotionalDimensions.map((dimension) => (
            <Card key={dimension.key} className="card-warm p-6">
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{dimension.icon}</div>
                <h3 className="font-semibold text-wisdom mb-1">{dimension.label}</h3>
                <p className="text-sm text-gentle">{dimension.cultural}</p>
              </div>

              {/* Gentle Emotion Scale */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gentle">
                  <span>{t('morningSun.scale.struggling')}</span>
                  <span>{t('morningSun.scale.flourishing')}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={emotions[dimension.key] || 5}
                    onChange={(e) => updateEmotion(dimension.key, Number(e.target.value))}
                    className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer slider-primary"
                  />
                  <div className="text-center mt-2 text-sm font-medium text-primary">
                    {emotions[dimension.key] || 5}/10
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button className="btn-sunrise px-8 py-3 text-lg">
            <Heart className="w-5 h-5 mr-2" />
            {t('morningSun.completeCheckIn')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MorningSunCheckIn;