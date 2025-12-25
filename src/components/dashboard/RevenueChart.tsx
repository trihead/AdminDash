"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", revenue: 30, expenses: 10 },
  { month: "Feb", revenue: 32, expenses: 25 },
  { month: "Mar", revenue: 20, expenses: 15 },
  { month: "Apr", revenue: 45, expenses: 18 },
  { month: "May", revenue: 45, expenses: 23 },
  { month: "Jun", revenue: 10, expenses: 35 },
  { month: "July", revenue: 20, expenses: 25 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name === "revenue" ? "Revenue" : "Expenses"}: ${entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Expenses Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) =>
                value === "revenue" ? "Revenue" : "Expenses"
              }
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ fill: "#8b5cf6", r: 5 }}
              activeDot={{ r: 7, fill: "#8b5cf6" }}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#10b981"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ fill: "#10b981", r: 5 }}
              activeDot={{ r: 7, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
