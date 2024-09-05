import { TextInput, type TextInputProps, View, Image, StyleSheet } from "react-native";

import { useThemeColor } from "@/config/hooks/useThemeColor";
import { theme } from "@/config/theme";

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  leftIcon?: any;
  rightIcon?: any;
};

export function ThemedInput({ style, lightColor, darkColor, leftIcon, rightIcon, ...otherProps }: ThemedInputProps) {

  return (
    <View style={[styles.container, style]}>
      {leftIcon && <Image source={leftIcon} style={styles.icon} />}
      <TextInput style={[styles.input]} placeholderTextColor={theme.colors.text} {...otherProps} />
      {rightIcon && <Image source={rightIcon} style={styles.icon} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: theme.colors.text,
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
});
