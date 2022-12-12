import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFile } from "../store/FileDataStore";
import useBackendModel from "../hooks/useBackendModel";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  Legend
} from "recharts";
const Visualizer = () => {
  const fileToVisualize = useSelector(getFile);
  const {
    result: modelResult,
    error: modelError,
    getResults
  } = useBackendModel("/x-ray");
  useEffect(() => {
    if (!fileToVisualize?.fileStream) {
      return;
    }
    getResults(fileToVisualize);
  }, [fileToVisualize, getResults]);
  return (
    <div className="visualizer">
      <span>{modelError}</span>
      {modelResult && (
        <LineChart width={410} height={300} data={modelResult.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="intensity"
            stroke="#8884d8"
            dot={false}
          />
          {modelResult.bursts.map((burstPoint, index) => {
            return (
              <ReferenceLine x={burstPoint} key={index} stroke="#ff0000" />
            );
          })}
          <Legend
            payload={[
              {
                id: "intensity",
                type: "line",
                value: "intensity",
                color: "#8884d8"
              },
              {
                id: "bursts",
                type: "line",
                value: "bursts",
                color: "#ff0000"
              }
            ]}
          />
        </LineChart>
      )}
    </div>
  );
};

export default Visualizer;
