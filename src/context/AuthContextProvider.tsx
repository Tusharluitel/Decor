"use client";

import React, { ReactNode, createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
  role: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  role: string | null;
  loading: boolean;
  fetchUser: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  role: null,
  loading: true,
  fetchUser: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAuthResponse = (response: AuthResponse) => {
    setUser(response.data);
    setRole(response.role);
    Cookies.set("IDP_ACCESS_TOKEN", response.token, { domain: process.env.APP_DOMAIN });
  };

  const fetchUser = async () => {
    const token = Cookies.get("IDP_ACCESS_TOKEN");
    if (!token) {
      // router.replace(routes.ADMIN_LOGIN);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_IDP_HOST}/api/get-user-by-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();
      setUser(data.data);
      setRole(data.role);
    } catch (error) {
      console.error("Fetch error:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const logout = async () => {
    const token = Cookies.get("IDP_ACCESS_TOKEN");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_IDP_HOST}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      Cookies.remove("IDP_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
      setUser(null);
      setRole(null);
      router.push(routes.ADMIN_LOGIN);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading: !user && loading,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };