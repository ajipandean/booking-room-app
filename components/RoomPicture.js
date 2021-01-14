import React from 'react'
import { Image } from 'react-native'

export default function RoomPicture ({ width, height, uri }) {
  return (
    <Image
      style={{
        width,
        height,
        resizeMode: 'cover',
        borderRadius: 20
      }}
      source={{ uri }}
    />
  )
}
