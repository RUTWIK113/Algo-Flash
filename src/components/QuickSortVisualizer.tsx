import React, { useState } from "react";

const QuickSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([40, 20, 50, 10, 35, 30]);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(300);
  const [customInput, setCustomInput] = useState("");

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArr);
  };

  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlightedIndices([j, high]);
      await sleep(speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setHighlightedIndices([i + 1]);
    await sleep(speed);

    return i + 1;
  };

  const quickSortHelper = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSortHelper(arr, low, pi - 1);
      await quickSortHelper(arr, pi + 1, high);
    }
  };

  const quickSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    await quickSortHelper(arr, 0, arr.length - 1);
    setIsSorting(false);
    setHighlightedIndices([]);
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
          placeholder="e.g. 10,20,5,15"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="px-4 py-2 rounded text-black w-full md:w-auto"
          disabled={isSorting}
        />
        <button onClick={handleCustomInput} disabled={isSorting} className="bg-green-600 px-4 py-2 rounded text-white">
          Use Custom
        </button>
        <button onClick={generateArray} disabled={isSorting} className="bg-blue-600 px-4 py-2 rounded text-white">
          Generate
        </button>
        <button onClick={quickSort} disabled={isSorting} className="bg-purple-600 px-4 py-2 rounded text-white">
          Sort
        </button>
      </div>

      {/* Bars + Speed */}
      <div className="flex items-start justify-center w-full max-w-5xl">
        <div className="flex items-end justify-center h-80 bg-gray-800 p-4 rounded border border-gray-600 w-full">
          {array.map((value, index) => (
            <div key={index} className="flex flex-col items-center mx-1">
              <div
                className={`w-6 transition-all duration-300 ${
                  highlightedIndices.includes(index) ? "bg-yellow-400" : "bg-red-400"
                }`}
                style={{ height: `${value * 3}px` }}
              ></div>
              <div className="text-sm mt-1">{value}</div>
            </div>
          ))}
        </div>

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
            disabled={isSorting}
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

export default QuickSortVisualizer;
