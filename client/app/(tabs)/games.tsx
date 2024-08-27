import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import candyImage from "@/assets/images/main/candy-game.jpg";
import ghostImage from "@/assets/images/main/candy-game.jpg";
import numbersImage from "@/assets/images/main/candy-game.jpg";
import { Image } from "expo-image";

const games = [
  { title: "Candy sort", levels: "1/800", image: candyImage },
  { title: "Robotic flows", levels: "1/480", image: ghostImage },
  { title: "Draw one line", levels: "1/235", image: numbersImage },
  { title: "Connect the dots", levels: "1/300", image: numbersImage },
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
    <View style={styles.container}>
      <Text style={styles.header}>Games</Text>
      <ScrollView>
        <Text style={styles.subHeader}>Free game of the day</Text>
        <Animated.View style={[styles.featuredGame, animatedStyle]}>
          <TouchableOpacity style={styles.featuredGameButton} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Image source={require("@/assets/images/main/candy-game.jpg")} style={styles.featuredImage} />{" "}
            {/* Replace with actual image path */}
            <View style={styles.featuredGameText}>
              <Text style={styles.featuredTitle}>Strange signals</Text>
              <Text style={styles.playButtonText}>PLAY GAME</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.subHeader}>Free games</Text>
        <View style={styles.gamesGrid}>
          {games.map((game, index) => (
            <View key={index} style={styles.gameCard}>
              <Image source={game.image} style={styles.gameImage} />
              <Text style={styles.gameTitle}>{game.title}</Text>
              <Text style={styles.levels}>{`LEVEL ${game.levels}`}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 16,
    paddingTop: 40,
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
