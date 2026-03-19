import { StyleSheet, Linik, Text, View, Pressable } from 'react-native'
import { Stack, useRouter, Link } from "expo-router";
import React from 'react'
// ------------------------
import { Colors } from '../../constants/Colors'
import { useTheme } from '../../context/ThemeContext';
// ------------------------
import { Ionicons } from '@expo/vector-icons';
// ------------------------
import ThemedSubtext from '../../components/themed/ThemeSubtxt';

const AdminLayout = () => {
    const router = useRouter();
const { theme, setTheme } = useTheme(); // ✅ theme is available
const uTheme = Colors.theme[theme] ?? Colors.theme.light;



  return (
    <View style={{ flex: 1 }}>
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

        </Stack>
    </View>
  )
}

export default AdminLayout

const styles = StyleSheet.create({

})