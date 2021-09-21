import { BoardCell as BoardCellType, colors } from "./contants";

type Props = {
  cell: BoardCellType;
};

const WIDTH = 25;
const HEIGHT = 25;

const BoardCell = (props: Props) => {
  const { cell } = props;

  return (
    <div
      style={{
        backgroundColor: colors[cell.color],
        minWidth: WIDTH,
        minHeight: HEIGHT,
        border: `1px ${colors["black"]} solid`,
      }}
    />
  );
};

export default BoardCell;
