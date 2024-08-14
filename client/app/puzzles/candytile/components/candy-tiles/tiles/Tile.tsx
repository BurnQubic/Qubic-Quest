import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import useTileInteraction from "./hooks/useTileInteraction";

export type TileProps = {
  index: number;
};

const Tile = ({ index }: TileProps) => {
  const tileElementRef = useRef<View | null>(null);
  useTileInteraction(index, tileElementRef.current as any);

  return (
    <View style={styles.tile} data-index={index} data-tile ref={tileElementRef}>
      <Text style={styles.indexText}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    margin: "2%",
    borderRadius: 8,
    overflow: "hidden",
  },
  indexText: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "bold",
    display: "none", // equivalent of hidden in React Native
  },
});

export default Tile;
