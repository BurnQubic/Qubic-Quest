import React from "react";
import { StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { theme } from "@/config/theme";

type Props = RectButtonProps & {
  children: React.ReactNode;
};

export function ButtonWrapper({ children, ...rest }: Props) {
  return (
    <RectButton {...rest}>
      {children}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    color: theme.colors.heading,
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: "center",
  },
  iconWrapper: {
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: theme.colors.line,
  },
  icon: {
    width: 24,
    height: 18,
  },
});
