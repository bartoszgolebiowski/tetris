import { useAppSelector } from "../../store/hooks";
import BoardRow from "./BoardRow";
import { boardSelector, blockPositionSelector } from "./boardSlice";
import "./board.css";

const Board = () => {
  const board = useAppSelector(boardSelector);
  const blocks = useAppSelector(blockPositionSelector);

  return (
    <div className="board__container">
      {board.map((row, indexRow) => (
        <BoardRow row={row} key={indexRow} />
      ))}
      <div className="board__container--blocks">
        {blocks.map((row, indexRow) => (
          <BoardRow row={row} key={indexRow} />
        ))}
      </div>
    </div>
  );
};

export default Board;
