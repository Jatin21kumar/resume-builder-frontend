import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const savedUser = localStorage.getItem("user");
  const savedToken = localStorage.getItem("token");

  // if token exists — attach it to axios
  if (savedToken) {
    api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
  }

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);


  const login = async (email, password) => {
  const res = await api.post("/api/auth/login", { email, password });
  const userData = res.data;

  localStorage.setItem("token", userData.token);
  localStorage.setItem("user", JSON.stringify(userData));

  api.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

  setUser(userData);
  return userData;
};



  const register = async (form) => {
  return api.post("/api/auth/register", form);
};

  const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};


  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
