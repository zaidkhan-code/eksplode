"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/components/Context/AuthContext"; // ✅ import context

export default function RegisterPage() {
  const { register, isLoading } = useAuth(); // ✅ get register from context
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role,
    });
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
            <h1 className="text-3xl font-bold text-white">Join eksplode!</h1>
            <p className="text-gray-400">
              Create your account and start earning
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">I am a</label>
              <div className="grid grid-cols-2 gap-2">
                {["user", "merchant"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-4 rounded-lg font-medium transition ${
                      role === r
                        ? "bg-red-600 text-white"
                        : "bg-black/50 border border-red-500/30 text-gray-400 hover:border-red-500"
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-600 focus:border-red-500"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-600 focus:border-red-500"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="bg-black/50 border-red-500/30 text-white placeholder:text-gray-600 focus:border-red-500"
                required
              />
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer hover:text-white transition">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-red-500/30 bg-black/50"
                required
              />
              I agree to the Terms of Service
            </label>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-red-500 hover:text-red-400 transition font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
