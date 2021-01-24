import React, { useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import {
  DeviceEventEmitter,
  ToastAndroid,
  ScrollView,
  Text,
  StyleSheet,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Moment from 'moment'
import { API_URL } from '@env'

import useTheme from '../../hooks/useTheme'
import RoomPicture from '../../components/RoomPicture'
import RoomMeta from '../../components/RoomMeta'
import InputField from '../../components/InputField'
import InputDateTimePicker from '../../components/InputDateTimePicker'
import Button from '../../components/Button'

export default function CreateBookingScreen () {
  const { colors } = useTheme()
  const route = useRoute()
  const navigation = useNavigation()

  const [room] = useState(route.params.room)
  const [bookingPurpose, setBookingPurpose] = useState('')
  const [additionalTools, setAdditionalTools] = useState('')
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())
  const [isLoading, setLoading] = useState(false)

  const metas = [
    {
      icon: 'account-group',
      stats: room.kapasitas_ruangan,
      label: 'Kapasitas',
      spacedLeft: false
    },
    {
      icon: 'projector',
      stats: room.proyektor,
      label: 'Proyektor',
      spacedLeft: true
    },
    {
      icon: 'theater',
      stats: room.panggung,
      label: 'Panggung',
      spacedLeft: true
    }
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary
    },
    white_text: { color: colors.surface },
    title: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
    subtitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }
  })

  const handleRoomBooking = async () => {
    setLoading(true)
    try {
      const t = await AsyncStorage.getItem('token')

      console.log()

      const { data } = await axios({
        method: 'post',
        url: `${API_URL}/api/booking`,
        headers: {
          Authorization: `Bearer ${t}`
        },
        data: {
          room_id: room.id,
          tujuan: bookingPurpose,
          tgl_pinjam: Moment(startDateTime).format('YYYY-MM-DD hh:mm:ss'),
          tgl_selesai: Moment(endDateTime).format('YYYY-MM-DD hh:mm:ss'),
          tambahan: additionalTools
        }
      })

      if (data.statusCode === 200) {
        navigation.navigate('room-detail')
        DeviceEventEmitter.emit('create-booking', room.id)
      } else {
        throw new Error('Error occurred')
      }
    } catch (err) {
      ToastAndroid.show(err.message, ToastAndroid.LONG)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.white_text, styles.title]}>
          {room.nama_ruangan}
        </Text>

        <View style={{ marginBottom: 16 }}>
          <RoomPicture
            width="100%"
            height={170}
            uri="https://cintakasihtzuchi.sch.id/wp-content/uploads/2018/12/Aula-Lantai-2-Gedung-C.jpg"
          />
        </View>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 24 }}
      >
        {metas.map((m, i) => (
          <RoomMeta
            key={`meta-${i}`}
            width={124}
            icon={m.icon}
            stats={m.stats}
            label={m.label}
            spacedLeft={m.spacedLeft}
          />
        ))}
      </ScrollView>

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.white_text, styles.subtitle]}>
          Form peminjaman
        </Text>

        <View>
          <InputField
            height={42}
            placeholder="Tujuan peminjaman"
            value={bookingPurpose}
            onChangeText={value => setBookingPurpose(value)}
          />
          <InputDateTimePicker
            spacedTop
            icon="calendar"
            label="Tanggal pinjam"
            dateTime={startDateTime}
            setDateTime={setStartDateTime}
            textFormat="llll"
            minimumDate={new Date()}
          />
          <InputDateTimePicker
            spacedTop
            icon="calendar"
            label="Tanggal selesai"
            dateTime={endDateTime}
            setDateTime={setEndDateTime}
            textFormat="llll"
            minimumDate={startDateTime}
          />
          <InputField
            multiline
            spacedTop
            height={120}
            paddingVertical={12}
            textAlignVertical="top"
            placeholder="Alat tambahan seperti: Mic, sound"
            value={additionalTools}
            onChangeText={value => setAdditionalTools(value)}
          />
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, marginTop: 24 }}>
        <Button
          text={isLoading ? 'Mohon menunggu...' : 'Ajukan pinjaman'}
          textColor="primary"
          bgColor="warning"
          onPress={async () => await handleRoomBooking()}
        />
      </View>
    </ScrollView>
  )
}
