import React, { useRef } from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTTPage, useTTTarget, TooltipTour } from 'tooltip-tour-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Feed'> }

const TOURS = [
  { id: 'tour-1', title: 'Getting Started',      steps: 4,  views: 320, completion: 82 },
  { id: 'tour-2', title: 'Dashboard Overview',   steps: 6,  views: 210, completion: 71 },
  { id: 'tour-3', title: 'Create a Walkthrough', steps: 5,  views: 180, completion: 65 },
  { id: 'tour-4', title: 'Visual Inspector',     steps: 3,  views: 150, completion: 78 },
  { id: 'tour-5', title: 'Analytics Deep Dive',  steps: 7,  views: 120, completion: 55 },
  { id: 'tour-6', title: 'Styling Your Tours',   steps: 4,  views: 95,  completion: 60 },
  { id: 'tour-7', title: 'Splash Carousels',     steps: 5,  views: 88,  completion: 70 },
  { id: 'tour-8', title: 'Mobile SDK Setup',     steps: 8,  views: 74,  completion: 48 },
]

export default function FeedScreen({ navigation }: Props) {
  useTTPage('feed')

  const listRef    = useRef<FlatList>(null)
  const headerRef  = useTTTarget('feedHeader')
  const newBtnRef  = useTTTarget('newTourButton')

  // Register scroll callback so tours can scroll this list to a specific item
  React.useEffect(() => {
    TooltipTour.registerScrollable('feed', (targetId) => {
      const index = TOURS.findIndex(t => t.id === targetId)
      if (index !== -1) listRef.current?.scrollToIndex({ index, animated: true })
    })
  }, [])

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header} ref={headerRef as any}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.back}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>My Tours</Text>
        </View>
        <TouchableOpacity ref={newBtnRef} style={styles.newBtn} activeOpacity={0.85}>
          <Text style={styles.newBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={TOURS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TourRow item={item} index={index} />
        )}
      />
    </SafeAreaView>
  )
}

function TourRow({ item, index }: { item: typeof TOURS[0]; index: number }) {
  const rowRef = useTTTarget(item.id)

  return (
    <TouchableOpacity ref={rowRef} style={styles.row} activeOpacity={0.85}>
      <View style={styles.rowLeft}>
        <View style={[styles.rowNum, { backgroundColor: index % 2 === 0 ? '#1925AA' : '#0d9488' }]}>
          <Text style={styles.rowNumText}>{String(index + 1).padStart(2, '0')}</Text>
        </View>
        <View style={styles.rowBody}>
          <Text style={styles.rowTitle}>{item.title}</Text>
          <Text style={styles.rowMeta}>{item.steps} steps · {item.views} views</Text>
        </View>
      </View>
      <View style={styles.rowRight}>
        <Text style={[styles.pct, { color: item.completion >= 70 ? '#16a34a' : item.completion >= 55 ? '#d97706' : '#dc2626' }]}>
          {item.completion}%
        </Text>
        <Text style={styles.rowChevron}>›</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8F7FF' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16,
  },
  back:  { fontSize: 13, color: '#1925AA', fontWeight: '700', marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '800', color: '#0D0A1C', letterSpacing: -0.5 },
  newBtn:     { backgroundColor: '#1925AA', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 },
  newBtnText: { color: '#fff', fontWeight: '800', fontSize: 13 },
  list:  { paddingHorizontal: 24, paddingBottom: 120 },

  row: {
    backgroundColor: '#fff', borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 8,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 1 }, elevation: 1,
  },
  rowLeft:    { flexDirection: 'row', alignItems: 'center', flex: 1 },
  rowNum:     { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rowNumText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  rowBody:    { flex: 1 },
  rowTitle:   { fontSize: 14, fontWeight: '700', color: '#0D0A1C' },
  rowMeta:    { fontSize: 11, color: 'rgba(13,10,28,0.4)', marginTop: 2 },
  rowRight:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pct:        { fontSize: 13, fontWeight: '800' },
  rowChevron: { fontSize: 18, color: 'rgba(13,10,28,0.2)', fontWeight: '700' },
})
