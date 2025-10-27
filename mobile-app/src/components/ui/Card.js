import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const Card = ({
  children,
  variant = 'default',
  padding = 'lg',
  style,
  onPress,
  ...props
}) => {
  const { theme, isDarkMode } = useTheme();

  const getCardStyle = () => {
    const baseStyle = {
      borderRadius: parseFloat(theme.borderRadius.xl.replace('rem', '')) * 16,
    };

    // Padding variants
    const paddingStyles = {
      none: { padding: 0 },
      sm: { padding: parseFloat(theme.spacing.md.replace('rem', '')) * 16 },
      md: { padding: parseFloat(theme.spacing.lg.replace('rem', '')) * 16 },
      lg: { padding: parseFloat(theme.spacing.xl.replace('rem', '')) * 16 },
      xl: { padding: parseFloat(theme.spacing['2xl'].replace('rem', '')) * 16 },
    };

    // Variant styles
    const variantStyles = {
      default: {
        shadowColor: theme.colors.gray[900],
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
      },
      elevated: {
        shadowColor: theme.colors.gray[900],
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
      },
      flat: {
        shadowOpacity: 0,
        elevation: 0,
        borderWidth: 1,
        borderColor: isDarkMode ? theme.colors.dark.border : theme.colors.light.border,
      },
      primary: {
        backgroundColor: theme.colors.brand.primary,
        shadowColor: theme.colors.brand.primary,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      },
    };

    // Force white background AFTER all other styles to ensure it cannot be overridden
    const forcedBackgroundStyle = variant !== 'primary'
      ? { backgroundColor: isDarkMode ? theme.colors.dark.surface : '#FFFFFF' }
      : {};

    return [
      baseStyle,
      paddingStyles[padding],
      variantStyles[variant],
      style,
      forcedBackgroundStyle, // Force white background last (except for primary variant)
    ];
  };

  const CardWrapper = onPress ? Pressable : View;

  return (
    <CardWrapper
      style={getCardStyle()}
      onPress={onPress}
      {...props}
    >
      {children}
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  // Additional styles can be added here if needed
});