"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { Download, Filter, TrendingUp, TrendingDown } from "lucide-react"

interface Transaction {
  id: string
  type: "reward" | "purchase" | "referral" | "payout"
  amount: number
  description: string
  date: string
  status: "completed" | "pending" | "failed"
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "reward",
    amount: 50,
    description: "Reward from product purchase",
    date: "2024-01-15",
    status: "completed",
  },
  {
    id: "2",
    type: "referral",
    amount: 100,
    description: "Referral bonus - User joined",
    date: "2024-01-14",
    status: "completed",
  },
  {
    id: "3",
    type: "purchase",
    amount: -299,
    description: "Product purchase - Premium Package",
    date: "2024-01-13",
    status: "completed",
  },
  {
    id: "4",
    type: "payout",
    amount: 500,
    description: "Monthly payout",
    date: "2024-01-10",
    status: "pending",
  },
]

export default function TransactionsPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [filterType, setFilterType] = useState<string>("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <TrendingUp className="w-5 h-5 text-green-400" />
      case "purchase":
        return <TrendingDown className="w-5 h-5 text-red-400" />
      case "referral":
        return <TrendingUp className="w-5 h-5 text-blue-400" />
      case "payout":
        return <TrendingUp className="w-5 h-5 text-purple-400" />
      default:
        return null
    }
  }

  const filtered = filterType === "all" ? transactions : transactions.filter((t) => t.type === filterType)

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Transaction History"
        description="View all your transactions and payouts"
        action={
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <Download className="w-4 h-4" />
            Export
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            onClick={() => setFilterType("all")}
            className={
              filterType === "all"
                ? "bg-red-600 hover:bg-red-700"
                : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
            }
          >
            <Filter className="w-4 h-4" />
            All
          </Button>
          {["reward", "purchase", "referral", "payout"].map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "default" : "outline"}
              onClick={() => setFilterType(type)}
              className={
                filterType === type
                  ? "bg-red-600 hover:bg-red-700"
                  : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20 capitalize"
              }
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Transactions Grid */}
        <div className="grid gap-4">
          {filtered.map((transaction) => (
            <Card key={transaction.id} className="bg-black border-red-500/20 hover:border-red-500/40 transition">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-red-900/20 rounded-lg">{getTypeIcon(transaction.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">{transaction.description}</p>
                      <p className="text-sm text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                        {transaction.amount > 0 ? "+" : ""} ${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                      <Badge className={`${getStatusColor(transaction.status)} border`}>{transaction.status}</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
