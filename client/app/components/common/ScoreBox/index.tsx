import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { theme } from "@/config/theme";

type ScoreBoxProps = {
  type: "level" | "coins";
  label: string;
  icon: string;
};

export const ScoreBox = ({ type, label, icon }: ScoreBoxProps) => {
  // Colors depending on the type (level or coins)
  const backgroundColors = type === "level" ? ["#f0f0ff", "#e0e0ff"] : ["#fffbe6", "#fff2cc"];
  const textColor = type === "level" ? theme.colors.primary : theme.colors.gold;

  return (
    <LinearGradient style={styles.container} colors={backgroundColors}>
      <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={20} color={textColor} style={styles.icon} />
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  label: {
    fontFamily: "LilyScriptOne_400Regular",
    fontSize: 16,
    marginLeft: 8,
  },
  icon: {
    marginRight: 4,
  },
});
