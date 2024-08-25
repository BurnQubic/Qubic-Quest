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
  // const selectedLevel = useSelectedLevel();
  // const tilesLayout = useMemo(() => selectedLevel.data?.file.initialTiles || [], [selectedLevel.data]);
  const tilesLayout = levelTitlesSnapshot;

  return (
    <View style={styles.grid}>
      {Array(TILE_COUNT)
        .fill("")
        .map((_, index) => {
          return tilesLayout[index] === null ? (
            <View key={index} style={[styles.emptyTile]} />
          ) : (
            <LevelItem key={index} initialIndex={index} />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: "relative",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    pointerEvents: "none"
  },
  emptyTile: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
  },
});

export default ItemGrid;
