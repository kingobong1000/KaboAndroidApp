import { View, TextInput, Button, Text, StyleSheet, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function DisplayDropdown({
  visible,
  suggestions,
  onPick,
  onClose,
  title,
}) {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 5,
        minHeight: 1,
      }}>
      <View
        style={{
          backgroundColor: "white",
          overflow: "hidden",
          maxHeight: "100%",
          paddingTop: 120,
          elevation: 20,
        }}
      >
        <View style={[styles.top, { padding: 10, borderBottomWidth: 1 }]}>
          <View style={styles.title}><Text style={styles.titletxt}>{title}</Text></View>
          <View style={styles.closebut}>
                <Pressable
                    onPress={onClose}
                    style={({ pressed }) => [
                      styles.btn,
                      styles.but,
                      pressed && styles.btnPressed,
                    ]}
                    >
                    <Text style={styles.btnText}>
                     <Ionicons name="close-circle-outline" size={33} color="#a7a7a7" />
                    </Text>
                </Pressable>
            </View>
        </View>
        <View>
          {suggestions.map((item, idx) => (
           <Pressable
              key={`${item}_${idx}`}
              onPress={() => onPick(item)}
              style={{
                padding: 16,
                borderTopWidth: idx === 0 ? 0 : 1,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#555",
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

   title: {
    width: '70%',
    paddingTop: 8,
  },

  titletxt: {
    fontFamily: 'Inter_800ExtraBold',
    fontSize: 23,
  },

  closebut: {
    width: 44,
    paddingTop: 5,
  },

  bottomnote: {
    width: '80%',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },

  bottom: {
    paddingBottom: 10,
    color: '#222'

  },

  but: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'none',
  },

    btn: {
        borderRadius: 14,
        paddingTop: 4,
        alignItems: "center",
        justifyContent: "center",
        // iOS shadow
        shadowColor: "#8a8a8a",
        shadowOpacity: 0.18,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 6 },

        // Android shadow
        // elevation: 0.4,
  },

  btnPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
    backgroundColor: '#c0e6ff',
  },

  btnDisabled: {
    opacity: 0.45,
  },
  btnText: {
    color: "#222",
    fontSize: 14,
    fontWeight: "600",
  },
  btnTextDisabled: {
    color: "white",
  },

})


