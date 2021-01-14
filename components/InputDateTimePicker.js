import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'

import InputField from './InputField'
import useTheme from '../hooks/useTheme'

export default function InputDateTimePicker ({
  dateTime,
  setDateTime,
  pickerMode,
  placeholder,
  spacedTop
}) {
  const { colors } = useTheme()
  const [showPicker, setShowPicker] = useState(false)

  const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 12 },
    inner_top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  })

  const formattedDate = date => Moment(date).format('LL')

  const handlePickerOnChange = (event, selectedDateTime) => {
    const currentDateTime = selectedDateTime || dateTime
    setShowPicker(false)
    setDateTime(currentDateTime)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner_top}>
        <InputField
          height={42}
          editable={false}
          placeholder={placeholder}
          onFocus={() => console.log('Focused')}
          value={formattedDate(dateTime)}
        />
        <TouchableOpacity
          style={{ marginLeft: 12 }}
          onPress={() => setShowPicker(true)}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={24}
            color={colors.surface}
          />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={dateTime}
          mode={pickerMode}
          is24Hour={true}
          display="default"
          minimumDate={new Date()}
          onChange={handlePickerOnChange}
        />
      )}
    </View>
  )
}
