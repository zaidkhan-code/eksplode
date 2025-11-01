"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import {
  TrendingUp,
  ShoppingBag,
  Award,
  ShoppingCart,
  Star,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function MerchantDashboard() {
  const stats = [
    {
      label: "Total Sales",
      value: "$12,500",
      icon: TrendingUp,
      color: "text-red-500",
    },
    {
      label: "Total Products",
      value: "8",
      icon: ShoppingBag,
      color: "text-blue-400",
    },
    {
      label: "Rewards Earned",
      value: "$2,100",
      icon: Award,
      color: "text-green-400",
    },
    {
      label: "Store Rating",
      value: "4.8",
      icon: Star,
      color: "text-yellow-400",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Premium Package",
      price: 99.99,
      sales: 45,
      revenue: 4499.55,
      views: 1200,
      rating: 4.9,
    },
    {
      id: 2,
      name: "Starter Bundle",
      price: 49.99,
      sales: 82,
      revenue: 4099.18,
      views: 2100,
      rating: 4.7,
    },
    {
      id: 3,
      name: "Enterprise Plan",
      price: 199.99,
      sales: 23,
      revenue: 4599.77,
      views: 890,
      rating: 4.8,
    },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      amount: 99.99,
      status: "completed",
      date: "2 hours ago",
    },
    {
      id: "ORD-002",
      customer: "Jane Smith",
      amount: 49.99,
      status: "pending",
      date: "4 hours ago",
    },
    {
      id: "ORD-003",
      customer: "Mike Johnson",
      amount: 199.99,
      status: "completed",
      date: "1 day ago",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Merchant Dashboard"
        description="Manage your products and track sales performance."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card
                key={i}
                className="bg-black border-red-500/20 p-6 hover:border-red-500/40 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`w-12 h-12 ${stat.color} opacity-20`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Products */}
            <Card className="bg-black border-red-500/20">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-blue-400" />
                  Top Products
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {formatCurrency(product.price * 100)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-semibold">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div>
                          <p className="text-gray-400">Sales</p>
                          <p className="text-white font-bold">
                            {product.sales}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Revenue</p>
                          <p className="text-green-400 font-bold">
                            {formatCurrency(product.revenue * 100)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400">Views</p>
                          <p className="text-white font-bold">
                            {product.views}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="bg-black border-red-500/20">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">{order.id}</p>
                          <p className="text-sm text-gray-400">
                            {order.customer}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === "completed"
                              ? "bg-green-900/30 text-green-400"
                              : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm">{order.date}</p>
                        <p className="text-red-400 font-bold">
                          {formatCurrency(order.amount * 100)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black border-red-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Conversion Rate</p>
              <p className="text-3xl font-bold text-white mb-2">12.5%</p>
              <div className="w-full bg-red-900/20 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: "125%" }}
                ></div>
              </div>
            </Card>
            <Card className="bg-black border-red-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Avg Order Value</p>
              <p className="text-3xl font-bold text-white mb-2">
                {formatCurrency(11666.5 * 100)}
              </p>
              <p className="text-sm text-gray-400">+5% from last month</p>
            </Card>
            <Card className="bg-black border-red-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">
                Customer Satisfaction
              </p>
              <p className="text-3xl font-bold text-white mb-2">96%</p>
              <p className="text-sm text-gray-400">Based on 234 reviews</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
