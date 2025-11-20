import { useState, useEffect } from 'react';
import SystemIntegrationHub from '@/components/integration/SystemIntegrationHub';
import { WelcomeScreen } from '@/components/WelcomeScreen';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Check if user has seen welcome screen
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <SystemIntegrationHub
      initialCulturalBackground="multicultural"
      userPreferences={{
        privacy: 'moderate',
        communication: 'adaptive',
        family: 'inclusive'
      }}
    />
  );
};

export default Index;
