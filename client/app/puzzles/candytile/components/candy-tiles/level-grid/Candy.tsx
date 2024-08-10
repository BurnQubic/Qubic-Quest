import red from "@/assets/images/candy-tiles/candies/red.png";
import orange from "@/assets/images/candy-tiles/candies/orange.png";
import yellow from "@/assets/images/candy-tiles/candies/yellow.png";
import green from "@/assets/images/candy-tiles/candies/green.png";
import blue from "@/assets/images/candy-tiles/candies/blue.png";
import purple from "@/assets/images/candy-tiles/candies/purple.png";
import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import LevelManager from "./level-manager";
import { Image } from "expo-image";
import Animated from "react-native-reanimated"; // Add this import

export const CandyColors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple"];

const candyImages: { [key: string]: string } = {
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
};

const Candy = ({ color, index, id }: CandyProps) => {
  const elementRef = useRef<Animated.View | null>(null); // Change type to Animated.View

  const initialIndex = LevelManager.levelData.items.findIndex((x) => x?.key === id);
  const initailColumnIndex = initialIndex + 1 - (Math.ceil((initialIndex + 1) / 9) - 1) * 9;

  useEffect(() => {
    updatePosition();
    LevelManager.subscribeItemsChange(onLevelItemsChanged);

    return () => {
      LevelManager.unsubscribeItemsChange(onLevelItemsChanged);
    };
  }, []);

  const onLevelItemsChanged = (items: LevelItem[], matched: boolean): void => {
    const candyMatched = !items.some((x) => x?.key === id);
    candyMatched && updateOpacity("0");
    !candyMatched && updatePosition();
  };

  const enableTransition = (enable: boolean): void => {
    if (elementRef.current) elementRef.current.style.transitionProperty = enable ? "opacity,top,left" : "opacity";
  };

  const updatePosition = () => {
    const currentIndex = LevelManager.levelData.items.findIndex((x) => x?.key === id);
    const rowIndex = Math.ceil((currentIndex + 1) / 9);
    const columnIndex = currentIndex + 1 - (rowIndex - 1) * 9;

    if (elementRef.current) {
      elementRef.current.style.top = `${(rowIndex - 1) * 11.125}%`;
      elementRef.current.style.left = `${(columnIndex - 1) * 11.125}%`;
    }
  };

  const updateOpacity = (value: string) => {
    if (elementRef.current) elementRef.current.style.opacity = value;
  };

  return (
    <Animated.View // Change View to Animated.View
      style={{
        width: "11.125%",
        padding: "1.7%",
        aspectRatio: 1,
        position: "absolute",
        left: `${(initailColumnIndex - 1) * 11.125}%`,
        top: "-100%",
      }}
      data-candy
      ref={elementRef}
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
