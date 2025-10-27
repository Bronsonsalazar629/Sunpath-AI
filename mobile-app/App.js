import React, { useState } from 'react';
import { View, TouchableOpacity, Text as RNText, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/SafeAuthContext';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import CulturalWelcomeJourney from './src/screens/onboarding/CulturalWelcomeJourney';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import HomeScreen from './src/screens/HomeScreen';
import MorningSunCheckIn from './src/screens/MorningSunCheckIn';
import AIChat from './src/screens/AIChat';
import Analytics from './src/screens/Analytics';
import ResourceDiscoveryMap from './src/screens/ResourceDiscoveryMap';
import Settings from './src/screens/Settings';
import JournalScreen from './src/screens/JournalScreen';
import ResearchPlatform from './src/screens/ResearchPlatform';

export default function App() {
  const [screen, setScreen] = useState('Splash');
  const [history, setHistory] = useState(['Splash']);

  const navigate = (screenName) => {
    setScreen(screenName);
    setHistory([...history, screenName]);
  };

  const replace = (screenName) => {
    setScreen(screenName);
    setHistory([screenName]);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setScreen(newHistory[newHistory.length - 1]);
    }
  };

  const navigation = { navigate, replace, goBack };

  // Tab screens
  const tabScreens = ['Home', 'CheckIn', 'Chat', 'Insights', 'Impact'];
  const showTabBar = tabScreens.includes(screen);

  const renderScreen = () => {
    // Auto-redirect Main to Home so tab bar shows
    if (screen === 'Main') {
      setScreen('Home');
      return <HomeScreen navigation={navigation} />;
    }

    switch(screen) {
      case 'Splash': return <SplashScreen navigation={navigation} />;
      case 'Onboarding': return <CulturalWelcomeJourney navigation={navigation} />;
      case 'Login': return <Login navigation={navigation} />;
      case 'Register': return <Register navigation={navigation} />;
      case 'Home': return <HomeScreen navigation={navigation} />;
      case 'CheckIn': return <MorningSunCheckIn navigation={navigation} />;
      case 'Chat': return <AIChat navigation={navigation} />;
      case 'AIChat': return <AIChat navigation={navigation} />;
      case 'Insights': return <Analytics navigation={navigation} />;
      case 'Analytics': return <Analytics navigation={navigation} />;
      case 'Impact': return <ResourceDiscoveryMap navigation={navigation} />;
      case 'ResourceMap': return <ResourceDiscoveryMap navigation={navigation} />;
      case 'Settings': return <Settings navigation={navigation} />;
      case 'Journal': return <JournalScreen navigation={navigation} />;
      case 'Research': return <ResearchPlatform navigation={navigation} />;
      default: return <HomeScreen navigation={navigation} />;
    }
  };

  const TabButton = ({ name, icon, label, active }) => (
    <TouchableOpacity
      style={styles.tabButton}
      onPress={() => navigate(name)}
    >
      <Ionicons
        name={icon}
        size={24}
        color={active ? '#FBBF24' : '#6B7280'}
      />
      <RNText style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </RNText>
    </TouchableOpacity>
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {renderScreen()}
          </View>

          {showTabBar && (
            <View style={styles.tabBar}>
              <TabButton name="Home" icon="home" label="Home" active={screen === 'Home'} />
              <TabButton name="CheckIn" icon="sunny" label="Check In" active={screen === 'CheckIn'} />
              <TabButton name="Chat" icon="chatbubbles" label="Chat" active={screen === 'Chat'} />
              <TabButton name="Insights" icon="analytics" label="Insights" active={screen === 'Insights'} />
              <TabButton name="Impact" icon="leaf" label="Impact" active={screen === 'Impact'} />
            </View>
          )}

          <StatusBar style="auto" />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#FBBF24',
    fontWeight: '600',
  },
});
