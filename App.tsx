import React, { useEffect } from 'react'
import { Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { TooltipTour, TTLauncherView } from 'tooltip-tour-react-native'

import HomeScreen      from './screens/HomeScreen'
import ProfileScreen   from './screens/ProfileScreen'
import FeedScreen      from './screens/FeedScreen'
import AnalyticsScreen from './screens/AnalyticsScreen'

// ── SDK configuration ─────────────────────────────────────────────────────────
TooltipTour.configure({
  siteKey: 'sk_z2hmy8cga3',
  baseURL: 'https://app.lovelysomething.com',
})

// ── Navigation types ──────────────────────────────────────────────────────────
export type RootStackParamList = {
  Home:      undefined
  Profile:   undefined
  Feed:      undefined
  Analytics: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

// ── Root component ────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) TooltipTour.handleDeepLink(url)
    })
    const sub = Linking.addEventListener('url', ({ url }) => {
      TooltipTour.handleDeepLink(url)
    })
    return () => sub.remove()
  }, [])

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home"      component={HomeScreen} />
            <Stack.Screen name="Profile"   component={ProfileScreen} />
            <Stack.Screen name="Feed"      component={FeedScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <TTLauncherView />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
