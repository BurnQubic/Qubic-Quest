import { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

type TileProps = {
  selectedTiles: any[];
  index: number;
};

const Tile = ({ selectedTiles, index }: TileProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const tileElementRef = useRef<View | null>(null);
  const itemElementRef = useRef<View | null>(null);

  return (
    <View
      style={[styles.tileContainer, selected && styles.selectedTile]}
      ref={tileElementRef}
      data-index={index.toString()}
      data-tile
    >
      <Text style={styles.tileText}>{index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    width: "11.125%",
    height: "11.125%",
    position: "relative",
    backgroundColor: "rgba(9, 131, 237, 0.5)",
    borderWidth: 1,
    borderColor: "purple",
  },
  selectedTile: {
    backgroundColor: "rgba(255, 255, 204, 0.5)",
  },
  tileText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Tile;
