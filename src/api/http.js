export const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
}
