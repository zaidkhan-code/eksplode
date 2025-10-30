"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { TrendingUp, Users, Award, Wallet } from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Dashboard" description="Welcome back! Here's your performance overview." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Pending Rewards</p>
                  <p className="text-3xl font-bold text-white">$1,250</p>
                </div>
                <Award className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Available Rewards</p>
                  <p className="text-3xl font-bold text-green-400">$3,500</p>
                </div>
                <Wallet className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Referrals</p>
                  <p className="text-3xl font-bold text-white">42</p>
                </div>
                <Users className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Earned</p>
                  <p className="text-3xl font-bold text-white">$8,750</p>
                </div>
                <TrendingUp className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-black border-red-500/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                >
                  <div>
                    <p className="text-white font-medium">Product Purchase Reward</p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                  <p className="text-green-400 font-bold">+$250</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
