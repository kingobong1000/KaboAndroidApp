import { StyleSheet, Text, View, useColorScheme } from 'react-native'

import { Colors } from '../../constants/Colors';

const Locationform = () => {
        const schemeRaw = useColorScheme();
        const colorscheme = schemeRaw.toLowerCase();
        const theme = Colors.theme[colorscheme] ?? Colors.theme.light;

        
  return (
    <View style={styles.container}>
        <View style={[styles.search, {backgroundColor: theme.search}]}>
            <Text>Search</Text>
        </View>
        <View style={[styles.mapholder, {backgroundColor: theme.map }]}></View>
        {/* ====================== */}
        <View style={[styles.sectcontrol, {backgroundColor: theme.ui}]}>
            <Text>Locationform</Text>
            <Text>Locationform</Text>
        </View>
    </View>

  )
}

export default Locationform

const styles = StyleSheet.create({

    container: {
        flex: 1,
        position: 'relative',
        zIndex: 1,
    },

    mapholder: {
        flex: 1,
        padding: 10,
        position: 'relative',
        zIndex: 1,
    },

    sectcontrol: {
        padding: 15,
        width: '90%',
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        bottom: 34,
        minHeight: 22,
        borderRadius: 15,
    },

    search: {
        borderRadius: 50,
        width: '90%',
        height: 44,
        position: 'absolute',
        zIndex: 3,
        top: 60,
        alignSelf: 'center',
    }
})