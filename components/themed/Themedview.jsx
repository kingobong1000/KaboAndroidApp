import {  Text, View, useColorScheme } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from '../../constants/Colors'
import { useTheme } from '../../context/ThemeContext';

const Themedview = ({ style, children, ...props }) => {
    const { theme, setTheme } = useTheme(); // ✅ theme is available
    const uTheme = Colors.theme[theme] ?? Colors.theme.light;
    console.log('Checking theme', theme, uTheme.background);
  return (
    <View style={[{flex: 1, 
        backgroundColor: uTheme.background
    }, style]} {...props}>
         {children}
    </View>
  )
}

export default Themedview

