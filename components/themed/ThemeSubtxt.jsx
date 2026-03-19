import React from "react";
import { Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Colors from "../../constants/Colors";

/**
 * ThemedSubtext Component
 *
 * Variants:
 * - highlight → strong emphasis text
 * - subtext   → secondary text
 * - note      → small helper / muted text
 *
 * Props:
 * - variant   → typography style
 * - fontSize  → override font size
 * - color     → override text color
 * - style     → additional styles
 * - children  → text content
 */
export default function ThemedSubtext({
  variant = "note", // "highlight" | "subtext" | "note"
  fontSize,
  color,
  style,
  children,
  ...props
}) {

  // 1️⃣ Global theme from context
  const { theme } = useTheme();

  // 2️⃣ Resolve active theme safely
  const activeTheme =
    Colors?.theme?.[theme] ??
    Colors?.theme?.light ??
    Colors?.light ??
    {};

  // 3️⃣ Typography system
  const TYPOGRAPHY = {
    highlight: {
      fontFamily: "Inter_700Bold",
      fontSize: 15,
      color: activeTheme?.hl01 ?? "#000",
    },
    subtext: {
      fontFamily: "Inter_500Medium",
      fontSize: 13,
      color: activeTheme?.undertxt ?? "#666",
    },
    note: {
      fontFamily: "Inter_300Light",
      fontSize: 11,
      color: activeTheme?.note ?? "#999",
    },
  };

  // 4️⃣ Select variant safely
  const selected = TYPOGRAPHY[variant] ?? TYPOGRAPHY.note;

  // 5️⃣ Build final style (priority matters)
  const finalStyle = [
    selected,                  // base typography
    fontSize && { fontSize },  // optional override
    color && { color },        // explicit color override
    style,                     // external styles win last
  ];

  return (
    <Text style={finalStyle} {...props}>
      {children}
    </Text>
  );
}