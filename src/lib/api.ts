// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9080";

export function getCSRFToken() {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1] || ""
  );
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    ...((options.headers as Record<string, string>) || {}),
  };

  // Add CSRF token for unsafe methods
  if (
    ["POST", "PUT", "PATCH", "DELETE"].includes(
      (options.method || "GET").toUpperCase()
    )
  ) {
    headers["X-CSRFToken"] = getCSRFToken();
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include", // send sessionId cookie
    ...options,
    headers,
  });

  if (!res.ok) {
    let message = "API Error";
    try {
      const errData = await res.json();
      message = errData?.message || JSON.stringify(errData);
    } catch {}
    throw new Error(message);
  }

  return res.json() as Promise<T>;
}
