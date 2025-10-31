"use client";

import type React from "react";

import { Sidebar } from "@/components/sidebar";
import { LayoutWrapper } from "@/components/LayoutWrapper";

export default function MerchantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
