export async function api<T>(path: string, options?: RequestInit): Promise<T> {

  const res = await fetch(import.meta.env.VITE_API_URL + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
