import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

export default function BlockChip({
  onPress,
  icon,
  txt,
  style,
  pressedStyle,
  disabled,
  ...props
}) {

const { theme, setTheme } = useTheme(); // ✅ theme is available
const uTheme = Colors.theme[theme] ?? Colors.theme.light;

return (
    <Pressable
      {...props}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.trigger, {backgroundColor: uTheme.onDark},
        style,
        pressed && !disabled && (pressedStyle || styles.pressed),
        disabled && styles.disabled,
      ]}
    >
      {icon && <View style={styles.icon}>{icon}</View>}

      {txt && (
        <Text style={[styles.text, {color: uTheme.htext}]}>
          {txt}
        </Text>
      )}
    </Pressable>
  );
}


const styles = StyleSheet.create({
 
  trigger: {
    width: "100%", // 2 columns
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 12,
    height: 84,

    shadowColor: "#3e3d3d",
    shadowOffset: { width: 6, height: 9 },
    shadowOpacity: 0.05,
    shadowRadius: 9,

    elevation: 13,
  },

  text: {
    fontSize: 12,
    paddingTop: 9
  }
});