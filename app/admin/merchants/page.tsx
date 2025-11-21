"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Store, TrendingUp, Filter, Eye } from "lucide-react";
import useApi from "@/lib/useApi";
import { toast } from "sonner";
import MerchantViewModal from "@/components/Admin/merchent/MerchantViewModal";

interface Merchant {
  _id: string;
  name: string;
  email: string;
  profilePic?: string | null;
  status: "active" | "inactive" | "suspended";
  balance: { available: number; pending: number };
  totalProducts: number;
  totalOrder: number;
  totalSales: number; // Gross sales
  totalRevenue: number; // Merchant earnings
  createdAt: string;
}

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  const fetchMerchants = () => {
    setLoading(true);
    let url = `admin/merchants?page=${page}&limit=${pageSize}`;
    if (searchTerm) url += `&search=${searchTerm}`;
    if (filterStatus !== "all") url += `&status=${filterStatus}`;

    useApi(url, { method: "GET" }, (res: any, success: boolean) => {
      setLoading(false);
      if (success) {
        setMerchants(res.merchants);
        setPage(res.currentPage);
        setTotalPages(res.totalPages);
      } else toast.error(res?.message || "Failed to fetch merchants!");
    });
  };

  useEffect(() => {
    fetchMerchants();
  }, [page, searchTerm, filterStatus]);

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Merchants"
        description="Manage all platform merchants"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search + Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black border-red-500/20 text-white"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={() => setFilterStatus("all")}
                className={
                  filterStatus === "all"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                <Filter className="w-4 h-4 mr-1" /> All
              </Button>
              <Button
                onClick={() => setFilterStatus("active")}
                className={
                  filterStatus === "active"
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-green-500/30 text-gray-400 hover:text-white hover:bg-green-900/20"
                }
              >
                Active
              </Button>
              <Button
                onClick={() => setFilterStatus("inactive")}
                className={
                  filterStatus === "inactive"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "border-yellow-500/30 text-gray-400 hover:text-white hover:bg-yellow-900/20"
                }
              >
                Inactive
              </Button>
            </div>
          </div>

          <DataTable
            data={merchants}
            loading={loading}
            columns={[
              { key: "name", label: "Merchant Name", sortable: true },
              { key: "email", label: "Email" },

              { key: "totalProducts", label: "Products", sortable: true },
              { key: "totalOrder", label: "Orders", sortable: true },
              {
                key: "totalSales",
                label: "Total Sales",
                render: (value) => (
                  <span className="text-red-400">{formatCurrency(value)}</span>
                ),
                sortable: true,
              },
              {
                key: "status",
                label: "Status",
                render: (value) => (
                  <Badge
                    className={
                      value === "active"
                        ? "bg-green-600 text-white"
                        : value === "inactive"
                        ? "bg-yellow-600 text-white"
                        : "bg-red-600 text-white"
                    }
                  >
                    {value}
                  </Badge>
                ),
              },
              {
                key: "actions",
                label: "Actions",
                render: (_value, row) => (
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    size="sm"
                    onClick={() => setSelectedMerchant(row)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                ),
              },
            ]}
            pagination={{
              currentPage: page,
              totalPages,
              onPageChange: setPage,
            }}
          />
        </div>
      </main>

      {/* Merchant Detail Modal */}
      {selectedMerchant && (
        <MerchantViewModal
          merchant={selectedMerchant}
          onClose={() => setSelectedMerchant(null)}
          onStatusChange={fetchMerchants}
        />
      )}
    </div>
  );
}
