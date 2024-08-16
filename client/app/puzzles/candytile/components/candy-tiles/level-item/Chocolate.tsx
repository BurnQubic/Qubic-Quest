import React, { useEffect, useRef, useState, useMemo } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useRecoilValue } from "recoil";
import useScore from "../../../hooks/useScore";
import { levelItemsState } from "../../../store/levelItems";
import { chocolateSprite } from "../../../extern";
import { Image } from "expo-image";

const animateItemSpawn = (scaleValue: Animated.Value, onComplete: () => void): void => {
  Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: 1.2,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1)),
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
      easing: Easing.out(Easing.back(1)),
    }),
  ]).start(onComplete);
};

const animateChocolateScale = (rotationValue: Animated.Value): void => {
  Animated.loop(
    Animated.timing(rotationValue, {
      toValue: 360,
      duration: 30000,
      useNativeDriver: true,
      easing: Easing.linear,
    })
  ).start();
};

type ChocolateProps = {
  id: string;
  index: number;
};

const Chocolate = ({ id, index }: ChocolateProps) => {
  const [show, setShow] = useState(true);
  const itemUsedRef = useRef(false);
  const levelItems = useRecoilValue(levelItemsState);
  const scaleValue = useRef(new Animated.Value(0)).current;
  const rotationValue = useRef(new Animated.Value(0)).current;
  //   const playAudio = useAudio();
  const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);
  useScore(matched, index, "Chocolate");

  useEffect(() => {
    animateItemSpawn(scaleValue, () => {
      animateChocolateScale(rotationValue);
    });

    return () => {
      rotationValue.stopAnimation();
    };
  }, []);

  useEffect(() => {
    if (matched && !itemUsedRef.current) {
      onItemMatch();
    }
  }, [levelItems]);

  const onItemMatch = () => {
    itemUsedRef.current = true;
    setShow(false);
    // playAudio({ audioName: "chocolateMatch", volume: 0.5 });
  };

  const spin = rotationValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleValue }, { rotate: spin }] },
        !show && { display: "none" }, // hide when show is false
      ]}
    >
      <Image source={chocolateSprite} style={styles.image} />
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

export default Chocolate;
