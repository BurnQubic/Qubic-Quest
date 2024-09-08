import React from "react";
import { StyleSheet, ScrollView, ImageSourcePropType, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import ParallaxScrollView from "../components/common/ParallaxScrollView";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ButtonWrapper } from "../components/common/ButtonWrapper";
import { theme } from "@/config/theme";
import { ThemedView } from "../components/common/ThemedView";
import { ThemedText } from "../components/common/ThemedText";
import { gameList } from "@/config/constants/game-list";
import { Card } from "../components/common/Card";

export default function GamesScreen() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <ThemedView style={styles.mainContainer}>
      <ParallaxScrollView bannerComponent={<Ionicons size={310} name="game-controller-outline" style={styles.logo} />}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>
            Games
          </ThemedText>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
            <ThemedText type="subtitle" style={styles.subHeader}>
              Top Game
            </ThemedText>
            <Animated.View style={animatedStyle}>
              <Card style={styles.featuredGame} bannerImage={require("@/assets/images/main/candy-game.jpg")}>
                <ThemedView style={styles.featuredGameButton}>
                  <ThemedView style={styles.featuredGameText}>
                    <ThemedText type="default" style={styles.featuredTitle}>
                      {gameList[0].title}
                    </ThemedText>
                    <ButtonWrapper style={styles.playButtonText}>
                      <Link href={{ pathname: "./puzzles/[id]", params: { id: gameList[0].id } }}>
                        <ThemedText type="default" style={{ fontFamily: "LilyScriptOne_400Regular" }}>
                          PLAY GAME
                        </ThemedText>
                      </Link>
                    </ButtonWrapper>
                  </ThemedView>
                </ThemedView>
              </Card>
            </Animated.View>

            <ThemedText type="subtitle" style={styles.subHeader}>
              All games
            </ThemedText>
            <ThemedView style={styles.gamesGrid}>
              {gameList.map((game, index) => (
                <ButtonWrapper key={index} style={styles.gameCard}>
                  <Card bannerImage={game.image as ImageSourcePropType}>
                    <ThemedText type="default" style={styles.gameTitle}>
                      {game.title}
                    </ThemedText>
                    <ThemedText type="default" style={styles.levels}>{`LEVEL ${game.levels}`}</ThemedText>
                  </Card>
                </ButtonWrapper>
              ))}
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 0,
  },
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  logo: {
    color: "#dddddd",
    bottom: -60,
    left: -20,
    position: "absolute",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "LilyScriptOne_400Regular",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    fontFamily: "LilyScriptOne_400Regular",
  },
  featuredGame: {
    marginBottom: 30,
    borderRadius: 15,
    overflow: "hidden",
  },
  featuredGameButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  featuredGameText: {
    flexDirection: "column",
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.heading,
    marginBottom: 10,
    fontFamily: "LilyScriptOne_400Regular",
  },
  playButtonText: {
    fontSize: 18,
    color: theme.colors.heading,
    backgroundColor: theme.colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    overflow: "hidden",
    textAlign: "center",
  },
  gamesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gameCard: {
    width: "50%",
    borderRadius: 15,
    overflow: "hidden",
    minWidth: 150,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "LilyScriptOne_400Regular",
  },
  levels: {
    fontSize: 14,
    color: theme.colors.highlight,
    fontFamily: "LilyScriptOne_400Regular",
  },
});
