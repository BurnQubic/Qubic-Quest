import Tile from "./Tile";
import { useEffect, useRef, useState } from "react";
import Candy from "./Candy";
import LevelManager from "./level-manager";
import uuid from "react-uuid";
import { StyleSheet, View, PanResponder, GestureResponderEvent } from "react-native";
import { useLevelContext } from "../../../context/LevelContext";
import { levelList } from "../../../data/level-layouts";
import { tilesAreAdjacent } from "../../../utils/tile-matching";

const elementIsTile = (element: any) => element?.props?.["data-tile"];

const LevelGrid = () => {
  const [selectedTiles, setSelectedTiles] = useState<any[]>([]);
  const dragging = useRef<boolean>(false);
  const selectedLevelLayout = levelList[0];
  const levelContext = useLevelContext();
  const firstTile = useRef<any | null>();

  useEffect(() => {
    const initialItems = selectedLevelLayout.items;
    initialItems.forEach((x) => x !== null && (x.key = uuid()));

    const initialTiles = selectedLevelLayout.tiles;

    levelContext?.updateLevelItems(initialItems);
    LevelManager.setItems(initialItems, false);
    LevelManager.setTiles(initialTiles, false);
  }, []);

  useEffect(() => {}, [levelContext?.selectedTiles]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        const target = e.nativeEvent.target as any;
        if (!elementIsTile(target)) return;
        dragging.current = true;
        firstTile.current = target;
      },
      onPanResponderRelease: () => {
        firstTile.current = null;
        dragging.current = false;
      },
      onPanResponderMove: (e: GestureResponderEvent) => {
        if (!firstTile.current || !dragging.current) return;

        const target = e.nativeEvent.target as any;
        if (!elementIsTile(target)) return;

        const firstTileIndex = parseInt(firstTile.current.getAttribute("data-index") || "");
        const secondTileIndex = parseInt(target.getAttribute("data-index") || "");

        if (!tilesAreAdjacent(firstTileIndex, secondTileIndex)) {
          levelContext?.updateSelectedTiles([null, null]);
          return;
        }

        // levelContext?.updateSelectedTiles([firstTileIndex, secondTileIndex]);
        LevelManager.swapItems([firstTileIndex, secondTileIndex]);
        firstTile.current = null;
      },
    })
  ).current;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      borderWidth: 1,
      borderColor: "white",
      flexGrow: 1,
      aspectRatio: 1,
      borderRadius: 8,
      overflow: "hidden",
      pointerEvents: levelContext?.lockInteraction ? "none" : "auto",
    },
    tileGrid: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    overlayGrid: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
    },
  });

  // Passing view size to Candy
  const [pSize, setPSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setPSize({ width, height });
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.tileGrid}>
        {selectedLevelLayout.tiles.map((tile, index) =>
          tile === null ? (
            <View key={index}></View>
          ) : (
            <Tile key={index} selectedTiles={selectedTiles} index={index}></Tile>
          )
        )}
      </View>

      <View style={styles.overlayGrid} onLayout={onLayout}>
        {levelContext?.currentLevelItems.map((item, index) => {
          const id = uuid();
          return selectedLevelLayout.tiles[index] === null ? (
            <View key={index}></View>
          ) : item?.type === "Candy" ? (
            <Candy key={item.key} color={item.color} index={index} id={item?.key || ""} pSize={pSize}></Candy>
          ) : (
            <View key={id}></View>
          );
        })}
      </View>
    </View>
  );
};

export default LevelGrid;
