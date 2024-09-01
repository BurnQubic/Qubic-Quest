import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Candy from "./Candy";
import Chocolate from "./Chocolate";
import SuperCandy from "./SuperCandy";
import { liveItemsIds, removeLiveItem } from "../grids/ItemGrid";
import IceCream from "./IceCream";
import { LevelItem as LevelItemType } from "../../../types";
import { View, StyleSheet, Text } from "react-native";
import { getItemColumnIndex, getItemRowIndex } from "../../../game-logic/tile-matching";
import { ANIMATION_TIME_MS, COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { levelItemsState } from "../../../store/levelItems";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const getItemComponent = (item: LevelItemType | null, index: number): JSX.Element => {
  const id = item?.id || "";
  switch (item?.type) {
    case "Candy":
      return <Candy color={item.color} id={id} key={id} index={index} />;

    case "SuperCandy":
      return <SuperCandy color={item.color} id={id} key={id} index={index} />;

    case "Chocolate":
      return <Chocolate id={id} key={id} index={index} />;

    case "IceCream":
      return <IceCream id={id} key={id} index={index} />;

    default:
      return <Candy color={"Red"} id={id} key={id} index={index} />;
  }
};

const setPosition = (
  x: Animated.SharedValue<number>,
  y: Animated.SharedValue<number>,
  index: number,
  width: number,
  height: number
): void => {
  x.value = withTiming(width * (getItemColumnIndex(index) - 1), { duration: ANIMATION_TIME_MS });
  y.value = withTiming(height * (getItemRowIndex(index) - 1), { duration: ANIMATION_TIME_MS });
};

const LevelItem = ({ initialIndex }: { initialIndex: number }) => {
  const levelItems = useRecoilValue(levelItemsState);
  const [levelItemTarget, setLevelItemTarget] = useState<LevelItemType | null>(levelItems[initialIndex]);

  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rowIndexRef = useRef<number>(0);
  const columnIndexRef = useRef<number>(0);
  const emptyTargetRef = useRef(false);
  const currentIndexRef = useRef(initialIndex);

  useEffect(() => {
    const validItem = typeof levelItemTarget?.id === "string";
    if (validItem) {
      liveItemsIds.push(levelItemTarget?.id || "");
    }
  }, []);

  useEffect(() => {
    updatePosition();
    if (emptyTargetRef.current) {
      spawnItem();
    }
    currentIndexRef.current = levelItems.findIndex((x) => x?.id === levelItemTarget?.id);
  }, [levelItems]);

  useEffect(() => {
    if (levelItemTarget && containerWidth && containerHeight) {
      setPosition(translateX, translateY, getItemIndex(), containerWidth, containerHeight);
    }
  }, [levelItemTarget, containerHeight, containerWidth]);

  const spawnItem = () => {
    removeLiveItem(levelItemTarget?.id || "");
    const newTarget = levelItems
      .filter((x) => typeof x?.id === "string")
      .find((y) => !liveItemsIds.includes(y?.id || ""));
    const newTargetIsValid = newTarget !== undefined && typeof newTarget?.id === "string";

    if (!newTargetIsValid) return;

    liveItemsIds.push(newTarget?.id || "");
    console.log(levelItems);
    currentIndexRef.current = levelItems.findIndex((x) => x?.id === newTarget.id);
    setLevelItemTarget(newTarget);
    console.log(initialIndex, Math.floor(currentIndexRef.current / COLUMN_NUMBER), currentIndexRef.current % COLUMN_NUMBER);
    emptyTargetRef.current = false;
  };

  const updateGridPosition = (): void => {
    const gridIndex = getItemIndex();

    rowIndexRef.current = getItemRowIndex(emptyTargetRef.current ? initialIndex : gridIndex);
    columnIndexRef.current = getItemColumnIndex(emptyTargetRef.current ? initialIndex : gridIndex);

    setPosition(translateX, translateY, gridIndex, containerWidth, containerHeight);
  };

  const updatePosition = () => {
    updateGridPosition();
  };

  const getItemIndex = (): number => {
    const index = levelItems.findIndex((x) => x?.id === levelItemTarget?.id);
    emptyTargetRef.current = index < 0;
    return index;
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  const item = useMemo(() => {
    return levelItemTarget !== null ? getItemComponent(levelItemTarget, currentIndexRef.current) : <View />;
  }, [levelItemTarget]);

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerWidth(width);
        setContainerHeight(height);
      }}
    >
      {item}
      <Text> {Math.floor(initialIndex / COLUMN_NUMBER)}/{initialIndex % COLUMN_NUMBER}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 8,
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
    backgroundColor: "rgba(144, 144, 0, 0.3)",
    borderWidth: 1,
    borderColor: "red",
  },
});

export default LevelItem;
