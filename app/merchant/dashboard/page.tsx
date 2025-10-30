"use client"

import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/page-header"
import { TrendingUp, ShoppingBag, Award } from "lucide-react"

export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Merchant Dashboard" description="Manage your products and track sales performance." />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Sales</p>
                  <p className="text-3xl font-bold text-white">$12,500</p>
                </div>
                <TrendingUp className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Products</p>
                  <p className="text-3xl font-bold text-white">8</p>
                </div>
                <ShoppingBag className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </Card>

            <Card className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Rewards Earned</p>
                  <p className="text-3xl font-bold text-green-400">$2,100</p>
                </div>
                <Award className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Products Table */}
          <Card className="bg-black border-red-500/20 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Your Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-red-500/20">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Product</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Sales</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-b border-red-500/10 hover:bg-red-900/10 transition">
                      <td className="py-3 px-4 text-white">Product {i}</td>
                      <td className="py-3 px-4 text-white">${(i * 10).toFixed(2)}</td>
                      <td className="py-3 px-4 text-white">{i * 5}</td>
                      <td className="py-3 px-4 text-green-400 font-bold">${(i * 50).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
