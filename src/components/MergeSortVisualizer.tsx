import React, { useState } from "react";

const MergeSortVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([38, 27, 43, 3, 9, 82, 10]);
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(400);
  const [customInput, setCustomInput] = useState("");

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const generateArray = () => {
    const newArr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 90) + 10);
    setArray(newArr);
  };

  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    let L = arr.slice(left, mid + 1);
    let R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      setHighlightedIndices([k]);
      await sleep(speed);

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      setArray([...arr]);
      k++;
    }

    while (i < n1) {
      setHighlightedIndices([k]);
      await sleep(speed);
      arr[k] = L[i];
      setArray([...arr]);
      i++;
      k++;
    }

    while (j < n2) {
      setHighlightedIndices([k]);
      await sleep(speed);
      arr[k] = R[j];
      setArray([...arr]);
      j++;
      k++;
    }
    setHighlightedIndices([]);
  };

  const mergeSortHelper = async (arr: number[], left: number, right: number) => {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);
    await merge(arr, left, mid, right);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    await mergeSortHelper(arr, 0, arr.length - 1);
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
          placeholder="e.g. 10,20,30"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          className="px-4 py-2 rounded text-black w-full md:w-auto"
        />
        <button onClick={handleCustomInput} disabled={isSorting} className="bg-green-600 px-4 py-2 rounded text-white">
          Use Custom
        </button>
        <button onClick={generateArray} disabled={isSorting} className="bg-blue-600 px-4 py-2 rounded text-white">
          Generate
        </button>
        <button onClick={mergeSort} disabled={isSorting} className="bg-purple-600 px-4 py-2 rounded text-white">
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

export default MergeSortVisualizer;
