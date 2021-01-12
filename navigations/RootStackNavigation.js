import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import MainBottomTabsNavigation from './MainBottomTabsNavigation'

import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'

const { Navigator, Screen } = createStackNavigator()

const screens = [
  {
    name: 'login',
    component: LoginScreen,
    options: {}
  },
  {
    name: 'register',
    component: RegisterScreen,
    options: {}
  },
  {
    name: 'main-bottom-tabs',
    component: MainBottomTabsNavigation,
    options: {}
  }
]

export default function RootStackNavigation () {
  return (
    <Navigator
      screenOptions={{ headerShown: false }}
    >
      {screens.map((s, i) => (
        <Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={s.options}
        />
      ))}
    </Navigator>
  )
}
