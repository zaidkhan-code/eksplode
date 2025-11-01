"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/components/Context/AuthContext";
import { User, LogOut, Menu, X } from "lucide-react";

export const Header = () => {
  const { user, Logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href={"/"}>
          {" "}
          <Logo size="md" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link
            href="/products"
            className="text-white hover:text-red-500 transition"
          >
            Products
          </Link>

          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="text-white hover:text-red-500 transition"
              >
                Login
              </Link>
              <Link href="/auth/register">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <User className="w-5 h-5 text-red-500" />
                <span>{user?.name || "User"}</span>
              </div>
              <Button
                onClick={Logout}
                size="sm"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-red-900/40 px-4 pb-4 space-y-3 animate-fadeIn">
          <Link
            href="/products"
            className="block text-white hover:text-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          {!user ? (
            <>
              <Link
                href="/auth/login"
                className="block text-white hover:text-red-500 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/auth/register" onClick={() => setMenuOpen(false)}>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-3 text-white">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-red-500" />
                <span>{user?.name || "User"}</span>
              </div>
              <Button
                onClick={() => {
                  Logout();
                  setMenuOpen(false);
                }}
                size="sm"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
