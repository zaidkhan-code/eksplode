"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Filter, Download, Search } from "lucide-react";
import { toast } from "sonner";
import useApi from "@/lib/useApi";
import TopActionPanel from "@/components/Admin/Ledger/Modal/TopActionPanel";
import PaymentModal from "@/components/Admin/Ledger/Modal/PaymentModal";

interface LedgerEntry {
  _id: string;
  userId: { _id: string; name: string; paymentMethod?: string | null };
  type: "credit" | "debit";
  amountCents: number;
  notes: string;
  balanceAfter: number;
  status: "pending" | "available" | "paid";
  createdAt: string;
}

export default function LedgerPage() {
  const [ledger, setLedger] = useState<LedgerEntry[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<LedgerEntry[]>([]);

  const fetchLedger = (page = 1) => {
    setLoading(true);
    useApi(
      `admin/ledger?page=${page}&limit=${pageSize}${
        filterStatus !== "all" ? `&status=${filterStatus}` : ""
      }${searchTerm ? `&userId=${searchTerm}` : ""}`,
      { method: "GET" },
      (res: any, status: boolean) => {
        setLoading(false);
        if (status && res.success) {
          setLedger(res.entries);
          setCurrentPage(res.currentPage);
          setTotalPages(res.totalPages);
        } else {
          toast.error(res?.message || "Failed to fetch ledger!");
        }
      }
    );
  };
  useEffect(() => {
    fetchLedger(1);
  }, [filterStatus, searchTerm]);

  const handlePageChange = (page: number) => {
    fetchLedger(page);
  };

  const handleRowSelection = (rows) => {
    setSelectedRows(rows);
  };

  function CloseTopBarAndPaymentModal() {
    setOpenPaymentModal(false);
    setSelectedRows([]);
  }

  const statusFilters = ["pending", "available", "paid"];

  const columns = [
    {
      key: "userName",
      label: "User Name",
      render: (_, row) => row?.userId?.name,
    },
    {
      key: "_id",
      label: "Email",
      render: (_, row) => row?.userId?.email,
    },
    // {
    //   key: "paymentMethod",
    //   label: "Payment Method",
    //   render: (_, row) =>
    //     row.userId.paymentMethod ? (
    //       <Badge className="bg-blue-600 text-white">
    //         {row.userId.paymentMethod}
    //       </Badge>
    //     ) : (
    //       <span className="text-gray-400">N/A</span>
    //     ),
    // },
    {
      key: "amountCents",
      label: "Amount",
      render: (_, row) => (
        <span
          className={row.type === "credit" ? "text-green-400" : "text-red-400"}
        >
          {row.type === "credit" ? "+" : "-"}
          {formatCurrency(row.amountCents)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => {
        const statusColors: Record<string, string> = {
          pending: "bg-yellow-600",
          available: "bg-green-600",
          paid: "bg-blue-600",
        };
        return (
          <Badge className={`${statusColors[value]} text-white`}>{value}</Badge>
        );
      },
    },
    {
      key: "notes",
      label: "Notes",
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => formatDate(value),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-black relative">
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
                All Entries
              </Button>

              {statusFilters.map((status) => (
                <Button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={
                    filterStatus === status
                      ? "bg-red-600 hover:bg-red-700"
                      : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                  }
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>

            <DataTable
              data={ledger.map((item) => ({ ...item, id: item._id }))}
              loading={loading}
              columns={columns}
              currentPage={currentPage}
              selectedRows={selectedRows}
              totalPages={totalPages}
              enableCheckbox={true}
              onRowSelect={handleRowSelection}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
      <TopActionPanel
        selectedRows={selectedRows}
        onClose={CloseTopBarAndPaymentModal}
        setOpenPaymentModal={setOpenPaymentModal}
        fetchLedger={fetchLedger}
      />
      <PaymentModal
        selectedRows={selectedRows}
        open={openPaymentModal}
        fetchLedger={fetchLedger}
        onClose={CloseTopBarAndPaymentModal}
      />
    </>
  );
}
