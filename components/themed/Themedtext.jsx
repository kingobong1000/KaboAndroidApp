import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from '../../constants/Colors'

const Themedtext = ({ 
  style,
  variant = 'body', // 'title' | 'subtitle' | 'body'
  fontSize,
  children,
  ...props
}) => {
  const schemeRaw = useColorScheme();
  const colorscheme = schemeRaw?.toLowerCase() || 'light';
  const theme = Colors.theme[colorscheme] ?? Colors.theme.light;
    
  const typography = {
    title: {
      fontFamily: 'Inter_700Bold',
      fontSize: 22,
      color: theme.title,
    },
    subtitle: {
      fontFamily: 'Inter_500Medium',
      fontSize: 16,
      color: theme.text,
    },
    body: {
      fontFamily: 'Inter_300Light',
      fontSize: 15,
      color: theme.text,
    },
  };

const selected = typography[variant] || typography.body;


  return (
   <Text
      style={[
        {
          fontFamily: selected.fontFamily,
          fontSize: fontSize ?? selected.fontSize,
          color: selected.color,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

export default Themedtext

const styles = StyleSheet.create({})