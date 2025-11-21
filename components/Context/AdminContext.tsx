"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import useApi from "../../lib/useApi"; // make sure your custom hook path is correct
import { toast } from "sonner";

const AdminContext = createContext<AuthContextType | undefined>(undefined);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  return <AdminContext.Provider value={{}}>{children}</AdminContext.Provider>;
};

// ✅ useAuth Hook
export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
