"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { Plus, CheckCircle, Clock, X } from "lucide-react"

interface Payout {
  id: string
  userId: string
  userName: string
  amount: number
  method: "bank_transfer" | "stripe" | "paypal"
  status: "completed" | "pending" | "failed"
  date: string
  reference: string
}

const mockPayouts: Payout[] = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    amount: 500,
    method: "bank_transfer",
    status: "completed",
    date: "2024-01-15",
    reference: "TXN-2024-001",
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Jane Smith",
    amount: 300,
    method: "stripe",
    status: "pending",
    date: "2024-01-14",
    reference: "TXN-2024-002",
  },
  {
    id: "3",
    userId: "user_003",
    userName: "Mike Johnson",
    amount: 750,
    method: "paypal",
    status: "completed",
    date: "2024-01-13",
    reference: "TXN-2024-003",
  },
]

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    amount: "",
    method: "bank_transfer" as "bank_transfer" | "stripe" | "paypal",
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      default:
        return null
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPayout: Payout = {
      id: String(payouts.length + 1),
      userId: formData.userId,
      userName: formData.userName,
      amount: Number(formData.amount),
      method: formData.method,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      reference: `TXN-${Date.now()}`,
    }
    setPayouts([newPayout, ...payouts])
    setFormData({ userId: "", userName: "", amount: "", method: "bank_transfer" })
    setShowModal(false)
  }

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Payouts"
        description="Manage user payouts and transfers"
        action={
          <Button onClick={() => setShowModal(true)} className="gap-2 bg-red-600 hover:bg-red-700">
            <Plus className="w-4 h-4" />
            New Payout
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-4">
          {payouts.map((payout) => (
            <Card key={payout.id} className="bg-black border-red-500/20 hover:border-red-500/40 transition">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-1">
                      <p className="font-semibold text-white truncate">{payout.userName}</p>
                      <p className="text-sm text-gray-400">{payout.reference}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Method: {payout.method.replace("_", " ").toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-lg font-bold text-red-500">${payout.amount}</p>
                      <p className="text-xs text-gray-400">{payout.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payout.status)}
                      <Badge
                        className={
                          payout.status === "completed" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                        }
                      >
                        {payout.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Payout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-black border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-red-500/20 flex flex-row items-center justify-between">
              <CardTitle className="text-white">Create New Payout</CardTitle>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">User ID</label>
                  <Input
                    placeholder="user_001"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">User Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">Payment Method</label>
                  <select
                    value={formData.method}
                    onChange={(e) => setFormData({ ...formData, method: e.target.value as any })}
                    className="mt-2 w-full p-2 bg-black border border-red-500/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                    Create Payout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
