import React, { useRef, useEffect } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTTPage, useTTTarget, TooltipTour, TTViewRegistry } from 'tooltip-tour-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }

// ── Sub-components so hooks can be used per-item ───────────────────────────

function StatBox({ id, value, label }: { id: string; value: string; label: string }) {
  const ref = useTTTarget(id)
  return (
    <View ref={ref as any} style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

function ActivityItem({ id, icon, text, sub, color }: {
  id: string; icon: string; text: string; sub: string; color: string
}) {
  const ref = useTTTarget(id)
  return (
    <View ref={ref as any} style={styles.activityRow}>
      <View style={[styles.activityDot, { backgroundColor: color + '22' }]}>
        <Text style={{ fontSize: 14 }}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.activityText}>{text}</Text>
        <Text style={styles.activitySub}>{sub}</Text>
      </View>
    </View>
  )
}

function TipItem({ id, title, body }: { id: string; title: string; body: string }) {
  const ref = useTTTarget(id)
  return (
    <View ref={ref as any} style={styles.tipCard}>
      <Text style={styles.tipTitle}>{title}</Text>
      <Text style={styles.tipBody}>{body}</Text>
    </View>
  )
}

function QuickLinkBtn({ id, emoji, label, onPress }: {
  id: string; emoji: string; label: string; onPress: () => void
}) {
  const ref = useTTTarget(id)
  return (
    <TouchableOpacity ref={ref as any} style={styles.quickBtn} onPress={onPress} activeOpacity={0.85}>
      <Text style={{ fontSize: 22, marginBottom: 6 }}>{emoji}</Text>
      <Text style={styles.quickLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

// ── Screen ─────────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }: Props) {
  useTTPage('home')

  // ── Scroll-to-target for guided tours ─────────────────────────────────────
  const scrollRef = useRef<ScrollView>(null)
  useEffect(() => {
    TooltipTour.registerScrollable('home', (targetId) => {
      const elemRef = TTViewRegistry.getRef(targetId)
      if (!elemRef?.current || !scrollRef.current) return
      // measureLayout gives position relative to the scroll view's content
      elemRef.current.measureLayout(
        scrollRef.current as any,
        (_x: number, y: number) => {
          scrollRef.current!.scrollTo({ y: Math.max(0, y - 120), animated: true })
        },
        () => {}
      )
    })
  }, [])

  const welcomeRef   = useTTTarget('welcomeHeading')
  const subtitleRef  = useTTTarget('welcomeSubtitle')
  const statsRowRef  = useTTTarget('statsRow')
  const card1Ref     = useTTTarget('featureCardAnalytics')
  const card2Ref     = useTTTarget('featureCardTours')
  const card3Ref     = useTTTarget('featureCardInspector')
  const ctaRef       = useTTTarget('getStartedButton')
  const profileRef   = useTTTarget('profileNavButton')
  const recentRef    = useTTTarget('recentActivitySection')
  const tipsRef      = useTTTarget('tipsSection')
  const quickRef     = useTTTarget('quickLinksSection')

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text ref={welcomeRef} style={styles.heading}>Welcome back 👋</Text>
            <Text ref={subtitleRef} style={styles.subtitle}>Here's what's happening today.</Text>
          </View>
          <TouchableOpacity
            ref={profileRef as any}
            onPress={() => navigation.navigate('Profile')}
            style={styles.avatarBtn}
          >
            <Text style={styles.avatarText}>E</Text>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View ref={statsRowRef as any} style={styles.statsRow}>
          <StatBox id="statToursActive"     value="3"     label="Tours Active" />
          <StatBox id="statViewsThisMonth"  value="1,240" label="Views This Month" />
          <StatBox id="statCompletionRate"  value="68%"   label="Completion Rate" />
        </View>

        {/* Feature cards */}
        <Text style={styles.sectionTitle}>Features</Text>

        <TouchableOpacity
          ref={card1Ref as any}
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
          ref={card2Ref as any}
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
          ref={card3Ref as any}
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
        <TouchableOpacity ref={ctaRef as any} style={styles.cta} activeOpacity={0.85}
          onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.ctaText}>Get Started →</Text>
        </TouchableOpacity>

        {/* Recent activity */}
        <View ref={recentRef as any} style={{ marginTop: 32 }}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <ActivityItem id="recentActivity0" icon="✅" text="Getting Started tour completed"       sub="2 mins ago"   color="#16a34a" />
          <ActivityItem id="recentActivity1" icon="👁️" text="Dashboard Overview — step 3 viewed"  sub="14 mins ago"  color="#1925AA" />
          <ActivityItem id="recentActivity2" icon="🚀" text="New tour published: Mobile SDK"       sub="1 hour ago"   color="#d97706" />
          <ActivityItem id="recentActivity3" icon="📈" text="Analytics: +18% views this week"      sub="3 hours ago"  color="#0891b2" />
          <ActivityItem id="recentActivity4" icon="✅" text="Visual Inspector tour completed"       sub="Yesterday"    color="#16a34a" />
        </View>

        {/* Tips section */}
        <View ref={tipsRef as any} style={{ marginTop: 32 }}>
          <Text style={styles.sectionTitle}>Tips</Text>
          <TipItem id="tip0" title="Keep tours under 6 steps"       body="Users drop off sharply after step 5. Aim for focused, high-value steps." />
          <TipItem id="tip1" title="Use the splash carousel"         body="A 2–3 slide carousel before the tour boosts start rates by up to 40%." />
          <TipItem id="tip2" title="Test with the Visual Inspector"  body="Scan the QR code from any dashboard step to capture identifiers live." />
          <TipItem id="tip3" title="Set maxShows to 3"               body="Showing the welcome card more than 3 times annoys returning users." />
        </View>

        {/* Quick links */}
        <View ref={quickRef as any} style={{ marginTop: 32 }}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <View style={styles.quickRow}>
            <QuickLinkBtn id="quickLinkAnalytics" emoji="📊" label="Analytics" onPress={() => navigation.navigate('Analytics')} />
            <QuickLinkBtn id="quickLinkTours"     emoji="🗺️" label="My Tours"  onPress={() => navigation.navigate('Feed')} />
            <QuickLinkBtn id="quickLinkProfile"   emoji="👤" label="Profile"   onPress={() => navigation.navigate('Profile')} />
          </View>
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
