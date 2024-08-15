import React from "react";
import { View, StyleSheet } from "react-native";
import LevelSelector from "./components/level-selector";
import CandyTiles from "./components/candy-tiles/CandyTiles";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
// import LevelContextProvider from "./context/LevelContext";

const queryClient = new QueryClient();

const CandyTilePuzzle = () => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <View style={styles.container}>
          {/* <LevelSelector></LevelSelector> */}
          <CandyTiles></CandyTiles>
        </View>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
});

export default CandyTilePuzzle;
