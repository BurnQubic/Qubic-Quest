import React from "react";
import { View, StyleSheet } from "react-native";
import LevelSelector from "./components/level-selector";
import CandyTiles from "./components/candy-tiles/CandyTiles";
import LevelContextProvider from "./context/LevelContext";

const CandyTilePuzzle = () => {
  return (
    <View style={styles.container}>
      {/* <LevelSelector></LevelSelector> */}
      <LevelContextProvider>
        <CandyTiles></CandyTiles>
      </LevelContextProvider>
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
