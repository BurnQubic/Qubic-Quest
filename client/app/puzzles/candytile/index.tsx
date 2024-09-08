import React from "react";
import { View, StyleSheet } from "react-native";
import LevelSelector from "./components/level-selector";
// import CandyTiles from "./components/candy-tiles/CandyTiles";
import { RecoilRoot, useRecoilValue } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import LevelContainer from "./components/candy-tiles/LevelContainer";
import { Image, ImageBackground } from "expo-image";
import { backgroundImage, SUPER_CANDY_ASSETS } from "./extern";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import GameWrapper from "../GameWrapper";
import { scoreState } from "./store/score";
import { levelMovesState } from "./store/levelMoves";
// import LevelContextProvider from "./context/LevelContext";

const queryClient = new QueryClient();

const CandyTilePuzzle = () => {
  const score = useRecoilValue(scoreState);
  const moves = useRecoilValue(levelMovesState);

  return (
    <GameWrapper score={score} moves={moves} startGame={() => {}} endGame={() => {}}>
      <QueryClientProvider client={queryClient}>
        <ImageBackground source={backgroundImage} style={styles.image}>
          <View style={styles.container}>
            {/* <LevelSelector></LevelSelector> */}
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

export default CandyTilePuzzle;
