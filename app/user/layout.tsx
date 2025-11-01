"use client";

import type React from "react";

import { Sidebar } from "@/components/ui/sidebar";
import { LayoutWrapper } from "@/components/LayoutSystem/LayoutWrapper";
import ProtectedLayout from "@/components/LayoutSystem/ProtectedLayout";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout allowedRole="user">
      <LayoutWrapper>{children}</LayoutWrapper>
    </ProtectedLayout>
  );
}
