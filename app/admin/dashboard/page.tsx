"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { Users, TrendingUp, Wallet, AlertCircle, Activity, Clock } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,234", icon: Users, color: "text-blue-400" },
    { label: "Total Sales", value: "$45,230", icon: TrendingUp, color: "text-green-400" },
    { label: "Pending Payouts", value: "$8,500", icon: Wallet, color: "text-yellow-400" },
    { label: "Pending Rewards", value: "$12,750", icon: AlertCircle, color: "text-orange-400" },
  ]

  const systemStatus = [
    { label: "Database", status: "Healthy", uptime: "99.9%" },
    { label: "Payment Gateway", status: "Healthy", uptime: "99.8%" },
    { label: "Email Service", status: "Healthy", uptime: "99.7%" },
    { label: "API Server", status: "Healthy", uptime: "99.95%" },
  ]

  const recentActivity = [
    { id: 1, type: "user_signup", description: "New user registered", user: "Sarah Johnson", time: "5 minutes ago" },
    { id: 2, type: "payout", description: "Payout processed", user: "John Doe", time: "15 minutes ago" },
    { id: 3, type: "transaction", description: "Large transaction", user: "Mike Smith", time: "1 hour ago" },
    { id: 4, type: "merchant_join", description: "New merchant joined", user: "Tech Store Pro", time: "2 hours ago" },
  ]

  const topMetrics = [
    { label: "Active Users (24h)", value: "456", change: "+12%" },
    { label: "Transaction Volume", value: "$125,450", change: "+8%" },
    { label: "New Merchants", value: "23", change: "+5%" },
    { label: "Avg Transaction", value: formatCurrency((45230 * 100) / 456), change: "+3%" },
  ]

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Admin Dashboard" description="System overview and management tools." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Main Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color} opacity-20`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* System Status */}
            <Card className="bg-black border-red-500/20">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {systemStatus.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">{item.label}</p>
                        <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm font-medium">
                          {item.status}
                        </span>
                      </div>
                      <div className="w-full bg-red-900/20 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: item.uptime }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Uptime: {item.uptime}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-black border-red-500/20">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-medium">{activity.description}</p>
                          <p className="text-sm text-gray-400">{activity.user}</p>
                        </div>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Metrics */}
          <div className="grid md:grid-cols-4 gap-6">
            {topMetrics.map((metric, i) => (
              <Card key={i} className="bg-black border-red-500/20 p-6">
                <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
                <p className="text-2xl font-bold text-white mb-2">{metric.value}</p>
                <p className="text-sm text-green-400 font-semibold">{metric.change}</p>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="bg-black border-red-500/20 p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <button className="p-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition">
                View All Users
              </button>
              <button className="p-4 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-400 font-medium transition">
                Manage Merchants
              </button>
              <button className="p-4 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-green-400 font-medium transition">
                Process Payouts
              </button>
              <button className="p-4 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium transition">
                View Reports
              </button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
