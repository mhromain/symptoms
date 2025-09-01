export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  // mock 3s delay
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://127.0.0.1:8000" + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}
