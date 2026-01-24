const BASE_URL = process.env.NEXT_PUBLIC_URL_API || ""; // si no está definido, usa ""

export async function http<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {};
  if (!(options?.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
    cache: "no-store",
    ...options,
  });

  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export const httpGet = <T>(url: string) => http<T>(url);
export const httpPost = <T>(url: string, body: any) =>
  http<T>(url, { method: "POST", body: JSON.stringify(body) });

export const httpPut = <T>(url: string, body: any) =>
  http<T>(url, { method: "PUT", body: JSON.stringify(body) });

export const httpDelete = <T>(url: string) =>
  http<T>(url, { method: "DELETE" });

export const httpGetSecure = <T>(url: string) =>
  http<T>(url, {
    credentials: "include",
  });

export const httpPostSecure = <T>(url: string, body: any) =>
  http<T>(url, {
    method: "POST",
    body: JSON.stringify(body),
    credentials: "include",
  });

export const httpPutSecure = <T>(url: string, body: any) =>
  http<T>(url, {
    method: "PUT",
    body: JSON.stringify(body),
    credentials: "include",
  });

  
export const httpDeleteSecure = <T>(url: string) =>
  http<T>(url, { method: "DELETE", credentials: "include" });
