import { StyleSheet, View } from "react-native";
import Tile from "./Tile";

const LevelGrid = () => {
  return (
    <View style={styles.levelGrid}>
      {Array.from(Array(81).keys()).map((tile, index) => (
        <Tile key={index}></Tile>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  levelGrid: {
    display: "grid",
    backgroundColor: "rgba(128, 0, 128, 0.5)",
    border: "1px solid white",
    flexGrow: 1,
    aspectRatio: 1,
    borderRadius: 8,
    gridTemplateRows: "repeat(9, 1fr)",
    gridTemplateColumns: "repeat(9, 1fr)",
    overflow: "hidden",
  },
});

export default LevelGrid;
