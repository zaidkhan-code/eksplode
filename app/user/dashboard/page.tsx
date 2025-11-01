"use client";

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
import { formatCurrency } from "@/lib/utils";

export default function UserDashboard() {
  const stats = [
    {
      label: "Pending Rewards",
      value: "$1,250",
      icon: Award,
      color: "text-red-500",
    },
    {
      label: "Available Balance",
      value: "$3,500",
      icon: Wallet,
      color: "text-green-400",
    },
    {
      label: "Total Referrals",
      value: "42",
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Total Earned",
      value: "$8,750",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "credit",
      description: "Product Purchase Reward",
      amount: 250,
      date: "2 hours ago",
    },
    {
      id: 2,
      type: "debit",
      description: "Product Purchase",
      amount: -150,
      date: "5 hours ago",
    },
    {
      id: 3,
      type: "credit",
      description: "Referral Bonus",
      amount: 100,
      date: "1 day ago",
    },
    {
      id: 4,
      type: "credit",
      description: "Monthly Reward",
      amount: 500,
      date: "2 days ago",
    },
  ];

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
        title="Dashboard"
        description="Welcome back! Here's your performance overview."
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
            {/* Recent Transactions */}
            <Card className="bg-black border-red-500/20">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
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
                            {tx.description}
                          </p>
                          <p className="text-sm text-gray-400">{tx.date}</p>
                        </div>
                      </div>
                      <p
                        className={`font-bold ${
                          tx.type === "credit"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {tx.type === "credit" ? "+" : ""}
                        {formatCurrency(tx.amount * 100)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
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
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-black border-red-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Conversion Rate</p>
              <p className="text-3xl font-bold text-white mb-2">8.5%</p>
              <div className="w-full bg-red-900/20 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </Card>
            <Card className="bg-black border-red-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Reward Points</p>
              <p className="text-3xl font-bold text-white mb-2">2,450</p>
              <p className="text-sm text-gray-400">+250 this month</p>
            </Card>
            <Card className="bg-black border-red-500/20 p-6">
              <p className="text-gray-400 text-sm mb-2">Account Level</p>
              <p className="text-3xl font-bold text-white mb-2">Gold</p>
              <p className="text-sm text-gray-400">Next: Platinum</p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
