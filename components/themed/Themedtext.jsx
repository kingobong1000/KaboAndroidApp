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
      fontFamily: 'Inter_900Black',
      fontSize: 25,
      color: theme.title,
    },
    subtitle: { 
      fontFamily: 'Inter_800ExtraBold',
      fontSize: 16,
      color: theme.text,
    },
    body: {
      fontFamily: 'Inter_300Light',
      fontSize: 16,
      color: theme.text,
    },
      design: {
      fontFamily: 'Inter_400Regular',
      fontSize: 33,
      letterSpacing: -12,
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