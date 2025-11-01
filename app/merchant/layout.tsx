"use client";

import type React from "react";

import { Sidebar } from "@/components/sidebar";
import { LayoutWrapper } from "@/components/LayoutSystem/LayoutWrapper";
import ProtectedLayout from "@/components/LayoutSystem/ProtectedLayout";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout allowedRole="merchant">
      <LayoutWrapper>{children}</LayoutWrapper>
    </ProtectedLayout>
  );
}
