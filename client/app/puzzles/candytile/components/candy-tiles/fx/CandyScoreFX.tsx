import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";
import { useSetRecoilState } from "recoil";
import { COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { CandyColor } from "../../../types";
import { levelFxListState } from "../../../store/levelFxList";
import { getItemColumnIndex, getItemRowIndex } from "../../../game-logic/tile-matching";

const candyHexColors = {
  Red: "#ff2445",
  Orange: "#ff670f",
  Yellow: "#ffbf0f",
  Green: "#16f74f",
  Blue: "#1670f7",
  Purple: "#7b16f7",
  White: "#fff",
};

type Props = {
  score: number;
  color: CandyColor;
  index: number;
  id: string;
};

const CandyScoreFX = ({ score, color, index, id }: Props) => {
  const setLevelFxList = useSetRecoilState(levelFxListState);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const position = [
    (getItemColumnIndex(index) - 1) * (screenWidth / COLUMN_NUMBER),
    (getItemRowIndex(index) - 1) * (screenHeight / ROW_NUMBER),
  ];

  useEffect(() => {
    animateScore();
  }, []);

  const animateScore = (): void => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100, // Move up by 100 units
        duration: 500,
        useNativeDriver: true,
        // easing: Animated.Easing.linear,
      }),
      Animated.timing(opacity, {
        toValue: 0, // Fade out
        duration: 500,
        useNativeDriver: true,
        // easing: Animated.Easing.linear,
      }),
    ]).start(() => {
      setLevelFxList((list) => list.filter((x) => x.id !== id));
    });
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: position[0] }, { translateY: position[1] }],
          width: screenWidth / COLUMN_NUMBER,
          height: screenHeight / ROW_NUMBER,
        },
      ]}
    >
      <Animated.Text
        style={[
          styles.scoreText,
          {
            color: candyHexColors[color],
            transform: [{ translateY }],
            opacity,
          },
        ]}
      >
        {score}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    margin: 0,
    fontFamily: "LilyScriptOne_400Regular",
  },
});

export default CandyScoreFX;
