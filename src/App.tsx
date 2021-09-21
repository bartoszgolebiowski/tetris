import Board from "./features/board/Board";
import useGameLoop from "./features/engine/useGameLoop";
import Panel from "./features/panel/Panel";

const App = () => {
  const props = useGameLoop();

  return (
    <div className="tetris">
      <Board />
      <Panel {...props} />
    </div>
  );
};

export default App;
