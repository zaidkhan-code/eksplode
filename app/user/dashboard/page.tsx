"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import {
  TrendingUp,
  Users,
  Award,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Target,
  Zap,
} from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import useApi from "@/lib/useApi";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/components/Context/AuthContext";

export default function UserDashboard() {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pendingRewards: 0,
    availableBalance: 0,
    pendingBalance: 0,
    totalReferrals: 0,
    totalEarned: 0,
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = () => {
      useApi("user/dashboard", { method: "GET" }, (res, status) => {
        if (status) {
          setStats({
            pendingRewards: parseFloat(res.stats.pendingRewards || 0),
            availableBalance: parseFloat(res.stats.availableBalance || 0),
            pendingBalance: parseFloat(res.stats.pendingBalance || 0),
            totalReferrals: res.stats.totalReferrals || 0,
            totalEarned: parseFloat(res.stats.totalEarned || 0),
          });
          setRecentTransactions(res.recentTransactions || []);
          setLoading(false);
        }
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // every 5s
    return () => clearInterval(interval);
  }, []);

  const achievements = [
    {
      title: "First Purchase",
      description: "Made your first purchase",
      icon: Target,
    },
    {
      title: "Referral Master",
      description: "Referred 10+ users",
      icon: Users,
    },
    { title: "Power User", description: "100+ transactions", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title={`Welcome, ${user.name || "User"}!`}
        description="Here's your performance overview."
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Loader />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-5 gap-6">
              <Card className="bg-black border-red-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Pending Rewards
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(stats.pendingRewards)}
                    </p>
                  </div>
                  <Award className="w-12 h-12 text-red-500 opacity-20" />
                </div>
              </Card>

              <Card className="bg-black border-red-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Available Balance
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(stats.availableBalance)}
                    </p>
                  </div>
                  <Wallet className="w-12 h-12 text-green-400 opacity-20" />
                </div>
              </Card>

              <Card className="bg-black border-red-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Pending Balance
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(stats.pendingBalance)}
                    </p>
                  </div>
                  <Wallet className="w-12 h-12 text-orange-400 opacity-20" />
                </div>
              </Card>

              <Card className="bg-black border-red-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">
                      Total Referrals
                    </p>
                    <p className="text-3xl font-bold text-white">
                      {stats.totalReferrals}
                    </p>
                  </div>
                  <Users className="w-12 h-12 text-blue-400 opacity-20" />
                </div>
              </Card>

              <Card className="bg-black border-red-500/20 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Total Earned</p>
                    <p className="text-3xl font-bold text-white">
                      {formatCurrency(stats.totalEarned)}
                    </p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-yellow-400 opacity-20" />
                </div>
              </Card>
            </div>

            <div className=" w-full gap-6">
              <Card className="bg-black  w-full border-red-500/20">
                <CardHeader className="border-b border-red-500/20">
                  <CardTitle className="text-white flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {recentTransactions.length === 0 ? (
                    <p className="text-gray-400 text-center">
                      No recent transactions
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {recentTransactions.map((tx, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg ${
                                tx.type === "credit"
                                  ? "bg-green-600/20"
                                  : "bg-red-600/20"
                              }`}
                            >
                              {tx.type === "credit" ? (
                                <ArrowDownLeft className="w-4 h-4 text-green-400" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4 text-red-400" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {tx.notes || "Transaction"}
                              </p>
                              <p className="text-sm text-gray-400">
                                {formatDate(tx?.createdAt)}
                              </p>
                            </div>
                          </div>
                          <p
                            className={`font-bold ${
                              tx.type === "credit"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {tx.type === "credit" ? "+" : "-"}
                            {tx.amount && formatCurrency(tx.amount)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* 
              <Card className="bg-black border-red-500/20">
                <CardHeader className="border-b border-red-500/20">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="p-4 bg-black/50 rounded-lg border border-red-500/10 hover:border-red-500/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-yellow-600/20">
                            <achievement.icon className="w-5 h-5 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {achievement.title}
                            </p>
                            <p className="text-sm text-gray-400">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
