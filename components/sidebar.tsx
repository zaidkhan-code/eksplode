"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  LogOut,
  Menu,
  X,
  CreditCard,
  FileText,
  Settings,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  role: "user" | "merchant" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = {
    user: [
      { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
      { label: "Transactions", href: "/user/transactions", icon: ShoppingBag },
      { label: "Products", href: "/user/products", icon: CreditCard },
      { label: "Profile", href: "/user/profile", icon: User },
    ],
    merchant: [
      {
        label: "Dashboard",
        href: "/merchant/dashboard",
        icon: LayoutDashboard,
      },
      { label: "Products", href: "/merchant/products", icon: ShoppingBag },
      {
        label: "Create Product",
        href: "/merchant/create-product",
        icon: FileText,
      },
      { label: "Profile", href: "/merchant/profile", icon: User },
    ],
    admin: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Ledger", href: "/admin/ledger", icon: FileText },
      { label: "Payouts", href: "/admin/payouts", icon: CreditCard },
      { label: "Adjustments", href: "/admin/adjustments", icon: Settings },
    ],
  };

  const items = menuItems[role];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 right-4 z-50 p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-black border-r border-red-900/30 p-6 transform transition-transform duration-300 md:translate-x-0 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-8 h-full flex flex-col">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex-shrink-0"
          >
            <Logo size="md" />
          </Link>

          {/* Navigation */}
          <nav className="space-y-2 flex-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/50"
                      : "text-gray-400 hover:text-white hover:bg-red-900/20"
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="pt-8 border-t border-red-900/30 flex-shrink-0">
            <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition w-full rounded-lg hover:bg-red-900/10">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
