"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Calendar, Tag, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/ui/page-header";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  reward: string;
  expiration: string;
  category: string;
}

const MerchantProducts = () => {
  const [url, setUrl] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Stylish Leather Wallet",
      description:
        "Premium handcrafted leather wallet with multiple compartments.",
      image:
        "https://images.unsplash.com/photo-1618354693786-df9e9f5a7d45?w=400&h=300&fit=crop",
      reward: "10%",
      expiration: "2025-12-31",
      category: "Accessories",
    },
    {
      id: 2,
      title: "Minimalist Watch",
      description:
        "Elegant timepiece with a minimalist design and durable strap.",
      image:
        "https://images.unsplash.com/photo-1504051771394-dd2e66b2e08f?w=400&h=300&fit=crop",
      reward: "$5",
      expiration: "2025-10-20",
      category: "Watches",
    },
    {
      id: 3,
      title: "Designer Sunglasses",
      description:
        "UV protection sunglasses with premium frames and polarized lenses.",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=300&fit=crop",
      reward: "15%",
      expiration: "2025-11-15",
      category: "Eyewear",
    },
  ]);

  const handleScrape = () => {
    if (!url.trim()) return;

    // Simulated scraping preview
    const newProduct: Product = {
      id: Date.now(),
      title: "New Product (Preview)",
      description:
        "Product description will be scraped from the URL's metadata.",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      reward: "",
      expiration: "",
      category: "",
    };
    setProducts([...products, newProduct]);
    setUrl("");
  };

  const updateProductField = (
    id: number,
    field: keyof Product,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <PageHeader title={"Add Products"} description={"description for test"} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* URL Scraper Card */}
        <Card className="mb-8  bg-black">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-primary" />
              Import from URL
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Paste a product URL to automatically fetch details
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Input
                placeholder="https://your-store.com/product-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className=""
              />
              <Button
                onClick={handleScrape}
                disabled={!url.trim()}
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto transition-smooth"
              >
                Fetch Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className=" bg-black">
                {/* Product Image */}
                <div className="relative w-full h-48 overflow-hidden bg-secondary/30">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Details */}
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg  text-white ">
                    {product.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Reward Input */}
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                    <Input
                      placeholder="e.g. 10% or $5 off"
                      value={product.reward}
                      onChange={(e) =>
                        updateProductField(product.id, "reward", e.target.value)
                      }
                      className=""
                    />
                  </div>

                  {/* Expiration Date */}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                    <Input
                      type="date"
                      value={product.expiration}
                      onChange={(e) =>
                        updateProductField(
                          product.id,
                          "expiration",
                          e.target.value
                        )
                      }
                      className=""
                    />
                  </div>

                  {/* Category Input */}
                  <Input
                    placeholder="Category or tags"
                    value={product.category}
                    onChange={(e) =>
                      updateProductField(product.id, "category", e.target.value)
                    }
                    className=""
                  />

                  {/* Publish Button */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 mt-2 transition-smooth"
                    disabled={!product.reward || !product.expiration}
                  >
                    Publish Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/50 mb-4">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground">
              Add your first product to get started
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MerchantProducts;
