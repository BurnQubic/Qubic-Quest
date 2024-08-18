import { selector } from "recoil";
import { finishedMovingState } from "../store/finishedMoving";
import { levelMovesState } from "../store/levelMoves";
import { levelTasksState } from "../store/levelTasks";
import { levelScorePercentageState } from "./levelScorePercentage";
import { possibleCombinationsState } from "../store/possibleCombinations";
import { SCORE_RATING } from "../config";
import { selectedLevelState } from "./selectedLevel";

export const levelCompleteState = selector<boolean>({
  key: "levelComplete",
  get: ({ get }) => {
    const levelData = get(selectedLevelState);
    if (!levelData) return false;

    const finishedMoving = get(finishedMovingState) ?? false;
    const possibleCombinations = get(possibleCombinationsState) ?? true;
    const levelMoves = get(levelMovesState) ?? { spentAllMoves: false };
    const targetTasks = levelData?.file?.tasks ?? {};
    const tasks = get(levelTasksState) ?? {};
    const scorePercentage = get(levelScorePercentageState) ?? 0;

    const minimumScore = scorePercentage >= SCORE_RATING.oneStar;
    const allTasksComplete = Object.keys(targetTasks).every(
      (x) => targetTasks[x] <= (tasks[x] ?? 0)
    );

    return (
      minimumScore &&
      allTasksComplete &&
      finishedMoving &&
      (levelMoves.spentAllMoves || !possibleCombinations)
    );
  },
});
