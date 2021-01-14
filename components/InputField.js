import React from 'react'
import { TextInput } from 'react-native'

import useTheme from '../hooks/useTheme'

export default function InputField (props) {
  const { colors } = useTheme()

  const { height, paddingVertical, textAlignVertical } = props

  return (
    <TextInput
      {...props}
      style={{
        height,
        paddingVertical,
        textAlignVertical,
        backgroundColor: colors.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        fontSize: 16
      }}
    />
  )
}
