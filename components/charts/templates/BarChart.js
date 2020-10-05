import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class CustomBarChar extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={this.props.data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          {this.props.keys.map((key) => (
            <Bar
              key={new Date() + key.color + key.key}
              dataKey={key.key}
              stackId="a"
              fill={key.color}
            />
          ))}

          {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
