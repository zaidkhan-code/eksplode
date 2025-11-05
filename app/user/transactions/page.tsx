"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Download, Filter, TrendingUp, TrendingDown } from "lucide-react";
import useApi from "@/lib/useApi";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";

export default function TransactionsPage() {
  const [transactionList, setTransactionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    setLoading(true);
    useApi(
      "user/transactions", // API endpoint
      { method: "GET" },
      (res, status) => {
        if (status) {
          setTransactionList(res?.transactions || []);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(res?.message || "Failed to fetch transactions");
        }
      }
    );
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "credit":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "debit":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
    }
  };

  const filtered =
    filterType === "all"
      ? transactionList
      : transactionList.filter((t) => t.type === filterType);

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
        {/* Filter Buttons */}
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
          {["credit", "debit"].map((type) => (
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

        {/* Transaction Cards */}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-4">
            {filtered.length > 0 ? (
              filtered.map((transaction) => (
                <Card
                  key={transaction._id}
                  className="bg-black border-red-500/20 hover:border-red-500/40 transition"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-red-900/20 rounded-lg">
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-white truncate">
                            {transaction.notes || "Transaction"}
                          </p>
                          <p className="text-sm text-gray-400">
                            {new Date(transaction.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <p
                            className={`text-lg font-bold ${
                              transaction.type === "credit"
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"} $
                            {transaction.amountCents.toFixed(2)}
                          </p>
                          <Badge
                            className={`${getStatusColor(
                              transaction.status
                            )} border`}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                No transactions found
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
