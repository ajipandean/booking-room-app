import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen () {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Login screen</Text>
      </View>
    </SafeAreaView>
  )
}
