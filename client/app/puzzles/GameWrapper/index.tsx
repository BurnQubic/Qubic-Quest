import React from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/app/components/common/ThemedText";
import { ButtonWrapper } from "@/app/components/common/ButtonWrapper";
import { theme } from "@/config/theme";
import Header from "./Header";

interface GameWrapperProps {
  score: number;
  moves: { done: number; total: number; spentAllMoves: boolean };
  startGame?: () => void;
  endGame?: () => void;
  children: React.ReactNode;
}

const GameWrapper: React.FC<GameWrapperProps> = ({ score, moves, startGame, endGame, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.gameArea}>{children}</View>
      <Header score={score} moves={moves} startGame={startGame} endGame={endGame}></Header>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: theme.colors.secondary90,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  gameArea: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: theme.colors.secondary90,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.colors.text,
    fontWeight: "bold",
  },
});

export default GameWrapper;
