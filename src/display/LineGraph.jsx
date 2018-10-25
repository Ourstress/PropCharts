import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { urlName } from "../dataProcessing/dataApi";

export class LineGraph extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <LineChart data={this.props.data}>
          {this.props.graphs.map(graph => (
            <Line
              key={graph}
              type="monotone"
              name={urlName[graph]}
              dataKey={
                this.props[graph] === true || this.props[graph] == null
                  ? `${graph}`
                  : `${graph} `
              }
              stroke={`#${Math.floor(Math.random() * 0x1000000)
                .toString(16)
                .padStart(6, 0)}`}
              dot={false}
            />
          ))}
          <XAxis dataKey="x" />
          <Tooltip />
          <Legend />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
