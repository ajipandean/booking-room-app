import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import useTheme from '../hooks/useTheme'

export default function BookingItem ({
  personName,
  bookingPurpose,
  bookingDate,
  bookingStatus,
  spacedTop
}) {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor:
        bookingStatus === 'disetujui'
          ? colors.secondary
          : bookingStatus === 'pending'
            ? 'orange'
            : colors.accent,
      borderRadius: 20,
      overflow: 'hidden',
      marginTop: spacedTop ? 18 : 0
    },
    left_container: {
      flex: 1,
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      backgroundColor: colors.surface
    },
    right_container: {
      width: 100,
      paddingHorizontal: 18,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.left_container}>
        <Text style={{ fontWeight: 'bold' }}>{personName}</Text>
        <Text style={{ marginBottom: 4, color: '#888' }}>{bookingPurpose}</Text>
        <Text style={{ fontSize: 12 }}>{bookingDate}</Text>
      </View>

      <View style={styles.right_container}>
        <Text
          style={{
            color: colors.surface,
            textTransform: 'uppercase',
            fontWeight: 'bold'
          }}
        >
          {bookingStatus}
        </Text>
      </View>
    </View>
  )
}
