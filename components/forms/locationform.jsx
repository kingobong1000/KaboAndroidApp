    import { StyleSheet, 
        Text, 
        Platform,
        TextInput,
        Pressable,
        FlatList,
        ActivityIndicator,
        KeyboardAvoidingView,
        Keyboard,
        TouchableWithoutFeedback,
        View, 
        Alert,
        useColorScheme } from 'react-native'
    import React, { useEffect, useRef, useState } from "react";
    import MapView, { Marker } from "react-native-maps";
    import * as Location from "expo-location";
    import { useForm } from "react-hook-form";
    // ==========================
    import * as SQLite from "expo-sqlite";
    import { initDb, upsertUser, saveUserLocation  } from '../../constants/sqlite';
    import { setCurrentUserId } from '../../constants/securestore';
    import { useRouter } from "expo-router";
    // ==========================
    import { Colors } from '../../constants/Colors';
    import { Ionicons, MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons';
    import MapScreen from '../maps/mapscreen';
    import ThemedSubtext from '../themed/ThemeSubtxt';
    import Themedtext from '../themed/Themedtext';
    import AddressAutocompleteOneField from './placesformfield';
    import OneFieldForm from './oneformfield';
    import { VerticalDotLine } from '../graphic/verticalline';
    import DisplayDropdown from '../graphic/DisplayDropdown';

    const db = SQLite.openDatabaseSync("app.db");

    const Locationform = () => {
            const router = useRouter(); 
            const schemeRaw = useColorScheme();
            const colorscheme = schemeRaw.toLowerCase();
            const theme = Colors.theme[colorscheme] ?? Colors.theme.light;

            const [suggestions, setSuggestions] = React.useState([]);
            const [showDropdown, setShowDropdown] = React.useState(false);

            // RHF lives here so dropdown selection can set the field value
            const { control, setValue, handleSubmit } = useForm({
                defaultValues: { address: "" },
            });
           
            // Mock list (swap later with PHP -> Google Places)
            const ADDRESSES = React.useMemo(
                () => [
                    "12 Awolowo Rd, Ikoyi, Lagos",
                    "14 Awolowo Rd, Ikoyi, Lagos",
                    "Awolowo Way, Ikeja, Lagos",
                    "10 Bode Thomas St, Surulere, Lagos",
                    "Admiralty Way, Lekki Phase 1, Lagos",
                    "Allen Avenue, Ikeja, Lagos",
                    "Chevron Drive, Lekki, Lagos",
                    "Freedom Way, Lekki Phase 1, Lagos",
                    "Adeola Odeku St, Victoria Island, Lagos",
                    "Herbert Macaulay Way, Yaba, Lagos",
                    "Freedom Way, Lekki Phase 1, Lagos",
                    "24 Adeola Odeku St, Victoria Island, Lagos",
                    "34 Herbert Macaulay Way, Yaba, Lagos",
                ],
                []
            );

            const updateSuggestions = (text) => {
            const q = (text || "").trim().toLowerCase();

                if (q.length < 1) {
                setSuggestions([]);
                setShowDropdown(false);
                return;
            }

            const filtered = ADDRESSES.filter((a) => a.toLowerCase().includes(q)).slice(0, 10);
                setSuggestions(filtered);
                setShowDropdown(filtered.length > 0);
            };


            // For the Alert
            // This is where the saving code goes and then move to next page
            const onProceed = (data) => {
                // Here is where you proceed with the selected address
                console.log("Proceed with:", data.address);
                router.navigate("/setup/phone");
            };

            // Function for select address
            const pickAddress = (selectedAddress) => {
                console.log('CHecking the thing');
                setValue("address", selectedAddress, { shouldDirty: true });
                setSuggestions([]);
                setShowDropdown(false);

                Alert.alert(
                "Address selected",
                selectedAddress,
                [
                    { text: "Change", style: "cancel" },
                    {
                    text: "Proceed",
                    onPress: () => {
                        handleSubmit(onProceed)();
                    },
                    },
                ],
                { cancelable: true }
                );
            };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        {/* ============= */}
           <View style={[styles.search,{backgroundColor: theme.ux}]}>
                <View style={styles.navicon}><FontAwesome5 name="chevron-left" size={24} color={theme.hl01} /></View>
                    <View style={{flex: 1}}>
                        <OneFieldForm control={control} onTyping={updateSuggestions} />
                    </View>{/* input */}
                    <View style={styles.navicon}><FontAwesome name="search" size={24} color={theme.hl01} /></View>
            </View>
            {/* ======================= */}
            <View style={[styles.mapholder, {backgroundColor: theme.map, padding:0, margin: 0 }]}>
                <MapScreen />
            </View>
            {/* ====================== */}
            <View style={[styles.sectcontrol, {backgroundColor: theme.ux}]}>
                <View style={[styles.flexhold, {paddingBottom: 15}]}>
                    <View style={styles.fheit}>
                        <Text style={styles.biggTxt}>74F</Text>
                        <Text>Locationform</Text>
                        <View><Ionicons name="settings" size={33} color="#dbae0c" /></View>
                    </View>
                    {/* ====================== */}
                    <View style={[styles.secondwing, styles.border]}>
                        <View style={styles.fromto}>
                            <View style={[styles.from, styles.round]}><View style={[styles.dot, {backgroundColor: theme.background}]}></View></View>
                            <View style={styles.route}></View>
                            <View style={[styles.to, styles.round]}><View style={[styles.dot, {backgroundColor: theme.background}]}></View></View>
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
                        </View>{/* bump */}
                    </View>{/* secondwingßß */}
                </View>{/* Flexhold */}
                {/* ====================== */}
                <View style={styles.section}>
                    <View style={styles.digits}>
                        <View style={[styles.keyicon,{backgroundColor:theme.shadow}]}><Fontisto name="car" size={24} color={theme.hl02} /></View>
                        <View style={styles.digitvalues}>
                            <ThemedSubtext variant='note'>Distance</ThemedSubtext>
                            <View style={styles.flexhold}>
                                <ThemedSubtext variant="highlight" style={styles.htext}>8.54</ThemedSubtext>
                                <Themedtext style={styles.tiny}>km</Themedtext>
                            </View>
                        </View>
                    {/* ====================== */}
                        <View style={styles.digitvalues}>
                            <ThemedSubtext variant='note'>Time</ThemedSubtext>
                            <View style={styles.flexhold}>
                                <ThemedSubtext variant="highlight" style={styles.htext}>8.54</ThemedSubtext>
                                <Themedtext style={styles.tiny}>km</Themedtext>
                            </View>
                        </View>{/* digitvalues */}
                    {/* ------------------- */}
                    </View>{/* digits */}
                    <View style={[styles.circle,{backgroundColor: theme.hl01}]}><Feather name="arrow-right" size={24} color={theme.bright}/></View>
                </View>{/* section */}
            </View>{/* sectcontrol */}
            {/* ✅ keep dropdown here so it's still overlay-fullscreen */}
            <DisplayDropdown
                visible={showDropdown}
                suggestions={suggestions}
                onPick={pickAddress}
                onClose={() => setShowDropdown(false)}
                title="You're Here!"
            />
         {/* ============= */}
        </View>
        </TouchableWithoutFeedback>
    )}

    export default Locationform

    const styles = StyleSheet.create({

        container: {
            flex: 1,
            position: 'relative',
            zIndex: 1,
            padding: 0,
        },

        navicon: {
            width: 45,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,

        },
       

        mapholder: {
            flex: 1,
            padding: 10,
            position: 'relative',
            zIndex: 1,
        },

        bottompad: {
            paddingBottom: 11,
        },

        sectcontrol: {
            padding: 17,
            width: '90%',
            position: 'absolute',
            zIndex: 5,
            alignSelf: 'center',
            bottom: 40,
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
            zIndex: 10,
            top: 60,
            alignSelf: 'center',
            // iOS shadow
            shadowColor: "#000",
            shadowOffset: { width: 12, height: 11 },
            shadowOpacity: 0.15,
            shadowRadius: 30,

            // Android shadow
            elevation: 6,
        },

        circle: {
            justifyContent: 'center',
            alignItems:  'center',
            width: 44,
            height: 44,
            borderRadius: 55,
            borderColor: '#FFF',
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
            justifyContent: 'space-between',
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
            justifyContent: 'space-between',
            width: '50%',
            padding: 6,
            paddingRight: 13,
        },

        fromto: {
            width: 30,
            minHeight: 50,
        },

        strong: {
            fontFamily: 'Inter_800ExtraBold',
            color: '#222',
        },

        bump: {
             width: '70%',
        },

        from: {
            width: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: '#025ff6',
            justifyContent: 'center',
            alignItems: 'center'
        },

        to: {
            width: 20,
            height: 20,
            borderRadius: 20,
            backgroundColor: '#07a996',
            justifyContent: 'center',
            alignItems: 'center'
        },

        route: {
            width: 4,
            height: 28,
    
        },

        dot: {
            width: 8,
            height: 8,
            borderRadius: 20,
        },

        border: {
            borderWidth: 1,
            borderColor: '#CCC',
            borderRadius: 10,
            padding: 11,
        },

        centering: {
            alignSelf: 'center',
            height: 5,
        },
        


    })