import { StyleSheet, Text, View, Pressable, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";



import AddressGate from '../../components/addressgate';
import Themedview from '../../components/themed/Themedview';
import Locationform from '../../components/forms/locationform';


const Address = () => {

    const { id, status } = useLocalSearchParams();
    const router = useRouter();

  return (
    <Themedview>
      {status === "Accept" ? <AddressGate id={id} status={status} /> : <Locationform />}
    </Themedview>
  )
}

export default Address

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 60,
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
    color: '#222'
  }

})