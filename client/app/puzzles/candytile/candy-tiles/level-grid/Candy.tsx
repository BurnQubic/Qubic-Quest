import red from "@/assets/images/candy-tiles/candies/red.png";
import orange from "@/assets/images/candy-tiles/candies/orange.png";
import yellow from "@/assets/images/candy-tiles/candies/yellow.png";
import green from "@/assets/images/candy-tiles/candies/green.png";
import blue from "@/assets/images/candy-tiles/candies/blue.png";
import purple from "@/assets/images/candy-tiles/candies/purple.png";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/app/components/common/ThemedView";
import { Image } from "expo-image";
import { Asset } from "expo-asset";

export const CandyColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

const candyImages: { [key: string]: string } = {
  Red: red,
  Orange: orange,
  Yellow: yellow,
  Green: green,
  Blue: blue,
  Purple: purple,
};

console.log("RED IMAGE", candyImages);

type CandyProps = {
  color: string;
};

const Candy = (props: CandyProps) => {
  return (
    <ThemedView style={styles.container}>
      <Image source={candyImages[props.color]} style={styles.image} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1,
    padding: "15%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    margin: 0,
    userSelect: "none",
    pointerEvents: "none",
  },
});

export default Candy;
