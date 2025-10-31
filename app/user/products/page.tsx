"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { ShoppingCart, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Product {
  id: string
  name: string
  price: number
  reward: number
  image: string
  merchant: string
  rating: number
  reviews: number
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Package",
    price: 299,
    reward: 50,
    image: "/premium-package.jpg",
    merchant: "Tech Store",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: "2",
    name: "Starter Bundle",
    price: 99,
    reward: 15,
    image: "/starter-bundle.jpg",
    merchant: "Value Shop",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: "3",
    name: "Enterprise Plan",
    price: 999,
    reward: 200,
    image: "/enterprise-plan.jpg",
    merchant: "Pro Solutions",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "4",
    name: "Basic Tier",
    price: 49,
    reward: 8,
    image: "/placeholder.svg?key=b716s",
    merchant: "Budget Deals",
    rating: 4.3,
    reviews: 312,
  },
  {
    id: "5",
    name: "Professional Suite",
    price: 599,
    reward: 120,
    image: "/placeholder.svg?key=grgbk",
    merchant: "Elite Marketplace",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "6",
    name: "Ultimate Bundle",
    price: 1499,
    reward: 300,
    image: "/placeholder.svg?key=4z8o9",
    merchant: "Premium Plus",
    rating: 4.9,
    reviews: 67,
  },
]

export default function UserProductsPage() {
  const [products] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.merchant.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Browse Products" description="Discover amazing products and earn rewards" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products or merchants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black border-red-500/20 text-white"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <Card
              key={product.id}
              className="bg-black border-red-500/20 hover:border-red-500/40 transition overflow-hidden"
            >
              <div className="aspect-square bg-red-900/20 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-white line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{product.merchant}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-600"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>

                {/* Price and Reward */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="font-semibold text-red-500">${product.price}</p>
                  </div>
                  <div className="bg-green-900/20 p-2 rounded border border-green-500/20">
                    <p className="text-xs text-gray-400">Reward</p>
                    <p className="font-semibold text-green-400">+${product.reward}</p>
                  </div>
                </div>

                {/* Buy Button */}
                <Button className="w-full gap-2 bg-red-600 hover:bg-red-700">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No products found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  )
}
