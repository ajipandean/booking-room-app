import React, { useEffect, useRef } from 'react'
import * as Notifications from 'expo-notifications'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import registerPushNotificationsEffect from './effects/registerPushNotificationsEffect'
import RootStackNavigation from './navigations/RootStackNavigation'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

export default function App () {
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    ;(async () => {
      await registerPushNotificationsEffect()
    })()

    notificationListener.current = Notifications.addNotificationReceivedListener(
      notifications => console.log('Notifications: ', notifications)
    )
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => console.log('Response: ', response)
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener)
      Notifications.removeNotificationSubscription(responseListener)
    }
  }, [])

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStackNavigation />
      </NavigationContainer>

      <StatusBar style="light" />
    </SafeAreaProvider>
  )
}
