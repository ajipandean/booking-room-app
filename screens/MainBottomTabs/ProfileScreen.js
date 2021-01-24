import React, { useContext } from 'react'
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native'

import useTheme from '../../hooks/useTheme'
import AuthContext from '../../contexts/AuthContext'

export default function ProfileScreen () {
  const { colors } = useTheme()

  const context = useContext(AuthContext)

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

  const handleLogout = () => context.logout()

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/default.png')}
            style={styles.imgprofile}
          />
          <Text style={styles.name}>Jagatditha</Text>
          <Text style={styles.nim}>1801020035</Text>
        </View>
        <View style={styles.subTittle}>
          <Text style={styles.h2}>Status Peminjaman</Text>
        </View>
        <View style={styles.contentList}>
          <TouchableOpacity style={styles.barContent}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../../assets/image.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.transparnBar} />
            <View style={styles.statusIconBarWaiting}>
              <Image
                source={require('../../assets/queue.png')}
                style={styles.statusIconWaiting}
              />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.h2}>Judul</Text>
              <Text style={styles.h3}>Sub Judul</Text>
              <Text style={styles.h3}>13 Januari | 14:00 -15:00</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusTextWait}>Menunggu</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.barContent}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../../assets/image.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.transparnBar} />
            <View style={styles.statusIconBarSuccess}>
              <Image
                source={require('../../assets/check.png')}
                style={styles.statusIconSuccess}
              />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.h2}>Judul</Text>
              <Text style={styles.h3}>Sub Judul</Text>
              <Text style={styles.h3}>10 Januari | 14:00 -15:00</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusTextSuccess}>Disetujui</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.barContent}>
            <View style={styles.cardImgWrapper}>
              <Image
                source={require('../../assets/image.jpg')}
                resizeMode="cover"
                style={styles.cardImg}
              />
            </View>
            <View style={styles.transparnBar} />
            <View style={styles.statusIconBarDanger}>
              <Image
                source={require('../../assets/reject.png')}
                style={styles.statusIconDanger}
              />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.h2}>Judul</Text>
              <Text style={styles.h3}>Sub Judul</Text>
              <Text style={styles.h3}>10 Januari | 14:00 -15:00</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusTextDanger}>Tidak Disetujui</Text>
            </View>
          </TouchableOpacity>
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
