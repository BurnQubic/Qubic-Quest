import { selector } from 'recoil';
import { finishedMovingState } from './finishedMoving';
import { levelMovesState } from './levelMoves';
import { possibleCombinationsState } from './possibleCombinations';
import { levelCompleteState } from './levelComplete';

export const gameOverState = selector<boolean>({
	key: 'gameOver',
	get: ({ get }) => {
		const levelComplete = get(levelCompleteState);
		const finishedMoving = get(finishedMovingState) ?? false;
		const levelMoves = get(levelMovesState) ?? { spentAllMoves: false };
		const possibleCombinations = get(possibleCombinationsState) ?? true;

		return finishedMoving && !levelComplete && (levelMoves.spentAllMoves || !possibleCombinations);
	},
});
