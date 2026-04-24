import React from 'react'
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, SafeAreaView,
} from 'react-native'
import { useTTPage, useTTTarget } from 'tooltip-tour-react-native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../App'

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'> }

export default function ProfileScreen({ navigation }: Props) {
  useTTPage('profile')

  const avatarRef      = useTTTarget('profileAvatar')
  const nameRef        = useTTTarget('profileName')
  const planBadgeRef   = useTTTarget('planBadge')
  const editBtnRef     = useTTTarget('editProfileButton')
  const settingsRef    = useTTTarget('settingsSection')
  const signOutRef     = useTTTarget('signOutButton')

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Back */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Avatar + name */}
        <View style={styles.hero}>
          <View ref={avatarRef} style={styles.avatar}>
            <Text style={styles.avatarText}>E</Text>
          </View>
          <Text ref={nameRef} style={styles.name}>Erik Baars</Text>
          <Text style={styles.email}>erik@lovelysomething.com</Text>
          <View ref={planBadgeRef} style={styles.badge}>
            <Text style={styles.badgeText}>Too Many Plan</Text>
          </View>
        </View>

        {/* Edit button */}
        <TouchableOpacity ref={editBtnRef} style={styles.editBtn} activeOpacity={0.85}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Settings list */}
        <View ref={settingsRef} style={styles.section}>
          <Text style={styles.sectionLabel}>Settings</Text>
          {[
            { icon: '🔔', label: 'Notifications' },
            { icon: '🔒', label: 'Privacy' },
            { icon: '🎨', label: 'Appearance' },
            { icon: '💳', label: 'Billing' },
          ].map(item => (
            <TouchableOpacity key={item.label} style={styles.row}>
              <Text style={styles.rowIcon}>{item.icon}</Text>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.rowChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign out */}
        <TouchableOpacity ref={signOutRef} style={styles.signOut} activeOpacity={0.85}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#F8F7FF' },
  scroll: { padding: 24, paddingBottom: 120 },

  back:     { marginBottom: 16 },
  backText: { fontSize: 14, color: '#1925AA', fontWeight: '700' },

  hero:       { alignItems: 'center', marginBottom: 24 },
  avatar:     { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1925AA', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: '800' },
  name:       { fontSize: 22, fontWeight: '800', color: '#0D0A1C', letterSpacing: -0.5 },
  email:      { fontSize: 13, color: 'rgba(13,10,28,0.4)', marginTop: 4 },
  badge:      { marginTop: 10, backgroundColor: 'rgba(25,37,170,0.08)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  badgeText:  { fontSize: 12, fontWeight: '700', color: '#1925AA' },

  editBtn:     { backgroundColor: '#1925AA', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginBottom: 28 },
  editBtnText: { color: '#fff', fontSize: 15, fontWeight: '800' },

  section:      { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(13,10,28,0.35)', padding: 16, paddingBottom: 8 },
  row:          { flexDirection: 'row', alignItems: 'center', padding: 16, borderTopWidth: 1, borderTopColor: 'rgba(13,10,28,0.06)' },
  rowIcon:      { fontSize: 18, marginRight: 14 },
  rowLabel:     { flex: 1, fontSize: 15, fontWeight: '600', color: '#0D0A1C' },
  rowChevron:   { fontSize: 18, color: 'rgba(13,10,28,0.25)', fontWeight: '700' },

  signOut:     { marginTop: 20, borderRadius: 12, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(220,38,38,0.3)' },
  signOutText: { fontSize: 15, fontWeight: '700', color: '#dc2626' },
})
