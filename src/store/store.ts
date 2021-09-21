import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../features/board/boardSlice";
import panelReducer from "../features/panel/panelSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    panel: panelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
