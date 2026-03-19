import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';



const Section = ({
  style,
  bg,
  children,
  ...props 
}) =>  {
   const { theme, setTheme } = useTheme(); // ✅ theme is available
    const uTheme = Colors.theme[theme] ?? Colors.theme.light;
    const clr = bg ?? uTheme.section
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