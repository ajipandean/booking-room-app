import * as Notifications from 'expo-notifications'
import { Platform, ToastAndroid } from 'react-native'

export default async function registerPushNotificationsEffect () {
  try {
    const { granted } = await Notifications.requestPermissionsAsync()
    if (!granted) throw new Error('No access to notifications')

    const token = (await Notifications.getExpoPushTokenAsync()).data
    console.log(token)

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#ff231f7c'
      })
    }
  } catch (err) {
    ToastAndroid.show(err.message, ToastAndroid.LONG)
  }
}
