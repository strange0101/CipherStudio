// src/utils/request.js
export async function request(url, method = "GET", body = null, token = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(import.meta.env.VITE_API_URL + url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}
