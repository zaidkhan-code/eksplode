"use client";

import { useEffect, useState } from "react";
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
import useApi from "@/lib/useApi";
import Loader from "@/components/ui/Loader";

export default function MerchantDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch every 5 seconds
  useEffect(() => {
    const fetchData = () => {
      useApi("merchant/dashboard", { method: "GET" }, (res, status) => {
        if (!status) return;
        setData(res);
        setLoading(false);
      });
    };

    fetchData(); // initial call
    const interval = setInterval(fetchData, 5000); // every 5s
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: "Total Sales",
      value: formatCurrency(data?.stats?.totalSales),
      icon: TrendingUp,
      color: "text-red-500",
    },
    {
      label: "Total Products",
      value: data?.stats?.totalProducts,
      icon: ShoppingBag,
      color: "text-blue-400",
    },
    {
      label: "Total Earnings",
      value: formatCurrency(data?.stats?.totalEarnings),
      icon: Award,
      color: "text-green-400",
    },
    {
      label: "Active Products",
      value: data?.stats?.activeProducts,
      icon: Star,
      color: "text-yellow-400",
    },
  ];

  const recentOrders = data?.recentOrders || [];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Merchant Dashboard"
        description="Manage your products and track sales performance."
      />
      {loading ? (
        <Loader />
      ) : (
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
                    <stat.icon
                      className={`w-12 h-12 ${stat.color} opacity-20`}
                    />
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Orders */}
            {/* <Card className="bg-black border-red-500/20">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {recentOrders.length === 0 ? (
                  <p className="text-gray-400 text-sm">No recent orders yet.</p>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-white font-medium">
                              {order.buyerEmail}
                            </p>
                            <p className="text-sm text-gray-400">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400">
                            Completed
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-400 text-sm">Net Earnings</p>
                          <p className="text-red-400 font-bold">
                            {formatCurrency(order?.merchantNetCents)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card> */}
          </div>
        </main>
      )}
    </div>
  );
}
