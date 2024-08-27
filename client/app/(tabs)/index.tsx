import { StyleSheet, Platform, TouchableOpacity, Text, View } from "react-native";

import { HelloWave } from "@/app/components/HelloWave";
import ParallaxScrollView from "@/app/components/common/ParallaxScrollView";
import GameScreen from "./games";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";

import candyImage from "@/assets/images/main/candy-game.jpg";
import ghostImage from "@/assets/images/main/candy-game.jpg";
import numbersImage from "@/assets/images/main/candy-game.jpg";

const images = [
  {
    title: "Identical items",
    category: "ATTENTION",
    image: candyImage,
  },
  {
    title: "Hidden ghosts",
    category: "MEMORY",
    image: ghostImage,
  },
  {
    title: "Ancient numbers",
    category: "ATTENTION",
    image: numbersImage,
  },
];

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={<Image source={require("@/assets/images/partial-react-logo.png")} style={styles.logo} />}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Today</Text>
        <Text style={styles.subtitle}>Your personal selection of exercises for different brain areas</Text>
        <ScrollView>
          <View style={styles.timelineContainer}>
            {images.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <View style={styles.circle} />
                <TouchableOpacity style={styles.exercise}>
                  <Image source={exercise.image} style={styles.image} />
                  <View>
                    <Text style={styles.title}>{exercise.title}</Text>
                    <Text style={styles.category}>{exercise.category}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start playing</Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
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
  exerciseContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 16,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  exercise: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 10,
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    backgroundColor: "#00aaff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
