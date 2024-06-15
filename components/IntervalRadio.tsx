import { stockIntervals } from "@/constants/config";
import { useAppContext } from "@/context/AppContext";

interface IProps {
  interval: { label: string; value: number | string };
  currentInterval: number | string;
  type?: string;
  setCurrentInterval?: any;
}

export const IntervalRadio = ({
  interval,
  currentInterval,
  type,
  setCurrentInterval,
}: IProps) => {
  const { setCurrentStockInterval } = useAppContext();
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "stock") {
      const stockInt = stockIntervals.find(
        (stockInterval) => stockInterval.value === event.target.value
      );
      stockInt && setCurrentStockInterval(stockInt);
    } else {
      setCurrentInterval(parseInt(event.target.value));
    }
  };

  const checked = currentInterval === interval.value;
  return (
    <label
      htmlFor=""
      className={`rounded-md relative transition duration-300 border-slate-400 border select-none cursor-pointer aspect-square w-8 flex items-center justify-center ${
        checked && "bg-primary text-white"
      }`}
    >
      <input
        checked={checked}
        onChange={handleRadioChange}
        value={interval.value}
        type="radio"
        className="absolute opacity-0 cursor-pointer top-0 left-0 right-0 bottom-0"
      />
      <span className=" text-sm">{interval.label}</span>
    </label>
  );
};