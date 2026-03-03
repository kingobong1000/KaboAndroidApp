import React, { useMemo, useEffect, useRef, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Pressable, Platform, useColorScheme } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { DARK_MAP_STYLE, LIGHT_MAP_STYLE } from "../../constants/mapStyles";



export default function MapScreen() {
  const mapRef = useRef(null);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);

  const systemScheme = useColorScheme(); // "light" | "dark"
  const [userChoice, setUserChoice] = useState("system"); // "system" | "light" | "dark"
  const effectiveScheme = userChoice === "system" ? (systemScheme ?? "light") : userChoice;
  const customStyle = useMemo(() => {
    return effectiveScheme === "dark" ? DARK_MAP_STYLE : LIGHT_MAP_STYLE;
  }, [effectiveScheme]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        // 1) Ask permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          if (isMounted) setError("Location permission denied.");
          return;
        }

        // (Optional) On Android, this can prompt user to enable “improve accuracy” mode
        // await Location.enableNetworkProviderAsync();

        // 2) Get current position (GPS / high accuracy)
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation, // or Highest
          mayShowUserSettingsDialog: true, // Android: ask to enable better accuracy if needed
        });

        if (!isMounted) return;

        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });

        // 3) Animate map to user
        requestAnimationFrame(() => {
          mapRef.current?.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            },
            500
          );
        });
      } catch (e) {
        if (isMounted) setError(e?.message ?? "Failed to get location.");
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={{ marginTop: 10 }}>Getting your location…</Text>
      </View>
    );
  }    

  return (
    <View style={[styles.container, styles.root]}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        customMapStyle={customStyle}          // JSON styling :contentReference[oaicite:4]{index=4}
        userInterfaceStyle={effectiveScheme}  // force map UI style :contentReference[oaicite:5]{index=5}
        showsTraffic={false}                  // feature toggles :contentReference[oaicite:6]{index=6}
        showsBuildings={true}
        showsIndoors={true}
        zoomControlEnabled={true}             // Android-only :contentReference[oaicite:7]{index=7}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsMyLocationButton={Platform.OS === "android"}
      >
        <Marker coordinate={coords} title="You are here" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1 
},


  center: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center", 
},

  error: { 
    fontSize: 16 
},
});