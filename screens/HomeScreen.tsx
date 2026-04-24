import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTTPage, useTTTarget } from 'tooltip-tour-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }

export default function HomeScreen({ navigation }: Props) {
  useTTPage('home')

  const welcomeRef   = useTTTarget('welcomeHeading')
  const subtitleRef  = useTTTarget('welcomeSubtitle')
  const card1Ref     = useTTTarget('featureCardAnalytics')
  const card2Ref     = useTTTarget('featureCardTours')
  const card3Ref     = useTTTarget('featureCardInspector')
  const ctaRef       = useTTTarget('getStartedButton')
  const profileRef   = useTTTarget('profileNavButton')
  const recentRef    = useTTTarget('recentActivitySection')
  const tipsRef      = useTTTarget('tipsSection')

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text ref={welcomeRef} style={styles.heading}>Welcome back 👋</Text>
            <Text ref={subtitleRef} style={styles.subtitle}>Here's what's happening today.</Text>
          </View>
          <TouchableOpacity
            ref={profileRef}
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarBtn}
          >
            <Text style={styles.avatarText}>E</Text>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { label: 'Tours Active',      value: '3'     },
            { label: 'Views This Month',  value: '1,240' },
            { label: 'Completion Rate',   value: '68%'   },
          ].map(stat => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Feature cards */}
        <Text style={styles.sectionTitle}>Features</Text>

        <TouchableOpacity
          ref={card1Ref}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Analytics')}
        >
          <View style={[styles.cardIcon, { backgroundColor: 'rgba(25,37,170,0.1)' }]}>
            <Text style={styles.cardIconText}>📊</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Analytics</Text>
            <Text style={styles.cardDesc}>Track guide shown, started, completed and per-step funnel.</Text>
          </View>
          <Text style={styles.cardChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          ref={card2Ref}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Feed')}
        >
          <View style={[styles.cardIcon, { backgroundColor: 'rgba(22,163,74,0.1)' }]}>
            <Text style={styles.cardIconText}>🗺️</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Guided Tours</Text>
            <Text style={styles.cardDesc}>Step-by-step walkthroughs with spotlight and beacon.</Text>
          </View>
          <Text style={styles.cardChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          ref={card3Ref}
          style={styles.card}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={[styles.cardIcon, { backgroundColor: 'rgba(234,88,12,0.1)' }]}>
            <Text style={styles.cardIconText}>🔍</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Visual Inspector</Text>
            <Text style={styles.cardDesc}>Capture element identifiers from your device via QR code.</Text>
          </View>
          <Text style={styles.cardChevron}>›</Text>
        </TouchableOpacity>

        {/* CTA */}
        <TouchableOpacity ref={ctaRef} style={styles.cta} activeOpacity={0.85}
          onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.ctaText}>Get Started →</Text>
        </TouchableOpacity>

        {/* Recent activity */}
        <Text ref={recentRef} style={[styles.sectionTitle, { marginTop: 32 }]}>Recent Activity</Text>
        {[
          { icon: '✅', text: 'Getting Started tour completed',  sub: '2 mins ago',   color: '#16a34a' },
          { icon: '👁️', text: 'Dashboard Overview — step 3 viewed', sub: '14 mins ago', color: '#1925AA' },
          { icon: '🚀', text: 'New tour published: Mobile SDK',  sub: '1 hour ago',   color: '#d97706' },
          { icon: '📈', text: 'Analytics: +18% views this week', sub: '3 hours ago',  color: '#0891b2' },
          { icon: '✅', text: 'Visual Inspector tour completed',  sub: 'Yesterday',    color: '#16a34a' },
        ].map((item, i) => (
          <View key={i} style={styles.activityRow}>
            <View style={[styles.activityDot, { backgroundColor: item.color + '22' }]}>
              <Text style={{ fontSize: 14 }}>{item.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityText}>{item.text}</Text>
              <Text style={styles.activitySub}>{item.sub}</Text>
            </View>
          </View>
        ))}

        {/* Tips section */}
        <Text ref={tipsRef} style={[styles.sectionTitle, { marginTop: 32 }]}>Tips</Text>
        {[
          { title: 'Keep tours under 6 steps',      body: 'Users drop off sharply after step 5. Aim for focused, high-value steps.' },
          { title: 'Use the splash carousel',        body: 'A 2–3 slide carousel before the tour boosts start rates by up to 40%.' },
          { title: 'Test with the Visual Inspector', body: 'Scan the QR code from any dashboard step to capture identifiers live.' },
          { title: 'Set maxShows to 3',              body: 'Showing the welcome card more than 3 times annoys returning users.' },
        ].map((tip, i) => (
          <View key={i} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipBody}>{tip.body}</Text>
          </View>
        ))}

        {/* Quick links */}
        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>Quick Links</Text>
        <View style={styles.quickRow}>
          {[
            { label: 'Analytics',  emoji: '📊', screen: 'Analytics' as const },
            { label: 'My Tours',   emoji: '🗺️', screen: 'Feed' as const      },
            { label: 'Profile',    emoji: '👤', screen: 'Profile' as const   },
          ].map(link => (
            <TouchableOpacity
              key={link.label}
              style={styles.quickBtn}
              onPress={() => navigation.navigate(link.screen)}
              activeOpacity={0.85}
            >
              <Text style={{ fontSize: 22, marginBottom: 6 }}>{link.emoji}</Text>
              <Text style={styles.quickLabel}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8F7FF' },
  scroll: { padding: 24, paddingBottom: 120 },

  header:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  heading:  { fontSize: 26, fontWeight: '800', color: '#0D0A1C', letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: 'rgba(13,10,28,0.45)', marginTop: 4 },
  avatarBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1925AA', alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: '800', fontSize: 16 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statBox:  {
    flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: '800', color: '#0D0A1C', letterSpacing: -0.5 },
  statLabel: { fontSize: 10, color: 'rgba(13,10,28,0.4)', marginTop: 2, fontWeight: '600' },

  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(13,10,28,0.35)', marginBottom: 12 },

  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 10,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  cardIcon:     { width: 44, height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  cardIconText: { fontSize: 20 },
  cardBody:     { flex: 1 },
  cardTitle:    { fontSize: 15, fontWeight: '700', color: '#0D0A1C', marginBottom: 2 },
  cardDesc:     { fontSize: 12, color: 'rgba(13,10,28,0.45)', lineHeight: 17 },
  cardChevron:  { fontSize: 20, color: 'rgba(13,10,28,0.2)', fontWeight: '700' },

  cta: {
    backgroundColor: '#1925AA', borderRadius: 12, paddingVertical: 16,
    alignItems: 'center', marginTop: 8,
  },
  ctaText: { color: '#fff', fontSize: 15, fontWeight: '800', letterSpacing: 0.2 },

  activityRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  activityDot:  { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  activityText: { fontSize: 13, fontWeight: '600', color: '#0D0A1C', marginBottom: 2 },
  activitySub:  { fontSize: 11, color: 'rgba(13,10,28,0.4)' },

  tipCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    borderLeftWidth: 3, borderLeftColor: '#1925AA',
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  tipTitle: { fontSize: 14, fontWeight: '700', color: '#0D0A1C', marginBottom: 4 },
  tipBody:  { fontSize: 13, color: 'rgba(13,10,28,0.55)', lineHeight: 19 },

  quickRow: { flexDirection: 'row', gap: 10 },
  quickBtn: {
    flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16,
    alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  quickLabel: { fontSize: 12, fontWeight: '700', color: '#0D0A1C' },
})
