import React from 'react'
import { ScrollView, Text, StyleSheet } from 'react-native'

import useTheme from '../../hooks/useTheme'

export default function RegisterScreen () {
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
      <Text>Register screen</Text>
    </ScrollView>
  )
}
