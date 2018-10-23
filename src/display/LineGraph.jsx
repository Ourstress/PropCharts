import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis } from "recharts";

export class LineGraph extends Component {
  render() {
    const copiedData = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];
    return (
      <div>
      <LineChart width={400} height={400} data={this.props.data}>
      <Line type="monotone" dataKey="HDBRPI" stroke="#8884d8" />
      <Line type="monotone" dataKey="PRPI"  />
      <XAxis dataKey="x" />
      <YAxis />
    </LineChart>
          <LineChart width={400} height={400} data={copiedData}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <Line type="monotone" dataKey="pv"  />
          <XAxis dataKey="x" />
          <YAxis />
        </LineChart>
        </div>
    );
  }
}