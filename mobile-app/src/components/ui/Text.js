import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export const Text = ({
  children,
  variant = 'body',
  weight = 'normal',
  color,
  align = 'left',
  style,
  numberOfLines,
  ellipsizeMode,
  onPress,
  testID,
  accessible,
  accessibilityLabel,
  ...otherProps
}) => {
  const { theme, isDarkMode } = useTheme();

  // Only pass known valid React Native Text props
  const validProps = {
    numberOfLines,
    ellipsizeMode,
    onPress,
    testID,
    accessible,
    accessibilityLabel,
  };

  // Filter out undefined props
  const filteredProps = Object.keys(validProps).reduce((acc, key) => {
    if (validProps[key] !== undefined) {
      acc[key] = validProps[key];
    }
    return acc;
  }, {});

  const getTextStyle = () => {
    // Variant styles (typography scale)
    const variantStyles = {
      // Headings
      h1: {
        fontSize: parseFloat(theme.typography.fontSize['5xl'].replace('rem', '')) * 16,
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: parseFloat(theme.typography.fontSize['5xl'].replace('rem', '')) * 16 * 1.2,
      },
      h2: {
        fontSize: parseFloat(theme.typography.fontSize['4xl'].replace('rem', '')) * 16,
        fontWeight: theme.typography.fontWeight.bold,
        lineHeight: parseFloat(theme.typography.fontSize['4xl'].replace('rem', '')) * 16 * 1.25,
      },
      h3: {
        fontSize: parseFloat(theme.typography.fontSize['3xl'].replace('rem', '')) * 16,
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: parseFloat(theme.typography.fontSize['3xl'].replace('rem', '')) * 16 * 1.3,
      },
      h4: {
        fontSize: parseFloat(theme.typography.fontSize['2xl'].replace('rem', '')) * 16,
        fontWeight: theme.typography.fontWeight.semibold,
        lineHeight: parseFloat(theme.typography.fontSize['2xl'].replace('rem', '')) * 16 * 1.35,
      },
      h5: {
        fontSize: parseFloat(theme.typography.fontSize['xl'].replace('rem', '')) * 16,
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: parseFloat(theme.typography.fontSize['xl'].replace('rem', '')) * 16 * 1.4,
      },
      h6: {
        fontSize: parseFloat(theme.typography.fontSize['lg'].replace('rem', '')) * 16,
        fontWeight: theme.typography.fontWeight.medium,
        lineHeight: parseFloat(theme.typography.fontSize['lg'].replace('rem', '')) * 16 * 1.4,
      },

      // Body text
      body: {
        fontSize: parseFloat(theme.typography.fontSize.base.replace('rem', '')) * 16,
        lineHeight: parseFloat(theme.typography.fontSize.base.replace('rem', '')) * 16 * 1.5,
      },
      bodyLarge: {
        fontSize: parseFloat(theme.typography.fontSize.lg.replace('rem', '')) * 16,
        lineHeight: parseFloat(theme.typography.fontSize.lg.replace('rem', '')) * 16 * 1.5,
      },
      bodySmall: {
        fontSize: parseFloat(theme.typography.fontSize.sm.replace('rem', '')) * 16,
        lineHeight: parseFloat(theme.typography.fontSize.sm.replace('rem', '')) * 16 * 1.5,
      },

      // Utility text
      caption: {
        fontSize: parseFloat(theme.typography.fontSize.xs.replace('rem', '')) * 16,
        lineHeight: parseFloat(theme.typography.fontSize.xs.replace('rem', '')) * 16 * 1.4,
      },
      overline: {
        fontSize: parseFloat(theme.typography.fontSize.xs.replace('rem', '')) * 16,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        fontWeight: theme.typography.fontWeight.medium,
      },
    };

    // Weight styles
    const weightStyles = {
      light: { fontWeight: theme.typography.fontWeight.light },
      normal: { fontWeight: theme.typography.fontWeight.normal },
      medium: { fontWeight: theme.typography.fontWeight.medium },
      semibold: { fontWeight: theme.typography.fontWeight.semibold },
      bold: { fontWeight: theme.typography.fontWeight.bold },
      extrabold: { fontWeight: theme.typography.fontWeight.extrabold },
    };

    // Color handling
    const getTextColor = () => {
      if (color) {
        // Check if it's a theme color path (e.g., 'brand.primary')
        if (color.includes('.')) {
          const colorPath = color.split('.');
          let themeColor = theme?.colors;

          try {
            for (const path of colorPath) {
              if (themeColor && themeColor[path]) {
                themeColor = themeColor[path];
              } else {
                // Path not found, return default
                return isDarkMode ? '#F8F9FA' : '#1E293B';
              }
            }
            return themeColor || (isDarkMode ? '#F8F9FA' : '#1E293B');
          } catch (error) {
            // Fallback to default color
            return isDarkMode ? '#F8F9FA' : '#1E293B';
          }
        }
        // Direct color value
        return color;
      }

      // Default text color based on theme
      return isDarkMode
        ? (theme?.colors?.dark?.text || '#F8F9FA')
        : (theme?.colors?.light?.text || '#1E293B');
    };

    return [
      {
        fontFamily: theme?.typography?.fontFamily?.primary || 'System',
        color: getTextColor(),
        textAlign: align,
      },
      variantStyles[variant] || {},
      weightStyles[weight] || {},
      style,
    ];
  };

  return (
    <RNText style={getTextStyle()} {...filteredProps}>
      {children}
    </RNText>
  );
};