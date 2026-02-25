import React from "react";
import { StyleSheet, Text, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

export default function ThemedSubtext({
  style,
  variant = "note", // "highlight" | "subtext" | "note"
  fontSize,
  children,
  ...props
}) {
  const scheme = (useColorScheme() || "light").toLowerCase();

  // Safer fallback in case your Colors shape differs
  const theme =
    Colors?.theme?.[scheme] ??
    Colors?.theme?.light ??
    Colors?.[scheme] ??
    Colors?.light;

  const typography = {
    highlight: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 17,
      color: theme?.hl01,
    },
    subtext: {
      fontFamily: "Inter_500Medium",
      fontSize: 13,
      color: theme?.undertxt,
    },
    note: {
      fontFamily: "Inter_300Light",
      fontSize: 11,
      color: theme?.note,
    },
  };

  const selected = typography[variant] ?? typography.note;

  return (
    <Text
      {...props}
      style={[
        styles.text,
        {
          fontFamily: selected.fontFamily,
          fontSize: fontSize ?? selected.fontSize,
          color: selected.color,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingLeft: 15,
    flexShrink: 1, // better than flex: 1 for Text
    // remove width/flex so it doesn't collapse in certain layouts
  },
});