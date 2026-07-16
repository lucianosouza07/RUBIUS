import React, { createContext, useEffect, useState, useRef, useContext } from "react";
import { rubius_api } from "../api/rubius";

interface AuthContextType {
  authenticated: boolean | null;
  loading: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const checkAuth = async () => {
      try {
        await rubius_api.get("/me");
        setAuthenticated(true);
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await rubius_api.get("/logout");
    } finally {
      setAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ authenticated, loading, setAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
