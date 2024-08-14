import { TileProps } from "./Tile";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { LevelTasks } from "../../../types";
import { levelTasksState } from "../../../store/levelTasks";
import { checkForAdjacentMatch } from "../../../game-logic/tile-matching";
import { matchListState } from "../../../store/matchList";
import DestructibleTile from "./DestructibleTile";

const RockTile = ({ index }: TileProps) => {
  const matchList = useRecoilValue(matchListState);
  const setLevelTasks = useSetRecoilState<LevelTasks>(levelTasksState);
  const matched = checkForAdjacentMatch(index, matchList) || matchList.some((x) => x.index === index && x.matched);

  const onDesctructed = () => {
    setLevelTasks((tasks) => ({
      ...tasks,
      rockTiles: tasks.rockTiles + 1,
    }));
  };

  return (
    <DestructibleTile
      tileType="RockTile"
      index={index}
    //   spriteSrc={rockTileSprite}
    //   crackSoundName="rockCrack1"
    //   damagedCrackSoundName="rockCrack2"
      matched={matched}
      onDestructed={onDesctructed}
      className="cursor-not-allowed"
    ></DestructibleTile>
  );
};

export default RockTile;
