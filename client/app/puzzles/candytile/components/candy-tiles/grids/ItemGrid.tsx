import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { COLUMN_NUMBER, ROW_NUMBER, TILE_COUNT } from "../../../config";
import useSelectedLevel from "../../../hooks/useSelectedLevel";
import LevelItem from "../level-item/LevelItem";
import levelTitlesSnapshot from "../../../data/mocks/levelTitlesSnapshot";
import EmptyItem from "../level-item/EmptyItem";

export let liveItemsIds: string[] = [];
export const removeLiveItem = (id: string): void => {
  liveItemsIds = liveItemsIds.filter((x) => x !== id);
};

const ItemGrid = () => {
  // const selectedLevel = useSelectedLevel();
  // const tilesLayout = useMemo(() => selectedLevel.data?.file.initialTiles || [], [selectedLevel.data]);
  const tilesLayout = levelTitlesSnapshot;
  console.log("ItemGrid RENDERING...");

  return (
    <View style={styles.grid}>
      {Array(TILE_COUNT)
        .fill("")
        .map((_, index) => {
          return tilesLayout[index] === null ? (
            <EmptyItem key={index} index={index} />
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
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    pointerEvents: "none"
  }
});

export default ItemGrid;
