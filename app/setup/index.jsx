import { StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';
import GoogleIcon from '../../components/GoogleIcon';
import { useRouter } from "expo-router";



import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Feather,
  AntDesign
} from '@expo/vector-icons';
import { Link } from "expo-router";
 

// Themes
import Themedview from '../../components/themed/Themedview'
import Themedtext from '../../components/themed/Themedtext'
import Pretext from '../../components/themed/Pretext';
import ThemedCard from '../../components/themed/Themedcard';
import Spacer from '../../components/spacer';
import Section from '../../components/themed/section';
import Hspace from '../../components/Hspace';
import ThemedSubtext from '../../components/themed/ThemeSubtxt';
import Themedicon from '../../components/themed/Themedicon';
import { ThemedButton } from '../../components/themed/ThemedButton';
 
import { Colors } from '../../constants/Colors';

const Setuphome = () => {
      const schemeRaw = useColorScheme();
      const colorscheme = schemeRaw.toLowerCase();
      const theme = Colors.theme[colorscheme] ?? Colors.theme.light;

      const router = useRouter();

      // Variable pass
      // ================
        const yes = {
          id: 42,
          title: "Pizza",
          price: 2500,
          meta: { spicy: true },
       };

  return (
    <Themedview style={styles.container}>
      <View style={styles.cover}>
      <View style={styles.conholder}><Ionicons name="location" size={77} color="#07956d" /></View>
      {/* -------------------- */}
      
    <View style={styles.mid}>

    <View style={styles.announce}>
      <Pretext variant='body'>Setting Up</Pretext>
      <Spacer height={4}/>
      <Themedtext variant='title'>Your location</Themedtext>
      <Spacer height={1}/>
      <Themedtext style={styles.centerText}>To help you locate our stores, businesses and supermart in your area, we require your exact and convenient locations</Themedtext>
      <Spacer height={32}/>
    </View>

    <Section>
      <Pretext variant='title' style={styles.centerText}>Here is what we know</Pretext>
      <Spacer height={1} />
      <Pretext style={styles.centerText}>Click to select a location closely relates to you</Pretext>
      <View style={styles.flexer}>                                                                                                                                                                                                                                                                                                                                                                          
        <ThemedCard
        icon={<GoogleIcon name="addLocation" size={30} />}
        onPress={() => router.push({
         pathname: "./setup/address",
         params: {id: '43', status: 'Accept'}
        })}
        header="Fast Delivery"
        text="Get items in minutes"
        />

        <Hspace width={15}/>


        <ThemedCard
          icon={<GoogleIcon name="locAway" size={30} />}
          onPress={() => router.push({
            pathname: "/setup/address",
            params: {id: '45', status: 'Accept'}
        })}
          header="Fast Delivery"
          text="Get items in minutes"
        />
      </View>
    </Section>

      <View style={styles.buttonholder}>

      <ThemedButton 
        style={{alignSelf: 'center'}}
        title="Refine your locaton"
        onPress={() => router.navigate("./setup/address")}
        backgroundColor={Colors.brand} // or any hex
        width={'80%'}
        color={theme.onDark}
        borderRadius={24}
      />
    </View>
</View>



<View style={styles.bottomnote}>
    <Themedicon family="google" name="settings" variant="note" />
    <View style={{flex: 1}}>
      {/* <View><ThemedSubtext variant='subtext'>Lorem Ipsum is simply dummy text of the printing and typesetting industry</ThemedSubtext></View> */}

      <View><ThemedSubtext>Lorem Ipsum is simply dummy text of the printing and typesetting industry</ThemedSubtext></View>
      <View style={[styles.bottomlinks]}>
          <Link href="./setup/index"><ThemedSubtext variant='note' style={{color: theme.links}}>Setup</ThemedSubtext></Link>
          <Link href="./setup/address"><ThemedSubtext variant='note'  style={{ color: theme.links}}>Address</ThemedSubtext></Link>
          <Link href="./setup/phone"><ThemedSubtext variant='note'  style={{ color: theme.links}}>Phone</ThemedSubtext></Link>
          <Link href="./setup/profile"><ThemedSubtext variant='note'  style={{ color: theme.links}}>Profile</ThemedSubtext></Link>
          <Link href="./setup/settings"><ThemedSubtext variant='note'  style={{ color: theme.links}}>Settings</ThemedSubtext></Link>
      </View>
    </View>
  </View>

    </View>
    </Themedview>

  )
}

export default Setuphome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },


    cover: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    linkbay: {
        flexDirection: 'row',
        backgroundColor: 'none'
    },

    links: {
      fontSize: 13,
      padding: 10
    },

    flexer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 22
    },

    centerText: {
      textAlign: 'center',
    },

    buttonholder: {
      paddingVertical: 20,
      width: '100%'
    },

    refineBut: {
      height: 45,
      backgroundColor: Colors.brand,
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      borderRadius: 25,
      alignSelf: 'center',
    },

    buttonTxt: {
      textAlign: 'center',
      fontSize: 15,
      color: '#9aceff'
    },


     bottomlinks: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
      paddingLeft: 15,
      paddingBottom: 46,
      width: '76%'

    },

    bordertop: {
      borderTopWidth: 1,
      borderTopColor: "#080414",
  },

 


  mid: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  announce: {
    paddingHorizontal: 15,
    textAlign: 'center',
     alignItems: 'center',
  },

  bottomnote: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
    alignSelf: 'center',
  },


  conholder: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    minHeight: 20,
    marginTop: 140,

  }

   


})