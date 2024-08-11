import { StyleSheet, View, ImageBackground, Image, type ImageSourcePropType } from "react-native";
import { borderImage } from "../../../extern";

const ScorePanel = () => {
  return (
    <Image source={borderImage as ImageSourcePropType} style={styles.scorePanel} imageStyle={styles.borderImage}>
      {/* Your content here */}
    </Image>
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
