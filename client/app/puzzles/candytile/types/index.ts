export type CandyColor = "Red" | "Orange" | "Yellow" | "Green" | "Blue" | "Purple" | "White";

export type Candy = {
  color: CandyColor;
  type: "Candy";
  id?: string;
};

export type SuperCandy = {
  color: CandyColor;
  type: "SuperCandy";
  id?: string;
};

export type Chocolate = {
  type: "Chocolate";
  id?: string;
};

export type IceCream = {
  type: "IceCream";
  id?: string;
};

export type Tile = {
  type: "Normal" | "Ice" | "Rock";
};

export type LevelItem = Candy | SuperCandy | Chocolate | IceCream | null;
export type LevelTile = Tile | null;

export type MatchDetail = {
  up: number;
  right: number;
  down: number;
  left: number;
  index: number;
  matched: boolean;
};

export type MatchGroup = number[];

export type MatchResult = {
  thereWereMatches: boolean;
  matchingList: MatchDetail[];
  matchingGroups: MatchGroup[];
};

export type LevelRuntimeData = {
  previousItems: string;
  items: LevelItem[];
  tiles: LevelTile[];
  matchResult: MatchResult;
  actionsLocked: boolean;
  comboCount: number;
  swappedItems: [number | null, number | null];
  latestSwappedCandyColor: string;
};

export type SwappedItems = [number | null, number | null];

export type ScoreFx = {
  index: number;
  score: number;
  id: "string";
};

export type CandyScoreFx = ScoreFx & {
  type: "CandyScore";
  color: CandyColor;
};

export type SuperCandyFX = {
  position: [number, number];
  color: CandyColor;
  index: number;
  type: "SuperCandy";
  id: "string";
};

export type TileScoreFx = ScoreFx & {
  type: "TileScore";
};

export type LevelFX = CandyScoreFx | TileScoreFx | SuperCandyFX;

export type LevelTasks = {
  iceCreams: number;
  iceTiles: number;
  rockTiles: number;
};

export type LevelFile = {
  id: number;
  title: string | null;
  initialItems: LevelItem[];
  initialTiles: LevelTile[];
  score: number;
  maximumMoves: number;
  tasks: LevelTasks;
};

export type LevelData = LevelDb & { file: LevelFile; isMainLevel: boolean };

export type GameSFX = (typeof GAME_SFX_LIST)[number];

export const GAME_SFX_LIST = [
	'buttonClick1',
	'candyBounce',
	'chocolateMatch',
	'fusionMatch',
	'gameOver',
	'iceCrack1',
	'iceCrack2',
	'iceCreamMatch',
	'levelComplete',
	'match',
	'pop1',
	'put1',
	'rockCrack1',
	'rockCrack2',
	'starScore',
	'superCandyMatch',
	'taskComplete',
	'tileClick',
	'woosh1',
] as const;

export type AudioList = { [key in GameSFX]: string };