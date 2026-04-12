"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchWithToken } from "@/lib/api";

interface AdminAuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  isAdmin: false,
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetchWithToken("/auth/me")
      .then(() => setIsAdmin(true))
      .catch(() => {
        localStorage.removeItem("admin_token");
        setIsAdmin(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const signIn = (token: string) => {
    localStorage.setItem("admin_token", token);
    setIsAdmin(true);
  };

  const signOut = () => {
    localStorage.removeItem("admin_token");
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
