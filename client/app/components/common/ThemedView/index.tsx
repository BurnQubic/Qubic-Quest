import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/config/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  return <View style={[style]} {...otherProps} />;
}
