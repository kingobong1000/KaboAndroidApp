import React from "react";
import { View, StyleSheet } from "react-native";

export default function Grid({
  children,
  columns = 2,
  gap = 10,
  style,
}) {
  const itemWidth = `${100 / columns}%`;

  return (
    <View style={[styles.container, style, { margin: -gap / 2 }]}>
      {React.Children.map(children, (child, index) => (
        <View
          key={index}
          style={{
            width: itemWidth,
            padding: gap / 2,
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    minHeight: 10,
  },
});