import { useAppSelector } from "../../store/hooks";
import PanelSingleBlock from "./PanelSingleBlock";
import { nextBlocksSelector } from "./panelSlice";
import PanelInterface from "./PanelInterface";
import "./panel.css";

type Props = {
  isGameOver: boolean;
  gameSpeed: number;
  setGameSpeed: (ms: number) => void;
  resetGame: () => void;
};

const Panel = (props: Props) => {
  const { isGameOver, gameSpeed, setGameSpeed, resetGame } = props;
  const blocks = useAppSelector(nextBlocksSelector);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGameSpeed(parseInt(e.target.value, 10));
  };

  const handleClick = () => {
    resetGame();
  };

  return (
    <div className="panel__container">
      <div className="panel__blocks">
        {blocks.slice(1).map((block, indexRow) => (
          <PanelSingleBlock block={block} key={indexRow} />
        ))}
        <div className="panel__blocks--next">
          <PanelSingleBlock block={blocks[blocks.length - 1]} />
        </div>
      </div>
      <div className="panel__interface">
        <PanelInterface
          gameSpeed={gameSpeed}
          onChangeGameSpeed={handleChange}
          onReset={handleClick}
          isGameOver={isGameOver}
        />
      </div>
    </div>
  );
};

export default Panel;
