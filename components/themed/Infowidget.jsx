import { StyleSheet, Image, Pressable, View } from 'react-native'
import Pretext from './Pretext';

const Infowidget = ({
    style,
    ...props
}) => {
  return (
    <View style={style.container}>
        <View>

        </View>

        {/* -------------------- */}
               
        <View></View>

      <Pretext>Infowidget</Pretext>
    </View>
  )
}

export default Infowidget

const styles = StyleSheet.create({
    container: {
        minHeight: 19,
        borderRadius: 10,
        overflow: 'hidden',
    }
})