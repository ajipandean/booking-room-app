import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from '../screens/MainBottomTabs/HomeScreen'

const { Navigator, Screen } = createBottomTabNavigator()

const screens = [
  {
    name: 'home',
    component: HomeScreen,
    options: {}
  }
]

export default function MainBottomTabsNavigation () {
  return (
    <Navigator>
      {screens.map(s => (
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
