import React from "react";
import { View, StyleSheet } from "react-native";
import ScorePanel from "./score-panel";
import LevelContainer from "./LevelContainer";

const CandyTiles = () => {
  return (
    <View style={styles.container}>
      <ScorePanel></ScorePanel>
      <LevelContainer></LevelContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 800,
    maxHeight: "100%",
    marginRight: "auto",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },
});

export default CandyTiles;
