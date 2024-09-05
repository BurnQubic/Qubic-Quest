import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "@/config/theme";

type Props = {
  urlImage?: string;
};

export function Avatar({ urlImage }: Props) {
  const { secondary50, secondary30 } = theme.colors;

  return (
    <LinearGradient style={styles.container} colors={[secondary50, secondary30]}>
      {urlImage ? (
        <Image source={{ uri: urlImage }} style={styles.avatar} resizeMode="cover" />
      ) : (
        <View style={styles.avatarIconContainer}>
          <Ionicons name="person" size={30} color={theme.colors.primary} />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 22,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -23 }, { translateY: -23 }],
  },
  avatarIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -23 }, { translateY: -23 }],
  },
});
