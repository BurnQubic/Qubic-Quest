import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";
import { COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { getItemColumnIndex, getItemRowIndex } from "../../../game-logic/tile-matching";
import { useSetRecoilState } from "recoil";
import { levelFxListState } from "../../../store/levelFxList";

type Props = {
  score: number;
  index: number;
  id: string;
};

const TileScoreFX = ({ score, index, id }: Props) => {
  const setLevelFxList = useSetRecoilState(levelFxListState);
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

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
        toValue: -50,
        duration: 700,
        useNativeDriver: true,
        // easing: Animated.Easing.linear,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
        // easing: Animated.Easing.linear,
        delay: 200,
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 0,
    fontFamily: "LilyScriptOne_400Regular",
    color: "#FFC107",
  },
});

export default TileScoreFX;
