import React, { useState, useEffect } from "react";
import ChartPanel from "./components/ChartPanel";
import DataPanel from "./components/DataPanel";
import LoadingSpinner from "./components/LoadingSpinner";
import { useEarthquakeData } from "./hooks/useEarthquekeData.js";

const App = () => {
  const { data, loading, error } = useEarthquakeData();
  const [selectedXAxis, setSelectedXAxis] = useState("mag");
  const [selectedYAxis, setSelectedYAxis] = useState("depth");
  const [selectedEarthquakeId, setSelectedEarthquakeId] = useState(null);

  // Set default axes once data is loaded and has a first element
  useEffect(() => {
    if (data.length > 0) {
      const availableNumericKeys = Object.keys(data[0]).filter(
        (key) => typeof data[0][key] === "number"
      );

      // Set default X-axis
      if (availableNumericKeys.includes("mag")) setSelectedXAxis("mag");
      else if (availableNumericKeys.length > 0)
        setSelectedXAxis(availableNumericKeys[0]);

      // Set default Y-axis
      if (availableNumericKeys.includes("depth")) setSelectedYAxis("depth");
      else if (availableNumericKeys.length > 1)
        setSelectedYAxis(availableNumericKeys[1]);
      else if (availableNumericKeys.length === 1)
        setSelectedYAxis(availableNumericKeys[0]); // Fallback if only one numeric column
    }
  }, [data]);

  const handleChartPointInteraction = (id) => {
    setSelectedEarthquakeId(id);
  };

  const handleTableRowInteraction = (id) => {
    setSelectedEarthquakeId(id);
  };

  return (
    <div className="text-center max-w-4xl mx-auto mt-8 px-4">
      <h1 className="text-4xl lg:text-5xl font-extrabold text-sky-600 mb-4 tracking-tight">
        🌍 Global Earthquake Dashboard
      </h1>

<div className="bg-red-200 text-white p-4">
  If you can see red background, Tailwind works!
</div>

      <p className="text-gray-700 text-lg">
        Real-time visualization of seismic activity around the world
      </p>

      {/* Loading & Error States */}
      {loading && <LoadingSpinner />}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-auto max-w-4xl"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
          <p className="text-sm mt-1">
            Please ensure the CSV file is in `public/data/all_month.csv` and has
            correct headers.
          </p>
        </div>
      )}

      {/* Main Two-Panel Layout */}
      {!loading && !error && data.length > 0 && (
        <div
          className="
          grid
          grid-cols-1
          lg:grid-cols-2         
          gap-6
          h-[calc(100vh-160px)]
          max-w-7xl
          mx-auto
        "
        >
          {/* Chart Panel */}
          <div
            className="
            bg-white                  {/* White background */}
            rounded-lg                {/* Rounded corners */}
            shadow-xl                 {/* Larger shadow for depth */}
            p-6                       {/* Padding inside the panel */}
            flex                      {/* Use flexbox for inner layout (e.g., header, controls, chart takes remaining space) */}
            flex-col                  {/* Arrange flex items vertically */}
          "
          >
            <ChartPanel
              data={data}
              selectedXAxis={selectedXAxis}
              selectedYAxis={selectedYAxis}
              onXAxisChange={setSelectedXAxis}
              onYAxisChange={setSelectedYAxis}
              selectedEarthquakeId={selectedEarthquakeId}
              onChartPointHover={handleChartPointInteraction}
              onChartPointClick={handleChartPointInteraction}
            />
          </div>

          {/* Data Panel */}
          <div
            className="
            bg-white                  {/* White background */}
            rounded-lg                {/* Rounded corners */}
            shadow-xl                 {/* Larger shadow for depth */}
            p-6                       {/* Padding inside the panel */}
            flex                      {/* Use flexbox for inner layout (e.g., header, table takes remaining space) */}
            flex-col                  {/* Arrange flex items vertically */}
          "
          >
            <DataPanel
              data={data}
              selectedEarthquakeId={selectedEarthquakeId}
              onRowHover={handleTableRowInteraction}
              onRowClick={handleTableRowInteraction}
            />
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No earthquake data found.
        </div>
      )}
    </div>
  );
};

export default App;
