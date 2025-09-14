import { useState } from "react";

export const NumericInput = ({ min = 0, max = 100, step = 1, initial = 0, text}) => {
  const [value, setValue] = useState(initial);

  const handleIncrement = () => {
    if (value < max) setValue((prev) => prev + step);
  };

  const handleDecrement = () => {
    if (value > min) setValue((prev) => prev - step);
  };

  return (
    <div className="w-fit h-fit bg-gradient-to-r from-blue-200 to-yellow-100 rounded-sm border-none p-[1px] hover:from-blue-300 hover:to-yellow-200">
        <div className="bg-white border-none rounded p-1">
            <h1 className="text-zinc-600 text-center text-sm p-1">{text}</h1>
            <button
                onClick={handleDecrement}
                className="px-3 py-1 text-gray-700 cursor-pointer text-xl"
            >
                -
            </button>
            <input
                type="text"
                value={value}
                readOnly
                className="pl-2 text-center outline-none w-13 md:w-15"
            />
            <button
                onClick={handleIncrement}
                className="px-3 py-1 text-gray-700 cursor-pointer text-xl"
            >
                +
            </button>
        </div>
    </div>
  );
};