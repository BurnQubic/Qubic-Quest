import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import useTileInteraction from "./hooks/useTileInteraction";
import { useRecoilValue } from "recoil";
import { levelItemsState } from "../../../store/levelItems";
import { COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { theme } from "../../../extern";

export type TileProps = {
  index: number;
};

const Tile = ({ index }: TileProps) => {
  const tileElementRef = useRef<View | null>(null);
  useTileInteraction(index, tileElementRef.current as any);
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
      style={[
        styles.tile,
        {
          left: `${(index % COLUMN_NUMBER) * (100 / COLUMN_NUMBER)}%`,
          top: `${Math.floor(index / COLUMN_NUMBER) * (100 / ROW_NUMBER)}%`,
        },
      ]}
      data-index={index}
      data-tile
      ref={tileElementRef}
    ></View>
  );
};

const styles = StyleSheet.create({
  tile: {
    position: "absolute",
    borderRadius: 8,
    overflow: "hidden",
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
    backgroundColor: theme.colors.secondary60,
    opacity: 0.3,
  },
  indexText: {
    position: "relative",
    bottom: 0,
    right: 0,
    fontSize: 12,
    fontWeight: "bold",
  },
  // allowed: {
  //   backgroundColor: "green",
  // },
  // notAllowed: {
  //   backgroundColor: "red",
  // },
});

export default Tile;
