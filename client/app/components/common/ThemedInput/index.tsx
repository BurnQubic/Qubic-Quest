import { View, Image, StyleSheet } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";
import { ThemedText } from "@/app/components/common/ThemedText";

import { theme } from "@/config/theme";

export type ThemedInputProps = React.ComponentProps<typeof PaperTextInput> & {
  lightColor?: string;
  darkColor?: string;
  leftIcon?: any;
  rightIcon?: any;
  errorText?: string;
};

export function ThemedInput({
  style,
  lightColor,
  darkColor,
  leftIcon,
  rightIcon,
  errorText,
  ...otherProps
}: ThemedInputProps) {
  return (
    <View style={[styles.container, style]}>
      <PaperTextInput
        style={styles.input}
        contentStyle={{ color: theme.colors.text, width: "100%" }}
        outlineColor={theme.colors.text}
        placeholderTextColor={theme.colors.text}
        left={
          leftIcon ? <PaperTextInput.Icon icon={() => <Image source={leftIcon} style={styles.icon} />} /> : undefined
        }
        right={
          rightIcon ? <PaperTextInput.Icon icon={() => <Image source={rightIcon} style={styles.icon} />} /> : undefined
        }
        {...otherProps}
      />
      {errorText && <ThemedText style={styles.errorText}>{errorText}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
    width: "100%",
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 12,
    marginTop: 5,
  },
});
