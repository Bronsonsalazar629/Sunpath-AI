import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../../shared/themes';
import { STORAGE_KEYS } from '../../shared/constants/app';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();

    // Disable automatic system theme changes - use manual toggle instead
    // This ensures consistent light mode UI by default
    // const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    //   if (colorScheme) {
    //     setIsDarkMode(colorScheme === 'dark');
    //   }
    // });

    // return () => subscription?.remove();
  }, []);

  const loadThemePreference = async () => {
    try {
      // ONE-TIME RESET: Force light mode to fix dark mode issue
      // After this runs once, remove these 3 lines and uncomment the code below
      setIsDarkMode(false);
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, 'light');

      // UNCOMMENT AFTER FIRST RUN TO RESPECT USER PREFERENCE:
      // const savedTheme = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
      // if (savedTheme) {
      //   // Respect user's saved preference
      //   setIsDarkMode(savedTheme === 'dark');
      // } else {
      //   // Default to light mode for pristine white UI on first launch
      //   setIsDarkMode(false);
      //   await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, 'light');
      // }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      // Fallback to light mode even if storage fails
      setIsDarkMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const currentTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      // Override with current mode colors
      current: isDarkMode ? theme.colors.dark : theme.colors.light,
    },
    isDarkMode,
  };

  const value = {
    theme: currentTheme,
    isDarkMode,
    toggleTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};