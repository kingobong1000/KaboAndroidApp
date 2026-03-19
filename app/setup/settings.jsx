import { StyleSheet, Text, View, Pressable, ScrollView, Switch } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'expo-router';

import Themedview from '../../components/themed/Themedview';
import Themedtext from '../../components/themed/Themedtext';
import ThemedSubtext from '../../components/themed/ThemeSubtxt';


const settings = [
  {
    id: "notifications",
    title: "Notifications",
    type: "switch",
    value: true,
  },
  {
    id: "darkMode",
    title: "Dark Mode",
    type: "switch",
    value: false,
  },
  {
    id: "account",
    title: "Account",
    type: "link",
    route: "/account",
  },
  {
    id: "privacy",
    title: "Privacy",
    type: "link",
    route: "/privacy",
  },
];


const Settings = () => {
    const router = useRouter();
    const [settingsState, setSettingsState] = useState(settings);

  return (
   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Themedview>
      <View style={styles.container}>
          {/* ÷--------------------  */}
          <View style={styles.pgtitle}>
            <View></View>
            <View><Text style={styles.titletxt}>Settings</Text></View>
          </View>
          {/* ÷--------------------  */}
          <View style={styles.sector}>
            <ThemedSubtext variant='subtext'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</ThemedSubtext>
          </View>
          {/* ÷--------------------  */}
          <View style={styles.lister}>


          </View>
          {/* ÷--------------------  */}
      </View>
    </Themedview>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  pgtitle: {
    padding: 15,
    paddingTop: 125,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    minHeight: 10,
    backgroundColor: '#dde9ff'
  },

  titletxt: {
    fontSize: 22,
  },

  sector: {
    padding: 13,
  },

lister: {
  paddingVertical: 20,
}

})