import { View, Text, Button, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';
import React from 'react'
// ---------------------------
import ThemedSubtext from '../../components/themed/ThemeSubtxt';
// ---------------------------
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
//  ------------------------
import Summary from '../../components/themed/Summary';
import Grid from '../../components/Grid';
import BlockChip from '../../components/themed/BlockChip';
import Spacer from '../../components/spacer';
import Mast from '../../components/themed/Mast';
import Mastbar from '../../components/themed/Mastbar';
import IconHolder from '../../components/themed/IconHolder';
import Notes from '../../components/themed/Notes';
// -----------------------
import { 
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';


const Reports = () => {
    const { theme, setTheme } = useTheme(); // ✅ theme is available
    const uTheme = Colors.theme[theme] ?? Colors.theme.light;
    const router = useRouter();

const notes = [
      {
        id: 1,
        txt: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,",
        buttxt: "Delete Theme DB",
        onPress: () => {
          // const table = await dropThemeTable();
          // const formatted = table.map(col => `• ${col.name}`);
           console.log("Customers");
        }, 
      },
      {
        id: 2,
        txt: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        buttxt: "Delete Theme DB",
        onPress: () => console.log("Customers"),
      },
      {
        id: 3,
        txt: "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' ",
        buttxt: "Delete Theme DB",
        onPress: () => console.log("Customers"),
      },
      {
        id: 4,
        txt: "here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form",
        buttxt: "Delete Theme DB",
        onPress: () => console.log("Customers"),
      },
    ];

  return (
  <ScrollView style={{ flex: 1}}>
    <Mast height={150} bgColor={uTheme.light} border>
        <Mastbar>
        <Text style={[styles.titletxt, { color: "#222", fontSize: 22, fontFamily: 'Inter_700Bold' }]}>Reports</Text>
        <IconHolder
          icons={[
            { name: "bell-outline", type: "mci" },
            { name: "settings", type: "fe" },
            { name: "person-outline", type: "ion" },
          ]}
        />
        </Mastbar>
    </Mast>
    <View>
      {notes.map((item) => (
        <Notes
          key={item.id}
          type={item.type}
          onPress={item.onPress}
        >
          {item.txt}
        </Notes>
      ))}
    </View>
  </ScrollView>
  )
}

export default Reports

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    line: {
      borderBottomColor: '#999',
      borderBottomWidth: 1,
      borderStyle: 'dotted'
    },

    titletxt: {
      alignItems: 'center',
      flexDirection: 'column',
      paddingTop: 7,
    }
})