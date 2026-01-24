import React from "react";

interface QuickActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function QuickActionCard({
  icon,
  title,
  description,
}: QuickActionCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 cursor-pointer transition">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>

      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
    </div>
  );
}
