import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, LayoutChangeEvent } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const getTileComponent = (tileType: string, index: number): JSX.Element => {
  const tileComponents = {
    Normal: <Tile key={index} index={index} />,
    Ice: <IceTile key={index} index={index} />,
    Rock: <RockTile key={index} index={index} />,
  };
  return tileComponents[tileType] || <Tile key={index} index={index} />;
};

const TileGrid = () => {
  const levelTiles = useRecoilValue(levelTilesState);
  const levelItems = useRecoilValue(levelItemsState);
  const dragging = useRef<boolean>(false);
  const firstTile = useRef<number | null>(20);
  const setSwappedItems = useSetRecoilState(swappedItemsState);
  const finishedMoving = useRecoilValue(finishedMovingState);
  const [gridLayout, setGridLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  console.log("TileGrid RENDERING...");

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setGridLayout({ x, y, width, height });
  }, []);

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      firstTile.current++;
      if (!gridLayout) return;
      const gridX = e.x - gridLayout.x;
      const gridY = e.y - gridLayout.y;
      const columnIndex = Math.floor((gridX / gridLayout.width) * COLUMN_NUMBER);
      const rowIndex = Math.floor((gridY / gridLayout.height) * ROW_NUMBER);
      const touchedElement = rowIndex * COLUMN_NUMBER + columnIndex;
      if (touchedElement !== null) {
        dragging.current = true;
        firstTile.current = touchedElement;
      }
    })
    .onUpdate((e) => {
      if (!dragging.current || firstTile.current === null || !finishedMoving) return;
      if (!gridLayout) return;
      const gridX = e.x - gridLayout.x;
      const gridY = e.y - gridLayout.y;
      const columnIndex = Math.floor((gridX / gridLayout.width) * COLUMN_NUMBER);
      const rowIndex = Math.floor((gridY / gridLayout.height) * ROW_NUMBER);
      const touchedElement = rowIndex * COLUMN_NUMBER + columnIndex;
      if (
        touchedElement !== null &&
        levelItems[touchedElement] !== null &&
        tilesAreAdjacent(firstTile.current, touchedElement)
      ) {
        setSwappedItems([firstTile.current, touchedElement]);
        dragging.current = false;
        firstTile.current = null;
      }
      setSwappedItems([firstTile.current, firstTile.current+1]);
    })
    .onEnd(() => {
      dragging.current = false;
      firstTile.current = null;
    });

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
