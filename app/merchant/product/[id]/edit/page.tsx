"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Switch from "react-switch";
import useApi from "@/lib/useApi";

export default function CreateProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    reward: "",
    description: "",
    image: null as File | null,
    active: true,
  });
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productId)
      useApi(
        productId ? `products/${productId}` : "",
        { method: "GET" },
        (res: any, status: boolean) => {
          if (status && res?.product) {
            const p = res.product;
            setFormData({
              name: p.name,
              price: (p.priceCents / 100).toString(),
              reward: (p.rewardCents / 100).toString(),
              description: p.description,
              image: null,
              active: p.active,
            });
            if (p.image) setPreview(p.image);
          }
        }
      );
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // 🟢 Submit create or update product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("priceCents", (parseFloat(formData.price) * 100).toString());
    payload.append(
      "rewardCents",
      (parseFloat(formData.reward) * 100).toString()
    );
    payload.append("active", formData.active.toString());
    if (formData.image) payload.append("image", formData.image);

    const method = productId ? "PUT" : "POST";
    const url = productId ? `product/${productId}` : "merchant/product";

    useApi(
      url,
      {
        method,
        data: payload,
        // headers: { "Content-Type": "multipart/form-data" },
      },
      (res: any, status: boolean) => {
        setIsLoading(false);
        if (status) {
          toast.success(
            productId
              ? "Product updated successfully!"
              : "Product created successfully!"
          );
          router.push("/merchant/products");
        } else {
          toast.error(res?.message || "Something went wrong!");
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title={productId ? "Edit Product" : "Create Product"}
        description={
          productId
            ? "Update product details"
            : "Add a new product to your catalog"
        }
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <Card className="bg-black border-red-500/20">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white">Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="border-2 border-dashed border-red-500/30 rounded-lg p-8 text-center hover:border-red-500/60 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-input"
                />
                <label htmlFor="image-input" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover mx-auto rounded"
                      />
                      <p className="text-sm text-gray-400">
                        Click to change image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-red-500/50" />
                      <p className="text-sm font-medium text-white">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card className="bg-black border-red-500/20">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <label className="text-sm font-medium text-white">
                  Product Name
                </label>
                <Input
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-2 bg-black border-red-500/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">
                    Price ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">
                    Reward Amount ($)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.reward}
                    onChange={(e) =>
                      setFormData({ ...formData, reward: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-2 w-full p-3 border border-red-500/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={4}
                />
              </div>

              {/* 🟢 Active Toggle */}
              <div className="flex items-center justify-between mt-4">
                <label className="text-sm font-medium text-white">Active</label>
                <Switch
                  onChange={(checked) =>
                    setFormData({ ...formData, active: checked })
                  }
                  checked={formData.active}
                  offColor="#555"
                  onColor="#dc2626"
                  uncheckedIcon={false}
                  checkedIcon={false}
                  handleDiameter={18}
                  height={22}
                  width={44}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/merchant/products" className="flex-1">
              <Button className="w-full gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30">
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isLoading
                ? productId
                  ? "Updating..."
                  : "Creating..."
                : productId
                ? "Update Product"
                : "Create Product"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
