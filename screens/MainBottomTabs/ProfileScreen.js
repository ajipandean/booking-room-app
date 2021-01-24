import React, { useContext, useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl
} from 'react-native'
import axios from 'axios'
import Moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import useTheme from '../../hooks/useTheme'
import AuthContext from '../../contexts/AuthContext'
import LoadingState from '../../components/LoadingState'

export default function ProfileScreen () {
  const { colors } = useTheme()
  const navigation = useNavigation()

  const [user, setUser] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const context = useContext(AuthContext)

  useEffect(() => {
    ;(async () => {
      await handleFetchProfile()
    })()
  }, [])

  const handleFetchProfile = async () => {
    setLoading(true)
    try {
      const t = await AsyncStorage.getItem('token')

      const { data } = await axios({
        method: 'get',
        url: 'https://sibook.alihgae.com/api/profile',
        headers: {
          Authorization: `Bearer ${t}`
        }
      })

      setUser(data[0])
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await handleFetchProfile()
    setRefreshing(false)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary
    },
    backgroundContainer: {
      flex: 1,
      width: null,
      height: null
    },
    profileContainer: {
      marginTop: 100,
      paddingTop: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imgprofile: {
      height: 120,
      width: 120,
      marginHorizontal: 72,
      marginBottom: 10,
      borderRadius: 100
    },
    name: {
      color: 'white',
      fontSize: 26,
      fontWeight: 'bold',
      marginHorizontal: 100,
      marginTop: 4
    },
    nim: {
      color: 'white',
      fontSize: 16,
      marginHorizontal: 100,
      marginTop: 4,
      marginBottom: 18
    },
    containerProfile: {
      paddingLeft: 100
    },
    subTittle: {
      marginTop: 20,
      marginBottom: 20,
      marginLeft: -180
    },
    h2: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    h3: {
      fontSize: 16,
      color: 'white'
    },
    contentList: {
      marginTop: 15,
      marginBottom: 55
    },
    barContent: {
      marginBottom: 10,
      borderColor: 'white',
      height: 135,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20
    },
    cardsWrapper: {
      height: 135,
      borderRadius: 30,
      marginBottom: 20,
      alignSelf: 'center'
    },
    cardImgWrapper: {
      marginTop: 100,
      zIndex: 0
    },
    cardImg: {
      marginTop: -155,
      height: 135,
      width: 340,
      alignSelf: 'center',
      borderRadius: 20
    },
    statusIconBarDanger: {
      backgroundColor: 'red',
      width: 100,
      height: 135,
      zIndex: 8,
      marginTop: -135,
      marginRight: -240,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20
    },
    statusIconBarWaiting: {
      backgroundColor: 'orange',
      width: 100,
      height: 135,
      zIndex: 8,
      marginTop: -135,
      marginRight: -240,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20
    },
    statusIconBarSuccess: {
      backgroundColor: '#00C2FF',
      width: 100,
      height: 135,
      zIndex: 8,
      marginTop: -135,
      marginRight: -240,
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20
    },
    statusIconDanger: {
      zIndex: 9,
      width: 35,
      height: 35,
      marginRight: 38,
      marginLeft: 38,
      marginVertical: 45
    },
    statusIconSuccess: {
      zIndex: 9,
      width: 35,
      height: 35,
      marginRight: 38,
      marginLeft: 38,
      marginVertical: 50
    },
    statusIconWaiting: {
      zIndex: 9,
      width: 35,
      height: 35,
      marginRight: 38,
      marginLeft: 38,
      marginVertical: 50
    },
    transparnBar: {
      paddingVertical: 0,
      width: 340,
      height: 135,
      backgroundColor: 'black',
      opacity: 0.6,
      zIndex: 2,
      marginTop: -154,
      borderRadius: 20
    },
    textContent: {
      width: 240,
      zIndex: 4,
      marginTop: -120,
      marginLeft: -120,
      color: 'white'
    },
    status: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      height: 35,
      borderWidth: 2,
      zIndex: 5,
      marginTop: 17,
      marginLeft: -190,
      backgroundColor: 'white',
      width: 150
    },
    statusTextDanger: {
      fontSize: 18,
      color: '#FF0000',
      paddingVertical: 4,
      paddingHorizontal: 10,
      paddingLeft: 20
    },
    statusTextSuccess: {
      fontSize: 18,
      color: '#00C2FF',
      paddingVertical: 4,
      paddingHorizontal: 10,
      paddingLeft: 20
    },
    statusTextWait: {
      fontSize: 18,
      color: 'orange',
      paddingVertical: 4,
      paddingHorizontal: 10,
      paddingLeft: 20
    },
    button: {
      marginHorizontal: '20%',
      alignContent: 'center',
      alignItems: 'center',
      zIndex: 4,
      width: 200,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.otenticBlue
    }
  })

  const statuses = {
    disetujui: {
      textColor: styles.statusTextSuccess,
      iconColor: styles.statusIconBarSuccess,
      icon: require('../../assets/check.png')
    },
    pending: {
      textColor: styles.statusTextWait,
      iconColor: styles.statusIconBarWaiting,
      icon: require('../../assets/queue.png')
    },
    'belum disetujui': {
      textColor: styles.statusTextDanger,
      iconColor: styles.statusIconBarDanger,
      icon: require('../../assets/reject.png')
    }
  }

  const handleLogout = async () => await context.logout()

  const formattedBookingDate = (start, end) => {
    const startDate = Moment(start).format('lll')
    const endDate = Moment(end).format('lll')
    return `${startDate} - ${endDate}`
  }

  if (isLoading) return <LoadingState />
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/default.png')}
            style={styles.imgprofile}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.nim}>{user.nim}</Text>
        </View>

        <View style={styles.subTittle}>
          <Text style={styles.h2}>Status Peminjaman</Text>
        </View>

        <View style={styles.contentList}>
          {user.peminjam && (
            <>
              {user.peminjam.length <= 0
                ? (
                <Text
                  style={{
                    marginBottom: 24,
                    textAlign: 'center',
                    color: colors.surface
                  }}
                >
                  Anda tidak meminjam ruangan apapun.
                </Text>
                  )
                : (
                <>
                  {user.peminjam.map((p, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.barContent}
                      onPress={() =>
                        navigation.navigate('room-detail', { id: p.room_id })
                      }
                    >
                      <View style={styles.cardImgWrapper}>
                        <Image
                          source={{
                            uri: `https://sibook.alihgae.com/img/${p.room.image_ruangan}`
                          }}
                          resizeMode="cover"
                          style={styles.cardImg}
                        />
                      </View>
                      <View style={styles.transparnBar} />
                      <View style={statuses[p.status].iconColor}>
                        <Image
                          source={statuses[p.status].icon}
                          style={styles.statusIconWaiting}
                        />
                      </View>
                      <View style={styles.textContent}>
                        <Text style={styles.h2}>{p.room.nama_ruangan}</Text>
                        <Text style={styles.h3}>{p.tujuan}</Text>
                        <Text style={styles.h3}>
                          {formattedBookingDate(p.tgl_pinjam, p.tgl_selesai)}
                        </Text>
                      </View>
                      <View style={styles.status}>
                        <Text style={statuses[p.status].textColor}>
                          {p.status}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </>
                  )}
            </>
          )}

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
                paddingVertical: 8
              }}
            >
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}
