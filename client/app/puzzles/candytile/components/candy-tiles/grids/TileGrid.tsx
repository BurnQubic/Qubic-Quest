import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent, SectionList } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { tilesAreAdjacent } from "../../../game-logic/tile-matching";
import IceTile from "../tiles/IceTile";
import Tile from "../tiles/Tile";
import RockTile from "../tiles/RockTiles";
import { finishedMovingState } from "../../../store/finishedMoving";
import { levelTilesState } from "../../../store/levelTiles";
import { swappedItemsState } from "../../../store/swappedItems";
import { levelItemsState } from "../../../store/levelItems";
import EmptyTile from "../tiles/EmptyTile";

const getTileComponent = (tileType: string, index: number): JSX.Element => {
  switch (tileType) {
    case "Normal":
      return <Tile key={index} index={index} />;
    case "Ice":
      return <IceTile key={index} index={index} />;
    case "Rock":
      return <RockTile key={index} index={index} />;
    default:
      return <Tile key={index} index={index} />;
  }
};

const TileGrid = () => {
  const levelTiles = useRecoilValue(levelTilesState);
  const levelItems = useRecoilValue(levelItemsState);
  const dragging = useRef<boolean>(false);
  const firstTile = useRef<number | null>(null);
  const setSwappedItems = useSetRecoilState(swappedItemsState);
  const finishedMoving = useRecoilValue(finishedMovingState);
  const [gridLayout, setGridLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const findTouchedTile = (touchX: number, touchY: number): number | null => {
    if (!gridLayout) return null; // Add null check
    const gridX = touchX - gridLayout.x;
    const gridY = touchY - gridLayout.y;
    const columnIndex = Math.floor((gridX / gridLayout.width) * COLUMN_NUMBER);
    const rowIndex = Math.floor((gridY / gridLayout.height) * ROW_NUMBER);
    const index = rowIndex * COLUMN_NUMBER + columnIndex;
    return index;
  };

  const gesture = Gesture.Pan()
    .onBegin((e) => {
      const touchedElement = findTouchedTile(e.x, e.y);
      if (touchedElement !== null) {
        dragging.current = true;
        firstTile.current = touchedElement;
      }
    })
    .onUpdate((e) => {
      if (!dragging.current || !firstTile.current || !finishedMoving) return;
      const touchedElement = findTouchedTile(e.x, e.y);
      if (levelItems[touchedElement] !== null && tilesAreAdjacent(firstTile.current, touchedElement)) {
        setSwappedItems([firstTile.current, touchedElement]);
        dragging.current = false;
        firstTile.current = null;
      }
    })
    .onEnd(() => {
      dragging.current = false;
      firstTile.current = null;
    });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setGridLayout({ x, y, width, height });
  };

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.grid} onLayout={handleLayout}>
        {levelTiles.map((tile, index) =>
          tile === null ? <EmptyTile key={index} index={index} /> : getTileComponent(tile.type, index)
        )}
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  grid: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default TileGrid;
