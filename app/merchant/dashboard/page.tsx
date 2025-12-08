"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ShoppingBag, Star, Slash, Award } from "lucide-react";
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
      label: "Total Products",
      value: data?.stats?.totalProducts || 0,
      icon: ShoppingBag,
      color: "text-blue-400",
    },
    {
      label: "Active Products",
      value: data?.stats?.activeProducts || 0,
      icon: Star,
      color: "text-green-400",
    },
    {
      label: "Inactive Products",
      value: data?.stats?.inactiveProducts || 0,
      icon: Slash,
      color: "text-yellow-400",
    },
    {
      label: "Total Rewarded Sharings",
      value: data?.stats?.totalRewardedSharings || 0,
      icon: Award,
      color: "text-red-400",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Merchant Dashboard"
        description="View your product stats and rewarded sharings."
      />
      {loading ? (
        <Loader />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        </main>
      )}
    </div>
  );
}
