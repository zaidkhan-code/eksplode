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
import {
  Mail,
  Lock,
  User,
  Shield,
  LogOut,
  Camera,
  CreditCard,
  DollarSign,
  Gift,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../Context/AuthContext";
import { uploadImageAction } from "@/app/actions/uploadImageAction";
import useApi from "@/lib/useApi";
import GlobalSwitch from "../ui/Switch";
import { profile } from "console";

export default function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
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
    receiveViaWalmart: user?.paymentMethod,
  });

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
            toast.success("Profile updated successfully!");
            setUser(res.user);
            setIsEditing(false);
          } else {
            toast.error("Failed to update profile");
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
    setLoading(true);

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
        if (status) {
          toast.success("Payment method updated successfully!");
          localStorage.setItem("user", JSON.stringify(res.user));
          setUser(res.user);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(
            res?.message || "Failed to update payment method. Please try again."
          );
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Profile Settings"
        description="Manage your account information and payment method"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        {user?.role === "user" && (
          <div className="flex border-b border-red-500/30 mb-6">
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
          </div>
        )}

        {/* ✅ PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="grid gap-6">
            <Card className="bg-black border-red-500/20">
              <CardHeader className="flex flex-row items-center justify-between border-b border-red-500/20">
                <div>
                  <CardTitle className="text-white">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your profile details
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
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-red-900/30 flex items-center overflow-visible justify-center">
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

                {/* Input Fields */}
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
          </div>
        )}

        {/* ✅ PAYMENT TAB */}
        {activeTab === "payment" && (
          <Card className="bg-black border-red-500/20">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="flex items-center gap-2 text-white">
                <DollarSign className="w-5 h-5" />
                Payment Method
              </CardTitle>
              <CardDescription className="text-gray-400">
                Choose how you want to receive payouts
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* ✅ Payment Method Selectors */}
              <div className="grid grid-cols-2 gap-4">
                {/* Zelle Option */}
                <div
                  className={`cursor-pointer border rounded-lg p-4 col-span-2 flex flex-col items-center transition-all duration-200 ${
                    formData.paymentMethod === "zelle"
                      ? "border-red-600 bg-red-900/20"
                      : "border-red-500/20 hover:border-red-500/40"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      paymentMethod: "zelle",
                      receiveViaWalmart: false,
                      zelleEmail: formData.zelleEmail || "",
                      zellePhone: formData.zellePhone || "",
                    })
                  }
                >
                  <CreditCard className="w-8 h-8 text-red-400 mb-2" />
                  <p className="text-white font-medium">Zelle</p>
                </div>

                {/* Walmart Option */}
                {/* <div
                  className={`cursor-pointer border rounded-lg p-4 flex flex-col items-center transition-all duration-200 ${
                    formData.paymentMethod === "walmart"
                      ? "border-red-600 bg-red-900/20"
                      : "border-red-500/20 hover:border-red-500/40"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      paymentMethod: "walmart",
                      receiveViaWalmart: true,
                    })
                  }
                >
                  <Gift className="w-8 h-8 text-red-400 mb-2" />
                  <p className="text-white font-medium">Walmart eGift Card</p>
                </div> */}
              </div>

              {/* ✅ Conditional Inputs */}
              {formData.paymentMethod === "zelle" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-white">
                      Zelle Email
                    </label>
                    <Input
                      type="email"
                      value={formData.zelleEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, zelleEmail: e.target.value })
                      }
                      placeholder="yourzelle@email.com"
                      className="mt-2 bg-black border-red-500/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white">
                      Zelle Phone
                    </label>
                    <Input
                      type="tel"
                      value={formData.zellePhone}
                      onChange={(e) =>
                        setFormData({ ...formData, zellePhone: e })
                      }
                      placeholder="+1 (555) 123-4567"
                      inputMode="tel"
                      className="mt-2 bg-black border-red-500/20 text-white"
                    />
                  </div>
                </div>
              )}

              {formData.paymentMethod === "walmart" && (
                <div className="flex items-center justify-between border border-red-500/20 rounded-lg p-3">
                  <div>
                    <p className="text-white font-medium">
                      Receive via Walmart eGift Card
                    </p>
                    <p className="text-gray-400 text-sm">
                      Enable this to receive your payments through Walmart
                      cards.
                    </p>
                  </div>
                  <GlobalSwitch
                    checked={formData.receiveViaWalmart}
                    onChange={(checked) =>
                      setFormData({
                        ...formData,
                        receiveViaWalmart: checked,
                        paymentMethod: checked ? "walmart" : "zelle",
                      })
                    }
                  />
                </div>
              )}

              {/* ✅ Save Button */}
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
      </main>
    </div>
  );
}
