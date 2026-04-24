import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTTPage, useTTTarget } from 'tooltip-tour-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Analytics'> }

const FUNNEL = [
  { label: 'Guide shown',     count: 320, pct: 100, color: '#1925AA' },
  { label: 'Guide started',   count: 248, pct: 78,  color: '#1925AA' },
  { label: 'Step 1 viewed',   count: 240, pct: 75,  color: '#0891b2' },
  { label: 'Step 2 viewed',   count: 210, pct: 66,  color: '#0891b2' },
  { label: 'Step 3 viewed',   count: 185, pct: 58,  color: '#0891b2' },
  { label: 'Guide completed', count: 218, pct: 68,  color: '#16a34a' },
]

const TOURS = [
  { name: 'Getting Started',    shown: 320, completed: 218, rate: 68 },
  { name: 'Dashboard Overview', shown: 210, completed: 149, rate: 71 },
  { name: 'Mobile SDK Setup',   shown: 150, completed:  72, rate: 48 },
]

export default function AnalyticsScreen({ navigation }: Props) {
  useTTPage('analytics')

  const funnelRef  = useTTTarget('analyticsFunnel')
  const tableRef   = useTTTarget('analyticsTable')
  const periodRef  = useTTTarget('analyticsPeriodPicker')

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Analytics</Text>
        </View>

        {/* Period picker */}
        <View ref={periodRef} style={styles.periodRow}>
          {['7d', '30d', '90d', 'All'].map((p, i) => (
            <TouchableOpacity key={p} style={[styles.periodBtn, i === 1 && styles.periodBtnActive]}>
              <Text style={[styles.periodText, i === 1 && styles.periodTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top stats */}
        <View style={styles.statsGrid}>
          {[
            { label: 'Guide Shown',   value: '320', delta: '+12%' },
            { label: 'Guide Started', value: '248', delta: '+8%'  },
            { label: 'Completed',     value: '218', delta: '+15%' },
            { label: 'Completion',    value: '68%', delta: '+3%'  },
          ].map(s => (
            <View key={s.label} style={styles.statBox}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statDelta}>{s.delta}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Funnel */}
        <Text style={styles.sectionTitle}>Conversion Funnel</Text>
        <View ref={funnelRef} style={styles.card}>
          {FUNNEL.map((row, i) => (
            <View key={row.label} style={[styles.funnelRow, i > 0 && styles.funnelRowBorder]}>
              <View style={styles.funnelLeft}>
                <Text style={styles.funnelLabel}>{row.label}</Text>
                <Text style={styles.funnelCount}>{row.count}</Text>
              </View>
              <View style={styles.funnelBarWrap}>
                <View style={[styles.funnelBar, { width: `${row.pct}%` as any, backgroundColor: row.color }]} />
              </View>
              <Text style={[styles.funnelPct, { color: row.color }]}>{row.pct}%</Text>
            </View>
          ))}
        </View>

        {/* Per-tour table */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>By Tour</Text>
        <View ref={tableRef} style={styles.card}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCell, { flex: 2 }]}>Tour</Text>
            <Text style={styles.tableCell}>Shown</Text>
            <Text style={styles.tableCell}>Done</Text>
            <Text style={styles.tableCell}>Rate</Text>
          </View>
          {TOURS.map((t, i) => (
            <View key={t.name} style={[styles.tableRow, i > 0 && styles.funnelRowBorder]}>
              <Text style={[styles.tableCellBody, { flex: 2 }]} numberOfLines={1}>{t.name}</Text>
              <Text style={styles.tableCellBody}>{t.shown}</Text>
              <Text style={styles.tableCellBody}>{t.completed}</Text>
              <Text style={[styles.tableCellBody, {
                color: t.rate >= 65 ? '#16a34a' : t.rate >= 50 ? '#d97706' : '#dc2626',
                fontWeight: '700',
              }]}>{t.rate}%</Text>
            </View>
          ))}
        </View>

        {/* Carousel funnel */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Splash Carousel</Text>
        <View style={styles.card}>
          {[
            { label: 'Carousel shown',     count: 180, pct: 100, color: '#7c3aed' },
            { label: 'Slide 1 viewed',     count: 180, pct: 100, color: '#7c3aed' },
            { label: 'Slide 2 viewed',     count: 155, pct:  86, color: '#7c3aed' },
            { label: 'Slide 3 viewed',     count: 130, pct:  72, color: '#7c3aed' },
            { label: 'Carousel completed', count: 112, pct:  62, color: '#16a34a' },
            { label: 'Carousel dismissed', count:  68, pct:  38, color: '#dc2626' },
          ].map((row, i) => (
            <View key={row.label} style={[styles.funnelRow, i > 0 && styles.funnelRowBorder]}>
              <View style={styles.funnelLeft}>
                <Text style={styles.funnelLabel}>{row.label}</Text>
                <Text style={styles.funnelCount}>{row.count}</Text>
              </View>
              <View style={styles.funnelBarWrap}>
                <View style={[styles.funnelBar, { width: `${row.pct}%` as any, backgroundColor: row.color }]} />
              </View>
              <Text style={[styles.funnelPct, { color: row.color }]}>{row.pct}%</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8F7FF' },
  scroll: { padding: 24, paddingBottom: 120 },

  header: { marginBottom: 20 },
  back:   { fontSize: 13, color: '#1925AA', fontWeight: '700', marginBottom: 6 },
  title:  { fontSize: 26, fontWeight: '800', color: '#0D0A1C', letterSpacing: -0.5 },

  periodRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  periodBtn: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8,
    backgroundColor: '#fff', borderWidth: 1, borderColor: 'rgba(13,10,28,0.1)',
  },
  periodBtnActive: { backgroundColor: '#1925AA', borderColor: '#1925AA' },
  periodText:      { fontSize: 13, fontWeight: '700', color: 'rgba(13,10,28,0.45)' },
  periodTextActive:{ color: '#fff' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 28 },
  statBox:   {
    width: '47%', backgroundColor: '#fff', padding: 16, borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  statValue: { fontSize: 24, fontWeight: '800', color: '#0D0A1C', letterSpacing: -0.5 },
  statDelta: { fontSize: 11, fontWeight: '700', color: '#16a34a', marginTop: 2 },
  statLabel: { fontSize: 10, color: 'rgba(13,10,28,0.4)', marginTop: 4, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },

  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(13,10,28,0.35)', marginBottom: 12 },

  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },

  funnelRow:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  funnelRowBorder: { borderTopWidth: 1, borderTopColor: 'rgba(13,10,28,0.06)' },
  funnelLeft:      { width: 130 },
  funnelLabel:     { fontSize: 11, fontWeight: '600', color: '#0D0A1C' },
  funnelCount:     { fontSize: 10, color: 'rgba(13,10,28,0.4)', marginTop: 1 },
  funnelBarWrap:   { flex: 1, height: 6, backgroundColor: 'rgba(13,10,28,0.06)', borderRadius: 3, overflow: 'hidden' },
  funnelBar:       { height: 6, borderRadius: 3 },
  funnelPct:       { width: 36, fontSize: 12, fontWeight: '800', textAlign: 'right' },

  tableHeader:   { flexDirection: 'row', paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(13,10,28,0.08)' },
  tableRow:      { flexDirection: 'row', paddingVertical: 10 },
  tableCell:     { flex: 1, fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(13,10,28,0.4)' },
  tableCellBody: { flex: 1, fontSize: 13, color: '#0D0A1C', fontWeight: '500' },
})
