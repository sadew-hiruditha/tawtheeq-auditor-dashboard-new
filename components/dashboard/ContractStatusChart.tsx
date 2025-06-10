// file: components/dashboard/ContractStatusChart.tsx
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the chart. In the future, this will be aggregated from the database.
const data = [
  { status: "Completed", total: 3150 },
  { status: "Pending", total: 1203 },
  { status: "Disputed", total: 28 },
  { status: "Draft", total: 440 },
];

export const ContractStatusChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        {/* ResponsiveContainer makes the chart fill its parent container */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="status"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(128, 128, 128, 0.1)" }}
              contentStyle={{ 
                backgroundColor: "#ffffff",
                border: "1px solid #e0e0e0",
                borderRadius: "0.5rem"
              }}
            />
            <Bar dataKey="total" fill="#2563eb" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};