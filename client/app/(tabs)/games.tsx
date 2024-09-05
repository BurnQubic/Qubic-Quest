import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Image } from "expo-image";
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
          <ScrollView>
            <ThemedText type="subtitle" style={styles.subHeader}>
              Free game of the day
            </ThemedText>
            <Animated.View style={animatedStyle}>
              <Card style={styles.featuredGame}>
                <ButtonWrapper style={styles.featuredGameButton}>
                  <Link href={{ pathname: "./puzzles/[id]", params: { id: gameList[0].id } }}>
                    <Image source={require("@/assets/images/main/candy-game.jpg")} style={styles.featuredImage} />
                    <ThemedView style={styles.featuredGameText}>
                      <ThemedText type="default" style={styles.featuredTitle}>
                        {gameList[0].title}
                      </ThemedText>
                      <ThemedText type="default" style={styles.playButtonText}>
                        PLAY GAME
                      </ThemedText>
                    </ThemedView>
                  </Link>
                </ButtonWrapper>
              </Card>
            </Animated.View>

            <ThemedText type="subtitle" style={styles.subHeader}>
              Free games
            </ThemedText>
            <ThemedView style={styles.gamesGrid}>
              {gameList.map((game, index) => (
                <Card key={index} style={styles.gameCard}>
                  <ButtonWrapper>
                    <Image source={game.image} style={styles.gameImage} />
                    <ThemedText type="default" style={styles.gameTitle}>
                      {game.title}
                    </ThemedText>
                    <ThemedText type="default" style={styles.levels}>{`LEVEL ${game.levels}`}</ThemedText>
                  </ButtonWrapper>
                </Card>
              ))}
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  logo: {
    color: "#dddddd",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  featuredGame: {
    marginBottom: 20,
  },
  featuredGameButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  featuredImage: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 10,
  },
  featuredGameText: {
    flexDirection: "column",
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  playButtonText: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#ffa500",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  gamesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gameCard: {
    marginBottom: 16,
    width: "48%",
  },
  gameImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 10,
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  levels: {
    fontSize: 12,
    color: "#6c6c6c",
  },
});
