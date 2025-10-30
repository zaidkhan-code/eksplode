"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/page-header"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  reward: number
  image: string
  status: "active" | "inactive"
  sales: number
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Package",
    price: 299,
    reward: 50,
    image: "/premium-package.jpg",
    status: "active",
    sales: 45,
  },
  {
    id: "2",
    name: "Starter Bundle",
    price: 99,
    reward: 15,
    image: "/starter-bundle.jpg",
    status: "active",
    sales: 128,
  },
  {
    id: "3",
    name: "Enterprise Plan",
    price: 999,
    reward: 200,
    image: "/enterprise-plan.jpg",
    status: "inactive",
    sales: 12,
  },
]

export default function MerchantProductsPage() {
  const [products] = useState<Product[]>(mockProducts)

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="My Products"
        description="Manage your product catalog"
        action={
          <Link href="/merchant/create-product">
            <Button className="gap-2 bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4" />
              New Product
            </Button>
          </Link>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-black border-red-500/20 hover:border-red-500/40 transition overflow-hidden"
            >
              <div className="aspect-square bg-red-900/20 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg?height=300&width=300&query=product"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-red-500">${product.price}</span>
                    <Badge
                      className={product.status === "active" ? "bg-green-600 text-white" : "bg-gray-600 text-white"}
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                    <p className="text-gray-400">Reward</p>
                    <p className="font-semibold text-red-400">${product.reward}</p>
                  </div>
                  <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                    <p className="text-gray-400">Sales</p>
                    <p className="font-semibold text-white">{product.sales}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    className="gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
