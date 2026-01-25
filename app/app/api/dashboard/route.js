import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { getDashboardStats } from "@/lib/services/actions/dashboard.service";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "No autorizado" }, { status: 401 });
    }
    const stats = await getDashboardStats();
    return Response.json(stats);
  } catch (error) {
    return Response.json({ error: "Error en dashboard" }, { status: 500 });
  }
}
