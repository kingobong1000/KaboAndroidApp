import { StyleSheet, Text, View } from 'react-native'

const Spacer = ({width = '100%', height = 20}) => {
  return (
    <View style={{width, height}}></View>
  )
}

export default Spacer