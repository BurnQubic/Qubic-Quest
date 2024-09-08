import { StyleSheet, Platform, TouchableOpacity, View } from "react-native";
import { HelloWave } from "@/app/components/HelloWave";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import GameScreen from "./games";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ButtonWrapper } from "../components/common/ButtonWrapper";
import { Button } from "../components/common/RectButton";
import { theme } from "@/config/theme";
import { ThemedText } from "@/app/components/common/ThemedText";
import { ThemedView } from "../components/common/ThemedView";
import { gameList } from "@/config/constants/game-list";
import { Card } from "@/app/components/common/Card";

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <ParallaxScrollView bannerComponent={<Ionicons size={310} name="home-outline" style={styles.logo} />}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.header}>
            Today's Choices
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            Your personal selection of puzzles for different brain areas
          </ThemedText>
          <ScrollView>
            <View style={styles.timelineContainer}>
              {gameList.map((puzzle, index) => (
                <ButtonWrapper key={index} style={styles.puzzleContainer}>
                  <Card style={styles.puzzle}>
                    <Link href={{ pathname: "./puzzles/[id]", params: { id: puzzle.id } }} style={styles.puzzleLink}>
                      <View style={styles.imageContainer}>
                        <Image source={puzzle.image} style={styles.image} />
                      </View>

                      <ThemedView style={styles.puzzleInfo}>
                        <ThemedText type="default" style={styles.title}>
                          {puzzle.title}
                        </ThemedText>
                        <ThemedText type="default" style={styles.category}>
                          {puzzle.levels}
                        </ThemedText>
                      </ThemedView>
                    </Link>
                  </Card>
                </ButtonWrapper>
              ))}
            </View>
          </ScrollView>
        </ThemedView>
      </ParallaxScrollView>
      <ButtonWrapper style={styles.button}>
        <Link href={{ pathname: "./puzzles/[id]", params: { id: "candytile" } }} style={styles.puzzleLink}>
          <ThemedText type="default" style={styles.buttonText}>
            Start playing
          </ThemedText>
        </Link>
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
    fontFamily: "LilyScriptOne_400Regular"
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    fontFamily: "LilyScriptOne_400Regular"
  },
  timelineContainer: {
    flexDirection: "column",
  },
  puzzleContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
  },
  puzzle: {
    flex: 1,
  },
  imageContainer: {},
  puzzleInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 10,
    fontFamily: "LilyScriptOne_400Regular"
  },
  puzzleLink: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
    justifyContent: "flex-end",
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
    fontFamily: "LilyScriptOne_400Regular"
  },
  logo: {
    color: "#dddddd",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
