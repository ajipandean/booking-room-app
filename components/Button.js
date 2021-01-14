import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

import useTheme from '../hooks/useTheme'

export default function Button ({ text, bgColor, textColor }) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: colors[bgColor],
      alignItems: 'center',
      borderRadius: 12
    },
    text: { color: colors[textColor], fontSize: 16, fontWeight: 'bold' }
  })

  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}
