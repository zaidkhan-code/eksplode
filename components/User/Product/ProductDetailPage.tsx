"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/components/Context/AuthContext";
import { Share2, Download, Copy, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useApi from "@/lib/useApi";
import Loader from "@/components/ui/Loader";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function ProductDetailPage({ loginUser = false }) {
  const params = useParams();
  const router = useRouter();
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
  const [valid, setValid] = useState(true);
  const [tracking, setTracking] = useState(false); // ✅ Track API state

  const sharer = searchParams.get("sharer");
  const t = searchParams.get("t");
  const s = searchParams.get("s");
  const attributeId = searchParams.get("attributeId");

  // ✅ Verify share link if parameters exist
  useEffect(() => {
    if (sharer && t && s) {
      setTracking(true); // Start tracking → show nothing
      useApi(
        `products/${params?.id}/track`,
        {
          method: "post",
          data: {
            productId: params?.id,
            sharerId: sharer,
            t: t,
            s: s,
          },
        },
        (res, status) => {
          if (status) {
            router.replace(res?.redirectUrl); // Redirect on success
          } else {
            toast.error("Invalid or expired link");
            setValid(false);
            router.push("/"); // Redirect to main page if invalid
          }
        }
      );
    }
  }, [sharer, t, s]);

  // ✅ Fetch product details
  useEffect(() => {
    if (!params.id) return;
    setLoading(true);
    useApi(`products/${params.id}`, { method: "GET" }, (res, status) => {
      if (status && res?.product) {
        setProduct(res.product);
        setLoading(false);
      } else {
        toast.error(res?.message || "Failed to fetch product details");
        setLoading(false);
      }
    });
  }, [params.id]);

  const handleGenerateShareLink = () => {
    if (!product?._id) return toast.error("Product not found!");
    const sharerId = user?._id;

    setShareLoading(true);

    useApi(
      `products/${product?._id}/share`,
      {
        method: "POST",
        data: {},
      },
      (res, status) => {
        setShareLoading(false);
        if (status) {
          setShareLink(res?.shareUrl);
          setQrCode(res?.qrCode);
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

  const handleShareLink = async () => {
    if (!shareLink) return toast.error("Share link not available");

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this product!",
          text: `Earn rewards when you buy or share this product!\n${shareLink}`,
          url: shareLink,
        });
        toast.success("Link shared successfully!");
      } else {
        toast.info("Sharing not supported. Link copied!");
        handleCopy();
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("Failed to share link.");
    }
  };

  const handleShareQR = async () => {
    if (!qrCode) return toast.error("QR Code not available");

    try {
      const res = await fetch(qrCode);
      const blob = await res.blob();
      const file = new File([blob], "qr-code.png", { type: blob.type });
      const files = [file];

      if (navigator.canShare && navigator.canShare({ files })) {
        await navigator.share({
          title: "Check out this product!",
          text: "Scan this QR to explore the product and earn rewards!",
          files,
        });
        toast.success("QR shared successfully!");
      } else {
        toast.info("Sharing not supported on this device.");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      toast.error("Failed to share QR code.");
    }
  };

  const createCheckout = () => {
    useApi(
      `orders/checkout`,
      {
        method: "POST",
        data: {
          productId: params?.id,
          email: user?.email,
          sessionId: s,
          attributeid: attributeId,
        },
      },
      (res, status) => {
        if (status) {
          router?.push(res?.url);
        } else {
          toast.error(res?.message || "Failed to generate checkout session");
        }
      }
    );
  };

  // ✅ Show nothing while tracking share link or invalid link
  if (tracking || !valid) {
    return <Loader pageLoad={true} />;
  }

  // ✅ Show loader while fetching product details
  if (loading) return <Loader />;

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
                src={product?.image || "/placeholder.svg"}
                alt={product?.name}
                className="w-full h-auto rounded-lg"
              />
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {product?.name}
              </h1>
              <p className="text-gray-400">{product?.description}</p>
            </div>

            <div className="space-y-4">
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Price</span>
                  <span className="text-3xl font-bold text-red-500">
                    {formatCurrency(product?.priceCents || 0)}
                  </span>
                </div>
                {accessToken && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Reward</span>
                    <span className="text-2xl font-bold text-green-400">
                      {formatCurrency(product?.rewardCents || 0)}
                    </span>
                  </div>
                )}
              </div>

              <p className="text-gray-400">
                {product?.details || "No additional details provided."}
              </p>
            </div>

            <div className="space-y-3">
              {!accessToken && (
                <Button
                  onClick={createCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
                >
                  Buy Now
                </Button>
              )}

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
                  Share this product and earn{" "}
                  {formatCurrency(product?.rewardCents || 0)} for each sale
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

              {/* Share Buttons */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <Button
                    onClick={handleShareLink}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Share Link
                  </Button>
                  <Button
                    onClick={handleShareQR}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Share QR
                  </Button>
                </div>
                <Button
                  onClick={() => setShowShareModal(false)}
                  variant="outline"
                  className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                >
                  Close
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
// import { useAuth } from "@/components/Context/AuthContext";
// import { Share2, Download, Copy, Check, Loader2 } from "lucide-react";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";
// import useApi from "@/lib/useApi";
// import Loader from "@/components/ui/Loader";
// import { useParams, useSearchParams, useRouter } from "next/navigation";
// import { formatCurrency } from "@/lib/utils";

// export default function ProductDetailPage({ loginUser = false }) {
//   const params = useParams();
//   const router = useRouter();
//   const { user, Logout, getStoredAuthData } = useAuth();
//   const { accessToken } = getStoredAuthData();
//   console.log(user, "user data please", accessToken);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const searchParams = useSearchParams();
//   const [showShareModal, setShowShareModal] = useState(false);
//   const [shareLink, setShareLink] = useState("");
//   const [qrCode, setQrCode] = useState("");
//   const [shareLoading, setShareLoading] = useState(false);
//   const [valid, setValid] = useState(true);

//   const sharer = searchParams.get("sharer");
//   const t = searchParams.get("t");
//   const s = searchParams.get("s");
//   const attributeId = searchParams.get("attributeId");

//   // ✅ Verify share link if parameters exist
//   useEffect(() => {
//     if (sharer && t && s) {
//       useApi(
//         `products/${params?.id}/track`,
//         {
//           method: "post",
//           data: {
//             productId: params?.id,
//             sharerId: sharer,
//             t: t,
//             s: s,
//           },
//         },
//         (res, status) => {
//           if (status) {
//             router.replace(res?.redirectUrl); // Clean URL
//           } else {
//             toast.error("Invalid or expired link");
//             setValid(false);
//             router.push("/"); // ✅ Redirect to main page if invalid
//           }
//         }
//       );
//     }
//   }, [sharer, t, s]);

//   // ✅ Fetch product details
//   useEffect(() => {
//     if (!params.id) return;
//     setLoading(true);
//     useApi(`products/${params.id}`, { method: "GET" }, (res, status) => {
//       if (status && res?.product) {
//         setProduct(res.product);
//         setLoading(false);
//       } else {
//         toast.error(res?.message || "Failed to fetch product details");
//       }
//     });
//   }, [params.id]);

//   const handleGenerateShareLink = () => {
//     if (!product?._id) return toast.error("Product not found!");
//     const sharerId = user?._id;

//     setShareLoading(true);

//     useApi(
//       `products/${product?._id}/share`,
//       {
//         method: "POST",
//         data: {},
//       },
//       (res, status) => {
//         setShareLoading(false);
//         if (status) {
//           setShareLink(res?.shareUrl);
//           setQrCode(res?.qrCode);
//           setShowShareModal(true);
//         } else {
//           toast.error(res?.message || "Failed to generate share link");
//         }
//       }
//     );
//   };

//   const handleCopy = () => {
//     if (!shareLink) return;
//     navigator.clipboard.writeText(shareLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//     toast.success("Link copied!");
//   };

//   // ✅ Share only Link
//   const handleShareLink = async () => {
//     if (!shareLink) return toast.error("Share link not available");

//     try {
//       if (navigator.share) {
//         await navigator.share({
//           title: "Check out this product!",
//           text: `Earn rewards when you buy or share this product!\n${shareLink}`,
//           url: shareLink,
//         });
//         toast.success("Link shared successfully!");
//       } else {
//         toast.info("Sharing not supported. Link copied!");
//         handleCopy();
//       }
//     } catch (error) {
//       console.error("Sharing failed:", error);
//       toast.error("Failed to share link.");
//     }
//   };
//   const handleShareQR = async () => {
//     if (!qrCode) return toast.error("QR Code not available");

//     try {
//       const res = await fetch(qrCode);
//       const blob = await res.blob();
//       const file = new File([blob], "qr-code.png", { type: blob.type });
//       const files = [file];

//       if (navigator.canShare && navigator.canShare({ files })) {
//         await navigator.share({
//           title: "Check out this product!",
//           text: "Scan this QR to explore the product and earn rewards!",
//           files,
//         });
//         toast.success("QR shared successfully!");
//       } else {
//         toast.info("Sharing not supported on this device.");
//       }
//     } catch (error) {
//       console.error("Sharing failed:", error);
//       toast.error("Failed to share QR code.");
//     }
//   };
//   if (!valid) {
//     return null; // Don't show anything while redirecting
//   }

//   function createCheckout() {
//     useApi(
//       `orders/checkout`,
//       {
//         method: "POST",
//         data: {
//           productId: params?.id,
//           email: user?.email,
//           sessionId: s,
//           attributeid: attributeId,
//         },
//       },
//       (res, status) => {
//         if (status) {
//           router?.push(res?.url);
//         } else {
//           toast.error(res?.message || "Failed to generate share link");
//         }
//       }
//     );
//   }
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
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="grid md:grid-cols-2 gap-12">
//             {/* Image */}
//             <div className="flex items-center justify-center">
//               <Card className="bg-black border-red-500/20 p-8 w-full">
//                 <img
//                   src={product?.image || "/placeholder.svg"}
//                   alt={product?.name}
//                   className="w-full h-auto rounded-lg"
//                 />
//               </Card>
//             </div>

//             {/* Details */}
//             <div className="space-y-8">
//               <div>
//                 <h1 className="text-4xl font-bold text-white mb-2">
//                   {product?.name}
//                 </h1>
//                 <p className="text-gray-400">{product?.description}</p>
//               </div>

//               <div className="space-y-4">
//                 <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <span className="text-gray-400">Price</span>
//                     <span className="text-3xl font-bold text-red-500">
//                       {formatCurrency(product?.priceCents || 0)}
//                     </span>
//                   </div>
//                   {accessToken && (
//                     <div className="flex justify-between items-center">
//                       <span className="text-gray-400">Reward</span>
//                       <span className="text-2xl font-bold text-green-400">
//                         {formatCurrency(product?.rewardCents || 0)}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <p className="text-gray-400">
//                   {product?.details || "No additional details provided."}
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 <Button
//                   onClick={createCheckout}
//                   className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-semibold"
//                 >
//                   Share Now
//                 </Button>
//                 {accessToken && (
//                   <Button
//                     onClick={handleGenerateShareLink}
//                     disabled={shareLoading}
//                     variant="outline"
//                     className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10 py-6"
//                   >
//                     {shareLoading ? (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     ) : (
//                       <>
//                         <Share2 className="w-4 h-4 mr-2" />
//                         Share & Earn
//                       </>
//                     )}
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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
//                   {formatCurrency(product?.rewardCents || 0)} for each sale
//                 </p>
//               </div>

//               <div className="space-y-3">
//                 <label className="text-sm font-medium text-white">
//                   Your Referral Link
//                 </label>
//                 <div className="flex gap-2">
//                   <input
//                     type="text"
//                     value={shareLink}
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
//                   {qrCode ? (
//                     <img
//                       src={qrCode}
//                       alt="QR Code"
//                       className="h-full object-contain"
//                     />
//                   ) : (
//                     <div className="text-center text-gray-400">
//                       <Download className="w-8 h-8 mx-auto mb-2" />
//                       <p className="text-sm">QR Code will be generated here</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* ✅ Two separate share buttons + close */}
//               <div className="flex flex-col gap-3">
//                 <div className="flex gap-3">
//                   <Button
//                     onClick={handleShareLink}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                   >
//                     Share Link
//                   </Button>
//                   <Button
//                     onClick={handleShareQR}
//                     className="flex-1 bg-red-600 hover:bg-red-700 text-white"
//                   >
//                     Share QR
//                   </Button>
//                 </div>
//                 <Button
//                   onClick={() => setShowShareModal(false)}
//                   variant="outline"
//                   className="border-red-500/30 text-red-500 hover:bg-red-500/10"
//                 >
//                   Close
//                 </Button>
//               </div>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
