import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'

const ThemedSpot = ({ 
  icon,
  children,
  onPress,
  text,
  style, 
  ...props 
}) => {
  return (

<Pressable
  onPress={onPress}
  style={({ pressed }) => [
    styles.card,
    {
      backgroundColor: pressed ? theme.primary : theme.uibackground,
      borderColor: pressed ? theme.primary : "transparent",
      borderWidth: 1,
    },
    pressed && { transform: [{ scale: 0.98 }] },
  ]}
>
  {({ pressed }) => (
    <>
      <View style={styles.icon}>
        {/* If your icon supports color, change it here */}
        {renderIcon({ color: pressed ? theme.onPrimary : theme.text })}
      </View>

      <View>
        <Text style={[styles.title, { color: pressed ? theme.onPrimary : theme.text }]}>
          Fast Delivery
        </Text>
        <Text style={[styles.sub, { color: pressed ? theme.onPrimary : theme.subtext }]}>
          Get items in minutes
        </Text>
      </View>
    </>
  )}
</Pressable>
  )
}

export default ThemedSpot

const styles = StyleSheet.create({})