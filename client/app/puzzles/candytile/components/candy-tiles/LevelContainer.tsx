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
        <DelayComponent delayMs={ANIMATION_TIME_MS}>
          <ItemGrid />
        </DelayComponent>
        <FXGrid />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  levelContainer: {
    maxWidth: "100%",
    maxHeight: "100%",
    marginHorizontal: "auto",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
});

export default LevelContainer;
