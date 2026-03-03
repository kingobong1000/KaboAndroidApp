import { View } from "react-native";

export function VerticalDotLine({ dots = 18, size = 3, ht = 5, gap = 8, color = "#999", style }) {
  return (
    <View style={[{ alignItems: "center" }, style]}>
      {Array.from({ length: dots }).map((_, i) => (
        <View
          key={i}
          style={{
            width: size,
            height: ht,
            borderRadius: size / 2,
            backgroundColor: color,
            marginBottom: i === dots - 1 ? 0 : gap,
          }}
        />
      ))}
    </View>
  );
}