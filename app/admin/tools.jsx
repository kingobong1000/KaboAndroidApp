import { useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import { showTables, 
  showColumns, 
  dropAllTables,
  createNewTable,
  deleteTable,
  truncateTable,
  showTableStructure
} from '../../utils/database';
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
  const [inputs, setInputs] = useState({});
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
          const text = tables.map(t => t.name).join("\n");
          log(text);
        },
      },
      {
        id: "showtable",
        header: "Themes Table",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "account-group-outline",
        buttxt: "Execute",
        onPress: async () => {
          const columns = await showColumns("theme");
          const formatted = columns.map(col => `• ${col.name}`);
         log(["COLUMNS:", ...formatted]);
        },
      }];

      // ----------------------

    const block2 = [
    {
      id: "create",
      header: "Create Table",
      txt: "Create a new table in the database",
      icon: "table-plus",
      hasInput: true,
      buttxt: "Create Table",
      onPress: async (tableName) => {
        if (!tableName) return;
        const result = await createNewTable(tableName);
        log([`CREATED (${tableName})`, ...result.map(r => `• ${r.name}`)]);
      },
    },

    {
      id: "delete",
      header: "Delete Table",
      txt: "Completely remove a table",
      icon: "table-remove",
      hasInput: true,
      buttxt: "Delete Table",
      onPress: async (tableName) => {
        if (!tableName) return;
        const result = await deleteTable(tableName);
        log([`DELETED (${tableName})`, ...result.map(r => `• ${r.name}`)]);
      },
    },

    {
      id: "truncate",
      header: "Clear Table",
      txt: "Remove all rows but keep structure",
      icon: "broom",
      hasInput: true,
      buttxt: "Clear Table",
      onPress: async (tableName) => {
        if (!tableName) return;
        const result = await truncateTable(tableName);
        log([`TRUNCATED (${tableName})`, ...result.map(r => `• ${r.name}`)]);
      },
    },

    {
      id: "structure",
      header: "Show Structure",
      txt: "View table columns",
      icon: "table-column",
      hasInput: true,
      buttxt: "Show Columns",
      onPress: async (tableName) => {
        if (!tableName) return;
        const columns = await showTableStructure(tableName);
        const formatted = columns.map(col => `• ${col.name}`);
        log([`COLUMNS (${tableName}):`, ...formatted]);
      },
    },
];


    const action = [
      {
        id: "deleteThemeDB",
        header: "Delete Theme DB",
        txt: "Delete the Theme Database Directly",
        icon: "account-group-outline",
        buttxt: "Delete Theme DB",
        onPress: async () => {
          const table = await dropThemeTable();
          const formatted = table.map(col => `• ${col.name}`);
          log([`COLUMNS (${tableName}):`, ...formatted]);
        }, 
      },
      {
        id: "deleteuser",
        header: "Delete User",
        txt: "There are many variations of passages of Lorem Ipsum ",
        icon: "database-arrow-down-outline",
        buttxt: "Delete User",
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
                  <Text key={`${index}-${i}`} style={{ marginBottom: 5 }}>
                    • {row.name}
                  </Text>
                ));                                                                                                                                                                                                                                                                                
              }

              return (
                <Text key={index} style={{ marginBottom: 5 }}>
                  {item}
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
                {/* -------------------- */}
              <Spacer height={20} />
              <View style={styles.gridholder}>
                {block2.map((item) => (
                  <Bucket
                    style={styles.bump}
                    key={item.id}
                    header={item.header}
                    txt={item.txt}
                    inputPlaceholder="Database name here"
                    inputProps={{ onChangeText: (text) => console.log(text) }}
                    buttontxt={item.buttxt}
                    height={185}
                      icon={
                      <MaterialCommunityIcons
                      name={item.icon}
                      size={18}
                      color={uTheme.onDark}
                      />
                      }
                     onPress={() => item.onPress?.(inputs[item.id])} // 👈 pass value
                  >
                    {item.hasInput && (
                        <TextInput
                          placeholder={item.placeholder || "Enter value"}
                          value={inputs[item.id] || ""}
                          onChangeText={(text) =>
                            setInputs(prev => ({
                              ...prev,
                              [item.id]: text
                            }))
                          }
                          style={{
                            borderWidth: 1,
                            borderColor: "#ccc",
                            padding: 8,
                            marginTop: 8,
                            borderRadius: 6,
                            color: uTheme.text
                          }}
                          placeholderTextColor="#888"
                        />
                      )}
                    </Bucket>
                ))}
              </View>

              {/* ---------------------- */}
              <Spacer height={15} />

              <View style={styles.gridholder}>
                <Grid columns={2} gap={15}>
                {action.map((item) => (
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

              <Spacer height={55} />
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

  bump: {
    marginBottom: 15,
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
    backgroundColor: '#85b6ff',
    position: 'relative',
    zIndex: 1
},


dashrollout: {
  padding: 15,
  position: 'relative',
  zIndex: 3,
  elevation: 5,
},

controlBank: {
  padding: 10
}


})