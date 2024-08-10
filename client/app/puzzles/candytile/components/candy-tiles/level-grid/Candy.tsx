import red from "@/assets/images/candy-tiles/candies/red.png";
import orange from "@/assets/images/candy-tiles/candies/orange.png";
import yellow from "@/assets/images/candy-tiles/candies/yellow.png";
import green from "@/assets/images/candy-tiles/candies/green.png";
import blue from "@/assets/images/candy-tiles/candies/blue.png";
import purple from "@/assets/images/candy-tiles/candies/purple.png";
import { useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import LevelManager from "./level-manager";
import { Image } from "expo-image";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useFocusEffect } from "expo-router";
import { Button, Pressable, View } from "react-native";

export const CandyColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

const candyImages: { [key: string]: any } = {
  Red: red,
  Orange: orange,
  Yellow: yellow,
  Green: green,
  Blue: blue,
  Purple: purple,
};

type CandyProps = {
  color: CandyColor;
  index: number;
  id: string;
  pSize: any;
};

const Candy = ({ color, index, id, pSize }: CandyProps) => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(-100);
  const opacity = useSharedValue(1);

  const initialIndex = LevelManager.levelData.items.findIndex((x) => x?.key === id);
  const initailColumnIndex = initialIndex + 1 - (Math.ceil((initialIndex + 1) / 9) - 1) * 9;
  useFocusEffect(() => {
    updatePosition();
    LevelManager.subscribeItemsChange(onLevelItemsChanged);

    return () => {
      LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
    };
  });

  const onLevelItemsChanged = (items: any[], matched: boolean): void => {
    const candyMatched = !items.some((x) => x?.key === id);
    if (candyMatched) {
      opacity.value = withTiming(0, { duration: 500 }); // Fade out
    } else {
      updatePosition();
      opacity.value = withTiming(1, { duration: 500 }); // Fade in
    }
  };

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
      <Image
        source={candyImages[color]}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 50,
          margin: 0,
          resizeMode: "cover",
        }}
      />
    </Animated.View>
  );
};

export default Candy;
