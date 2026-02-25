import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors'

const Themedview = ({ style, children, ...props }) => {
    const schemeRaw = useColorScheme();
    const colorscheme = schemeRaw.toLowerCase();
    const theme = Colors.theme[colorscheme] ?? Colors.theme.light
  return (
    <View style={[{flex: 1, 
        backgroundColor: theme.background
    }, style]} {...props}>
  
         {children}

    </View>
  )
}

export default Themedview

const styles = StyleSheet.create({})