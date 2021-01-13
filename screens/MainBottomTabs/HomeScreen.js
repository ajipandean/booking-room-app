import React from 'react'
import {
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Image 
} from 'react-native'

import banner from '../../assets/primakara.jpg'
import useTheme from '../../hooks/useTheme'

export default function HomeScreen () {
  const { colors } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary
    },
    imgWrapper: {
      width: '100%',
      height: 233,
      position: 'relative',
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
      overflow: 'hidden'
    },
    img: {
      width:'100%',
      height: '100%',
      resizeMode: 'cover'
    },
    imgText: {
      position: 'absolute',
      bottom: 37,
      left: 37,
      fontSize: 24,
      color: colors.surface,
      width: 255,
      fontWeight: 'bold'
    }
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imgWrapper}>
        <Image source={banner} style={styles.img} />
          <Text style={styles.imgText}>
            Pinjam Fasilitas Kampus
          </Text>
      </View>
    </ScrollView>
  )
}
