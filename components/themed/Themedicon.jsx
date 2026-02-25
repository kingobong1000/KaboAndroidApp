import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

// ✅ your SVG wrapper we set up earlier
import GoogleIcon from "../GoogleIcon";

const ICON_FAMILIES = {
  ion: Ionicons,
  material: MaterialIcons,
  mci: MaterialCommunityIcons,
  fa: FontAwesome,
  feather: Feather,

  // ✅ add google here
  google: GoogleIcon,
};

const VARIANTS = {
  minion: { size: 66, colorKey: "hl01" },      // biggest
  rubicon: { size: 55, colorKey: "undertxt" }, // medium
  note: { size: 44, colorKey: "note" },        // smallest
};

export default function Themedicon({
  family = "ion", // "google" works now
  Icon,           // optional override: pass any icon component directly
  name,
  variant = "rubicon",

  size,
  color,
  colorKey,

  containerStyle,
  iconStyle,
  ...props
}) {
  const scheme = (useColorScheme() || "light").toLowerCase();
  const theme = Colors?.theme?.[scheme] ?? Colors?.theme?.light ?? {};

  const v = VARIANTS[variant] ?? VARIANTS.rubicon;
  const finalSize = size ?? v.size;

  const keyToUse = colorKey ?? v.colorKey;
  const finalColor = color ?? theme[keyToUse] ?? theme.hl01 ?? "#000";

  const IconComponent = Icon || ICON_FAMILIES[family] || Ionicons;

  return (
    <View style={[styles.wrap]}>
      <IconComponent
        name={name}
        size={finalSize}
        color={finalColor}
        style={iconStyle}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: "center",
     width: 40,
    height: 44,
  },
 
});