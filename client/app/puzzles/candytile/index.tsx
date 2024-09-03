import React from "react";
import { View, StyleSheet } from "react-native";
import LevelSelector from "./components/level-selector";
// import CandyTiles from "./components/candy-tiles/CandyTiles";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import LevelContainer from "./components/candy-tiles/LevelContainer";
import { Image, ImageBackground } from "expo-image";
import { backgroundImage, SUPER_CANDY_ASSETS } from "./extern";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Header from "./components/header";
// import LevelContextProvider from "./context/LevelContext";

const queryClient = new QueryClient();

const CandyTilePuzzle = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ImageBackground source={backgroundImage} style={styles.image}> */}
      <Header />
      <View style={styles.container}>
        {/* <LevelSelector></LevelSelector> */}
        <LevelContainer />
      </View>
      {/* </ImageBackground> */}
    </QueryClientProvider>
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
