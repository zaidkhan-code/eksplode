"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { Filter, Download, TrendingUp, TrendingDown } from "lucide-react"

interface LedgerEntry {
  id: string
  userId: string
  userName: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: string
  balance: number
}

const mockLedger: LedgerEntry[] = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    type: "credit",
    amount: 500,
    description: "Monthly reward payout",
    date: "2024-01-15",
    balance: 2500,
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Jane Smith",
    type: "debit",
    amount: 299,
    description: "Product purchase",
    date: "2024-01-14",
    balance: 1200,
  },
  {
    id: "3",
    userId: "user_003",
    userName: "Mike Johnson",
    type: "credit",
    amount: 150,
    description: "Referral bonus",
    date: "2024-01-13",
    balance: 3500,
  },
]

export default function LedgerPage() {
  const [ledger] = useState<LedgerEntry[]>(mockLedger)
  const [filterType, setFilterType] = useState<string>("all")

  const filtered = filterType === "all" ? ledger : ledger.filter((e) => e.type === filterType)

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Ledger"
        description="View all system transactions"
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
            onClick={() => setFilterType("all")}
            className={
              filterType === "all"
                ? "bg-red-600 hover:bg-red-700"
                : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
            }
          >
            <Filter className="w-4 h-4" />
            All Entries
          </Button>
          <Button
            onClick={() => setFilterType("credit")}
            className={
              filterType === "credit"
                ? "bg-red-600 hover:bg-red-700"
                : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
            }
          >
            Credits
          </Button>
          <Button
            onClick={() => setFilterType("debit")}
            className={
              filterType === "debit"
                ? "bg-red-600 hover:bg-red-700"
                : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
            }
          >
            Debits
          </Button>
        </div>

        {/* Ledger Table */}
        <Card className="bg-black border-red-500/20">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-red-500/20 bg-black/50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Amount</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Description</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Balance</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((entry) => (
                    <tr key={entry.id} className="border-b border-red-500/10 hover:bg-red-900/10 transition-colors">
                      <td className="px-6 py-4 text-sm text-white">{entry.userName}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge
                          className={entry.type === "credit" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                        >
                          {entry.type === "credit" ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {entry.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        <span className={entry.type === "credit" ? "text-green-400" : "text-red-400"}>
                          {entry.type === "credit" ? "+" : "-"}${entry.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{entry.description}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-red-400">${entry.balance}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
