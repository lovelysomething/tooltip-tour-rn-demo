import React, { useEffect } from 'react'
import { Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TooltipTour, TTLauncherView } from 'tooltip-tour-react-native'

import HomeScreen    from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import FeedScreen    from './screens/FeedScreen'

// ── SDK configuration ─────────────────────────────────────────────────────────
TooltipTour.configure({
  siteKey: 'YOUR_SITE_KEY',               // replace with your site key from the dashboard
  baseURL: 'https://app.lovelysomething.com',
})

// ── Navigation types ──────────────────────────────────────────────────────────
export type RootStackParamList = {
  Home:    undefined
  Profile: undefined
  Feed:    undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

// ── Root component ────────────────────────────────────────────────────────────
export default function App() {
  // Wire up deep links so the Visual Inspector QR code works
  useEffect(() => {
    // Handle cold-start deep links (app was closed)
    Linking.getInitialURL().then(url => {
      if (url) TooltipTour.handleDeepLink(url)
    })

    // Handle warm deep links (app already open)
    const sub = Linking.addEventListener('url', ({ url }) => {
      TooltipTour.handleDeepLink(url)
    })

    return () => sub.remove()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home"    component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Feed"    component={FeedScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/*
        TTLauncherView renders the FAB, welcome card, carousel, and tour overlay.
        It must live above NavigationContainer so it covers the full screen.
      */}
      <TTLauncherView />
    </GestureHandlerRootView>
  )
}
