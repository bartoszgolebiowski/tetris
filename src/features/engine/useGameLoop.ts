import * as React from "react";
import { store } from "../../store/store";
import { useAppDispatch } from "./../../store/hooks";
import {
  boardSelector,
  blockPositionSelector,
  resetBoard,
} from "../board/boardSlice";
import { resetPanel } from "../panel/panelSlice";
import { KeyboardValues, KEYBOARD_KEYS } from "./constats";
import GameLoop from "./gameLoop";

const useGameLoop = () => {
  const isGameOver = React.useRef(false);
  const engine = React.useRef(new GameLoop(store.dispatch));
  const [gameOver, setGameOver] = React.useState(false);
  const [gameSpeed, setSpeed] = React.useState(1000);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const id = setInterval(() => {
      const state = store.getState();
      const board = boardSelector(state);
      const block = blockPositionSelector(state);
      if (!isGameOver.current) {
        isGameOver.current = engine.current.tick(board, block);
        setGameOver(isGameOver.current);
      }
    }, gameSpeed);

    return () => clearInterval(id);
  }, [gameSpeed]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const selectedKey = e.key.toLowerCase();
      //I do not why, need to check typescript documentation,
      //@ts-ignore
      if (Object.values(KEYBOARD_KEYS).includes(selectedKey)) {
        const selectedKeyTyped = selectedKey as KeyboardValues;
        const state = store.getState();
        const board = boardSelector(state);
        const block = blockPositionSelector(state);
        if (!isGameOver.current) {
          isGameOver.current = engine.current.handleKeyDown(
            board,
            block,
            selectedKeyTyped
          );
          setGameOver(isGameOver.current);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const setGameSpeed = (ms: number) => {
    setSpeed(ms);
  };

  const resetGame = () => {
    isGameOver.current = false;
    setGameOver(false);
    dispatch(resetBoard());
    dispatch(resetPanel());
    engine.current = new GameLoop(store.dispatch);
  };

  return {
    gameSpeed,
    setGameSpeed,
    resetGame,
    isGameOver: gameOver,
  } as const;
};

export default useGameLoop;
