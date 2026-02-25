import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Dimensions, Pressable, Image, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import Animated, { useSharedValue } from "react-native-reanimated";
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get("window");
// images for slides
import Slide1 from '../../assets/images/slide1.jpg';
import Slide2 from '../../assets/images/slide2.jpg';
import Slide3 from '../../assets/images/slide3.jpg';
import Slide4 from '../../assets/images/slide4.jpg';
// ÷---------------------------------------
const slides = [
  { title: "Fast delivery", 
    subtitle: "Get items to your door in minutes.", 
    img: Slide1, 
    bg: '#abcbff',
    top: '65%',
    txt: '#174082'
  },
  { title: "Live tracking", 
    subtitle: "Watch your rider move in real time. With our Live Tracking feature, you can monitor your order in real time — from confirmation to pickup.", 
    img: Slide2, 
    bg: '#4ef5b7',
    top: '60%',
    txt: '#91fee1'
  },
  { title: "Pay easily", 
    subtitle: "Affordable & flexible. Pay anywhere you are. Send & receive wherever you want.", 
    img: Slide3, 
    bg: '#09322d',
    top: '70%',
    txt: '#0f4f56'
  },
  { title: "Enjoy", 
    subtitle: "You can send and receive parcels & items from the comfort of your home or office. And even order your fav meals & snacks.", 
    img: Slide4, 
    bg: '#043754',
    top: '22%',
    txt: '#020f24'
  },
];
// ÷---------------------------------------
const Intro = () => {
      
  const router = useRouter();
  const progress = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const isLast = index === slides.length - 1;

    const schemeRaw = useColorScheme();
    const colorscheme = schemeRaw?.toLowerCase() || 'light';
    const theme = Colors.theme[colorscheme] ?? Colors.theme.light;

  return (
<View style={[styles.containe, {backgroundColor: theme.uibackground} ]}>
    <StatusBar style="dark" backgroundColor="#1083bd" />
      <Carousel
        width={width}
        height={height}
        data={slides}
        loop={false}
        pagingEnabled
        onProgressChange={progress}
        onSnapToItem={(i) => setIndex(i)}
        renderItem={({ item }) => (
        <View style={[styles.container, {backgroundColor: item.bg}]}>
            <View style={styles.imgHolder}>
                 <Image source={item.img} style={styles.img} />
            </View>
             {/* ---------------------- */}
            <View style={[styles.txtHolder, {top: item.top}]}>
                <Text style={{ color: item.txt, fontSize: 34, fontWeight: "800", lineHeight: 40 }}>
                    {item.title}
                </Text>
                <Text style={{ color: item.txt, marginTop: 14, fontSize: 17, lineHeight: 24, opacity: 0.85 }}>
                    {item.subtitle}
                </Text>
            </View>
        </View>
        )}
      />

      {/* bottom controls */}
      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 44,
          paddingHorizontal: 24,
        }}
      >
        <View style={{ alignItems: "center", marginBottom: 18 }}>
          <Pagination.Basic progress={progress} data={slides} />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Pressable onPress={() => router.replace("/setup")}>
            <Text style={{ 
              fontSize: 16,
              padding: 7,
              opacity: 0.75 }}>Skip</Text>
          </Pressable>


          <Pressable
            onPress={() => {
              if (isLast) router.replace("/setup");
            }}
            style={{
              paddingHorizontal: 18,
              paddingVertical: 12,
              borderRadius: 999,
              backgroundColor: theme.hl01,
            }}
          >
            <Text style={{ 
              fontSize: 16, 
              fontWeight: "700",
              color: theme.onDark,
              }}>
              {isLast ? "Get started" : "Swipe →"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default Intro

const styles = StyleSheet.create({
    container: {
        flex: 1,
        background: '#aad6fc',
        position: 'relative',
    },

    txtHolder: { 
        paddingHorizontal: 28, 
        justifyContent: "center",
        position: 'relative',
        zIndex: 3,
    },

    imgHolder: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        top: 0,
        left: 0,
        width: '100%',
        height: height,
        background: '#777'
    },

    img: {
        width: '100%',
        height: '100%'
    },

    skip: {
      backgroundColor: '#21e399'
    }



})