import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { ThemedView } from "../ThemedView";
import { Background } from "../Background";
import Header from "../Header";
import { theme } from "@/config/theme";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  bannerComponent?: ReactElement;
  headerBackgroundColor?: string;
}>;

export default function ParallaxScrollView({ children, bannerComponent, headerBackgroundColor = theme.colors.overlay }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Header />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16} contentContainerStyle={{ minHeight: "100%" }}>
        {bannerComponent && (
          <Animated.View style={[styles.header, { backgroundColor: headerBackgroundColor }, headerAnimatedStyle]}>
            {bannerComponent}
          </Animated.View>
        )}
        <Background style={styles.content}>{children}</Background>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 250,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    padding: 10,
    gap: 16,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: "red",
    marginTop: -20,
  },
});
