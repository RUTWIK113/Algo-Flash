import React, { useState } from "react";

const BubbleSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([20, 35, 10, 50, 25, 40]);
  const [swappingIndices, setSwappingIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [customInput, setCustomInput] = useState("");

  const generateArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArr);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setSwappingIndices([j, j + 1]);
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }

        setSwappingIndices([]);
      }
    }

    setIsSorting(false);
  };

  const handleCustomInput = () => {
    const values = customInput
      .split(",")
      .map(Number)
      .filter((num) => !isNaN(num));
    if (values.length > 0) setArray(values);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Controls */}
      <div className="mb-4 w-full max-w-3xl flex flex-col md:flex-row justify-center gap-4">
        <input
          type="text"
          placeholder="e.g. 5,3,8,1"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="px-4 py-2 rounded text-black w-full md:w-auto"
        />
        <button
          onClick={handleCustomInput}
          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white font-semibold"
          disabled={isSorting}
        >
          Use Custom Array
        </button>
        <button
          onClick={generateArray}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-semibold"
          disabled={isSorting}
        >
          Generate Array
        </button>
        <button
          onClick={bubbleSort}
          className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded text-white font-semibold"
          disabled={isSorting}
        >
          Sort
        </button>
      </div>

      {/* Visualization with speed slider to the right */}
      <div className="flex items-start justify-center w-full max-w-5xl">
        {/* Bars */}
        <div className="flex items-end justify-center h-80 bg-gray-800 p-4 rounded border border-gray-600 w-full">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center mx-1">
              <div
                className={`w-6 transition-all duration-300 ${
                  swappingIndices.includes(index) ? "bg-yellow-400" : "bg-red-400"
                }`}
                style={{ height: `${value * 3}px` }}
              ></div>
              <div className="text-sm mt-1">{value}</div>
            </div>
          ))}
        </div>

        {/* Speed control on right */}
        <div className="ml-4 w-40 text-white">
          <label className="block mb-2 text-sm font-medium">
            Speed: <span className="font-mono">{speed}ms</span>
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>Fast</span>
            <span>Slow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleSortVisualizer;
