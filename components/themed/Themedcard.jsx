import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useRouter } from 'expo-router';
// ----------------------------
import { Colors } from '../../constants/Colors';
import { useTheme } from '../../context/ThemeContext';
// ----------------------------
import Pretext from './Pretext';
// ----------------------------

const ThemedCard = ({ 
  icon,
  onPress,
  header,
  text,
  style, 
  ...props 
}) => {
    const {theme, setTheme } =  useTheme();
    const uTheme = Colors.theme[theme] ?? Colors.theme.light;

  return (
    <Pressable 
      onPress={onPress}
      {...props}
      style={({ pressed }) => [
        styles.container,
        style,
        {
          backgroundColor: uTheme.uibackground
        }, 
      pressed && { 
        // opacity: 0.5,
        transform: [{ scale: 0.96 }],
        shadowOpacity: 0.65,
        elevation: 2,
        backgroundColor: uTheme.over
        },
      ]} 
    >
      <View style={[ styles.icon ]}>{icon}</View>
      <View style={styles.header}>
        <Pretext variant='subtitle'>{header}</Pretext>
      </View>
      <View style={styles.txt}>
        <Pretext>{text}</Pretext>
      </View>
      <View style={[styles.indicator, {backgroundColor:  uTheme.shadow}]}>
        <View style={[styles.indicatorlight, {backgroundColor: uTheme.indicator}]}></View>
      </View>
    </Pressable>
  )
}

export default ThemedCard

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexBasis: 0,   // important: makes the two flex items truly equal
    minWidth: 0,    // important: prevents text from forcing width
    minHeight: 14,
    borderRadius: 17,
    overflow: 'hidden',
    height: 150,
    padding: 15,
    paddingBottom: 0,
    position: 'relative'
  
  },

  icon: {
    width: 30,
    height: 39,
  },

  header: {
    paddingTop: 20,
  },

  indicator: {
    borderRadius: 6,
    width: 20,
    height: 20,
    position: 'absolute',
    top: 20,
    right: 20,
    overflow: 'hidden',
    zIndex: 10,
  },

  indicatorlight: {
    borderRadius: 6,
    position: 'relative',
    width: 20,
    height: 20,
    top: 7,
    right: 7,
    zIndex: 1,
    
  }




})