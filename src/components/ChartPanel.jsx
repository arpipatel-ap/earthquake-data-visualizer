import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
} from "recharts";

// ChartPanel component renders an interactive scatter plot of earthquake data
const ChartPanel = ({
  data,
  selectedXAxis,
  selectedYAxis,
  onXAxisChange,
  onYAxisChange,
  selectedEarthquakeId,
  onChartPointHover,
  onChartPointClick,
}) => {
  // Extract numeric fields from the first data object to use as axis options
  const numericAxes = Object.keys(data[0] || {}).filter(
    (key) =>
      typeof data[0][key] === "number" && !["time", "updated"].includes(key)
  );

  // Custom tooltip component to display detailed data on hover
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const pointData = payload[0].payload;
      return (
        <div className="p-2 bg-white border border-gray-300 shadow-md rounded">
          <p className="font-bold">{pointData.place}</p>
          <p>Magnitude: {pointData.mag}</p>
          <p>Depth: {pointData.depth} km</p>
          <p>Time: {new Date(pointData.time).toLocaleString()}</p>
          <p>
            {selectedXAxis}: {pointData[selectedXAxis]}
          </p>
          <p>
            {selectedYAxis}: {pointData[selectedYAxis]}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Earthquake Scatter Plot</h2>

      {/* Axis selection dropdowns */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label
            htmlFor="xAxis"
            className="block text-sm font-medium text-gray-700"
          >
            X-Axis:
          </label>
          <select
            id="xAxis"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedXAxis}
            onChange={(e) => onXAxisChange(e.target.value)}
          >
            {numericAxes.map((axis) => (
              <option key={axis} value={axis}>
                {axis.charAt(0).toUpperCase() + axis.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="yAxis"
            className="block text-sm font-medium text-gray-700"
          >
            Y-Axis:
          </label>
          <select
            id="yAxis"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={selectedYAxis}
            onChange={(e) => onYAxisChange(e.target.value)}
          >
            {numericAxes.map((axis) => (
              <option key={axis} value={axis}>
                {axis.charAt(0).toUpperCase() + axis.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Chart container */}
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey={selectedXAxis}
              name={
                selectedXAxis.charAt(0).toUpperCase() + selectedXAxis.slice(1)
              }
            />
            <YAxis
              type="number"
              dataKey={selectedYAxis}
              name={
                selectedYAxis.charAt(0).toUpperCase() + selectedYAxis.slice(1)
              }
            />
            <ZAxis dataKey="mag" range={[60, 400]} name="Magnitude" />{" "}
            {/* Z-axis for size, based on magnitude */}
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<CustomTooltip />}
            />
            <Scatter
              name="Earthquakes"
              data={data}
              fill="#5A67D8"
              onMouseOver={(e) => onChartPointHover(e.id)}
              onMouseLeave={() => onChartPointHover(null)}
              onClick={(e) => onChartPointClick(e.id)}
            >
              {data.map((entry) => (
                <Dot
                  key={`dot-${entry.id}`}
                  cx={entry[selectedXAxis]}
                  cy={entry[selectedYAxis]}
                  r={selectedEarthquakeId === entry.id ? 8 : 4} // Increase size if selected
                  fill={
                    selectedEarthquakeId === entry.id ? "#FF0000" : "#8884d8"
                  } // Change color if selected
                  stroke={
                    selectedEarthquakeId === entry.id ? "#FF0000" : "none"
                  }
                  strokeWidth={selectedEarthquakeId === entry.id ? 2 : 0}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


// Dot component to render individual chart points (circle SVG elements)
const Dot = (props) => {
  const { cx, cy, r, fill, stroke, strokeWidth } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};

export default ChartPanel;
