"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Mail, User, Camera, CreditCard, DollarSign, Copy } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/components/Context/AuthContext";
import { uploadImageAction } from "@/app/actions/uploadImageAction";
import useApi from "@/lib/useApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GlobalSwitch from "@/components/ui/Switch";

export default function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(
    user?.role === "merchant" ? "profile" : "profile"
  );

  console.log("User data in ProfilePage:", user);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(user?.profilePic || "");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
    zelleEmail: user?.zellePaymentDetails?.email || "",
    zellePhone: user?.zellePaymentDetails?.phoneNumber || "",
    paymentMethod: user?.paymentMethod?.toLowerCase() || "zelle",
    receiveViaWalmart: user?.paymentMethod === "walmart",
    webhookSecret: user?.webhookSecret || "",
  });

  const [setupComplete, setSetupComplete] = useState(!!user?.webhookSecret);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  // ✅ Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      const uploadRes = await uploadImageAction(form);
      if (uploadRes?.url) {
        setFormData({ ...formData, profilePic: uploadRes.url });
        setPreview(uploadRes.url);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Update Profile API
  const handleProfileSave = async () => {
    if (!formData.name.trim()) return toast.error("Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");

    try {
      setLoading(true);
      useApi(
        "auth/update-profile",
        {
          method: "PUT",
          data: {
            email: formData?.email,
            name: formData?.name,
            profilePic: formData?.profilePic,
          },
        },
        (res, status) => {
          if (status) {
            localStorage.setItem("user", JSON.stringify(res.user));
            setUser(res.user);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
          } else {
            toast.error(res?.message || "Failed to update profile");
          }
        }
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Payment Method API
  const handlePaymentSave = () => {
    if (!formData.zelleEmail.trim())
      return toast.error("Zelle Email is required");
    if (!formData.zellePhone.trim())
      return toast.error("Zelle Phone is required");

    setLoading(true);
    const payload = {
      paymentMethod: formData.paymentMethod === "walmart" ? "Walmart" : "Zelle",
      email: formData.zelleEmail,
      phoneNumber: formData.zellePhone,
    };

    useApi(
      "user/payment-method",
      { method: "PUT", data: payload },
      (res, status) => {
        setLoading(false);
        if (status) {
          toast.success("Payment method updated successfully!");
          localStorage.setItem("user", JSON.stringify(res.user));
          setUser(res.user);
        } else {
          toast.error(
            res?.message || "Failed to update payment method. Please try again."
          );
        }
      }
    );
  };

  // ✅ Webhook Save for merchants
  const handleWebhookSave = () => {
    if (!formData.webhookSecret.trim())
      return toast.error("Webhook Secret is required");

    setLoading(true);
    useApi(
      "auth/update-profile",
      { method: "PUT", data: { stripeWebhookSecret: formData.webhookSecret } },
      (res, status) => {
        setLoading(false);
        if (status) {
          toast.success("Webhook setup completed successfully!");
          setSetupComplete(true);
          localStorage.setItem("user", JSON.stringify(res.user));
          setUser(res.user);
        } else {
          toast.error(res?.message || "Failed to save webhook");
        }
      }
    );
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(`${apiURL}webhook/${user?.id || user?._id}`);
    toast.success("Webhook URL copied!");
  };

  const handleGoToDashboard = () => router.push("/merchant/dashboard");

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Profile Settings"
        description="Manage your account and payment settings"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex border-b border-red-500/30 mb-6 gap-2">
          <button
            className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeTab === "profile"
                ? "text-white border-b-2 border-red-600"
                : "text-red-400 hover:text-red-300"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="inline w-4 h-4 mr-2" />
            Profile
          </button>

          {user?.role === "user" && (
            <button
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === "payment"
                  ? "text-white border-b-2 border-red-600"
                  : "text-red-400 hover:text-red-300"
              }`}
              onClick={() => setActiveTab("payment")}
            >
              <CreditCard className="inline w-4 h-4 mr-2" />
              Payment Method
            </button>
          )}

          {user?.role === "merchant" && (
            <button
              className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === "webhook"
                  ? "text-white border-b-2 border-red-600"
                  : "text-red-400 hover:text-red-300"
              }`}
              onClick={() => setActiveTab("webhook")}
            >
              <DollarSign className="inline w-4 h-4 mr-2" />
              Webhook Setup
            </button>
          )}
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <Card className="bg-black border-red-500/20 mb-6">
            <CardHeader className="flex justify-between items-center border-b border-red-500/20">
              <div>
                <CardTitle className="text-white">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your profile
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-red-600 hover:bg-red-700"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-red-900/30 flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-red-400" />
                  )}
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="absolute bottom-0 right-0 z-50 bg-red-700 p-1 rounded-full">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{formData.name}</p>
                  <p className="text-sm text-gray-400">
                    {user?.createdAt
                      ? `Member since ${new Date(
                          user.createdAt
                        ).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">
                    Full Name
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Email
                  </label>
                  <Input
                    disabled={!isEditing}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
              </div>

              {isEditing && (
                <Button
                  disabled={loading || uploading}
                  onClick={handleProfileSave}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {loading || uploading ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* PAYMENT TAB */}
        {activeTab === "payment" && user?.role === "user" && (
          <Card className="bg-black border-red-500/20 mb-6">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Payment Method
              </CardTitle>
              <CardDescription className="text-gray-400">
                Choose how you want to receive payouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <Input
                type="email"
                value={formData.zelleEmail}
                onChange={(e) =>
                  setFormData({ ...formData, zelleEmail: e.target.value })
                }
                placeholder="Zelle Email"
                className="mt-2 bg-black border-red-500/20 text-white"
              />
              <Input
                type="tel"
                value={formData.zellePhone}
                onChange={(e) =>
                  setFormData({ ...formData, zellePhone: e.target.value })
                }
                placeholder="Zelle Phone"
                className="mt-2 bg-black border-red-500/20 text-white"
              />
              <Button
                disabled={loading}
                onClick={handlePaymentSave}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {loading ? "Saving..." : "Save Payment Method"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* MERCHANT WEBHOOK TAB */}
        {activeTab === "webhook" && user?.role === "merchant" && (
          <Card className="bg-black border-red-500/20 mb-6">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Merchant Webhook Setup
              </CardTitle>
              <CardDescription className="text-gray-400">
                Configure Stripe webhook for referral tracking
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* STEP 1 — Copy Webhook URL */}
              <Card className="bg-black border border-red-500/20 p-6">
                <h2 className="text-xl text-white font-semibold mb-1">
                  Step 1 — Copy Your Webhook URL
                </h2>
                <p className="text-gray-400 mb-4">
                  This URL must be added inside your Stripe Dashboard.
                </p>

                <div className="relative bg-gray-900 p-4 rounded-lg border border-gray-700 text-red-400 font-mono break-all">
                  {`${process.env.NEXT_PUBLIC_API_URL}webhook/strip/${
                    user?.id || user?._id
                  }`}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_API_URL}webhook/stripe/${
                          user?.id || user?._id
                        }`
                      );
                      toast.success("Webhook URL copied!");
                    }}
                    className="absolute right-2 top-2 p-1 hover:bg-gray-800 rounded-md"
                  >
                    <Copy size={18} className="text-gray-300" />
                  </button>
                </div>
              </Card>

              {/* STEP 2 — Add Webhook to Stripe Dashboard */}
              <Card className="bg-black border border-red-500/20 p-6">
                <h2 className="text-xl text-white font-semibold mb-2">
                  Step 2 — Add Webhook to Stripe Dashboard
                </h2>
                <p className="text-gray-400 mb-4">
                  Login to Stripe → Developers → Webhooks → Add Endpoint
                </p>

                <ol className="list-decimal ml-6 space-y-2 text-gray-300">
                  <li>
                    Click <b>Add Endpoint</b>
                  </li>
                  <li>Paste the Webhook URL shown above</li>
                  <li>
                    Select event →{" "}
                    <span className="text-red-400">
                      checkout.session.completed
                    </span>
                  </li>
                  <li>Click Create Endpoint</li>
                  <li>
                    Copy the <b>Signing Secret</b> shown by Stripe
                  </li>
                </ol>
              </Card>

              {/* STEP 3 — Add Webhook Secret */}
              <Card className="bg-black border border-red-500/20 p-6">
                <h2 className="text-xl text-white font-semibold mb-2">
                  Step 3 — Add Webhook Secret in Our System
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Stripe Webhook Secret"
                    value={formData.webhookSecret || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        webhookSecret: e.target.value,
                      })
                    }
                    placeholder="whsec_xxxxxxxxxxx"
                    // disabled={setupComplete}
                  />

                  <Button
                    disabled={loading}
                    onClick={async () => {
                      if (!formData.webhookSecret) {
                        toast.error("Please enter the webhook secret");
                        return;
                      }
                      setLoading(true);
                      useApi(
                        "auth/update-profile",
                        {
                          method: "PUT",
                          data: {
                            stripeWebhookSecret: formData.webhookSecret,
                          },
                        },
                        (res, status) => {
                          setLoading(false);
                          if (status) {
                            localStorage.setItem(
                              "user",
                              JSON.stringify(res.user)
                            );
                            setUser(res.user);
                            toast.success(
                              "Webhook setup completed successfully!"
                            );
                            setSetupComplete(true);
                          } else {
                            toast.error("Failed to update profile");
                          }
                        }
                      );
                    }}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Saving..." : "Save Webhook Settings"}
                  </Button>
                </div>
              </Card>

              {/* STEP 4 — How Referral System Works */}
              <Card className="bg-black border border-red-500/20 p-6">
                <h2 className="text-xl text-white font-semibold mb-2">
                  Step 4 — How Your Referral System Works
                </h2>

                <ul className="list-disc ml-6 space-y-3 text-gray-300">
                  <li>
                    Every product you create generates a{" "}
                    <span className="text-red-400 font-semibold">
                      unique merchant referral link
                    </span>
                    .
                  </li>
                  <li>
                    When users click your link, it contains a special parameter:{" "}
                    <span className="text-red-400 font-semibold">
                      attributeId
                    </span>
                    .
                  </li>
                  <li>
                    Users are redirected to your website along with this
                    attributeId.
                  </li>
                  <li>
                    <span className="text-red-400 font-semibold">
                      IMPORTANT — You must send this exact same attributeId to
                      Stripe inside the payment metadata.
                    </span>
                    <ul className="ml-6 list-disc mt-2 space-y-1 text-gray-400">
                      <li>
                        In Stripe Checkout, locate the <b>metadata</b> section
                      </li>
                      <li>
                        Add a new metadata field with:
                        <pre className="bg-black border border-red-500/30 p-2 mt-1 rounded text-white text-sm">
                          metadata: {"{"} attributeId: "THE_ID_YOU_RECEIVED"{" "}
                          {"}"}
                        </pre>
                      </li>
                      <li>
                        This ensures Stripe sends the attributeId back to our
                        system.
                      </li>
                    </ul>
                  </li>
                  <li>
                    When Stripe triggers your webhook, our system reads{" "}
                    <span className="text-red-400 font-semibold">
                      attributeId
                    </span>{" "}
                    and:
                    <ul className="ml-6 list-disc mt-2 space-y-1">
                      <li>Updates the User profile (adds reward credit)</li>
                      <li>
                        Updates the Merchant profile (tracks the purchase)
                      </li>
                    </ul>
                  </li>
                </ul>
              </Card>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { PageHeader } from "@/components/ui/page-header";
// import {
//   Mail,
//   Lock,
//   User,
//   Shield,
//   LogOut,
//   Camera,
//   CreditCard,
//   DollarSign,
//   Gift,
// } from "lucide-react";
// import { toast } from "sonner";
// import { useAuth } from "../Context/AuthContext";
// import { uploadImageAction } from "@/app/actions/uploadImageAction";
// import useApi from "@/lib/useApi";
// import GlobalSwitch from "../ui/Switch";
// import { profile } from "console";

// export default function ProfilePage() {
//   const { user, logout, setUser } = useAuth();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [preview, setPreview] = useState(user?.profilePic || "");

//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     email: user?.email || "",
//     profilePic: user?.profilePic || "",
//     zelleEmail: user?.zellePaymentDetails?.email || "",
//     zellePhone: user?.zellePaymentDetails?.phoneNumber || "",
//     paymentMethod: user?.paymentMethod?.toLowerCase() || "zelle",
//     receiveViaWalmart: user?.paymentMethod,
//   });

//   // ✅ Handle image upload
//   const handleImageChange = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploading(true);
//     try {
//       const form = new FormData();
//       form.append("image", file);
//       const uploadRes = await uploadImageAction(form);
//       if (uploadRes?.url) {
//         setFormData({ ...formData, profilePic: uploadRes.url });
//         setPreview(uploadRes.url);
//         toast.success("Image uploaded successfully!");
//       }
//     } catch (error) {
//       toast.error("Image upload failed!");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Update Profile API
//   const handleProfileSave = async () => {
//     try {
//       setLoading(true);
//       useApi(
//         "auth/update-profile",
//         {
//           method: "PUT",
//           data: {
//             email: formData?.email,
//             name: formData?.name,
//             profilePic: formData?.profilePic,
//           },
//         },
//         (res, status) => {
//           if (status) {
//             localStorage.setItem("user", JSON.stringify(res.user));
//             toast.success("Profile updated successfully!");
//             setUser(res.user);
//             setIsEditing(false);
//           } else {
//             toast.error("Failed to update profile");
//           }
//         }
//       );
//     } catch (error) {
//       toast.error(error.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Update Payment Method API
//   const handlePaymentSave = () => {
//     setLoading(true);

//     setLoading(true);
//     const payload = {
//       paymentMethod: formData.paymentMethod === "walmart" ? "Walmart" : "Zelle",
//       email: formData.zelleEmail,
//       phoneNumber: formData.zellePhone,
//     };

//     useApi(
//       "user/payment-method",
//       { method: "PUT", data: payload },
//       (res, status) => {
//         if (status) {
//           toast.success("Payment method updated successfully!");
//           localStorage.setItem("user", JSON.stringify(res.user));
//           setUser(res.user);
//           setLoading(false);
//         } else {
//           setLoading(false);
//           toast.error(
//             res?.message || "Failed to update payment method. Please try again."
//           );
//         }
//       }
//     );
//   };

//   return (
//     <div className="min-h-screen bg-black">
//       <PageHeader
//         title="Profile Settings"
//         description="Manage your account information and payment method"
//       />

//       <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Tabs */}
//         {user?.role === "user" && (
//           <div className="flex border-b border-red-500/30 mb-6">
//             <button
//               className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
//                 activeTab === "profile"
//                   ? "text-white border-b-2 border-red-600"
//                   : "text-red-400 hover:text-red-300"
//               }`}
//               onClick={() => setActiveTab("profile")}
//             >
//               <User className="inline w-4 h-4 mr-2" />
//               Profile
//             </button>
//             <button
//               className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
//                 activeTab === "payment"
//                   ? "text-white border-b-2 border-red-600"
//                   : "text-red-400 hover:text-red-300"
//               }`}
//               onClick={() => setActiveTab("payment")}
//             >
//               <CreditCard className="inline w-4 h-4 mr-2" />
//               Payment Method
//             </button>
//           </div>
//         )}

//         {/* ✅ PROFILE TAB */}
//         {activeTab === "profile" && (
//           <div className="grid gap-6">
//             <Card className="bg-black border-red-500/20">
//               <CardHeader className="flex flex-row items-center justify-between border-b border-red-500/20">
//                 <div>
//                   <CardTitle className="text-white">
//                     Personal Information
//                   </CardTitle>
//                   <CardDescription className="text-gray-400">
//                     Update your profile details
//                   </CardDescription>
//                 </div>
//                 <Button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="bg-red-600 hover:bg-red-700"
//                 >
//                   {isEditing ? "Cancel" : "Edit"}
//                 </Button>
//               </CardHeader>

//               <CardContent className="space-y-6 pt-6">
//                 {/* Profile Picture */}
//                 <div className="flex items-center gap-4">
//                   <div className="relative w-16 h-16 rounded-full overflow-hidden bg-red-900/30 flex items-center overflow-visible justify-center">
//                     {preview ? (
//                       <img
//                         src={preview}
//                         alt="Profile"
//                         className="object-cover w-full h-full"
//                       />
//                     ) : (
//                       <User className="w-8 h-8 text-red-400" />
//                     )}
//                     {isEditing && (
//                       <>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handleImageChange}
//                           className="absolute inset-0 opacity-0 cursor-pointer"
//                         />
//                         <div className="absolute bottom-0 right-0 z-50 bg-red-700 p-1 rounded-full">
//                           <Camera className="w-4 h-4 text-white" />
//                         </div>
//                       </>
//                     )}
//                   </div>
//                   <div>
//                     <p className="font-semibold text-white">{formData.name}</p>
//                     <p className="text-sm text-gray-400">
//                       {user?.createdAt
//                         ? `Member since ${new Date(
//                             user.createdAt
//                           ).toLocaleDateString()}`
//                         : ""}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Input Fields */}
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-medium text-white">
//                       Full Name
//                     </label>
//                     <Input
//                       disabled={!isEditing}
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       className="mt-2 bg-black border-red-500/20 text-white"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-white">
//                       Email
//                     </label>
//                     <Input
//                       disabled={!isEditing}
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       className="mt-2 bg-black border-red-500/20 text-white"
//                     />
//                   </div>
//                 </div>

//                 {isEditing && (
//                   <Button
//                     disabled={loading || uploading}
//                     onClick={handleProfileSave}
//                     className="w-full bg-red-600 hover:bg-red-700"
//                   >
//                     {loading || uploading ? "Saving..." : "Save Changes"}
//                   </Button>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         )}

//         {/* ✅ PAYMENT TAB */}
//         {activeTab === "payment" && (
//           <Card className="bg-black border-red-500/20">
//             <CardHeader className="border-b border-red-500/20">
//               <CardTitle className="flex items-center gap-2 text-white">
//                 <DollarSign className="w-5 h-5" />
//                 Payment Method
//               </CardTitle>
//               <CardDescription className="text-gray-400">
//                 Choose how you want to receive payouts
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-6 pt-6">
//               {/* ✅ Payment Method Selectors */}
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Zelle Option */}
//                 <div
//                   className={`cursor-pointer border rounded-lg p-4 col-span-2 flex flex-col items-center transition-all duration-200 ${
//                     formData.paymentMethod === "zelle"
//                       ? "border-red-600 bg-red-900/20"
//                       : "border-red-500/20 hover:border-red-500/40"
//                   }`}
//                   onClick={() =>
//                     setFormData({
//                       ...formData,
//                       paymentMethod: "zelle",
//                       receiveViaWalmart: false,
//                       zelleEmail: formData.zelleEmail || "",
//                       zellePhone: formData.zellePhone || "",
//                     })
//                   }
//                 >
//                   <CreditCard className="w-8 h-8 text-red-400 mb-2" />
//                   <p className="text-white font-medium">Zelle</p>
//                 </div>

//                 {/* Walmart Option */}
//                 {/* <div
//                   className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all duration-200 ${
//                     formData.paymentMethod === "walmart"
//                       ? "border-red-600 bg-red-900/20"
//                       : "border-red-500/20 hover:border-red-500/40"
//                   }`}
//                   onClick={() =>
//                     setFormData({
//                       ...formData,
//                       paymentMethod: "walmart",
//                       receiveViaWalmart: true,
//                     })
//                   }
//                 >
//                   <Gift className="w-8 h-8 text-red-400 mb-2" />
//                   <p className="text-white font-medium">Walmart eGift Card</p>
//                 </div> */}
//               </div>

//               {/* ✅ Conditional Inputs */}
//               {formData.paymentMethod === "zelle" && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="text-sm font-medium text-white">
//                       Zelle Email
//                     </label>
//                     <Input
//                       type="email"
//                       value={formData.zelleEmail}
//                       onChange={(e) =>
//                         setFormData({ ...formData, zelleEmail: e.target.value })
//                       }
//                       placeholder="yourzelle@email.com"
//                       className="mt-2 bg-black border-red-500/20 text-white"
//                     />
//                   </div>

//                   <div>
//                     <label className="text-sm font-medium text-white">
//                       Zelle Phone
//                     </label>
//                     <Input
//                       type="tel"
//                       value={formData.zellePhone}
//                       onChange={(e) =>
//                         setFormData({ ...formData, zellePhone: e })
//                       }
//                       placeholder="+1 (555) 123-4567"
//                       inputMode="tel"
//                       className="mt-2 bg-black border-red-500/20 text-white"
//                     />
//                   </div>
//                 </div>
//               )}

//               {formData.paymentMethod === "walmart" && (
//                 <div className="flex items-center justify-between border border-red-500/20 rounded-lg p-3">
//                   <div>
//                     <p className="text-white font-medium">
//                       Receive via Walmart eGift Card
//                     </p>
//                     <p className="text-gray-400 text-sm">
//                       Enable this to receive your payments through Walmart
//                       cards.
//                     </p>
//                   </div>
//                   <GlobalSwitch
//                     checked={formData.receiveViaWalmart}
//                     onChange={(checked) =>
//                       setFormData({
//                         ...formData,
//                         receiveViaWalmart: checked,
//                         paymentMethod: checked ? "walmart" : "zelle",
//                       })
//                     }
//                   />
//                 </div>
//               )}

//               {/* ✅ Save Button */}
//               <Button
//                 disabled={loading}
//                 onClick={handlePaymentSave}
//                 className="w-full bg-red-600 hover:bg-red-700"
//               >
//                 {loading ? "Saving..." : "Save Payment Method"}
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </main>
//     </div>
//   );
// }
