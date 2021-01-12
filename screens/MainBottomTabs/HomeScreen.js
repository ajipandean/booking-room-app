import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

export default function HomeScreen () {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#001b39'
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Home screen</Text>
    </ScrollView>
  )
}
