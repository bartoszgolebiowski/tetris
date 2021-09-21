import { useAppSelector } from "../../store/hooks";
import { scoreSelector } from "./panelSlice";

type Props = {
  isGameOver: boolean;
  gameSpeed: number;
  onChangeGameSpeed: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onReset: () => void;
};

const options = [200, 500, 1000, 2000];

const PanelInterface = (props: Props) => {
  const { isGameOver, gameSpeed, onChangeGameSpeed, onReset } = props;
  const score = useAppSelector(scoreSelector);

  return (
    <>
      <span>Score: {score}</span>
      <select value={gameSpeed} onChange={onChangeGameSpeed}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={onReset}>Reset</button>
      {isGameOver && (
        <span className="panel__interface--gameover">Game over!</span>
      )}
    </>
  );
};

export default PanelInterface;
