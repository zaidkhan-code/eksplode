"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react";
import { Header } from "@/components/ui/Navbar";
import { useAuth } from "@/components/Context/AuthContext";

export default function HomePage() {
  const { getStoredAuthData } = useAuth();
  const { accessToken, user } = getStoredAuthData();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-black to-red-950">
      {/* ✅ Header */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-full px-4 py-2 text-red-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Revolutionary Referral & Reward Platform
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Grow Your <span className="text-red-500">Network & Earnings</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            eksplode! DAC helps you share products, refer friends, and earn
            rewards instantly. Expand your network and watch your rewards grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href={accessToken ? `${user?.role}/dashboard` : "/auth/register"}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 w-full sm:w-auto bg-transparent"
              >
                {accessToken ? `Go to Your Dashboard` : "Join Now"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-8 hover:border-red-500/50 transition">
            <Users className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Referral Network
            </h3>
            <p className="text-gray-400">
              Share products, invite friends, and earn rewards for every
              successful referral.
            </p>
          </div>

          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-8 hover:border-red-500/50 transition">
            <TrendingUp className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Track Growth</h3>
            <p className="text-gray-400">
              Get real-time insights into your referrals, rewards, and network
              growth.
            </p>
          </div>

          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-8 hover:border-red-500/50 transition">
            <Zap className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Instant Rewards
            </h3>
            <p className="text-gray-400">
              Redeem rewards instantly with multiple payout options,
              hassle-free.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-12 space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Ready to Start Earning Rewards?
          </h2>
          <p className="text-red-100 text-lg">
            Join thousands of users growing their network and earning with
            eksplode! DAC
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="bg-black hover:bg-black/80 text-red-500 font-bold"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-900/30 bg-black/50 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Logo size="sm" />
            <div className="flex gap-8 text-gray-400 text-sm">
              <Link href="#" className="hover:text-red-500 transition">
                Privacy
              </Link>
              <Link href="#" className="hover:text-red-500 transition">
                Terms
              </Link>
              <Link href="#" className="hover:text-red-500 transition">
                Contact
              </Link>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 eksplode! DAC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
