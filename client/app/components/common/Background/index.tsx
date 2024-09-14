import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@/config/theme";
import { StyleSheet, ViewProps } from "react-native";

interface IBackgroundProps extends ViewProps {
  children: ReactNode;
}

export function Background({ children, ...props }: IBackgroundProps) {
  const { secondary100, secondary70 } = theme.colors;

  return (
    <LinearGradient style={styles.container} colors={[secondary100, secondary70]} {...props}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
