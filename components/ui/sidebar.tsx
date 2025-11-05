"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "../ui/logo";
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
import { useAuth } from "../Context/AuthContext";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const { user, Logout } = useAuth();

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
        href: "/merchant/product/create",
        icon: FileText,
      },
      { label: "Orders", href: "/merchant/orders", icon: ShoppingBag },
      { label: "Profile", href: "/merchant/profile", icon: User },
    ],
    admin: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Ledger", href: "/admin/ledger", icon: FileText },
      { label: "Payouts", href: "/admin/payouts", icon: CreditCard },
      { label: "Adjustments", href: "/admin/adjustments", icon: Settings },
    ],
  };

  const items = menuItems[user?.role || "user"];

  return (
    <>
      {/* Mobile Header */}
      <div className="flex justify-between p-2 bg-black md:hidden">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex-shrink-0"
        >
          <Logo size="md" />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

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

          {/* User Profile / Logout */}
          <div className="pt-8 border-t border-red-900/30 flex-shrink-0 relative">
            {user ? (
              <div className="relative">
                {/* Profile Image Button */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-red-900/10 rounded-lg transition"
                >
                  <img
                    src={user?.profilePic || "/download (5).jpeg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-red-600 object-cover"
                  />
                  <span className="font-medium">{user.name || "User"}</span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute bottom-16 left-4 bg-zinc-900 border border-red-800/40 rounded-lg shadow-lg w-52">
                    <div className="px-4 py-2 border-b border-red-900/40 text-gray-300 font-medium">
                      {user.name || "User"}
                    </div>
                    <button
                      onClick={Logout}
                      className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-900/10 w-full rounded-b-lg transition"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={Logout}
                className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 transition w-full rounded-lg hover:bg-red-900/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            )}
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
