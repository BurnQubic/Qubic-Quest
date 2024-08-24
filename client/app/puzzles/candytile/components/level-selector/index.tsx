import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const LevelSelector = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => setVisible(!visible);

  const arrowStyle = visible ? styles.arrowOpen : styles.arrowClosed; // Implement styles correctly

  return (
    <View style={[styles.container, { width: visible ? 300 : 34 }]}>
      <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
        <Text style={arrowStyle}>{visible ? "⬅️" : "➡️"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: "auto",
    overflow: "hidden",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    fontFamily: "Raleway",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    fontSize: 16,
    fontWeight: "bold",
    height: "100%",
    minWidth: 34,
    marginLeft: "auto",
    padding: 5,
  },
  arrowOpen: {
    color: "purple",
    transform: "rotate(180deg)",
  },
  arrowClosed: {
    color: "purple",
    transform: "rotate(0deg)",
  },
});

export default LevelSelector;
