import { allBlocksVariants, BoardCell } from "../board/contants";

export const SPAWN_X_INDEX = 3;
export const QUANTITY_OF_BLOCKS = 5;

export const getRandomIndex = (length: number) =>
  Math.floor(Math.random() * length);

export const generateRandomBlock = () =>
  allBlocksVariants[getRandomIndex(allBlocksVariants.length)];

export const isBoardAndBlockContainCommonElements = (
  board: BoardCell[][],
  block: BoardCell[][]
) => {
  return board.some((row, i) => {
    return row.some((cell, j) => {
      const boardValue = cell.value;
      const blockValue = block[i][j].value;
      if (boardValue === 1 && blockValue === 1) {
        return true;
      }
      return false;
    });
  });
};

export const isOutOfBoard = (
  oldBlock: BoardCell[][],
  newBlock: BoardCell[][]
) => {
  const oldBlockQuantity = oldBlock
    .flat()
    .flat()
    .filter((cell) => cell.value === 1).length;
  const newBlockQuantity = newBlock
    .flat()
    .flat()
    .filter((cell) => cell.value === 1).length;

  return oldBlockQuantity !== newBlockQuantity;
};

export const getNextPosition = (
  block: typeof allBlocksVariants[number],
  i: number
) => {
  const n = block.positions.length;
  const newPossition = block.positions[((i % n) + n) % n];

  return {
    color: block.color,
    position: newPossition,
  };
};
