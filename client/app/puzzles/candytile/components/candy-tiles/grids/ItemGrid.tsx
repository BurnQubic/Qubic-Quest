import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { COLUMN_NUMBER, ROW_NUMBER, TILE_COUNT } from "../../../config";
import useSelectedLevel from "../../../hooks/useSelectedLevel";
import LevelItem from "../level-item/LevelItem";
import levelTitlesSnapshot from "../../../data/mocks/levelTitlesSnapshot";

export let liveItemsIds: string[] = [];
export const removeLiveItem = (id: string): void => {
  liveItemsIds = liveItemsIds.filter((x) => x !== id);
};

const ItemGrid = () => {
  const selectedLevel = useSelectedLevel();
  // const tilesLayout = useMemo(() => selectedLevel.data?.file.initialTiles || [], [selectedLevel.data]);
  const tilesLayout = levelTitlesSnapshot;

  return (
    <View style={styles.grid}>
      {Array(TILE_COUNT)
        .fill("")
        .map((_, index) => {
          return tilesLayout[index] === null ? (
            <View key={index} style={[styles.emptyTile, { borderWidth: 3 }]} />
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
    bottom: 0,
    right: 0,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyTile: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
  },
});

export default ItemGrid;
