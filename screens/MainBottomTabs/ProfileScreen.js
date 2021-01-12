import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

import useTheme from '../../hooks/useTheme'

export default function ProfileScreen () {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Profile screen</Text>
    </ScrollView>
  )
}
