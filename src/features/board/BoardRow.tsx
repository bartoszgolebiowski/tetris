import BoardCell from "./BoardCell";
import { BoardCell as BoardCellType } from "./contants";

type Props = {
  row: BoardCellType[];
};

const WIDTH = 330;
const HEIGHT = 30;

const BoardRow = (props: Props) => {
  const { row } = props;

  return (
    <div
      style={{
        maxWidth: WIDTH,
        maxHeight: HEIGHT,
        display: "flex",
      }}
    >
      {row.map((cell, indexCell) => (
        <BoardCell cell={cell} key={indexCell} />
      ))}
    </div>
  );
};

export default BoardRow;
