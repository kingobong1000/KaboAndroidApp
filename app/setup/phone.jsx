import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
// ÷---------------------------
import ThemedSubtext from '../../components/themed/ThemeSubtxt';
import Themedtext from '../../components/themed/Themedtext';
// ÷------------------------
import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons';

 


const Phone = () => {
   const { theme, setTheme } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.topHolder}>
        <View style={styles.dud}></View>
        <View style={styles.pgicon}><Ionicons name="finger-print-outline" size={50} color="#999" /></View>
      </View>
      {/* ============= */}
      <View style={styles.hanger}>
        <Themedtext variant="design" >Phone Number</Themedtext>
        <Themedtext variant='body' fontSize={14} style={styles.spectext}>To help us set up your account, please supply us with your phone number. </Themedtext>
        <Text>{theme}</Text>
        <View style={styles.cube}>

        </View>
      </View>
    </View>
  )
}

export default Phone

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 50,
  },

  hanger: {
    width: '90%',
    minHeight: 10,
  },

   cube: {
    minHeight: 10,
    padding: 10,
    borderRadius: 15,
  },

  heading: {
    fontSize: 25,
  },

  topHolder: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '80%',
    paddingTop: 55,
  
  },

  pgicon: {
    width: 80,
    height: 95,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems:    'center'
  },

  dud: {
    width: 50,
    height: 40,
  },
  
  spectext: {
    paddingVertical: 10,
  }




})