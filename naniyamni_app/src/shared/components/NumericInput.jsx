import React from "react";

export const NumericInput = ({ value, onChange, min = 0, max = 100, step = 1, text }) => {
  const handleIncrement = () => {
    if (value + step <= max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value - step >= min) {
      onChange(value - step);
    }
  };

  const handleChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= min && val <= max) {
      onChange(val);
    }
  };

  return (
    <div className="shadow w-fit h-fit bg-gradient-to-r rounded-sm border-none p-[0.7px] hover:from-blue-300 hover:to-yellow-200">
      <div className="bg-white border-none rounded p-1 flex flex-col items-center">
        <h1 className="text-zinc-800/95 font-medium text-center text-sm p-1">{text}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="text-zinc-900 px-3 py-1 cursor-pointer text-xl"
          >
            -
          </button>
          <input
            type="number"
            value={value}
            onChange={handleChange}
            className="pl-2 text-center outline-none w-13 md:w-15 appearance-none text-gray-900"
          />
          <button
            onClick={handleIncrement}
            className="px-3 py-1 text-gray-900 cursor-pointer text-xl"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
