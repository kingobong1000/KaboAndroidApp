import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import ThemedSubtext from './ThemeSubtxt'
import AppIcon from './Appicon';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

export default function Notes({
  children,
  type = "info", // success | warning | error | info
  onPress,
  style,
  maxLength = 150, // max chars for text summary
  ...props
}) {
    const { theme } = useTheme();
    const uTheme =
    Colors?.theme?.[theme] ??
    Colors?.theme?.light ??
    {};

  const types = {
    success: { icon: "check-circle", color: "#02d099" },
    warning: { icon: "alert-circle", color: "#f3b712f1" },
    error: { icon: "close-circle", color: "#fd2d76" },
    info: { icon: "information", color: "#056ef0" },
  };

  const indicatorColor = types[type] || types.info;

    // 🔹 Trim text if too long
  const text = typeof children === "string" && children.length > maxLength
    ? children.substring(0, maxLength).trim() + "…"
    : children;

  return (
<Pressable
  onPress={onPress}
  style={({ pressed }) => [
    styles.container,
    style,
    {
      backgroundColor: pressed ? uTheme.offbg : "#FFF",
      borderBottomColor: uTheme.border,
      borderBottomWidth: 1,
      opacity: pressed ? 0.6 : 1,
    },
  ]}
  {...props}
>
  {({ pressed }) => (
    <>
      {/* Vertical colored indicator */}
      <View
        style={[styles.indicator, { backgroundColor: indicatorColor.color }]}
      />

      {/* Text reacts to pressed */}
      <ThemedSubtext
        variant="subtext"
        fontSize={14}
        color={pressed ? uTheme.textActive : uTheme.sublime} 
        style={styles.txt}
      >
        {text}
      </ThemedSubtext>
    </>
  )}
</Pressable>
  );
}
 

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        minHeight: 10,
        paddingVertical: 16,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        borderStyle: 'dotted', // optional
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 1,
        elevation: 2
 

    },

    indicator: {
        width: 6,
        backgroundColor: '#999',
        marginTop: 1,
        marginBottom: 1
    },

    txt: {
        flex: 1,
        paddingLeft: 15,
    }

})

