import { View, Text, StyleSheet, Modal } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { theme } from "@/config/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";

interface HeaderProps {
  score: number;
  moves: { done: number; total: number; spentAllMoves: boolean };
  startGame: () => void;
  endGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ score, moves, startGame, endGame }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"exit" | "restart" | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (confirmModalVisible) {
      setModalVisible(false);
    }
  }, [confirmModalVisible]);

  const handleExitGame = () => {
    setConfirmAction("exit");
    setConfirmModalVisible(true);
  };

  const handleRestartGame = () => {
    setConfirmAction("restart");
    setConfirmModalVisible(true);
  };

  const handleHowToPlay = () => {
    // Implement how to play logic here
    setModalVisible(false);
  };

  const confirmExit = () => {
    navigation.goBack();
    setModalVisible(false);
    setConfirmModalVisible(false);
    endGame();
  };

  const confirmRestart = () => {
    startGame();
    setModalVisible(false);
    setConfirmModalVisible(false);
  };

  const handleCancelConfirm = () => {
    setConfirmModalVisible(false);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <RectButton style={styles.button} onPress={() => setModalVisible(true)}>
        <Ionicons size={20} name="settings-outline" style={styles.icon} />
      </RectButton>
      <View style={styles.statsContainer}>
        <View style={[styles.moveProgress, { width: `${Math.min(moves.done / moves.total, 1) * 100}%` }]}></View>
        <View style={styles.statsTextContainer}>
          <Text style={styles.statsText}>
            {score}
          </Text>
        </View>
      </View>
      <RectButton style={styles.button} onPress={handleHowToPlay}>
        <Ionicons size={20} name="help-outline" style={styles.icon} />
      </RectButton>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <RectButton style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="play" size={24} color={theme.colors.text} style={styles.modalButtonIcon} />
              <Text style={styles.modalButtonText}>Continue</Text>
            </RectButton>
            <RectButton style={styles.modalButton} onPress={handleRestartGame}>
              <Ionicons name="refresh" size={24} color={theme.colors.text} style={styles.modalButtonIcon} />
              <Text style={styles.modalButtonText}>Restart Game</Text>
            </RectButton>
            <RectButton style={styles.modalButton} onPress={handleHowToPlay}>
              <Ionicons name="help-circle" size={24} color={theme.colors.text} style={styles.modalButtonIcon} />
              <Text style={styles.modalButtonText}>How to Play</Text>
            </RectButton>
            <RectButton style={styles.modalButton} onPress={handleExitGame}>
              <Ionicons name="exit" size={24} color={theme.colors.text} style={styles.modalButtonIcon} />
              <Text style={styles.modalButtonText}>Exit Game</Text>
            </RectButton>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmModalVisible}
        onRequestClose={handleCancelConfirm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.confirmText}>
              {confirmAction === "exit"
                ? "Are you sure you want to exit the game?"
                : "Are you sure you want to restart the game?"}
            </Text>
            <View style={styles.confirmButtonContainer}>
              <RectButton style={styles.confirmButton} onPress={handleCancelConfirm}>
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </RectButton>
              <RectButton
                style={[styles.confirmButton, styles.confirmYesButton]}
                onPress={confirmAction === "exit" ? confirmExit : confirmRestart}
              >
                <Text style={styles.confirmButtonText}>Yes</Text>
              </RectButton>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 7,
  },
  statsContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 100,
    color: theme.colors.text,
    backgroundColor: theme.colors.secondary30,
    position: "relative",
  },
  moveProgress: {
    fontSize: 16,
    padding: 14,
    borderRadius: 100,
    backgroundColor: theme.colors.secondary60,
  },
  statsTextContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  statsText: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: "600",
  },
  icon: {
    color: theme.colors.text,
    padding: 2,
  },
  button: {
    padding: 2,
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    flexDirection: "row",
    alignItems: "center",
  },
  modalButtonIcon: {
    marginRight: 10,
  },
  modalButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmText: {
    fontSize: 18,
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: theme.colors.secondary60,
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  confirmYesButton: {
    backgroundColor: theme.colors.primary,
  },
  confirmButtonText: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Header;
