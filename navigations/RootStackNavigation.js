import React, { useReducer, useMemo, useEffect } from 'react'
import axios from 'axios'
import { ToastAndroid } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { API_URL } from '@env'

import MainBottomTabsNavigation from './MainBottomTabsNavigation'

import useTheme from '../hooks/useTheme'
import AuthContext from '../contexts/AuthContext'
import LoginScreen from '../screens/Auth/LoginScreen'
import RegisterScreen from '../screens/Auth/RegisterScreen'
import RoomDetailScreen from '../screens/RootStack/RoomDetailScreen'
import CreateBookingScreen from '../screens/RootStack/CreateBookingScreen'

const { Navigator, Screen } = createStackNavigator()

const initialState = {
  token: null,
  isLogout: false
}

const authScreens = [
  {
    name: 'login',
    component: LoginScreen,
    options: {}
  },
  {
    name: 'register',
    component: RegisterScreen,
    options: {}
  }
]

const rootStackScreens = [
  {
    name: 'main-bottom-tabs',
    component: MainBottomTabsNavigation,
    options: {}
  },
  {
    name: 'room-detail',
    component: RoomDetailScreen,
    options: {
      headerTitle: null,
      headerShown: true
    }
  },
  {
    name: 'create-booking',
    component: CreateBookingScreen,
    options: {
      headerTitle: null,
      headerShown: true
    }
  }
]

export default function RootStackNavigation () {
  const { colors } = useTheme()

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case 'REFRESH_TOKEN':
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token,
          isLogout: false
        }
      case 'LOGOUT':
        return {
          ...prevState,
          token: null,
          isLogout: true
        }
      default:
        return prevState
    }
  }, initialState)

  useEffect(() => {
    ;(async () => {
      let token
      try {
        token = await AsyncStorage.getItem('token')
        dispatch({ type: 'REFRESH_TOKEN', token })
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      }
    })()
  }, [])

  const authMemo = useMemo(() => ({
    register: async payload => {
      try {
        const { data } = await axios.post(`${API_URL}/api/register`, {
          ...payload,
          role: 'user'
        })
        ToastAndroid.show(data.message, ToastAndroid.LONG)
        if (data.statusCode === 200) return true
        return false
      } catch (err) {
        console.log(err)
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      }
    },
    login: async payload => {
      try {
        const { data } = await axios.post(`${API_URL}/api/login`, {
          ...payload
        })
        if (data.token) {
          const user = {
            id: data.id,
            name: data.name,
            nim: data.nim,
            role: data.role
          }
          await AsyncStorage.setItem('token', data.token)
          await AsyncStorage.setItem('user', JSON.stringify(user))
          dispatch({ type: 'LOGIN', token: data.token })
        } else {
          throw new Error('Failed to login')
        }
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      }
    },
    logout: () => {
      dispatch({ type: 'LOGOUT' })
      ToastAndroid.show('Logout successfully', ToastAndroid.LONG)
    }
  }))

  return (
    <AuthContext.Provider value={authMemo}>
      <Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            elevation: 0,
            backgroundColor: colors.primary
          },
          headerTintColor: colors.surface
        }}
      >
        {state.token
          ? (
          <>
            {rootStackScreens.map(s => (
              <Screen
                key={s.name}
                name={s.name}
                component={s.component}
                options={s.options}
              />
            ))}
          </>
            )
          : (
          <>
            {authScreens.map(s => (
              <Screen
                key={s.name}
                name={s.name}
                component={s.component}
                options={s.options}
              />
            ))}
          </>
            )}
      </Navigator>
    </AuthContext.Provider>
  )
}
