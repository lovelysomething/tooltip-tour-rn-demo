import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
  SafeAreaView, StatusBar,
} from 'react-native'
import { useTTPage, useTTTarget } from 'tooltip-tour-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }

export default function HomeScreen({ navigation }: Props) {
  useTTPage('home')

  const welcomeRef  = useTTTarget('welcomeHeading')
  const subtitleRef = useTTTarget('welcomeSubtitle')
  const card1Ref    = useTTTarget('featureCardAnalytics')
  const card2Ref    = useTTTarget('featureCardTours')
  const card3Ref    = useTTTarget('featureCardInspector')
  const ctaRef      = useTTTarget('getStartedButton')
  const profileRef  = useTTTarget('profileNavButton')

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
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
            { label: 'Tours Active', value: '3' },
            { label: 'Views This Month', value: '1,240' },
            { label: 'Completion Rate', value: '68%' },
          ].map(stat => (
            <View key={stat.label} style={styles.statBox}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Feature cards */}
        <Text style={styles.sectionTitle}>Features</Text>

        <TouchableOpacity ref={card1Ref} style={styles.card} activeOpacity={0.85}>
          <View style={[styles.cardIcon, { backgroundColor: 'rgba(25,37,170,0.1)' }]}>
            <Text style={styles.cardIconText}>📊</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Analytics</Text>
            <Text style={styles.cardDesc}>Track guide shown, started, completed and per-step funnel.</Text>
          </View>
          <Text style={styles.cardChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity ref={card2Ref} style={styles.card} activeOpacity={0.85}
          onPress={() => navigation.navigate('Feed')}>
          <View style={[styles.cardIcon, { backgroundColor: 'rgba(22,163,74,0.1)' }]}>
            <Text style={styles.cardIconText}>🗺️</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Guided Tours</Text>
            <Text style={styles.cardDesc}>Step-by-step walkthroughs with spotlight and beacon.</Text>
          </View>
          <Text style={styles.cardChevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity ref={card3Ref} style={styles.card} activeOpacity={0.85}>
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
        <TouchableOpacity ref={ctaRef} style={styles.cta} activeOpacity={0.85}>
          <Text style={styles.ctaText}>Get Started →</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: '#F8F7FF' },
  scroll:  { padding: 24, paddingBottom: 120 },

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

  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(13,10,28,0.35)', marginBottom: 12 },

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
})
