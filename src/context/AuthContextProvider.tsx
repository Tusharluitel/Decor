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
  image_path : string

}

interface AuthResponse {
  success: boolean;
  message: string;
  data: User;
  role: string;
  token: string;
  image_path : string
}

interface AuthContextProps {
  user: User | null;
  role: string | null;
  loading: boolean;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  role: null,
  loading: true,
  logout: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  

  

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
      Cookies.remove("DECOR_ACCESS_TOKEN", { domain: process.env.APP_DOMAIN });
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };