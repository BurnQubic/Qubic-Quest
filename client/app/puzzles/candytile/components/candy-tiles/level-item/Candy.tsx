import React, { useEffect, useRef, useState, useMemo } from "react";
import { Image } from "expo-image";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { useRecoilValue } from "recoil";
import { View, StyleSheet } from "react-native";
import { levelItemsState } from "../../../store/levelItems";
import { CANDY_ASSETS } from "../../../extern";
import useScore from "../../../hooks/useScore";
import LevelManager from "../../leve-manager/LevelManager";
// import useAudio from '../../../../../hooks/useAudio';

export const CandyColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

let activeBounceSounds = 0;
const activeBounceSoundsLimit = 10;

const animateItemSpawn = (positionX: any, positionY: any) => {
  positionX.value = withTiming((positionX.value * 1) / 100, { duration: 750 });
  positionY.value = withTiming((positionY.value * 1) / 100, { duration: 750 });
};

type CandyProps = {
  color: CandyColor;
  id: string;
  index: number;
  pSize?: any;
};

const Candy = ({ color, id, index, pSize }: CandyProps) => {
  const [show, setShow] = useState(false);
  const levelItems = useRecoilValue(levelItemsState);
  const translateY = useSharedValue(-500);
  const itemUsed = useRef(false);
  // const playAudio = useAudio();
  const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);

  useScore(matched, index, "Candy", color);

  useEffect(() => {
    translateY.value = withSpring(0, { damping: 5, stiffness: 80 });
    playCandyBounceSound();
  }, []);

  useEffect(() => {
    if (id) setShow(true);
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
  // const animatedStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         { translateX: (positionX.value * pSize.width) / 100 },
  //         { translateY: (positionY.value * pSize.height) / 100 },
  //       ],
  //       opacity: opacity.value,
  //     };
  //   });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle, { display: show ? "flex" : "none" }]}>
      <Image source={CANDY_ASSETS[color]} style={styles.image} />
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
