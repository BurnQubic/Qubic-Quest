import React from "react";
import { StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { theme } from "@/config/theme";

type Props = RectButtonProps & {
  children: React.ReactNode;
};

export function ButtonWrapper({ children, ...rest }: Props) {
  return (
    <RectButton style={[styles.button, rest.style]} {...rest}>
      {children}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    display: "flex",
  },
});
