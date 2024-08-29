import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import CandyTilePuzzle from "@/app/puzzles/candytile";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const GameList: { [key: string]: React.FC } = {
  "candy-crush": CandyTilePuzzle,
  ghost: CandyTilePuzzle,
  numbers: CandyTilePuzzle,
};

export default function PuzzleScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const GameComponent = GameList[id as keyof typeof GameList];

  useFocusEffect(
    useCallback(() => {
      const onBeforeRemove = (e: any) => {
        if (!modalVisible) {
          e.preventDefault();
          setModalVisible(true);
        }
      };

      navigation.addListener("beforeRemove", onBeforeRemove);

      return () => {
        navigation.removeListener("beforeRemove", onBeforeRemove);
      };
    }, [navigation, modalVisible])
  );

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <>
      {GameComponent ? <GameComponent /> : <Text>Game not found</Text>}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={handleCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Are you sure you want to leave the puzzle?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancel}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
