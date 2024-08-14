import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, PanResponder, LayoutChangeEvent } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { COLUMN_NUMBER, ROW_NUMBER } from "../../../config";
import { tilesAreAdjacent } from "../../../game-logic/tile-matching";
import IceTile from "../tiles/IceTile";
import Tile from "../tiles/Tile";
import RockTile from "../tiles/RockTiles";
import { finishedMovingState } from "../../../store/finishedMoving";
import { levelTilesState } from "../../../store/levelTiles";
import { swappedItemsState } from "../../../store/swappedItems";
import { levelMovesState } from "../../../store/levelMoves";

const elementIsTile = (element: any) => element?.props?.["data-tile"];

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

const getEmptyTile = (index: number): JSX.Element => <View key={index} style={styles.emptyTile} />;

const TileGrid = () => {
  const levelTiles = useRecoilValue(levelTilesState);
  const dragging = useRef<boolean>(false);
  const firstTile = useRef<number | null>(null);
  const setSwappedItems = useSetRecoilState(swappedItemsState);
  const finishedMoving = useRecoilValue(finishedMovingState);
  const levelMoves = useRecoilValue(levelMovesState);
  //   const playAudio = useAudio();
  const touchedTilesIndeces = useRef<Set<number>>(new Set([]));
  const tileGridRef = useRef<View>(null);
  const [gridLayout, setGridLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  useEffect(() => {
    updateGridInteraction();
  }, [finishedMoving]);

  const updateGridInteraction = () => {
    // Adjusting pointer events based on the game state
    // This would be custom logic depending on your game's behavior
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        const touchedElement = findTouchedTile(gestureState);
        if (touchedElement !== null) {
          dragging.current = true;
          firstTile.current = touchedElement;
          //   playAudio({ audioName: "tileClick" });
        }
      },
      onPanResponderMove: (e, gestureState) => {
        if (!dragging.current || !firstTile.current || !finishedMoving) return;
        const touchedElement = findTouchedTile(gestureState);
        if (touchedElement !== null && tilesAreAdjacent(firstTile.current, touchedElement)) {
          setSwappedItems([firstTile.current, touchedElement]);
          dragging.current = false;
          firstTile.current = null;
        }
      },
      onPanResponderRelease: () => {
        dragging.current = false;
        firstTile.current = null;
      },
    })
  ).current;

  const findTouchedTile = (gestureState: any): number | null => {
    const { moveX, moveY } = gestureState;
    if (gridLayout) {
      const gridX = moveX - gridLayout.x;
      const gridY = moveY - gridLayout.y;
      const columnIndex = Math.floor((gridX / gridLayout.width) * COLUMN_NUMBER);
      const rowIndex = Math.floor((gridY / gridLayout.height) * ROW_NUMBER);
      const index = rowIndex * COLUMN_NUMBER + columnIndex;
      return index;
    }
    return null;
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setGridLayout({ x, y, width, height });
  };

  return (
    <View style={styles.grid} {...panResponder.panHandlers} onLayout={handleLayout} ref={tileGridRef}>
      {levelTiles.map((tile, index) => (tile === null ? getEmptyTile(index) : getTileComponent(tile.type, index)))}
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
    flex: 1,
    aspectRatio: 1,
  },
});

export default TileGrid;
