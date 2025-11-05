"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import useApi from "@/lib/useApi";
import { Filter, Download, Search, CheckCircle, Clock } from "lucide-react";
import { Loader } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔁 Fetch orders from API
  useEffect(() => {
    const fetchOrders = () => {
      useApi("merchant/orders", { method: "GET" }, (res, status) => {
        if (status) {
          setOrders(res.orders);
        }
      });
    };
    fetchOrders();
    setLoading(false);
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Filter + Search
  const filtered = orders.filter((order) => {
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order?.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.buyerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.productId?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  const colums = [
    {
      key: "productId.name",
      label: "Product Name",
      render: (value, row) => (
        <span className="text-white font-medium">
          {row?.productId?.name || "N/A"}
        </span>
      ),
      sortable: true,
    },
    {
      key: "buyerName",
      label: "Buyer Name",
      render: (value) => (
        <span className="text-gray-300">{value || "Guest"}</span>
      ),
    },
    {
      key: "buyerEmail",
      label: "Buyer Email",
      render: (value) => <span className="text-gray-400 text-sm">{value}</span>,
    },
    {
      key: "grossCents",
      label: "Total Price",
      render: (value) => (
        <span className="text-red-400 font-semibold">
          {formatCurrency(value)}
        </span>
      ),
      sortable: true,
    },
    {
      key: "merchantNetCents",
      label: "Merchant Earnings",
      render: (value) => (
        <span className="text-green-400 font-semibold">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: "rewardCents",
      label: "Reward",
      render: (value) => (
        <span className="text-yellow-400 font-semibold">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: "platformFeeCents",
      label: "Platform Fee",
      render: (value) => (
        <span className="text-gray-400 font-semibold">
          {formatCurrency(value)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Badge
          className={`flex items-center gap-1 ${
            value === "completed"
              ? "bg-green-600 text-white"
              : "bg-yellow-600 text-white"
          }`}
        >
          {value === "completed" ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <Clock className="w-3 h-3" />
          )}
          {value}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => (
        <span className="text-gray-400">{formatDate(value)}</span>
      ),
      sortable: true,
    },
  ];
  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Orders"
        description="View and manage all your sales orders"
        action={
          <Button className="gap-2 bg-red-600 hover:bg-red-700">
            <Download className="w-4 h-4" />
            Export
          </Button>
        }
      />
      {loading ? (
        <Loader />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex-1 min-w-64 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by buyer or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-black border-red-500/20 text-white"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => setFilterStatus("all")}
                className={
                  filterStatus === "all"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                <Filter className="w-4 h-4" />
                All Orders
              </Button>
              <Button
                onClick={() => setFilterStatus("completed")}
                className={
                  filterStatus === "completed"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                Completed
              </Button>
              <Button
                onClick={() => setFilterStatus("pending")}
                className={
                  filterStatus === "pending"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                Pending
              </Button>
            </div>

            {/* Orders Table */}
            <Card className="bg-black border-red-500/20">
              <CardContent className="p-0">
                <DataTable data={filtered} columns={colums} />
              </CardContent>
            </Card>
          </div>
        </main>
      )}
    </div>
  );
}
