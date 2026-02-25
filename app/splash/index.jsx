import { StyleSheet, Text, View, Image} from 'react-native'
import { useEffect } from 'react';
import { router } from 'expo-router';

import { StatusBar } from 'expo-status-bar';
import Screen from '../../assets/images/screen.jpg';
const Splash = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/intro'); // or /(dashboard)
    }, 11000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container} >
      <StatusBar style="light" transparent />{/* or "dark" depending on your background */}
      <Image source={Screen} style={styles.img} />
      <View style={styles.imposed}>
        <Text style={styles.maintitle}>Kabo Nigeria</Text>
        <Text style={[styles.txt, {fontFamily: 'Inter_800ExtraBold'}]}>It's your friendly neighbourhood Delivery man</Text>
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
 container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgrond: "#1459daff"
  },
  

  img: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: 1,

  },

  imposed: {
    minHeight: 10,
    position: 'absolute',
    width: '75%',
    left: 30,
    bottom: 170,
    zIndex: 3
  },

  maintitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1bd78fff',
    paddingVertical: 10
  },

  txt: {
    fontSize: 33,
    lineHeight: 33,
    color: '#fff'     
  }
})


