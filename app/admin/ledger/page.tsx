"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Search,
} from "lucide-react";

interface LedgerEntry {
  id: string;
  userId: string;
  userName: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  balance: number;
}

const mockLedger: LedgerEntry[] = [
  {
    id: "1",
    userId: "user_001",
    userName: "John Doe",
    type: "credit",
    amount: 50000,
    description: "Monthly reward payout",
    date: "2024-01-15",
    balance: 250000,
  },
  {
    id: "2",
    userId: "user_002",
    userName: "Jane Smith",
    type: "debit",
    amount: 29900,
    description: "Product purchase",
    date: "2024-01-14",
    balance: 120000,
  },
  {
    id: "3",
    userId: "user_003",
    userName: "Mike Johnson",
    type: "credit",
    amount: 15000,
    description: "Referral bonus",
    date: "2024-01-13",
    balance: 350000,
  },
  {
    id: "4",
    userId: "user_004",
    userName: "Sarah Williams",
    type: "credit",
    amount: 75000,
    description: "Sales commission",
    date: "2024-01-12",
    balance: 425000,
  },
];

export default function LedgerPage() {
  const [ledger] = useState<LedgerEntry[]>(mockLedger);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = ledger.filter((entry) => {
    const matchesType = filterType === "all" || entry.type === filterType;
    const matchesSearch =
      entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.userId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

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
        <div className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            <div className="flex-1 min-w-64 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by username or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black border-red-500/20 text-white"
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex gap-2 flex-wrap">
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

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Entries</p>
              <p className="text-2xl font-bold text-white mt-1">
                {filtered.length}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Credits</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {formatCurrency(
                  filtered
                    .filter((e) => e.type === "credit")
                    .reduce((sum, e) => sum + e.amount, 0)
                )}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Debits</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {formatCurrency(
                  filtered
                    .filter((e) => e.type === "debit")
                    .reduce((sum, e) => sum + e.amount, 0)
                )}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Net Balance</p>
              <p className="text-2xl font-bold text-white mt-1">
                {formatCurrency(
                  filtered.reduce(
                    (sum, e) =>
                      sum + (e.type === "credit" ? e.amount : -e.amount),
                    0
                  )
                )}
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
                    key: "type",
                    label: "Type",
                    render: (value) => (
                      <Badge
                        className={
                          value === "credit"
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }
                      >
                        {value === "credit" ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {value}
                      </Badge>
                    ),
                  },
                  {
                    key: "amount",
                    label: "Amount",
                    render: (value, row) => (
                      <span
                        className={
                          row.type === "credit"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {row.type === "credit" ? "+" : "-"}
                        {formatCurrency(value)}
                      </span>
                    ),
                    sortable: true,
                  },
                  {
                    key: "description",
                    label: "Description",
                  },
                  {
                    key: "balance",
                    label: "Balance",
                    render: (value) => (
                      <span className="text-red-400 font-semibold">
                        {formatCurrency(value)}
                      </span>
                    ),
                  },
                  {
                    key: "date",
                    label: "Date",
                    render: (value) => formatDate(value),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
