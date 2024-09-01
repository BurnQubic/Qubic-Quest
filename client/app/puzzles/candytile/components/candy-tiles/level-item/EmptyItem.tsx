import { View, Text, StyleSheet } from "react-native";
import { COLUMN_NUMBER, ROW_NUMBER, TILE_COUNT } from "../../../config";

const EmptyItem = ({ index }: { index: number }) => {
  const rowIndex = Math.floor(index / COLUMN_NUMBER);
  const columnIndex = index % COLUMN_NUMBER;

  return (
    <View
      key={index}
      style={[
        styles.emptyItem,
        { left: `${(columnIndex / COLUMN_NUMBER) * 100}%`, top: `${(rowIndex / ROW_NUMBER) * 100}%` },
      ]}
    ></View>
  );
};

const styles = StyleSheet.create({
  emptyItem: {
    position: "absolute",
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
  },
});

export default EmptyItem;
