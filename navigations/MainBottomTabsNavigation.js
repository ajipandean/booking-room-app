import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5 } from '@expo/vector-icons'

import HomeScreen from '../screens/MainBottomTabs/HomeScreen'
import ProfileScreen from '../screens/MainBottomTabs/ProfileScreen'

const { Navigator, Screen } = createBottomTabNavigator()

const screens = [
  {
    name: 'home',
    icon: 'home',
    component: HomeScreen,
    options: {
      title: 'Home'
    }
  },
  {
    name: 'profile',
    icon: 'user-alt',
    component: ProfileScreen,
    options: {
      title: 'Profile'
    }
  }
]

export default function MainBottomTabsNavigation () {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          height: 56,
          elevation: 0,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24
        },
        labelStyle: { fontWeight: 'bold' },
        labelPosition: 'beside-icon',
        activeTintColor: '#001b39',
        inactiveTintColor: '#adadad'
      }}
    >
      {screens.map(s => (
        <Screen
          key={s.name}
          name={s.name}
          component={s.component}
          options={{
            ...s.options,
            tabBarIcon: ({ color }) => (
              <FontAwesome5 color={color} size={20} name={s.icon} />
            )
          }}
        />
      ))}
    </Navigator>
  )
}
