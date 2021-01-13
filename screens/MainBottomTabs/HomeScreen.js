import React from 'react'
import {
  View, 
  ScrollView, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity
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
    },
    borderCategory: {
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 8,
      marginTop: 20,
      marginLeft: 33,
      borderTopLeftRadius: 100,
      borderBottomLeftRadius: 100
    },
    category: {
      paddingVertical: 6,
      paddingHorizontal: 20,
      borderRadius: 100,
      elevation: 8,
      backgroundColor: 'white',
      marginHorizontal: 9
    },
    categoryText: {
      fontSize: 15,
      color: '#3B91CF'
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

      {/* borderCategory */}
      <View style={styles.borderCategory}>
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>
              Meeting
          </Text>
        </TouchableOpacity>

        {/* category */}
        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>
              Seminar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.category}>
          <Text style={styles.categoryText}>
              Workshop
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}
