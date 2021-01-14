import React from 'react'
import { TextInput } from 'react-native'

import useTheme from '../hooks/useTheme'

export default function InputField (props) {
  const { colors } = useTheme()

  const { height, paddingVertical, textAlignVertical, spacedTop } = props

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
        fontSize: 16,
        color: 'black',
        flex: 1,
        marginTop: spacedTop ? 12 : 0
      }}
    />
  )
}
