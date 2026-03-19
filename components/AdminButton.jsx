import { StyleSheet, Text, Pressable } from 'react-native';
import { useRouter } from "expo-router";
import React from 'react'

const AdminButton = ({
  onPress,
  style, 
  ...props 
}) => {

  const router = useRouter();

  // Hide in production
  if (!__DEV__) return null;

  return (
      <Pressable
        onPress={() => router.push("../admin")}
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.pressed,
        ]}
      >
        <Text style={{ color: "#111", fontSize: 12 }}>Admin</Text>
      </Pressable>
  )
}

export default AdminButton


const styles = StyleSheet.create({
  trigger: {
    width: 60,
    height: 30,
    alignSelf: 'center',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#333",
    justifyContent: 'center',
    alignItems: 'center'
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
});