import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { allBlocksVariants, BoardCell, ColorsKeys } from "../board/contants";

interface PanelState {
  blocks: typeof allBlocksVariants;
  score: number;
}

const initialState: PanelState = {
  blocks: [],
  score: 0,
};

export const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    resetPanel(state) {
      state.blocks = [];
      state.score = 0;
    },
    setNextBlocks(state, action: PayloadAction<typeof allBlocksVariants>) {
      //I do not know, I am assigngin typeof allBlocksVariants to typeof allBlocksVariants and it does not work
      //@ts-ignore
      state.blocks = action.payload;
    },
    addToScore(state, action: PayloadAction<number>) {
      state.score += action.payload;
    },
  },
});

export const { resetPanel, addToScore, setNextBlocks } = panelSlice.actions;

export const scoreSelector = (state: RootState) => state.panel.score;
export const nextBlocksSelector = (state: RootState): BoardCell[][][] =>
  state.panel.blocks.map((singleBlock) => {
    return singleBlock.positions[0].map((row) =>
      row.map((value) => ({
        value: value as 0 | 1,
        color: value !== 0 ? singleBlock.color : ("transparent" as ColorsKeys),
      }))
    );
  });

export default panelSlice.reducer;
