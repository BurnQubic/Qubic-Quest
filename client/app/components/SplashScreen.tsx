import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, useColorScheme } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    fadeAnim.value = withTiming(1, { duration: 1000 });

    return () => clearTimeout(timer);
  }, [onFinish, fadeAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <LinearGradient colors={["#0A1033", "#1B2565"]} style={styles.container}>
      <Animated.View style={[styles.bannerContainer, animatedStyle]}>
        <Image source={require("../../assets/images/favicon.png")} style={styles.banner} />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Qubic Quest</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    width: 240,
    height: 240,
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  text: {
    fontSize: 36,
    color: "#FFFFFF",
  },
});

export default SplashScreen;
