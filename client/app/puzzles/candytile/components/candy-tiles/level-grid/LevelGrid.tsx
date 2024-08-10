import Tile from "./Tile";
import { useEffect, useRef, useState } from "react";
import Candy from "./Candy";
import LevelManager from "./level-manager";
import uuid from "react-uuid";
import { StyleSheet, View } from "react-native";
import { useLevelContext } from "../../../context/LevelContext";
import { levelList } from "../../../data/level-layouts";
import { tilesAreAdjacent } from "../../../utils/tile-matching";

const elementIsTile = (element: HTMLElement) => element.hasAttribute("data-tile");

const LevelGrid = () => {
  const [selectedTiles, setSelectedTiles] = useState<HTMLElement[]>([]);
  const dragging = useRef<boolean>(false);
  const selectedLevelLayout = levelList[0];
  const levelContext = useLevelContext();
  const firstTile = useRef<HTMLElement | null>();

  useEffect(() => {
    const initialItems = selectedLevelLayout.items;
    initialItems.forEach((x) => x !== null && (x.key = uuid()));

    const initialTiles = selectedLevelLayout.tiles;

    levelContext?.updateLevelItems(initialItems);
    LevelManager.setItems(initialItems, false);
    LevelManager.setTiles(initialTiles, false);
  }, []);

  useEffect(() => {}, [levelContext?.selectedTiles]);

  const handleMouseDown = (e: React.MouseEvent): void => {
    if (!elementIsTile(e.target as HTMLElement)) return;
    dragging.current = true;
    firstTile.current = e.target as HTMLElement;
  };

  const handleMouseUp = (e: React.MouseEvent): void => {
    firstTile.current = null;
    dragging.current = false;
  };

  const handleMouseOver = (e: React.MouseEvent): void => {
    if (!elementIsTile(e.target as HTMLElement) || !firstTile.current || !dragging.current) return;

    const firstTileIndex = parseInt(firstTile.current.getAttribute("data-index") || "");
    const secondTileIndex = parseInt((e.target as HTMLElement).getAttribute("data-index") || "");

    if (!tilesAreAdjacent(firstTileIndex, secondTileIndex)) {
      levelContext?.updateSelectedTiles([null, null]);
      return;
    }

    //levelContext?.updateSelectedTiles([firstTileIndex, secondTileIndex]);
    LevelManager.swapItems([firstTileIndex, secondTileIndex]);
    firstTile.current = null;
  };

  const styles = StyleSheet.create({
    container: {
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
      flexDirection: "row", // Use flexDirection for layout
      flexWrap: "wrap", // Allow wrapping of tiles
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={styles.tileGrid}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseOver={handleMouseOver}
      >
        {selectedLevelLayout.tiles.map((tile, index) =>
          tile === null ? (
            <View key={index}></View>
          ) : (
            <Tile key={index} selectedTiles={selectedTiles} index={index}></Tile>
          )
        )}
      </View>

      <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        {levelContext?.currentLevelItems.map((item, index) => {
          const id = uuid();
          return selectedLevelLayout.tiles[index] === null ? (
            <View key={index}></View>
          ) : (item as Candy)?.type === "Candy" ? (
            <Candy key={(item as Candy).key} color={(item as Candy).color} index={index} id={item?.key || ""}></Candy>
          ) : (
            <View key={id}></View>
          );
        })}
      </View>
    </View>
  );
};

export default LevelGrid;