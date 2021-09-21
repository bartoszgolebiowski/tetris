import { createNextState } from "@reduxjs/toolkit";
import {
  allBlocksVariants,
  BoardCell,
  ColorsKeys,
  COLUMNS_QUANTITY,
  emptyBoard,
  ROWS_QUANTITY,
  transparentBoard,
} from "../board/contants";
import { setBlockPosition, setBoard } from "../board/boardSlice";
import { AppDispatch } from "../../store/store";
import { KEYBOARD_KEYS } from "./constats";
import { addToScore, setNextBlocks } from "../panel/panelSlice";
import {
  generateRandomBlock,
  isBoardAndBlockContainCommonElements,
  isOutOfBoard,
  getNextPosition,
  SPAWN_X_INDEX,
  QUANTITY_OF_BLOCKS,
} from "./utils";

class GameLoop {
  dispatch: AppDispatch;
  nextBlocks: typeof allBlocksVariants;
  currentBlock: typeof allBlocksVariants[number];
  currentBlockPositionIndex: number;

  constructor(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.nextBlocks = Array.from(
      { length: QUANTITY_OF_BLOCKS },
      generateRandomBlock
    );
    this.currentBlock = this.nextBlocks.pop()!;
    this.currentBlockPositionIndex = 0;
    this._spawnBlock();
  }
  /*
   * @description: This method is used to calculate next iteration of game
   * @param {BoardCell[][]} board
   * @param {BoardCell[][]} block
   * @returns {boolean} true if game is over
   *
   * */
  tick(board: BoardCell[][], block: BoardCell[][]): boolean {
    const { isNextIterationBlockPositionTouchedObstacle, newBlockPosition } =
      this._calculateNextIteration(board, block);

    if (isNextIterationBlockPositionTouchedObstacle) {
      this._appendBlockToBoard(board, block);
      return this._spawnBlock(board);
    } else {
      this.dispatch(setBlockPosition(newBlockPosition));
      return false;
    }
  }
  _calculateNextIteration(board: BoardCell[][], block: BoardCell[][]) {
    const newBlockPosition = createNextState(block, (dratf) => {
      dratf.splice(0, 0, transparentBoard[0]);
      dratf.length = ROWS_QUANTITY;
    });

    const isNextIterationBlockPositionTouchedObstacle =
      isBoardAndBlockContainCommonElements(board, newBlockPosition) ||
      isOutOfBoard(block, newBlockPosition);

    return { isNextIterationBlockPositionTouchedObstacle, newBlockPosition };
  }
  _appendBlockToBoard(board: BoardCell[][], block: BoardCell[][]) {
    const rowIndexes: number[] = [];
    const merged = createNextState(board, (dratf) => {
      dratf.forEach((row, i) =>
        row.forEach((_, j) => {
          const selectedBlock = block[i][j];
          if (selectedBlock.value === 1) {
            dratf[i][j] = selectedBlock;
          }
        })
      );
    });

    merged.forEach((row, i) => {
      const isRowFilled = row.every((cell, j) => cell.value === 1);
      if (isRowFilled) {
        rowIndexes.push(i);
      }
    });

    const mergedMinusScore = createNextState(merged, (dratf) => {
      rowIndexes.forEach((index) => {
        dratf.splice(index, 1);
        dratf.splice(0, 0, emptyBoard[0]);
      });
    });

    this.dispatch(
      addToScore(rowIndexes.length ** Math.max(rowIndexes.length, 1) * 1000)
    );
    this.dispatch(setBoard(mergedMinusScore));
  }
  _spawnBlock(board?: BoardCell[][]) {
    const randomBlock = this.nextBlocks.pop()!;

    const blockColor = randomBlock.color;
    const blockPositions = randomBlock.positions[0];

    const blockWithCorrectColors = blockPositions.map((row) =>
      row.map((value) => ({
        value,
        color: value !== 0 ? blockColor : ("transparent" as ColorsKeys),
      }))
    );
    const blockPosition = createNextState(transparentBoard, (dratf) => {
      for (let index = 0; index < blockPositions.length; index++) {
        dratf[index].splice(SPAWN_X_INDEX, 0, ...blockWithCorrectColors[index]);
        dratf[index].length = COLUMNS_QUANTITY;
      }
    });

    if (board && isBoardAndBlockContainCommonElements(board, blockPosition)) {
      return true;
    } else {
      this.nextBlocks.unshift(generateRandomBlock());
      this.currentBlock = randomBlock;
      this.currentBlockPositionIndex = 0;
      this.dispatch(setNextBlocks([...this.nextBlocks]));
      this.dispatch(setBlockPosition(blockPosition));
      return false;
    }
  }
  /*
   * @description: This method is used to handle user input
   * @param {BoardCell[][]} board
   * @param {BoardCell[][]} block
   * @param { "" | "arrowleft" | "arrowright" | "arrowdown" | "r"} key
   * @returns {boolean} true if game is over
   *
   * */
  handleKeyDown(
    board: BoardCell[][],
    block: BoardCell[][],
    key: typeof KEYBOARD_KEYS[keyof typeof KEYBOARD_KEYS]
  ): boolean {
    switch (key) {
      case KEYBOARD_KEYS.LEFT_ARROW: {
        this._moveLeftBlock(board, block);
        return false;
      }
      case KEYBOARD_KEYS.RIGHT_ARROW: {
        this._moveRightBlock(board, block);
        return false;
      }
      case KEYBOARD_KEYS.DOWN_ARROW: {
        return this._dropBlock(board, block);
      }
      case KEYBOARD_KEYS.R: {
        this._rotateBlock(board, block);
        return false;
      }
      case KEYBOARD_KEYS.SPACE: {
        return this._dropBlock(board, block);
      }
      default: {
        throw new Error(`Unknown key: ${key}`);
      }
    }
  }
  _handleChangePosition(
    board: BoardCell[][],
    oldBlockPosition: BoardCell[][],
    newBlockPosition: BoardCell[][]
  ) {
    const isChangedBlockPositionAllow = !(
      isBoardAndBlockContainCommonElements(board, newBlockPosition) ||
      isOutOfBoard(oldBlockPosition, newBlockPosition)
    );

    if (isChangedBlockPositionAllow) {
      this.dispatch(setBlockPosition(newBlockPosition));
    }
  }
  _moveLeftBlock(board: BoardCell[][], block: BoardCell[][]) {
    const newBlockPosition = createNextState(block, (dratf) => {
      dratf.forEach((row) => {
        row.shift();
        row.push(transparentBoard[0][0]);
      });
    });
    this._handleChangePosition(board, block, newBlockPosition);
  }
  _moveRightBlock(board: BoardCell[][], block: BoardCell[][]) {
    const newBlockPosition = createNextState(block, (dratf) => {
      dratf.forEach((row) => {
        row.unshift(transparentBoard[0][0]);
        row.pop();
      });
    });
    this._handleChangePosition(board, block, newBlockPosition);
  }
  _dropBlock(board: BoardCell[][], block: BoardCell[][]) {
    let prevBlockPosition = block;
    let { isNextIterationBlockPositionTouchedObstacle, newBlockPosition } =
      this._calculateNextIteration(board, block);

    while (!isNextIterationBlockPositionTouchedObstacle) {
      prevBlockPosition = newBlockPosition;
      const result = this._calculateNextIteration(board, newBlockPosition);
      newBlockPosition = result.newBlockPosition;
      isNextIterationBlockPositionTouchedObstacle =
        result.isNextIterationBlockPositionTouchedObstacle;
    }

    this._appendBlockToBoard(board, prevBlockPosition);
    return this._spawnBlock(board);
  }
  _rotateBlock(board: BoardCell[][], block: BoardCell[][]) {
    this.currentBlockPositionIndex = this.currentBlockPositionIndex + 1;
    const nextPosition = getNextPosition(
      this.currentBlock,
      this.currentBlockPositionIndex
    );
    const blockWithCorrectColors = nextPosition.position.map((row) =>
      row.map((value) => ({
        value,
        color: value !== 0 ? nextPosition.color : ("transparent" as ColorsKeys),
      }))
    );
    const offsetY = block.findIndex((row) =>
      row.some((cell) => cell.value === 1)
    );
    const offsetX = block[offsetY].findIndex((cell) => cell.value === 1);

    const blockPosition = createNextState(transparentBoard, (dratf) => {
      for (let index = 0; index < nextPosition.position.length; index++) {
        dratf[index + offsetY].splice(
          offsetX,
          0,
          ...blockWithCorrectColors[index]
        );
        dratf[index + offsetY].length = COLUMNS_QUANTITY;
      }
    });
    this._handleChangePosition(board, block, blockPosition);
  }
}

export default GameLoop;
