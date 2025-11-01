"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, CheckCircle, Clock, X, Search } from "lucide-react";

interface Payout {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  method: "bank_transfer" | "stripe" | "paypal";
  status: "completed" | "pending" | "failed";
  date: string;
  reference: string;
}

const mockPayouts: Payout[] = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    amount: 50000,
    method: "bank_transfer",
    status: "completed",
    date: "2024-01-15",
    reference: "TXN-2024-001",
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Jane Smith",
    amount: 30000,
    method: "stripe",
    status: "pending",
    date: "2024-01-14",
    reference: "TXN-2024-002",
  },
  {
    id: "3",
    userId: "user_003",
    userName: "Mike Johnson",
    amount: 75000,
    method: "paypal",
    status: "completed",
    date: "2024-01-13",
    reference: "TXN-2024-003",
  },
  {
    id: "4",
    userId: "user_004",
    userName: "Sarah Williams",
    amount: 45000,
    method: "bank_transfer",
    status: "failed",
    date: "2024-01-12",
    reference: "TXN-2024-004",
  },
];

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>(mockPayouts);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    amount: "",
    method: "bank_transfer" as "bank_transfer" | "stripe" | "paypal",
  });

  const filtered = payouts.filter(
    (payout) =>
      payout.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayout: Payout = {
      id: String(payouts.length + 1),
      userId: formData.userId,
      userName: formData.userName,
      amount: Number(formData.amount) * 100,
      method: formData.method,
      status: "pending",
      date: new Date().toISOString().split("T")[0],
      reference: `TXN-${Date.now()}`,
    };
    setPayouts([newPayout, ...payouts]);
    setFormData({
      userId: "",
      userName: "",
      amount: "",
      method: "bank_transfer",
    });
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Payouts"
        description="Manage user payouts and transfers"
        action={
          <Button
            onClick={() => setShowModal(true)}
            className="gap-2 bg-red-600 hover:bg-red-700"
          >
            <Plus className="w-4 h-4" />
            New Payout
          </Button>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by username or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black border-red-500/20 text-white"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Payouts</p>
              <p className="text-2xl font-bold text-white mt-1">
                {payouts.length}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {payouts.filter((p) => p.status === "completed").length}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">
                {payouts.filter((p) => p.status === "pending").length}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {formatCurrency(payouts.reduce((sum, p) => sum + p.amount, 0))}
              </p>
            </Card>
          </div>

          <Card className="bg-black border-red-500/20">
            <CardContent className="p-0">
              <DataTable
                data={filtered}
                columns={[
                  {
                    key: "userName",
                    label: "User Name",
                    sortable: true,
                  },
                  {
                    key: "userId",
                    label: "User ID",
                  },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (value) => (
                      <span className="text-red-400 font-semibold">
                        {formatCurrency(value)}
                      </span>
                    ),
                    sortable: true,
                  },
                  {
                    key: "method",
                    label: "Method",
                    render: (value) => (
                      <Badge className="bg-blue-600/20 text-blue-400 border border-blue-500/30">
                        {value.replace("_", " ").toUpperCase()}
                      </Badge>
                    ),
                  },
                  {
                    key: "status",
                    label: "Status",
                    render: (value) => (
                      <div className="flex items-center gap-2">
                        {getStatusIcon(value)}
                        <Badge
                          className={
                            value === "completed"
                              ? "bg-green-600 text-white"
                              : value === "pending"
                              ? "bg-yellow-600 text-white"
                              : "bg-red-600 text-white"
                          }
                        >
                          {value}
                        </Badge>
                      </div>
                    ),
                  },
                  {
                    key: "date",
                    label: "Date",
                    render: (value) => formatDate(value),
                  },
                  {
                    key: "reference",
                    label: "Reference",
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Payout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-black border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-red-500/20 flex flex-row items-center justify-between">
              <CardTitle className="text-white">Create New Payout</CardTitle>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">
                    User ID
                  </label>
                  <Input
                    placeholder="user_001"
                    value={formData.userId}
                    onChange={(e) =>
                      setFormData({ ...formData, userId: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    User Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.userName}
                    onChange={(e) =>
                      setFormData({ ...formData, userName: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Amount ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Payment Method
                  </label>
                  <select
                    value={formData.method}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        method: e.target.value as any,
                      })
                    }
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
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Create Payout
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
