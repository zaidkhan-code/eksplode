"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar role="user" />
      <main className="flex-1">{children}</main>
    </div>
  )
}
