import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
  AntDesign
} from '@expo/vector-icons';

import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';



const RootLayout = () => {
 
      // fonts
    const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black
  });


  if (!fontsLoaded) {
    return null; // or keep splash visible
  }

  return (
      <Stack 
        screenOptions={{ headerShown: false }} >
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="(responses)" options={{headerShown: false}} />
        <Stack.Screen name="index" options={{title: 'Home'}} />
      </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({})