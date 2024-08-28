import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    fadeAnim.value = withTiming(1, { duration: 2000 });

    return () => clearTimeout(timer);
  }, [onFinish, fadeAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bannerContainer, animatedStyle]}>
        <Image source={require("../../assets/images/splash.png")} style={styles.banner} />
      </Animated.View>
      <Text style={styles.text}>Loading...</Text>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  bannerContainer: {
    marginBottom: 20,
  },
  banner: {
    width: 300,
    height: 100,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SplashScreen;
