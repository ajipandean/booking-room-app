import React from 'react'
import { ScrollView, Text, View, StyleSheet } from 'react-native'

import useTheme from '../../hooks/useTheme'
import RoomPicture from '../../components/RoomPicture'
import RoomMeta from '../../components/RoomMeta'
import Button from '../../components/Button'
import BookingItem from '../../components/BookingItem'

export default function RoomDetailScreen () {
  const { colors } = useTheme()

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
      stats: 200,
      label: 'Kapasitas',
      spacedTop: false
    },
    { icon: 'projector', stats: 2, label: 'Proyektor', spacedTop: true },
    { icon: 'theater', stats: 1, label: 'Panggung', spacedTop: true }
  ]

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 16 }}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={[styles.white_text, styles.title]}>AULA</Text>

        <View style={{ marginBottom: 20, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <RoomPicture
              width="100%"
              height={240}
              uri="https://cintakasihtzuchi.sch.id/wp-content/uploads/2018/12/Aula-Lantai-2-Gedung-C.jpg"
            />
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
          onPress={() => console.log('Pinjam clicked.')}
        />

        <View style={{ marginTop: 24 }}>
          <Text style={[styles.white_text, styles.subtitle]}>
            Informasi Peminjaman
          </Text>

          <BookingItem
            personName="Wawan Artawan"
            bookingPurpose="Rapat HIMA IF"
            bookingDate="Nov 22, 2021 11:00 - Nov 22, 2021 12:00"
            bookingStatus="disetujui"
          />
          <BookingItem
            spacedTop
            personName="Deva Rananda"
            bookingPurpose="Gladi UKM Musik"
            bookingDate="Nov 20, 2021 09:00 - Nov 20, 2021 11:00"
            bookingStatus="belum disetujui"
          />
          <BookingItem
            spacedTop
            personName="Wawan Artawan"
            bookingPurpose="Rapat HIMA IF"
            bookingDate="Nov 22, 2021 11:00 - Nov 22, 2021 12:00"
            bookingStatus="disetujui"
          />
        </View>
      </View>
    </ScrollView>
  )
}
