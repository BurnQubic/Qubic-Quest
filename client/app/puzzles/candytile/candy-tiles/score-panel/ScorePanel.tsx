import { StyleSheet, View } from "react-native";

const ScorePanel = () => {
  return <View style={styles.scorePanel}></View>;
};

const styles = StyleSheet.create({
  scorePanel: {
    minWidth: 250,
    height: "80%",
    backgroundColor: "purple",
    borderRadius: 8,
    borderWidth: 20,
    borderStyle: "solid",
    borderColor: "transparent",
    // borderImageSource: require("src/assets/borders/candy1.png"),
    // borderImageSlice: 50,
    // borderImageRepeat: "round",
  },
});

export default ScorePanel;
