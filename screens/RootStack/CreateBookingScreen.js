import React, { useState } from 'react'
import { ScrollView, Text, StyleSheet, View } from 'react-native'

import useTheme from '../../hooks/useTheme'
import RoomPicture from '../../components/RoomPicture'
import RoomMeta from '../../components/RoomMeta'
import InputField from '../../components/InputField'
import InputDateTimePicker from '../../components/InputDateTimePicker'
import Button from '../../components/Button'

export default function CreateBookingScreen () {
  const { colors } = useTheme()

  const [bookingPurpose, setBookingPurpose] = useState('')
  const [additionalTools, setAdditionalTools] = useState('')
  const [startDateTime, setStartDateTime] = useState(new Date())
  const [endDateTime, setEndDateTime] = useState(new Date())

  const metas = [
    {
      icon: 'account-group',
      stats: 200,
      label: 'Kapasitas',
      spacedLeft: false
    },
    { icon: 'projector', stats: 2, label: 'Proyektor', spacedLeft: true },
    { icon: 'theater', stats: 1, label: 'Panggung', spacedLeft: true }
  ]

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary
    },
    primary_text: { color: colors.primary },
    white_text: { color: colors.surface },
    title: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
    subtitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 }
  })

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.white_text, styles.title]}>AULA</Text>

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
          text="Ajukan pinjaman"
          textColor="primary"
          bgColor="warning"
          onPress={() =>
            console.log(
              bookingPurpose,
              additionalTools,
              startDateTime,
              endDateTime
            )
          }
        />
      </View>
    </ScrollView>
  )
}
