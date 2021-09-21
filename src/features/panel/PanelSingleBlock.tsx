import BoardRow from "../board/BoardRow";
import { BoardCell } from "../board/contants";

type Props = {
  block: BoardCell[][];
};

const PanelSingleBlock = (props: Props) => {
  const { block } = props;

  return (
    <div>
      {block.map((row, indexRow) => (
        <BoardRow row={row} key={indexRow} />
      ))}
    </div>
  );
};

export default PanelSingleBlock;
