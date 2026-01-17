export const API_BASE = "http://localhost:8080";

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");

  return fetch(API_BASE + path, {
    credentials: "include",        // fine to keep
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    ...options
  });
}
