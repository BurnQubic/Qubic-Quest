import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Candy from "./Candy";
import Chocolate from "./Chocolate";
import SuperCandy from "./SuperCandy";
import { liveItemsIds, removeLiveItem } from "../grids/ItemGrid";
import IceCream from "./IceCream";
import { LevelItem as LevelItemType } from "../../../types";
import { Animated, View, StyleSheet, Dimensions } from "react-native";
import { getItemColumnIndex, getItemRowIndex } from "../../../game-logic/tile-matching";
import { ANIMATION_TIME_MS, COLUMN_NUMBER } from "../../../config";
import { levelItemsState } from "../../../store/levelItems";

const { width: screenWidth } = Dimensions.get("window");

type ItemPosition = {
  x: number;
  y: number;
};

type LevelItemProps = {
  initialIndex: number;
};

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
      return <View />;
  }
};

const setPosition = (element: Animated.ValueXY, index: number): void => {
  element.setValue({
    x: 100 * (getItemColumnIndex(index) - 1),
    y: 100 * (getItemRowIndex(index) - 1),
  });
};

const animatePosition = (element: Animated.ValueXY, position: ItemPosition): void => {
  Animated.timing(element, {
    toValue: position,
    duration: ANIMATION_TIME_MS,
    // easing: Animated.Easing.out(Animated.Easing.back(1)),
    useNativeDriver: true,
  }).start();
};

const LevelItem = ({ initialIndex }: LevelItemProps) => {
  const levelItems = useRecoilValue(levelItemsState);
  const [levelItemTarget, setLevelItemTarget] = useState<LevelItemType | null>(levelItems[initialIndex]);

  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const rowIndexRef = useRef<number>(0);
  const columnIndexRef = useRef<number>(0);
  const positionRef = useRef<ItemPosition>({ x: 0, y: 0 });
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
      setPosition(position, getItemIndex());
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

    positionRef.current.x = 100 * (columnIndexRef.current - 1);
    positionRef.current.y = 100 * (rowIndexRef.current - 1);
  };

  const updatePosition = () => {
    updateGridPosition();
    if (!emptyTargetRef.current) {
      animatePosition(position, positionRef.current);
    }
  };

  const getItemIndex = (): number => {
    const index = levelItems.findIndex((x) => x?.id === levelItemTarget?.id);
    emptyTargetRef.current = index < 0;
    return index;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: position.x }, { translateY: position.y }],
        },
      ]}
    >
      {levelItemTarget !== null ? getItemComponent(levelItemTarget, currentIndexRef.current) : <View />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    aspectRatio: 1,
    padding: "1.7%",
    width: screenWidth / COLUMN_NUMBER,
  },
});

export default LevelItem;
