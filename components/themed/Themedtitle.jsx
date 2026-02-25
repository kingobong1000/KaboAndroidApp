import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from '../../constants/Colors'

const Themedtext = ({ style, title = false, fontSize, children, ...props }) => {
    const schemeRaw = useColorScheme();
    const colorscheme = schemeRaw?.toLowerCase() || 'light';
    const theme = Colors.theme[colorscheme] ?? Colors.theme.light
    
  const textColor = title ? theme.title : theme.text;
  const textSize = fontSize ?? (title ? 22 : 17);
  const face = title ? 'Inter_700Bold' : 'Inter_300Light';
    console.log('color:' , textColor, textSize, theme)

  return (
    <Text style={[{
        color: textColor, 
        fontSize: textSize,
        fontFamily: face,
    }, style]} 
    {...props} >
    {children}
    </Text>
  )
}

export default Themedtext

const styles = StyleSheet.create({})