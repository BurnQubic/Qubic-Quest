import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { View, Image, Text, StyleSheet } from "react-native";
import useScore from "../../../hooks/useScore";
import { matchListState } from "../../../store/matchList";
import { levelTilesState } from "../../../store/levelTiles";

type Props = {
  tileType: string;
  index: number;
  spriteSrc?: string;
  matched: boolean;
  onDestructed?: () => void;
  className?: string;
};

type DestructibleTileRef = View;

const DestructibleTile = (props: Props, ref: ForwardedRef<DestructibleTileRef>) => {
  const [damaged, setDamaged] = useState(false);
  const [destroyed, setDestroyed] = useState(false);
  const matchList = useRecoilValue(matchListState);
  const setLevelTiles = useSetRecoilState(levelTilesState);

  useScore(props.matched && destroyed, props.index, props.tileType);

  const firstRender = useRef(true);

  useEffect(() => {
    if (!firstRender.current) {
      checkMatchInTile();
    }
    firstRender.current = false;
  }, [matchList]);

  useEffect(() => {
    if (destroyed) {
      updateTileList();
    }
  }, [destroyed]);

  const checkMatchInTile = () => {
    if (!props.matched) return;

    if (!damaged) {
      // playAudio({ audioName: props.crackSoundName });
      setDamaged(true);
      return;
    }
    // playAudio({ audioName: props.damagedCrackSoundName });
    props.onDestructed?.();
    setDestroyed(true);
  };

  const updateTileList = () => {
    setLevelTiles((tiles) => {
      const newTiles = [...tiles];
      newTiles[props.index] = { type: "Normal" };
      return newTiles;
    });
  };

  return (
    <View style={[styles.tile]} ref={ref}>
      <Image source={{ uri: props.spriteSrc }} style={[styles.image, { opacity: damaged ? 0.6 : 1 }]} />
      <Text style={styles.indexText}>{props.index}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    margin: "2%",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  indexText: {
    position: "absolute",
    bottom: 0,
    right: 0,
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "bold",
    display: "none", // equivalent to hidden in React Native
  },
});

export default forwardRef<DestructibleTileRef, Props>(DestructibleTile);
