"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Search, Share2, ShoppingCart } from "lucide-react";
import useApi from "@/lib/useApi";
import Loader from "@/components/ui/Loader";
import { Header } from "@/components/ui/Navbar";
import { formatCurrency } from "@/lib/utils";

// Mock data
const mockProducts = [
  {
    id: 1,
    name: "Premium Subscription",
    price: 9999,
    reward: 500,
    image: "/premium-subscription-benefits.png",
    description: "Get access to all premium features",
  },
  {
    id: 2,
    name: "Business Plan",
    price: 29999,
    reward: 2000,
    image: "/business-plan.png",
    description: "Perfect for growing businesses",
  },
  {
    id: 3,
    name: "Enterprise Solution",
    price: 99999,
    reward: 8000,
    image: "/enterprise-solution.png",
    description: "Complete enterprise package",
  },
  {
    id: 4,
    name: "Starter Pack",
    price: 4999,
    reward: 200,
    image: "/starter-pack.jpg",
    description: "Perfect for beginners",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      useApi(
        "products",
        { method: "GET" },
        (res, success) => {
          if (success) {
            setProducts(res?.products || []);
          } else {
            console.error("Error loading products:", res);
          }
          setLoading(false);
        },
        true // notProtected = true (if your API doesn't need auth)
      );
    };

    fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.merchant?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex-col flex bg-gradient-to-br from-black via-black to-red-950">
      <Header />

      {/* Main Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Explore Products
          </h1>
          <p className="text-gray-400">
            Discover amazing products and earn rewards
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/50 border-red-500/30 text-white placeholder:text-gray-600 focus:border-red-500"
            />
          </div>
          {/* <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-black/50 border border-red-500/30 text-white rounded-lg focus:border-red-500 outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="reward">Highest Reward</option>
          </select> */}
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product, index) => (
              <Card
                key={index}
                className="bg-black border-red-500/20 hover:border-red-500/50 transition overflow-hidden group"
              >
                <div className="relative overflow-hidden h-48 bg-black/50">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className=" flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-500">
                        {formatCurrency(product?.priceCents)}
                      </span>
                      {/* <span className="text-sm bg-red-900/30 text-red-400 px-2 py-1 rounded">
                      +${(product?.rewardCents / 100).toFixed(2)} reward
                    </span> */}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/product/${product._id}`} className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </Link>
                    {/* <Button
                      variant="outline"
                      className="border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button> */}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-auto  border-red-900/30 bg-black/50 py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <Logo size="sm" />
            <div className="flex gap-8 text-gray-400 text-sm">
              <Link href="#" className="hover:text-red-500 transition">
                Privacy
              </Link>
              <Link href="#" className="hover:text-red-500 transition">
                Terms
              </Link>
              <Link href="#" className="hover:text-red-500 transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
