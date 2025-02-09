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

type StatChartProps = {
  stats: {
    patients: number;
    appointments: number;
    treatments: number;
    medicines: number;
  };
};

const StatChart = ({ stats }: StatChartProps) => {
  const data = [
    { name: "Patients", value: stats.patients },
    { name: "Appointments", value: stats.appointments },
    { name: "Treatments", value: stats.treatments },
    { name: "Medicines", value: stats.medicines },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#1a1d21" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatChart;
