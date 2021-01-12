import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

export default function ProfileScreen () {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    }
  })

  return (
    <ScrollView style={styles.container}>
      <Text>Profile screen</Text>
    </ScrollView>
  )
}
