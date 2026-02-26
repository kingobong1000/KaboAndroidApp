import { StyleSheet, Text, View, useColorScheme, Pressable } from 'react-native'
import { Stack, useRouter, Link } from "expo-router";
import { StatusBar } from 'expo-status-bar'
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
 


const SetupLayout = () => {
  const schemeRaw = useColorScheme();
  const colorscheme = schemeRaw.toLowerCase();
  const isDark = colorscheme;
  const theme = Colors.theme[colorscheme] ?? Colors.theme.light
  console.log('Whats in the theme: ', colorscheme);
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: isDark }}>
    <StatusBar style={(isDark === 'light') ? 'Dark' : 'light'} 
      backgroundColor="transparent"
      translucent />

    <Stack screenOptions={{
        headerTransparent: true,
        headerStyle: { backgroundColor: "transparent" },
        headerShadowVisible: false,
        headerTintColor: theme.tint,      // arrow color
        headerTitleStyle: {
          fontSize: 15,
          fontWeight: "700",
          color: "#1d3c93",              // title text color
        },
        headerBackTitleVisible: false,   // removes "Back" text on iOS
        headerBackVisible: false,
        headerLeft: ({ tintColor, canGoBack }) =>
          canGoBack ? (
            <Pressable
              onPress={() => router.back()}
              style={{ paddingHorizontal: 1, paddingVertical: 8 }}
              hitSlop={10}
            >
               <Ionicons name="chevron-back" size={26} color={tintColor} />
            </Pressable>
          ) : null,
      }}
    >
            <Stack.Screen name="index"  options={{
              title:"Home", 
              headerShown: false 
            }} />

            <Stack.Screen name="address"  options={{
              title:"Address", 
              headerShown: false 
            }} />
        </Stack>
    </View>
  )
}

export default SetupLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        background: '#333'
    },



  
})