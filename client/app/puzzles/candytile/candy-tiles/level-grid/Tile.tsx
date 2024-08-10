import Candy, { CandyColors } from "./Candy";
import { StyleSheet, View } from "react-native";

const Tile = () => {
  return (
    <View style={styles.tileContainer}>
      <Candy color={CandyColors[Math.floor(Math.random() * CandyColors.length)]}></Candy>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    position: "relative",
    border: "1px solid purple",
    backgroundColor: "transparent",
    hover: {
      backgroundColor: "lightyellow",
      opacity: 0.5,
    },
    transitionDuration: "0.2s",
    userSelect: "none",
  },
});

export default Tile;
