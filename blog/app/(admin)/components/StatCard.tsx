import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  changeColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeColor = "text-gray-500",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 ">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
      <p className={`text-sm mt-2 ${changeColor}`}>{change}</p>
    </div>
  );
}
