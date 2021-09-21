import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { BoardCell, emptyBoard, transparentBoard } from "./contants";

interface BoardState {
  board: BoardCell[][];
  blockPosition: BoardCell[][];
}

const initialState: BoardState = {
  board: emptyBoard,
  blockPosition: transparentBoard,
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    resetBoard(state) {
      state.board = emptyBoard;
      state.blockPosition = transparentBoard;
    },
    setBoard(state, action: PayloadAction<BoardCell[][]>) {
      state.board = action.payload;
    },
    setBlockPosition(state, action: PayloadAction<BoardCell[][]>) {
      state.blockPosition = action.payload;
    },
  },
});

export const { setBlockPosition, setBoard, resetBoard } = boardSlice.actions;
export const boardSelector = (state: RootState) => state.board.board;
export const blockPositionSelector = (state: RootState) =>
  state.board.blockPosition;

export default boardSlice.reducer;
