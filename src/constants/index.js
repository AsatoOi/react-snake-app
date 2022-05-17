import { initFields } from "../utils";

const fieldSize = 35;
export const initPosition = { x: 17, y: 17 };
export const initValue = initFields(fieldSize, initPosition);
export const defaultInterval = 100;
export const defaultDifficulty = 3;
export const Difficulty = [500, 300, 100, 50, 10];

export const GameStatus = {
  init: "initial",
  playing: "playing",
  suspended: "suspended",
  gameOver: "gameOver",
};
export const Direction = {
  up: "up",
  right: "right",
  left: "left",
  down: "down",
};
export const OppositeDirection = {
  up: "down",
  right: "left",
  left: "right",
  down: "up",
};
export const Diff = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
  down: { x: 0, y: 1 },
};
export const KeyCode = {
  37: Direction.left,
  38: Direction.up,
  39: Direction.right,
  40: Direction.down,
};
