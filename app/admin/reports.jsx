import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Reports = () => {
  return (
    <View style={styles.container}>
      <Text>Reports</Text>
    </View>
  )
}

export default Reports

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})