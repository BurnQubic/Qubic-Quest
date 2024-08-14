import React, { useMemo, useState, useRef } from "react";
import { ImageRequireSource } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { matchListState } from "../../../store/matchList";
import { levelTasksState } from "../../../store/levelTasks";
import DestructibleTile from "./DestructibleTile";
import { TileProps } from "./Tile";
import useTileInteraction from "./hooks/useTileInteraction";

const IceTile = ({ index }: TileProps) => {
  const matchList = useRecoilValue(matchListState);
  const setLevelTasks = useSetRecoilState(levelTasksState);
  const matched = useMemo(() => !!matchList.some((x) => x.index === index && x.matched), [matchList]);

  const tileElementRef = useRef(null);
  useTileInteraction(index, tileElementRef.current);

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
    />
  );
};

export default IceTile;
