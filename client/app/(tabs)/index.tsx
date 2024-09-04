import { StyleSheet, Platform, TouchableOpacity, View } from "react-native";
import { HelloWave } from "@/app/components/HelloWave";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import GameScreen from "./games";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ButtonWrapper } from "../components/common/buttons/ButtonWrapper";
import { Button } from "../components/common/buttons/RectButton";
import { theme } from "@/config/theme";
import { ThemedText } from "@/app/components/common/ThemedText";
import { ThemedView } from "../components/common/ThemedView";
import { gameList } from "@/config/constants/game-list";

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <ParallaxScrollView
        headerBackgroundColor={theme.colors.secondary90}
        headerImage={<Ionicons size={310} name="home-outline" style={styles.logo} />}
      >
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>Today</ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>Your personal selection of puzzles for different brain areas</ThemedText>
          <ScrollView>
            <View style={styles.timelineContainer}>
              {gameList.map((puzzle, index) => (
                <ButtonWrapper key={index} style={styles.puzzleContainer}>
                  <ThemedView style={styles.circle} />
                  <Link href={{ pathname: "./puzzles/[id]", params: { id: puzzle.id } }} style={styles.puzzle}>
                    <Image source={puzzle.image} style={styles.image} />
                    <ThemedView>
                      <ThemedText type="default" style={styles.title}>{puzzle.title}</ThemedText>
                      <ThemedText type="default" style={styles.category}>{puzzle.levels}</ThemedText>
                    </ThemedView>
                  </Link>
                </ButtonWrapper>
              ))}
            </View>
          </ScrollView>
        </ThemedView>
      </ParallaxScrollView>
      <ButtonWrapper style={styles.button}>
        <ThemedText type="default" style={styles.buttonText}>Start playing</ThemedText>
      </ButtonWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  timelineContainer: {
    flexDirection: "column",
  },
  puzzleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    marginHorizontal: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  puzzle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    color: "#dddddd",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
