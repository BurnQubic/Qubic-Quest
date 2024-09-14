import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import LevelContainer from "./components/candy-tiles/LevelContainer";
import { ImageBackground } from "expo-image";
import { backgroundImage } from "./extern";
import GameWrapper from "../GameWrapper";
import { scoreState } from "./store/score";
import { levelMovesState } from "./store/levelMoves";

const queryClient = new QueryClient();

const CandyTilePuzzle = () => {
  const score = useRecoilValue(scoreState);
  const moves = useRecoilValue(levelMovesState);

  const startGame = useCallback(() => {}, []);
  const endGame = useCallback(() => {}, []);

  return (
    <GameWrapper score={score} moves={moves} startGame={startGame} endGame={endGame}>
      <QueryClientProvider client={queryClient}>
        <ImageBackground source={backgroundImage} style={styles.image}>
          <View style={styles.container}>
            <LevelContainer />
          </View>
        </ImageBackground>
      </QueryClientProvider>
    </GameWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    objectFit: "contain",
    justifyContent: "center",
  },
});

export default React.memo(CandyTilePuzzle);
