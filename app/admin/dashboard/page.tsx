"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Users, TrendingUp, Wallet, AlertCircle } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Admin Dashboard" description="System overview and management tools." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-white">1,234</p>
                </div>
                <Users className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Sales</p>
                  <p className="text-3xl font-bold text-white">$45,230</p>
                </div>
                <TrendingUp className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pending Payouts</p>
                  <p className="text-3xl font-bold text-yellow-400">$8,500</p>
                </div>
                <Wallet className="w-12 h-12 text-yellow-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pending Rewards</p>
                  <p className="text-3xl font-bold text-orange-400">$12,750</p>
                </div>
                <AlertCircle className="w-12 h-12 text-orange-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* System Status */}
          <Card className="bg-black border-red-500/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">System Status</h2>
            <div className="space-y-4">
              {[
                { label: "Database", status: "Healthy" },
                { label: "Payment Gateway", status: "Healthy" },
                { label: "Email Service", status: "Healthy" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                >
                  <p className="text-white font-medium">{item.label}</p>
                  <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-medium">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
