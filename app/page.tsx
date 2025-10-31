import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-950">
      {/* Navigation */}
      <nav className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Logo size="md" />
          <div className="hidden md:flex gap-8">
            <Link
              href="/products"
              className="text-white hover:text-red-500 transition"
            >
              Products
            </Link>
            <Link
              href="/auth/login"
              className="text-white hover:text-red-500 transition"
            >
              Login
            </Link>
          </div>
          <Link href="/auth/register">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center gap-2 bg-red-900/20 border border-red-500/30 rounded-full px-4 py-2 text-red-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              Revolutionary Digital Ad Platform
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Explosive Growth for Your{" "}
            <span className="text-red-500">Business</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            eksplode! DAC is the ultimate digital referral and reward platform.
            Earn rewards, share products, and grow your network exponentially.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
              >
                Explore Products <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500/10 w-full sm:w-auto bg-transparent"
              >
                Join Now
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
              Build your network and earn rewards for every successful referral.
            </p>
          </div>

          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-8 hover:border-red-500/50 transition">
            <TrendingUp className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Track Growth</h3>
            <p className="text-gray-400">
              Real-time analytics and insights into your earnings and referrals.
            </p>
          </div>

          <div className="bg-red-900/10 border border-red-500/20 rounded-lg p-8 hover:border-red-500/50 transition">
            <Zap className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Instant Rewards
            </h3>
            <p className="text-gray-400">
              Earn and withdraw rewards instantly with multiple payment options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-12 space-y-6">
          <h2 className="text-4xl font-bold text-white">Ready to Explode?</h2>
          <p className="text-red-100 text-lg">
            Join thousands of users earning rewards with eksplode! DAC
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
      <footer className="border-t border-red-900/30 bg-black/50 py-12">
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
