import { Text, type TextProps, StyleSheet } from "react-native";
import { theme } from "@/config/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "gameText";

};

export function ThemedText({ style, type = "default", ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        styles.default,
        { color: theme.colors.text },
        type === "title" ? styles.title : undefined,
        type === "gameText" ? styles.gameText : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  gameText: {
    fontFamily: "LilyScriptOne_400Regular",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
