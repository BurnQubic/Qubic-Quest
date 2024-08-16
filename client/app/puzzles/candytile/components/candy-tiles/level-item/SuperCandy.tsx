import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import uuid from "react-uuid";
import { levelItemsState } from "../../../store/levelItems";
import { levelFxListState } from "../../../store/levelFxList";
import useScore from "../../../hooks/useScore";
import { SuperCandyFX } from "../../../types";
import { SUPER_CANDY_ASSETS } from "../../../extern";
import { Image } from "expo-image";

export const CandyColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

const animateItemSpawn = (scaleValue: Animated.Value, rotateValue: Animated.Value): void => {
  Animated.parallel([
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 750,
      easing: Easing.out(Easing.back(1)),
      useNativeDriver: true,
    }),
    Animated.timing(rotateValue, {
      toValue: -5,
      duration: 750,
      easing: Easing.out(Easing.back(1)),
      useNativeDriver: true,
    }),
  ]).start();
};

type SuperCandyProps = {
  color: CandyColor;
  id: string;
  index: number;
};

const SuperCandy = ({ color, id, index }: SuperCandyProps) => {
  const [show, setShow] = useState(true);
  const itemUsedRef = useRef(false);
  const levelItems = useRecoilValue(levelItemsState);
  const setLevelFxList = useSetRecoilState(levelFxListState);
  //   const playAudio = useAudio();
  const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(180)).current;

  useScore(matched, index, "SuperCandy", color);

  useEffect(() => {
    animateItemSpawn(scaleValue, rotateValue);
  }, []);

  useEffect(() => {
    const itemMatched = !levelItems.some((x) => x?.id === id);
    if (itemMatched && !itemUsedRef.current) {
      onItemMatch();
    }
  }, [levelItems]);

  const onItemMatch = () => {
    itemUsedRef.current = true;
    setShow(false);
    // playAudio({ audioName: "superCandyMatch" });
    setLevelFxList((list) => [
      ...list,
      {
        type: "SuperCandy",
        color,
        id: uuid(),
        index,
      } as SuperCandyFX,
    ]);
  };

  const rotate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleValue }, { rotate }],
          opacity: show ? 1 : 0,
        },
      ]}
    >
      <Image source={SUPER_CANDY_ASSETS[color]} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SuperCandy;
