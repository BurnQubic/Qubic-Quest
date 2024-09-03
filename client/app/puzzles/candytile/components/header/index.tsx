import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useScore from "../../hooks/useScore";
import { scoreState } from "../../store/score";
import { useRecoilValue } from "recoil";
import { levelMovesState } from "../../store/levelMoves";
import { theme } from "../../extern";
import { Background } from "@/app/components/common/Background";

const Header = () => {
  const score = useRecoilValue(scoreState);
  const moves = useRecoilValue(levelMovesState);

  return (
    <Background style={styles.container}>
      <Text style={styles.title}>Candy Tile</Text>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>{score}</Text>
        <Text style={styles.statsText}>{moves.done}/{moves.total}</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 7,
    backgroundColor: theme.colors.secondary60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  statsContainer: {
    flexDirection: "row",
  },
  statsText: {
    fontSize: 16,
    marginLeft: 16,
    color: theme.colors.text,
  },
});

export default Header;
