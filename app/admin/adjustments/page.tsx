"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { Plus, Minus } from "lucide-react"

interface Adjustment {
  id: string
  userId: string
  userName: string
  type: "add" | "subtract"
  amount: number
  reason: string
  date: string
  admin: string
}

const mockAdjustments: Adjustment[] = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    type: "add",
    amount: 100,
    reason: "Bonus for referral",
    date: "2024-01-15",
    admin: "Admin User",
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Jane Smith",
    type: "subtract",
    amount: 50,
    reason: "Chargeback reversal",
    date: "2024-01-14",
    admin: "Admin User",
  },
]

export default function AdjustmentsPage() {
  const [adjustments, setAdjustments] = useState<Adjustment[]>(mockAdjustments)
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    type: "add" as "add" | "subtract",
    amount: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAdjustment: Adjustment = {
      id: String(adjustments.length + 1),
      userId: formData.userId,
      userName: formData.userName,
      type: formData.type,
      amount: Number(formData.amount),
      reason: formData.reason,
      date: new Date().toISOString().split("T")[0],
      admin: "Current Admin",
    }
    setAdjustments([newAdjustment, ...adjustments])
    setFormData({ userId: "", userName: "", type: "add", amount: "", reason: "" })
  }

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Manual Adjustments" description="Add or subtract user balances" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <Card className="lg:col-span-1 bg-black border-red-500/20">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white">New Adjustment</CardTitle>
              <CardDescription className="text-gray-400">Add or subtract user balance</CardDescription>
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
                  <label className="text-sm font-medium text-white">Type</label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: "add" })}
                      className={
                        formData.type === "add"
                          ? "flex-1 gap-2 bg-red-600 hover:bg-red-700"
                          : "flex-1 gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                      }
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: "subtract" })}
                      className={
                        formData.type === "subtract"
                          ? "flex-1 gap-2 bg-red-600 hover:bg-red-700"
                          : "flex-1 gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                      }
                    >
                      <Minus className="w-4 h-4" />
                      Subtract
                    </Button>
                  </div>
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
                  <label className="text-sm font-medium text-white">Reason</label>
                  <textarea
                    placeholder="Enter reason for adjustment"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-2 w-full p-3 border border-red-500/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                    rows={3}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Apply Adjustment
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* History */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-white">Recent Adjustments</h3>
            {adjustments.map((adjustment) => (
              <Card key={adjustment.id} className="bg-black border-red-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`p-2 rounded-lg ${adjustment.type === "add" ? "bg-green-900/30" : "bg-red-900/30"}`}
                      >
                        {adjustment.type === "add" ? (
                          <Plus className="w-5 h-5 text-green-400" />
                        ) : (
                          <Minus className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{adjustment.userName}</p>
                        <p className="text-sm text-gray-400 truncate">{adjustment.reason}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className={`text-lg font-bold ${adjustment.type === "add" ? "text-green-400" : "text-red-400"}`}
                      >
                        {adjustment.type === "add" ? "+" : "-"}${adjustment.amount}
                      </p>
                      <p className="text-xs text-gray-400">{adjustment.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
