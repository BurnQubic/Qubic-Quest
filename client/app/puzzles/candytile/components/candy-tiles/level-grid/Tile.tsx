import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

type TileProps = {
  selectedTiles: HTMLElement[];
  index: number;
};

const Tile = ({ selectedTiles, index }: TileProps) => {
  const [selected, setSelected] = useState<boolean>(false);
  const tileElementRef = useRef<View | null>(null);
  const itemElementRef = useRef<View | null>(null);

  return (
    <View style={styles.tileContainer} ref={tileElementRef} data-index={index} data-tile>
      <View style={{ position: "absolute", bottom: 0, right: 0, fontSize: 12, color: "white", fontWeight: "bold" }}>
        {index}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    position: "relative",
    borderWidth: 1,
    borderColor: "purple",
    userSelect: "none",
    backgroundColor: "#0983ed50",
  },
});

export default Tile;
