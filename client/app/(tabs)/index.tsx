import { StyleSheet, Platform, TouchableOpacity, Text, View } from "react-native";

import { HelloWave } from "@/app/components/HelloWave";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import GameScreen from "./games";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";

import candyImage from "@/assets/images/main/candy-game.jpg";
import ghostImage from "@/assets/images/main/candy-game.jpg";
import numbersImage from "@/assets/images/main/candy-game.jpg";
import { Ionicons } from "@expo/vector-icons";

const images = [
  {
    title: "Candy Crush",
    category: "Difficult",
    image: candyImage,
  },
  {
    title: "Candy Crush",
    category: "Easy",
    image: ghostImage,
  },
  {
    title: "Candy Crush",
    category: "Intermediate",
    image: numbersImage,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#A1CEDC" }}
        headerImage={<Ionicons size={310} name="person-circle-outline" style={styles.logo} />}
      >
        <View style={styles.container}>
          <Text style={styles.header}>Today</Text>
          <Text style={styles.subtitle}>Your personal selection of puzzles for different brain areas</Text>
          <ScrollView>
            <View style={styles.timelineContainer}>
              {images.map((puzzle, index) => (
                <View key={index} style={styles.puzzleContainer}>
                  <View style={styles.circle} />
                  <TouchableOpacity style={styles.puzzle}>
                    <Image source={puzzle.image} style={styles.image} />
                    <View>
                      <Text style={styles.title}>{puzzle.title}</Text>
                      <Text style={styles.category}>{puzzle.category}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ParallaxScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start playing</Text>
      </TouchableOpacity>
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
    backgroundColor: "#00aaff",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
});
