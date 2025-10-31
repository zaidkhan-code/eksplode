"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
import useApi from "../../lib/useApi"; // make sure your custom hook path is correct
import { toast } from "sonner";

interface AuthContextType {
  isLoading: boolean;
  user: any;
  login: (email: string, password: string, rememberMe: boolean) => void;
  register: (
    fullName: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null
  );

  // ✅ LOGIN
  const login = (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    const payload = { email, password, rememberMe };

    useApi(
      "auth/login",
      { method: "POST", data: payload },
      (res: any, status: boolean) => {
        setIsLoading(false);
        if (status) {
          toast.success(res?.message || "Login successful!");
          if (res?.tokens?.accessToken)
            localStorage.setItem("accessToken", res.tokens.accessToken);
          if (res?.tokens?.refreshToken)
            localStorage.setItem("refreshToken", res.tokens.refreshToken);
          if (res?.user) {
            localStorage.setItem("user", JSON.stringify(res.user));
            setUser(res.user);
          }
          router.push(`/${res?.user?.role}/dashboard`);
        } else {
          toast.error(res?.message || "Invalid email or password!");
        }
      }
    );
  };

  // ✅ REGISTER
  const register = ({ fullName, email, password, confirmPassword, role }) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!role) {
      toast.warning("Please select a role");
      return;
    }

    setIsLoading(true);
    const payload = { name: fullName, email, password, role };

    useApi(
      "auth/register",
      { method: "POST", data: payload },
      (res: any, status: boolean) => {
        setIsLoading(false);
        if (status) {
          toast.success(res?.message || "Account created successfully!");
          router.push("/auth/login");
        } else {
          toast.error(res?.message || "Registration failed!");
        }
      }
    );
  };

  // ✅ LOGOUT
  function Logout() {
    useApi("auth/logout", { method: "POST" }, (res, status) => {
      // router?.push("/auth/login");
      window.location.href = "/auth/login";
      console.log("api is calling proper");
      localStorage.clear();
    });
  }
  return (
    <AuthContext.Provider value={{ isLoading, user, login, register, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ useAuth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
