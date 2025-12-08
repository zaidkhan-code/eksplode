"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/Loader";
import useApi from "@/lib/useApi"; // ✅ your custom hook
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

const API_IMAGE = process.env.NEXT_PUBLIC_API_URL_IMAGE;

export default function UserProductsPage() {
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
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Browse Products"
        description="Discover amazing products and earn rewards"
      />
      {loading ? (
        <Loader />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => {
              const imageUrl = product.image?.startsWith("http")
                ? product.image
                : `${API_IMAGE}${
                    product.image?.startsWith("/")
                      ? product.image
                      : "/" + product.image
                  }`;

              return (
                <Card
                  key={product._id}
                  className="bg-black border-red-500/20 hover:border-red-500/40 transition overflow-hidden"
                >
                  <div className="aspect-square bg-red-900/20 overflow-hidden">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="font-semibold text-white line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        {product.merchant}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating || 0)
                                ? "text-yellow-400"
                                : "text-gray-600"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">
                        ({product?.reviews || 0})
                      </span>
                    </div>

                    {/* Price and Reward */}
                    <div className="grid grid-cols-2 gap-2">
                      {/* <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                        <p className="text-xs text-gray-400">Price</p>
                        <p className="font-semibold text-red-500">
                          {formatCurrency(product?.priceCents)}
                        </p>
                      </div> */}
                      <div className="bg-green-900/20 p-2 col rounded border border-green-500/20">
                        <p className="text-xs text-gray-400">Reward</p>
                        <p className="font-semibold text-green-400">
                          {formatCurrency(product?.rewardCents || 0)}
                        </p>
                      </div>
                    </div>

                    {/* Buy Button */}
                    <Link href={`/user/product/${product?._id}`}>
                      <Button className="w-full gap-2 bg-red-600 hover:bg-red-700">
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No products found matching your search.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}
