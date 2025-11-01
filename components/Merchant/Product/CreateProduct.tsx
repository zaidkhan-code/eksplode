"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Upload, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Switch from "react-switch";
import useApi from "@/lib/useApi";
import { uploadImageAction } from "@/app/actions/uploadImageAction"; // 👈 server action
import Loader from "@/components/ui/Loader";

export default function CreateProduct() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    reward: "",
    description: "",
    imageUrl: "",
    active: true,
  });

  const [preview, setPreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // 🟢 Fetch product details (for edit mode)
  useEffect(() => {
    if (!productId) return;
    setPageLoading(true);
    useApi(
      `products/${productId}`,
      { method: "GET" },
      (res: any, status: boolean) => {
        if (status && res?.product) {
          const p = res.product;
          setFormData({
            name: p.name,
            price: (p.priceCents / 100).toString(),
            reward: (p.rewardCents / 100).toString(),
            description: p.description,
            imageUrl: p.image || "",
            active: p.active,
          });
          if (p.image) setPreview(p.image);
          setPageLoading(false);
        }
      }
    );
  }, [productId]);

  // 🟢 Handle Image Upload to ImageKit
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);

      const uploadRes = await uploadImageAction(form);
      if (uploadRes?.url) {
        setFormData({ ...formData, imageUrl: uploadRes.url });
        setPreview(uploadRes.url);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic validation before calling API
    if (
      !formData.name.trim() ||
      !formData.price.trim() ||
      !formData.reward.trim() ||
      !formData.description.trim() ||
      !formData.imageUrl.trim()
    ) {
      toast.error("Please fill all required fields including image.");
      return;
    }

    setIsLoading(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      priceCents: parseFloat(formData.price) * 100,
      rewardCents: parseFloat(formData.reward) * 100,
      active: formData.active,
      image: formData.imageUrl, // ✅ sending URL directly
    };

    const method = productId ? "PUT" : "POST";
    const url = productId
      ? `merchant/product/${productId}`
      : "merchant/product";

    useApi(url, { method, data: payload }, (res: any, status: boolean) => {
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
    });
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
      {pageLoading ? (
        <Loader />
      ) : (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <Card className="bg-black border-red-500/20 relative">
              <CardHeader className="border-b border-red-500/20">
                <CardTitle className="text-white">Product Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="border-2 border-dashed border-red-500/30 rounded-lg p-8 text-center hover:border-red-500/60 transition-colors cursor-pointer relative">
                  {uploading && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                      <Loader2 className="animate-spin text-red-500 w-8 h-8" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-input"
                    disabled={uploading}
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

                {/* Active Toggle */}
                <div className="flex items-center justify-between mt-4">
                  <label className="text-sm font-medium text-white">
                    Active
                  </label>
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
      )}
    </div>
  );
}
