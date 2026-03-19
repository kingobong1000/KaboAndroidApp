import { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { showTables, showColumns, dropAllTables } from '../../utils/database';
import { Link, useRouter } from 'expo-router';
// --------------------------
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// --------------------------
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
// --------------------------
import Grid from '../../components/Grid';
import Spacer from '../../components/spacer';
import Bucket from '../../components/themed/Bucket';
import ThemedSubtext from '../../components/themed/ThemeSubtxt';
 

export default function DevPanel() {
  const router = useRouter();
  const { theme, setTheme } = useTheme(); // ✅ theme is available
  const uTheme = Colors.theme[theme] ?? Colors.theme.light;
  const [logs, setLogs] = useState([]);
  // -----------------------
  const log = (data) => {
  if (Array.isArray(data) && data[0]?.type) {
    // column schema
    const formatted = data.map(col =>
      `${col.name} (${col.type}) ${col.pk ? '[PK]' : ''}`
    ).join('\n');

    setLogs(prev => [formatted, ...prev]);
  } else {
    setLogs(prev => [JSON.stringify(data, null, 2), ...prev]);
  }
};
 
    const blocks = [
      {
        id: "database",
        header: "Database Overview",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "database-arrow-down-outline",
        buttxt: "Execute",
        onPress: async () => {
          const tables = await showTables();
          // log(tables.map(t => `• ${t.name}`).join('\n'));
          log(JSON.stringify(tables));
         
        },
      },
      {
        id: "showtable",
        header: "Table Content",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "account-group-outline",
        buttxt: "Execute",
        onPress: async () => {
          const columns = await showColumns("theme");
          `${columns.name} (${columns.type}) ${columns.pk ? '[PK]' : ''}`
        },
      },
      {
        id: "reformat",
        header: "Reformat Database",
        txt: "Delete & Remove all tables in the Database",
        icon: "cash-multiple",
        buttxt: "Delete All Tables",
        onPress: async () => {
          const dbase = await dropAllTables();
          log(JSON.stringify(dbase));
        },
      },
      {
        id: "delete",
        header: "Delete Database",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "database-arrow-down-outline",
        buttxt: "Execute",
        onPress: () => console.log("Orders"),
      },
      {
        id: "account",
        header: "Database",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "account-group-outline",
        buttxt: "Execute",
        onPress: () => console.log("Customers"),
      },
      {
        id: "activity",
        header: "Database",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "database-arrow-down-outline",
        buttxt: "Execute",
        onPress: () => console.log("Customers"),
      },
      {
        id: "official",
        header: "Database",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "account-group-outline",
        buttxt: "Execute",
        onPress: () => console.log("Customers"),
      },
      {
        id: "ai",
        header: "AI",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "database-arrow-down-outline",
        buttxt: "Execute",
        onPress: () => console.log("Customers"),
      },
    ];

  return (
      <ScrollView style={{ flex: 1}}>
          <View style={styles.console}>
             {logs.map((item, index) => {
              if (Array.isArray(item)) {
                return item.map((row, i) => (
                  <Text key={i} style={{ marginBottom: 5 }}>
                    • {row.name || JSON.stringify(row)}
                  </Text>
                ));
              }

              return (
                <Text key={index} style={{ marginBottom: 5 }}>
                  {typeof item === "string" ? item : JSON.stringify(item)}
                </Text>
              );
            })}
          </View>
            {/* --------------- */}
           <View style={styles.dashrollout}>
              <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                Dev Tools
              </Text>

              <View style={[styles.crumbs]}>
                  <Link href="admin/index"><ThemedSubtext variant='subtext' color={uTheme.brand} style={[styles.crumbsTxt, {color: uTheme.links}]}>Dashboard</ThemedSubtext></Link>
                  <Link href="admin/tools"><ThemedSubtext variant='subtext' color={uTheme.brand}  style={[styles.crumbsTxt, {color: uTheme.links}]}>Database</ThemedSubtext></Link>
                  <Link href="admin/reports"><ThemedSubtext variant='subtext' color={uTheme.brand}  style={[styles.crumbsTxt, {color: uTheme.links}]}>Reports</ThemedSubtext></Link>
              </View>


              <Spacer height={15} />

              <View style={styles.gridholder}>
                <Grid columns={2} gap={15}>
                {blocks.map((item) => (
                  <Bucket
                    key={item.id}
                    header={item.header}
                    txt={item.txt}
                    buttontxt={item.buttxt}
                      icon={
                      <MaterialCommunityIcons
                      name={item.icon}
                      size={18}
                      color={uTheme.onDark}
                      />
                      }
                    onPress={item.onPress}
                  />
                ))}
                </Grid>
              </View>
          </View>

      {/* Buttons will go here */}
      
      {/* <View style={styles.controlBank}>
          <Button
          title="Debug DB"
          onPress={async () => {
          await showTables();
          await showColumns("theme");
          }}
          />
      </View> */}
      </ScrollView>
  );
}





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


  crumbs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 11,
    width: '55%',
    paddingTop: 5,
},

crumbsTxt: {
    marginRight: 9,
    ninwidth: 90,
},


  titletxt: {
    fontSize: 22,
  },

  sector: {
    padding: 13,
  },

lister: {
  paddingVertical: 20,
},

console: {
    padding: 20,
    paddingTop: 100,
    height: 600,
    backgroundColor: '#c2e4ff',
},


dashrollout: {
  padding: 15,


},

controlBank: {
  padding: 10
}


})