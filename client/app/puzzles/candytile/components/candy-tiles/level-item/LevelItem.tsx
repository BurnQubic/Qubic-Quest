import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Candy from "./Candy";
import Chocolate from "./Chocolate";
import SuperCandy from "./SuperCandy";
import { liveItemsIds, removeLiveItem } from "../grids/ItemGrid";
import IceCream from "./IceCream";
import { LevelItem as LevelItemType } from "../../../types";
import { View, StyleSheet, Pressable } from "react-native";
import { getItemColumnIndex, getItemRowIndex } from "../../../game-logic/tile-matching";
import { ANIMATION_TIME_MS, COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { levelItemsState } from "../../../store/levelItems";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

const setPosition = (x: Animated.SharedValue<number>, y: Animated.SharedValue<number>, index: number): void => {
  x.value = (100 / COLUMN_NUMBER) * (getItemColumnIndex(index) - 1);
  y.value = (100 / ROW_NUMBER) * (getItemRowIndex(index) - 1);
};

const LevelItem = ({ initialIndex }: { initialIndex: number }) => {
  const levelItems = useRecoilValue(levelItemsState);
  const [levelItemTarget, setLevelItemTarget] = useState<LevelItemType | null>(levelItems[initialIndex]);

  const scale = useSharedValue(1); // Shared value for scaling

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
    if (levelItemTarget) {
      setPosition(translateX, translateY, getItemIndex());
    }
  }, [levelItemTarget]);

  const spawnItem = () => {
    removeLiveItem(levelItemTarget?.id || "");
    const newTarget = levelItems
      .filter((x) => typeof x?.id === "string")
      .find((y) => !liveItemsIds.includes(y?.id || ""));
    const newTargetIsValid = newTarget !== undefined && typeof newTarget?.id === "string";

    if (!newTargetIsValid) return;

    liveItemsIds.push(newTarget?.id || "");
    currentIndexRef.current = levelItems.findIndex((x) => x?.id === newTarget.id);
    setLevelItemTarget(newTarget);
    emptyTargetRef.current = false;
  };

  const updateGridPosition = (): void => {
    const gridIndex = getItemIndex();

    rowIndexRef.current = getItemRowIndex(emptyTargetRef.current ? initialIndex : gridIndex);
    columnIndexRef.current = getItemColumnIndex(emptyTargetRef.current ? initialIndex : gridIndex);

    translateX.value = 100 * (columnIndexRef.current - 1);
    translateY.value = 100 * (rowIndexRef.current - 1);
  };

  const updatePosition = () => {
    updateGridPosition();
    if (!emptyTargetRef.current) {
      translateX.value = withTiming(translateX.value, { duration: ANIMATION_TIME_MS });
      translateY.value = withTiming(translateY.value, { duration: ANIMATION_TIME_MS });
    }
  };

  const getItemIndex = (): number => {
    const index = levelItems.findIndex((x) => x?.id === levelItemTarget?.id);
    emptyTargetRef.current = index < 0;
    return index;
  };

  const handlePressIn = () => {
    scale.value = withTiming(1.2, { duration: 200 }); // Increase size to 120%
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 }); // Return to original size
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {levelItemTarget !== null ? getItemComponent(levelItemTarget, currentIndexRef.current) : <View />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 8,
    // overflow: "hidden",
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
  },
});

export default LevelItem;
