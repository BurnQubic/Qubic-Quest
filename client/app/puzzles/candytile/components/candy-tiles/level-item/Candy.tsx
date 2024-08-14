import React, { useEffect, useRef, useState, useMemo } from "react";
import { Image } from "expo-image";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { useRecoilValue } from "recoil";
import { View } from "react-native";
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
  pSize: any;
};

const Candy = ({ color, index, id, pSize }: CandyProps) => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(-100);
  const opacity = useSharedValue(1);
  // const playAudio = useAudio();
  const [show, setShow] = useState(false);
  const levelItems = useRecoilValue(levelItemsState);
  const itemUsed = useRef(false);
  const matched = useMemo(() => !levelItems.some((x) => x?.id === id), [levelItems]);

  useScore(matched, index, "Candy", color);

  // const initialIndex = LevelManager.levelData.items.findIndex((x) => x?.key === id);
  // const initailColumnIndex = initialIndex + 1 - (Math.ceil((initialIndex + 1) / 9) - 1) * 9;

  useFocusEffect(() => {
    updatePosition();
    // LevelManager.subscribeItemsChange(onLevelItemsChanged);

    return () => {
      LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
    };
  });

  useEffect(() => {
    animateItemSpawn(positionX, positionY);
    playCandyBounceSound();
  }, []);

  useEffect(() => {
    if (id) setShow(true);
  }, [id]);

  const onLevelItemsChanged = (items: any[], matched: boolean): void => {
    const candyMatched = !items.some((x) => x?.key === id);
    if (candyMatched) {
      opacity.value = withTiming(0, { duration: 500 }); // Fade out
    } else {
      updatePosition();
      opacity.value = withTiming(1, { duration: 500 }); // Fade in
    }
  };

  useEffect(() => {
    if (itemUsed.current) return;
    if (matched) onItemMatch();
  }, [levelItems]);

  const updatePosition = () => {
    const currentIndex = LevelManager.levelData.items.findIndex((x) => x?.key === id);
    const rowIndex = Math.ceil((currentIndex + 1) / 9);
    const columnIndex = currentIndex + 1 - (rowIndex - 1) * 9;
    positionX.value = withTiming((columnIndex - 1) * 11.125, { duration: 500 });
    positionY.value = withTiming((rowIndex - 1) * 11.125, { duration: 500 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: (positionX.value * pSize.width) / 100 },
        { translateY: (positionY.value * pSize.height) / 100 },
      ],
      opacity: opacity.value,
    };
  });

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

  return (
    <Animated.View
      style={[
        {
          width: "11.125%",
          padding: "1.7%",
          aspectRatio: 1,
          position: "absolute",
        },
        animatedStyle,
      ]}
      data-candy
      data-index={index}
      data-color={color}
    >
      {show && (
        <Image
          source={CANDY_ASSETS[color]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 50,
            resizeMode: "cover",
          }}
        />
      )}
    </Animated.View>
  );
};

export default Candy;
