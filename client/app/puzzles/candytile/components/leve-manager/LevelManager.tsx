import { useEffect, useMemo, useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  allTilesFilled,
  checkForMatchings,
  generateNewCandies,
  getMatchGroupCenterIndex,
  levelHasPossibleCombinations,
  repositionItems,
} from "../../game-logic/tile-matching";
import { levelItemsState } from "../../store/levelItems";
import { levelTilesState } from "../../store/levelTiles";
import { swappedItemsState } from "../../store/swappedItems";
import { getLevelItemByFusion } from "../../game-logic/candy-fusion";
import { finishedMovingState } from "../../store/finishedMoving";
import { matchListState } from "../../store/matchList";
import uuid from "react-uuid";
import { levelMovesState } from "../../store/levelMoves";
import { possibleCombinationsState } from "../../store/possibleCombinations";
import { comboCountState } from "./../../store/comboCount";
import { LevelFile, LevelItem, LevelTile, MatchResult, SwappedItems } from "../../types";
import useSelectedLevel from "../../hooks/useSelectedLevel";
import { delay } from "../../utils/utils";
import { ANIMATION_TIME_MS, COMBO_LIMIT } from "../../config";
import levelItemsSnapshot from "../../data/mocks/levelItemsSnapshot";
import levelTitlesSnapshot from "../../data/mocks/levelTitlesSnapshot";
import useAudio from "../../hooks/useAudio";
import _ from "lodash";

const applyMatches = (matchInfo: MatchResult, itemList: LevelItem[]) => {
  let itemsFused = false;
  const matchResult = _.cloneDeep(itemList) as LevelItem[];
  const matchGroupsCenters = matchInfo.matchingGroups.map((group) =>
    getMatchGroupCenterIndex(group, matchInfo.matchingList)
  );
  matchInfo.matchingList
    .filter((x) => x.matched)
    .forEach((y) => {
      const itemIsAtMatchGroupCenter = matchGroupsCenters.includes(y.index);
      if (itemIsAtMatchGroupCenter) {
        const fusedItem = getLevelItemByFusion(y, matchResult[y.index]);
        if (fusedItem !== null) itemsFused = true;
        matchResult[y.index] = getLevelItemByFusion(y, matchResult[y.index]);
        return;
      }

      matchResult[y.index] = null;
    });

  return { matchResult, itemsFused };
};

const validateInitialItems = (initialItems: readonly LevelItem[], initialTiles: readonly LevelTile[]): LevelItem[] => {
  const validatedItems = initialItems.map((item, index) => {
    if (initialTiles[index] === null || item === null) return null;
    !item.id && (item.id = uuid());
    return item;
  });

  return validatedItems;
};

const LevelManager = () => {
  // const selectedLevelQuery = useSelectedLevel();
  const [swappedItems, setSwappedItems] = useRecoilState<SwappedItems>(swappedItemsState);
  const [levelItems, setLevelItems] = useRecoilState(levelItemsState);
  const [levelTiles, setLevelTiles] = useRecoilState(levelTilesState);
  const setLevelMoves = useSetRecoilState(levelMovesState);
  const [finishedMoving, setFinishedMoving] = useRecoilState(finishedMovingState);
  const setMatchList = useSetRecoilState(matchListState);
  const setPossibleCombinations = useSetRecoilState(possibleCombinationsState);
  const [comboCount, setComboCount] = useRecoilState(comboCountState);
  // const selectedLevel = useMemo(() => selectedLevelQuery.data?.file, [selectedLevelQuery.data]) as LevelFile;
  const playAudio = useAudio();

  const itemsWereSwapped = useRef(false);

  useEffect(() => {
    setupLevel();
  }, []);

  useEffect(() => swapItems(false), [swappedItems]);

  useEffect(() => {
    finishedMoving && checkForPossibleCombinations();
  }, [finishedMoving]);

  const setupLevel = () => {
    // const initialItems = validateInitialItems(selectedLevel.initialItems, selectedLevel.initialTiles);
    // setLevelTiles(selectedLevel.initialTiles);
    // setLevelItems(initialItems);
    setLevelItems(levelItemsSnapshot);
    setLevelTiles(levelTitlesSnapshot);
    // setLevelMoves({ done: 0, total: selectedLevel.maximumMoves, spentAllMoves: false });
    setLevelMoves({ done: 0, total: 5, spentAllMoves: false });
  };

  const swapItems = (undo: boolean) => {
    if (swappedItems.some((x) => x === null)) return;
    itemsWereSwapped.current = true;

    const firstIndex = swappedItems[0] ?? -1;
    const secondIndex = swappedItems[1] ?? -1;

    const firstItem = _.cloneDeep(levelItems[firstIndex]) as LevelItem;
    const secondItem = _.cloneDeep(levelItems[secondIndex]) as LevelItem;

    const newLevelItems = _.cloneDeep(levelItems) as LevelItem[];
    newLevelItems[firstIndex] = undo ? firstItem : secondItem;
    newLevelItems[secondIndex] = undo ? secondItem : firstItem;

    if (undo) {
      setTimeout(() => {
        setSwappedItems([null, null]);
        itemsWereSwapped.current = false;
        setLevelItems(newLevelItems);
      }, ANIMATION_TIME_MS);
      return;
    }

    setFinishedMoving(false);
    setLevelItems(newLevelItems);
    setTimeout(() => checkForMatches(newLevelItems, true, comboCount), ANIMATION_TIME_MS);
  };

  const checkForMatches = async (itemList: LevelItem[], checkSwap: boolean, combo: number): Promise<void> => {
    const matchInfo = checkForMatchings(itemList, levelTiles, itemsWereSwapped.current ? swappedItems : undefined);

    if (matchInfo.thereWereMatches || !allTilesFilled(itemList, levelTiles)) {
      itemsWereSwapped.current &&
        setLevelMoves((moves) => ({
          done: moves.done + 1,
          total: moves.total,
          spentAllMoves: moves.done + 1 >= moves.total,
        }));
      setSwappedItems([null, null]);
      itemsWereSwapped.current = false;

      playAudio({ audioName: "match", speed: 1 + (combo + 1) / 10 });
      setComboCount((combo) => (combo < COMBO_LIMIT ? combo + 1 : combo));
      const { matchResult, itemsFused } = applyMatches(matchInfo, itemList);
      itemsFused && playAudio({ audioName: "fusionMatch" });

      setLevelItems(matchResult);
      setMatchList(matchInfo.matchingList);

      await delay(ANIMATION_TIME_MS);
      const repositionResult = repositionItems(matchResult, levelTiles);
      const fillResult = generateNewCandies(repositionResult, levelTiles);
      setLevelItems(fillResult);
      await delay(ANIMATION_TIME_MS);
      checkForMatches(fillResult, false, combo + 1);
      return;
    }

    const thereAreSwappedItems = swappedItems.every((x) => x !== null);
    thereAreSwappedItems && checkSwap && swapItems(true);

    setComboCount(0);
    setTimeout(() => {
      setFinishedMoving(true);
    }, ANIMATION_TIME_MS);
  };

  const checkForPossibleCombinations = () => {
    const possibleCombinations = levelHasPossibleCombinations(levelItems, levelTiles);
    setPossibleCombinations(possibleCombinations);
  };

  return <></>;
};

export default LevelManager;
