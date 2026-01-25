import { DashboardResponse } from "@/app/types/dashboard";
import { httpGet, httpGetSecure } from "../http/client";

const BASE_URL = "/api/dashboard";

export const dashboardService = {
  getStats(): Promise<DashboardResponse> {
    return httpGetSecure(BASE_URL);
  },
};
