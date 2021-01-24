import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native'

import useTheme from '../../hooks/useTheme'
import AuthContext from '../../contexts/AuthContext'

export default function LoginScreen () {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const context = useContext(AuthContext)

  const [nim, setNim] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    image: {
      height: 153,
      width: 146
    },
    textTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.surface,
      margin: 20
    },
    inputText: {
      fontSize: 18,
      height: 50,
      width: 300,
      borderWidth: 5,
      borderColor: colors.secondary,
      borderRadius: 24,
      paddingHorizontal: 25,
      color: colors.surface,
      marginBottom: 15
    },
    loginBtn: {
      backgroundColor: colors.secondary,
      borderRadius: 11,
      height: 50,
      width: 300,
      alignItems: 'center',
      marginBottom: 5
    },
    loginText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.surface,
      paddingTop: 12,
      paddingBottom: 12
    },
    textBody: {
      fontSize: 15,
      marginBottom: 15,
      color: colors.surface
    }
  })

  const handleLogin = async () => {
    setLoading(true)
    try {
      await context.login({ nim, password })
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.image} />

        <Text style={styles.textTitle}>Pinjam Fasilitas</Text>

        <TextInput
          keyboardType="number-pad"
          value={nim}
          onChangeText={v => setNim(v)}
          style={styles.inputText}
          placeholder="nim"
          placeholderTextColor="#aaa"
        />
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={v => setPassword(v)}
          style={styles.inputText}
          placeholder="password"
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>
            {isLoading ? 'Mohon menunggu...' : 'Masuk'}
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
          <Text style={styles.textBody}>Belum punya akun? </Text>
          <Text
            style={[styles.textBody, { color: colors.secondary }]}
            onPress={() => navigation.navigate('register')}
          >
            Daftar
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}
