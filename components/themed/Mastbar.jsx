import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Mastbar = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};
export default Mastbar;


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 20,
        width: '100%',
    }
})