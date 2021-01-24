import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  DeviceEventEmitter,
  ToastAndroid,
  ScrollView,
  Text,
  View,
  StyleSheet,
  RefreshControl
} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Moment from 'moment'

import useTheme from '../../hooks/useTheme'
import RoomPicture from '../../components/RoomPicture'
import RoomMeta from '../../components/RoomMeta'
import Button from '../../components/Button'
import BookingItem from '../../components/BookingItem'
import LoadingState from '../../components/LoadingState'

export default function RoomDetailScreen () {
  const { colors } = useTheme()
  const route = useRoute()
  const navigation = useNavigation()

  const [id] = useState(route.params.id)
  const [room, setRoom] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    DeviceEventEmitter.addListener('create-booking', handleFetchRoomDetail)

    return () => {
      DeviceEventEmitter.removeListener('create-booking')
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      await handleFetchRoomDetail(id)
    })()
  }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary
    },
    white_text: { color: colors.surface },
    title: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
    subtitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }
  })

  const metas = [
    {
      icon: 'account-group',
      stats: room.kapasitas_ruangan,
      label: 'Kapasitas',
      spacedTop: false
    },
    {
      icon: 'projector',
      stats: room.proyektor,
      label: 'Proyektor',
      spacedTop: true
    },
    {
      icon: 'theater',
      stats: room.panggung,
      label: 'Panggung',
      spacedTop: true
    }
  ]

  const handleRefresh = async () => {
    setRefreshing(true)
    await handleFetchRoomDetail(id)
    setRefreshing(false)
  }

  const handleFetchRoomDetail = async roomId => {
    setLoading(true)
    try {
      const t = await AsyncStorage.getItem('token')

      const { data } = await axios({
        method: 'get',
        url: `https://sibook.alihgae.com/api/room-detail/${id}`,
        headers: {
          Authorization: `Bearer ${t}`
        }
      })
      setRoom(data[0])
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG)
    } finally {
      setLoading(false)
    }
  }

  const formattedBookingDate = (start, end) => {
    const startDate = Moment(start).format('lll')
    const endDate = Moment(end).format('lll')
    return `${startDate} - ${endDate}`
  }

  if (isLoading || !room) return <LoadingState />
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.white_text, styles.title]}>
          {room.nama_ruangan}
        </Text>

        <View style={{ marginBottom: 20, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <RoomPicture width="100%" height={240} uri={room.image_ruangan} />
          </View>
          <View style={{ marginLeft: 20 }}>
            {metas.map((m, i) => (
              <RoomMeta
                key={`meta-${i}`}
                width={125}
                icon={m.icon}
                stats={m.stats}
                label={m.label}
                spacedTop={m.spacedTop}
              />
            ))}
          </View>
        </View>

        <Button
          text="Pinjam"
          textColor="primary"
          bgColor="warning"
          onPress={() => navigation.navigate('create-booking', { room })}
        />

        <View style={{ marginTop: 24 }}>
          <Text style={[styles.white_text, styles.subtitle]}>
            Informasi Peminjaman
          </Text>

          {room.peminjam && (
            <>
              {room.peminjam.length <= 0
                ? (
                <Text style={{ color: colors.surface }}>
                  Belum ada yang meminjam ruangan ini.
                </Text>
                  )
                : (
                <>
                  {room.peminjam.map((p, i) => (
                    <BookingItem
                      key={i}
                      personName={p.user.name}
                      bookingPurpose={p.tujuan}
                      bookingDate={formattedBookingDate(
                        p.tgl_pinjam,
                        p.tgl_selesai
                      )}
                      bookingStatus={p.status}
                      spacedTop={i > 0}
                    />
                  ))}
                </>
                  )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
