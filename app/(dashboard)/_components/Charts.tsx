"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", appointments: 30 },
  { name: "Feb", appointments: 25 },
  { name: "Mar", appointments: 40 },
  { name: "Apr", appointments: 20 },
  { name: "May", appointments: 45 },
  { name: "Jun", appointments: 35 },
];

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="appointments" fill="#1a1d21" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
