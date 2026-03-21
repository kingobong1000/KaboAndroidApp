// AppIcon.jsx
import React from "react";
import { Image, Pressable } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";

const iconSets = {
  mci: MaterialCommunityIcons,
  ion: Ionicons,
  fe: Feather,
  fa: FontAwesome,
};

export default function AppIcon({
  name,
  type = "mci",
  size = 20,
  color = "#222",
  style,
  onPress,
  disabled,
  pressStyle,
}) {
  const IconComponent =
    typeof name === "string" ? iconSets[type] : null;

  const renderIcon = () => {
    // ✅ Custom image support
    if (typeof name !== "string") {
      return (
        <Image
          source={name}
          style={[{ width: size, height: size }, style]}
          resizeMode="contain"
        />
      );
    }

    if (!IconComponent) {
      console.warn(`Unknown icon type: ${type}`);
      return null;
    }

    return (
      <IconComponent
        name={name}
        size={size}
        color={color}
        style={style}
      />
    );
  };

  // ✅ If no onPress → render plain icon (no overhead)
  if (!onPress) {
    return renderIcon();
  }

  // ✅ If onPress → wrap with Pressable
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        pressStyle,
      ]}
    >
      {renderIcon()}
    </Pressable>
  );
}