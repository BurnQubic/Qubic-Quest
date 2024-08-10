import { StyleSheet, View, ImageBackground } from "react-native";

const ScorePanel = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/candy-tiles/border.png")}
      style={styles.scorePanel}
      imageStyle={styles.borderImage}
    >
      {/* Your content here */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scorePanel: {
    minWidth: 250,
    borderRadius: 8,
    overflow: "hidden", // Ensures the border radius is applied to the background image
  },
  borderImage: {
    resizeMode: "stretch", // or "repeat", depending on your image
  },
});

export default ScorePanel;
