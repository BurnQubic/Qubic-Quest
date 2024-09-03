import React, { useEffect, useRef, useState, useMemo } from "react";
import { Image } from "expo-image";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { useRecoilValue } from "recoil";
import { View, StyleSheet, Text } from "react-native";
import { levelItemsState } from "../../../store/levelItems";
import { CANDY_ASSETS } from "../../../extern";
import useScore from "../../../hooks/useScore";
import LevelManager from "../../leve-manager/LevelManager";
import { ANIMATION_TIME_MS } from "../../../config";
// import useAudio from '../../../../../hooks/useAudio';

export const CandyColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

let activeBounceSounds = 0;
const activeBounceSoundsLimit = 10;

const animateItemSpawn = (positionY: any) => {
  positionY.value = withTiming(positionY.value / 100, {
    duration: ANIMATION_TIME_MS * 1.5,
  });
};

type CandyProps = {
  color: CandyColor;
  index: number;
  id?: string;
};

const Candy = ({ color, id, index }: CandyProps) => {
  const [show, setShow] = useState(false);
  const levelItems = useRecoilValue(levelItemsState);
  const translateY = useSharedValue(-5000);
  const itemUsed = useRef(false);
  // const playAudio = useAudio();
  const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);

  useScore(matched, index, "Candy", color);

  useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 22,
      stiffness: 200,
    });
    playCandyBounceSound();
  }, []);

  useEffect(() => {
    !!id && setShow(true);
  }, [id]);

  useEffect(() => {
    if (itemUsed.current) return;
    matched && onItemMatch();
  }, [levelItems]);

  const playCandyBounceSound = () => {
    if (activeBounceSounds > activeBounceSoundsLimit) return;
    // playAudio({ audioName: 'candyBounce', volume: 0.25, speed: randomNumber(0.9, 1.5) });
    activeBounceSounds += 1;
    setTimeout(() => {
      activeBounceSounds -= 1;
    }, 1000);
  };

  const onItemMatch = () => {
    itemUsed.current = true;
    setShow(false);
  };
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {show && <Image source={CANDY_ASSETS[color]} style={styles.image} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Candy;
