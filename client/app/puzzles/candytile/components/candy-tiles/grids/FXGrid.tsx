import React from "react";
import { useRecoilValue } from "recoil";
import { View, StyleSheet } from "react-native";
import CandyScoreFX from "../fx/CandyScoreFX";
import SuperCandyMatchFX from "../fx/SuperCandyFX";
import TileScoreFX from "../fx/TileScoreFX";
import { levelFxListState } from "../../../store/levelFxList";
import { LevelFX } from "../../../types";

const getFXComponent = (fx: LevelFX) => {
  switch (fx.type) {
    case "CandyScore":
      return <CandyScoreFX color={fx.color} score={fx.score} index={fx.index} key={fx.id} id={fx.id} />;
    case "TileScore":
      return <TileScoreFX score={fx.score} index={fx.index} key={fx.id} id={fx.id} />;
    case "SuperCandy":
      return <SuperCandyMatchFX color={fx.color} index={fx.index} key={fx.id} id={fx.id} />;
    default:
      return null;
  }
};

const FXGrid = () => {
  const levelFxList = useRecoilValue(levelFxListState);

  return <View style={styles.container}>{levelFxList.map((fx) => getFXComponent(fx))}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none", // Disables all touch events on the view
  },
});

export default FXGrid;
