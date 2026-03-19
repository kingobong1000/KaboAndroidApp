import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
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
// -----------------------
import { 
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';



const Dashboard = () => {
    const { theme, setTheme } = useTheme(); // ✅ theme is available
    const uTheme = Colors.theme[theme] ?? Colors.theme.light;
    const router = useRouter();

    const blocks = [
      {
        id: "orders",
        txt: "Database",
        icon: "database-arrow-down-outline",
        onPress: () => console.log("Orders"),
      },
      {
        id: "customers",
        txt: "Users",
        icon: "account-group-outline",
        onPress: () => console.log("Customers"),
      },
      {
        id: "revenue",
        txt: "Activity",
        icon: "cash-multiple",
        onPress: () => console.log("Revenue"),
      },
      {
        id: "actions",
        txt: "Actions",
        icon: "database-arrow-down-outline",
        onPress: () => console.log("Orders"),
      },
      {
        id: "account",
        txt: "Account",
        icon: "account-group-outline",
        onPress: () => console.log("Customers"),
      },
      {
        id: "activity",
        txt: "Activity",
        icon: "database-arrow-down-outline",
      },
      {
        id: "official",
        txt: "Office",
        icon: "account-group-outline",
        onPress: () => console.log("Customers"),
      },
      {
        id: "ai",
        txt: "Ai",
        icon: "database-arrow-down-outline",
      },
    ];





  return (
    <ScrollView style={{ flex: 1}}>
      <Mast>
        <View>
          <Text style={[styles.titletxt, { color: "#222", fontSize: 18, fontFamily: 'Inter_700Bold' }]}>Dashboard</Text>
          <View style={styles.iconholder}>
          </View>
      </View>
      </Mast>
        <View style={styles.widgetbank}>
            <View style={[styles.crumbs]}>
                                  <Link href="admin/index"><ThemedSubtext variant='subtext' color={uTheme.brand} style={[styles.crumbsTxt, {color: uTheme.links}]}>Dashboard</ThemedSubtext></Link>
                                  <Link href="admin/tools"><ThemedSubtext variant='subtext' color={uTheme.brand}  style={[styles.crumbsTxt, {color: uTheme.links}]}>Database</ThemedSubtext></Link>
                                  <Link href="admin/reports"><ThemedSubtext variant='subtext' color={uTheme.brand}  style={[styles.crumbsTxt, {color: uTheme.links}]}>Reports</ThemedSubtext></Link>
            </View>

            <View style={styles.bank}>
            {/* ------------------ */}
            <Summary />
            {/* ------------------ */}
            <Spacer height={20} />
            {/* ------------------ */}
            <View style={styles.gridholder}>
             <Grid columns={4} gap={12}>
              {blocks.map((item) => (
                <BlockChip
                  key={item.id}
                  txt={item.txt}
                  icon={
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={30}
                      color={uTheme.brand}
                    />
                  }
                  onPress={item.onPress}
                />
              ))}
            </Grid>
             </View>
            </View>

        </View>
    </ScrollView>
  )
}

export default Dashboard


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  titletxt: {
    fontSize: 22,
    height: 30,
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
    backgroundColor: '#FFF',
},


widgetbank: {
    padding: 16,
    flex: 1,
},


crumbs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 11,
    width: '55%',
},

crumbsTxt: {
    marginRight: 9,
    ninwidth: 90,
},

bank: {
    paddingVertical: 30,
},

gridholder: {
  paddingVertical: 1,
},

iconholder: {
  width: 100,
  flexDirection: 'row',
  justifyContent: 'flex-end',
}

})