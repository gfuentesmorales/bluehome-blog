"use client";

import { dashboardService } from "@/lib/services/dashboar.service";
import { useEffect, useState } from "react";
import StatCard from "./StatCard";

export default function DashboardStats() {
  const [dashboard, setDashboard] = useState<any>({});

  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await dashboardService.getStats();
      if (data) {
        setDashboard(data);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <StatCard
        title="Total Posts"
        value={dashboard?.posts ?? 0}
        change="+2.5% this month"
        changeColor="text-green-600"
      />
      <StatCard
        title="Usuarios Registrados"
        value={dashboard?.users ?? 0}
        change="+1.2% this month"
        changeColor="text-green-600"
      />
      <StatCard
        title="Vistas Totales"
        value={dashboard?.views ?? 0}
        change="+5 new today"
        changeColor="text-orange-600"
      />
    </div>
  );
}
