import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

export default function CreateBookingScreen () {
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
      <Text>Create booking screen</Text>
    </ScrollView>
  )
}
