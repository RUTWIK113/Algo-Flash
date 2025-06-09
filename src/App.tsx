import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BubbleSortVisualizer from "./components/BubbleSortVisualizer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
        <h1 className="text-4xl font-bold mb-6">Algo-flash</h1>

        {/* Algorithm Selector */}
        <div className="flex gap-4 mb-6">
          <Link to="/bubble" className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-full text-white font-semibold transition">
            Bubble Sort
          </Link>
          <Link to="/insertion" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full text-white font-semibold transition">
            Insertion Sort
          </Link>
          {/* Add more algorithm links here */}
        </div>

        <Routes>
          <Route path="/bubble" element={<BubbleSortVisualizer />} />
          <Route path="/insertion" element={<ComingSoon name="Insertion Sort" />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

const ComingSoon: React.FC<{ name: string }> = ({ name }) => (
  <div className="text-xl text-gray-400">🚧 {name} Visualizer Coming Soon...</div>
);

export default App;
