import { httpPost } from "../http/client";

const BASE_URL = "/api/auth";

export const authService = {
  login(data: unknown) {
    return httpPost(`${BASE_URL}/login`, data);
  },
};
