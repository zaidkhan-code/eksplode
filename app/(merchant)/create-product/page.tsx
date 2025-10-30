"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/page-header"
import { Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    reward: "",
    description: "",
    image: null as File | null,
  })
  const [preview, setPreview] = useState<string>("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product created:", formData)
  }

  return (
    <div className="min-h-screen bg-black">
      <PageHeader title="Create Product" description="Add a new product to your catalog" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <Card className="bg-black border-red-500/20">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white">Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="border-2 border-dashed border-red-500/30 rounded-lg p-8 text-center hover:border-red-500/60 transition-colors cursor-pointer">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-input" />
                <label htmlFor="image-input" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-2">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-32 h-32 object-cover mx-auto rounded"
                      />
                      <p className="text-sm text-gray-400">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-red-500/50" />
                      <p className="text-sm font-medium text-white">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
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
                <label className="text-sm font-medium text-white">Product Name</label>
                <Input
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2 bg-black border-red-500/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-white">Price ($)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white">Reward Amount ($)</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Description</label>
                <textarea
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 w-full p-3 border border-red-500/20 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                  rows={4}
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
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              Create Product
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
