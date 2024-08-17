import React, { useMemo, useState, useRef, useEffect } from "react";
import { ImageRequireSource, StyleSheet } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { matchListState } from "../../../store/matchList";
import { levelTasksState } from "../../../store/levelTasks";
import DestructibleTile from "./DestructibleTile";
import { TileProps } from "./Tile";
import useTileInteraction from "./hooks/useTileInteraction";
import { levelItemsState } from "../../../store/levelItems";

const IceTile = ({ index }: TileProps) => {
  const matchList = useRecoilValue(matchListState);
  const setLevelTasks = useSetRecoilState(levelTasksState);
  const matched = useMemo(() => !!matchList.some((x) => x.index === index && x.matched), [matchList]);

  const tileElementRef = useRef(null);
  // useTileInteraction(index, tileElementRef.current);
  const ALLOWED_ITEM_TYPES = ["Candy", "SuperCandy", "Chocolate"];
  const levelItems = useRecoilValue(levelItemsState);
  const [isAllowedType, setIsAllowedType] = useState(false);

  useEffect(() => {
    validateItemType();
  }, [levelItems]);

  const validateItemType = () => {
    const type = levelItems[index]?.type;
    const allowedType = ALLOWED_ITEM_TYPES.includes(type || "");
    setIsAllowedType(allowedType);
  };

  const onDestructed = () => {
    setLevelTasks((tasks) => ({
      ...tasks,
      iceTiles: tasks.iceTiles + 1,
    }));
  };

  return (
    <DestructibleTile
      ref={tileElementRef}
      tileType="IceTile"
      index={index}
      //   spriteSrc={}
      // crackSoundName="iceCrack1"
      // damagedCrackSoundName="iceCrack2"
      matched={matched}
      onDestructed={onDestructed}
      // style={isAllowedType ? styles.allowed : styles.notAllowed}
    />
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  // allowed: {
  //   backgroundColor: "green",
  // },
  // notAllowed: {
  //   backgroundColor: "red",
  // },
});

export default IceTile;
