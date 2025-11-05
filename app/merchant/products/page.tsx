"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import useApi from "@/lib/useApi";
import { toast } from "sonner";
import Image from "next/image";
import Loader from "@/components/ui/Loader";
import { formatCurrency } from "@/lib/utils";

interface Product {
  _id: string;
  name: string;
  priceCents: number;
  rewardCents: number;
  image?: string;
  active: boolean;
  sales?: number;
}

export default function MerchantProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  function GetProductList() {
    useApi(
      "merchant/products", // your API endpoint e.g. /product or /merchant/products
      { method: "GET" },
      (res: any, status: boolean) => {
        setLoading(false);
        if (status) {
          setProducts(res?.products || []);
        } else {
          toast.error(res?.message || "Failed to fetch products");
        }
      }
    );
  }
  useEffect(() => {
    setLoading(true);
    GetProductList();
  }, []);
  function DeleteProduct(id) {
    useApi(
      `merchant/product/${id}`, // your API endpoint e.g. /product or /merchant/products
      { method: "delete" },
      (res: any, status: boolean) => {
        // setLoading(false);
        if (status) {
          GetProductList();
          toast.success(res?.message || "Failed to delete product");
        } else {
          toast.error(res?.message || "Failed to delete product");
        }
      }
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="My Products"
        description="Manage your product catalog"
        action={
          <Link href="/merchant/product/create">
            <Button className="gap-2 bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4" />
              New Product
            </Button>
          </Link>
        }
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loader loading={loading} />
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400">No products found.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product._id}
                className="bg-black border-red-500/20 hover:border-red-500/40 transition overflow-hidden"
              >
                <div className="aspect-square bg-red-900/20 overflow-hidden">
                  <img
                    src={`${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />

                  {/* <img
                    width={200}
                    height={200}
                    src={
                      // "/premium-package.jpg"
                      product.image
                        ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${product.image}`
                        : "/placeholder.svg?height=300&width=300&query=product"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  /> */}
                </div>

                <CardContent className="p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold text-white line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-red-500">
                        {formatCurrency(product.priceCents)}
                      </span>
                      <Badge
                        className={
                          product.active
                            ? "bg-green-600 text-white"
                            : "bg-gray-600 text-white"
                        }
                      >
                        {product.active ? "active" : "inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                      <p className="text-gray-400">Reward</p>
                      <p className="font-semibold text-red-400">
                        {formatCurrency(product.rewardCents)}
                      </p>
                    </div>
                    <div className="bg-red-900/20 p-2 rounded border border-red-500/20">
                      <p className="text-gray-400">Sales</p>
                      <p className="font-semibold text-white">
                        {formatCurrency(product?.totalSales || 0)}
                      </p>
                    </div>
                    <div className="col-span-2 bg-red-900/20 p-2 rounded border border-red-500/20">
                      <p className="text-gray-400">Total Revenue</p>
                      <p className="font-semibold text-white">
                        {formatCurrency(product?.totalRevenueCents || 0)}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* <Button
                      size="sm"
                      className="flex-1 gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button> */}

                    <Link
                      href={`/merchant/product/${product._id}/edit`}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() => DeleteProduct(product?._id)}
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
        )}
      </main>
    </div>
  );
}
