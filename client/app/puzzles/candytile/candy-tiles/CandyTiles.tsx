import React from "react";
import { View } from "react-native";
import LevelGrid from "./level-grid";
import ScorePanel from "./score-panel";

const CandyTiles = () => {
  return (
    <View
      style={{
        width: "min(100%, 900px)",
        maxHeight: "100%",
        marginRight: "auto",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
      }}
    >
      <ScorePanel></ScorePanel>
      <LevelGrid></LevelGrid>
    </View>
  );
};

export default CandyTiles;
