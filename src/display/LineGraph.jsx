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

export class LineGraph extends Component {
  render() {
    return (
      <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
        <LineChart data={this.props.data}>
          {this.props.graphs.map(graph => (
            <Line
              key={graph}
              type="monotone"
              dataKey={
                this.props[graph] === true || this.props[graph] == null
                  ? `${graph}`
                  : `${graph} `
              }
              stroke={"#" + Math.floor(Math.random() * 16777215).toString(16)}
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
