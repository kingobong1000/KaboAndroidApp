import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';

import { 
  Ionicons,
  Foundation
 } from '@expo/vector-icons';

const Summary = ({
  style,
  bg,
  children,
  ...props 
}) =>  {
   const { theme, setTheme } = useTheme(); // ✅ theme is available
    const uTheme = Colors.theme[theme] ?? Colors.theme.light;
    const clr = bg ?? uTheme.ux
  return (
    <View 
    style={[
      styles.container, styles.grid,
      {backgroundColor: clr}]
    }
    {...props}
    >
      <View style={styles.summarytitle}>
        <View style={styles.icon}><Foundation name="clipboard-notes" size={15} color="#0a29f3" /></View>
        <Text style={styles.sumtext}>Summary</Text>
      </View>
     {children}
    </View>
  )
}

export default Summary

const styles = StyleSheet.create({
    container: {
        borderRadius: 11,
        minHeight: 10,
        padding: 15,
        minHeight: 12,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        elevation: 5,
    },


   grid: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  summarytitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '40%',
  },
  icon: {
    width: 20,
    height: 20,
  },

  sumtext: {
    color: '#999',
  }
})