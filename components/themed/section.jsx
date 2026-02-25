import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors } from '../../constants/Colors';



const Section = ({ 
  style,
  bg,
  children,
  ...props 
}) =>  {
    const schemeRaw = useColorScheme();
    const colorscheme = schemeRaw.toLowerCase();
    const theme = Colors.theme[colorscheme] ?? Colors.theme.light
    const clr = bg ?? theme.section
  return (
    <View 
    style={[
      styles.container, styles.grid,
      {backgroundColor: clr}]
    }
    {...props}
    >
     {children}
    </View>
  )
}

export default Section

const styles = StyleSheet.create({
    container: {
        borderRadius: 26,
        minHeight: 10,
        padding: 15,
        minHeight: 12
    },


   grid: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
})