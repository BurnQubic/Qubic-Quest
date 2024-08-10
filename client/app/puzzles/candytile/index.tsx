import React from "react";
import { View, StyleSheet } from "react-native";
import LevelSelector from "./level-selector";
import CandyTiles from "./candy-tiles/CandyTiles";

const CandyTilePuzzle = () => {
  return (
    <View style={styles.container}>
      <LevelSelector></LevelSelector>
      <CandyTiles></CandyTiles>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});

export default CandyTilePuzzle;
