import { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";


import { ThemeProvider } from "../context/ThemeContext";

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

 

export default function RootLayout() {
  
  const [theme, setTheme] = useState("light");
  const [ready, setReady] = useState(false);
 
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

  // setting up the database
  // ============================
  // 3️⃣ Conditional rendering happens AFTER hooks
 if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Stack 
        screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" options={{title: 'Home'}} />
      </Stack>
    </ThemeProvider>  
  )
}

 
 