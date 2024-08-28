import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import candyImage from "@/assets/images/main/candy-game.jpg";
import ghostImage from "@/assets/images/main/candy-game.jpg";
import numbersImage from "@/assets/images/main/candy-game.jpg";
import { Image } from "expo-image";
import ParallaxScrollView from "../components/common/ParallaxScrollView";

const games = [
  { title: "Candy Crush", levels: "1/800", image: candyImage },
  { title: "Candy Crush", levels: "1/480", image: ghostImage },
  { title: "Candy Crush", levels: "1/235", image: numbersImage },
  { title: "Candy Crush", levels: "1/300", image: numbersImage },
];

export default function GamesScreen() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View style={styles.mainContainer}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#A1CEDC" }}
        headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.logo} />}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Games</Text>
          <ScrollView>
            <Text style={styles.subHeader}>Free game of the day</Text>
            <Animated.View style={[styles.featuredGame, animatedStyle]}>
              <TouchableOpacity style={styles.featuredGameButton} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Image source={require("@/assets/images/main/candy-game.jpg")} style={styles.featuredImage} />
                <View style={styles.featuredGameText}>
                  <Text style={styles.featuredTitle}>Strange signals</Text>
                  <Text style={styles.playButtonText}>PLAY GAME</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.subHeader}>Free games</Text>
            <View style={styles.gamesGrid}>
              {games.map((game, index) => (
                <TouchableOpacity key={index} style={styles.gameCard}>
                  <Image source={game.image} style={styles.gameImage} />
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.levels}>{`LEVEL ${game.levels}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ParallaxScrollView>
    </View>
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
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
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
    backgroundColor: "#00aaff",
    borderRadius: 10,
    marginBottom: 20,
  },
  featuredGameButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
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
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: "48%",
    alignItems: "center",
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
