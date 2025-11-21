"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { DataTable } from "@/components/ui/data-table";
import { Search, Mail, Eye, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import useApi from "@/lib/useApi";
import UserViewModal from "@/components/Admin/user/Usermodalview";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface User {
  _id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "suspended";
  balance: { pending: number; available: number };
  totalEarnings: number;
  totalShares: number;
  totalConversions: number;
  zellePaymentDetails: {
    email: string | null;
    phoneNumber: string | null;
  };
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Fetch Users
  const fetchUsers = () => {
    setLoading(true);

    let statusQuery = filterStatus !== "all" ? `&status=${filterStatus}` : "";

    useApi(
      `admin/users?page=${page}&limit=${pageSize}&search=${searchTerm}${statusQuery}`,
      { method: "GET" },
      (res: any, status: boolean) => {
        setLoading(false);
        if (status) {
          setUsers(res.users);
          setPage(res.currentPage);
          setTotalPages(res.totalPages);
        } else {
          toast.error(res?.message || "Failed to fetch users!");
        }
      }
    );
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, filterStatus]);

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Users" description="Manage all platform users" />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Search + Status Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-4">
            <div className="flex-1 relative mb-2 md:mb-0">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black border-red-500/20 text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setFilterStatus("all")}
                className={
                  filterStatus === "all"
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                <Filter className="w-4 h-4 mr-1" />
                All
              </Button>
              <Button
                onClick={() => setFilterStatus("active")}
                className={
                  filterStatus === "active"
                    ? "bg-green-600 hover:bg-green-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                Active
              </Button>
              <Button
                onClick={() => setFilterStatus("inactive")}
                className={
                  filterStatus === "inactive"
                    ? "bg-yellow-600 hover:bg-yellow-700"
                    : "border-red-500/30 text-gray-400 hover:text-white hover:bg-red-900/20"
                }
              >
                Inactive
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <DataTable
            data={users}
            loading={loading}
            columns={[
              { key: "name", label: "Name" },

              {
                key: "email",
                label: "Email",
                render: (value) => (
                  <div className="flex gap-2 items-center">
                    <Mail className="w-4 h-4" />
                    {value}
                  </div>
                ),
              },

              {
                key: "balance.available",
                label: "Available",
                render: (_, row) => (
                  <span className="text-green-400">
                    {formatCurrency(row.balance.available)}
                  </span>
                ),
              },

              {
                key: "balance.pending",
                label: "Pending",
                render: (_, row) => (
                  <span className="text-yellow-400">
                    {formatCurrency(row.balance.pending)}
                  </span>
                ),
              },

              {
                key: "totalShares",
                label: "Shares",
              },

              {
                key: "totalEarnings",
                label: "Earned",
                render: (value) => (
                  <span className="text-green-500 font-bold">
                    {formatCurrency(value)}
                  </span>
                ),
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
                    onClick={() => setSelectedUser(row)}
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

      {/* Separate Modal Component */}
      {selectedUser && (
        <UserViewModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onStatusChange={fetchUsers}
        />
      )}
    </div>
  );
}
