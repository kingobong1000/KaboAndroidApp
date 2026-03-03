import React from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";


export default function OneFieldForm({ control, onTyping }) {
  return (
    <View style={{ width: "100%" }}>
      <Controller
        control={control}
        name="address"
        rules={{ required: "Address is required" }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            placeholder="Enter your address"
            value={value}
            onBlur={onBlur}
            onChangeText={(text) => {
              onChange(text);
              onTyping?.(text); // ✅ parent updates suggestions
            }}
            style={{
              borderRadius: 12,
              padding: 12,
            }}
          />
        )}
      />
    </View>
  );
}