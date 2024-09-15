import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { theme } from "@/config/theme";

type Props = TouchableOpacityProps & {
  children: React.ReactNode;
};

export function ButtonWrapper({ children, ...rest }: Props) {
  return (
    <TouchableOpacity style={[styles.button, rest.style]} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
  },
});
