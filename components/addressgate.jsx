import { StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';

// Themes
// -----------------------------------
import ThemedSubtext from './themed/ThemeSubtxt';
import Themedview from './themed/Themedview';
import Themedtext from './themed/Themedtext';

// -----------------------------------

import { Colors } from '../constants/Colors';
import GoogleIcon from './GoogleIcon';


const AddressGate = ({id, status}) => {

    const schemeRaw = useColorScheme();
    const colorscheme = schemeRaw.toLowerCase();
    const theme = Colors.theme[colorscheme] ?? Colors.theme.light;

    console.trace('In Addressgate: ', 'ideology:', id, 'status Check:', status)
  return (
    <View style={styles.container}>
        <View style={styles.top}>
        <Themedtext variant="title">Addy</Themedtext>
        </View>

 


        <View style={styles.bottom}>
          <View>
            <Text>checking</Text>
          </View>

            <View>
                <ThemedSubtext style={styles.bottomnote} variant="note">Lorem Ipsum has been the industry's standard dummy </ThemedSubtext>
            </View>
        </View>
    </View>
  )
}

export default AddressGate


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
    position: 'relative',
    zIndex: 1,
  },

  top: {
    padding: 12,
  },

  bottomnote: {
    width: '80%',
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },

  bottom: {
    paddingBottom: 10,
    width: '90%',
    color: '#222',
    backgroundColor: '#EEE',
    position: 'absolute',
    zIndex: 5,
    bottom: 20,
    width: '95%'
  }

})