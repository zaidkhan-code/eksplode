"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Search, Mail, Phone } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  phone: string
  status: "active" | "inactive" | "suspended"
  balance: number
  joinDate: string
  totalTransactions: number
}

const mockUsers: User[] = [
  {
    id: "user_001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    status: "active",
    balance: 250000,
    joinDate: "2023-06-15",
    totalTransactions: 45,
  },
  {
    id: "user_002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234-567-8901",
    status: "active",
    balance: 120000,
    joinDate: "2023-08-20",
    totalTransactions: 32,
  },
  {
    id: "user_003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 234-567-8902",
    status: "inactive",
    balance: 50000,
    joinDate: "2023-10-10",
    totalTransactions: 12,
  },
  {
    id: "user_004",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+1 234-567-8903",
    status: "active",
    balance: 350000,
    joinDate: "2023-05-05",
    totalTransactions: 78,
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Users" description="Manage all platform users" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black border-red-500/20 text-white"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-white mt-1">{users.length}</p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {users.filter((u) => u.status === "active").length}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Balance</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {formatCurrency(users.reduce((sum, u) => sum + u.balance, 0))}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold text-white mt-1">
                {users.reduce((sum, u) => sum + u.totalTransactions, 0)}
              </p>
            </Card>
          </div>

          {/* Table */}
          <Card className="bg-black border-red-500/20">
            <CardContent className="p-0">
              <DataTable
                data={filtered}
                columns={[
                  {
                    key: "name",
                    label: "Name",
                    sortable: true,
                  },
                  {
                    key: "email",
                    label: "Email",
                    render: (value) => (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {value}
                      </div>
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
                    key: "balance",
                    label: "Balance",
                    render: (value) => <span className="text-red-400 font-semibold">{formatCurrency(value)}</span>,
                    sortable: true,
                  },
                  {
                    key: "totalTransactions",
                    label: "Transactions",
                    sortable: true,
                  },
                  {
                    key: "joinDate",
                    label: "Joined",
                    render: (value) => formatDate(value),
                  },
                ]}
                onRowClick={setSelectedUser}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-black border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white">{selectedUser.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" />
                  {selectedUser.email}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Phone</p>
                <p className="text-white flex items-center gap-2 mt-1">
                  <Phone className="w-4 h-4" />
                  {selectedUser.phone}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <Badge
                  className={
                    selectedUser.status === "active"
                      ? "bg-green-600 text-white mt-1"
                      : selectedUser.status === "inactive"
                        ? "bg-yellow-600 text-white mt-1"
                        : "bg-red-600 text-white mt-1"
                  }
                >
                  {selectedUser.status}
                </Badge>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Balance</p>
                <p className="text-red-400 font-bold text-lg mt-1">{formatCurrency(selectedUser.balance)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Transactions</p>
                  <p className="text-white font-bold text-lg mt-1">{selectedUser.totalTransactions}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Joined</p>
                  <p className="text-white font-bold text-lg mt-1">{formatDate(selectedUser.joinDate)}</p>
                </div>
              </div>
              <Button onClick={() => setSelectedUser(null)} className="w-full bg-red-600 hover:bg-red-700">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
