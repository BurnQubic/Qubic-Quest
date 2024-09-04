import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { styles } from "./styles";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};
