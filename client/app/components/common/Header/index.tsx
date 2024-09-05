import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Avatar } from "../Avatar";
import { ScoreBox } from "../ScoreBox"; // Import ScoreBox component
import { theme } from "@/config/theme";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Avatar />
      </View>
      <View style={styles.rightContainer}>
        <ScoreBox type="level" label="Level 5" icon="star" />
        <ScoreBox type="coins" label="50" icon="cash" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    backgroundColor: "transparent",
    zIndex: 1000,
  },
  leftContainer: {
    position: "absolute",
    left: 4,
    top: 4,
    width: 42,
    height: 42,
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default Header;
