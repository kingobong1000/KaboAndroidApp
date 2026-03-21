import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';


const Mast = ({
  style,
  bgColor,
  border = false, // default OFF
  height,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  const uTheme =
    Colors?.theme?.[theme] ??
    Colors?.theme?.light ??
    {};

  return (
    <View
      style={[
        styles.pgtitle,
        {
          backgroundColor: bgColor ?? uTheme.grad1 ?? "#fff",
          ...(height ? { height } : {}),

          // ✅ Toggle border ON/OFF
          ...(border && {
            borderWidth: 1,
            borderColor: uTheme.border ?? "#361717",
          }),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

export default Mast

const styles = StyleSheet.create({
    pgtitle: {
    padding: 15,
    paddingBottom: 5,
    flexDirection: 'column',
    justifyContent: "flex-end",
    minHeight: 50,
    position: 'relative',

  },

})