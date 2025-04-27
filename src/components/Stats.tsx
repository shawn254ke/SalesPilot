
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StatsProps {
  statusCounts: {
    New: number;
    Contacted: number;
    Interested: number;
    Converted: number;
    Lost: number;
    Total: number;
  };
  sourceCounts: Record<string, number>;
}

const Stats: React.FC<StatsProps> = ({ statusCounts, sourceCounts }) => {
  const statusData = [
    { name: "New", value: statusCounts.New, fill: "#3b82f6" },
    { name: "Contacted", value: statusCounts.Contacted, fill: "#8b5cf6" },
    { name: "Interested", value: statusCounts.Interested, fill: "#f59e0b" },
    { name: "Converted", value: statusCounts.Converted, fill: "#10b981" },
    { name: "Lost", value: statusCounts.Lost, fill: "#ef4444" },
  ];

  const sourceData = Object.entries(sourceCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lead Status Overview</CardTitle>
          <CardDescription>Distribution of leads by status</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Sources</CardTitle>
          <CardDescription>Where leads are coming from</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sourceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
