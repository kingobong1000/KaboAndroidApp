// AppIcon.jsx
// IconHolder.jsx
import React from "react";
import { View, StyleSheet } from "react-native";
import AppIcon from "./Appicon";

export default function IconHolder({ icons = [], size = 25, color = "#222" }) {
  return (
    <View style={styles.container}>
      {icons.slice(0, 4).map((icon, index) => (
        <View key={index} style={styles.iconWrap}>
          <AppIcon
            name={icon.name}
            type={icon.type}
            size={icon.size || size}
            color={icon.color || color}
            onPress={() => console.log("Pressed!")}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    width: '40%',
    gap: 1,
  },



  iconWrap: {
    padding: 6,
    borderRadius: 8,
  },
});