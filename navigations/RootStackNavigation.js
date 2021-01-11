import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginScreen from '../screens/Root/LoginScreen'

const { Navigator, Screen } = createStackNavigator()

export default function RootStackNavigation () {
  return (
    <Navigator>
      <Screen
        name="login"
        component={LoginScreen}
      />
    </Navigator>
  )
}
