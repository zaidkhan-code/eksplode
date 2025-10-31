"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/Context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-red-500/30 shadow-2xl">
        <div className="p-8 space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <Logo size="lg" />
          </div>

          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your eksplode! account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-600 focus:border-red-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-600 focus:border-red-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-white transition">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-red-500/30 bg-black/50"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-red-500 hover:text-red-400 transition"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-red-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">
                New to Eksplode?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link href="/auth/register">
            <Button
              variant="outline"
              className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
            >
              Create Account
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
