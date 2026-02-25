import React, { useEffect } from "react";
import { Image, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


// Images
import whtlogo from '../assets/whitelogo.png';
 

export default function RedirectScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/splash"); // change to your target route
    }, 2500);
  }, []);

  return (
    <LinearGradient
      colors={["#e8e3e3", "#87b6fc"]} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>    
        
        <View style={styles.content}>
          <View style={styles.logocase}><Image source={whtlogo} style={styles.img} /></View>
          <Text style={styles.title}>Welcome</Text>
          
          <Text style={styles.subtitle}>
            Loading your preferences
          </Text>

          <ActivityIndicator size="large" color="white" style={{ marginTop: 20 }} />
          
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 5,
  },

  logocase: {
    width: 200,
    height: 70
  },

  img: {
    width: '100%',
    height: 80
  }
});