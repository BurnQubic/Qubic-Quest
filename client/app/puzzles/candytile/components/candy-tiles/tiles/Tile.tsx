import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import useTileInteraction from "./hooks/useTileInteraction";
import { useRecoilValue } from "recoil";
import { levelItemsState } from "../../../store/levelItems";
import { COLUMN_NUMBER } from "../../../config";

const { width: screenWidth } = Dimensions.get("window");

export type TileProps = {
  index: number;
};

const Tile = ({ index }: TileProps) => {
  const tileElementRef = useRef<View | null>(null);
  // useTileInteraction(index, tileElementRef.current as any);
  const ALLOWED_ITEM_TYPES = ["Candy", "SuperCandy", "Chocolate"];
  const levelItems = useRecoilValue(levelItemsState);
  const [isAllowedType, setIsAllowedType] = useState(false);

  useEffect(() => {
    validateItemType();
  }, [levelItems]);

  const validateItemType = () => {
    const type = levelItems[index]?.type;
    const allowedType = ALLOWED_ITEM_TYPES.includes(type || "");
    setIsAllowedType(allowedType);
  };

  return (
    <View
      style={[styles.tile, isAllowedType ? styles.allowed : styles.notAllowed]}
      data-index={index}
      data-tile
      ref={tileElementRef}
    >
      <Text style={styles.indexText}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    margin: "2%",
    borderRadius: 8,
    overflow: "hidden",
    padding: "1.7%",
    width: screenWidth / COLUMN_NUMBER,
  },
  indexText: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "bold",
    display: "none",
  },
  allowed: {
    backgroundColor: "green",
  },
  notAllowed: {
    backgroundColor: "red",
  },
});

export default Tile;
