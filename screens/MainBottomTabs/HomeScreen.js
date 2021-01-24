import React, { useState, useEffect } from 'react'
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator
} from 'react-native'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import banner from '../../assets/primakara.jpg'
import useTheme from '../../hooks/useTheme'

export default function HomeScreen () {
  const { colors } = useTheme()

  const navigation = useNavigation()

  const [currentItems, setCurrentItems] = useState('seminar')
  const [categories, setCategories] = useState([])
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [roomItems, setRoomItems] = useState([])
  const [roomItemsLoading, setRoomItemsLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setCategoryLoading(true)
      const t = await AsyncStorage.getItem('token')
      try {
        const { data } = await axios({
          method: 'get',
          url: 'http://192.168.43.148:8000/api/category-list',
          headers: {
            Authorization: `Bearer ${t}`
          }
        })
        setCategories(data)
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      } finally {
        setCategoryLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      setRoomItemsLoading(true)
      try {
        await handleChangeRoomItems('seminar')
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.LONG)
      } finally {
        setRoomItemsLoading(false)
      }
    })()
  }, [])

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
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20
    },
    imgText: {
      position: 'absolute',
      bottom: 37,
      left: 37,
      fontSize: 33,
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
      marginHorizontal: 9
    },
    categoryText: {
      fontSize: 15,
      color: '#3B91CF'
    },
    roomText: {
      color: 'white',
      marginLeft: 20
    },
    transparnBar: {
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      opacity: 0.5,
      borderRadius: 20
    }
  })

  const handleChangeRoomItems = async roomName => {
    setRoomItemsLoading(true)
    const t = await AsyncStorage.getItem('token')
    try {
      const { data } = await axios({
        method: 'get',
        url: `http://192.168.43.148:8000/api/room-list-${roomName}`,
        headers: {
          Authorization: `Bearer ${t}`
        }
      })

      setRoomItems(data)
      setCurrentItems(roomName)
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG)
    } finally {
      setRoomItemsLoading(false)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 28 }}
    >
      <View style={styles.imgWrapper}>
        <Image source={banner} style={styles.img} />
        <Text style={styles.imgText}>Pinjam Fasilitas Kampus</Text>
      </View>

      {/* borderCategory */}
      <View style={styles.borderCategory}>
        {categoryLoading
          ? (
          <ActivityIndicator color={colors.primary} size="large" />
            )
          : (
          <>
            {categories.map((c, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  styles.category,
                  {
                    backgroundColor:
                      currentItems === c.category
                        ? colors.primary
                        : colors.surface
                  }
                ]}
                onPress={async () => await handleChangeRoomItems(c.category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        currentItems === c.category
                          ? colors.surface
                          : colors.primary
                    }
                  ]}
                >
                  {c.category}
                </Text>
              </TouchableOpacity>
            ))}
          </>
            )}
      </View>

      <View style={{ paddingHorizontal: 27 }}>
        {roomItemsLoading
          ? (
          <ActivityIndicator
            color={colors.surface}
            size="large"
            style={{ marginTop: 27 }}
          />
            )
          : (
          <>
            {roomItems.length <= 0
              ? (
              <Text
                style={{
                  textAlign: 'center',
                  color: colors.surface,
                  marginTop: 27
                }}
              >
                Tidak ada ruangan untuk {currentItems}
              </Text>
                )
              : (
              <>
                {roomItems.map((r, i) => (
                  <TouchableOpacity
                    key={i}
                    style={{
                      width: '100%',
                      height: 122,
                      position: 'relative',
                      borderRadius: 20,
                      overflow: 'hidden',
                      marginTop: 27
                    }}
                    onPress={() =>
                      navigation.navigate('room-detail', { id: r.id })
                    }
                  >
                    <Image
                      style={
                        (styles.img,
                        {
                          width: '100%',
                          height: '100%',
                          resizeMode: 'cover',
                          position: 'absolute',
                          top: 0,
                          left: 0
                        })
                      }
                      source={r.image_ruangan && banner}
                    />
                    <View style={styles.transparnBar} />
                    <Text
                      style={[
                        styles.roomText,
                        { fontSize: 20, fontWeight: 'bold', marginTop: -100 }
                      ]}
                    >
                      {r.nama_ruangan}
                    </Text>
                    <Text style={styles.roomText}>
                      {r.kapasitas_ruangan} Orang | {r.proyektor} Proyektor |{' '}
                      {r.panggung} Panggung
                    </Text>
                    <View
                      style={{
                        backgroundColor: 'white',
                        position: 'absolute',
                        bottom: 0,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderTopRightRadius: 100,
                        borderBottomRightRadius: 100
                      }}
                    >
                      <Text
                        style={{
                          color: colors.otenticBlue,
                          fontSize: 18,
                          paddingHorizontal: 10
                        }}
                      >
                        {r.status_ruangan}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
                )}
          </>
            )}
      </View>
    </ScrollView>
  )
}
