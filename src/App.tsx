import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import BubbleSortVisualizer from "./components/BubbleSortVisualizer";
import MergeSortVisualizer from "./components/MergeSortVisualizer";
import QuickSortVisualizer from "./components/QuickSortVisualizer";
import SelectionSortVisualizer from "./components/SelectionSortVisualizer";
import InsertionSortVisualizer from "./components/InsertionSortVisualizer";

// Home page component with buttons only
const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-8">
      <h1 className="text-4xl font-bold mb-6">Algo-flash</h1>

      <button
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full text-white font-semibold"
        onClick={() => navigate("/bubble-sort")}
      >
        Bubble Sort
      </button>

      <button
        className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full text-white font-semibold"
        onClick={() => navigate("/merge-sort")}
      >
        Merge Sort
      </button>

      <button
        className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-full text-white font-semibold"
        onClick={() => navigate("/quick-sort")}
      >
        Quick Sort
      </button>

      <button
        className="bg-yellow-600 hover:bg-yellow-500 px-6 py-3 rounded-full text-white font-semibold"
        onClick={() => navigate("/selection-sort")}
      >
        Selection Sort
      </button>

      <button
        className="bg-pink-600 hover:bg-pink-500 px-6 py-3 rounded-full text-white font-semibold"
        onClick={() => navigate("/insertion-sort")}
      >
        Insertion Sort
      </button>
    </div>
  );
};

// Wrapper to add Back button on algorithm pages
const WithBackButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-6 w-full max-w-4xl">
      <button
        onClick={() => navigate("/")}
        className="mb-6 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-semibold self-start"
      >
        ← Back to Home
      </button>
      {children}
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/bubble-sort"
            element={
              <WithBackButton>
                <BubbleSortVisualizer />
              </WithBackButton>
            }
          />

          <Route
            path="/merge-sort"
            element={
              <WithBackButton>
                <MergeSortVisualizer />
              </WithBackButton>
            }
          />

          <Route
            path="/quick-sort"
            element={
              <WithBackButton>
                <QuickSortVisualizer />
              </WithBackButton>
            }
          />

          <Route
            path="/selection-sort"
            element={
              <WithBackButton>
                <SelectionSortVisualizer />
              </WithBackButton>
            }
          />

          <Route
            path="/insertion-sort"
            element={
              <WithBackButton>
                <InsertionSortVisualizer />
              </WithBackButton>
            }
          />

          <Route
            path="*"
            element={
              <div className="text-xl text-gray-400 text-center p-6">
                Page not found. Please go back to{" "}
                <button
                  onClick={() => window.location.replace("/")}
                  className="text-blue-400 underline"
                >
                  Home
                </button>.
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
