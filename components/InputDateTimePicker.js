import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import Moment from 'moment'

import InputField from './InputField'
import useTheme from '../hooks/useTheme'

export default function InputDateTimePicker ({
  dateTime,
  setDateTime,
  placeholder,
  spacedTop,
  label,
  icon,
  textFormat,
  minimumDate
}) {
  const { colors } = useTheme()
  const [showPicker, setShowPicker] = useState(false)
  const [pickerMode, setPickerMode] = useState('date')

  const styles = StyleSheet.create({
    container: { flex: 1, marginTop: 12 },
    inner_top: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    label: {
      color: colors.surface,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8
    }
  })

  const formattedDate = date => Moment(date).format(textFormat)

  const handlePickerOnChange = (event, selectedDateTime) => {
    if (event.type === 'dismissed') {
      setShowPicker(false)
      setPickerMode('date')
    } else {
      if (pickerMode === 'date') {
        const currentDateTime = selectedDateTime || dateTime
        setShowPicker(false)
        setDateTime(currentDateTime)
        setPickerMode('time')
        setShowPicker(true)
      } else {
        const currentDateTime = selectedDateTime || dateTime
        setShowPicker(false)
        setDateTime(currentDateTime)
        setPickerMode('date')
      }
    }
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inner_top}>
        <InputField
          height={42}
          editable={false}
          placeholder={placeholder}
          onFocus={() => console.log('Focused')}
          value={formattedDate(dateTime)}
        />
        <TouchableOpacity
          style={{ marginLeft: 8 }}
          onPress={() => setShowPicker(true)}
        >
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color={colors.surface}
          />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={dateTime}
          mode={pickerMode}
          display="default"
          minimumDate={minimumDate}
          onChange={handlePickerOnChange}
        />
      )}
    </View>
  )
}
