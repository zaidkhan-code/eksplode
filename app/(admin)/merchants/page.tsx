"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { DataTable } from "@/components/data-table"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Search, Store, TrendingUp } from "lucide-react"

interface Merchant {
  id: string
  name: string
  email: string
  store: string
  status: "active" | "inactive" | "suspended"
  revenue: number
  products: number
  joinDate: string
  rating: number
}

const mockMerchants: Merchant[] = [
  {
    id: "merchant_001",
    name: "Tech Store Pro",
    email: "tech@store.com",
    store: "TechStorePro",
    status: "active",
    revenue: 500000,
    products: 45,
    joinDate: "2023-03-10",
    rating: 4.8,
  },
  {
    id: "merchant_002",
    name: "Fashion Hub",
    email: "fashion@hub.com",
    store: "FashionHub",
    status: "active",
    revenue: 350000,
    products: 120,
    joinDate: "2023-04-15",
    rating: 4.6,
  },
  {
    id: "merchant_003",
    name: "Electronics Plus",
    email: "electronics@plus.com",
    store: "ElectronicsPlus",
    status: "active",
    revenue: 750000,
    products: 85,
    joinDate: "2023-02-20",
    rating: 4.9,
  },
  {
    id: "merchant_004",
    name: "Home Decor",
    email: "home@decor.com",
    store: "HomeDecor",
    status: "inactive",
    revenue: 120000,
    products: 30,
    joinDate: "2023-07-05",
    rating: 4.2,
  },
]

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>(mockMerchants)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)

  const filtered = merchants.filter(
    (merchant) =>
      merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      merchant.store.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Merchants" description="Manage all platform merchants" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black border-red-500/20 text-white"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Merchants</p>
              <p className="text-2xl font-bold text-white mt-1">{merchants.length}</p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Active Merchants</p>
              <p className="text-2xl font-bold text-green-400 mt-1">
                {merchants.filter((m) => m.status === "active").length}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-red-400 mt-1">
                {formatCurrency(merchants.reduce((sum, m) => sum + m.revenue, 0))}
              </p>
            </Card>
            <Card className="bg-black border-red-500/20 p-4">
              <p className="text-gray-400 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-white mt-1">{merchants.reduce((sum, m) => sum + m.products, 0)}</p>
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
                    label: "Merchant Name",
                    sortable: true,
                  },
                  {
                    key: "store",
                    label: "Store",
                    render: (value) => (
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-400" />
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
                    key: "revenue",
                    label: "Revenue",
                    render: (value) => <span className="text-red-400 font-semibold">{formatCurrency(value)}</span>,
                    sortable: true,
                  },
                  {
                    key: "products",
                    label: "Products",
                    sortable: true,
                  },
                  {
                    key: "rating",
                    label: "Rating",
                    render: (value) => (
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ),
                  },
                ]}
                onRowClick={setSelectedMerchant}
              />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Merchant Detail Modal */}
      {selectedMerchant && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-black border-red-500/30 w-full max-w-md">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white">{selectedMerchant.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Store Name</p>
                <p className="text-white flex items-center gap-2 mt-1">
                  <Store className="w-4 h-4" />
                  {selectedMerchant.store}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white mt-1">{selectedMerchant.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <Badge
                  className={
                    selectedMerchant.status === "active"
                      ? "bg-green-600 text-white mt-1"
                      : selectedMerchant.status === "inactive"
                        ? "bg-yellow-600 text-white mt-1"
                        : "bg-red-600 text-white mt-1"
                  }
                >
                  {selectedMerchant.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-red-400 font-bold text-lg mt-1">{formatCurrency(selectedMerchant.revenue)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Products</p>
                  <p className="text-white font-bold text-lg mt-1">{selectedMerchant.products}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-yellow-400 font-bold text-lg mt-1">{selectedMerchant.rating}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Joined</p>
                  <p className="text-white font-bold text-lg mt-1">{formatDate(selectedMerchant.joinDate)}</p>
                </div>
              </div>
              <Button onClick={() => setSelectedMerchant(null)} className="w-full bg-red-600 hover:bg-red-700">
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
