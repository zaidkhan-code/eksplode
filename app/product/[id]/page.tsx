"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
// import { Logo } from "@/components/";
import { useAuth } from "@/components/Context/AuthContext";
import { Share2, Download, Copy, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useApi from "@/lib/useApi";
import Loader from "@/components/ui/Loader";
import { useParams, useSearchParams } from "next/navigation";

export default function Page({ loginUser = false }) {
  const params = useParams();
  const { user, Logout, getStoredAuthData } = useAuth();
  const { accessToken } = getStoredAuthData();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [shareLoading, setShareLoading] = useState(false);
  const sharer = searchParams.get("sharer");
  const t = searchParams.get("t");
  const s = searchParams.get("s");

  useEffect(() => {
    if (sharer && t && s) {
      useApi(
        "user/verify-share",
        {
          method: "POST",
          data: {
            productId: params?.id,
            sharer: sharer,
            t: t,
            s: s,
          },
        },
        (res, status) => {
          if (status && res.valid) {
          } else {
            toast.error("Invalid or expired link");
            setValid(false);
            setLoading(false);
          }
        }
      );
    } else {
    }
  }, [sharer]);

  useEffect(() => {
    if (!params.id) return;

    useApi(`products/${params.id}`, { method: "GET" }, (res, status) => {
      setLoading(false);
      if (status && res?.product) {
        setProduct(res.product);
      } else {
        toast.error(res?.message || "Failed to fetch product details");
      }
    });
  }, [params.id]);

  const handleGenerateShareLink = () => {
    if (!product?._id) return toast.error("Product not found!");
    const sharerId = user?._id; // replace with logged-in user id (from auth)

    setShareLoading(true);

    useApi(
      "user/share-product",
      {
        method: "POST",
        data: { sharerId, productId: product._id },
      },
      (res, status) => {
        setShareLoading(false);
        if (status && res?.shareUrl) {
          setShareLink(res.shareUrl);
          setQrCode(res.qrDataUrl);
          setShowShareModal(true);
        } else {
          toast.error(res?.message || "Failed to generate share link");
        }
      }
    );
  };

  const handleCopy = () => {
    if (!shareLink) return;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Link copied!");
  };
  const handleSocialShare = async () => {
    if (!shareLink) return toast.error("Share link not available");

    try {
      // Convert base64 QR to blob if available
      let files = [];
      if (qrCode) {
        const res = await fetch(qrCode);
        const blob = await res.blob();
        const file = new File([blob], "qr-code.png", { type: blob.type });
        files.push(file);
      }

      if (navigator.canShare && navigator.canShare({ files })) {
        // 🟢 Share both QR and link (on supported browsers)
        await navigator.share({
          title: "Check out this product!",
          text: "Earn rewards when you buy or share this product!",
          url: shareLink,
          files,
        });
        toast.success("Shared successfully!");
      } else if (navigator.share) {
        // 🟡 Share only text + link (fallback)
        await navigator.share({
          title: "Check out this product!",
          text: `Earn rewards by purchasing or sharing this product!\n${shareLink}`,
        });
        toast.success("Shared successfully!");
      } else {
        // 🔴 Fallback for unsupported browsers
        toast.info("Sharing not supported on this device. Link copied!");
        handleCopy();
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("Failed to share. Please try again.");
    }
  };

  // 🟡 Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader className="animate-spin text-red-500 w-10 h-10" />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-400">
        Product not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-950">
      {/* Navigation */}
      <nav className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <Link href="/products">
            <Button variant="ghost" className="text-white hover:text-red-500">
              Back to Products
            </Button>
          </Link>
        </div>
      </nav>

      {/* Product Details */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <Card className="bg-black border-red-500/20 p-8 w-full">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {product.name}
              </h1>
              <p className="text-gray-400">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Price</span>
                  <span className="text-3xl font-bold text-red-500">
                    ${(product.priceCents / 100).toFixed(2)}
                  </span>
                </div>
                {accessToken && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reward</span>
                    <span className="text-2xl font-bold text-green-400">
                      +${(product.rewardCents / 100).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-400">
                {product.details || "No additional details provided."}
              </p>
            </div>

            <div className="space-y-3">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold">
                Buy Now
              </Button>
              {accessToken && (
                <Button
                  onClick={handleGenerateShareLink}
                  disabled={shareLoading}
                  variant="outline"
                  className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 py-6"
                >
                  {shareLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share & Earn
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="bg-black border-red-500/30 max-w-md w-full">
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Share & Earn
                </h2>
                <p className="text-gray-400">
                  Share this product and earn $
                  {(product.rewardCents / 100).toFixed(2)} for each sale
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  Your Referral Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="flex-1 bg-black/50 border border-red-500/30 text-white px-4 py-2 rounded-lg text-sm"
                  />
                  <Button
                    onClick={handleCopy}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white">
                  QR Code
                </label>
                <div className="bg-white p-4 rounded-lg flex items-center justify-center h-48">
                  {qrCode ? (
                    <img
                      src={qrCode}
                      alt="QR Code"
                      className="h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-gray-400">
                      <Download className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">QR Code will be generated here</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowShareModal(false)}
                  variant="outline"
                  className="flex-1 border-red-500/30 text-red-500 hover:bg-red-500/10"
                >
                  Close
                </Button>
                <Button
                  onClick={handleSocialShare}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Share on Social
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Logo } from "@/components/ui/logo";
// import { Share2, Download, Copy, Check } from "lucide-react";
// import { useState } from "react";
// import { useParams } from "next/navigation";

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const [copied, setCopied] = useState(false);
//   const [showShareModal, setShowShareModal] = useState(false);

//   const product = {
//     id: id,
//     name: "Premium Subscription",
//     price: 9999,
//     reward: 500,
//     image: "/premium-subscription-benefits.png",
//     description:
//       "Get access to all premium features and unlock unlimited potential",
//     details:
//       "This premium subscription includes all advanced features, priority support, and exclusive content.",
//   };

//   const referralLink = `https://eksplode.com/ref/${product.id}?user=123`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(referralLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-black to-red-950">
//       {/* Navigation */}
//       <nav className="border-b border-red-900/30 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
//           <Link href="/">
//             <Logo size="md" />
//           </Link>
//           <Link href="/products">
//             <Button variant="ghost" className="text-white hover:text-red-500">
//               Back to Products
//             </Button>
//           </Link>
//         </div>
//       </nav>

//       {/* Product Details */}
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Image */}
//           <div className="flex items-center justify-center">
//             <Card className="bg-black border-red-500/20 p-8 w-full">
//               <img
//                 src={product.image || "/placeholder.svg"}
//                 alt={product.name}
//                 className="w-full h-auto rounded-lg"
//               />
//             </Card>
//           </div>

//           {/* Details */}
//           <div className="space-y-8">
//             <div>
//               <h1 className="text-4xl font-bold text-white mb-2">
//                 {product.name}
//               </h1>
//               <p className="text-gray-400">{product.description}</p>
//             </div>

//             <div className="space-y-4">
//               <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-gray-400">Price</span>
//                   <span className="text-3xl font-bold text-red-500">
//                     ${(product.price / 100).toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-400">Reward</span>
//                   <span className="text-2xl font-bold text-green-400">
//                     +${(product.reward / 100).toFixed(2)}
//                   </span>
//                 </div>
//               </div>

//               <p className="text-gray-400">{product.details}</p>
//             </div>

//             <div className="space-y-3">
//               <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold">
//                 Buy Now
//               </Button>
//               <Button
//                 onClick={() => setShowShareModal(true)}
//                 variant="outline"
//                 className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 py-6"
//               >
//                 <Share2 className="w-4 h-4 mr-2" />
//                 Share & Earn
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Share Modal */}
//       {showShareModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <Card className="bg-black border-red-500/30 max-w-md w-full">
//             <div className="p-8 space-y-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-white mb-2">
//                   Share & Earn
//                 </h2>
//                 <p className="text-gray-400">
//                   Share this product and earn $
//                   {(product.reward / 100).toFixed(2)} for each sale
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-sm font-medium text-white">
//                   Your Referral Link
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={referralLink}
//                     readOnly
//                     className="flex-1 bg-black/50 border border-red-500/30 text-white px-4 py-2 rounded-lg text-sm"
//                   />
//                   <Button
//                     onClick={handleCopy}
//                     className="bg-red-600 hover:bg-red-700 text-white"
//                   >
//                     {copied ? (
//                       <Check className="w-4 h-4" />
//                     ) : (
//                       <Copy className="w-4 h-4" />
//                     )}
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-sm font-medium text-white">
//                   QR Code
//                 </label>
//                 <div className="bg-white p-4 rounded-lg flex items-center justify-center h-48">
//                   <div className="text-center text-gray-400">
//                     <Download className="w-8 h-8 mx-auto mb-2" />
//                     <p className="text-sm">QR Code will be generated here</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Button
//                   onClick={() => setShowShareModal(false)}
//                   variant="outline"
//                   className="flex-1 border-red-500/30 text-red-500 hover:bg-red-500/10"
//                 >
//                   Close
//                 </Button>
//                 <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
//                   Share on Social
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
