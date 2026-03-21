import { React, useState } from "react";
import { StyleSheet, View, Pressable, Text, TextInput } from "react-native";
// ------------------------------
import { useTheme } from "../../context/ThemeContext";
import { Colors } from "../../constants/Colors";
// ------------------------------
import ThemedSubtext from "./ThemeSubtxt";
import { getRelativeCoords } from "react-native-reanimated";




export default function Bucket({
  onPress,
  icon,
  header,
  txt,
  height = 155,
  buttontxt,
  inputPlaceholder,
  inputProps,
  style,
  pressedStyle,
  disabled,
  ...props
}) {

  // ✅ Only what you need
const { theme } = useTheme();
 const [tableName, setTableName] = useState("");


const uTheme =
  Colors?.theme?.[theme] ??
  Colors?.theme?.light ??
  {};

  // console.log('Check the theme:', theme, 'Get uTheme:', uTheme);
 
  return (
    <View style={[styles.container,{height: height}, style]} {...props}>

      {/* Icon */}
      <View style={[styles.icon, {backgroundColor: uTheme.indicator}]}>
        <View style={[styles.iconInset, {backgroundColor: uTheme.grad1}]}>
          {icon && <View style={styles.iconsvg}>{icon}</View>}
        </View>
      </View> 
      
      {/* Header */}
      {header && (
        <ThemedSubtext variant="highlight" style={styles.txt}>
          {header}
        </ThemedSubtext>
      )}

      {/* Body Text */}
      {txt && (
        <ThemedSubtext variant="note" style={styles.wedge}>
          {txt}
        </ThemedSubtext>
      )}

          {inputPlaceholder && (
          <TextInput
            style={[styles.input, { color: uTheme.htext ?? "#000" }]}
            placeholder={inputPlaceholder}
            placeholderTextColor={uTheme.note ?? "#888"}
            {...inputProps} // for extra props like onChangeText
          />
        )}

      {/* Button */}
      {buttontxt && (
        <Pressable
          onPress={onPress}
          disabled={disabled}
          style={({ pressed }) => [
            styles.trigger,
            { backgroundColor: uTheme.brand ?? "#c09090" },
            pressed && !disabled && (pressedStyle || styles.pressed),
            disabled && styles.disabled,
          ]}
        >
            <Text style={[styles.btxt, { color: uTheme?.onDark ?? "#fff" }]}>
              {buttontxt}
            </Text>
        </Pressable>
      )}
    </View>
  );
}






const styles = StyleSheet.create({
  container: {
    minHeight: 14,
    padding: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    paddingBottom: 12
  },

  icon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    overflow: "hidden",
  },
  
  iconInset: {
    width: 35,
    height: 35,
    borderRadius: 7,
    position: 'relative',
    top: 8,
    left: -8
  },

  iconsvg: {
    width: 25,
    height: 25,
    position: 'relative',
    left: 15,
  },

  header: {
    paddingTop: 10,
  },

  indicator: {
    borderRadius: 6,
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    overflow: 'hidden',
    zIndex: 10,
  },

  indicatorlight: {
    borderRadius: 6,
    position: 'relative',
    width: 20,
    height: 20,
    top: 7,
    right: 7,
    zIndex: 1,
    
  },

  trigger: {
    borderRadius: 11,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txt: {
    minHeight: 15,
    color: '#333',
    paddingTop: 5
  },

  wedge: {
    minHeight: 15,
    paddingBottom: 11,
    paddingTop: 1
  },

  btxt: {
    minHeight: 11,
  },

input: {
    height: 35,
    borderWidth: 2,
    borderColor: "#999",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    lineHeight: 13, // >= fontSize
    alignItems: 'center'
},
})