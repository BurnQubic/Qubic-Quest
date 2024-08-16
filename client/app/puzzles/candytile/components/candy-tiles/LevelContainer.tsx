import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import Animated, { Easing, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import TileGrid from "./grids/TileGrid";
import ItemGrid from "./grids/ItemGrid";
import FXGrid from "./grids/FXGrid";
import { gameOverState } from "../../store/gameOver";
import { levelCompleteState } from "../../store/levelComplete";
import { ANIMATION_TIME_MS } from "../../config";
import LevelManager from "../leve-manager/LevelManager";
import DelayComponent from "./DelayComponent";
import { ThemedText } from "@/app/components/common/ThemedText";
import { ThemedView } from "@/app/components/common/ThemedView";

const LevelContainer = () => {
  const gameOver = useRecoilValue(gameOverState);
  const levelComplete = useRecoilValue(levelCompleteState);

  const animatedStyle = useAnimatedStyle(() => {
    if (levelComplete) {
      return {
        transform: [
          {
            rotate: withRepeat(
              withTiming("360deg", {
                duration: 5000,
                easing: Easing.linear,
              }),
              -1,
              false
            ),
          },
        ],
      };
    } else if (gameOver) {
      return {
        transform: [
          {
            rotate: withTiming("360deg", {
              duration: 1000,
              easing: Easing.linear,
            }),
          },
        ],
      };
    }
    return {};
  }, [levelComplete, gameOver]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.levelContainer, animatedStyle]}>
        <LevelManager />
        <TileGrid />
        {/* <DelayComponent delayMs={ANIMATION_TIME_MS}>
          <ItemGrid />
        </DelayComponent> */}
        <FXGrid />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: "100%",
    maxWidth: 800,
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
    flex: 1,
    overflow: "hidden",
  },
  levelContainer: {
    width: "100%",
    height: "100%",
    marginHorizontal: "auto",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
});

export default LevelContainer;
