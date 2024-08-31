import { View, Text, StyleSheet } from "react-native";
import { COLUMN_NUMBER, ROW_NUMBER } from "../../../config";

const EmptyTile = ({ index }: { index: number }) => {
  const rowIndex = Math.floor(index / COLUMN_NUMBER);
  const columnIndex = index % COLUMN_NUMBER;
  console.log("EmptyTile", rowIndex, columnIndex);
  return (
    <View
      style={[
        styles.emptyTile,
        { left: `${(columnIndex / COLUMN_NUMBER) * 100}%`, top: `${(rowIndex / ROW_NUMBER) * 100}%` },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  emptyTile: {
    position: "absolute",
    backgroundColor: "rgba(1, 1, 1, 1)",
    borderRadius: 3,
    width: `${100 / COLUMN_NUMBER}%`,
    height: `${100 / ROW_NUMBER}%`,
    aspectRatio: 1,
  },
});

export default EmptyTile;