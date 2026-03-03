import { View } from "react-native";

export function HorisDotLine({ dots = 30, size = 3, gap = 6, color = "#999" }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {Array.from({ length: dots }).map((_, i) => (
        <View
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            marginRight: i === dots - 1 ? 0 : gap,
          }}
        />
      ))}
    </View>
  );
}