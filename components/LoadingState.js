import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import useTheme from '../hooks/useTheme'

export default function LoadingState () {
  const { colors } = useTheme()

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary
      }}
    >
      <ActivityIndicator
        color={colors.surface}
        size={48}
        style={{ marginBottom: 24 }}
      />
      <Text style={{ color: colors.surface, fontSize: 24, fontWeight: 'bold' }}>
        Loading...
      </Text>
    </View>
  )
}
