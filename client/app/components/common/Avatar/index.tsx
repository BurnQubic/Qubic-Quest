import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "@/config/theme";
import { ButtonWrapper } from "../ButtonWrapper";

type Props = {
  urlImage?: string;
};

export function Avatar({ urlImage }: Props) {
  const { lightBackground } = theme.colors;

  return (
    <LinearGradient style={styles.container} colors={[lightBackground, lightBackground]}>
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
    width: 46,
    height: 46,
    borderRadius: 23,
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
