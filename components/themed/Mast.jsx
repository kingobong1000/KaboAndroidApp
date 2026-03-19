import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';



const Mast = ({
  style,
  bgColor,
  height,
  children,
  ...props
}) => {
  const { theme } = useTheme();
  const uTheme = Colors.theme[theme] ?? Colors.theme.light;

  return (
    <View
      style={[styles.pgtitle,
        {
          backgroundColor: uTheme.grad1,
          height,
        },
        style, // ✅ allow overrides
      ]}
      {...props}
    >
      {children}
    </View>
  )
}

export default Mast

const styles = StyleSheet.create({
    pgtitle: {
    padding: 15,
    paddingTop: 145,
    flexDirection: 'row',
    justifyContent: "space-between",
    minHeight: 50,
    height: 60,
  },

})