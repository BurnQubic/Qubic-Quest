import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { COLUMN_NUMBER, ROW_NUMBER, TILE_COUNT } from "../../../config";
import useSelectedLevel from "../../../hooks/useSelectedLevel";
import LevelItem from "../level-item/LevelItem";

export let liveItemsIds: string[] = [];
export const removeLiveItem = (id: string): void => {
  liveItemsIds = liveItemsIds.filter((x) => x !== id);
};

const ItemGrid = () => {
  const selectedLevel = useSelectedLevel();
  const tilesLayout = useMemo(() => selectedLevel.data?.file.initialTiles || [], [selectedLevel.data]);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const tileWidth = screenWidth / COLUMN_NUMBER;
  const tileHeight = screenHeight / ROW_NUMBER;

  return (
    <View style={styles.grid} pointerEvents="none">
      {Array(TILE_COUNT)
        .fill("")
        .map((_, index) => {
          return tilesLayout[index] === null ? (
            <View key={index} style={[styles.emptyTile, { width: tileWidth, height: tileHeight }]} />
          ) : (
            <LevelItem key={index} initialIndex={index} />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyTile: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 8,
    margin: "2%",
  },
});

export default ItemGrid;
