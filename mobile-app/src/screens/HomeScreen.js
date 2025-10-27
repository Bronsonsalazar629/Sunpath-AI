import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Card } from '../components/ui';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from '../i18n/config';
import ApiService from '../services/api';
import { StreakWidget } from '../components/StreakWidget';

export default function HomeScreen({ navigation }) {
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wellnessMetrics, setWellnessMetrics] = useState([
    {
      label: t('dashboard.wellnessMetrics.heartHarmony.label'),
      value: 8.2,
      trend: 'up',
      context: t('dashboard.wellnessMetrics.heartHarmony.context')
    },
    {
      label: t('dashboard.wellnessMetrics.communityConnection.label'),
      value: 7.5,
      trend: 'stable',
      context: t('dashboard.wellnessMetrics.communityConnection.context')
    },
    {
      label: t('dashboard.wellnessMetrics.innerPeace.label'),
      value: 6.8,
      trend: 'up',
      context: t('dashboard.wellnessMetrics.innerPeace.context')
    },
    {
      label: t('dashboard.wellnessMetrics.culturalPride.label'),
      value: 9.1,
      trend: 'up',
      context: t('dashboard.wellnessMetrics.culturalPride.context')
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWellnessData();
  }, []);

  const fetchWellnessData = async () => {
    // API disabled for demo - using default wellness metrics
    // Backend works on localhost but can't connect from mobile due to proxy restrictions
    console.log('Using default wellness metrics for demo');
    return;
  };

  const userName = "Bronson";

  const getGreetingByTime = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return { text: t('greetings.goodMorning', { name: userName }), icon: "sunny" };
    if (hour < 17) return { text: t('greetings.goodAfternoon', { name: userName }), icon: "sparkles" };
    if (hour < 21) return { text: t('greetings.goodEvening', { name: userName }), icon: "star" };
    return { text: t('greetings.goodNight', { name: userName }), icon: "moon" };
  };

  const greeting = getGreetingByTime();

  const quickActions = [
    {
      title: t('cards.morningCheckIn.title'),
      description: t('cards.morningCheckIn.description'),
      icon: "sunny",
      colors: ['#FBBF24', '#4ECDC4'],
      screen: "CheckIn"
    },
    {
      title: t('cards.journal.title'),
      description: t('cards.journal.description'),
      icon: "book",
      colors: ['#4ECDC4', '#64748B'],
      screen: "Journal"
    },
    {
      title: t('cards.aiChat.title'),
      description: t('cards.aiChat.description'),
      icon: "chatbubble-ellipses",
      colors: ['#A855F7', '#EC4899'],
      screen: "AIChat"
    },
    {
      title: t('cards.resourceMap.title'),
      description: t('cards.resourceMap.description'),
      icon: "map",
      colors: ['#64748B', '#FBBF24'],
      screen: "ResourceMap"
    },
    {
      title: t('cards.analytics.title'),
      description: t('cards.analytics.description'),
      icon: "trending-up",
      colors: ['#FBBF24', '#4ECDC4'],
      screen: "Analytics"
    },
    {
      title: t('cards.research.title'),
      description: t('cards.research.description'),
      icon: "book-outline",
      colors: ['#64748B', '#A8DADC'],
      screen: "Research"
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
              <View style={styles.logoSolid}>
                <Ionicons name="sunny" size={24} color="#FFFFFF" />
              </View>
            </View>
            <View>
              <Text style={styles.appName}>{t('common.appName')}</Text>
              <Text style={styles.appTagline}>{t('common.appTagline')}</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Ionicons name="globe" size={16} color="#64748B" />
            <Text style={styles.culturallyAware}>{t('common.culturallyAware')}</Text>
          </View>
        </View>
      </View>

      {/* Personal Greeting with Animation */}
      <Animatable.View
        animation="fadeInDown"
        duration={500}
        style={styles.greetingContainer}
      >
        <Card style={styles.greetingCard}>
          <View style={styles.greetingContent}>
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={3000}
              style={styles.greetingIconContainer}
            >
              <Ionicons name={greeting.icon} size={24} color="#FBBF24" />
            </Animatable.View>
            <View style={styles.greetingTextContainer}>
              <Text style={styles.greetingText}>{greeting.text}</Text>
              <Text style={styles.greetingSubtext}>{t('dashboard.nurtureQuestion')}</Text>
            </View>
          </View>
        </Card>
      </Animatable.View>

      {/* Streak Widget */}
      <Animatable.View
        animation="fadeIn"
        duration={500}
        delay={600}
        style={styles.streakWidgetContainer}
      >
        <StreakWidget
          currentStreak={7}
          longestStreak={15}
          totalCheckIns={42}
        />
      </Animatable.View>

      {/* Quick Actions with Staggered Animations */}
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <Animatable.View
            key={action.screen}
            animation="fadeInUp"
            duration={400}
            delay={index * 100}
            style={styles.actionCardContainer}
          >
            <Pressable
              onPress={() => navigation.navigate(action.screen)}
              style={({ pressed }) => [
                styles.actionPressable,
                pressed && styles.actionPressed
              ]}
            >
              <Card style={[styles.actionCard, { backgroundColor: '#FFFFFF' }]}>
                <View style={[styles.actionIconSolid, { backgroundColor: action.colors[0] }]}>
                  <Ionicons name={action.icon} size={32} color="#FFFFFF" />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionDescription}>{action.description}</Text>
              </Card>
            </Pressable>
          </Animatable.View>
        ))}
      </View>

      {/* Wellness Metrics */}
      <Animatable.View
        animation="fadeIn"
        duration={500}
        delay={800}
        style={styles.metricsSection}
      >
        <View style={styles.metricsSectionHeader}>
          <Ionicons name="trending-up" size={20} color="#FBBF24" />
          <Text style={styles.metricsSectionTitle}>{t('dashboard.wellnessJourney')}</Text>
        </View>

        <View style={styles.metricsGrid}>
          {wellnessMetrics.map((metric, index) => (
            <Animatable.View
              key={index}
              animation="zoomIn"
              duration={300}
              delay={900 + index * 100}
              style={styles.metricCardContainer}
            >
              <Card style={styles.metricCard}>
                <Animatable.View
                  animation="bounceIn"
                  duration={500}
                  delay={1000 + index * 100}
                >
                  <Text style={styles.metricValue}>{metric.value}/10</Text>
                </Animatable.View>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={styles.metricContext}>{metric.context}</Text>

                {/* Trend Indicator */}
                <View style={styles.trendContainer}>
                  {metric.trend === 'up' && (
                    <Animatable.View
                      animation="fadeInUp"
                      duration={300}
                      delay={1200 + index * 100}
                      style={styles.trendUp}
                    >
                      <Animatable.View
                        animation="bounce"
                        iterationCount="infinite"
                        duration={1000}
                      >
                        <Ionicons name="trending-up" size={12} color="#10B981" />
                      </Animatable.View>
                      <Text style={styles.trendUpText}>{t('dashboard.trends.growing')}</Text>
                    </Animatable.View>
                  )}
                  {metric.trend === 'stable' && (
                    <View style={styles.trendStable}>
                      <View style={styles.trendStableLine} />
                      <Text style={styles.trendStableText}>{t('dashboard.trends.stable')}</Text>
                    </View>
                  )}
                </View>
              </Card>
            </Animatable.View>
          ))}
        </View>
      </Animatable.View>

      {/* Cultural Features */}
      <View style={styles.culturalFeatures}>
        <Card style={styles.culturalCard}>
          <View style={styles.culturalCardContent}>
            <Ionicons name="people" size={24} color="#FBBF24" style={styles.culturalIcon} />
            <View style={styles.culturalTextContainer}>
              <Text style={styles.culturalTitle}>{t('dashboard.communitySupport.title')}</Text>
              <Text style={styles.culturalDescription}>
                {t('dashboard.communitySupport.description')}
              </Text>
              <Pressable style={styles.culturalButton}>
                <Text style={styles.culturalButtonText}>{t('dashboard.communitySupport.button')}</Text>
              </Pressable>
            </View>
          </View>
        </Card>

        <Card style={styles.culturalCard}>
          <View style={styles.culturalCardContent}>
            <Ionicons name="calendar" size={24} color="#4ECDC4" style={styles.culturalIcon} />
            <View style={styles.culturalTextContainer}>
              <Text style={styles.culturalTitle}>{t('dashboard.culturalCalendar.title')}</Text>
              <Text style={styles.culturalDescription}>
                {t('dashboard.culturalCalendar.description')}
              </Text>
              <Pressable style={styles.culturalButton}>
                <Text style={styles.culturalButtonText}>{t('dashboard.culturalCalendar.button')}</Text>
              </Pressable>
            </View>
          </View>
        </Card>
      </View>

      {/* Cultural Sensitivity Notice */}
      <Card style={styles.noticeCard}>
        <View style={styles.noticeContent}>
          <Ionicons name="heart" size={32} color="#FBBF24" style={styles.noticeIcon} />
          <Text style={styles.noticeTitle}>{t('dashboard.culturalNotice.title')}</Text>
          <Text style={styles.noticeMessage}>
            {t('dashboard.culturalNotice.message')}
          </Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(228, 228, 231, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  logoSolid: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FBBF24',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  appTagline: {
    fontSize: 14,
    color: '#64748B',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  culturallyAware: {
    fontSize: 14,
    color: '#64748B',
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  greetingCard: {
    padding: 24,
  },
  greetingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  greetingIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingTextContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#64748B',
  },
  actionsGrid: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  actionCardContainer: {
    marginBottom: 8,
  },
  actionPressable: {
    borderRadius: 16,
  },
  actionPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  actionCard: {
    padding: 24,
  },
  actionIconSolid: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  metricsSection: {
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  metricsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  metricsSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCardContainer: {
    width: '47%',
  },
  metricCard: {
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FBBF24',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 4,
  },
  metricContext: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  trendContainer: {
    marginTop: 8,
  },
  trendUp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  trendUpText: {
    fontSize: 12,
    color: '#10B981',
  },
  trendStable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  trendStableLine: {
    width: 12,
    height: 4,
    backgroundColor: '#4ECDC4',
    borderRadius: 2,
  },
  trendStableText: {
    fontSize: 12,
    color: '#4ECDC4',
  },
  culturalFeatures: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  culturalCard: {
    padding: 24,
  },
  culturalCardContent: {
    flexDirection: 'row',
    gap: 16,
  },
  culturalIcon: {
    marginTop: 4,
  },
  culturalTextContainer: {
    flex: 1,
  },
  culturalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  culturalDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 20,
  },
  culturalButton: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  culturalButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E293B',
  },
  noticeCard: {
    marginHorizontal: 16,
    marginTop: 32,
    padding: 24,
  },
  noticeContent: {
    alignItems: 'center',
  },
  noticeIcon: {
    marginBottom: 12,
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  noticeMessage: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
});
