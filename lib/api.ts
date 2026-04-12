async function request(
  endpoint: string,
  method: "GET" | "POST" = "GET",
  data?: object,
  token?: string | null
) {
  const headers: Record<string, string> = {};
  if (data) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`/api${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  });

  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("application/json")) {
    const json = await response.json();
    if (!response.ok) throw new Error(json.message ?? "API error");
    return json;
  }

  if (!response.ok) throw new Error("API error");
  return response.text();
}

export function fetchBackend(endpoint: string, method: "GET" | "POST" = "GET", data?: object) {
  return request(endpoint, method, data);
}

export function fetchWithToken(endpoint: string, method: "GET" | "POST" = "GET", data?: object) {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  return request(endpoint, method, data, token);
}
