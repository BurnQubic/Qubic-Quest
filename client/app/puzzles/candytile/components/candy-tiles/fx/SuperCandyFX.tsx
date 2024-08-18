import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions } from "react-native";
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
  color: CandyColor;
  index: number;
  id: string;
};

const SuperCandyMatchFX = ({ color, index, id }: Props) => {
  const setLevelFxList = useSetRecoilState(levelFxListState);
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const position = [
    (getItemColumnIndex(index) - 1) * (screenWidth / COLUMN_NUMBER),
    (getItemRowIndex(index) - 1) * (screenHeight / ROW_NUMBER),
  ];

  useEffect(() => {
    animateFx();
  }, []);

  const animateFx = (): void => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        // easing: Animated.Easing.out(Animated.Easing.elastic(1)),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        // easing: Animated.Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => setLevelFxList((list) => list.filter((x) => x.id !== id)));
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: position[0] }, { translateY: position[1] }, { scale }],
          width: screenWidth / COLUMN_NUMBER,
          height: screenHeight / ROW_NUMBER,
          opacity: 0.6,
        },
      ]}
    >
      <View style={[styles.line, styles.horizontal, { backgroundColor: candyHexColors[color] }]} />
      <View style={[styles.line, styles.vertical, { backgroundColor: candyHexColors[color] }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
  line: {
    position: "absolute",
    backgroundColor: "inherit",
  },
  horizontal: {
    width: 1500,
    height: "100%",
    transform: [{ translateX: -750 }],
  },
  vertical: {
    width: "100%",
    height: 1500,
    transform: [{ translateY: -750 }],
  },
});

export default SuperCandyMatchFX;
