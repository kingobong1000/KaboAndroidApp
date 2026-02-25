import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import Themedtext from "./Themedtext";



export function ThemedButton({
  title = "Button",
  onPress,

  // variables (as requested)
  backgroundColor,
  width = "100%",
  borderRadius = 16,
  color = '#203d70',
  // optional extras
  textColor,
  disabled = false,
  style,
  textStyle,
}) {
  // ✅ your standard
  const schemeRaw = useColorScheme();
  const colorscheme = (schemeRaw ?? "light").toLowerCase();
  const theme = Colors.theme?.[colorscheme] ?? Colors.theme.light;

  // reasonable defaults if props not provided
  const bg = backgroundColor ?? theme.brand ?? theme.tint ?? Colors.brand;
  const fg = color ?? textColor ?? theme.text ?? "#343f55";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, width, borderRadius },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Themedtext style={[styles.label, { color: fg }, textStyle]}>
        {title}
      </Themedtext>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});