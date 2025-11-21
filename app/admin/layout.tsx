"use client";
import type React from "react";
import { LayoutWrapper } from "@/components/LayoutSystem/LayoutWrapper";
import ProtectedLayout from "@/components/LayoutSystem/ProtectedLayout";
import { AdminContextProvider } from "@/components/Context/AdminContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminContextProvider>
      <ProtectedLayout allowedRole="admin">
        <LayoutWrapper>{children}</LayoutWrapper>
      </ProtectedLayout>
    </AdminContextProvider>
  );
}
