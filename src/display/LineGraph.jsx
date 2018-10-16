import React from "react";
import { LineChart, Line, XAxis, YAxis } from "recharts";

export const LineGraph = (Props) => {
  return (
    <LineChart width={400} height={400} data={Props.PRPI}>
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
      <XAxis dataKey="x" />
      <YAxis />
    </LineChart>
  );
};