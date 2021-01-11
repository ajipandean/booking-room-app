import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import RootStackNavigation from './navigations/RootStackNavigation'

export default function App () {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>

      <StatusBar style="auto" />
    </SafeAreaProvider>
  )
}
