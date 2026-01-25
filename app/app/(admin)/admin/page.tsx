
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import QuickActionCard from "../components/QuickActionCard";
import { dashboardService } from "@/lib/services/dashboar.service";
import DashboardStats from "../components/DashboardStats";

export default async function AdminDashboard() {
  return (

    <div className="admin-dashboard">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Principal</h1>
          <p className="text-gray-500">Una vista rápida del rendimiento de tu blog.</p>
        </div>

        <div className="relative w-80">
          <input
            className="w-full rounded-xl border border-gray-300 pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
            placeholder="Buscar posts, users"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Stats */}
      <DashboardStats />
      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard
          icon="📄"
          title="Crear Post"
          description="Crear y publicar un nuevo artículo para tu blog."
        />
        <QuickActionCard
          icon="💬"
          title="Administrar Usuarios"
          description="Crea o elimina, usuarios para administrar tu blog."
        />
        <QuickActionCard
          icon="📘"
          title="Ver Todos los Post"
          description="Ver una lista completa de todos tus artículos publicados."
        />
      </div>

    </div>


  );
}
