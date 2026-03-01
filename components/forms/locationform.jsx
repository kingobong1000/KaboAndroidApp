    import { StyleSheet, Text, View, useColorScheme } from 'react-native'

    import { Colors } from '../../constants/Colors';
    import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons';

    import ThemedSubtext from '../themed/ThemeSubtxt';
    import Themedtext from '../themed/Themedtext';

 

    const Locationform = () => {
            const schemeRaw = useColorScheme();
            const colorscheme = schemeRaw.toLowerCase();
            const theme = Colors.theme[colorscheme] ?? Colors.theme.light;

            
    return (
        <View style={styles.container}>
            <View style={[styles.search,{backgroundColor: theme.search}]}>
            <View style={styles.navicon}><FontAwesome5 name="chevron-left" size={24} color={theme.note} /></View>
            <View></View>
            <View style={styles.navicon}><FontAwesome name="search" size={24} color={theme.note} /></View>
            </View>


            {/* ====================== */}
            <View style={[styles.mapholder, {backgroundColor: theme.map }]}></View>
            {/* ====================== */}


            <View style={[styles.sectcontrol, {backgroundColor: theme.ui}]}>
                <View style={[styles.flexhold, {paddingBottom: 15}]}>
                    <View style={styles.fheit}>
                    <Text style={styles.biggTxt}>74F</Text>
                    <Text>Locationform</Text>
                    <View><Ionicons name="settings" size={33} color="#dbae0c" /></View>
                    </View>


                    <View style={styles.secondwing}>
                        <View style={styles.fromto}>

                        </View>

                        <View style={styles.bump}>
                            <View style={styles.bottompad}>
                                <ThemedSubtext variant="subtext" style={styles.strong}>My Location</ThemedSubtext>
                                <ThemedSubtext>My Location</ThemedSubtext>
                            </View>

                             <View>
                                 <ThemedSubtext variant="subtext" style={styles.strong}>Near by</ThemedSubtext>
                                 <ThemedSubtext>My Location</ThemedSubtext>
                            </View>

                        </View>
                    </View>
                </View>

                 {/* ====================== */}

                 <View>
                    <View style={styles.section}>
                        <View style={styles.digits}>
                        <View style={[styles.keyicon,{backgroundColor:theme.shadow}]}><Fontisto name="car" size={24} color={theme.note} /></View>

                        <View style={styles.digitvalues}>
                            <ThemedSubtext variant='note'>Distance</ThemedSubtext>
                            <View style={styles.flexhold}>
                                <ThemedSubtext variant="highlight" style={styles.htext}>8.54</ThemedSubtext>
                                <Themedtext style={styles.tiny}>km</Themedtext>
                            </View>
                        </View>

                        <View style={styles.digitvalues}>
                            <ThemedSubtext variant='note'>Time</ThemedSubtext>
                            <View style={styles.flexhold}>
                                <ThemedSubtext variant="highlight" style={styles.htext}>8.54</ThemedSubtext>
                                <Themedtext style={styles.tiny}>km</Themedtext>
                            </View>
                        </View>

                        {/* ------------------- */}

                        </View>{/* digits */}
                        <View style={[styles.circle, {backgroundColor: theme.hl01}]}><Ionicons name="arrow-back" size={24} color="white" /></View>
                    </View>

                 </View>


            </View> {/* Map Controls */}

        </View>

    )
    }

    export default Locationform

    const styles = StyleSheet.create({

        container: {
            flex: 1,
            position: 'relative',
            zIndex: 1,
        },

        navicon: {
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',

        },
       

        mapholder: {
            flex: 1,
            padding: 10,
            position: 'relative',
            zIndex: 1,
        },

        bottompad: {
            paddingBottom: 7,
        },

        sectcontrol: {
            padding: 17,
            width: '90%',
            position: 'absolute',
            zIndex: 5,
            alignSelf: 'center',
            bottom: 54,
            minHeight: 22,
            borderRadius: 15,
            // iOS shadow
            shadowColor: "#000",
            shadowOffset: { width: 8, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 33,

            // Android shadow
            elevation: 6,
        },

        search: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 50,
            width: '90%',
            height: 44,
            position: 'absolute',
            zIndex: 3,
            top: 60,
            alignSelf: 'center',
            // iOS shadow
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.05,
            shadowRadius: 30,

            // Android shadow
            elevation: 6,
        },

        circle: {
            flexDirection: 'center',
            alignItems:  'center',
            width: 40,
            height: 40,
            borderRadius: 55,
            borderColor: '#DDD',
            borderWidth: 5,

                   // iOS shadow
            shadowColor: "#000",
            shadowOffset: { width: 11, height: 6 },
            shadowOpacity: 0.82,
            shadowRadius: 43,

            // Android shadow
            elevation: 6,
        },

        section: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderColor: '#CCC',
            borderWidth: 1,
            borderRadius: 9,
            padding: 6,
        },

        htext: {
            color: '#555',
            letterSpacing: -1,
            fontWeight: 800,
        },

        flexhold: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },

        keyicon: {
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 14,
        },

        digits: {
            flexDirection: 'row',
            justifyContent: 'flex-start',

        },

        digitvalues: {
            paddingLeft: 14,
        },


        tiny: {
            paddingLeft: 7,
            alignItems: 'flex-end',
            paddingTop: 5,
        },


        fheit: {
            width: 145,
            minHeight: 71,
        },

        movement: {
            flex: 1,
        },

        biggTxt: {
            fontSize: 33,
        },


        secondwing: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '58%',
            paddingTop: 6,
            paddingRight: 13,
        },

        fromto: {
            width: 50,
            minHeight: 50
        },

        strong: {
            fontFamily: 'Inter_800ExtraBold',
            color: '#222',
        },

        bump: {
            paddingLeft: 6,
        }
    })