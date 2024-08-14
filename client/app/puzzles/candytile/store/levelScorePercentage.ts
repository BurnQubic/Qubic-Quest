import { selector } from "recoil";
import { scoreState } from "../store/score";
import { selectedLevelState } from "./selectedLevel";

export const levelScorePercentageState = selector<number>({
  key: "levelScorePercentage",
  get: ({ get }) => {
    const targetScore = get(selectedLevelState)?.file.score || 0;
    const score = get(scoreState);
    const scorePercentage = Math.round((score * 100) / targetScore);
    return scorePercentage;
  },
});
